'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

// Défilement fluide et inertiel (ressenti « premium »).
// Désactivé si l'utilisateur préfère réduire les animations.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Pas de smooth scroll sur tactile : le défilement natif est meilleur et
    // on évite une boucle rAF continue (gain perf mobile).
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      // ease-out-expo : départ rapide, fin très douce, sans rebond.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
