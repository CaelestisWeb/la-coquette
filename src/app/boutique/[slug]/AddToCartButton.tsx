'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/products';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Sélecteur de quantité */}
      <div className="flex items-center border border-gris w-fit rounded-md overflow-hidden">
        <button
          onClick={() => setQty(q => Math.max(1, q - 1))}
          className="w-11 h-12 flex items-center justify-center text-taupe hover:text-or transition-colors text-lg"
          aria-label="Diminuer la quantité"
        >−</button>
        <span className="font-body text-sm w-10 text-center" aria-live="polite">{qty}</span>
        <button
          onClick={() => setQty(q => q + 1)}
          className="w-11 h-12 flex items-center justify-center text-taupe hover:text-or transition-colors text-lg"
          aria-label="Augmenter la quantité"
        >+</button>
      </div>

      <button
        onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image }, qty)}
        className="flex-1 bg-noir text-blanc font-body font-medium text-xs tracking-widest uppercase py-4 px-8 rounded hover:bg-or transition-colors duration-300"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
