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
  heroImageUrl: string;
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
  contactHours: string;
  instagramHandle: string;
  instagramUrl: string;
};

export type FaqItem = { q: string; a: string };
export type FaqContent = {
  label: string;
  heading: string;
  intro: string;
  items: FaqItem[];
};
export type ContactContent = {
  label: string;
  heading: string;
  intro: string;
};

export const HOME_DEFAULTS: HomeContent = {
  heroTitle: 'Des bijoux pensés\npour révéler votre élégance',
  heroHighlight: 'élégance',
  heroCtaPrimary: 'Découvrir la boutique',
  heroCtaSecondary: 'Prendre contact',
  heroImageUrl: '/hero-banner.jpg',
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
  contactHours: 'Du lundi au vendredi, de 9h à 18h.\nCaro répond généralement sous 24h.',
  instagramHandle: '@lacoquette_bycaro',
  instagramUrl: 'https://www.instagram.com/lacoquette_bycaro/',
};

export const FAQ_DEFAULTS: FaqContent = {
  label: 'Bon à savoir',
  heading: 'Questions fréquentes',
  intro: "Tout ce qu'il faut savoir sur nos créations, la livraison et les retours.",
  items: [
    { q: 'En quelle matière sont vos bijoux ?', a: "Tous nos bijoux sont réalisés en acier inoxydable doré, un matériau noble, sans nickel, qui ne ternit pas et résiste au temps. C'est un choix volontaire pour des pièces à la fois élégantes et durables." },
    { q: 'Conviennent-ils aux peaux sensibles ?', a: "Oui. L'acier inoxydable est hypoallergénique : il convient à la grande majorité des peaux sensibles et ne provoque pas les réactions souvent causées par les bijoux fantaisie classiques." },
    { q: "Puis-je les porter sous l'eau ?", a: "L'acier inoxydable résiste très bien à l'eau et ne rouille pas. Vous pouvez les garder au quotidien sans crainte. Nous conseillons simplement d'éviter le contact prolongé avec le chlore, l'eau de mer et les produits chimiques pour préserver l'éclat de la dorure." },
    { q: 'Comment entretenir mes bijoux ?', a: "Essuyez-les délicatement avec un chiffon doux et sec après usage. Appliquez parfum et crème avant de les mettre, jamais dessus, et rangez-les à l'abri de l'humidité. Ces gestes simples préservent durablement leur brillance." },
    { q: 'Quels sont les délais de livraison ?', a: 'Chaque bijou étant préparé avec soin, votre commande est expédiée rapidement via La Poste, pour une réception sous 3 à 5 jours ouvrés en France métropolitaine.' },
    { q: 'Quels sont les frais de livraison ?', a: "La livraison en France métropolitaine est de 2.99 €. Elle est offerte dès 100 € d'achat." },
    { q: 'Proposez-vous des bijoux personnalisés ?', a: "Oui, c'est même une de nos spécialités ! Caro crée des boucles d'oreilles sur mesure dans toutes les couleurs, formes et tailles. Décrivez-nous vos envies via la page Contact et nous imaginerons ensemble la paire qui vous ressemble." },
    { q: 'Puis-je retourner un article ?', a: "Vous disposez d'un délai de 14 jours après réception pour changer d'avis et nous retourner un article non porté, dans son état d'origine. Les bijoux personnalisés ou réalisés sur mesure ne sont pas repris. Tous les détails figurent dans nos Conditions Générales de Vente." },
    { q: 'Le paiement est-il sécurisé ?', a: "Absolument. Les paiements sont traités par SumUp, une solution sécurisée. Vos données bancaires sont chiffrées et ne sont jamais conservées par La Coquette." },
    { q: 'Comment vous contacter ?', a: 'Pour toute question, écrivez-nous à contact@lacoquette-bycaro.fr ou via le formulaire de la page Contact. Caro vous répond généralement sous 24h.' },
  ],
};

export const CONTACT_DEFAULTS: ContactContent = {
  label: 'Parlons-nous',
  heading: 'Nous contacter',
  intro: "Une question, une envie de bijou sur-mesure, ou juste un mot ? C'est Caro qui lit et répond elle-même, en général sous 24h.",
};
