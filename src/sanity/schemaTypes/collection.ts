import { defineField, defineType } from 'sanity';

// Une collection = une sous-catégorie de la boutique (ex : Cabochons, Créoles).
export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nom', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug', title: 'Adresse (générée du nom)', type: 'slug',
      options: { source: 'name', maxLength: 96 }, validation: (r) => r.required(),
    }),
    defineField({ name: 'order', title: "Ordre d'affichage", type: 'number', description: 'Plus petit = affiché en premier dans la boutique.' }),
  ],
  orderings: [{ title: "Ordre d'affichage", name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'slug.current' },
  },
});
