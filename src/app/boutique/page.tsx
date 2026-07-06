import { getProducts, getCollections } from '@/sanity/lib/products';
import { getBoutiqueContent } from '@/sanity/lib/content';
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boutique',
  description: 'Découvrez toutes nos créations : boucles d\'oreilles artisanales en acier inoxydable doré, élégantes et durables.',
};

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;

  const [products, collections, { heading, intro }] = await Promise.all([
    getProducts(),
    getCollections(),
    getBoutiqueContent(),
  ]);

  // Filtre actif : slug de collection valide, sinon « tout ».
  const active = collections.some((col) => col.slug === c) ? c : undefined;
  const filtered = active
    ? products.filter((p) => p.collection?.slug === active)
    : products;

  const tab = 'font-body text-xs sm:text-[13px] tracking-[0.12em] uppercase pb-1.5 border-b transition-colors';

  return (
    <div className="pt-32 md:pt-44 min-h-screen bg-ivoire">
      {/* En-tête */}
      <div className="bg-rose py-24 text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-noir">
          {heading}
        </h1>
        <p className="font-body text-sm text-taupe mt-4 max-w-md mx-auto leading-relaxed">
          {intro}
        </p>
      </div>

      {/* Filtres par collection */}
      {collections.length > 0 && (
        <nav
          aria-label="Collections"
          className="max-w-7xl mx-auto px-6 pt-10 flex flex-wrap justify-center gap-x-7 gap-y-3"
        >
          <Link
            href="/boutique"
            aria-current={!active ? 'page' : undefined}
            className={`${tab} ${!active ? 'text-noir border-noir' : 'text-taupe border-transparent hover:text-noir'}`}
          >
            Tout
          </Link>
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/boutique?c=${col.slug}`}
              aria-current={active === col.slug ? 'page' : undefined}
              className={`${tab} ${active === col.slug ? 'text-noir border-noir' : 'text-taupe border-transparent hover:text-noir'}`}
            >
              {col.name}
            </Link>
          ))}
        </nav>
      )}

      {/* Grille produits */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-24">
        <p className="font-body text-xs text-taupe tracking-[0.12em] uppercase text-center mb-10">
          {filtered.length} création{filtered.length > 1 ? 's' : ''}
        </p>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="font-body text-sm text-taupe text-center py-16">
            Aucune création dans cette collection pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
