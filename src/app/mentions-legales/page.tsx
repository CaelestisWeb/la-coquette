import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales | La Coquette',
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="pt-20 min-h-screen bg-ivoire">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl text-noir mb-12">Mentions légales</h1>

        <div className="space-y-10 font-body text-sm text-taupe leading-relaxed">

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">Éditeur du site</h2>
            <p><strong className="text-noir font-medium">La Coquette</strong><br />
            Caroline<br />
            Auto-entrepreneur / Entreprise individuelle<br />
            SIRET : 479 539 082 00095<br />
            Drôme (26)<br />
            Email : contact@lacoquettebycaro.fr<br />
            Tél : 07 77 88 87 46</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">Hébergement</h2>
            <p>Site hébergé par Vercel Inc.<br />
            440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">Propriété intellectuelle</h2>
            <p>L'ensemble du contenu de ce site (textes, images, logos, graphismes) est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">Données personnelles</h2>
            <p>Les informations collectées via les formulaires sont destinées exclusivement à La Coquette et ne seront en aucun cas cédées à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant : contact@lacoquettebycaro.fr</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">Cookies</h2>
            <p>Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement (panier, préférences). Aucun cookie publicitaire n'est utilisé.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
