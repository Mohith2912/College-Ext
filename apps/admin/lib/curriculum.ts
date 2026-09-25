import { createHash } from 'node:crypto';
import { z } from 'zod';
import { prisma, Prisma, type Role } from '@aetheria/database';
import { AccessError } from '@aetheria/auth/errors';
type Context={organization:{id:string};user:{id:string};membership:{role:Role}};
const title=z.string().trim().min(3).max(180);
const description=z.string().trim().min(10).max(10000);
const id=z.string().uuid();
export const curriculumSchema=z.discriminatedUnion('action',[
  z.object({action:z.literal('createTerm'),name:title,number:z.coerce.number().int().min(1).max(99)}),
  z.object({action:z.literal('createCourse'),title,description,subject:z.string().trim().min(2).max(100),termId:id}),
  z.object({action:z.literal('updateCourse'),entityId:id,title,description,subject:z.string().trim().min(2).max(100)}),
  z.object({action:z.literal('createModule'),entityId:id,title,description,markdown:z.string().trim().min(40).max(50000),estimatedMinutes:z.coerce.number().int().min(1).max(240)}),
  z.object({action:z.literal('updateModule'),entityId:id,title,description,markdown:z.string().trim().min(40).max(50000),estimatedMinutes:z.coerce.number().int().min(1).max(240)}),
  z.object({action:z.enum(['publishCourse','archiveCourse','submitCourse','approveCourse']),entityId:id}),
]);
export function slugify(value:string){return value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,130)||'course'}
const editors=['CONTENT_EDITOR','ADMIN','SUPER_ADMIN'];const admins=['ADMIN','SUPER_ADMIN'];
export async function mutateCurriculum(context:Context,input:z.infer<typeof curriculumSchema>){
  const {organization,user,membership}=context;
  const required=input.action==='approveCourse'?['REVIEWER',...admins]:['publishCourse','archiveCourse','createTerm'].includes(input.action)?admins:editors;
  if(!required.includes(membership.role))throw new AccessError('FORBIDDEN',403,'Your role cannot perform this action.');
  const orgId=organization.id;
  try{return await prisma.$transaction(async(tx)=>{
    let courseId:string|undefined;let entityId:string;let message='Changes saved.';
    if(input.action==='createTerm'){
      const term=await tx.academicTerm.create({data:{organizationId:orgId,name:input.name,number:input.number,slug:`term-${input.number}`}});entityId=term.id;message='Academic term added.';
    }else if(input.action==='createCourse'){
      const term=await tx.academicTerm.findFirst({where:{id:input.termId,organizationId:orgId,deletedAt:null}});if(!term)throw new AccessError('NOT_FOUND',404,'Choose a term in your organization.');
      const course=await tx.course.create({data:{organizationId:orgId,slug:slugify(input.title),title:input.title,description:input.description,subject:input.subject,status:'DRAFT'}});
      await tx.courseOffering.create({data:{organizationId:orgId,courseId:course.id,termId:term.id,position:(await tx.courseOffering.count({where:{organizationId:orgId,termId:term.id}}))+1}});
      courseId=course.id;entityId=course.id;message='Syllabus created. Add modules, then publish to the user library.';
    }else if(input.action==='updateModule'){
      const module=await tx.module.findFirst({where:{id:input.entityId,organizationId:orgId,deletedAt:null},include:{note:true}});if(!module?.note)throw new AccessError('NOT_FOUND',404,'This module is unavailable.');
      const version=module.note.currentVersion+1;
      await tx.module.update({where:{id:module.id},data:{title:input.title,description:input.description,estimatedMinutes:input.estimatedMinutes,status:'DRAFT'}});
      await tx.noteDocument.update({where:{id:module.note.id},data:{title:input.title,markdown:input.markdown,status:'DRAFT',currentVersion:version,versions:{create:{version,title:input.title,markdown:input.markdown,checksum:createHash('sha256').update(input.markdown).digest('hex'),changeSummary:'Saved from the syllabus editor',authorId:user.id}}}});
      courseId=module.courseId;entityId=module.id;message='Module draft saved. Publish the syllabus to make this revision available to users.';
    }else{
      const course=await tx.course.findFirst({where:{id:input.entityId,organizationId:orgId,deletedAt:null},include:{modules:{where:{deletedAt:null},include:{note:true},orderBy:{position:'asc'}}}});if(!course)throw new AccessError('NOT_FOUND',404,'This syllabus is unavailable.');
      courseId=course.id;entityId=course.id;
      if(input.action==='updateCourse'){
        await tx.course.update({where:{id:course.id},data:{title:input.title,description:input.description,subject:input.subject,status:'DRAFT'}});message='Syllabus saved as draft. Publish when ready.';
      }else if(input.action==='createModule'){
        const module=await tx.module.create({data:{organizationId:orgId,courseId:course.id,slug:slugify(input.title),title:input.title,description:input.description,position:Math.max(0,...course.modules.map(m=>m.position))+1,estimatedMinutes:input.estimatedMinutes,status:'DRAFT'}});
        await tx.noteDocument.create({data:{organizationId:orgId,moduleId:module.id,title:input.title,markdown:input.markdown,status:'DRAFT',provenance:'Original or authorized content submitted by an Aetheria editor.',versions:{create:{version:1,title:input.title,markdown:input.markdown,checksum:createHash('sha256').update(input.markdown).digest('hex'),authorId:user.id,changeSummary:'Initial draft'}}}});entityId=module.id;message='Module added as a draft.';
      }else if(input.action==='publishCourse'){
        if(!course.modules.length||course.modules.some(m=>!m.note||m.note.markdown.trim().length<40))throw new AccessError('VALIDATION_ERROR',400,'Add at least one module with complete notes before publishing.');
        await tx.course.update({where:{id:course.id},data:{status:'PUBLISHED'}});
        await tx.module.updateMany({where:{courseId:course.id,organizationId:orgId,deletedAt:null},data:{status:'PUBLISHED'}});
        await tx.noteDocument.updateMany({where:{organizationId:orgId,moduleId:{in:course.modules.map(m=>m.id)},deletedAt:null},data:{status:'PUBLISHED',publishedAt:new Date()}});
        message='Published. The syllabus and module notes are now available in the user library.';
      }else if(input.action==='archiveCourse'){
        await tx.course.update({where:{id:course.id},data:{status:'ARCHIVED'}});message='Syllabus archived. It is hidden from users and can be published again.';
      }else if(input.action==='submitCourse'){
        await tx.course.update({where:{id:course.id},data:{status:'IN_REVIEW'}});
        for(const module of course.modules){if(module.note){await tx.contentReview.create({data:{organizationId:orgId,noteDocumentId:module.note.id,decision:'PENDING'}});}}
        message='Syllabus submitted for review.';
      }else{
        if(course.status!=='IN_REVIEW')throw new AccessError('VALIDATION_ERROR',400,'Only a submitted syllabus can be approved.');
        await tx.contentReview.updateMany({where:{organizationId:orgId,noteDocumentId:{in:course.modules.flatMap(m=>m.note?[m.note.id]:[])},decision:'PENDING'},data:{decision:'APPROVED',reviewerId:user.id,reviewedAt:new Date(),comment:'Syllabus reviewed in the editorial workspace.'}});message='Review approved. An administrator can now publish the syllabus.';
      }
    }
    await tx.auditLog.create({data:{organizationId:orgId,actorId:user.id,action:`curriculum.${input.action}`,entityType:'Curriculum',entityId,metadata:{courseId:courseId??null}}});
    return {courseId,message};
  });}catch(error){if(error instanceof Prisma.PrismaClientKnownRequestError&&error.code==='P2002')throw new AccessError('VALIDATION_ERROR',409,'A term, course, or module with this name already exists. Choose a different name.');throw error;}
}
