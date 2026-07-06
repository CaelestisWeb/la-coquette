import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/writeClient';
import { isAuthed } from '@/lib/gestion-auth';

// Envoi d'une photo vers Sanity, renvoie l'identifiant de l'asset.
export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Aucun fichier reçu.' }, { status: 400 });
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Le fichier doit être une image.' }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'Image trop lourde (10 Mo maximum).' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const asset = await writeClient.assets.upload('image', buffer, {
    filename: file.name || 'photo.jpg',
    contentType: file.type,
  });

  return NextResponse.json({ assetId: asset._id, url: asset.url });
}
