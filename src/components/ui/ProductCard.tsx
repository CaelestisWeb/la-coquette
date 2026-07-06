'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import HeartButton from '@/components/ui/HeartButton';
import { categoryLabels, type Product } from '@/sanity/lib/productTypes';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
  }

  // Affiche la collection si le produit en a une, sinon le libellé de catégorie.
  const catLabel = product.collection?.name || categoryLabels[product.category];

  return (
    <Link href={`/boutique/${product.slug}`} className="group block bg-creme overflow-hidden">

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-beige rounded-md">
        {/* Favori — coin haut droit */}
        <div className="absolute top-2 right-2 z-10">
          <HeartButton
            productId={product.id}
            size={17}
            className="w-8 h-8 rounded-full bg-blanc/85 backdrop-blur-sm shadow-sm hover:bg-blanc"
          />
        </div>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          placeholder={product.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={product.blurDataURL}
          className={`object-cover cursor-zoom-in transition duration-700 ${
            product.hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'
          }`}
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
            placeholder={product.hoverBlurDataURL ? 'blur' : 'empty'}
            blurDataURL={product.hoverBlurDataURL}
            className="object-cover cursor-zoom-in absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}
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
