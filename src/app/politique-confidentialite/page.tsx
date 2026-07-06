import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Comment La Coquette collecte, utilise et protège vos données personnelles, conformément au RGPD.',
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
            <p>Les données personnelles collectées sur ce site sont traitées par <strong className="text-noir font-medium">La Coquette</strong> — entreprise individuelle DESHAYES CAROLINE (SIRET 479 539 082 00095), 26750 Saint-Paul-lès-Romans. Pour toute question relative à vos données : contact@lacoquette-bycaro.fr.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">2. Données collectées</h2>
            <p>Nous collectons uniquement les données que vous nous transmettez :</p>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li><strong className="text-noir font-medium">Formulaire de contact :</strong> nom, adresse email, message.</li>
              <li><strong className="text-noir font-medium">Commande :</strong> nom, prénom, email, adresse de livraison.</li>
              <li><strong className="text-noir font-medium">Compte membre (facultatif) :</strong> adresse email, prénom, mot de passe (conservé sous forme chiffrée, jamais en clair), vos bijoux favoris et l'historique de vos commandes. La création d'un compte est facultative : vous pouvez commander sans compte.</li>
            </ul>
            <p className="mt-3">Aucune donnée bancaire n'est collectée ni conservée par La Coquette : le paiement est géré directement par notre prestataire sécurisé SumUp.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">3. Finalités & base légale</h2>
            <ul className="mt-1 space-y-2 list-disc pl-5">
              <li>Traiter et expédier vos commandes (exécution du contrat).</li>
              <li>Gérer votre compte membre, vos favoris et l'historique de vos commandes (exécution du contrat et votre consentement).</li>
              <li>Répondre à vos demandes via le formulaire de contact (votre consentement).</li>
              <li>Respecter nos obligations comptables et légales (obligation légale).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">4. Destinataires</h2>
            <p>Vos données ne sont jamais vendues. Elles peuvent être transmises uniquement à nos prestataires techniques, strictement pour le fonctionnement du service :</p>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li><strong className="text-noir font-medium">SumUp</strong> — traitement des paiements.</li>
              <li><strong className="text-noir font-medium">Resend</strong> — envoi des emails (contact, commandes, connexion au compte).</li>
              <li><strong className="text-noir font-medium">Supabase</strong> — base de données des comptes membres et des favoris, hébergée dans l'Union européenne (Paris, France).</li>
              <li><strong className="text-noir font-medium">Vercel</strong> — hébergement du site.</li>
              <li><strong className="text-noir font-medium">La Poste</strong> — expédition des commandes.</li>
              <li><strong className="text-noir font-medium">API Adresse (data.gouv.fr)</strong> — aide à la saisie de l'adresse de livraison.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">5. Transferts hors de l'Union européenne</h2>
            <p>Certains de nos prestataires techniques (notamment l'hébergeur Vercel et le prestataire de paiement SumUp) peuvent être amenés à traiter des données en dehors de l'Union européenne. Ces transferts sont encadrés par des garanties appropriées conformément au RGPD (clauses contractuelles types de la Commission européenne ou décision d'adéquation), afin d'assurer un niveau de protection équivalent à celui de l'Union.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">6. Sécurité</h2>
            <p>La Coquette met en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données : connexion chiffrée (HTTPS) sur l'ensemble du site, accès restreint aux informations, mots de passe des comptes conservés uniquement sous forme chiffrée, et cloisonnement strict des données (chaque membre n'a accès qu'à ses propres favoris et commandes). Le traitement des paiements est assuré directement par notre prestataire sécurisé : <strong className="text-noir font-medium">aucune donnée bancaire n'est stockée par La Coquette</strong>.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">7. Durée de conservation</h2>
            <p>Les données liées à une commande sont conservées le temps nécessaire au traitement puis archivées conformément aux obligations légales (notamment comptables, jusqu'à 10 ans). Les données de votre compte membre (favoris, historique) sont conservées tant que votre compte est actif ; elles sont supprimées lorsque vous supprimez votre compte, ce que vous pouvez faire à tout moment depuis votre espace « Mon compte ». Les messages de contact sont conservés au maximum 3 ans après le dernier échange.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">8. Vos droits</h2>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données. Si vous avez un compte, vous pouvez le supprimer vous-même, avec l'ensemble des données associées, à tout moment depuis votre espace « Mon compte ». Pour toute autre demande, écrivez-nous à contact@lacoquette-bycaro.fr. Vous pouvez également introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-noir underline underline-offset-2 hover:text-dore-mat transition-colors">cnil.fr</a>).</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">9. Cookies</h2>
            <p>Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement (panier, préférences de navigation, et cookie de session pour vous garder connectée à votre compte). Aucun cookie publicitaire ni de pistage tiers n'est utilisé. Aucun consentement préalable n'est donc requis.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
