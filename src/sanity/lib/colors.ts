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

// Mots-clés (sans accents) pour déduire les couleurs d'un nom de produit.
const COLOR_KEYWORDS: Record<ProductColor, string[]> = {
  'Doré': ['dore'],
  'Argenté': ['argent'],
  'Blanc': ['blanc', 'nacre', 'ivoire'],
  'Noir': ['noir'],
  'Bleu': ['bleu', 'marine', 'saphir'],
  'Turquoise': ['turquoise'],
  'Vert': ['vert', 'emeraude', 'olive', 'kaki'],
  'Jaune': ['jaune', 'ambre', 'miel', 'moutarde'],
  'Orange': ['orange', 'abricot'],
  'Corail': ['corail'],
  'Rose': ['rose', 'fushia', 'fuchsia', 'poudre'],
  'Rouge': ['rouge', 'bordeaux', 'grenat', 'rubis'],
  'Violet': ['violet', 'mauve', 'lilas', 'parme', 'amethyste', 'lavande', 'prune'],
  'Multicolore': ['multicolore', 'multicouleur', 'arc-en-ciel', 'arc en ciel'],
};

// Déduit la ou les familles de couleurs à partir d'un nom (pour pré-remplir).
export function detectColors(name: string): ProductColor[] {
  const n = (name || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  return PRODUCT_COLORS.filter((c) => COLOR_KEYWORDS[c].some((k) => n.includes(k)));
}
