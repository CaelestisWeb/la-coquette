import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';
import SectionLabel from '@/components/ui/SectionLabel';
import { featuredProducts } from '@/data/products';

export default function FeaturedProducts() {
  return (
    <section className="bg-blanc py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Titre */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12 sm:mb-16 reveal">
          <div>
            <SectionLabel>Sélection</SectionLabel>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-noir mt-3">
              Nos créations
            </h2>
          </div>
          <Button href="/boutique" variant="ghost">
            Voir toute la boutique →
          </Button>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
