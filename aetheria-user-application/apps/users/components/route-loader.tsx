'use client';

import { BrainCircuit, BookOpen, Headphones, Network, Sparkles } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type RouteMood = {
  label: string;
  detail: string;
  tone: 'library' | 'learn' | 'listen' | 'lab' | 'tutor' | 'default';
  Icon: typeof BookOpen;
};

function routeMood(url: URL): RouteMood {
  const path = url.pathname;
  if (path.startsWith('/learn')) return { label: 'Preparing your recall space', detail: 'Organising the next concept', tone: 'learn', Icon: BrainCircuit };
  if (path.startsWith('/podcasts')) return { label: 'Tuning the study signal', detail: 'Loading your listening room', tone: 'listen', Icon: Headphones };
  if (path.startsWith('/interactive')) return { label: 'Opening the practice lab', detail: 'Connecting the learning tools', tone: 'lab', Icon: Network };
  if (path.startsWith('/ai')) return { label: 'Warming up the study tutor', detail: 'Finding room for your question', tone: 'tutor', Icon: Sparkles };
  if (path.startsWith('/notes')) return { label: 'Mapping your course path', detail: 'Gathering the next set of notes', tone: 'library', Icon: BookOpen };
  return { label: 'Opening your study space', detail: 'A moment for the next idea', tone: 'default', Icon: BookOpen };
}

function isInternalNavigation(anchor: HTMLAnchorElement, event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.target || anchor.hasAttribute('download')) return false;
  const url = new URL(anchor.href, window.location.href);
  return url.origin === window.location.origin && url.pathname + url.search !== window.location.pathname + window.location.search;
}

export function RouteLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [destination, setDestination] = useState<RouteMood | null>(null);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    setDestination(null);
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
  }, [pathname, searchParams]);

  useEffect(() => {
    const beginNavigation = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement) || !isInternalNavigation(anchor, event)) return;
      const nextUrl = new URL(anchor.href, window.location.href);
      setDestination(routeMood(nextUrl));
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setDestination(null), 10000);
    };

    document.addEventListener('click', beginNavigation, true);
    return () => {
      document.removeEventListener('click', beginNavigation, true);
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    };
  }, []);

  if (!destination) return null;
  const { Icon } = destination;
  return <div className={`route-loader route-loader--${destination.tone}`} role="status" aria-live="polite" aria-label={destination.label}>
    <div className="route-loader__wash" />
    <div className="route-loader__constellation" aria-hidden="true"><i /><i /><i /><i /><i /></div>
    <div className="route-loader__card">
      <div className="route-loader__orbit" aria-hidden="true"><span /><span /><span /><Icon size={25} strokeWidth={1.55} /></div>
      <div className="route-loader__copy"><span className="route-loader__eyebrow">BEYOND SYLLABUS</span><strong>{destination.label}</strong><p>{destination.detail}</p></div>
      <div className="route-loader__progress" aria-hidden="true"><span /></div>
    </div>
  </div>;
}
