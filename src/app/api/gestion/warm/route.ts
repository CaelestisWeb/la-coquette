import { NextResponse } from 'next/server';
import { getGestionProducts } from '@/lib/gestion-data';

export const dynamic = 'force-dynamic';

// Endpoint de préchauffe (appelé par un cron) : garde la fonction et la
// connexion Sanity « au chaud » pour que Caro n'attende pas un démarrage à
// froid quand elle ouvre /gestion. Aucune donnée sensible renvoyée.
export async function GET() {
  const t = Date.now();
  try {
    const { products } = await getGestionProducts();
    return NextResponse.json({ ok: true, produits: products.length, ms: Date.now() - t });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
