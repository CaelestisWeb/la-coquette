import { type SchemaTypeDefinition } from 'sanity';
import { vitrineContent } from './vitrineContent';
import { collection } from './collection';
import { siteSettings } from './siteSettings';

// Contenu éditable du site vitrine (aucune notion de boutique/vente).
export const schemaTypes: SchemaTypeDefinition[] = [
  vitrineContent,
  collection,
  siteSettings,
];
