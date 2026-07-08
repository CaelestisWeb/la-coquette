'use client';

import { useEffect } from 'react';

type LenisLike = { raf: (t: number) => void; destroy: () => void; scrollTo: (t: number) => void };

// Défilement fluide et inertiel (ressenti « premium »), DESKTOP uniquement.
// Lenis est chargé en différé (import dynamique) : il n'est pas dans le bundle
// initial, et jamais téléchargé sur mobile (défilement natif conservé).
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf = 0;
    let lenis: LenisLike | undefined;
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }) as unknown as LenisLike;
      (window as unknown as { lenis?: LenisLike }).lenis = lenis;
      const loop = (time: number) => {
        lenis!.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      delete (window as unknown as { lenis?: LenisLike }).lenis;
    };
  }, []);

  return null;
}
