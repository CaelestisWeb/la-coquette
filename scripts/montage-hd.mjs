import sharp from 'sharp';
import heicConvert from 'heic-convert';
import { readFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BASE = 'C:/dev/lacoquette/Images/Portées/la coquette';
const OUT = 'C:/Users/celes/AppData/Local/Temp/claude/C--Users-celes--claude/823a0081-94bd-4968-8659-a72061ace02f/scratchpad/montages';
mkdirSync(OUT, { recursive: true });
function fixMojibake(s){const B=String.fromCharCode(0x2560);const m={[String.fromCharCode(0xc7)]:'̀',[String.fromCharCode(0xfc)]:'́',[String.fromCharCode(0xe9)]:'̂'};return s.replace(new RegExp('(.)'+B+'(['+Object.keys(m).join('')+'])','g'),(_x,b,k)=>(b+m[k]).normalize('NFC'));}
const noAccent=(s)=>fixMojibake(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const dirs=readdirSync(BASE);
const findDir=(n)=>dirs.find((d)=>noAccent(d)===noAccent(n));
async function toJpeg(p){const b=readFileSync(p);return /\.heic$/i.test(p)?Buffer.from(await heicConvert({buffer:b,format:'JPEG',quality:0.92})):b;}
const SZ=470,LBL=30;
async function cell(buf,label){
  // recadre sur la partie haute (buste/chaîne) puis agrandit
  const img=await sharp(buf).rotate().resize(SZ,SZ,{fit:'cover'}).toBuffer();
  const svg=Buffer.from(`<svg width="${SZ}" height="${LBL}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#fff"/><text x="6" y="21" font-family="Arial" font-size="17" fill="#000">${label}</text></svg>`);
  const lbl=await sharp(svg).png().toBuffer();
  return sharp({create:{width:SZ,height:SZ+LBL,channels:3,background:'#fff'}}).composite([{input:img,top:0,left:0},{input:lbl,top:SZ,left:0}]).jpeg().toBuffer();
}
async function montage(cells,cols,file){
  const rows=Math.ceil(cells.length/cols),CH=SZ+LBL+8;
  const comp=cells.map((c,i)=>({input:c,top:8+Math.floor(i/cols)*CH,left:8+(i%cols)*(SZ+8)}));
  await sharp({create:{width:cols*(SZ+8)+8,height:rows*CH+8,channels:3,background:'#ddd'}}).composite(comp).jpeg({quality:82}).toFile(join(OUT,file));
  console.log('->',file);
}
const folders=['etoiles filantes','etoiles filantes v2'];
const cells=[];
for(const f of folders){const d=findDir(f);for(const file of readdirSync(join(BASE,d)).sort()){if(!/\.(heic|jpe?g)$/i.test(file))continue;const tag=file.replace(/\.[a-z]+$/i,'').replace('IMG_','')+(f.includes('v2')?' (v2)':'');cells.push(await cell(await toJpeg(join(BASE,d,file)),tag));}}
await montage(cells,2,'etoile-HD.jpg');
