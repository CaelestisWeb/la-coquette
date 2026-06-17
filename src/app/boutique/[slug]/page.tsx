import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, getProductBySlug, categoryLabels } from '@/data/products';
import AddToCartButton from './AddToCartButton';
import ProductCard from '@/components/ui/ProductCard';
import { SHIPPING_THRESHOLD } from '@/lib/shipping';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | La Coquette`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter(p => p.id !== product.id).slice(0, 4);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `https://lacoquette-bycaro.fr${product.image}`,
    material: product.material,
    brand: { '@type': 'Brand', name: 'La Coquette' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `https://lacoquette-bycaro.fr/boutique/${product.slug}`,
    },
  };

  return (
    <div className="pt-32 md:pt-40 min-h-screen bg-ivoire">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Fil d'ariane */}
        <nav className="font-body text-[10px] text-taupe tracking-wide uppercase mb-10 flex items-center gap-2" aria-label="Fil d'ariane">
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

          {/* Image */}
          <div className="aspect-square relative overflow-hidden bg-beige">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Infos produit */}
          <div className="lg:sticky lg:top-28">
            <span className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-or">
              {categoryLabels[product.category]}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-noir mt-3">
              {product.name}
            </h1>
            <p className="font-display text-3xl text-or mt-4">{product.price} €</p>

            <p className="font-body text-base text-taupe leading-relaxed mt-6">
              {product.description}
            </p>

            {/* Matière */}
            <div className="mt-6 flex items-center gap-3">
              <span className="w-4 h-px bg-or" />
              <span className="font-body text-xs text-taupe tracking-wide">{product.material}</span>
            </div>

            {/* Avantages */}
            <ul className="mt-6 space-y-2">
              {['Hypoallergénique', 'Résistant à l\'eau', 'Livraison soignée par La Poste'].map(a => (
                <li key={a} className="flex items-center gap-2 font-body text-sm text-taupe">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {a}
                </li>
              ))}
            </ul>

            {/* Bouton panier */}
            <div className="mt-10">
              <AddToCartButton product={product} />
            </div>

            {/* Livraison */}
            <div className="mt-6 p-4 bg-beige flex items-start gap-3">
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
    </div>
  );
}
