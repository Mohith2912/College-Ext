import Link from 'next/link';

export function Brand({ mobile = false }: { mobile?: boolean }) {
  return <Link href="/notes" className={`brand${mobile ? ' mobile-brand' : ''}`} aria-label="Aetheria Study Companion home">
    <svg className="brand-symbol" viewBox="0 0 36 42" fill="none" aria-hidden="true"><path d="M3 34 18 7l15 27M9 25h18M7 32c7-4 15-4 22 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M18 2v2M4 9l2 2M32 9l-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
    <span><span className="brand-name">aetheria</span><span className="brand-caption" style={{ display: 'block' }}>STUDY COMPANION</span></span>
  </Link>;
}
