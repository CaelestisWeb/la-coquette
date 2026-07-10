// Copywriting home au filtre StoryBrand (la cliente héroïne, Caro la guide).
// Patche le doc homePage live. Préserve les _key/_type des items existants.
import { readFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
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
const key = () => randomBytes(6).toString('hex');

const VALUES = [
  { title: 'Fait main dans la Drôme', text: "Chaque paire est imaginée et assemblée à la main par Caro, dans son atelier de la Drôme." },
  { title: 'Des matières qui durent', text: "Acier inoxydable doré, sans nickel : hypoallergénique, résistant à l'eau, et qui ne ternit pas." },
  { title: 'Préparé avec soin', text: "Votre commande est emballée à la main et expédiée sous 3 à 5 jours, suivi inclus." },
  { title: 'Un achat serein', text: "Paiement sécurisé, livraison soignée et retours sous 14 jours. Vous êtes accompagnée à chaque étape." },
];

const home = await client.fetch('*[_type=="homePage"][0]{_id, valuesItems}');
if (!home?._id) { console.log('Aucun document homePage trouvé.'); process.exit(0); }

const existing = Array.isArray(home.valuesItems) ? home.valuesItems : [];
const valuesItems = VALUES.map((it, i) => ({ ...(existing[i] || { _key: key() }), title: it.title, text: it.text }));

await client
  .patch(home._id)
  .set({
    heroTitle: 'Des bijoux faits main\npour révéler votre',
    heroHighlight: 'élégance',
    featuredIntro:
      "Des boucles d'oreilles montées à la main par Caro, en acier inoxydable doré qui ne ternit pas. Légères, pensées pour vous accompagner chaque jour.",
    valuesLabel: 'La maison',
    valuesHeading: 'Pourquoi La Coquette',
    valuesItems,
  })
  .commit();

console.log('homePage : hero, featuredIntro, valuesLabel/Heading et 4 valuesItems mis à jour (StoryBrand).');
