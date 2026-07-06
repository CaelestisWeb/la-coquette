// Génère une description unique et variée par bijou (famille + couleur + détail
// du nom) et l'applique. DRY=1 pour prévisualiser sans écrire.
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';

const env = {};
for (const l of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split(/\r?\n/)) {
  const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', token: env.SANITY_API_TOKEN, useCdn: false,
});

const noAccent = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Forme selon la famille (1re phrase).
function familyForm(low) {
  if (low.startsWith('cabochon')) return 'Un cabochon lumineux capte le regard au sommet de l’oreille';
  if (low.startsWith('creoles') || low.startsWith('creole')) return 'Ces créoles dessinent une courbe pure et intemporelle';
  if (low.startsWith('boheme')) return 'Ces pendantes bohèmes jouent le mouvement et la légèreté';
  if (low.startsWith('coeur')) return 'Un petit cœur tout en tendresse habille l’oreille';
  if (low.startsWith('etoile filante')) return 'Une étoile filante file délicatement le long de l’oreille';
  if (low.startsWith('martelee')) return 'Une surface martelée à la main accroche joliment la lumière';
  return 'Une création délicate qui habille l’oreille avec caractère';
}

// Couleur (mot affiché + ambiance) détectée dans le nom.
const COLORS = [
  ['bleu ciel', 'bleu ciel', 'une fraîcheur légère'],
  ['bleu nuit', 'bleu nuit', 'une profondeur élégante'],
  ['bleu turquoise', 'turquoise', 'un éclat vif et lumineux'],
  ['bleu petrole', 'bleu pétrole', 'un caractère profond et raffiné'],
  ['rose pale', 'rose pâle', 'une délicatesse poudrée'],
  ['rose fushia', 'rose fuchsia', 'une audace joyeuse'],
  ['rose fuchsia', 'rose fuchsia', 'une audace joyeuse'],
  ['vert de gris', 'vert-de-gris', 'une patine douce et minérale'],
  ['vert emeraude', 'émeraude', 'un éclat précieux'],
  ['emeraude', 'émeraude', 'un éclat précieux'],
  ['multicouleur', 'multicolore', 'un joyeux jeu de couleurs'],
  ['turquoise', 'turquoise', 'un éclat vif et lumineux'],
  ['corail', 'corail', 'une chaleur solaire'],
  ['mauve', 'mauve', 'une douceur mystérieuse'],
  ['fushia', 'rose fuchsia', 'une audace joyeuse'],
  ['blanche', 'blanc', 'une douceur lumineuse'],
  ['blanc', 'blanc', 'une douceur lumineuse'],
  ['noire', 'noir', 'une élégance graphique'],
  ['noir', 'noir', 'une élégance graphique'],
  ['jaune', 'jaune', 'une note ensoleillée'],
  ['orange', 'orange', 'une belle vivacité'],
  ['verte', 'vert', 'une fraîcheur naturelle'],
  ['vert', 'vert', 'une fraîcheur naturelle'],
  ['rose', 'rose', 'une touche de tendresse'],
  ['bleu', 'bleu', 'une fraîcheur apaisée'],
];
function colorInfo(low) {
  for (const [tok, word, mood] of COLORS) if (low.includes(tok)) return { word, mood };
  return null;
}

// Détail éventuel (perles, goutte, barre, pendentif…) glané dans le nom.
// Renvoie une phrase complète (avec accents) ou '' si rien de distinctif.
function detailSentence(name) {
  const low = name.toLowerCase(); // conserve les accents
  const flat = noAccent(name);
  const parts = low.split(' et ');
  if (parts.length > 1) return `Son détail : ${parts.slice(1).join(' et ').trim()}.`;
  if (flat.includes('longues perles') || flat.includes('longue perles')) return 'Ses longues perles suivent le moindre mouvement.';
  if (flat.includes('courte perles') || flat.includes('courtes perles')) return 'De fines perles viennent la ponctuer.';
  if (flat.includes('sans perles')) return 'Un modèle épuré, tout en lignes.';
  if (flat.includes('goutte')) return 'Elle se termine par une goutte délicate.';
  return '';
}

const CLOSINGS = [
  'Faite main et unique, elle se glisse aussi bien dans un quotidien que sur une tenue de fête.',
  'Légère à porter et hypoallergénique, elle est pensée pour ne jamais quitter vos oreilles.',
  'En acier inoxydable doré qui ne ternit pas, c’est une pièce unique à s’offrir ou à offrir.',
  'Un bijou fait main dans la Drôme, léger et résistant à l’eau, qui vous suivra partout.',
  'Une création unique, à porter seule pour un rien de raffinement ou à mixer selon vos envies.',
  'Discrète et lumineuse, elle accompagne vos journées comme vos plus belles soirées.',
];
const hash = (s) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };

function describe(name) {
  const low = noAccent(name);
  const s1 = familyForm(low) + '.';
  const sDetail = detailSentence(name);
  const c = colorInfo(low);
  const sColor = c ? `Son coloris ${c.word} apporte ${c.mood}.` : '';
  const sEnd = CLOSINGS[hash(name) % CLOSINGS.length];
  return [s1, sDetail, sColor, sEnd].filter(Boolean).join(' ');
}

const products = await client.fetch('*[_type=="product"]{ _id, name } | order(name asc)');
if (process.env.DRY) {
  for (const p of products) console.log(`• ${p.name}\n  ${describe(p.name)}\n`);
} else {
  let tx = client.transaction();
  for (const p of products) tx = tx.patch(p._id, { set: { description: describe(p.name) } });
  await tx.commit();
  console.log(`${products.length} descriptions générées et appliquées.`);
}
