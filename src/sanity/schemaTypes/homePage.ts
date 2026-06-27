import { defineField, defineType } from 'sanity';

// Tout le contenu éditable de la page d'accueil (document unique).
export const homePage = defineType({
  name: 'homePage',
  title: "Page d'accueil",
  type: 'document',
  groups: [
    { name: 'hero', title: 'Accueil (grande photo)' },
    { name: 'reassurance', title: 'Réassurance' },
    { name: 'featured', title: 'Section créations' },
    { name: 'values', title: 'Valeurs' },
    { name: 'testimonials', title: 'Avis clients' },
    { name: 'newsletter', title: 'Sur mesure' },
  ],
  fields: [
    // ── Hero ──
    defineField({ name: 'heroTitle', title: 'Titre principal', type: 'text', rows: 2, group: 'hero', description: 'Appuyez sur Entrée pour passer à la ligne.' }),
    defineField({ name: 'heroHighlight', title: 'Mot mis en valeur (doré)', type: 'string', group: 'hero', description: 'Un mot du titre affiché en doré (ex : élégance). Vide = aucun.' }),
    defineField({ name: 'heroCtaPrimary', title: 'Bouton principal — texte', type: 'string', group: 'hero' }),
    defineField({ name: 'heroCtaSecondary', title: 'Bouton secondaire — texte', type: 'string', group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Photo de fond', type: 'image', options: { hotspot: true }, group: 'hero', description: 'Laissez vide pour garder la photo actuelle.' }),

    // ── Réassurance (bandeau 4 points) ──
    defineField({
      name: 'reassuranceItems', title: 'Points de réassurance', type: 'array', group: 'reassurance',
      description: 'Idéalement 4 éléments (les icônes sont attribuées automatiquement).',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Titre', type: 'string' },
        { name: 'text', title: 'Texte', type: 'string' },
      ], preview: { select: { title: 'title', subtitle: 'text' } } }],
    }),

    // ── Section créations ──
    defineField({ name: 'featuredLabel', title: 'Petit label', type: 'string', group: 'featured' }),
    defineField({ name: 'featuredHeading', title: 'Titre', type: 'string', group: 'featured' }),
    defineField({ name: 'featuredIntro', title: 'Texte d’introduction', type: 'text', rows: 3, group: 'featured' }),

    // ── Valeurs ──
    defineField({ name: 'valuesLabel', title: 'Petit label', type: 'string', group: 'values' }),
    defineField({ name: 'valuesHeading', title: 'Titre', type: 'string', group: 'values' }),
    defineField({
      name: 'valuesItems', title: 'Valeurs', type: 'array', group: 'values',
      description: 'Idéalement 4 (icônes automatiques).',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Titre', type: 'string' },
        { name: 'text', title: 'Texte', type: 'text', rows: 3 },
      ], preview: { select: { title: 'title', subtitle: 'text' } } }],
    }),

    // ── Avis clients ──
    defineField({ name: 'testimonialsLabel', title: 'Petit label', type: 'string', group: 'testimonials' }),
    defineField({ name: 'testimonialsHeading', title: 'Titre', type: 'string', group: 'testimonials' }),
    defineField({
      name: 'testimonials', title: 'Avis', type: 'array', group: 'testimonials',
      description: 'Les vrais avis de tes clientes.',
      of: [{ type: 'object', fields: [
        { name: 'name', title: 'Prénom / nom', type: 'string' },
        { name: 'location', title: 'Ville', type: 'string' },
        { name: 'rating', title: 'Note (1 à 5)', type: 'number', validation: (r) => r.min(1).max(5), initialValue: 5 },
        { name: 'text', title: 'Avis', type: 'text', rows: 4 },
      ], preview: { select: { title: 'name', subtitle: 'text' } } }],
    }),

    // ── Sur mesure (bandeau noir) ──
    defineField({ name: 'newsletterLabel', title: 'Petit label', type: 'string', group: 'newsletter' }),
    defineField({ name: 'newsletterHeading', title: 'Titre', type: 'text', rows: 2, group: 'newsletter' }),
    defineField({ name: 'newsletterText', title: 'Texte', type: 'text', rows: 2, group: 'newsletter' }),
    defineField({ name: 'newsletterCta', title: 'Bouton — texte', type: 'string', group: 'newsletter' }),
  ],
  preview: { prepare: () => ({ title: "Page d'accueil" }) },
});
