import { createHash } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import { courses } from './content';
export function stableId(key:string):string{const h=createHash('sha256').update(`aetheria:${key}`).digest('hex');return `${h.slice(0,8)}-${h.slice(8,12)}-4${h.slice(13,16)}-a${h.slice(17,20)}-${h.slice(20,32)}`;}
export async function seedDatabase(db:PrismaClient){
  const organizationId=stableId('organization');
  await db.organization.upsert({where:{id:organizationId},update:{},create:{id:organizationId,slug:'aetheria',name:'Aetheria Independent Study Companion'}});
  for(let number=1;number<=3;number++){await db.academicTerm.upsert({where:{id:stableId(`term:${number}`)},update:{},create:{id:stableId(`term:${number}`),organizationId,slug:`term-${number}`,name:`Term ${number}`,number,description:['Build your business foundations.','Connect ideas to decisions.','Design responsible growth.'][number-1]}});}
  const publishedCourseSlugs = new Set(['object-oriented-programming-using-java']);
  for(const [index,course] of courses.filter(course => publishedCourseSlugs.has(course.slug)).entries()){
    const courseId=stableId(`course:${course.slug}`);
    await db.course.upsert({where:{id:courseId},update:{},create:{id:courseId,organizationId,slug:course.slug,title:course.title,description:course.description,subject:course.subject,code:course.code,status:'PUBLISHED'}});
    await db.courseOffering.upsert({where:{id:stableId(`offering:${course.slug}`)},update:{},create:{id:stableId(`offering:${course.slug}`),organizationId,courseId,termId:stableId(`term:${course.term}`),position:index%4+1}});
    for(const [position,module] of course.modules.entries()){
      const generatedModuleId=stableId(`module:${course.slug}:${module.slug}`);
      const isOopj = course.slug === 'object-oriented-programming-using-java';
      const estimatedMinutes = isOopj ? 35 : Math.max(4,Math.ceil(module.markdown.split(/\s+/).length/180));
      const license = isOopj ? 'Apache-2.0' : 'CC BY 4.0';
      const provenance = isOopj ? 'JavaMap EDU source integrated from https://github.com/mrithulavj/oopj at revision 5aac256b135fda5d57a766d451ca1cb10c3ca8d1.' : 'Original Aetheria demonstration material. All case studies and figures are fictional teaching examples.';
      const persistedModule = await db.module.upsert({where:{courseId_slug:{courseId,slug:module.slug}},update:{title:module.title,description:module.description,position:position+1,estimatedMinutes,status:'PUBLISHED'},create:{id:generatedModuleId,organizationId,courseId,slug:module.slug,title:module.title,description:module.description,position:position+1,estimatedMinutes,status:'PUBLISHED'}});
      const moduleId=persistedModule.id;const generatedNoteId=stableId(`note:${moduleId}`);
      const persistedNote = await db.noteDocument.upsert({where:{moduleId},update:{title:module.title,markdown:module.markdown,status:'PUBLISHED',license,provenance,publishedAt:new Date('2026-09-01T00:00:00Z')},create:{id:generatedNoteId,organizationId,moduleId,title:module.title,markdown:module.markdown,status:'PUBLISHED',license,provenance,publishedAt:new Date('2026-09-01T00:00:00Z')}});
      const noteId=persistedNote.id;
      await db.noteVersion.upsert({where:{noteDocumentId_version:{noteDocumentId:noteId,version:1}},update:{},create:{id:stableId(`version:${noteId}:1`),noteDocumentId:noteId,version:1,title:module.title,markdown:module.markdown,checksum:createHash('sha256').update(module.markdown).digest('hex'),changeSummary:isOopj?'Imported JavaMap EDU edition':'Original demonstration edition'}});
      const headings=[...module.markdown.matchAll(/^## (.+)$/gm)];
      const usedSectionSlugs = new Set<string>();
      for(const [sectionPosition,heading] of headings.entries()){
        const generatedSectionId=stableId(`section:${moduleId}:${sectionPosition}`);const baseSlug=heading[1].toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
        const slug=usedSectionSlugs.has(baseSlug)?`${baseSlug}-${sectionPosition+1}`:baseSlug;
        usedSectionSlugs.add(slug);
        const persistedSection = await db.moduleSection.upsert({where:{moduleId_position:{moduleId,position:sectionPosition+1}},update:{slug,title:heading[1]},create:{id:generatedSectionId,moduleId,slug,title:heading[1],position:sectionPosition+1}});
        const sectionId=persistedSection.id;
        await db.topic.upsert({where:{sectionId_position:{sectionId,position:1}},update:{slug,title:heading[1]},create:{id:stableId(`topic:${sectionId}`),sectionId,slug,title:heading[1],position:1}});
      }
    }
  }
  return {terms:3,courses:courses.length,modules:courses.reduce((sum,c)=>sum+c.modules.length,0)};
}
