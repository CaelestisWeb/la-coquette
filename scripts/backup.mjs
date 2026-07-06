// Sauvegarde des données dynamiques de La Coquette :
//  - Supabase : comptes (profiles), commandes, favoris, paniers
//  - Sanity   : produits, collections et contenu des pages
// Écrit un fichier JSON daté dans C:/dev/backups/lacoquette et garde 30 jours.
import { createClient as createSanity } from '@sanity/client';
import pg from 'pg';
import { readFileSync, mkdirSync, writeFileSync, readdirSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

const env = {};
for (const l of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split(/\r?\n/)) {
  const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}

const REF = 'isfvvxyprdysebdqivxx';
const DIR = 'C:/dev/backups/lacoquette';
const KEEP = 30;

async function backupSupabase() {
  const db = new pg.Client({
    host: 'aws-0-eu-west-3.pooler.supabase.com', port: 5432,
    user: `postgres.${REF}`, password: env.SUPABASE_DB_PASSWORD,
    database: 'postgres', ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 15000,
  });
  await db.connect();
  const out = {};
  for (const t of ['profiles', 'orders', 'favorites', 'carts']) {
    out[t] = (await db.query(`select * from public.${t}`)).rows;
  }
  await db.end();
  return out;
}

function sanityClient() {
  return createSanity({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01', token: env.SANITY_API_TOKEN, useCdn: false,
  });
}

async function backupSanity() {
  // Tous les documents publiés (produits, collections, pages, réglages).
  return sanityClient().fetch('*[!(_id in path("drafts.**"))]');
}

// Purge les commandes en attente (transitoires) de plus de 7 jours.
async function cleanupPending() {
  try {
    const c = sanityClient();
    const old = await c.fetch('*[_type == "pendingOrder" && dateTime(_createdAt) < dateTime(now()) - 60*60*24*7]._id');
    if (old.length) {
      let tx = c.transaction();
      old.forEach((id) => { tx = tx.delete(id); });
      await tx.commit();
      console.log(`Nettoyage : ${old.length} commande(s) en attente supprimée(s).`);
    }
  } catch (e) {
    console.warn('Nettoyage commandes en attente ignoré:', e.message);
  }
}

function prune() {
  const files = readdirSync(DIR).filter((f) => f.startsWith('backup-') && f.endsWith('.json')).sort();
  for (const f of files.slice(0, Math.max(0, files.length - KEEP))) unlinkSync(join(DIR, f));
}

async function main() {
  mkdirSync(DIR, { recursive: true });
  const [supabase, sanity] = await Promise.all([backupSupabase(), backupSanity()]);
  const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');
  const payload = {
    date: new Date().toISOString(),
    supabase,
    sanity,
    counts: {
      profiles: supabase.profiles.length, orders: supabase.orders.length,
      favorites: supabase.favorites.length, carts: supabase.carts.length,
      sanityDocs: sanity.length,
    },
  };
  const file = join(DIR, `backup-${stamp}.json`);
  writeFileSync(file, JSON.stringify(payload, null, 2), 'utf8');
  prune();
  await cleanupPending();
  console.log('Sauvegarde OK →', file);
  console.log('Contenu :', JSON.stringify(payload.counts));
}
main().catch((e) => { console.error('ÉCHEC sauvegarde:', e.message); process.exit(1); });
