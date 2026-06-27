import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { client } from '@/sanity/lib/client';

// Active le mode aperçu (draft) quand l'outil Presentation du Studio l'ouvre.
// La requête est validée via le token Sanity du client (côté serveur uniquement).
export const { GET } = defineEnableDraftMode({ client });
