// Remplit une description générique sur les produits qui n'en ont pas encore.
// Texte provisoire, identique pour toutes les boucles (à personnaliser plus tard).
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';

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

const DESCRIPTION =
  "Faites main avec soin, ces boucles d'oreilles en acier inoxydable doré sont légères, hypoallergéniques et résistantes à l'eau. Elles ne ternissent pas et gardent leur éclat au fil du temps, pour se porter aussi bien au quotidien qu'aux grandes occasions.";

async function main() {
  const products = await client.fetch(`*[_type == "product"]{ _id, name, description }`);
  let tx = client.transaction();
  let filled = 0, kept = 0;
  for (const p of products) {
    if (p.description && p.description.trim()) { kept++; continue; }
    tx = tx.patch(p._id, { set: { description: DESCRIPTION } });
    filled++;
  }
  if (filled) await tx.commit();
  console.log(`Descriptions : ${filled} remplies, ${kept} déjà renseignées (inchangées).`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
