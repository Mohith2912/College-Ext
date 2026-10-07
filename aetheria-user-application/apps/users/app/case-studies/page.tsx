import type { Metadata } from 'next';
import Link from 'next/link';
import { Braces, Network } from 'lucide-react';
import { CnCaseStudySession } from '@/components/cn-case-study-session';
import { OopjCaseStudySession } from '@/components/oopj-case-study-session';

export const metadata: Metadata = {
  title: 'Interactive Case Studies',
  description: 'Practise Computer Networks and Object-Oriented Programming through detailed, interactive case-study sessions.',
};

export default async function CasesPage({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  const { course } = await searchParams;
  const selectedCourse = course === 'cn' ? 'cn' : 'oopj';

  return <>
    <nav className="case-course-switcher" aria-label="Choose a case study course">
      <div><span>Case study studio</span><strong>Choose your investigation</strong></div>
      <div>
        <Link href="/case-studies?course=oopj" aria-current={selectedCourse === 'oopj' ? 'page' : undefined}><Braces size={17} aria-hidden="true" /><span><strong>OOP using Java</strong><small>Design and debug an object system</small></span></Link>
        <Link href="/case-studies?course=cn" aria-current={selectedCourse === 'cn' ? 'page' : undefined}><Network size={17} aria-hidden="true" /><span><strong>Computer Networks</strong><small>Diagnose a streaming incident</small></span></Link>
      </div>
    </nav>
    {selectedCourse === 'oopj' ? <OopjCaseStudySession /> : <CnCaseStudySession />}
  </>;
}
