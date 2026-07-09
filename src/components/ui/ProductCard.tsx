import Image from 'next/image';
import Link from 'next/link';
import HeartButton from '@/components/ui/HeartButton';
import CardAddButton from '@/components/ui/CardAddButton';
import { categoryLabels, type Product } from '@/sanity/lib/productTypes';

// Composant SERVEUR : la carte (lien, images, textes) n'est pas hydratée.
// Seuls les petits îlots interactifs (cœur, ajout au panier) sont côté client,
// ce qui allège fortement le JS au chargement (surtout la grille boutique).
export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const catLabel = product.collection?.name || categoryLabels[product.category];
  const sold = product.available === false;

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
        {sold && (
          <span className="absolute top-2 left-2 z-10 bg-noir/85 text-blanc text-[9px] font-body tracking-[0.15em] uppercase px-2.5 py-1 rounded-full">
            Vendu
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          placeholder={product.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={product.blurDataURL}
          className={`object-cover cursor-zoom-in transition duration-700 ${sold ? 'opacity-60' : ''} ${
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
        {/* Overlay hover — desktop uniquement (masqué si vendu) */}
        {!sold && (
          <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/10 transition-all duration-300 hidden sm:flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
            <CardAddButton product={product} variant="overlay" />
          </div>
        )}
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
        {/* Bouton panier — mobile uniquement (ou « vendu ») */}
        {sold ? (
          <p className="sm:hidden mt-3 text-[9px] font-body tracking-[0.15em] uppercase text-taupe">Vendu</p>
        ) : (
          <CardAddButton product={product} variant="mobile" />
        )}
      </div>

    </Link>
  );
}
