import { NextResponse } from 'next/server';
import { resolvePromo } from '@/lib/promo';

// Valide un code de réduction (pour l'affichage côté checkout).
export async function POST(req: Request) {
  const { code } = await req.json().catch(() => ({ code: '' }));
  const promo = resolvePromo(code);
  if (!promo) {
    return NextResponse.json({ valid: false, error: 'Code invalide' });
  }
  return NextResponse.json({ valid: true, discount: promo.discount, label: promo.label, freeShipping: !!promo.freeShipping });
}
