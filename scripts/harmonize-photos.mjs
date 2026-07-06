// Harmonise la luminosité + balance des blancs de toutes les photos produits,
// pour un rendu catalogue homogène. Traite séparément STUDIO (image[0]) et
// PORTÉE (image[1]). Corrections douces et plafonnées. Réversible (les anciens
// assets ne sont pas supprimés + mapping sauvegardé).
//
//   node scripts/harmonize-photos.mjs         -> analyse + planche avant/après
//   APPLY=1 node scripts/harmonize-photos.mjs -> applique (upload + repointage)
//
// MÉTHODE (à réutiliser pour les prochains lots) :
//  - STUDIO : on estime le blanc du fond (pixels clairs + peu saturés) et on le
//    ramène vers un blanc propre commun (244,243,242). Exposition et couleur
//    séparées et plafonnées (expo 0.82–1.28, couleur 0.92–1.10).
//  - PORTÉE : pas de fond blanc. Exposition alignée sur la MÉDIANE de luminance
//    du groupe (0.85–1.18) + neutralisation gris-monde très douce (0.95–1.05),
//    pour garder la peau naturelle.
//  Pour de nouvelles photos : relancer le script (il ré-harmonise vers la
//  médiane courante), ou ne traiter que les nouvelles vers la même cible.
import { createClient } from '@sanity/client';
import sharp from 'sharp';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import crypto from 'node:crypto';

const env = {};
for (const l of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split(/\r?\n/)) {
  const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/); if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const c = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production', apiVersion: '2024-01-01', token: env.SANITY_API_TOKEN, useCdn: false });
const OUT = 'C:/Users/celes/AppData/Local/Temp/claude/C--Users-celes--claude/823a0081-94bd-4968-8659-a72061ace02f/scratchpad/montages';
const BACKUP = 'C:/dev/backups/lacoquette';
mkdirSync(OUT, { recursive: true }); mkdirSync(BACKUP, { recursive: true });
const APPLY = !!process.env.APPLY;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const median = (arr) => { const s = [...arr].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const lumOf = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;

async function raw(buf, sz = 180) {
  const { data } = await sharp(buf).resize(sz, sz, { fit: 'inside' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return data;
}
async function studioWhite(buf) {
  const d = await raw(buf); const px = [];
  for (let i = 0; i < d.length; i += 3) { const r = d[i], g = d[i + 1], b = d[i + 2]; const mx = Math.max(r, g, b), mn = Math.min(r, g, b); px.push({ r, g, b, lum: lumOf(r, g, b), sat: mx === 0 ? 0 : (mx - mn) / mx }); }
  const thr = [...px].map(p => p.lum).sort((a, b) => a - b)[Math.floor(px.length * 0.65)];
  let bg = px.filter(p => p.lum >= thr && p.sat < 0.14);
  if (bg.length < 40) bg = px.filter(p => p.lum >= thr);
  const avg = (k) => bg.reduce((s, p) => s + p[k], 0) / bg.length;
  return { r: avg('r'), g: avg('g'), b: avg('b') };
}
async function wornMean(buf) {
  const d = await raw(buf); let r = 0, g = 0, b = 0, n = 0;
  for (let i = 0; i < d.length; i += 3) { r += d[i]; g += d[i + 1]; b += d[i + 2]; n++; }
  r /= n; g /= n; b /= n; return { r, g, b, lum: lumOf(r, g, b) };
}

const STUDIO = [244, 243, 242];
function studioGains(w) {
  const wl = lumOf(w.r, w.g, w.b), tl = lumOf(...STUDIO);
  const e = clamp(tl / wl, 0.82, 1.28);
  const wb = [clamp((STUDIO[0] / w.r) / e, 0.92, 1.10), clamp((STUDIO[1] / w.g) / e, 0.92, 1.10), clamp((STUDIO[2] / w.b) / e, 0.92, 1.10)];
  return [e * wb[0], e * wb[1], e * wb[2]];
}
function wornGains(s, targetLum) {
  const e = clamp(targetLum / s.lum, 0.85, 1.18);
  const avg = (s.r + s.g + s.b) / 3;
  const ng = [clamp(Math.sqrt(avg / s.r), 0.95, 1.05), clamp(Math.sqrt(avg / s.g), 0.95, 1.05), clamp(Math.sqrt(avg / s.b), 0.95, 1.05)];
  return [e * ng[0], e * ng[1], e * ng[2]];
}
const applyGains = (buf, gains) => sharp(buf).linear(gains, [0, 0, 0]).jpeg({ quality: 88, mozjpeg: true }).toBuffer();

async function labelCell(origBuf, newBuf, label) {
  const S = 200;
  const a = await sharp(origBuf).resize(S, S, { fit: 'cover' }).toBuffer();
  const b = await sharp(newBuf).resize(S, S, { fit: 'cover' }).toBuffer();
  const W = S * 2 + 6, esc = label.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const svg = Buffer.from(`<svg width="${W}" height="26" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#fff"/><text x="4" y="18" font-family="Arial" font-size="13" fill="#000">AVANT | APRÈS · ${esc}</text></svg>`);
  const lbl = await sharp(svg).png().toBuffer();
  return sharp({ create: { width: W, height: S + 26, channels: 3, background: '#fff' } }).composite([{ input: a, top: 0, left: 0 }, { input: b, top: 0, left: S + 6 }, { input: lbl, top: S, left: 0 }]).jpeg().toBuffer();
}

async function main() {
  const products = await c.fetch(`*[_type=="product"]{ _id, name, images[]{ _key, "ref": asset._ref, "url": asset->url } }`);
  const items = [];
  for (const p of products) (p.images || []).forEach((im, idx) => { if (im?.url) items.push({ pid: p._id, name: p.name, key: im._key, ref: im.ref, url: im.url, idx, type: idx === 0 ? 'studio' : 'worn' }); });

  console.log(`Analyse de ${items.length} photos…`);
  for (const it of items) {
    it.buf = Buffer.from(await (await fetch(it.url)).arrayBuffer());
    it.stat = it.type === 'studio' ? await studioWhite(it.buf) : await wornMean(it.buf);
  }
  const wornTargetLum = median(items.filter(i => i.type === 'worn').map(i => i.stat.lum));
  console.log('Luminance cible portées (médiane):', wornTargetLum.toFixed(1));

  for (const it of items) it.gains = it.type === 'studio' ? studioGains(it.stat) : wornGains(it.stat, wornTargetLum);

  // Planche avant/après : échantillon varié (extrêmes + médiane par type)
  for (const type of ['studio', 'worn']) {
    const grp = items.filter(i => i.type === type).sort((a, b) => (a.stat.lum) - (b.stat.lum));
    const pick = [grp[0], grp[Math.floor(grp.length * 0.25)], grp[Math.floor(grp.length * 0.5)], grp[Math.floor(grp.length * 0.75)], grp[grp.length - 1]].filter(Boolean);
    const cells = [];
    for (const it of pick) cells.push(await labelCell(it.buf, await applyGains(it.buf, it.gains), `${it.name.slice(0, 24)}`));
    const S = 200, CW = S * 2 + 6 + 8, CH = S + 26 + 8;
    const comp = cells.map((cell, i) => ({ input: cell, top: 8 + i * CH, left: 8 }));
    await sharp({ create: { width: CW + 8, height: cells.length * CH + 8, channels: 3, background: '#ccc' } }).composite(comp).jpeg({ quality: 84 }).toFile(join(OUT, `harmonize-${type}.jpg`));
    console.log('-> planche', `harmonize-${type}.jpg`);
  }

  if (!APPLY) { console.log('\n(analyse seule. APPLY=1 pour appliquer.)'); return; }

  // Application : upload harmonisé + repointage, en gardant l'ordre et les _key.
  console.log('\nApplication…');
  const backup = {};
  const byPid = {};
  for (const it of items) {
    const out = await applyGains(it.buf, it.gains);
    const asset = await c.assets.upload('image', out, { filename: `${it.pid}-${it.idx}-h.jpg`, contentType: 'image/jpeg' });
    it.newRef = asset._id;
    (backup[it.pid] = backup[it.pid] || []).push({ key: it.key, oldRef: it.ref });
    (byPid[it.pid] = byPid[it.pid] || []).push(it);
  }
  for (const [pid, its] of Object.entries(byPid)) {
    its.sort((a, b) => a.idx - b.idx);
    const images = its.map(it => ({ _type: 'image', _key: it.key || crypto.randomBytes(4).toString('hex'), asset: { _type: 'reference', _ref: it.newRef } }));
    await c.patch(pid).set({ images }).commit();
  }
  const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-');
  writeFileSync(join(BACKUP, `original-image-refs-${stamp}.json`), JSON.stringify(backup, null, 2), 'utf8');
  console.log(`Terminé : ${items.length} photos harmonisées. Anciens refs sauvegardés (réversible).`);
}
main().catch((e) => { console.error(e.message); process.exit(1); });
