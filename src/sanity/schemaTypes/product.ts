import { defineField, defineType } from 'sanity';

// Modèle d'un bijou : exactement ce que Caro remplit pour chaque produit.
export const product = defineType({
  name: 'product',
  title: 'Produit',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du bijou',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Adresse de la page',
      type: 'slug',
      description: 'Générée automatiquement à partir du nom (clique sur « Generate »).',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Prix (€)',
      type: 'number',
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'material',
      title: 'Matière',
      type: 'string',
      initialValue: 'Acier inoxydable doré',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [{ title: "Boucles d'oreilles", value: 'boucles' }],
        layout: 'radio',
      },
      initialValue: 'boucles',
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{ type: 'collection' }],
      description: 'La collection (sous-catégorie) à laquelle appartient ce bijou.',
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'La première photo sert de visuel principal.',
      validation: (r) => r.min(1).error('Ajoutez au moins une photo.'),
    }),
    defineField({
      name: 'available',
      title: 'Disponible à la vente',
      type: 'boolean',
      description: 'Décochez pour masquer le bouton d’achat (rupture de stock).',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: "Mettre en avant sur la page d'accueil",
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: "Ordre d'affichage",
      type: 'number',
      description: 'Plus le nombre est petit, plus le produit apparaît en premier.',
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', price: 'price', media: 'images.0', available: 'available', featured: 'featured' },
    prepare({ title, price, media, available, featured }) {
      const bits = [typeof price === 'number' ? `${price.toFixed(2)} €` : ''];
      if (featured) bits.push('★ en avant');
      if (available === false) bits.push('indisponible');
      return {
        title,
        subtitle: bits.filter(Boolean).join(' · '),
        media,
      };
    },
  },
});
