import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { BookOpen, ChevronRight, Sprout } from 'lucide-react';
import { auth, signOut } from '@/lib/auth';
import { Brand } from '@/components/brand';
import { Navigation } from '@/components/navigation';
import { ThemePicker } from '@/components/preferences';
import { PwaRegistration } from '@/components/pwa-registration';
import { BackToTop } from '@/components/back-to-top';
import { RouteLoader } from '@/components/route-loader';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.USERS_URL ?? 'http://localhost:3000'),
  title: { default: 'Beyond Syllabus — Learn, Explore, Apply', template: '%s | Beyond Syllabus' },
  description: 'Learn, explore, and apply with clear course notes, practical explanations, and interactive study tools from Beyond Syllabus.',
  icons: { icon: '/icon.svg', apple: '/icon.svg' },
  openGraph: { title: 'Beyond Syllabus', description: 'Learn, explore, and apply beyond the syllabus.', type: 'website', siteName: 'Beyond Syllabus' },
  twitter: { card: 'summary', title: 'Beyond Syllabus', description: 'Learn, explore, and apply beyond the syllabus.' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#173b73' };
export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return <html lang="en" data-theme="light" suppressHydrationWarning><body><PwaRegistration />
    <a href="#main-content" className="skip-link">Skip to content</a>
    <div className="app-layout">
      <aside className="sidebar"><Brand /><div className="sidebar-label">Your study space</div><Navigation signedIn={!!session} />
        <div className="sidebar-bottom"><div className="sidebar-note"><Sprout size={21} strokeWidth={1.4} aria-hidden="true" /><strong>A little understanding, every day.</strong><p>Good learning starts with curiosity. Take it one concept at a time.</p></div><div className="sidebar-legal"><Link href="/content-policy">Independent project</Link><span>v0.1</span></div></div>
      </aside>
      <header className="topbar"><Brand mobile /><div className="topbar-context"><BookOpen size={15} strokeWidth={1.5} aria-hidden="true" /><span>Your study space</span><ChevronRight size={12} aria-hidden="true" /><strong>Learn at your pace</strong></div>
        <div className="topbar-actions"><ThemePicker /><span className="topbar-divider" />{session?.user ? <><Link href="/home" className="text-link">{session.user.name?.split(' ')[0] ?? 'My workspace'}</Link><form action={async () => { 'use server'; await signOut({ redirectTo: '/notes' }); }}><button type="submit" className="btn btn-secondary">Sign out</button></form></> : <><Link href="/login" className="text-link">Sign in</Link><Link href="/register" className="btn btn-primary">Create account <ChevronRight size={13} aria-hidden="true" /></Link></>}</div>
      </header>
      <main id="main-content" className="page-container" tabIndex={-1}>{children}</main>
      <RouteLoader />
      <BackToTop />
      <Navigation mobile signedIn={!!session} />
    </div>
  </body></html>;
}
