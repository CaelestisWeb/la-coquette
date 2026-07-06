'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

// Affiche le nombre d'articles du panier dans le titre de l'onglet :
// « (2) La Coquette ». Le rAF laisse Next poser d'abord le titre de la page.
export default function CartTitle() {
  const { count } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const base = document.title.replace(/^\(\d+\)\s*/, '');
      document.title = count > 0 ? `(${count}) ${base}` : base;
    });
    return () => cancelAnimationFrame(id);
  }, [count, pathname]);

  return null;
}
