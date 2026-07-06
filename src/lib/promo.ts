import 'server-only';

// Codes de réduction. Table SERVEUR uniquement (jamais envoyée au navigateur) :
// le client envoie un code, le serveur valide et applique la remise.
type Promo = { discount: number; label: string; freeShipping?: boolean };

const CODES: Record<string, Promo> = {
  // Aucun code actif. Pour un test, ajouter temporairement une entrée ici
  // (ex. 'moncode': { discount: 0.9, label: 'Test', freeShipping: true })
  // puis la retirer après vérification.
};

export function resolvePromo(code: unknown): Promo | null {
  if (typeof code !== 'string') return null;
  const key = code.trim().toLowerCase();
  return CODES[key] ?? null;
}
