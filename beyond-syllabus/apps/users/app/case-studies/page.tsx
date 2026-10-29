import type { Metadata } from 'next';
import Link from 'next/link';
import { BrainCircuit, Braces, Cpu, Network } from 'lucide-react';
import { CnCaseStudySession } from '@/components/cn-case-study-session';
import { EsdCaseStudySession } from '@/components/esd-case-study-session';
import { FaimlCaseStudySession } from '@/components/faiml-case-study-session';
import { OopjCaseStudySession } from '@/components/oopj-case-study-session';

export const metadata: Metadata = {
  title: 'Interactive Case Studies',
  description: 'Practise AI & Machine Learning, Computer Networks, Object-Oriented Programming, and Embedded Systems Design through detailed interactive sessions.',
};

export default async function CasesPage({ searchParams }: { searchParams: Promise<{ course?: string; unit?: string }> }) {
  const { course, unit } = await searchParams;
  const selectedCourse = course === 'faiml' ? 'faiml' : course === 'cn' ? 'cn' : course === 'esd' ? 'esd' : 'oopj';
  const initialUnit = unit ? Math.min(Math.max(parseInt(unit, 10) || 1, 1), 5) as 1 | 2 | 3 | 4 | 5 : 1;

  return <>
    <nav className="case-course-switcher" aria-label="Choose a case study course">
      <div><span>Case study studio</span><strong>Choose your investigation</strong></div>
      <div>
        <Link href="/case-studies?course=faiml" aria-current={selectedCourse === 'faiml' ? 'page' : undefined}><BrainCircuit size={17} aria-hidden="true" /><span><strong>AI & Machine Learning</strong><small>Calibrate and align an intelligent system</small></span></Link>
        <Link href="/case-studies?course=oopj" aria-current={selectedCourse === 'oopj' ? 'page' : undefined}><Braces size={17} aria-hidden="true" /><span><strong>OOP using Java</strong><small>Design and debug an object system</small></span></Link>
        <Link href="/case-studies?course=esd" aria-current={selectedCourse === 'esd' ? 'page' : undefined}><Cpu size={17} aria-hidden="true" /><span><strong>Embedded Systems Design</strong><small>Engineer a dependable field device</small></span></Link>
        <Link href="/case-studies?course=cn" aria-current={selectedCourse === 'cn' ? 'page' : undefined}><Network size={17} aria-hidden="true" /><span><strong>Computer Networks</strong><small>Diagnose a streaming incident</small></span></Link>
      </div>
    </nav>
    {selectedCourse === 'faiml' ? <FaimlCaseStudySession initialUnit={initialUnit} /> : selectedCourse === 'oopj' ? <OopjCaseStudySession /> : selectedCourse === 'esd' ? <EsdCaseStudySession /> : <CnCaseStudySession />}
  </>;
}
