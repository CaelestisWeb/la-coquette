// Valeurs par défaut du contenu = le contenu actuel du site.
// Fichier pur (sans dépendance) : sert au site (repli) ET au remplissage initial.

export type ReassuranceItem = { title: string; text: string };
export type ValueItem = { title: string; text: string };
export type Testimonial = { name: string; location: string; rating: number; text: string };

export type HomeContent = {
  heroTitle: string;
  heroHighlight: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  reassuranceItems: ReassuranceItem[];
  featuredLabel: string;
  featuredHeading: string;
  featuredIntro: string;
  valuesLabel: string;
  valuesHeading: string;
  valuesItems: ValueItem[];
  testimonialsLabel: string;
  testimonialsHeading: string;
  testimonials: Testimonial[];
  newsletterLabel: string;
  newsletterHeading: string;
  newsletterText: string;
  newsletterCta: string;
};

export type SiteSettings = {
  footerTagline: string;
  contactEmail: string;
  contactLocation: string;
  instagramHandle: string;
  instagramUrl: string;
};

export const HOME_DEFAULTS: HomeContent = {
  heroTitle: 'Des bijoux pensés\npour révéler votre élégance',
  heroHighlight: 'élégance',
  heroCtaPrimary: 'Découvrir la boutique',
  heroCtaSecondary: 'Prendre contact',
  reassuranceItems: [
    { title: 'Fait main', text: 'Créé avec soin dans la Drôme' },
    { title: 'Acier inoxydable', text: 'Hypoallergénique & durable' },
    { title: 'Livraison offerte', text: "Dès 100 € d'achat en France" },
    { title: 'Paiement sécurisé', text: 'Transaction 100 % protégée' },
  ],
  featuredLabel: 'Sélection',
  featuredHeading: 'Nos créations',
  featuredIntro: "Des boucles d'oreilles pendantes montées à la main par Caro, en acier inoxydable doré qui ne ternit pas, à porter sous la pluie comme sous les projecteurs.",
  valuesLabel: 'Ce qui nous anime',
  valuesHeading: 'Nos valeurs',
  valuesItems: [
    { title: 'Passion', text: 'Chaque bijou est imaginé avec amour et attention. La passion de Caro pour la création se ressent dans chaque détail.' },
    { title: 'Qualité', text: "Acier inoxydable doré, anti-allergie, résistant à l'eau et au temps. Des matières nobles pour un rendu précieux et durable." },
    { title: 'Proximité', text: 'Caro est à votre écoute pour chaque commande, chaque question. Une relation directe, chaleureuse et authentique.' },
    { title: 'Confiance', text: 'Paiement sécurisé, livraison soignée, satisfaction garantie. Votre confiance est notre plus belle récompense.' },
  ],
  testimonialsLabel: 'Elles nous font confiance',
  testimonialsHeading: 'Avis clients',
  testimonials: [
    { name: 'Sophie M.', location: 'Lyon', rating: 5, text: "J'ai commandé les créoles fines et les puces cœur pour ma fille. Elle est ravie ! La qualité est vraiment au rendez-vous, et le colis était magnifiquement présenté. Je recommande sans hésiter." },
    { name: 'Marie-Claire D.', location: 'Valence', rating: 5, text: "Caro est adorable et très réactive. Mes boucles d'oreilles sont exactement comme sur les photos, encore plus jolies en vrai. Elles ne s'oxydent pas, même au quotidien. Un vrai coup de cœur !" },
    { name: 'Élisa R.', location: 'Grenoble', rating: 5, text: "Le collier étoile est absolument magnifique. Je le porte tous les jours depuis un mois, aucune décoloration. C'est rare de trouver des bijoux aussi qualitatifs à ce prix. Bravo La Coquette !" },
  ],
  newsletterLabel: 'Sur mesure',
  newsletterHeading: "Optez pour des boucles d'oreilles\nfaites pour vous",
  newsletterText: 'Décrivez vos envies à Caro et elle créera la paire qui vous ressemble.',
  newsletterCta: "Mes boucles d'oreilles",
};

export const SETTINGS_DEFAULTS: SiteSettings = {
  footerTagline: 'Des bijoux artisanaux en acier inoxydable, conçus avec passion dans la Drôme pour révéler votre élégance au quotidien.',
  contactEmail: 'contact@lacoquette-bycaro.fr',
  contactLocation: 'Drôme (26) · France',
  instagramHandle: '@lacoquette_bycaro',
  instagramUrl: 'https://www.instagram.com/lacoquette_bycaro/',
};
