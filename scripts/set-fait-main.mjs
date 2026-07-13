// Passe le contenu live Sanity en « fait main » invariable (hero + intro boutique).
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

const fix = (s) =>
  typeof s === 'string'
    ? s.replace(/faits main/g, 'fait main').replace(/faites main/g, 'fait main').replace(/faite main/g, 'fait main')
    : s;

const home = await client.fetch('*[_type=="homePage"][0]{_id, heroTitle}');
const boutique = await client.fetch('*[_type=="boutiquePage"][0]{_id, intro, heading}');
let tx = client.transaction();
const log = [];

if (home?._id && fix(home.heroTitle) !== home.heroTitle) {
  tx = tx.patch(home._id, { set: { heroTitle: fix(home.heroTitle) } });
  log.push('homePage.heroTitle');
}
if (boutique?._id) {
  const set = {};
  if (fix(boutique.intro) !== boutique.intro) set.intro = fix(boutique.intro);
  if (fix(boutique.heading) !== boutique.heading) set.heading = fix(boutique.heading);
  if (Object.keys(set).length) { tx = tx.patch(boutique._id, { set }); log.push('boutiquePage(' + Object.keys(set).join(',') + ')'); }
}

if (log.length) await tx.commit();
console.log(log.length ? 'Live patché : ' + log.join(', ') : 'Rien à patcher côté live (déjà en « fait main » ou champs vides → défauts).');
