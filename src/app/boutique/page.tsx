import Link from 'next/link';
import { products, categoryLabels, type ProductCategory } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boutique | La Coquette',
  description: 'Découvrez toutes nos créations : boucles d\'oreilles, bracelets et colliers artisanaux en acier inoxydable doré.',
};

const categories: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Tout voir' },
  { value: 'boucles', label: "Boucles d'oreilles" },
];

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const activeCat = cat as ProductCategory | undefined;

  const filtered = activeCat
    ? products.filter(p => p.category === activeCat)
    : products;

  return (
    <div className="pt-20 min-h-screen bg-ivoire">
      {/* En-tête */}
      <div className="bg-rose py-20 text-center">
        <span className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-or">
          Nos créations
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-noir mt-3">
          La Boutique
        </h1>
        <p className="font-body text-sm text-taupe mt-4 max-w-md mx-auto leading-relaxed">
          Bijoux artisanaux en acier inoxydable doré, pour révéler votre élégance au quotidien.
        </p>
      </div>

      {/* Filtres */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map(c => (
            <Link
              key={c.value}
              href={c.value === 'all' ? '/boutique' : `/boutique?cat=${c.value}`}
              className={`font-body text-[10px] font-medium tracking-[0.18em] uppercase px-6 py-2.5 border transition-colors duration-200 ${
                (c.value === 'all' && !activeCat) || c.value === activeCat
                  ? 'bg-noir text-blanc border-noir'
                  : 'border-gris text-taupe hover:border-or hover:text-or'
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>

        {/* Résultat */}
        <p className="font-body text-xs text-taupe text-center mt-6">
          {filtered.length} création{filtered.length > 1 ? 's' : ''}
          {activeCat ? ` · ${categoryLabels[activeCat]}` : ''}
        </p>
      </div>

      {/* Grille produits */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
