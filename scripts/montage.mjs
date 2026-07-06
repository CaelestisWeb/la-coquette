// Construit, par collection, une planche : photos PRODUITS (nom) + photos
// PORTÉES (fichier), pour apparier visuellement. Sortie dans OUT.
import sharp from 'sharp';
import heicConvert from 'heic-convert';
import { createClient } from '@sanity/client';
import { readFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const env = {};
for (const l of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split(/\r?\n/)) {
  const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const sanity = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', token: env.SANITY_API_TOKEN, useCdn: false,
});

const BASE = 'C:/dev/lacoquette/Images/Portées/la coquette';
const OUT = 'C:/Users/celes/AppData/Local/Temp/claude/C--Users-celes--claude/823a0081-94bd-4968-8659-a72061ace02f/scratchpad/montages';
mkdirSync(OUT, { recursive: true });

function fixMojibake(s) {
  const BOX = String.fromCharCode(0x2560);
  const map = { [String.fromCharCode(0xc7)]: '̀', [String.fromCharCode(0xfc)]: '́', [String.fromCharCode(0xe9)]: '̂' };
  const re = new RegExp('(.)' + BOX + '([' + Object.keys(map).join('') + '])', 'g');
  return s.replace(re, (_m, base, mk) => (base + map[mk]).normalize('NFC'));
}
const noAccent = (s) => fixMojibake(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const GROUPS = [
  { coll: 'Cabochons', slug: 'cabochons', folders: ['cabochons'] },
  { coll: 'Creoles', slug: 'creoles', folders: ['creoles'] },
  { coll: 'Boheme', slug: 'boheme', folders: ['bohemes avec perles', 'bohemes non perlees'] },
  { coll: 'Coeur', slug: 'coeur', folders: ['coeurs'] },
  { coll: 'Etoile filante', slug: 'etoile-filante', folders: ['etoiles filantes', 'etoiles filantes v2'] },
  { coll: 'Martelee', slug: 'martelee', folders: ['martelees'] },
];

const dirs = readdirSync(BASE);
const findDir = (name) => dirs.find((d) => noAccent(d) === noAccent(name));

async function toJpeg(path) {
  const buf = readFileSync(path);
  if (/\.heic$/i.test(path)) return Buffer.from(await heicConvert({ buffer: buf, format: 'JPEG', quality: 0.9 }));
  return buf;
}

const SZ = 250, LBL = 30;
async function cell(imgBuf, label) {
  const img = await sharp(imgBuf).rotate().resize(SZ, SZ, { fit: 'cover' }).toBuffer();
  const esc = label.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const svg = Buffer.from(`<svg width="${SZ}" height="${LBL}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#ffffff"/><text x="5" y="20" font-family="Arial" font-size="15" fill="#000000">${esc}</text></svg>`);
  const lbl = await sharp(svg).png().toBuffer();
  return sharp({ create: { width: SZ, height: SZ + LBL, channels: 3, background: '#ffffff' } })
    .composite([{ input: img, top: 0, left: 0 }, { input: lbl, top: SZ, left: 0 }]).jpeg().toBuffer();
}

async function montage(cells, cols, file) {
  const rows = Math.ceil(cells.length / cols);
  const CH = SZ + LBL + 8;
  const canvas = sharp({ create: { width: cols * (SZ + 8) + 8, height: rows * CH + 8, channels: 3, background: '#dddddd' } });
  const comp = cells.map((c, i) => ({ input: c, top: 8 + Math.floor(i / cols) * CH, left: 8 + (i % cols) * (SZ + 8) }));
  await canvas.composite(comp).jpeg({ quality: 80 }).toFile(join(OUT, file));
  console.log('  planche →', file);
}

for (const g of GROUPS) {
  console.log(`\n### ${g.coll}`);
  // Produits (photo principale + nom)
  const prods = await sanity.fetch(
    `*[_type=="product" && collection->slug.current==$slug]{ _id, name, "url": images[0].asset->url, "n": count(images) } | order(name asc)`,
    { slug: g.slug },
  );
  const prodCells = [];
  for (const p of prods) {
    console.log(`  PRODUIT  ${p._id}  «${p.name}»  (photos: ${p.n})`);
    if (p.url) {
      const buf = Buffer.from(await (await fetch(p.url)).arrayBuffer());
      prodCells.push(await cell(buf, p.name.slice(0, 30)));
    }
  }
  if (prodCells.length) await montage(prodCells, 4, `${g.slug}-PRODUITS.jpg`);

  // Photos portées
  const wornCells = [];
  for (const folder of g.folders) {
    const dir = findDir(folder);
    if (!dir) { console.log('  (dossier introuvable:', folder, ')'); continue; }
    for (const f of readdirSync(join(BASE, dir)).sort()) {
      if (!/\.(heic|jpe?g)$/i.test(f)) continue;
      const tag = `${fixMojibake(dir).split(' ')[0].slice(0, 5)}/${f.replace(/\.[a-z]+$/i, '').replace('IMG_', '')}`;
      wornCells.push(await cell(await toJpeg(join(BASE, dir, f)), tag));
    }
  }
  if (wornCells.length) await montage(wornCells, 4, `${g.slug}-PORTEES.jpg`);
}
console.log('\nOK. Planches dans', OUT);
