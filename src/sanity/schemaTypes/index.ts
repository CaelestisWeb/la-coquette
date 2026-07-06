import { type SchemaTypeDefinition } from 'sanity';
import { product } from './product';
import { collection } from './collection';
import { homePage } from './homePage';
import { siteSettings } from './siteSettings';
import { faqPage } from './faqPage';
import { contactPage } from './contactPage';
import { boutiquePage } from './boutiquePage';

// Tous les types de contenu éditables.
export const schemaTypes: SchemaTypeDefinition[] = [
  product,
  collection,
  homePage,
  boutiquePage,
  faqPage,
  contactPage,
  siteSettings,
];
