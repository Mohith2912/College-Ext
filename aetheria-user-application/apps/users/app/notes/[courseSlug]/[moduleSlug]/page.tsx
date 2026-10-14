import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ChevronRight, Clock3, FileText, PenLine } from 'lucide-react';
import { getModule } from '@/lib/library';
import { getTableOfContents } from '@/lib/markdown';
import { Disclaimer } from '@/components/disclaimer';
import { Footer } from '@/components/footer';
import { NoteMarkdown } from '@/components/markdown';
import { ReaderControls } from '@/components/reader-controls';
import { cnRepositoryUrl, cnEmbeddedUrl } from '@/lib/cn-repositories';
import { oopjCourseSlug, oopjEmbeddedUrl, oopjStandaloneUrl, oopjUnit } from '@/lib/oopj-reference';
import { esdCourseSlug, esdEmbeddedUrl, esdStandaloneUrl, esdUnit } from '@/lib/esd-reference';

type Props = { params: Promise<{ courseSlug: string; moduleSlug: string }>; searchParams: Promise<{ view?: string }> };
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { courseSlug, moduleSlug } = await params; const module = await getModule(courseSlug, moduleSlug); return { title: module?.title ?? 'Note unavailable', description: module?.description, alternates: { canonical: `/notes/${courseSlug}/${moduleSlug}` } }; }

export default async function NotePage({ params }: Props) {
  const { courseSlug, moduleSlug } = await params; const module = await getModule(courseSlug, moduleSlug); if (!module?.note) notFound();
  const unit = /^computer-networks-unit-([1-5])$/.exec(moduleSlug)?.[1];
  if (courseSlug === 'computer-networks' && unit) {
    return <><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/notes">Course notes</Link><ChevronRight size={12}/><Link href="/notes/computer-networks">Computer Networks</Link><ChevronRight size={12}/><span>Unit {unit}</span></nav><div className="mb-4 flex flex-wrap gap-3"><Link className="btn btn-secondary" href={`/learn?course=computer-networks&module=${moduleSlug}`}>Learn Unit {unit} for a test</Link><a className="btn btn-secondary" href={cnRepositoryUrl(moduleSlug)!} target="_blank" rel="noopener noreferrer">Open original unit full screen</a></div><iframe className="cn-unit-embed" title={`Complete original Computer Networks Unit ${unit}`} src={cnEmbeddedUrl(moduleSlug)!} /></>;
  }
  const javaUnit = courseSlug === oopjCourseSlug ? oopjUnit(moduleSlug) : undefined;
  if (javaUnit) {
    return <><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/notes">Course notes</Link><ChevronRight size={12}/><Link href={`/notes/${oopjCourseSlug}`}>Object Oriented Programming using Java</Link><ChevronRight size={12}/><span>Unit {javaUnit}</span></nav><div className="mb-4 flex flex-wrap gap-3"><Link className="btn btn-secondary" href={`/learn?course=${oopjCourseSlug}&module=${moduleSlug}`}>Learn Unit {javaUnit} for a test</Link><a className="btn btn-secondary" href={oopjStandaloneUrl(moduleSlug)} target="_blank" rel="noopener noreferrer">Open original unit full screen</a></div><iframe className="cn-unit-embed" title={`Complete Object Oriented Programming using Java Unit ${javaUnit}`} src={oopjEmbeddedUrl(moduleSlug)} /></>;
  }
  const embeddedUnit = courseSlug === esdCourseSlug ? esdUnit(moduleSlug) : undefined;
  if (embeddedUnit) {
    return <><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/notes">Course notes</Link><ChevronRight size={12}/><Link href={`/notes/${esdCourseSlug}`}>Embedded System Design</Link><ChevronRight size={12}/><span>Unit {embeddedUnit}</span></nav><div className="mb-4 flex flex-wrap gap-3"><Link className="btn btn-secondary" href={`/learn?course=${esdCourseSlug}&module=${moduleSlug}`}>Learn Unit {embeddedUnit} for a test</Link><a className="btn btn-secondary" href={esdStandaloneUrl(moduleSlug)} target="_blank" rel="noopener noreferrer">Open original unit full screen</a></div><iframe className="cn-unit-embed" title={`Complete Embedded System Design Unit ${embeddedUnit}`} src={esdEmbeddedUrl(moduleSlug)} /></>;
  }
  const toc = getTableOfContents(module.note.markdown);
  const index = module.course.modules.findIndex(item => item.slug === moduleSlug);
  const previous = module.course.modules[index - 1], next = module.course.modules[index + 1];
  const tocLinks = toc.map(item => <a key={item.id} href={`#${item.id}`} data-depth={item.depth}>{item.text}</a>);
  return <>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/notes">Course notes</Link><ChevronRight size={12} aria-hidden="true" /><Link href={`/notes/${courseSlug}`}>{module.course.title}</Link><ChevronRight size={12} aria-hidden="true" /><span aria-current="page">Module {String(module.position).padStart(2, '0')}</span></nav>
    <div className="reader-layout"><article className="reader-article"><header className="reader-heading"><div className="eyebrow">{module.course.code ?? module.course.subject} · Module {String(module.position).padStart(2, '0')}</div><h1>{module.note.title}</h1><p>{module.description}</p><div className="course-meta"><span><Clock3 size={13} aria-hidden="true" />{module.estimatedMinutes} min read</span><span><FileText size={13} aria-hidden="true" />Original study notes</span><span><PenLine size={13} aria-hidden="true" />Updated {new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(module.note.updatedAt))}</span></div><Link href={`/learn?course=${encodeURIComponent(courseSlug)}&module=${encodeURIComponent(moduleSlug)}`} className="btn btn-secondary mt-4 inline-flex">Learn this module for a test <ArrowRight size={14} aria-hidden="true" /></Link></header>
      {courseSlug === 'computer-networks' && unit === '2' && <a href={`/learn?course=${courseSlug}&module=${moduleSlug}`} className="btn btn-secondary mb-4 inline-flex">Practice Unit 2 for a test <ArrowRight size={14} aria-hidden="true" /></a>}
      <ReaderControls title={module.note.title} course={module.course.title} />
      {toc.length > 0 && <details className="mobile-toc"><summary>On this page · {toc.length} sections</summary><nav aria-label="Mobile table of contents">{tocLinks}</nav></details>}
      <div className="prose" id="note-content"><NoteMarkdown markdown={module.note.markdown} /></div>
      <div className="reader-end"><Disclaimer /></div><nav className="reader-pagination" aria-label="Adjacent modules">{previous ? <Link href={`/notes/${courseSlug}/${previous.slug}`}><ArrowLeft size={16} aria-hidden="true" /><span><small>PREVIOUS MODULE</small><strong>{previous.title}</strong></span></Link> : <Link href={`/notes/${courseSlug}`}><ArrowLeft size={16} aria-hidden="true" /><span><small>BACK TO COURSE</small><strong>View the full syllabus</strong></span></Link>}{next ? <Link href={`/notes/${courseSlug}/${next.slug}`}><span><small>NEXT MODULE</small><strong>{next.title}</strong></span><ArrowRight size={16} aria-hidden="true" /></Link> : <Link href={`/notes/${courseSlug}`}><span><small>YOU’VE REACHED THE LAST MODULE</small><strong>Revisit the course syllabus</strong></span><ArrowRight size={16} aria-hidden="true" /></Link>}</nav>
    </article><aside className="toc"><div className="toc-title">On this page</div><nav aria-label="Table of contents">{tocLinks}</nav><div className="toc-bottom"><strong>A note on these notes</strong><p>Original explanations to support your understanding. Check your official curriculum for assessment requirements.</p><Link href="/content-policy" className="text-link" style={{ fontSize: 11 }}>Sources & corrections <ArrowRight size={11} style={{ display: 'inline', verticalAlign: 'middle' }} aria-hidden="true" /></Link></div></aside></div>
    <Footer />
  </>;
}
