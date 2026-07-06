// Planche de contrôle : pour chaque produit, photo STUDIO + photo PORTÉE côte à
// côte, avec le nom. Permet de vérifier que la 2e photo est la bonne.
import { createClient } from '@sanity/client';
import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const env = {};
for (const l of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split(/\r?\n/)) {
  const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/); if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const c = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production', apiVersion: '2024-01-01', token: env.SANITY_API_TOKEN, useCdn: false });
const OUT = 'C:/Users/celes/AppData/Local/Temp/claude/C--Users-celes--claude/823a0081-94bd-4968-8659-a72061ace02f/scratchpad/montages';
mkdirSync(OUT, { recursive: true });

const SLUGS = ['cabochons','creoles','boheme','coeur','etoile-filante','martelee'];
const S = 210, LBL = 28;

async function fetchThumb(url) {
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  return sharp(buf).resize(S, S, { fit: 'cover' }).toBuffer();
}

for (const slug of SLUGS) {
  const prods = await c.fetch(`*[_type=="product" && collection->slug.current==$slug]{ name, "a": images[0].asset->url, "b": images[1].asset->url } | order(name asc)`, { slug });
  const cells = [];
  for (const p of prods) {
    const a = p.a ? await fetchThumb(p.a) : null;
    const b = p.b ? await fetchThumb(p.b) : null;
    const W = S * 2 + 6;
    const esc = p.name.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const svg = Buffer.from(`<svg width="${W}" height="${LBL}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#fff"/><text x="5" y="19" font-family="Arial" font-size="15" fill="#000">${esc}</text></svg>`);
    const lbl = await sharp(svg).png().toBuffer();
    const comp = [];
    if (a) comp.push({ input: a, top: 0, left: 0 });
    if (b) comp.push({ input: b, top: 0, left: S + 6 });
    comp.push({ input: lbl, top: S, left: 0 });
    cells.push(await sharp({ create: { width: W, height: S + LBL, channels: 3, background: '#fff' } }).composite(comp).jpeg().toBuffer());
  }
  const cols = 2, CW = S * 2 + 6 + 8, CH = S + LBL + 8, rows = Math.ceil(cells.length / cols);
  const comp = cells.map((cell, i) => ({ input: cell, top: 8 + Math.floor(i / cols) * CH, left: 8 + (i % cols) * CW }));
  await sharp({ create: { width: cols * CW + 8, height: rows * CH + 8, channels: 3, background: '#ccc' } }).composite(comp).jpeg({ quality: 82 }).toFile(join(OUT, `verif-${slug}.jpg`));
  console.log('->', `verif-${slug}.jpg`, `(${prods.length} produits)`);
}
