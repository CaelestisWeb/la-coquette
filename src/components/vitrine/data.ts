// Coordonnées, liens et contenu du site vitrine (source unique).
export const INSTAGRAM = 'https://www.instagram.com/lacoquette_bycaro/';
export const INSTA_HANDLE = '@lacoquette_bycaro';
export const EMAIL = 'contact@lacoquette-bycaro.fr';
export const ZONE = 'Drôme';

const paths = (slug: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/galerie/${slug}-${i + 1}.jpg`);

// Galerie organisée par collection. La première photo de chaque collection
// est la couverture affichée en page d'accueil ; la page /galerie montre tout.
export const COLLECTIONS = [
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
    desc: 'Le cœur, tout en tendresse, décliné en couleurs.',
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
