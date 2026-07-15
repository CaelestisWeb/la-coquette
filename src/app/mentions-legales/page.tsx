import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales',
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="pt-32 md:pt-44 min-h-screen bg-ivoire">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl text-noir mb-12">Mentions légales</h1>

        <div className="space-y-10 font-body text-sm text-taupe leading-relaxed">

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">Éditeur du site</h2>
            <p><strong className="text-noir font-medium">La Coquette</strong><br />
            Entreprise individuelle DESHAYES CAROLINE, micro-entreprise<br />
            26750 Saint-Paul-lès-Romans, France<br />
            SIREN : 479 539 082, SIRET : 479 539 082 00095<br />
            Directrice de la publication : Caroline Deshayes<br />
            Contact : contact@lacoquette-bycaro.fr</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">Hébergement</h2>
            <p>Site hébergé par Vercel Inc.<br />
            440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">Propriété intellectuelle</h2>
            <p>L&apos;ensemble du contenu de ce site (textes, images, logos, graphismes) est protégé par le droit d&apos;auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">Données personnelles</h2>
            <p>Ce site est un site vitrine : il ne comporte ni boutique, ni compte, ni formulaire, et ne collecte aucune donnée à votre insu. Si vous nous écrivez (par email ou via Instagram), vous nous transmettez les informations contenues dans votre message. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression en écrivant à contact@lacoquette-bycaro.fr. Pour le détail, consultez notre <a href="/politique-confidentialite" className="text-noir underline underline-offset-2 hover:text-taupe transition-colors">Politique de confidentialité</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-noir mb-4">Cookies</h2>
            <p>Ce site n&apos;utilise aucun cookie de pistage ni de publicité. La mesure d&apos;audience (Vercel Analytics) fonctionne sans cookie et sans donnée personnelle identifiable.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
