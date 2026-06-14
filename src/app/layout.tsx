import type { Metadata } from 'next';
import { Pompiere, Montserrat, Caveat } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/ui/CartDrawer';
import ScrollReveal from '@/components/ui/ScrollReveal';

const pompiere = Pompiere({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pompiere',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
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
  icons: { icon: '/logo.png', apple: '/logo.png' },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'La Coquette | Bijoux artisanaux',
    description: 'Des créations en acier inoxydable doré pensées pour révéler votre élégance au quotidien.',
    url: 'https://lacoquette-bycaro.fr',
    siteName: 'La Coquette',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/boucles-placeholder.jpg', width: 1200, height: 630, alt: 'Bijoux La Coquette' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La Coquette | Bijoux artisanaux',
    description: 'Des créations en acier inoxydable doré pensées pour révéler votre élégance au quotidien.',
    images: ['/boucles-placeholder.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'La Coquette',
  description: 'Bijoux artisanaux en acier inoxydable doré, créés par Caroline dans la Drôme.',
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
    <html lang="fr" className={`${pompiere.variable} ${montserrat.variable} ${caveat.variable}`}>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <ScrollReveal />
        </CartProvider>
      </body>
    </html>
  );
}
