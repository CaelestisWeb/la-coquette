// Détecte la ou les couleurs de chaque produit à partir de son nom et remplit
// le champ `couleurs` dans Sanity. Ne touche pas aux produits déjà remplis
// (sauf avec --force). Réversible : il suffit de vider le champ dans le Studio.
import { readFileSync } from 'node:fs';
import { createClient } from '@sanity/client';

// Charge .env.local (token d'écriture)
for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'nuwh7dyu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const COLOR_KEYWORDS = {
  'Doré': ['dore'],
  'Argenté': ['argent'],
  'Blanc': ['blanc', 'nacre', 'ivoire'],
  'Noir': ['noir'],
  'Bleu': ['bleu', 'marine', 'saphir'],
  'Turquoise': ['turquoise'],
  'Vert': ['vert', 'emeraude', 'olive', 'kaki'],
  'Jaune': ['jaune', 'ambre', 'miel', 'moutarde'],
  'Orange': ['orange', 'abricot'],
  'Corail': ['corail'],
  'Rose': ['rose', 'fushia', 'fuchsia', 'poudre'],
  'Rouge': ['rouge', 'bordeaux', 'grenat', 'rubis'],
  'Violet': ['violet', 'mauve', 'lilas', 'parme', 'amethyste', 'lavande', 'prune'],
  'Multicolore': ['multicolore', 'multicouleur', 'arc-en-ciel', 'arc en ciel'],
};
const ORDER = Object.keys(COLOR_KEYWORDS);
const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
function detectColors(name) {
  const n = norm(name);
  return ORDER.filter((c) => COLOR_KEYWORDS[c].some((k) => n.includes(k)));
}

const OVERWRITE = process.argv.includes('--force');
const products = await client.fetch('*[_type=="product"]{_id,name,couleurs}');
let updated = 0, skipped = 0, empty = 0;
let tx = client.transaction();
const done = [], none = [];
for (const p of products) {
  const has = Array.isArray(p.couleurs) && p.couleurs.length > 0;
  if (has && !OVERWRITE) { skipped++; continue; }
  const colors = detectColors(p.name);
  if (colors.length === 0) { empty++; none.push(`  (aucune)  ${p.name}`); continue; }
  tx = tx.patch(p._id, { set: { couleurs: colors } });
  updated++;
  done.push(`  ${colors.join(', ').padEnd(30)}  ${p.name}`);
}
if (updated > 0) await tx.commit();
console.log(`\nProduits: ${products.length} | remplis: ${updated} | déjà remplis (ignorés): ${skipped} | sans couleur détectée: ${empty}\n`);
if (done.length) console.log('REMPLIS :\n' + done.join('\n'));
if (none.length) console.log('\nÀ COMPLÉTER À LA MAIN (aucune couleur trouvée dans le nom) :\n' + none.join('\n'));
