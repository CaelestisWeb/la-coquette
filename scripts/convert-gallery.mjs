// Convertit les HEIC (Images + Images 2) en JPG lisibles, noms ASCII indexés,
// pour pouvoir choisir les plus belles photos pour la carte.
import { readdirSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import convert from 'heic-convert';

const SRC = ['C:/dev/lacoquette/Images/Images', 'C:/dev/lacoquette/Images/Images 2'];
const OUT = 'C:/dev/lacoquette/Images/_galerie';
mkdirSync(OUT, { recursive: true });

const clean = (s) =>
  s.replace(/\.HEIC$/i, '').replace(/[^\x20-\x7E]/g, '').replace(/\s+/g, ' ').trim();

let i = 0;
for (const dir of SRC) {
  let files;
  try { files = readdirSync(dir); } catch { continue; }
  for (const f of files) {
    if (!/\.HEIC$/i.test(f)) continue;
    try {
      const buf = readFileSync(path.join(dir, f));
      const out = await convert({ buffer: buf, format: 'JPEG', quality: 0.88 });
      const name = `${String(++i).padStart(2, '0')}_${clean(f)}.jpg`;
      writeFileSync(path.join(OUT, name), Buffer.from(out));
      console.log(name);
    } catch (e) {
      console.log('  (échec) ' + f + ' : ' + e.message);
    }
  }
}
console.log('\n' + i + ' photos dans ' + OUT);
