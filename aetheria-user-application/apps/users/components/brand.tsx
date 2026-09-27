import Image from 'next/image';
import Link from 'next/link';

export function Brand({ mobile = false }: { mobile?: boolean }) {
  return <Link href="/notes" className={`brand${mobile ? ' mobile-brand' : ''}`} aria-label="Beyond Syllabus home">
    <Image className="brand-image brand-image-light" src="/beyond-syllabus-logo.svg" alt="Beyond Syllabus — Learn, Explore, Apply" width={360} height={96} priority />
    <Image className="brand-image brand-image-dark" src="/beyond-syllabus-logo-dark.svg" alt="" width={360} height={96} priority aria-hidden="true" />
  </Link>;
}
