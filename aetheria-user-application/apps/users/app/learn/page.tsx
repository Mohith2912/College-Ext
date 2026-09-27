import { LearnForTest } from '@/components/learn-for-test';
import { getLearningStudio } from '@/lib/learning-studio';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Learn for a Test', description: 'Practice source-locked question banks with quizzes, flashcards, and authored recall prompts.' };

export default async function LearnPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const { modules } = await getLearningStudio();
  return <LearnForTest modules={modules.map(item => ({ id: item.id, course: item.course, courseCode: item.courseCode, courseSlug: item.courseSlug, module: item.module, moduleSlug: item.moduleSlug, termNumber: item.termNumber }))} initialCourse={typeof params.course === 'string' ? params.course : undefined} initialModule={typeof params.module === 'string' ? params.module : undefined} />;
}
