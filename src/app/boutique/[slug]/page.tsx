import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProducts, getProductBySlug } from '@/sanity/lib/products';
import { categoryLabels } from '@/sanity/lib/productTypes';
import AddToCartButton from './AddToCartButton';
import StickyAddToCart from './StickyAddToCart';
import ProductGallery from '@/components/ui/ProductGallery';
import ProductDetails from '@/components/ui/ProductDetails';
import ProductCard from '@/components/ui/ProductCard';
import ProductReviews, { ReviewStars } from '@/components/ui/ProductReviews';
import ProductTrust from '@/components/ui/ProductTrust';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const ogImage = product.image.startsWith('http') ? product.image : undefined;
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/boutique/${product.slug}` },
    openGraph: {
      title: `${product.name} · La Coquette`,
      description: product.description,
      url: `https://lacoquette-bycaro.fr/boutique/${product.slug}`,
      type: 'website',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 1200, alt: product.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} · La Coquette`,
      description: product.description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const allProducts = await getProducts();
  const related = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  const reviews = product.reviews ?? [];
  const reviewAvg = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image.startsWith('http') ? product.image : `https://lacoquette-bycaro.fr${product.image}`,
    material: product.material,
    brand: { '@type': 'Brand', name: 'La Coquette' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: product.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/SoldOut',
      url: `https://lacoquette-bycaro.fr/boutique/${product.slug}`,
    },
    // Étoiles dans Google : uniquement s'il y a de vrais avis.
    ...(reviews.length > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: reviewAvg.toFixed(1),
            reviewCount: reviews.length,
            bestRating: 5,
            worstRating: 1,
          },
          review: reviews.map((r) => ({
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
            author: { '@type': 'Person', name: r.author || 'Cliente' },
            reviewBody: r.text,
            ...(r.date ? { datePublished: r.date } : {}),
          })),
        }
      : {}),
  };

  return (
    <div className="pt-32 md:pt-44 min-h-screen bg-ivoire">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Fil d'ariane */}
        <nav className="font-body text-[10px] text-taupe tracking-wide uppercase mb-10 flex items-center justify-center gap-2" aria-label="Fil d'ariane">
          <Link href="/" className="hover:text-or transition-colors">Accueil</Link>
          <span aria-hidden>/</span>
          <Link href="/boutique" className="hover:text-or transition-colors">Boutique</Link>
          <span aria-hidden>/</span>
          <Link href="/boutique" className="hover:text-or transition-colors">
            {categoryLabels[product.category]}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-noir" aria-current="page">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Galerie photos */}
          <ProductGallery images={product.gallery} alt={product.name} productId={product.id} />

          {/* Infos produit */}
          <div className="lg:sticky lg:top-28 text-center">
            <span className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-taupe">
              {categoryLabels[product.category]}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-noir mt-3">
              {product.name}
            </h1>
            <p className="font-display text-3xl text-noir mt-4">{product.price} €</p>
            {product.available && (
              <p className="mt-3 font-body text-[11px] font-medium tracking-[0.18em] uppercase text-taupe">
                Pièce unique · faite main
              </p>
            )}

            {reviews.length > 0 && (
              <a
                href="#avis"
                className="mt-4 inline-flex items-center gap-2 group"
                aria-label={`${reviews.length} avis, note moyenne ${reviewAvg.toFixed(1)} sur 5`}
              >
                <ReviewStars value={reviewAvg} size={15} />
                <span className="font-body text-xs text-taupe group-hover:text-noir transition-colors underline underline-offset-4 decoration-transparent group-hover:decoration-inherit">
                  {reviews.length} avis
                </span>
              </a>
            )}

            <p className="font-body text-base text-taupe leading-relaxed mt-6 max-w-md mx-auto">
              {product.description}
            </p>

            {/* Réassurance */}
            <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2.5">
              {['Fait main dans la Drôme', 'Hypoallergénique, sans nickel', 'Résistant à l\'eau', 'Ne ternit pas'].map(a => (
                <li key={a} className="flex items-center gap-1.5 font-body text-xs text-taupe">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A8842E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {a}
                </li>
              ))}
            </ul>

            {/* Bouton panier (ou mention « vendu » pour une pièce unique) */}
            {product.available ? (
              <>
                <div id="main-add-to-cart" className="mt-10">
                  <AddToCartButton product={product} />
                </div>
                <ProductTrust />
              </>
            ) : (
              <div className="mt-10 p-5 bg-beige rounded-lg text-center">
                <p className="font-body text-sm font-medium text-noir tracking-wide uppercase">Pièce unique, déjà vendue</p>
                <p className="font-body text-xs text-taupe mt-1.5 leading-relaxed">
                  Chaque bijou est une création unique. Découvrez les autres pièces disponibles dans la boutique.
                </p>
                <Link href="/boutique" className="inline-block mt-4 font-body text-xs tracking-[0.12em] uppercase text-noir border border-noir px-6 py-2.5 rounded hover:bg-noir hover:text-blanc transition-colors">
                  Voir la boutique
                </Link>
              </div>
            )}

            {/* Détails repliables */}
            <ProductDetails />
          </div>
        </div>

        {/* Avis clientes (réels) */}
        <ProductReviews reviews={reviews} />

        {/* Produits similaires */}
        {related.length > 0 && (
          <section className="mt-24">
            <div className="text-center mb-10">
              <span className="font-body text-[10px] font-medium tracking-[0.25em] uppercase text-taupe">
                Sélection
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-noir mt-2">Vous aimerez aussi</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} reveal />
              ))}
            </div>
          </section>
        )}
      </div>

      {product.available && <StickyAddToCart product={product} />}
    </div>
  );
}
