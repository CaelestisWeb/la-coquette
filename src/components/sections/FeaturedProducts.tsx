import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';
import SectionLabel from '@/components/ui/SectionLabel';
import { featuredProducts } from '@/data/products';

export default function FeaturedProducts() {
  return (
    <section className="bg-blanc py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Titre */}
        <div className="text-center mb-12 sm:mb-16 reveal">
          <SectionLabel align="center">Sélection</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-noir mt-3">
            Nos créations
          </h2>
          <p className="font-body font-light text-sm sm:text-base text-taupe leading-relaxed max-w-xl mx-auto mt-5">
            Créés avec passion par Caro, chaque bijou La Coquette est façonné en acier inoxydable de qualité, pour vous accompagner du matin au soir avec grâce et confiance.
          </p>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Lien boutique */}
        <div className="text-center mt-14 reveal">
          <Button href="/boutique" variant="ghost">
            Voir toute la boutique →
          </Button>
        </div>
      </div>
    </section>
  );
}
