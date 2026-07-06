'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/sanity/lib/productTypes';

// Barre « Ajouter au panier » collante en bas sur mobile : apparaît quand le
// bouton principal est passé au-dessus de l'écran (on a descendu la fiche).
export default function StickyAddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById('main-add-to-cart');
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-creme/95 backdrop-blur border-t border-gris px-4 py-3 flex items-center gap-3 transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm text-noir truncate">{product.name}</p>
        <p className="font-body text-xs text-taupe">{product.price} €</p>
      </div>
      <button
        onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
        className="shrink-0 bg-noir text-blanc font-body text-[11px] font-medium tracking-widest uppercase px-6 py-3 rounded hover:bg-or transition-colors"
      >
        Ajouter
      </button>
    </div>
  );
}
