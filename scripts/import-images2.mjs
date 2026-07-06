// Importe les photos de Images/Images 2 : nomme les 4 collections
// (Bohème, Cœur, Étoile filante, Martelée), convertit HEIC->JPEG, crée les
// produits, range par collection. Anti-doublon par nom. Idempotent.
import { createClient } from '@sanity/client';
import sharp from 'sharp';
import heicConvert from 'heic-convert';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const env = {};
for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', token: env.SANITY_API_TOKEN, useCdn: false,
});

const DIR = 'C:/dev/lacoquette/Images/Images 2';
const DESCRIPTION =
  "Faites main avec soin, ces boucles d'oreilles en acier inoxydable doré sont légères, hypoallergéniques et résistantes à l'eau. Elles ne ternissent pas et gardent leur éclat au fil du temps, pour se porter aussi bien au quotidien qu'aux grandes occasions.";
const PRICE = 39.99;
const NEW_COLL_IDS = ['coll-3', 'coll-4', 'coll-5', 'coll-6'];

// Renomme les 4 collections provisoires (noms via \u pour l'encodage).
const COLLS = [
  { _id: 'coll-3', name: 'Bohème', slug: 'boheme', order: 2 },
  { _id: 'coll-4', name: 'Cœur', slug: 'coeur', order: 3 },
  { _id: 'coll-5', name: 'Étoile filante', slug: 'etoile-filante', order: 4 },
  { _id: 'coll-6', name: 'Martelée', slug: 'martelee', order: 5 },
];

// Répare la corruption d'accents (UTF-8 NFD décodé en cp850) :
// lettre + U+2560 + marqueur (Ç=grave, ü=aigu, é=circonflexe). Codes numériques
// uniquement pour éviter tout souci d'encodage du script.
function fixMojibake(s) {
  const BOX = String.fromCharCode(0x2560);
  const map = {
    [String.fromCharCode(0xc7)]: '̀', // grave  -> è, à
    [String.fromCharCode(0xfc)]: '́', // aigu   -> é
    [String.fromCharCode(0xe9)]: '̂', // circonflexe -> â, ê
  };
  const re = new RegExp('(.)' + BOX + '([' + Object.keys(map).join('') + '])', 'g');
  return s.replace(re, (_m, base, mk) => (base + map[mk]).normalize('NFC'));
}

const noAccent = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const slugify = (s) => noAccent(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

// Nom de fichier -> { name, collId }
function classify(rawName) {
  const clean = fixMojibake(rawName).normalize('NFC').replace(/\.heic$/i, '').trim().replace(/\s+/g, ' ');
  const low = noAccent(clean);
  let name = clean, collId = null;
  const expand = (n) => n.replace(/\bss perles\b/gi, 'sans perles');
  if (low.startsWith('boheme')) { collId = 'coll-3'; name = expand(clean); }
  else if (low.startsWith('coeur')) { collId = 'coll-4'; name = clean.replace(/^Coeur/i, 'Cœur'); }
  else if (low.startsWith('version etoile filante')) { collId = 'coll-5'; name = clean.replace(/^Version [éeé]toile filante/i, 'Étoile filante'); }
  else if (low.startsWith('etoile filante')) { collId = 'coll-5'; name = clean.replace(/^[EeÉé]toile/, 'Étoile'); }
  else if (low.startsWith('martelee')) { collId = 'coll-6'; name = clean; }
  return { name, collId };
}

async function main() {
  if (process.env.DRY) {
    for (const file of readdirSync(DIR).filter((f) => /\.heic$/i.test(f)).sort()) {
      const { name, collId } = classify(file);
      console.log(`${collId ? COLLS.find((c) => c._id === collId).name.padEnd(16) : '??? inconnu     '} | ${name}`);
    }
    return;
  }

  // 1. Nommer les collections
  for (const c of COLLS) {
    await client.createOrReplace({
      _id: c._id, _type: 'collection', name: c.name,
      slug: { _type: 'slug', current: c.slug }, order: c.order,
    });
  }
  console.log('Collections nommées :', COLLS.map((c) => c.name).join(', '));

  // 2. Nettoyage : supprime les produits déjà rangés dans ces 4 collections
  // (vides à l'origine) pour repartir propre, sans doublon.
  const old = await client.fetch(`*[_type=="product" && collection._ref in $ids]._id`, { ids: NEW_COLL_IDS });
  if (old.length) {
    let tx = client.transaction();
    old.forEach((id) => { tx = tx.delete(id); });
    await tx.commit();
    console.log(`Nettoyage : ${old.length} produits partiels supprimés.`);
  }

  // 3. Anti-doublon par nom
  const existing = await client.fetch(`*[_type=="product"]{ name }`);
  const seen = new Set(existing.map((p) => noAccent(p.name || '')));

  const files = readdirSync(DIR).filter((f) => /\.heic$/i.test(f)).sort();
  if (process.env.DRY) {
    for (const file of files) {
      const { name, collId } = classify(file);
      console.log(`${collId ? COLLS.find((c) => c._id === collId).name.padEnd(16) : '??? inconnu   '} | ${name}`);
    }
    return;
  }
  let created = 0, skipped = 0, order = 0;
  for (const file of files) {
    const { name, collId } = classify(file);
    if (!collId) { console.log(`  ? catégorie inconnue : ${name}`); continue; }
    if (seen.has(noAccent(name))) { skipped++; console.log(`  = doublon ignoré : ${name}`); continue; }

    const heic = readFileSync(join(DIR, file));
    const jpg = await heicConvert({ buffer: heic, format: 'JPEG', quality: 0.92 });
    const optimized = await sharp(jpg).rotate().resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 82 }).toBuffer();
    const asset = await client.assets.upload('image', optimized, { filename: slugify(name) + '.jpg', contentType: 'image/jpeg' });

    await client.create({
      _type: 'product', name, price: PRICE, description: DESCRIPTION,
      material: 'Acier inoxydable doré', category: 'boucles',
      collection: { _type: 'reference', _ref: collId },
      available: true, featured: false,
      slug: { _type: 'slug', current: slugify(name) },
      images: [{ _type: 'image', _key: Math.random().toString(16).slice(2, 10), asset: { _type: 'reference', _ref: asset._id } }],
      order: 100 + order++,
    });
    seen.add(noAccent(name));
    created++;
    console.log(`  + ${name}  (${COLLS.find((c) => c._id === collId).name})`);
  }
  console.log(`\nTerminé : ${created} créés, ${skipped} doublons ignorés.`);
}
main().catch((e) => { console.error(e.message); process.exit(1); });
