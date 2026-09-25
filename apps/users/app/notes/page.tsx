import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Library, Search, Sprout } from 'lucide-react';
import { getLibrary } from '@/lib/library';
import { CourseCard } from '@/components/course-card';
import { Footer } from '@/components/footer';

export const metadata: Metadata = { title: 'Course notes', description: 'Browse original study notes and current syllabi by term, subject, and course.', alternates: { canonical: '/notes' } };
export const dynamic = 'force-dynamic';

export default async function NotesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const value = (name: string) => typeof params[name] === 'string' ? params[name].slice(0, 120) : '';
  const term = value('term'), subject = value('subject'), q = value('q'), availability = value('availability');
  const library = await getLibrary({ term, subject, q, availability });
  function termLink(slug?: string) { const next = new URLSearchParams(); if (slug) next.set('term', slug); if (subject) next.set('subject', subject); if (q) next.set('q', q); if (availability) next.set('availability', availability); return `/notes${next.size ? `?${next}` : ''}`; }
  return <>
    <div className="page-heading"><div><div className="eyebrow">A little clarity goes a long way</div><h1>Your course notes, thoughtfully organized.</h1><p>Find your course. Follow your curiosity. Build understanding, one module at a time.</p></div><div className="heading-mark"><BookOpen size={28} strokeWidth={1.25} aria-hidden="true" /></div></div>
    <div className="library-intro"><div className="intro-panel"><Sprout size={35} strokeWidth={1.2} aria-hidden="true" /><div><h2>A quieter place to learn.</h2><p>Original explanations, practical examples, and room to think. An independent study companion, made to sit alongside your official curriculum.</p></div></div><div className="stats-panel" aria-label="Library totals"><div className="stat"><strong>{library.courseCount}</strong><span>Courses</span></div><div className="stat-rule" /><div className="stat"><strong>{library.moduleCount}</strong><span>Modules</span></div></div></div>
    <div className="library-controls"><nav className="term-tabs" aria-label="Academic term"><Link href={termLink()} aria-current={!term ? 'page' : undefined}>All terms <span className="tab-count">{library.courseCount}</span></Link>{library.terms.map(item => <Link key={item.id} href={termLink(item.slug)} aria-current={term === item.slug ? 'page' : undefined}>Term {item.number}<span className="tab-count">{item._count.offerings}</span></Link>)}</nav><span className="muted" style={{ fontSize: 10 }}>Your next idea starts here</span></div>
    <form action="/notes" method="get" className="library-filters" role="search" aria-label="Filter course library">{term && <input type="hidden" name="term" value={term} />}<div className="filter-search"><label htmlFor="course-query" className="sr-only">Find a course</label><Search size={15} strokeWidth={1.5} aria-hidden="true" /><input id="course-query" className="input" name="q" placeholder="Find a course…" defaultValue={q} maxLength={120} /></div><label className="sr-only" htmlFor="course-subject">Subject</label><select id="course-subject" name="subject" className="select" defaultValue={subject}><option value="">All subjects</option>{library.subjects.map(item => <option key={item} value={item}>{item}</option>)}</select><label className="sr-only" htmlFor="course-availability">Availability</label><select id="course-availability" name="availability" className="select" defaultValue={availability}><option value="">All courses</option><option value="notes">Notes available</option></select><button className="btn btn-secondary" type="submit">Apply</button>{(q || subject || availability) && <Link href={termLink(term || undefined).split('?')[0] + (term ? `?term=${encodeURIComponent(term)}` : '')} className="btn btn-ghost">Clear</Link>}<span className="filter-count">Showing {library.courses.length} {library.courses.length === 1 ? 'course' : 'courses'}</span></form>
    {library.courses.length ? <div className="course-grid">{library.courses.map(course => <CourseCard key={course.id} course={course} />)}</div> : <div className="empty-state"><Library size={32} strokeWidth={1.3} aria-hidden="true" /><h2>No courses found</h2><p>Try another term or a broader course name. Published courses appear here as soon as they are available.</p><Link href="/notes" className="btn btn-secondary">View all courses</Link></div>}
    <div className="library-bottom"><div><h3>Make yourself a little space for learning.</h3><p>Create your account to enter your study workspace. Public notes are always open to explore.</p></div><Link href="/register" className="btn btn-secondary">Start your study space <ArrowRight size={14} aria-hidden="true" /></Link></div>
    <Footer />
  </>;
}
