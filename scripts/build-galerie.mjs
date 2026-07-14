// Prépare TOUTES les photos non portées de la galerie (48 packshots),
// redimensionnées et optimisées pour le web (les originaux font ~4 Mo).
// Organisées par collection, la photo de couverture (accueil) en premier.
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';

const SRC = 'C:/dev/lacoquette/Images/_galerie';
const OUT = 'C:/dev/lacoquette/public/galerie';
mkdirSync(OUT, { recursive: true });

// Index des sources par numéro de préfixe ("07_Cabochon..." -> 7)
const byNum = {};
for (const f of readdirSync(SRC)) {
  const m = f.match(/^(\d+)_/);
  if (m) byNum[Number(m[1])] = f;
}

// Ordre par collection : la couverture (accueil) en tête, puis le reste.
const COLLECTIONS = [
  { slug: 'cabochon', order: [1, 5, 7, 2, 3, 4, 6, 8, 9, 10, 11] },
  { slug: 'creole', order: [17, 12, 16, 13, 14, 15, 18, 19] },
  { slug: 'boheme', order: [20, 30, 23, 21, 22, 24, 25, 26, 27, 28, 29, 31] },
  { slug: 'coeur', order: [33, 34, 32, 35] },
  { slug: 'etoile', order: [45, 39, 36, 37, 38, 46, 47, 48] },
  { slug: 'martelee', order: [44, 40, 41, 42, 43] },
];

let total = 0;
for (const { slug, order } of COLLECTIONS) {
  let i = 1;
  for (const n of order) {
    const src = byNum[n];
    if (!src) {
      console.warn('  ! source introuvable pour', n);
      continue;
    }
    const out = `${slug}-${i}.jpg`;
    await sharp(`${SRC}/${src}`)
      .resize({ height: 1500, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(`${OUT}/${out}`);
    console.log('  ✓', out);
    i++;
    total++;
  }
}
console.log('\n' + total + ' photos dans ' + OUT);
