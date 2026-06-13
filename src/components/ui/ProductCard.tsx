'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/products';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
  }

  const catLabel =
    product.category === 'boucles' ? "Boucles d'oreilles"
    : product.category === 'bracelets' ? 'Bracelets'
    : 'Colliers';

  return (
    <Link href={`/boutique/${product.slug}`} className="group block bg-blanc overflow-hidden">

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-beige">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay hover — desktop uniquement */}
        <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/10 transition-all duration-300 hidden sm:flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
          <button
            onClick={handleAdd}
            className="bg-blanc text-noir text-[10px] font-body font-semibold tracking-widest uppercase px-6 py-2.5 hover:bg-or hover:text-blanc transition-colors duration-200"
          >
            Ajouter au panier
          </button>
        </div>
      </div>

      {/* Infos */}
      <div className="p-3 sm:p-4">
        <p className="text-[9px] sm:text-[10px] font-body font-medium tracking-[0.15em] uppercase text-taupe mb-1">
          {catLabel}
        </p>
        <h3 className="font-display text-base sm:text-lg text-noir group-hover:text-or transition-colors duration-200 leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-1.5">
          <p className="font-body text-sm text-taupe">{product.price} €</p>
          {/* Bouton panier — mobile uniquement */}
          <button
            onClick={handleAdd}
            className="sm:hidden text-[9px] font-body tracking-wide uppercase py-1.5 px-3 border border-gris text-taupe hover:border-or hover:text-or active:bg-or active:text-blanc active:border-or transition-colors duration-150"
          >
            + Panier
          </button>
        </div>
      </div>

    </Link>
  );
}
