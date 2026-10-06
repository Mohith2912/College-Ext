import type { Metadata } from 'next';
import { CnCaseStudySession } from '@/components/cn-case-study-session';

export const metadata: Metadata = {
  title: 'Computer Networks Case Study',
  description: 'Investigate a fictional campus streaming incident through an interactive Computer Networks case study.',
};

export default function CasesPage() {
  return <CnCaseStudySession />;
}
