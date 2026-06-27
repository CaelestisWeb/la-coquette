import { type SchemaTypeDefinition } from 'sanity';
import { product } from './product';
import { homePage } from './homePage';
import { siteSettings } from './siteSettings';

// Tous les types de contenu éditables.
export const schemaTypes: SchemaTypeDefinition[] = [product, homePage, siteSettings];
