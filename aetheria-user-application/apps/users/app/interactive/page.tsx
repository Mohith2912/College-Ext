import { CnPracticeLabs } from '@/components/cn-practice-labs';
import { getLearningStudio } from '@/lib/learning-studio';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Interactive study lab', description: 'Step through published course content with guided explanations and active concept maps.' };

export default async function InteractivePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const { modules } = await getLearningStudio();
  const course = typeof params.course === 'string' ? params.course : undefined;
  const module = typeof params.module === 'string' ? params.module : undefined;
  // Supplementary labs are distinct from the complete original CN modules.
  if (course === 'computer-networks') {
    const original = modules.find(item => item.courseSlug === course && item.moduleSlug === module);
    if (original && /^computer-networks-unit-[1-5]$/.test(original.moduleSlug)) {
      return <CnPracticeLabs initialUnit={Number(original.moduleSlug.slice(-1))}/>;
    }
  }
  if (!course && modules.length && modules.every(item => item.courseSlug === 'computer-networks')) {
    return <CnPracticeLabs initialUnit={0}/>;
  }
  return <CnPracticeLabs initialUnit={0}/>;
}
