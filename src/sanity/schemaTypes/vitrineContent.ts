import { defineType, defineField } from 'sanity';

// Textes de la page d'accueil, éditables par Caro. Un seul document (singleton).
// Les titres et la mise en page restent dans le code (cohérence de la marque) ;
// ici, seulement les textes qu'elle peut avoir envie de changer.
export const vitrineContent = defineType({
  name: 'vitrineContent',
  title: 'Contenu de la page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroText',
      title: 'Accroche (sous le logo)',
      type: 'text',
      rows: 2,
      description: 'La phrase d\'accueil, juste sous le nom en haut de page.',
    }),
    defineField({
      name: 'atelierText',
      title: "Texte « L'atelier »",
      type: 'text',
      rows: 8,
      description: 'Votre présentation. Laissez une ligne vide entre chaque paragraphe.',
    }),
    defineField({
      name: 'galerieIntro',
      title: 'Introduction de la galerie',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'surMesureText',
      title: 'Texte « Sur mesure »',
      type: 'text',
      rows: 5,
      description: 'Laissez une ligne vide entre chaque paragraphe.',
    }),
    defineField({
      name: 'ouAcheterText',
      title: 'Texte « Où me trouver »',
      type: 'text',
      rows: 4,
      description: 'Vos marchés, où vous voir, comment commander.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contenu de la page' }),
  },
});
