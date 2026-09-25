import Link from 'next/link';

export function Footer() {
  return <footer className="page-footer"><span>Made for curious minds. An independent study companion.</span><nav className="footer-links" aria-label="Legal and accessibility"><Link href="/content-policy">Content policy</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/accessibility">Accessibility</Link></nav></footer>;
}
