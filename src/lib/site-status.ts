import { createClient, type VercelKV } from '@vercel/kv';

const KEY = 'coming_soon';

// Résout les identifiants du stockage, quel que soit le nom des variables
// injectées par Vercel (KV_REST_API_* pour Vercel KV, UPSTASH_REDIS_REST_*
// pour l'intégration Upstash via le Marketplace).
function resolveCreds(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

let client: VercelKV | null = null;
function getClient(): VercelKV | null {
  if (client) return client;
  const creds = resolveCreds();
  if (!creds) return null;
  client = createClient(creds);
  return client;
}

/**
 * Mode « site bientôt disponible » actif ?
 * - Si le stockage est branché → on lit le flag piloté par l'admin.
 * - Sinon (avant la mise en place du stockage) → repli sur la variable
 *   d'environnement COMING_SOON, pour pouvoir activer le mode tout de suite.
 */
export async function getComingSoon(): Promise<boolean> {
  const c = getClient();
  if (c) {
    try {
      const v = await c.get<boolean>(KEY);
      if (typeof v === 'boolean') return v;
    } catch {
      // en cas d'erreur de stockage, on retombe sur la variable d'env
    }
  }
  return process.env.COMING_SOON === 'true';
}

/**
 * Change l'état (réservé à l'admin). Nécessite le stockage branché.
 * Renvoie false si le stockage n'est pas encore en place (rien persisté).
 */
export async function setComingSoon(value: boolean): Promise<boolean> {
  const c = getClient();
  if (!c) return false;
  await c.set(KEY, value);
  return true;
}

export function storageReady(): boolean {
  return resolveCreds() !== null;
}
