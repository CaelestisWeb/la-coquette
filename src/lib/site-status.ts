import { kv } from '@vercel/kv';

const KEY = 'coming_soon';

// Le stockage KV (Vercel) est-il branché sur le projet ?
function kvReady(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

/**
 * Mode « site bientôt disponible » actif ?
 * - Si le stockage KV est branché → on lit le flag piloté par l'admin.
 * - Sinon (avant la mise en place du KV) → repli sur la variable
 *   d'environnement COMING_SOON, pour pouvoir activer le mode tout de suite.
 */
export async function getComingSoon(): Promise<boolean> {
  if (kvReady()) {
    try {
      const v = await kv.get<boolean>(KEY);
      if (typeof v === 'boolean') return v;
    } catch {
      // en cas d'erreur KV, on retombe sur la variable d'env
    }
  }
  return process.env.COMING_SOON === 'true';
}

/**
 * Change l'état (réservé à l'admin). Nécessite le stockage KV.
 * Renvoie false si le KV n'est pas encore branché (rien persisté).
 */
export async function setComingSoon(value: boolean): Promise<boolean> {
  if (!kvReady()) return false;
  await kv.set(KEY, value);
  return true;
}

export function storageReady(): boolean {
  return kvReady();
}
