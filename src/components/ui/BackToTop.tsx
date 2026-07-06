'use client';

import { useEffect, useState } from 'react';

// Bouton « revenir en haut » : apparaît quand on a bien descendu la page.
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function toTop() {
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number) => void } }).lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      type="button"
      aria-label="Revenir en haut"
      onClick={toTop}
      className={`fixed bottom-24 sm:bottom-6 right-4 sm:right-6 z-40 w-11 h-11 rounded-full bg-noir text-blanc flex items-center justify-center shadow-lg hover:bg-or transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
