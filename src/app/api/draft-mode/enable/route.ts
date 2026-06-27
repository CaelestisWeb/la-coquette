import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '@/sanity/lib/client';

const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;

// Active le mode aperçu (draft) quand l'outil Presentation du Studio l'ouvre.
// La requête est validée via le token Sanity (côté serveur uniquement).
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
});
