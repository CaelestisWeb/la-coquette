// Peuple Sanity pour le site VITRINE :
//  - purge les restes de la boutique (produits, pages, anciennes collections)
//  - crée le contenu de la page (textes) et les réglages
//  - crée les 6 collections avec leurs photos (uploadées depuis public/galerie)
// Le contenu miroir des valeurs de repli du site (src/components/vitrine/data.ts),
// pour que le site soit identique, que Sanity réponde ou non.
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';

// Charge .env.local (SANITY_API_TOKEN = token d'écriture).
for (const line of readFileSync('C:/dev/lacoquette/.env.local', 'utf8').split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'nuwh7dyu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const OUT = 'C:/dev/lacoquette/public/galerie';

const CONTENT = {
  heroText: "Des boucles d'oreilles imaginées et assemblées une à une, par Caro.",
  galerieIntro:
    'Un aperçu de chaque collection. Chaque bijou est une pièce unique, faite main dans la Drôme.',
  atelierText:
    "Chaque paire de boucles d'oreilles est imaginée et assemblée à la main, une à une, dans mon atelier de la Drôme. Rien n'est produit en série.\n\nJe travaille l'acier inoxydable doré, sans nickel : hypoallergénique, résistant à l'eau, et qui ne ternit pas. Des matières simples et durables, pour des bijoux qui vous accompagnent au quotidien.\n\nLa plupart de mes créations sont des pièces uniques. Celle que vous choisirez ne sera qu'à vous.",
  surMesureText:
    "Une couleur précise, une forme, une idée pour un cadeau ? Décrivez-moi votre envie et je crée une paire rien que pour vous, dans le même esprit fait main.\n\nLe plus simple : un petit message sur Instagram, et on imagine ça ensemble.",
  ouAcheterText:
    "Je présente mes créations sur les marchés de la Drôme, au fil des saisons. L'agenda, les nouveautés et les coulisses de l'atelier, c'est sur Instagram. Une pièce vous plaît ? Un simple message suffit pour la réserver ou pour commander la vôtre.",
};

const SETTINGS = {
  email: 'contact@lacoquette-bycaro.fr',
  zone: 'Drôme',
  instaHandle: '@lacoquette_bycaro',
  instagramUrl: 'https://www.instagram.com/lacoquette_bycaro/',
  footerTagline: 'Bijoux fait main, imaginés et assemblés une à une par Caro, dans la Drôme.',
};

const COLLECTIONS = [
  { nom: 'Cabochons', slug: 'cabochons', ordre: 10, file: 'cabochon', n: 11, desc: 'Une pierre ronde émaillée, posée sur un pendant graphique et lumineux.' },
  { nom: 'Créoles', slug: 'creoles', ordre: 20, file: 'creole', n: 8, desc: "L'anneau revisité, orné de motifs délicats et de couleurs douces." },
  { nom: 'Bohème', slug: 'boheme', ordre: 30, file: 'boheme', n: 12, desc: 'De longues cascades de chaînes et de perles, tout en mouvement.' },
  { nom: 'Cœur', slug: 'coeur', ordre: 40, file: 'coeur', n: 4, desc: 'Le cœur, tout en tendresse, décliné en couleurs.' },
  { nom: 'Étoile filante', slug: 'etoile-filante', ordre: 50, file: 'etoile', n: 8, desc: 'Une étoile et des chaînes fines qui dansent à chaque pas.' },
  { nom: 'Martelée', slug: 'martelee', ordre: 60, file: 'martelee', n: 5, desc: 'Une texture martelée à la main qui accroche la lumière.' },
];

async function main() {
  // 1) Purge des restes de la boutique.
  console.log('Purge des documents boutique…');
  await client.delete({
    query: '*[_type in ["product","homePage","boutiquePage","faqPage","contactPage","collection"]]',
  });

  // 2) Textes de la page + réglages (singletons).
  console.log('Contenu de la page + réglages…');
  await client.createOrReplace({ _id: 'vitrineContent', _type: 'vitrineContent', ...CONTENT });
  await client.createOrReplace({ _id: 'siteSettings', _type: 'siteSettings', ...SETTINGS });

  // 3) Collections + photos.
  for (const c of COLLECTIONS) {
    const photos = [];
    for (let i = 1; i <= c.n; i++) {
      const path = `${OUT}/${c.file}-${i}.jpg`;
      const asset = await client.assets.upload('image', readFileSync(path), {
        filename: `${c.file}-${i}.jpg`,
        contentType: 'image/jpeg',
      });
      photos.push({ _type: 'image', _key: `${c.file}-${i}`, asset: { _type: 'reference', _ref: asset._id } });
    }
    await client.createOrReplace({
      _id: `collection-${c.slug}`,
      _type: 'collection',
      nom: c.nom,
      slug: { _type: 'slug', current: c.slug },
      ordre: c.ordre,
      description: c.desc,
      photos,
    });
    console.log(`  ✓ ${c.nom} (${c.n} photos)`);
  }

  console.log('\nSeed terminé.');
}

main().catch((e) => {
  console.error('ERREUR:', e.message);
  process.exit(1);
});
