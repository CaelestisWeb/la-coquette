import { createBrowserClient } from '@supabase/ssr';

// Client Supabase pour le navigateur (composants « use client »).
// Utilise la clé publishable (sûre côté client grâce au Row Level Security).
// SINGLETON : une seule instance partagée par tous les composants (panier,
// favoris, connexion…). Évite d'initialiser plusieurs clients GoTrue en double
// (coûteux au chargement + avertissements « Multiple GoTrueClient instances »).
let browserClient: ReturnType<typeof createBrowserClient> | undefined;

export function createClient() {
  if (!browserClient) {
    browserClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return browserClient;
}
