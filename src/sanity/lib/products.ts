import { sanityFetch } from './fetch';
import { urlForImage } from './image';
import type { Product } from './productTypes';

const FIELDS = `
  "id": _id,
  "slug": slug.current,
  name, category, price, description, material, featured, available,
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
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: (p.category as Product['category']) || 'boucles',
    price: p.price,
    description: p.description || '',
    material: p.material || '',
    image,
    featured: Boolean(p.featured),
    available: p.available !== false,
  };
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

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const p = await sanityFetch<any>(
    `*[_type == "product" && slug.current == $slug][0]{ ${FIELDS} }`,
    { slug },
  );
  return p ? toProduct(p) : null;
}
