import Link from 'next/link';
import { Info } from 'lucide-react';

export function Disclaimer() {
  return <aside className="notice"><Info size={16} aria-hidden="true" /><p><strong>Independent by design.</strong> Beyond Syllabus is an independent study companion, not an official institutional platform. Notes are original learning material and do not replace your official curriculum. <Link className="text-link" href="/content-policy">Our content policy</Link></p></aside>;
}
