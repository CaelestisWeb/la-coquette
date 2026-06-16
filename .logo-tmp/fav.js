const opentype = require('opentype.js');
const fs = require('fs');
const sharp = require('sharp');
const pompiere = opentype.parse(fs.readFileSync('Pompiere.ttf').buffer);

function shiftPath(p, dx, dy) {
  const np = new opentype.Path();
  np.commands = p.commands.map(c => {
    const n = Object.assign({}, c);
    for (const k of ['x','y','x1','y1','x2','y2']) if (n[k] !== undefined) n[k] += (k.endsWith('1')||k.endsWith('2')? (k[0]==='x'?dx:dy) : (k==='x'?dx:dy));
    return n;
  });
  return np;
}

// glyph(s) centred, scaled to target height ratio of box
function centredGlyphs(text, S, heightRatio) {
  const probe = pompiere.getPath(text, 0, 0, 100);
  const b = probe.getBoundingBox();
  const gw = b.x2 - b.x1, gh = b.y2 - b.y1;
  const targetH = S * heightRatio;
  const scale = targetH / gh;
  const fontSize = 100 * scale;
  const p = pompiere.getPath(text, 0, 0, fontSize);
  const pb = p.getBoundingBox();
  const dx = (S - (pb.x2 - pb.x1)) / 2 - pb.x1;
  const dy = (S - (pb.y2 - pb.y1)) / 2 - pb.y1;
  return shiftPath(p, dx, dy).toPathData(2);
}

function svg(S, bg, rx, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" role="img" aria-label="La Coquette"><title>La Coquette</title>${bg?`<rect width="${S}" height="${S}" rx="${rx}" fill="${bg}"/>`:''}${inner}</svg>\n`;
}

const S = 64;
// A — carre noir, LC blanc
const A = svg(S, '#111111', 14, `<path d="${centredGlyphs('LC', S, 0.62)}" fill="#FFFFFF"/>`);
// B — carre blanc bord fin, LC noir
const B = svg(S, '#FFFFFF', 14, `<rect x="1.5" y="1.5" width="${S-3}" height="${S-3}" rx="12.5" fill="none" stroke="#111111" stroke-width="1.5"/><path d="${centredGlyphs('LC', S, 0.62)}" fill="#111111"/>`);
// C — carre noir, C blanc seul
const C = svg(S, '#111111', 14, `<path d="${centredGlyphs('C', S, 0.66)}" fill="#FFFFFF"/>`);

fs.writeFileSync('favA.svg', A);
fs.writeFileSync('favB.svg', B);
fs.writeFileSync('favC.svg', C);

(async()=>{
  const sheet = [];
  for (const [name,buf] of [['A',A],['B',B],['C',C]]) {
    for (const px of [48,16]) {
      const p = await sharp(Buffer.from(buf)).resize(px,px).png().toBuffer();
      sheet.push({name,px,p});
    }
  }
  // planche comparative sur fond gris clair
  const PAD=24, CELL=80, cols=2, rows=3, W=cols*CELL+PAD*2, H=rows*CELL+PAD*2;
  const comps=[];
  let r=0;
  for (const name of ['A','B','C']) {
    const big = sheet.find(s=>s.name===name&&s.px===48);
    const small = sheet.find(s=>s.name===name&&s.px===16);
    comps.push({input:big.p,left:PAD+(CELL-48)/2|0,top:PAD+r*CELL+(CELL-48)/2|0});
    comps.push({input:small.p,left:PAD+CELL+(CELL-16)/2|0,top:PAD+r*CELL+(CELL-16)/2|0});
    r++;
  }
  await sharp({create:{width:W,height:H,channels:3,background:'#E9E9E9'}}).composite(comps).png().toFile('fav-sheet.png');
  console.log('sheet ok', W+'x'+H);
})();
