import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';
import SectionLabel from '@/components/ui/SectionLabel';
import { getFeaturedProducts } from '@/sanity/lib/products';
import { getHomeContent } from '@/sanity/lib/content';

export default async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();
  const { featuredLabel, featuredHeading, featuredIntro, featuredCta } = await getHomeContent();
  return (
    <section className="bg-ivoire py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Titre */}
        <div className="text-center mb-12 sm:mb-16 reveal">
          <SectionLabel align="center">{featuredLabel}</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-noir mt-3">
            {featuredHeading}
          </h2>
          <p className="font-body font-light text-sm sm:text-base text-taupe leading-relaxed max-w-xl mx-auto mt-5">
            {featuredIntro}
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
          <Button
            href="/boutique"
            variant="secondary"
            className="!px-8 !py-3 hover:!bg-noir hover:!text-blanc"
          >
            {featuredCta}
          </Button>
        </div>
      </div>
    </section>
  );
}
