import { type SchemaTypeDefinition } from 'sanity';
import { product } from './product';
import { homePage } from './homePage';

// Tous les types de contenu éditables.
export const schemaTypes: SchemaTypeDefinition[] = [product, homePage];
