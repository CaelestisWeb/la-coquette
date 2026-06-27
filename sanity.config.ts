import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool, defineLocations } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';
import { apiVersion, dataset, projectId } from './src/sanity/env';

// Studio d'édition embarqué, accessible sur /studio.
export default defineConfig({
  basePath: '/studio',
  title: 'La Coquette',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    // Aperçu en direct (site à gauche, champs à droite) : outil PAR DÉFAUT
    // à l'ouverture du Studio, pour voir ses modifications sans changer d'onglet.
    presentationTool({
      previewUrl: {
        preview: '/',
        previewMode: { enable: '/api/draft-mode/enable' },
      },
      // Relie chaque contenu à la page du site où il s'affiche.
      resolve: {
        locations: {
          homePage: defineLocations({
            locations: [{ title: "Page d'accueil", href: '/' }],
          }),
          contactPage: defineLocations({
            locations: [{ title: 'Page contact', href: '/contact' }],
          }),
          faqPage: defineLocations({
            locations: [{ title: 'FAQ', href: '/faq' }],
          }),
          siteSettings: defineLocations({
            locations: [{ title: "Page d'accueil", href: '/' }],
          }),
          product: defineLocations({
            select: { name: 'name', slug: 'slug.current' },
            resolve: (doc) => ({
              locations: [
                { title: (doc?.name as string) || 'Produit', href: `/boutique/${doc?.slug}` },
                { title: 'Toute la boutique', href: '/boutique' },
              ],
            }),
          }),
        },
      },
    }),
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
