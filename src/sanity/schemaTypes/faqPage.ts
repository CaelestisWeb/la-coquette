import { defineField, defineType } from 'sanity';

export const faqPage = defineType({
  name: 'faqPage',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Petit label', type: 'string' }),
    defineField({ name: 'heading', title: 'Titre', type: 'string' }),
    defineField({ name: 'intro', title: "Texte d'introduction", type: 'text', rows: 2 }),
    defineField({
      name: 'items',
      title: 'Questions / réponses',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'q', title: 'Question', type: 'string' },
          { name: 'a', title: 'Réponse', type: 'text', rows: 4 },
        ],
        preview: { select: { title: 'q', subtitle: 'a' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'FAQ' }) },
});
