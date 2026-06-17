import type { Metadata } from 'next';
import SectionLabel from '@/components/ui/SectionLabel';
import FaqAccordion from './FaqAccordion';
import { SHIPPING_THRESHOLD, SHIPPING_COST } from '@/lib/shipping';

export const metadata: Metadata = {
  title: 'Questions fréquentes | La Coquette',
  description: 'Matières, entretien, livraison, retours, bijoux personnalisés : toutes les réponses à vos questions sur les créations La Coquette.',
};

const faq = [
  {
    q: 'En quelle matière sont vos bijoux ?',
    a: 'Tous nos bijoux sont réalisés en acier inoxydable doré, un matériau noble, sans nickel, qui ne ternit pas et résiste au temps. C\'est un choix volontaire pour des pièces à la fois élégantes et durables.',
  },
  {
    q: 'Conviennent-ils aux peaux sensibles ?',
    a: 'Oui. L\'acier inoxydable est hypoallergénique : il convient à la grande majorité des peaux sensibles et ne provoque pas les réactions souvent causées par les bijoux fantaisie classiques.',
  },
  {
    q: 'Puis-je les porter sous l\'eau ?',
    a: 'L\'acier inoxydable résiste très bien à l\'eau et ne rouille pas. Vous pouvez les garder au quotidien sans crainte. Nous conseillons simplement d\'éviter le contact prolongé avec le chlore, l\'eau de mer et les produits chimiques pour préserver l\'éclat de la dorure.',
  },
  {
    q: 'Comment entretenir mes bijoux ?',
    a: 'Essuyez-les délicatement avec un chiffon doux et sec après usage. Appliquez parfum et crème avant de les mettre, jamais dessus, et rangez-les à l\'abri de l\'humidité. Ces gestes simples préservent durablement leur brillance.',
  },
  {
    q: 'Quels sont les délais de livraison ?',
    a: 'Chaque bijou étant préparé avec soin, votre commande est expédiée rapidement via La Poste, pour une réception sous 3 à 5 jours ouvrés en France métropolitaine.',
  },
  {
    q: 'Quels sont les frais de livraison ?',
    a: `La livraison en France métropolitaine est de ${SHIPPING_COST.toFixed(2)} €. Elle est offerte dès ${SHIPPING_THRESHOLD} € d'achat.`,
  },
  {
    q: 'Proposez-vous des bijoux personnalisés ?',
    a: 'Oui, c\'est même une de nos spécialités ! Caro crée des boucles d\'oreilles sur mesure dans toutes les couleurs, formes et tailles. Décrivez-nous vos envies via la page Contact et nous imaginerons ensemble la paire qui vous ressemble.',
  },
  {
    q: 'Puis-je retourner un article ?',
    a: 'Vous disposez d\'un délai de 14 jours après réception pour changer d\'avis et nous retourner un article non porté, dans son état d\'origine. Les bijoux personnalisés ou réalisés sur mesure ne sont pas repris. Tous les détails figurent dans nos Conditions Générales de Vente.',
  },
  {
    q: 'Le paiement est-il sécurisé ?',
    a: 'Absolument. Les paiements sont traités par SumUp, une solution sécurisée. Vos données bancaires sont chiffrées et ne sont jamais conservées par La Coquette.',
  },
  {
    q: 'Comment vous contacter ?',
    a: 'Pour toute question, écrivez-nous à contact@lacoquette-bycaro.fr ou via le formulaire de la page Contact. Caro vous répond généralement sous 24h.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function FaqPage() {
  return (
    <div className="pt-32 md:pt-44 min-h-screen bg-ivoire">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* En-tête */}
      <div className="bg-rose py-24 text-center">
        <SectionLabel align="center">Bon à savoir</SectionLabel>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-noir mt-3">
          Questions fréquentes
        </h1>
        <p className="font-body text-sm text-taupe mt-4 max-w-md mx-auto leading-relaxed">
          Tout ce qu'il faut savoir sur nos créations, la livraison et les retours.
        </p>
      </div>

      {/* Accordéon */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <FaqAccordion items={faq} />

        <div className="text-center mt-14">
          <p className="font-body text-sm text-taupe">Une autre question&nbsp;?</p>
          <a
            href="/contact"
            className="inline-block mt-4 bg-noir text-blanc font-body text-[11px] tracking-[0.22em] uppercase px-8 py-4 rounded hover:bg-dore transition-colors duration-500"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  );
}
