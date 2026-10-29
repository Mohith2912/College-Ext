import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Learn for a Test', description: 'Practice source-locked question banks with quizzes, flashcards, and authored recall prompts.' };

export default async function InteractivePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const query = new URLSearchParams();
  if (typeof params.course === 'string') query.set('course', params.course);
  if (typeof params.module === 'string') query.set('module', params.module);
  redirect(`/learn${query.toString() ? `?${query.toString()}` : ''}`);
}
