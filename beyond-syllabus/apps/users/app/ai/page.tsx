import { redirect } from 'next/navigation';
import { prisma } from '@aetheria/database';
import { auth } from '@/lib/auth';
import { organizationScope } from '@/lib/library';
import { Tutor } from '@/components/tutor';
export const dynamic='force-dynamic';export const metadata={title:'AI study tutor',robots:{index:false,follow:false}};
export default async function AiPage(){const session=await auth();if(!session?.user)redirect('/login');const courses=await prisma.course.findMany({where:{status:'PUBLISHED',deletedAt:null,organization:organizationScope,modules:{some:{status:'PUBLISHED',deletedAt:null,note:{status:'PUBLISHED',deletedAt:null}}}},select:{id:true,title:true},orderBy:{title:'asc'}});return <><div className="page-heading"><div><p className="eyebrow">GROUNDED STUDY TOOLS</p><h1>Ask with the syllabus in view.</h1><p>Generate explanations, worked examples, recall questions, or original fictional case studies from published course notes.</p></div></div><Tutor courses={courses}/></>}
