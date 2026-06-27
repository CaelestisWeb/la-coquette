import { defineField, defineType } from 'sanity';

// Réglages globaux du site (pied de page, contact, réseaux).
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Réglages du site',
  type: 'document',
  fields: [
    defineField({ name: 'footerTagline', title: 'Accroche du pied de page', type: 'text', rows: 3 }),
    defineField({ name: 'contactEmail', title: 'Email de contact', type: 'string' }),
    defineField({ name: 'contactLocation', title: 'Localisation', type: 'string', description: 'Ex : Drôme (26) · France' }),
    defineField({ name: 'instagramHandle', title: 'Identifiant Instagram', type: 'string', description: 'Ex : @lacoquette_bycaro' }),
    defineField({ name: 'instagramUrl', title: 'Lien Instagram', type: 'url' }),
  ],
  preview: { prepare: () => ({ title: 'Réglages du site' }) },
});
