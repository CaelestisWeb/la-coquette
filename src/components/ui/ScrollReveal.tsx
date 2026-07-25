'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal, .lc-veil').forEach(el => obs.observe(el));

    // Filet de sécurité : si l'observer ne se déclenche pas (onglet en
    // arrière-plan, rendu headless, moteur bridé), rien ne doit rester
    // masqué. Au-delà de 2 s, tout ce qui est encore caché devient visible.
    const safety = window.setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible), .lc-veil:not(.visible)')
        .forEach(el => el.classList.add('visible'));
    }, 2000);

    return () => { obs.disconnect(); window.clearTimeout(safety); };
  }, [pathname]);

  return null;
}
