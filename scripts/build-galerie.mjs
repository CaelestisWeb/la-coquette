// Prépare les photos de la galerie vitrine : sélection par collection,
// redimensionnées et optimisées pour le web (les originaux font ~4 Mo).
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'C:/dev/lacoquette/Images/_galerie';
const OUT = 'C:/dev/lacoquette/public/galerie';
mkdirSync(OUT, { recursive: true });

const MAP = [
  ['01_Cabochon bleu ciel et pendentif soleil ajoure', 'cabochon-1'],
  ['05_Cabochon corail ethnique rond', 'cabochon-2'],
  ['07_Cabochon vert de gris coeur', 'cabochon-3'],
  ['17_Creoles papillon bleu emeraude', 'creole-1'],
  ['12_Creoles blanches', 'creole-2'],
  ['16_Creoles mauve et goutte', 'creole-3'],
  ['20_Boheme blanche longues perles', 'boheme-1'],
  ['30_Boheme verte courte perles', 'boheme-2'],
  ['23_Boheme corail longue perles', 'boheme-3'],
  ['33_Coeur bleu turquoise', 'coeur-1'],
  ['34_Coeur rose fushia', 'coeur-2'],
  ['45_Version etoile filante bleue', 'etoile-1'],
  ['39_Etoile filante verte', 'etoile-2'],
  ['44_Martelee verte', 'martelee-1'],
  ['40_Martelee jaune', 'martelee-2'],
];

for (const [src, out] of MAP) {
  await sharp(`${SRC}/${src}.jpg`)
    .resize({ height: 1500, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${OUT}/${out}.jpg`);
  console.log('  ✓', out + '.jpg');
}
console.log('\n' + MAP.length + ' photos dans ' + OUT);
