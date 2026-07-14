import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';
import { apiVersion, dataset, projectId } from './src/sanity/env';

// Studio d'édition embarqué, accessible sur /studio. Vitrine uniquement :
// contenu de la page, collections de photos, réglages. Aucune boutique.
export default defineConfig({
  basePath: '/studio',
  title: 'La Coquette',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
