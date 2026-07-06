// Ajoute chaque photo PORTÉE comme 2e image du bon produit (la photo studio
// reste en 1re). Idempotent : images = [photo_studio, photo_portée].
import { createClient } from '@sanity/client';
import sharp from 'sharp';
import heicConvert from 'heic-convert';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import crypto from 'node:crypto';

const env = {};
for (const l of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split(/\r?\n/)) {
  const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/); if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const c = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production', apiVersion: '2024-01-01', token: env.SANITY_API_TOKEN, useCdn: false });

const BASE = 'C:/dev/lacoquette/Images/Portées/la coquette';
function fixMojibake(s){const B=String.fromCharCode(0x2560);const m={[String.fromCharCode(0xc7)]:'̀',[String.fromCharCode(0xfc)]:'́',[String.fromCharCode(0xe9)]:'̂'};return s.replace(new RegExp('(.)'+B+'(['+Object.keys(m).join('')+'])','g'),(_x,b,k)=>(b+m[k]).normalize('NFC'));}
const noAccent=(s)=>fixMojibake(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const dirs = readdirSync(BASE);
const dirOf = (n) => dirs.find((d) => noAccent(d) === noAccent(n));

// folder logique -> [ [fichier, idProduit], ... ]
const MAP = {
  'coeurs': [
    ['IMG_1952.heic','cQJcoXEME16oYHzJOdRpkL'],['IMG_1955.heic','cQJcoXEME16oYHzJOdRrTp'],
    ['IMG_1956.heic','gYzrCGZlVaWviUgg1Gq1Sk'],['IMG_1961.heic','cQJcoXEME16oYHzJOdRqo9'],
  ],
  'martelees': [
    ['IMG_1977.heic','gYzrCGZlVaWviUgg1GsvsE'],['IMG_1980.heic','cQJcoXEME16oYHzJOdS2ez'],
    ['IMG_1982.heic','cQJcoXEME16oYHzJOdRwXV'],['IMG_1983.heic','gYzrCGZlVaWviUgg1GqKqM'],
    ['IMG_1984.heic','gYzrCGZlVaWviUgg1GqOA0'],
  ],
  'creoles': [
    ['0F893569-A5ED-44AE-9CB5-EC8C56B9930C.jpeg','gYzrCGZlVaWviUgg1BSGpC'],
    ['IMG_1925.jpeg','gYzrCGZlVaWviUgg1BSFWY'],['IMG_1926.jpeg','cQJcoXEME16oYHzJOabfoz'],
    ['IMG_1928.jpeg','cQJcoXEME16oYHzJOabcOD'],['IMG_1934.jpeg','NzlknxdQKnm0MUtifpDjF2'],
    ['IMG_1935.jpeg','NzlknxdQKnm0MUtifpDih4'],['IMG_1937.jpeg','cQJcoXEME16oYHzJOabdWP'],
  ],
  'bohemes avec perles': [
    ['IMG_1939.jpeg','cQJcoXEME16oYHzJOdRn81'],['IMG_1940 2.jpeg','NzlknxdQKnm0MUtifqxH44'],
    ['IMG_1941.jpeg','gYzrCGZlVaWviUgg1GpZYu'],['IMG_1943 2.jpeg','gYzrCGZlVaWviUgg1GpgGE'],
    ['IMG_1987.heic','gYzrCGZlVaWviUgg1GpjBg'],['IMG_1988.heic','cQJcoXEME16oYHzJOdRlZV'],
    ['IMG_1990.heic','cQJcoXEME16oYHzJOdRZ2z'],
  ],
  'bohemes non perlees': [
    ['IMG_1992.heic','NzlknxdQKnm0MUtifqxMwu'],['IMG_1993.heic','gYzrCGZlVaWviUgg1GpcEE'],
    ['IMG_1995.heic','NzlknxdQKnm0MUtifqxLd8'],['IMG_1998.heic','gYzrCGZlVaWviUgg1GpXHm'],
    ['IMG_2003.heic','gYzrCGZlVaWviUgg1Gpns0'],
  ],
  'etoiles filantes': [
    ['IMG_1944.jpeg','cQJcoXEME16oYHzJOdRtbR'],['IMG_1946.heic','cQJcoXEME16oYHzJOdRvPJ'],
    ['IMG_1947.heic','NzlknxdQKnm0MUtifqxTo8'],['IMG_1950.heic','cQJcoXEME16oYHzJOdS5HJ'],
    ['IMG_1951.heic','cQJcoXEME16oYHzJOdRsZp'],
  ],
  'etoiles filantes v2': [
    ['IMG_1962.heic','gYzrCGZlVaWviUgg1Gsyng'],['IMG_1966 2.heic','cQJcoXEME16oYHzJOdS7y1'],
    ['IMG_1972.heic','gYzrCGZlVaWviUgg1Gt4OS'],
  ],
  'cabochons': [
    ['IMG_2005.heic','cQJcoXEME16oYHzJOabbQz'],['IMG_2006 2.heic','gYzrCGZlVaWviUgg1BS5pk'],
    ['IMG_2007.heic','gYzrCGZlVaWviUgg1BSCT2'],['IMG_2008.heic','NzlknxdQKnm0MUtifpDeq2'],
    ['IMG_2009.heic','cQJcoXEME16oYHzJOabbkj'],['IMG_2010.heic','gYzrCGZlVaWviUgg1BS8hA'],
    ['IMG_2013.heic','gYzrCGZlVaWviUgg1BS6wI'],['IMG_2019.heic','cQJcoXEME16oYHzJOabbtV'],
    ['IMG_2020.heic','cQJcoXEME16oYHzJOabZuf'],['IMG_2023.heic','cQJcoXEME16oYHzJOabYof'],
    ['IMG_2024.heic','cQJcoXEME16oYHzJOabZEz'],
  ],
};

async function toJpeg(p){const b=readFileSync(p);return /\.heic$/i.test(p)?Buffer.from(await heicConvert({buffer:b,format:'JPEG',quality:0.92})):b;}

let done=0, fail=0;
for (const [folder, entries] of Object.entries(MAP)) {
  const dir = dirOf(folder);
  if (!dir) { console.log('DOSSIER INTROUVABLE:', folder); continue; }
  for (const [file, id] of entries) {
    try {
      const jpg = await toJpeg(join(BASE, dir, file));
      const opt = await sharp(jpg).rotate().resize(1400, 1400, { fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 82 }).toBuffer();
      const asset = await c.assets.upload('image', opt, { filename: `${id}-portee.jpg`, contentType: 'image/jpeg' });
      const prod = await c.getDocument(id);
      const main = prod?.images?.[0];
      if (!main) { console.log('  ! pas de photo principale pour', id); fail++; continue; }
      const worn = { _type: 'image', _key: crypto.randomBytes(4).toString('hex'), asset: { _type: 'reference', _ref: asset._id } };
      await c.patch(id).set({ images: [main, worn] }).commit();
      done++;
      console.log(`  + ${prod.name}  ←  ${file}`);
    } catch (e) { console.log('  ! échec', file, '→', id, ':', e.message); fail++; }
  }
}
console.log(`\nTerminé : ${done} photos portées ajoutées, ${fail} échecs.`);
