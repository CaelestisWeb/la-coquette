import { defineField, defineType } from 'sanity';

// Contenu éditable de la page d'accueil (document unique).
export const homePage = defineType({
  name: 'homePage',
  title: "Page d'accueil",
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Titre principal',
      type: 'text',
      rows: 2,
      description: 'Le grand texte sur la photo. Appuyez sur Entrée pour passer à la ligne.',
    }),
    defineField({
      name: 'heroHighlight',
      title: 'Mot mis en valeur (doré)',
      type: 'string',
      description: "Un mot du titre à afficher en doré (ex : élégance). Laissez vide pour aucun.",
    }),
    defineField({
      name: 'heroCtaPrimary',
      title: 'Bouton principal — texte',
      type: 'string',
      description: 'Mène vers la boutique.',
    }),
    defineField({
      name: 'heroCtaSecondary',
      title: 'Bouton secondaire — texte',
      type: 'string',
      description: 'Mène vers la page contact.',
    }),
  ],
  preview: {
    prepare: () => ({ title: "Page d'accueil" }),
  },
});
