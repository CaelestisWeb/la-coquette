'use client';

import { useCart } from '@/context/CartContext';
import type { Product } from '@/sanity/lib/productTypes';

// Pièces uniques : un seul exemplaire par bijou, donc pas de sélecteur de
// quantité. Un clic ajoute la pièce au panier.
export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
      className="w-full bg-noir text-blanc border border-noir font-body font-medium text-xs tracking-widest uppercase py-4 px-8 rounded hover:bg-or transition-colors duration-300"
    >
      Ajouter au panier
    </button>
  );
}
