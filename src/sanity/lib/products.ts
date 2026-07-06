import { stegaClean } from 'next-sanity';
import { sanityFetch } from './fetch';
import { urlForImage } from './image';
import type { Product, ProductCollection } from './productTypes';

const FIELDS = `
  "id": _id,
  "slug": slug.current,
  name, category, price, description, material, featured, available,
  "collection": collection->{ "id": _id, name, "slug": slug.current },
  "image": images[0]
`;

function toProduct(p: any): Product {
  let image = '/boucles-placeholder.jpg';
  try {
    if (p?.image?.asset) {
      image = urlForImage(p.image).width(900).height(900).fit('crop').url();
    }
  } catch {
    // garde le placeholder si l'image n'est pas exploitable
  }
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
    image,
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
