import 'server-only';
import { createClient } from '@supabase/supabase-js';

// Client Supabase à privilèges (clé secrète, contourne le RLS). SERVEUR
// uniquement. Sert aux opérations d'administration : suppression de compte
// (RGPD), écriture des commandes côté serveur (étape 2), etc.
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY manquant');
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
