import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

// Client de lecture du contenu. Le token (uniquement côté serveur, jamais
// exposé au navigateur) permet de lire le dataset de façon fiable. useCdn:false
// pour des données fraîches ; la mise en cache est gérée par Next (revalidate).
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  // Le site public ne lit QUE le contenu publié (jamais les brouillons du Studio).
  perspective: 'published',
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN,
});
