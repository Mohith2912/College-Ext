'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setVisible(window.scrollY > 520));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
    };
  }, []);

  function returnToTop() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  return <button
    type="button"
    className={`back-to-top${visible ? ' is-visible' : ''}`}
    onClick={returnToTop}
    aria-label="Back to top"
    title="Back to top"
    tabIndex={visible ? 0 : -1}
  >
    <ArrowUp size={20} strokeWidth={2} aria-hidden="true" />
  </button>;
}
