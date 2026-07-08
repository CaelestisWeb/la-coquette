import { createBrowserClient } from '@supabase/ssr';

// Client Supabase pour le navigateur (composants « use client »).
// Utilise la clé publishable (sûre côté client grâce au Row Level Security).
// SINGLETON : une seule instance partagée par tous les composants (panier,
// favoris, connexion…). Évite d'initialiser plusieurs clients GoTrue en double
// (coûteux au chargement + avertissements « Multiple GoTrueClient instances »).
function makeClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

let browserClient: ReturnType<typeof makeClient> | undefined;

export function createClient() {
  if (!browserClient) browserClient = makeClient();
  return browserClient;
}
