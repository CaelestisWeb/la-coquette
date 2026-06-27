import { type SchemaTypeDefinition } from 'sanity';
import { product } from './product';

// Tous les types de contenu éditables. Phase 1 : les produits.
// Phase 2 : le contenu des pages (hero, à propos, FAQ…) viendra ici.
export const schemaTypes: SchemaTypeDefinition[] = [product];
