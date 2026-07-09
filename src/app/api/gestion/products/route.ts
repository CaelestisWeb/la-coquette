import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';
import { writeClient } from '@/sanity/lib/writeClient';
import { isAuthed } from '@/lib/gestion-auth';
import { getGestionProducts } from '@/lib/gestion-data';
import { detectColors } from '@/sanity/lib/colors';

/* eslint-disable @typescript-eslint/no-explicit-any */

const deny = () => NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

function slugify(s: string): string {
  return (s || '')
    .normalize('NFD')
    .replace(/[^\x00-\x7F]/g, '') // retire les accents (décomposés) et non-ASCII
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'produit';
}

function revalidateShop() {
  revalidatePath('/');
  revalidatePath('/boutique');
  revalidatePath('/boutique/[slug]', 'page');
}

function imageField(assetId: string) {
  return { _type: 'image', _key: crypto.randomBytes(4).toString('hex'), asset: { _type: 'reference', _ref: assetId } };
}

// Liste des produits + collections (pour le tableau de gestion).
export async function GET() {
  if (!(await isAuthed())) return deny();
  return NextResponse.json(await getGestionProducts());
}

// Créer un produit, ou dupliquer (action: 'duplicate').
export async function POST(req: Request) {
  if (!(await isAuthed())) return deny();
  const body: any = await req.json().catch(() => ({}));

  if (body.action === 'reorder' && Array.isArray(body.ids)) {
    const ids: string[] = body.ids.filter((x: unknown) => typeof x === 'string');
    let tx = writeClient.transaction();
    ids.forEach((id, i) => { tx = tx.patch(id, { set: { order: i } }); });
    await tx.commit();
    revalidateShop();
    return NextResponse.json({ ok: true });
  }

  if (body.action === 'duplicate' && body.id) {
    const src: any = await writeClient.getDocument(body.id);
    if (!src) return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 });
    const suffix = crypto.randomBytes(3).toString('hex');
    const copy: any = { ...src };
    delete copy._id; delete copy._rev; delete copy._createdAt; delete copy._updatedAt;
    delete copy.reviews; // les avis appartiennent au produit d'origine, pas à la copie
    copy.name = `${src.name || 'Produit'} (copie)`;
    copy.slug = { _type: 'slug', current: `${slugify(src.name || 'produit')}-${suffix}` };
    copy.available = false;
    const created = await writeClient.create(copy);
    revalidateShop();
    return NextResponse.json({ ok: true, id: created._id });
  }

  const name = String(body.name || '').trim();
  if (!name) return NextResponse.json({ error: 'Le nom est obligatoire.' }, { status: 400 });
  const suffix = crypto.randomBytes(3).toString('hex');
  const collectionId = String(body.collectionId || '');
  const created = await writeClient.create({
    _type: 'product',
    name,
    price: Number(body.price) || 0,
    description: String(body.description || ''),
    material: String(body.material || 'Acier inoxydable doré'),
    category: 'boucles',
    couleurs: detectColors(name), // pré-remplissage auto (ajustable ensuite)
    ...(collectionId ? { collection: { _type: 'reference', _ref: collectionId } } : {}),
    available: body.available !== false,
    featured: !!body.featured,
    slug: { _type: 'slug', current: `${slugify(name)}-${suffix}` },
    images: body.assetId ? [imageField(body.assetId)] : [],
    order: Number.isFinite(body.order) ? Number(body.order) : 0,
  });
  revalidateShop();
  return NextResponse.json({ ok: true, id: created._id });
}

// Modifier un ou plusieurs champs d'un produit.
export async function PATCH(req: Request) {
  if (!(await isAuthed())) return deny();
  const body: any = await req.json().catch(() => ({}));
  const id = String(body.id || '');
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });

  const set: any = {};
  for (const k of ['name', 'description', 'material'] as const) {
    if (k in body) set[k] = String(body[k] ?? '');
  }
  if ('price' in body) set.price = Number(body.price) || 0;
  if ('order' in body) set.order = Number(body.order) || 0;
  if ('available' in body) set.available = !!body.available;
  if ('featured' in body) set.featured = !!body.featured;
  if (Array.isArray(body.couleurs)) set.couleurs = body.couleurs.filter((c: unknown) => typeof c === 'string');
  if (body.assetId) set.images = [imageField(body.assetId)];

  // Affectation à une collection : id => référence, vide => on retire la collection.
  let patch = writeClient.patch(id);
  if ('collectionId' in body) {
    const cid = String(body.collectionId || '');
    if (cid) set.collection = { _type: 'reference', _ref: cid };
    else patch = patch.unset(['collection']);
  }

  await patch.set(set).commit();
  revalidateShop();
  return NextResponse.json({ ok: true });
}

// Supprimer un produit.
export async function DELETE(req: Request) {
  if (!(await isAuthed())) return deny();
  const body: any = await req.json().catch(() => ({}));
  const id = String(body.id || '');
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 });
  await writeClient.delete(id);
  revalidateShop();
  return NextResponse.json({ ok: true });
}
