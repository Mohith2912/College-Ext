import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@aetheria/database';
import { editorialContext } from '@/lib/access';
import { AdminShell } from '@/components/shell';
import { MutationForm } from '@/components/mutation-form';

export const dynamic = 'force-dynamic';

export default async function Editor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ctx = await editorialContext();
  const course = await prisma.course.findFirst({
    where: { id, organizationId: ctx.organization.id, deletedAt: null },
    include: {
      modules: {
        where: { deletedAt: null },
        orderBy: { position: 'asc' },
        include: { note: { include: { versions: { orderBy: { version: 'desc' }, take: 5 } } } },
      },
    },
  });
  if (!course) notFound();
  const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(ctx.membership.role);
  const canEdit = isAdmin || ctx.membership.role === 'CONTENT_EDITOR';

  return <AdminShell name={ctx.user.name ?? ctx.user.email}>
    <Link href="/curriculum">← All syllabuses</Link>
    <header className="admin-header"><div><p className="admin-eyebrow" style={{ marginTop: 24 }}>SYLLABUS EDITOR</p><h1>{course.title}</h1><span className="admin-pill" data-status={course.status}>{course.status.replace('_', ' ')}</span></div>{course.status === 'PUBLISHED' && <Link className="admin-outline" target="_blank" href={`${process.env.USERS_URL ?? 'http://localhost:3000'}/notes/${course.slug}`}>View in user library ↗</Link>}</header>
    <section className="admin-panel"><h2>Course overview</h2>{canEdit ? <MutationForm action="updateCourse" entityId={course.id}><label>Title<input name="title" defaultValue={course.title} required minLength={3} maxLength={180} /></label><label>Subject<input name="subject" defaultValue={course.subject} required minLength={2} maxLength={100} /></label><label>Syllabus overview<textarea name="description" rows={5} defaultValue={course.description} required minLength={10} maxLength={10000} /></label></MutationForm> : <p>{course.description}</p>}</section>
    <section className="admin-panel"><h2>Modules & original notes</h2><p className="admin-muted">Saving a module creates a new revision. Publish the syllabus when the revision is ready for users.</p>{course.modules.map(module => <details className="admin-module" key={module.id}><summary>{String(module.position).padStart(2, '0')} · {module.title} <span className="admin-pill" data-status={module.status}>{module.status}</span></summary>{canEdit ? <MutationForm action="updateModule" entityId={module.id}><label>Module title<input name="title" defaultValue={module.title} required minLength={3} maxLength={180} /></label><label>Learning outcomes<textarea name="description" rows={3} defaultValue={module.description} required minLength={10} maxLength={10000} /></label><label>Reading time (minutes)<input name="estimatedMinutes" type="number" defaultValue={module.estimatedMinutes} min={1} max={240} required /></label><label>Study notes · Markdown<textarea className="code" name="markdown" defaultValue={module.note?.markdown ?? ''} required minLength={40} maxLength={50000} spellCheck={false} /></label><p className="admin-muted">Write original or authorized material. Include explanations, a fictional case study, and discussion questions.</p></MutationForm> : <pre style={{ whiteSpace: 'pre-wrap' }}>{module.note?.markdown}</pre>}<p className="admin-muted">Revision history: {module.note?.versions.map(version => `v${version.version} · ${version.createdAt.toLocaleDateString('en-IN')}`).join(' / ') || 'No saved versions'}</p></details>)}{!course.modules.length && <p className="admin-empty">Add the first module below.</p>}</section>
    {canEdit && <section className="admin-panel"><h2>Add a module</h2><MutationForm action="createModule" entityId={course.id} label="Add module"><label>Module title<input name="title" required minLength={3} maxLength={180} /></label><label>Learning outcomes<textarea name="description" required rows={3} minLength={10} maxLength={10000} /></label><label>Reading time (minutes)<input name="estimatedMinutes" type="number" required min={1} max={240} defaultValue={12} /></label><label>Original or authorized notes<textarea name="markdown" className="code" required minLength={40} maxLength={50000} placeholder={'## Learning objectives\n\nExplain the key ideas in your own words.\n\n## Case study\n\nIntroduce a fictional scenario and discussion questions.'} /></label></MutationForm></section>}
    <section className="admin-panel"><h2>Review & publish</h2><p className="admin-muted">Publishing makes this syllabus and all module notes available in the user app. Only publish material you have permission to share.</p><div className="admin-actions">{canEdit && <MutationForm action="submitCourse" entityId={course.id} label="Submit for review" />}{(isAdmin || ctx.membership.role === 'REVIEWER') && course.status === 'IN_REVIEW' && <MutationForm action="approveCourse" entityId={course.id} label="Approve review" />}{isAdmin && <><MutationForm action="publishCourse" entityId={course.id} label="Publish syllabus & modules" /><MutationForm action="archiveCourse" entityId={course.id} label="Archive syllabus" /></>}</div></section>
  </AdminShell>;
}
