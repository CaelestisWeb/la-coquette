import type { Metadata } from 'next';
import { Jost, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/ui/CartDrawer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SmoothScroll from '@/components/ui/SmoothScroll';
import BackToTop from '@/components/ui/BackToTop';
import CartTitle from '@/components/ui/CartTitle';
import { Analytics } from '@vercel/analytics/next';
import ConditionalChrome from '@/components/layout/ConditionalChrome';

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

export const metadata: Metadata = {
  metadataBase: new URL('https://lacoquette-bycaro.fr'),
  title: {
    default: 'La Coquette | Bijoux artisanaux pour femmes élégantes',
    template: '%s | La Coquette',
  },
  description: 'Découvrez la collection La Coquette : boucles d\'oreilles artisanales en acier inoxydable doré, élégantes et durables, pensées pour révéler votre féminité au quotidien.',
  keywords: ['bijoux artisanaux', 'boucles d\'oreilles', 'acier inoxydable doré', 'bijoux femme', 'Drôme', 'fait main', 'La Coquette'],
  authors: [{ name: 'La Coquette' }],
  icons: { icon: '/favicon.svg', apple: '/apple-icon.png' },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'La Coquette | Bijoux artisanaux',
    description: 'Des créations en acier inoxydable doré pensées pour révéler votre élégance au quotidien.',
    url: 'https://lacoquette-bycaro.fr',
    siteName: 'La Coquette',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'La Coquette — Bijoux artisanaux' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Coquette | Bijoux artisanaux',
    description: 'Des créations en acier inoxydable doré pensées pour révéler votre élégance au quotidien.',
    images: ['/og-image.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'La Coquette',
  description: 'Bijoux artisanaux en acier inoxydable doré, créés par Caro dans la Drôme.',
  url: 'https://lacoquette-bycaro.fr',
  email: 'contact@lacoquette-bycaro.fr',
  image: 'https://lacoquette-bycaro.fr/logo.png',
  address: { '@type': 'PostalAddress', addressRegion: 'Drôme', addressCountry: 'FR' },
  areaServed: 'FR',
  priceRange: '€€',
  sameAs: ['https://www.instagram.com/lacoquette_bycaro/'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${jost.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <FavoritesProvider>
            <ConditionalChrome
              header={<Header />}
              footer={<><Footer /><CartDrawer /><ScrollReveal /><SmoothScroll /><BackToTop /><CartTitle /></>}
            >
              {children}
            </ConditionalChrome>
          </FavoritesProvider>
        </CartProvider>
        {/* Statistiques de fréquentation (sans cookie, respectueux du RGPD). */}
        <Analytics />
      </body>
    </html>
  );
}
