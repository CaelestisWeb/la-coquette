'use client';

import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/products';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
      className="w-full bg-noir text-blanc font-body font-medium text-xs tracking-widest uppercase py-4 hover:bg-or transition-colors duration-300"
    >
      Ajouter au panier
    </button>
  );
}
