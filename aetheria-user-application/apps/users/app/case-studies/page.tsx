import type { Metadata } from 'next';
import Link from 'next/link';
import { Braces, Cpu, Network } from 'lucide-react';
import { CnCaseStudySession } from '@/components/cn-case-study-session';
import { EsdCaseStudySession } from '@/components/esd-case-study-session';
import { OopjCaseStudySession } from '@/components/oopj-case-study-session';

export const metadata: Metadata = {
  title: 'Interactive Case Studies',
  description: 'Practise Computer Networks, Object-Oriented Programming, and Embedded Systems Design through detailed interactive sessions.',
};

export default async function CasesPage({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  const { course } = await searchParams;
  const selectedCourse = course === 'cn' ? 'cn' : course === 'esd' ? 'esd' : 'oopj';

  return <>
    <nav className="case-course-switcher" aria-label="Choose a case study course">
      <div><span>Case study studio</span><strong>Choose your investigation</strong></div>
      <div>
        <Link href="/case-studies?course=oopj" aria-current={selectedCourse === 'oopj' ? 'page' : undefined}><Braces size={17} aria-hidden="true" /><span><strong>OOP using Java</strong><small>Design and debug an object system</small></span></Link>
        <Link href="/case-studies?course=esd" aria-current={selectedCourse === 'esd' ? 'page' : undefined}><Cpu size={17} aria-hidden="true" /><span><strong>Embedded Systems Design</strong><small>Engineer a dependable field device</small></span></Link>
        <Link href="/case-studies?course=cn" aria-current={selectedCourse === 'cn' ? 'page' : undefined}><Network size={17} aria-hidden="true" /><span><strong>Computer Networks</strong><small>Diagnose a streaming incident</small></span></Link>
      </div>
    </nav>
    {selectedCourse === 'oopj' ? <OopjCaseStudySession /> : selectedCourse === 'esd' ? <EsdCaseStudySession /> : <CnCaseStudySession />}
  </>;
}
