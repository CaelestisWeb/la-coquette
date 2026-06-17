import { products, type ProductCategory } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import SectionLabel from '@/components/ui/SectionLabel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boutique | La Coquette',
  description: 'Découvrez toutes nos créations : boucles d\'oreilles artisanales en acier inoxydable doré, élégantes et durables.',
};

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
    <div className="pt-32 md:pt-40 min-h-screen bg-ivoire">
      {/* En-tête */}
      <div className="bg-rose py-24 text-center">
        <SectionLabel align="center">Nos créations</SectionLabel>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-noir mt-3">
          La Boutique
        </h1>
        <p className="font-body text-sm text-taupe mt-4 max-w-md mx-auto leading-relaxed">
          Bijoux artisanaux en acier inoxydable doré, pour révéler votre élégance au quotidien.
        </p>
      </div>

      {/* Grille produits */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-24">
        <p className="font-body text-xs text-taupe tracking-[0.12em] uppercase text-center mb-10">
          {filtered.length} création{filtered.length > 1 ? 's' : ''}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
