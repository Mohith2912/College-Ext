'use client';

import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

function destinationLabel(url: URL): string {
  const path = url.pathname;
  if (path.startsWith('/learn')) return 'Opening your study session';
  if (path.startsWith('/podcasts')) return 'Opening course podcasts';
  if (path.startsWith('/interactive')) return 'Opening the practice lab';
  if (path.startsWith('/ai')) return 'Opening your study tutor';
  if (path.startsWith('/notes')) return 'Opening course notes';
  return 'Opening your study space';
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
  const [destination, setDestination] = useState<string | null>(null);
  const showTimer = useRef<number | null>(null);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    setDestination(null);
    if (showTimer.current) window.clearTimeout(showTimer.current);
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
  }, [pathname, searchParams]);

  useEffect(() => {
    const beginNavigation = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement) || !isInternalNavigation(anchor, event)) return;
      const nextUrl = new URL(anchor.href, window.location.href);
      if (showTimer.current) window.clearTimeout(showTimer.current);
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
      showTimer.current = window.setTimeout(() => setDestination(destinationLabel(nextUrl)), 120);
      resetTimer.current = window.setTimeout(() => setDestination(null), 10000);
    };

    document.addEventListener('click', beginNavigation, true);
    return () => {
      document.removeEventListener('click', beginNavigation, true);
      if (showTimer.current) window.clearTimeout(showTimer.current);
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    };
  }, []);

  if (!destination) return null;
  return <div className="route-loader" role="status" aria-live="polite" aria-label={destination} aria-busy="true">
    <div className="route-loader__content">
      <div className="route-loader__brand" aria-hidden="true">
        <Image className="route-loader__logo route-loader__logo--light" src="/beyond-syllabus-lockup.png" alt="" width={1097} height={294} priority />
        <Image className="route-loader__logo route-loader__logo--dark" src="/beyond-syllabus-lockup-dark.png" alt="" width={1097} height={294} priority />
      </div>
      <div className="route-loader__progress" aria-hidden="true"><span /></div>
      <p>{destination}</p>
    </div>
  </div>;
}
