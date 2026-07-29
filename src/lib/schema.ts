/**
 * Données structurées Schema.org du site.
 *
 * Regroupées ici pour une raison précise : les moteurs de recherche classiques
 * et les moteurs IA (ChatGPT, Perplexity, Gemini) ne lisent pas une page de la
 * même façon. Les premiers cherchent des résultats enrichis, les seconds
 * cherchent à identifier une entité : qui, où, quoi, comment la contacter.
 * Un balisage complet et exact est ce qui permet d'être cité correctement.
 *
 * Règle absolue : rien n'est inventé ici. Chaque valeur provient des mentions
 * légales publiques ou du contenu réel du site. Pas de coordonnées GPS
 * approximatives, pas d'horaires supposés, pas de note d'avis fabriquée.
 */

export const SITE = 'https://lacoquette-bycaro.fr';

/** Identifiants stables, pour que les entités se référencent entre elles. */
const ID_ENTREPRISE = `${SITE}/#entreprise`;
const ID_SITE = `${SITE}/#site`;
const ID_CREATRICE = `${SITE}/#caro`;

const INSTAGRAM = 'https://www.instagram.com/lacoquette_bycaro/';
const EMAIL = 'contact@lacoquette-bycaro.fr';

/**
 * L'entité principale. JewelryStore est un sous-type de LocalBusiness : plus
 * précis qu'Organization, il indique le métier exact sans ambiguïté.
 * L'adresse se limite à la commune et au code postal, comme dans les mentions
 * légales : l'atelier est au domicile, la rue n'a pas à être publiée.
 */
export const entreprise = {
  '@type': 'JewelryStore',
  '@id': ID_ENTREPRISE,
  name: 'La Coquette',
  alternateName: 'La Coquette by Caro',
  legalName: 'Caroline Deshayes',
  description:
    "Créations de bijoux fait main par Caro, dans la Drôme. Boucles d'oreilles en acier inoxydable doré sans nickel, résistantes à l'eau, presque toutes des pièces uniques. Vente sur les marchés et par message sur Instagram, créations sur mesure possibles.",
  url: SITE,
  image: `${SITE}/og-papillon.jpg`,
  logo: `${SITE}/logo.png`,
  email: EMAIL,
  inLanguage: 'fr-FR',
  address: {
    '@type': 'PostalAddress',
    postalCode: '26750',
    addressLocality: 'Saint-Paul-lès-Romans',
    addressRegion: 'Drôme',
    addressCountry: 'FR',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Drôme' },
    { '@type': 'Country', name: 'France' },
  ],
  founder: { '@id': ID_CREATRICE },
  employee: { '@id': ID_CREATRICE },
  identifier: [
    { '@type': 'PropertyValue', propertyID: 'SIREN', value: '479539082' },
    { '@type': 'PropertyValue', propertyID: 'SIRET', value: '47953908200095' },
  ],
  sameAs: [INSTAGRAM],
  knowsAbout: [
    'bijoux fait main',
    "boucles d'oreilles",
    'acier inoxydable doré',
    'artisanat de la Drôme',
    'création sur mesure',
  ],
  // Ce qui est réellement proposé. Aucun prix n'est affiché sur le site : il
  // n'y en a donc aucun ici. Un prix inventé serait une faute, pas une omission.
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Créations La Coquette',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: "Boucles d'oreilles fait main",
          material: 'Acier inoxydable doré, sans nickel',
          description:
            "Boucles d'oreilles assemblées une à une à la main, résistantes à l'eau, qui ne ternissent pas. Presque toutes des pièces uniques.",
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Création sur mesure',
          description:
            "Conception d'une paire sur demande, à partir d'une idée, d'une couleur ou d'une occasion.",
        },
      },
    ],
  },
} as const;

/** La personne derrière la marque : les moteurs IA valorisent l'auteur identifié. */
export const creatrice = {
  '@type': 'Person',
  '@id': ID_CREATRICE,
  name: 'Caroline Deshayes',
  alternateName: 'Caro',
  jobTitle: 'Créatrice de bijoux',
  worksFor: { '@id': ID_ENTREPRISE },
  url: SITE,
  sameAs: [INSTAGRAM],
} as const;

export const siteWeb = {
  '@type': 'WebSite',
  '@id': ID_SITE,
  url: SITE,
  name: 'La Coquette',
  inLanguage: 'fr-FR',
  publisher: { '@id': ID_ENTREPRISE },
} as const;

/**
 * Graphe global posé sur toutes les pages. Le format @graph évite de répéter
 * l'entreprise sur chaque page et laisse les entités se référencer par @id.
 */
export const grapheGlobal = {
  '@context': 'https://schema.org',
  '@graph': [entreprise, creatrice, siteWeb],
};

/** Fil d'Ariane : aide le moteur à situer une page dans le site. */
export function filAriane(elements: { nom: string; chemin: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: elements.map((element, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: element.nom,
      item: `${SITE}${element.chemin}`,
    })),
  };
}

/**
 * Page galerie : décrit ce qu'elle contient réellement, collection par
 * collection. C'est ce qui permet à une IA de répondre « elle propose des
 * créoles, des cabochons... » plutôt que de rester sur une description vague.
 */
export function pageGalerie(collections: { nom: string; desc?: string; photos: string[] }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE}/galerie#page`,
    url: `${SITE}/galerie`,
    name: "La galerie, boucles d'oreilles fait main",
    inLanguage: 'fr-FR',
    isPartOf: { '@id': ID_SITE },
    about: { '@id': ID_ENTREPRISE },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: collections.length,
      itemListElement: collections.map((collection, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: collection.nom,
          ...(collection.desc ? { description: collection.desc } : {}),
          material: 'Acier inoxydable doré, sans nickel',
          brand: { '@id': ID_ENTREPRISE },
          ...(collection.photos[0] ? { image: collection.photos[0] } : {}),
        },
      })),
    },
  };
}

/** Sérialisation sûre : évite qu'un caractère du contenu ne ferme la balise. */
export function jsonLd(donnees: unknown) {
  return JSON.stringify(donnees).replace(/</g, '\\u003c');
}
