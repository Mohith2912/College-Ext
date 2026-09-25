import { createHash } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import { courses } from './content';
export function stableId(key:string):string{const h=createHash('sha256').update(`aetheria:${key}`).digest('hex');return `${h.slice(0,8)}-${h.slice(8,12)}-4${h.slice(13,16)}-a${h.slice(17,20)}-${h.slice(20,32)}`;}
export async function seedDatabase(db:PrismaClient){
  const organizationId=stableId('organization');
  await db.organization.upsert({where:{id:organizationId},update:{},create:{id:organizationId,slug:'aetheria',name:'Aetheria Independent Study Companion'}});
  for(let number=1;number<=3;number++){await db.academicTerm.upsert({where:{id:stableId(`term:${number}`)},update:{},create:{id:stableId(`term:${number}`),organizationId,slug:`term-${number}`,name:`Term ${number}`,number,description:['Build your business foundations.','Connect ideas to decisions.','Design responsible growth.'][number-1]}});}
  for(const [index,course] of courses.entries()){
    const courseId=stableId(`course:${course.slug}`);
    await db.course.upsert({where:{id:courseId},update:{},create:{id:courseId,organizationId,slug:course.slug,title:course.title,description:course.description,subject:course.subject,code:course.code,status:'PUBLISHED'}});
    await db.courseOffering.upsert({where:{id:stableId(`offering:${course.slug}`)},update:{},create:{id:stableId(`offering:${course.slug}`),organizationId,courseId,termId:stableId(`term:${course.term}`),position:index%4+1}});
    for(const [position,module] of course.modules.entries()){
      const moduleId=stableId(`module:${course.slug}:${module.slug}`);const noteId=stableId(`note:${moduleId}`);
      await db.module.upsert({where:{id:moduleId},update:{},create:{id:moduleId,organizationId,courseId,slug:module.slug,title:module.title,description:module.description,position:position+1,estimatedMinutes:Math.max(4,Math.ceil(module.markdown.split(/\s+/).length/180)),status:'PUBLISHED'}});
      await db.noteDocument.upsert({where:{id:noteId},update:{},create:{id:noteId,organizationId,moduleId,title:module.title,markdown:module.markdown,status:'PUBLISHED',license:'CC BY 4.0',provenance:'Original Aetheria demonstration material. All case studies and figures are fictional teaching examples.',publishedAt:new Date('2026-09-01T00:00:00Z')}});
      await db.noteVersion.upsert({where:{noteDocumentId_version:{noteDocumentId:noteId,version:1}},update:{},create:{id:stableId(`version:${noteId}:1`),noteDocumentId:noteId,version:1,title:module.title,markdown:module.markdown,checksum:createHash('sha256').update(module.markdown).digest('hex'),changeSummary:'Original demonstration edition'}});
      const headings=[...module.markdown.matchAll(/^## (.+)$/gm)];
      for(const [sectionPosition,heading] of headings.entries()){
        const sectionId=stableId(`section:${moduleId}:${sectionPosition}`);const slug=heading[1].toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
        await db.moduleSection.upsert({where:{id:sectionId},update:{},create:{id:sectionId,moduleId,slug,title:heading[1],position:sectionPosition+1}});
        await db.topic.upsert({where:{id:stableId(`topic:${sectionId}`)},update:{},create:{id:stableId(`topic:${sectionId}`),sectionId,slug,title:heading[1],position:1}});
      }
    }
  }
  return {terms:3,courses:courses.length,modules:courses.reduce((sum,c)=>sum+c.modules.length,0)};
}
