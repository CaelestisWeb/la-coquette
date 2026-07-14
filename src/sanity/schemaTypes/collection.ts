import { defineType, defineField } from 'sanity';

// Une collection de la galerie (Cabochons, Créoles…). Caro peut ajouter/retirer
// des photos, changer la description, réordonner. Aucune notion de prix ou de vente.
export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom de la collection',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Identifiant (pour les liens)',
      type: 'slug',
      options: { source: 'nom', maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'ordre',
      title: "Ordre d'affichage",
      type: 'number',
      description: 'Plus le nombre est petit, plus la collection apparaît tôt.',
      initialValue: 100,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description:
        "Ajoutez ou retirez les photos de cette collection. La première sert de couverture en page d'accueil.",
      options: { layout: 'grid' },
    }),
  ],
  orderings: [
    { title: "Ordre d'affichage", name: 'ordreAsc', by: [{ field: 'ordre', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'nom', photos: 'photos', media: 'photos.0' },
    prepare({ title, photos, media }) {
      const n = Array.isArray(photos) ? photos.length : 0;
      return { title: title || 'Collection', subtitle: `${n} photo${n > 1 ? 's' : ''}`, media };
    },
  },
});
