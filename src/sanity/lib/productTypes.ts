export type ProductCategory = 'boucles';

export type ProductCollection = {
  id: string;
  name: string;
  slug: string;
};

export type ProductImage = { url: string; blurDataURL?: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  collection?: ProductCollection | null;
  price: number;
  description: string;
  material: string;
  image: string;              // première photo (compat)
  blurDataURL?: string;       // aperçu flou de la première photo
  hoverImage?: string;        // deuxième photo (survol des vignettes)
  hoverBlurDataURL?: string;
  gallery: ProductImage[];    // toutes les photos (page produit)
  featured?: boolean;
  available?: boolean;
};

export const categoryLabels: Record<ProductCategory, string> = {
  boucles: "Boucles d'oreilles",
};
