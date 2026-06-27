import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
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
    structureTool({ structure }),
    // Volet d'aperçu en direct du site, à côté de l'éditeur.
    presentationTool({
      previewUrl: {
        preview: '/',
        previewMode: { enable: '/api/draft-mode/enable' },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
