// Aligne le contenu live Sanity sur le nouveau seuil de livraison (75 €).
// Remplace « 100 € » par « 75 € » dans la réassurance de l'accueil et la FAQ.
// Ne touche pas aux « 100 % » (paiement sécurisé). Réversible.
import { readFileSync } from 'node:fs';
import { createClient } from '@sanity/client';

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

const fix = (s) => (typeof s === 'string' ? s.replace(/100\s*€/g, '75 €') : s);

const home = await client.fetch('*[_type=="homePage"][0]{_id, reassuranceItems}');
const faq = await client.fetch('*[_type=="faqPage"][0]{_id, items}');
let tx = client.transaction();
let changes = 0;
const log = [];

if (home?._id && Array.isArray(home.reassuranceItems)) {
  const next = home.reassuranceItems.map((it) => ({ ...it, text: fix(it.text) }));
  if (JSON.stringify(next) !== JSON.stringify(home.reassuranceItems)) {
    tx = tx.patch(home._id, { set: { reassuranceItems: next } });
    changes++; log.push('homePage.reassuranceItems');
  }
}
if (faq?._id && Array.isArray(faq.items)) {
  const next = faq.items.map((it) => ({ ...it, a: fix(it.a) }));
  if (JSON.stringify(next) !== JSON.stringify(faq.items)) {
    tx = tx.patch(faq._id, { set: { items: next } });
    changes++; log.push('faqPage.items');
  }
}

if (changes) await tx.commit();
console.log(changes ? `Live patché : ${log.join(', ')}` : 'Rien à patcher côté live (déjà à jour ou champs vides → les valeurs par défaut 75 € suffisent).');
