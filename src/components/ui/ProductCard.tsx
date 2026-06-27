'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { categoryLabels, type Product } from '@/sanity/lib/productTypes';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
  }

  const catLabel = categoryLabels[product.category];

  return (
    <Link href={`/boutique/${product.slug}`} className="group block bg-creme overflow-hidden">

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-beige rounded-md">
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
            className="bg-creme text-noir border border-noir text-[10px] font-body font-semibold tracking-widest uppercase px-6 py-2.5 rounded hover:bg-or hover:text-blanc transition-colors duration-200"
          >
            Ajouter au panier
          </button>
        </div>
      </div>

      {/* Infos */}
      <div className="p-3 sm:p-4 text-center">
        <p className="text-[9px] sm:text-[10px] font-body font-medium tracking-[0.15em] uppercase text-taupe mb-1">
          {catLabel}
        </p>
        <h3 className="font-display text-base sm:text-lg text-noir group-hover:text-or transition-colors duration-200 leading-snug">
          {product.name}
        </h3>
        <p className="font-body text-sm text-taupe mt-1.5">{product.price} €</p>
        {/* Bouton panier — mobile uniquement */}
        <button
          onClick={handleAdd}
          className="sm:hidden mt-3 text-[9px] font-body tracking-wide uppercase py-1.5 px-4 border border-noir text-taupe rounded hover:text-or active:bg-or active:text-blanc transition-colors duration-150"
        >
          + Panier
        </button>
      </div>

    </Link>
  );
}
