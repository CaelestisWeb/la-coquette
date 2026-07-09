import 'server-only';
import { writeClient } from '@/sanity/lib/writeClient';
import { urlForImage } from '@/sanity/lib/image';

/* eslint-disable @typescript-eslint/no-explicit-any */

export type GestionProduct = {
  id: string; name: string; price: number; description: string; material: string;
  available: boolean; featured: boolean; order: number; slug: string;
  collectionId: string; thumb: string | null; couleurs: string[];
};
export type GestionCollection = { id: string; name: string };

// Liste des produits + collections pour le back-office. Partagé entre la page
// (rendu serveur, chargement immédiat) et l'API (rafraîchissements).
export async function getGestionProducts(): Promise<{ products: GestionProduct[]; collections: GestionCollection[] }> {
  const [items, cols]: [any[], any[]] = await Promise.all([
    writeClient.fetch(
      `*[_type == "product"] | order(order asc, _createdAt asc){
        _id, name, price, description, material, couleurs, available, featured, order,
        "slug": slug.current, "collectionId": collection._ref, "image": images[0]
      }`,
    ),
    writeClient.fetch(
      `*[_type == "collection"] | order(order asc, name asc){ "id": _id, name }`,
    ),
  ]);
  const products = items.map((p) => ({
    id: p._id,
    name: p.name || '',
    price: typeof p.price === 'number' ? p.price : 0,
    description: p.description || '',
    material: p.material || '',
    available: p.available !== false,
    featured: !!p.featured,
    order: typeof p.order === 'number' ? p.order : 0,
    slug: p.slug || '',
    collectionId: p.collectionId || '',
    thumb: p.image?.asset ? urlForImage(p.image).width(160).height(160).fit('crop').url() : null,
    couleurs: Array.isArray(p.couleurs) ? p.couleurs.filter((c: any) => typeof c === 'string') : [],
  }));
  const collections = (cols || []).map((c) => ({ id: c.id, name: c.name || '' }));
  return { products, collections };
}
