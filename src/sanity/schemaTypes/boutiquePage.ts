import { defineField, defineType } from 'sanity';

// En-tête de la page boutique (titre + intro). Les produits eux-mêmes se
// gèrent dans « Produits ».
export const boutiquePage = defineType({
  name: 'boutiquePage',
  title: 'Page boutique',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Titre', type: 'string', description: 'Le grand titre en haut de la page boutique (ex : Créations).' }),
    defineField({ name: 'intro', title: "Texte d'introduction", type: 'text', rows: 3, description: 'La phrase sous le titre. Les produits se gèrent dans « Produits ».' }),
  ],
  preview: { prepare: () => ({ title: 'Page boutique' }) },
});
