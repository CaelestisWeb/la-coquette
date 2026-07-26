// Contenu du site vitrine : VALEURS DE REPLI (fallback).
// Sanity peut surcharger ces valeurs pour que Caro édite le site elle-même ;
// si Sanity est indisponible ou vide, le site affiche exactement ce contenu.
// Aucune casse possible.

export const INSTAGRAM = 'https://www.instagram.com/lacoquette_bycaro/';
export const INSTA_HANDLE = '@lacoquette_bycaro';
export const ZONE = 'Drôme';

// Le contact passe uniquement par Instagram. L'adresse email n'apparaît plus
// sur le site public : elle reste seulement dans les mentions légales, où la
// loi impose un moyen de contact direct de l'éditeur.
export type SiteSettings = {
  instagram: string;
  instaHandle: string;
  zone: string;
  footerTagline: string;
};

export const SETTINGS_DEFAULTS: SiteSettings = {
  instagram: INSTAGRAM,
  instaHandle: INSTA_HANDLE,
  zone: ZONE,
  footerTagline: "L'atelier de bijoux de Caro : des boucles d'oreilles dessinées, émaillées et montées de ses mains.",
};

export type VitrineContent = {
  heroImage: string;
  heroText: string;
  galerieIntro: string;
  atelierText: string;
  surMesureText: string;
  ouAcheterText: string;
};

export const CONTENT_DEFAULTS: VitrineContent = {
  heroImage: '/hero-papillon.jpg',
  heroText: "Des boucles d'oreilles imaginées et assemblées une à une, par Caro.",
  galerieIntro:
    'Six collections, du cabochon émaillé au métal martelé, à découvrir pièce par pièce dans la galerie.',
  atelierText:
    "Tout se passe dans mon atelier de la Drôme : je façonne chaque paire moi-même, du choix des breloques aux dernières finitions. Rien n'est produit en série.\n\nJe travaille un acier inoxydable doré, sans nickel : hypoallergénique, il supporte la douche, la mer et le quotidien sans ternir.\n\nLa plupart de mes créations sont des pièces uniques. Celle que vous choisirez ne sera qu'à vous.",
  surMesureText:
    "Une couleur précise, une forme, une idée pour un cadeau ? Décrivez-moi votre envie et je crée une paire rien que pour vous.\n\nLe plus simple : un petit message sur Instagram, et on imagine ça ensemble.",
  ouAcheterText:
    "Je présente mes créations sur les marchés de la Drôme, au fil des saisons. L'agenda, les nouveautés et les coulisses de l'atelier, c'est sur Instagram. Une pièce vous plaît ? Dites-le-moi en message privé : je vous la réserve.",
};

export type Collection = {
  nom: string;
  slug: string;
  desc: string;
  photos: string[];
};

const paths = (slug: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/galerie/${slug}-${i + 1}.jpg`);

// Galerie de repli : les photos servies depuis /public/galerie, par collection.
// La première photo de chaque collection est la couverture affichée en accueil.
export const COLLECTIONS: Collection[] = [
  {
    nom: 'Cabochons',
    slug: 'cabochons',
    desc: 'Une pierre ronde émaillée, posée sur un pendant graphique et lumineux.',
    photos: paths('cabochon', 11),
  },
  {
    nom: 'Créoles',
    slug: 'creoles',
    desc: "L'anneau revisité, orné de motifs délicats et de couleurs douces.",
    photos: paths('creole', 8),
  },
  {
    nom: 'Bohème',
    slug: 'boheme',
    desc: 'De longues cascades de chaînes et de perles, tout en mouvement.',
    photos: paths('boheme', 12),
  },
  {
    nom: 'Cœur',
    slug: 'coeur',
    desc: 'Le cœur, décliné en couleurs douces ou franches.',
    photos: paths('coeur', 4),
  },
  {
    nom: 'Étoile filante',
    slug: 'etoile-filante',
    desc: 'Une étoile et des chaînes fines qui dansent à chaque pas.',
    photos: paths('etoile', 8),
  },
  {
    nom: 'Martelée',
    slug: 'martelee',
    desc: 'Une texture martelée à la main qui accroche la lumière.',
    photos: paths('martelee', 5),
  },
];
