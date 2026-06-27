import { defineField, defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Page contact',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Petit label', type: 'string' }),
    defineField({ name: 'heading', title: 'Titre', type: 'string' }),
    defineField({ name: 'intro', title: "Texte d'introduction", type: 'text', rows: 3 }),
  ],
  preview: { prepare: () => ({ title: 'Page contact' }) },
});
