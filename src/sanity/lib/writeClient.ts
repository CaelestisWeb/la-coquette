import 'server-only';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

// Client d'ÉCRITURE, réservé au back-office /gestion (routes API serveur).
// Le token d'écriture n'est JAMAIS exposé au navigateur (fichier server-only,
// utilisé uniquement dans des route handlers).
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
