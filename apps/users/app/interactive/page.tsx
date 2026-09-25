import { InteractiveWalkthrough } from '@/components/interactive-walkthrough';
import { getLearningStudio } from '@/lib/learning-studio';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Interactive study lab', description: 'Step through published course content with guided explanations and active concept maps.' };

export default async function InteractivePage() {
  const { modules } = await getLearningStudio();
  return <><div className="page-heading"><div><p className="eyebrow">LEARN BY MOVING THROUGH THE IDEA</p><h1>Interactive study lab.</h1><p>Turn published course material into a guided walkthrough with visible progress, focused explanations, and deeper learning prompts.</p></div></div><InteractiveWalkthrough modules={modules}/></>;
}
