import { defineField, defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Page contact',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Petit texte au-dessus du titre', type: 'string', description: 'Le petit texte en majuscules au-dessus du grand titre.' }),
    defineField({ name: 'heading', title: 'Titre', type: 'string' }),
    defineField({ name: 'intro', title: "Texte d'introduction", type: 'text', rows: 3, description: "Le petit mot d'accueil de la page. Les coordonnées (email, horaires, Instagram) se modifient dans « Réglages du site »." }),
  ],
  preview: { prepare: () => ({ title: 'Page contact' }) },
});
