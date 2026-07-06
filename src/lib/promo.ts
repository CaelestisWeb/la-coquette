import 'server-only';

// Codes de réduction. Table SERVEUR uniquement (jamais envoyée au navigateur) :
// le client envoie un code, le serveur valide et applique la remise.
type Promo = { discount: number; label: string; freeShipping?: boolean };

const CODES: Record<string, Promo> = {
  // Code de TEST (paiement à petit montant) — à retirer après vérification.
  'lacoquettedu26gratuit': { discount: 0.98, label: 'Test', freeShipping: true },
};

export function resolvePromo(code: unknown): Promo | null {
  if (typeof code !== 'string') return null;
  const key = code.trim().toLowerCase();
  return CODES[key] ?? null;
}
