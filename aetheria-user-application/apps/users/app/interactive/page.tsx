import { InteractiveWalkthrough } from '@/components/interactive-walkthrough';
import { getLearningStudio } from '@/lib/learning-studio';
import { redirect } from 'next/navigation';
import { cnRepositoryUrl } from '@/lib/cn-repositories';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Interactive study lab', description: 'Step through published course content with guided explanations and active concept maps.' };

export default async function InteractivePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const { modules } = await getLearningStudio();
  const course = typeof params.course === 'string' ? params.course : undefined;
  const module = typeof params.module === 'string' ? params.module : undefined;
  // Always open the actual CN repository, never generated summary checkpoints.
  if (course === 'computer-networks') {
    const original = modules.find(item => item.courseSlug === course && item.moduleSlug === module);
    if (original && /^computer-networks-unit-[1-5]$/.test(original.moduleSlug)) {
      redirect(cnRepositoryUrl(original.moduleSlug)!);
    }
  }
  if (!course && modules.length && modules.every(item => item.courseSlug === 'computer-networks')) {
    redirect(cnRepositoryUrl(modules[0].moduleSlug)!);
  }
  return <><div className="page-heading"><div><p className="eyebrow">LEARN BY MOVING THROUGH THE IDEA</p><h1>Interactive study lab.</h1><p>Each published module has its own checkpoints, explanations, and source link. Choose a semester, course, and module to begin.</p></div></div><InteractiveWalkthrough modules={modules} initialCourse={course} initialModule={module}/></>;
}
