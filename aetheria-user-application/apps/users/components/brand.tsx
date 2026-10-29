import Image from 'next/image';
import Link from 'next/link';

export function Brand({ mobile = false }: { mobile?: boolean }) {
  return <Link href="/notes" className={`brand${mobile ? ' mobile-brand' : ''}`} aria-label="Beyond Syllabus home">
    <Image className="brand-image brand-image-light" src="/beyond-syllabus-lockup.png" alt="Beyond Syllabus — Apply, Explore, Learn" width={1097} height={294} priority />
    <Image className="brand-image brand-image-dark" src="/beyond-syllabus-lockup-dark.png" alt="" width={1097} height={294} priority aria-hidden="true" />
  </Link>;
}
