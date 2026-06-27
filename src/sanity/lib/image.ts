import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { client } from './client';

const builder = imageUrlBuilder(client);

// Construit l'URL optimisée d'une image Sanity.
export function urlForImage(source: Image) {
  return builder.image(source);
}
