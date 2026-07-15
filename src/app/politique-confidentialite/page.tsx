import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Comment La Coquette traite vos données personnelles sur ce site vitrine, conformément au RGPD.',
  robots: { index: false },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="pt-32 md:pt-44 min-h-screen bg-ivoire">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl text-noir mb-4">Politique de confidentialité</h1>
        <p className="font-body text-xs text-taupe mb-12">Dernière mise à jour : juillet 2026</p>

        <div className="space-y-10 font-body text-sm text-taupe leading-relaxed">

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">1. Responsable du traitement</h2>
            <p>Les données traitées dans le cadre de ce site le sont par <strong className="text-noir font-medium">La Coquette</strong>, entreprise individuelle DESHAYES CAROLINE (SIRET 479 539 082 00095), 26750 Saint-Paul-lès-Romans. Pour toute question relative à vos données : contact@lacoquette-bycaro.fr.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">2. Données collectées</h2>
            <p>Ce site est un site vitrine : il ne comporte ni boutique en ligne, ni compte, ni formulaire. Nous ne collectons donc aucune donnée personnelle par ce biais.</p>
            <p className="mt-3">La seule donnée que vous nous transmettez est celle contenue dans les messages que vous nous adressez de votre propre initiative, par email ou via Instagram (votre adresse, votre nom si vous l&apos;indiquez, le contenu de votre message).</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">3. Mesure d&apos;audience</h2>
            <p>Nous utilisons une mesure d&apos;audience respectueuse de la vie privée (Vercel Analytics), qui fonctionne <strong className="text-noir font-medium">sans cookie</strong> et produit uniquement des statistiques agrégées et anonymes (pages vues, provenance générale). Aucun profilage individuel n&apos;est réalisé.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">4. Destinataires</h2>
            <p>Vos données ne sont jamais vendues. Le fonctionnement du site repose sur un seul prestataire technique :</p>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li><strong className="text-noir font-medium">Vercel</strong>, hébergement du site et mesure d&apos;audience sans cookie.</li>
            </ul>
            <p className="mt-3">Les messages que vous nous envoyez par email nous parviennent directement et ne sont partagés avec personne.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">5. Transferts hors de l&apos;Union européenne</h2>
            <p>Notre hébergeur (Vercel) peut être amené à traiter des données en dehors de l&apos;Union européenne. Ces transferts sont encadrés par des garanties appropriées conformément au RGPD (clauses contractuelles types de la Commission européenne), afin d&apos;assurer un niveau de protection équivalent à celui de l&apos;Union.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">6. Durée de conservation</h2>
            <p>Les messages que vous nous adressez sont conservés au maximum 3 ans après le dernier échange, puis supprimés.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">7. Vos droits</h2>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de portabilité de vos données. Pour exercer ces droits, écrivez-nous à contact@lacoquette-bycaro.fr. Vous pouvez également introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-noir underline underline-offset-2 hover:text-taupe transition-colors">cnil.fr</a>).</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">8. Cookies</h2>
            <p>Ce site n&apos;utilise aucun cookie de pistage ni de publicité. La mesure d&apos;audience fonctionne sans cookie. Aucun consentement préalable n&apos;est donc requis.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
