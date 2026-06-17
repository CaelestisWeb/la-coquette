import type { Metadata } from 'next';
import { SHIPPING_THRESHOLD, SHIPPING_COST } from '@/lib/shipping';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente | La Coquette',
  description: 'Conditions générales de vente de La Coquette : commande, paiement, livraison, droit de rétractation et garanties.',
  robots: { index: true },
};

export default function CGVPage() {
  return (
    <div className="pt-32 md:pt-44 min-h-screen bg-ivoire">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl text-noir mb-4">Conditions Générales de Vente</h1>
        <p className="font-body text-xs text-taupe mb-12">Dernière mise à jour : juin 2026</p>

        <div className="space-y-10 font-body text-sm text-taupe leading-relaxed">

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">1. Objet</h2>
            <p>Les présentes conditions générales de vente (CGV) régissent les ventes de bijoux artisanaux conclues sur le site <strong className="text-noir font-medium">lacoquette-bycaro.fr</strong> entre La Coquette et tout client (ci-après « le Client »). Toute commande implique l'acceptation pleine et entière des présentes CGV.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">2. Vendeur</h2>
            <p><strong className="text-noir font-medium">La Coquette</strong> — Caro<br />
            Entreprise individuelle (auto-entrepreneur)<br />
            SIRET : 479 539 082 00095<br />
            Drôme (26), France<br />
            Email : contact@lacoquette-bycaro.fr</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">3. Produits</h2>
            <p>Les bijoux proposés sont des créations artisanales, fabriquées principalement en acier inoxydable doré. Chaque pièce étant faite main, de légères variations (teinte, finition) peuvent exister et ne constituent pas un défaut. Les produits sont présentés avec la plus grande exactitude possible.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">4. Prix</h2>
            <p>Les prix sont indiqués en euros (€), toutes taxes comprises. La TVA n'est pas applicable, article 293 B du Code général des impôts (franchise en base). Les frais de livraison sont indiqués avant la validation de la commande. La Coquette se réserve le droit de modifier ses prix à tout moment, les produits étant facturés sur la base des tarifs en vigueur au moment de la commande.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">5. Commande</h2>
            <p>Le Client sélectionne ses articles, renseigne ses coordonnées de livraison puis procède au paiement. La vente est considérée comme définitive après confirmation du paiement. La Coquette se réserve le droit d'annuler toute commande en cas de litige, de défaut de paiement ou de rupture de stock.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">6. Paiement</h2>
            <p>Le paiement s'effectue en ligne par carte bancaire, via la solution de paiement sécurisée <strong className="text-noir font-medium">SumUp</strong>. Les données bancaires sont traitées directement par le prestataire de paiement et ne sont jamais conservées par La Coquette. La commande n'est validée qu'après acceptation du paiement.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">7. Livraison</h2>
            <p>Les commandes sont livrées en France métropolitaine via La Poste, sous un délai indicatif de 3 à 5 jours ouvrés après expédition. Les frais de livraison s'élèvent à {SHIPPING_COST.toFixed(2)} €, et la <strong className="text-noir font-medium">livraison est offerte dès {SHIPPING_THRESHOLD} €</strong> d'achat. La Coquette ne saurait être tenue responsable des retards imputables au transporteur.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">8. Droit de rétractation</h2>
            <p>Conformément aux articles L221-18 et suivants du Code de la consommation, le Client dispose d'un délai de <strong className="text-noir font-medium">14 jours</strong> à compter de la réception de sa commande pour exercer son droit de rétractation, sans avoir à justifier de motif.</p>
            <p className="mt-3">Pour l'exercer, il suffit d'en informer La Coquette par email à contact@lacoquette-bycaro.fr. Le produit doit être retourné dans son état d'origine, non porté, dans les 14 jours suivant la demande. Les frais de retour sont à la charge du Client. Le remboursement intervient dans les 14 jours suivant la réception du produit retourné.</p>
            <p className="mt-3"><strong className="text-noir font-medium">Exception :</strong> conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux bijoux personnalisés ou confectionnés sur mesure selon les spécifications du Client.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">9. Garanties légales</h2>
            <p>Tous les produits bénéficient de la garantie légale de conformité (articles L217-3 et suivants du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 et suivants du Code civil). En cas de produit non conforme ou défectueux, le Client peut contacter La Coquette à contact@lacoquette-bycaro.fr.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">10. Données personnelles</h2>
            <p>Les données collectées lors de la commande sont nécessaires à son traitement et sont traitées conformément à notre <a href="/politique-confidentialite" className="text-noir underline underline-offset-2 hover:text-dore transition-colors">Politique de confidentialité</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">11. Droit applicable & litiges</h2>
            <p>Les présentes CGV sont soumises au droit français. En cas de litige, le Client peut recourir gratuitement à un médiateur de la consommation. Conformément à l'article L612-1 du Code de la consommation, les coordonnées du médiateur compétent seront communiquées sur demande à contact@lacoquette-bycaro.fr. Le Client peut également utiliser la plateforme européenne de règlement en ligne des litiges : <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-noir underline underline-offset-2 hover:text-dore transition-colors">ec.europa.eu/consumers/odr</a>.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
