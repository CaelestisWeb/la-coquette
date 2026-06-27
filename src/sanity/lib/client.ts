import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

// Client de lecture du contenu (CDN activé pour la rapidité).
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
