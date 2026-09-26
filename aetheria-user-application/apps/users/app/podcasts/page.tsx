import { PodcastStudio } from '@/components/podcast-studio';
import { getLearningStudio } from '@/lib/learning-studio';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Course conversations', description: 'Two-host study conversations organized by semester and grounded in published course notes.' };

export default async function PodcastsPage() {
  const { episodes } = await getLearningStudio();
  return <><div className="page-heading"><div><p className="eyebrow">LISTEN · QUESTION · CONNECT</p><h1>Course conversations.</h1><p>Choose a semester and listen to Mira and Arun unpack each course together. Every episode is built from published study material.</p></div></div><PodcastStudio episodes={episodes}/></>;
}
