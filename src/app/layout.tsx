import type { Metadata } from 'next';
import { Jost, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SmoothScroll from '@/components/ui/SmoothScroll';
import BackToTop from '@/components/ui/BackToTop';
import { Analytics } from '@vercel/analytics/next';
import ConditionalChrome from '@/components/layout/ConditionalChrome';
import { getSettings } from '@/sanity/lib/vitrine';

// Sans géométrique épuré — titres
const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
});

// Neo-grotesque neutre — corps, labels, UI
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

const DESC =
  'La Coquette, créations de bijoux fait main par Caro, dans la Drôme. Boucles d\'oreilles en acier inoxydable doré, pièces uniques. Retrouvez-moi sur les marchés et sur Instagram.';

export const metadata: Metadata = {
  metadataBase: new URL('https://lacoquette-bycaro.fr'),
  title: {
    default: 'La Coquette | Bijoux fait main, en Drôme',
    template: '%s | La Coquette',
  },
  description: DESC,
  keywords: ['bijoux fait main', 'boucles d\'oreilles', 'créatrice de bijoux', 'artisan bijoux', 'Drôme', 'acier inoxydable doré', 'La Coquette', 'Caro'],
  authors: [{ name: 'La Coquette' }],
  icons: { icon: '/favicon.svg', apple: '/apple-icon.png' },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'La Coquette | Bijoux fait main',
    description: DESC,
    url: 'https://lacoquette-bycaro.fr',
    siteName: 'La Coquette',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'La Coquette, bijoux fait main' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Coquette | Bijoux fait main',
    description: DESC,
    images: ['/og-image.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'JewelryStore',
  name: 'La Coquette',
  description: 'Créations de bijoux fait main par Caro, dans la Drôme. Vente sur les marchés et via Instagram.',
  url: 'https://lacoquette-bycaro.fr',
  email: 'contact@lacoquette-bycaro.fr',
  image: 'https://lacoquette-bycaro.fr/logo.png',
  address: { '@type': 'PostalAddress', addressRegion: 'Drôme', addressCountry: 'FR' },
  areaServed: 'FR',
  sameAs: ['https://www.instagram.com/lacoquette_bycaro/'],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <html lang="fr" className={`${jost.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ConditionalChrome
          header={<Header instagram={settings.instagram} />}
          footer={<><Footer /><ScrollReveal /><SmoothScroll /><BackToTop /></>}
        >
          {children}
        </ConditionalChrome>
        {/* Statistiques de fréquentation (sans cookie, respectueux du RGPD). */}
        <Analytics />
      </body>
    </html>
  );
}
