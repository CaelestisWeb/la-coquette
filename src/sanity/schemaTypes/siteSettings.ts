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
    defineField({ name: 'footerTagline', title: 'Accroche du pied de page', type: 'text', rows: 3, description: 'La phrase affichée sous le logo en bas de toutes les pages.' }),
    defineField({ name: 'contactEmail', title: 'Email de contact', type: 'string', description: 'Affiché sur la page contact et dans le pied de page.' }),
    defineField({ name: 'contactLocation', title: 'Localisation', type: 'string', description: 'Ex : Drôme (26) · France' }),
    defineField({ name: 'contactHours', title: 'Horaires / disponibilité', type: 'text', rows: 2, description: 'Affiché sur la page contact. Ex : Du lundi au vendredi, de 9h à 18h. Appuyez sur Entrée pour passer à la ligne.' }),
    defineField({ name: 'instagramHandle', title: 'Identifiant Instagram', type: 'string', description: 'Ex : @lacoquette_bycaro' }),
    defineField({ name: 'instagramUrl', title: 'Lien Instagram', type: 'url', description: "L'adresse complète du profil, ex : https://www.instagram.com/lacoquette_bycaro/" }),
  ],
  preview: {
    select: { comingSoon: 'comingSoon' },
    prepare: ({ comingSoon }) => ({
      title: 'Réglages du site',
      subtitle: comingSoon ? 'Boutique en mode « bientôt disponible »' : 'Site en ligne',
    }),
  },
});
