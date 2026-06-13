export type ProductCategory = "boucles";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  material: string;
  image: string;
  featured?: boolean;
};

export const products: Product[] = [
  // ── Boucles d'oreilles ──────────────────────────────────────
  {
    id: "b01",
    slug: "puces-coeur-dore",
    name: "Puces Cœur Doré",
    category: "boucles",
    price: 15,
    description: "Des puces en forme de cœur délicat, pour rappeler chaque jour la douceur de ce que vous aimez. Légères et élégantes, elles s'accordent à toutes vos tenues.",
    material: "Acier inoxydable doré",
    image: "/boucles-placeholder.jpg",
    featured: true,
  },
  {
    id: "b02",
    slug: "creoles-fines-dorees",
    name: "Créoles Fines Dorées",
    category: "boucles",
    price: 22,
    description: "Des créoles minimalistes à l'éclat doré subtil. Leur finesse en fait un indispensable du quotidien, du matin au soir.",
    material: "Acier inoxydable doré",
    image: "/boucles-placeholder.jpg",
    featured: true,
  },
  {
    id: "b03",
    slug: "boucles-perlees-rosees",
    name: "Boucles Perlées Rosées",
    category: "boucles",
    price: 18,
    description: "Une perle rosée suspendue dans un écrin doré. La douceur à l'état pur, pour un style naturellement raffiné.",
    material: "Acier inoxydable doré, perle synthétique",
    image: "/boucles-placeholder.jpg",
  },
  {
    id: "b04",
    slug: "pendantes-goutte",
    name: "Pendantes Goutte Dorée",
    category: "boucles",
    price: 26,
    description: "Longues et gracieuses, ces pendantes en forme de goutte captent la lumière à chacun de vos mouvements.",
    material: "Acier inoxydable doré",
    image: "/boucles-placeholder.jpg",
  },
  {
    id: "b05",
    slug: "boucles-etoile",
    name: "Boucles Étoile Filante",
    category: "boucles",
    price: 19,
    description: "Une étoile à votre oreille pour rappeler que vous brillez. Design épuré, effet précieux.",
    material: "Acier inoxydable doré",
    image: "/boucles-placeholder.jpg",
    featured: true,
  },
  {
    id: "b06",
    slug: "anneaux-entrelaces",
    name: "Anneaux Entrelacés",
    category: "boucles",
    price: 24,
    description: "Deux anneaux fins entrelacés en un jeu de courbes élégant. Modernes et raffinés.",
    material: "Acier inoxydable doré",
    image: "/boucles-placeholder.jpg",
  },
  {
    id: "b07",
    slug: "boucles-cascade",
    name: "Boucles Cascade",
    category: "boucles",
    price: 28,
    description: "Trois petits anneaux en cascade pour un effet de mouvement doux et envoûtant.",
    material: "Acier inoxydable doré",
    image: "/boucles-placeholder.jpg",
  },
  {
    id: "b08",
    slug: "puces-fleur",
    name: "Puces Fleur Délicate",
    category: "boucles",
    price: 17,
    description: "Une petite fleur épanouie à chaque oreille. La nature dans toute sa délicatesse.",
    material: "Acier inoxydable doré",
    image: "/boucles-placeholder.jpg",
  },
  {
    id: "b09",
    slug: "creoles-texturees",
    name: "Créoles Texturées",
    category: "boucles",
    price: 21,
    description: "Des créoles à surface travaillée pour capter la lumière sous tous les angles.",
    material: "Acier inoxydable doré",
    image: "/boucles-placeholder.jpg",
  },
  {
    id: "b10",
    slug: "boucles-art-deco",
    name: "Boucles Art Déco",
    category: "boucles",
    price: 32,
    description: "Un hommage à l'Art Déco : lignes géométriques, précision et sophistication intemporelle.",
    material: "Acier inoxydable doré",
    image: "/boucles-placeholder.jpg",
    featured: true,
  },

];

export const featuredProducts = products.filter(p => p.featured);

export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(cat: ProductCategory) {
  return products.filter(p => p.category === cat);
}

export const categoryLabels: Record<ProductCategory, string> = {
  boucles: "Boucles d'oreilles",
};
