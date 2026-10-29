import { PodcastStudio } from '@/components/podcast-studio';

export const metadata = {
  title: 'Course Podcasts',
  description: 'Unit-by-unit audio companions for Beyond Syllabus courses.',
};

export default function PodcastsPage() {
  return <PodcastStudio />;
}
