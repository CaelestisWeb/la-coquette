import { defineField, defineType } from 'sanity';

// Réglages globaux du site (disponibilité, pied de page, contact, réseaux).
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Réglages du site',
  type: 'document',
  fields: [
    defineField({
      name: 'comingSoon',
      title: 'Boutique « bientôt disponible »',
      description:
        "Activé : les visiteurs voient la page d'attente à la place du site. " +
        'Désactivé : le vrai site est en ligne pour tout le monde. ' +
        "Le changement s'applique en moins d'une minute.",
      type: 'boolean',
      initialValue: false,
      options: { layout: 'switch' },
    }),
    defineField({ name: 'footerTagline', title: 'Accroche du pied de page', type: 'text', rows: 3 }),
    defineField({ name: 'contactEmail', title: 'Email de contact', type: 'string' }),
    defineField({ name: 'contactLocation', title: 'Localisation', type: 'string', description: 'Ex : Drôme (26) · France' }),
    defineField({ name: 'instagramHandle', title: 'Identifiant Instagram', type: 'string', description: 'Ex : @lacoquette_bycaro' }),
    defineField({ name: 'instagramUrl', title: 'Lien Instagram', type: 'url' }),
  ],
  preview: {
    select: { comingSoon: 'comingSoon' },
    prepare: ({ comingSoon }) => ({
      title: 'Réglages du site',
      subtitle: comingSoon ? 'Boutique en mode « bientôt disponible »' : 'Site en ligne',
    }),
  },
});
