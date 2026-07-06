export type ProductCategory = 'boucles';

export type ProductCollection = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  collection?: ProductCollection | null;
  price: number;
  description: string;
  material: string;
  image: string;
  featured?: boolean;
  available?: boolean;
};

export const categoryLabels: Record<ProductCategory, string> = {
  boucles: "Boucles d'oreilles",
};
