// Crée les 6 collections et range les produits existants.
// Cabochon* -> Cabochons, Créoles* -> Créoles. Idempotent (IDs fixes).
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';

// Charge .env.local
const env = {};
for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

const noAccent = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const COLLECTIONS = [
  { _id: 'coll-cabochons', name: 'Cabochons', slug: 'cabochons', order: 0 },
  { _id: 'coll-creoles', name: 'Créoles', slug: 'creoles', order: 1 },
  { _id: 'coll-3', name: 'Collection 3', slug: 'collection-3', order: 2 },
  { _id: 'coll-4', name: 'Collection 4', slug: 'collection-4', order: 3 },
  { _id: 'coll-5', name: 'Collection 5', slug: 'collection-5', order: 4 },
  { _id: 'coll-6', name: 'Collection 6', slug: 'collection-6', order: 5 },
];

async function main() {
  // 1. Créer/mettre à jour les collections (sans écraser un nom déjà renommé).
  for (const c of COLLECTIONS) {
    await client.createIfNotExists({
      _id: c._id,
      _type: 'collection',
      name: c.name,
      slug: { _type: 'slug', current: c.slug },
      order: c.order,
    });
  }
  console.log('Collections prêtes :', COLLECTIONS.map((c) => c.name).join(', '));

  // 2. Ranger les produits selon leur nom.
  const products = await client.fetch(`*[_type == "product"]{ _id, name, "coll": collection._ref }`);
  let cab = 0, cre = 0, skip = 0;
  let tx = client.transaction();
  let touched = 0;
  for (const p of products) {
    const n = noAccent(p.name || '');
    let target = null;
    if (n.startsWith('cabochon')) target = 'coll-cabochons';
    else if (n.startsWith('creole')) target = 'coll-creoles';
    if (!target) { skip++; continue; }
    if (p.coll === target) { // déjà rangé
      target === 'coll-cabochons' ? cab++ : cre++;
      continue;
    }
    tx = tx.patch(p._id, { set: { collection: { _type: 'reference', _ref: target } } });
    touched++;
    target === 'coll-cabochons' ? cab++ : cre++;
  }
  if (touched) await tx.commit();
  console.log(`Produits : ${cab} en Cabochons, ${cre} en Créoles, ${skip} non rangés (nom hors motif).`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
