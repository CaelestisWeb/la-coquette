import { stegaClean } from 'next-sanity';
import { sanityFetch } from './fetch';
import { urlForImage } from './image';
import type { Product, ProductCollection } from './productTypes';

const FIELDS = `
  "id": _id,
  "slug": slug.current,
  name, category, price, description, material, featured, available,
  "collection": collection->{ "id": _id, name, "slug": slug.current },
  "images": images[]{ ..., "lqip": asset->metadata.lqip }
`;

function toProduct(p: any): Product {
  const gallery: Product['gallery'] = [];
  for (const img of (p?.images || [])) {
    try {
      if (img?.asset) {
        gallery.push({
          url: urlForImage(img).width(1200).height(1200).fit('crop').url(),
          blurDataURL: typeof img.lqip === 'string' ? img.lqip : undefined,
        });
      }
    } catch {
      // ignore une image non exploitable
    }
  }
  if (gallery.length === 0) gallery.push({ url: '/boucles-placeholder.jpg' });

  const collection: Product['collection'] = p?.collection?.id
    ? { id: p.collection.id, name: p.collection.name || '', slug: stegaClean(p.collection.slug) }
    : null;
  return {
    id: p.id,
    // slug sert au routage (URL) : on retire tout marquage stega de l'aperçu.
    slug: stegaClean(p.slug),
    name: p.name,
    category: (p.category as Product['category']) || 'boucles',
    collection,
    price: p.price,
    description: p.description || '',
    material: p.material || '',
    image: gallery[0].url,
    blurDataURL: gallery[0].blurDataURL,
    hoverImage: gallery[1]?.url,
    hoverBlurDataURL: gallery[1]?.blurDataURL,
    gallery,
    featured: Boolean(p.featured),
    available: p.available !== false,
  };
}

// Liste des collections (sous-catégories) pour les filtres de la boutique.
export async function getCollections(): Promise<ProductCollection[]> {
  const raw = await sanityFetch<any[]>(
    `*[_type == "collection"] | order(order asc, name asc){ "id": _id, name, "slug": slug.current }`,
  );
  return (raw || [])
    .filter((c) => c?.slug)
    .map((c) => ({ id: c.id, name: c.name || '', slug: stegaClean(c.slug) }));
}

export async function getProducts(): Promise<Product[]> {
  const raw = await sanityFetch<any[]>(
    `*[_type == "product"] | order(order asc, _createdAt asc){ ${FIELDS} }`,
  );
  return (raw || []).map(toProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const raw = await sanityFetch<any[]>(
    `*[_type == "product" && featured == true] | order(order asc){ ${FIELDS} }`,
  );
  return (raw || []).map(toProduct);
}

// Produits correspondant à une liste d'identifiants (pour la page favoris).
// L'ordre suit celui des ids fournis (favoris récents en premier, par ex.).
export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (!ids || ids.length === 0) return [];
  const raw = await sanityFetch<any[]>(
    `*[_type == "product" && _id in $ids]{ ${FIELDS} }`,
    { ids },
  );
  const byId = new Map((raw || []).map((p) => [p.id, toProduct(p)]));
  return ids.map((id) => byId.get(id)).filter(Boolean) as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const p = await sanityFetch<any>(
    `*[_type == "product" && slug.current == $slug][0]{ ${FIELDS} }`,
    { slug },
  );
  return p ? toProduct(p) : null;
}
