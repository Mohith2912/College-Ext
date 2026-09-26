import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getLibrary } from '@/lib/library';
import { CourseCard } from '@/components/course-card';
export const dynamic='force-dynamic';
export const metadata={title:'Your study workspace',robots:{index:false,follow:false}};
export default async function Home(){const session=await auth();if(!session?.user)redirect('/login');const library=await getLibrary();return <><div className="page-heading"><div><p className="eyebrow">YOUR STUDY SPACE</p><h1>Welcome, {session.user.name?.split(' ')[0]??'curious mind'}.</h1><p>Choose a course and take the next step in your learning.</p></div></div><section className="welcome-panel"><div><h2>Begin with a question.</h2><p>Explore your current syllabus, read original explanations, and put the ideas into practice.</p></div><Link className="btn btn-primary" href="/notes">Browse your courses →</Link></section><div className="section-label"><h2>Explore the curriculum</h2><Link className="text-link" href="/notes">All {library.courseCount} courses →</Link></div><div className="course-grid">{library.courses.slice(0,6).map(c=><CourseCard key={c.id} course={c}/>)}</div></>}
