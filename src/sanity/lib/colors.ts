// Familles de couleurs pour le filtre de la boutique.
// Source unique, partagée par le schéma produit (Studio) et le filtre côté client.
export const PRODUCT_COLORS = [
  'Doré',
  'Argenté',
  'Blanc',
  'Noir',
  'Bleu',
  'Turquoise',
  'Vert',
  'Jaune',
  'Orange',
  'Corail',
  'Rose',
  'Rouge',
  'Violet',
  'Multicolore',
] as const;

export type ProductColor = (typeof PRODUCT_COLORS)[number];

// Pastille indicative pour l'UI (couleur d'aperçu de chaque famille).
export const COLOR_SWATCH: Record<ProductColor, string> = {
  'Doré': '#C9A24B',
  'Argenté': '#BFC3C7',
  'Blanc': '#F3EFEA',
  'Noir': '#1B1B1B',
  'Bleu': '#3E6EA5',
  'Turquoise': '#3FB6B2',
  'Vert': '#5F8D57',
  'Jaune': '#E4C15A',
  'Orange': '#E0873C',
  'Corail': '#E8836B',
  'Rose': '#D98AA6',
  'Rouge': '#B23A3A',
  'Violet': '#8A6BB0',
  'Multicolore': 'conic-gradient(from 0deg, #E8836B, #E4C15A, #5F8D57, #3FB6B2, #3E6EA5, #8A6BB0, #D98AA6, #E8836B)',
};
