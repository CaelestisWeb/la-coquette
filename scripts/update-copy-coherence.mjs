// Audit de cohérence du 25/07/2026 : déduplication des textes du site.
// Chaque phrase ne doit dire qu'une chose, une seule fois par page.
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';

for (const line of readFileSync('C:/dev/lacoquette/.env.local', 'utf8').split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const client = createClient({
  projectId: 'nuwh7dyu',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function main() {
  // Textes de la page : plus aucun écho mot pour mot entre sections.
  await client.patch('vitrineContent').set({
    atelierText:
      "Tout se passe dans mon atelier de la Drôme : je façonne chaque paire moi-même, du choix des breloques aux dernières finitions. Rien n'est produit en série.\n\nJe travaille un acier inoxydable doré, sans nickel : hypoallergénique, il supporte la douche, la mer et le quotidien sans ternir.\n\nLa plupart de mes créations sont des pièces uniques. Celle que vous choisirez ne sera qu'à vous.",
    galerieIntro:
      'Six collections, du cabochon émaillé au métal martelé, à découvrir pièce par pièce dans la galerie.',
    surMesureText:
      "Une couleur précise, une forme, une idée pour un cadeau ? Décrivez-moi votre envie et je crée une paire rien que pour vous.\n\nLe plus simple : un petit message sur Instagram, et on imagine ça ensemble.",
    ouAcheterText:
      "Je présente mes créations sur les marchés de la Drôme, au fil des saisons. L'agenda, les nouveautés et les coulisses de l'atelier, c'est sur Instagram. Une pièce vous plaît ? Dites-le-moi en message privé : je vous la réserve.",
  }).commit();
  console.log('  ✓ vitrineContent');

  await client.patch('siteSettings').set({
    footerTagline:
      "L'atelier de bijoux de Caro : des boucles d'oreilles dessinées, émaillées et montées de ses mains.",
  }).commit();
  console.log('  ✓ siteSettings');

  // « tout en tendresse » faisait écho à « tout en mouvement » (Bohème).
  await client.patch('collection-coeur').set({
    description: 'Le cœur, décliné en couleurs douces ou franches.',
  }).commit();
  console.log('  ✓ collection Cœur');

  console.log('Terminé.');
}

main().catch(e => { console.error('ERREUR:', e.message); process.exit(1); });
