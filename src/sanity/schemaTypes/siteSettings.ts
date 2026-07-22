import { defineField, defineType } from 'sanity';

// Réglages globaux du site vitrine : contact et réseaux. Un seul document.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Réglages du site',
  type: 'document',
  fields: [
    defineField({
      name: 'zone',
      title: 'Zone',
      type: 'string',
      description: 'Ex : Drôme',
    }),
    defineField({
      name: 'instaHandle',
      title: 'Identifiant Instagram',
      type: 'string',
      description: 'Ex : @lacoquette_bycaro',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Lien Instagram',
      type: 'url',
      description: "L'adresse complète du profil, ex : https://www.instagram.com/lacoquette_bycaro/",
    }),
    defineField({
      name: 'footerTagline',
      title: 'Accroche du pied de page',
      type: 'text',
      rows: 3,
      description: 'La phrase affichée sous le logo, en bas de toutes les pages.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Réglages du site' }),
  },
});
