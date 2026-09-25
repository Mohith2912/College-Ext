import { InteractiveWalkthrough } from '@/components/interactive-walkthrough';
import { getLearningStudio } from '@/lib/learning-studio';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Interactive study lab', description: 'Step through published course content with guided explanations and active concept maps.' };

export default async function InteractivePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const { modules } = await getLearningStudio();
  const course = typeof params.course === 'string' ? params.course : undefined;
  const module = typeof params.module === 'string' ? params.module : undefined;
  return <><div className="page-heading"><div><p className="eyebrow">LEARN BY MOVING THROUGH THE IDEA</p><h1>Interactive study lab.</h1><p>Each published module has its own checkpoints, explanations, and source link. Choose a semester, course, and module to begin.</p></div></div><InteractiveWalkthrough modules={modules} initialCourse={course} initialModule={module}/></>;
}
