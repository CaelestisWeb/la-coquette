'use client';

import { useCart } from '@/context/CartContext';
import type { Product } from '@/sanity/lib/productTypes';

// Petit îlot interactif d'ajout au panier, intégré dans la carte produit
// (qui, elle, est un composant serveur). Deux variantes : le bouton en survol
// (desktop) et le bouton compact (mobile).
export default function CardAddButton({
  product,
  variant,
}: {
  product: Product;
  variant: 'overlay' | 'mobile';
}) {
  const { addItem } = useCart();

  function add(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
  }

  if (variant === 'overlay') {
    return (
      <button
        onClick={add}
        className="bg-creme text-noir border border-noir text-[10px] font-body font-semibold tracking-widest uppercase px-6 py-2.5 rounded hover:bg-or hover:text-blanc transition-colors duration-200"
      >
        Ajouter au panier
      </button>
    );
  }
  return (
    <button
      onClick={add}
      className="sm:hidden mt-3 text-[9px] font-body tracking-wide uppercase py-1.5 px-4 border border-noir text-taupe rounded hover:text-or active:bg-or active:text-blanc transition-colors duration-150"
    >
      + Panier
    </button>
  );
}
