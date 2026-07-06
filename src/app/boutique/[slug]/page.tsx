import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProducts, getProductBySlug } from '@/sanity/lib/products';
import { categoryLabels } from '@/sanity/lib/productTypes';
import AddToCartButton from './AddToCartButton';
import StickyAddToCart from './StickyAddToCart';
import ProductGallery from '@/components/ui/ProductGallery';
import ProductCard from '@/components/ui/ProductCard';
import { SHIPPING_THRESHOLD } from '@/lib/shipping';
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
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const allProducts = await getProducts();
  const related = allProducts.filter(p => p.id !== product.id).slice(0, 4);

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
          <Link href={`/boutique?cat=${product.category}`} className="hover:text-or transition-colors">
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
            <span className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-or">
              {categoryLabels[product.category]}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-noir mt-3">
              {product.name}
            </h1>
            <p className="font-display text-3xl text-or mt-4">{product.price} €</p>

            <p className="font-body text-base text-taupe leading-relaxed mt-6 max-w-md mx-auto">
              {product.description}
            </p>

            {/* Matière */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="w-4 h-px bg-or" />
              <span className="font-body text-xs text-taupe tracking-wide">{product.material}</span>
            </div>

            {/* Avantages */}
            <ul className="mt-6 space-y-2 inline-flex flex-col items-start mx-auto">
              {['Hypoallergénique', 'Résistant à l\'eau', 'Livraison soignée par La Poste'].map(a => (
                <li key={a} className="flex items-center gap-2 font-body text-sm text-taupe">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {a}
                </li>
              ))}
            </ul>

            {/* Bouton panier (ou mention « vendu » pour une pièce unique) */}
            {product.available ? (
              <div id="main-add-to-cart" className="mt-10">
                <AddToCartButton product={product} />
              </div>
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

            {/* Livraison */}
            <div className="mt-6 p-4 bg-beige flex items-start gap-3 rounded-lg text-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5" aria-hidden>
                <rect x="1" y="6" width="13" height="11" rx="1" />
                <path d="M14 9h4l3 3v5h-7z" />
                <circle cx="6" cy="18.5" r="1.8" />
                <circle cx="18" cy="18.5" r="1.8" />
              </svg>
              <p className="font-body text-xs text-taupe leading-relaxed">
                <strong className="text-noir font-medium">Livraison La Poste</strong>, sous 3 à 5 jours ouvrés.
                Offerte dès {SHIPPING_THRESHOLD} € d'achat.
              </p>
            </div>
          </div>
        </div>

        {/* Produits similaires */}
        {related.length > 0 && (
          <section className="mt-24">
            <div className="text-center mb-10">
              <span className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-or">
                Sélection
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-noir mt-2">Vous aimerez aussi</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {product.available && <StickyAddToCart product={product} />}
    </div>
  );
}
