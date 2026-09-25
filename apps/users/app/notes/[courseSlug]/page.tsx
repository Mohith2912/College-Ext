import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BookOpen, ChevronRight, Clock3, Layers } from 'lucide-react';
import { getCourse } from '@/lib/library';
import { Disclaimer } from '@/components/disclaimer';
import { Footer } from '@/components/footer';

type Props = { params: Promise<{ courseSlug: string }> };
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { courseSlug } = await params; const course = await getCourse(courseSlug); return { title: course?.title ?? 'Course unavailable', description: course?.description, alternates: { canonical: `/notes/${courseSlug}` } }; }

export default async function CoursePage({ params }: Props) {
  const { courseSlug } = await params; const course = await getCourse(courseSlug); if (!course) notFound();
  const readable = course.modules.filter(item => item.note?.status === 'PUBLISHED' && !item.note.deletedAt);
  const minutes = course.modules.reduce((sum, item) => sum + item.estimatedMinutes, 0);
  return <>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/notes">Course notes</Link><ChevronRight size={12} aria-hidden="true" />{course.offerings[0] && <><Link href={`/notes?term=${course.offerings[0].term.slug}`}>Term {course.offerings[0].term.number}</Link><ChevronRight size={12} aria-hidden="true" /></>}<span aria-current="page">{course.title}</span></nav>
    <div className="course-hero"><div><div className="eyebrow">{course.code ?? course.subject} · {course.subject}</div><h1>{course.title}</h1><p>{course.description}</p><div className="course-meta"><span><BookOpen size={15} aria-hidden="true" />{course.modules.length} modules</span><span><Layers size={15} aria-hidden="true" />{course.modules.reduce((sum, item) => sum + item._count.sections, 0)} sections</span><span><Clock3 size={15} aria-hidden="true" />{minutes} min of reading</span></div></div><aside className="course-summary"><span className="eyebrow">A good place to begin</span><strong>One module at a time.</strong><p>Follow the syllabus in order, or open the idea you want to understand.</p>{readable[0] ? <Link href={`/notes/${course.slug}/${readable[0].slug}`} className="btn btn-primary">Start reading <ArrowRight size={14} aria-hidden="true" /></Link> : <span className="muted">Notes are being prepared.</span>}</aside></div>
    <Disclaimer />
    <div className="section-label"><h2>Course syllabus</h2><span>{course.modules.length} ordered modules</span></div>
    {course.modules.length ? <div className="syllabus-list">{course.modules.map((item, index) => { const available = item.note?.status === 'PUBLISHED' && !item.note.deletedAt; const content = <><span className="module-number">{String(index + 1).padStart(2, '0')}</span><div className="module-detail"><h2>{item.title}</h2><p>{item.description}</p>{!available && <small className="muted">Syllabus published · notes in preparation</small>}</div><span className="module-extra"><Clock3 size={13} aria-hidden="true" />{item.estimatedMinutes} min</span>{available && <ArrowRight size={18} aria-hidden="true" />}</>; return available ? <Link className="module-row" key={item.id} href={`/notes/${course.slug}/${item.slug}`}>{content}</Link> : <div className="module-row" key={item.id}>{content}</div>; })}</div> : <div className="empty-state"><BookOpen size={30} aria-hidden="true" /><h2>The syllabus is taking shape.</h2><p>Published modules will appear here when the editor makes them available.</p></div>}
    <Footer />
  </>;
}
