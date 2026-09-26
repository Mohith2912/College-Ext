'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Beaker, BookOpen, BriefcaseBusiness, ChevronRight, Headphones, House, Info, LogIn, Sparkles } from 'lucide-react';

export function Navigation({ mobile = false, signedIn = false }: { mobile?: boolean; signedIn?: boolean }) {
  const pathname = usePathname();
  const links = [
    { href: '/home', label: 'My workspace', mobile: 'Home', icon: House, mobileVisible: false },
    { href: '/notes', label: 'Course notes', mobile: 'Notes', icon: BookOpen },
    { href: '/podcasts', label: 'Course podcasts', mobile: 'Listen', icon: Headphones },
    { href: '/interactive', label: 'Interactive lab', mobile: 'Lab', icon: Beaker },
    { href: '/case-studies', label: 'Case studies', mobile: 'Cases', icon: BriefcaseBusiness },
    ...(signedIn ? [{ href: '/ai', label: 'AI study tutor', mobile: 'Tutor', icon: Sparkles }] : []),
    { href: '/about', label: 'About Aetheria', mobile: 'About', icon: Info, mobileVisible: false },
    ...(!signedIn ? [{ href: '/login', label: 'Sign in', mobile: 'Sign in', icon: LogIn }] : []),
  ];
  return <nav className={mobile ? 'mobile-nav' : 'side-nav'} aria-label={mobile ? 'Mobile navigation' : 'Main navigation'}>
    {links.filter(item => !mobile || item.mobileVisible !== false).map(item => {
      const active = pathname === item.href || (item.href === '/notes' && pathname.startsWith('/notes/'));
      return <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined}><item.icon size={17} strokeWidth={1.6} aria-hidden="true" /><span>{mobile ? item.mobile : item.label}</span>{!mobile && active && <ChevronRight size={13} className="nav-arrow" aria-hidden="true" />}</Link>;
    })}
  </nav>;
}
