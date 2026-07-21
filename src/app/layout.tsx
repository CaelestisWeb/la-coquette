import type { Metadata } from 'next';
import { Schibsted_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SmoothScroll from '@/components/ui/SmoothScroll';
import BackToTop from '@/components/ui/BackToTop';
import { Analytics } from '@vercel/analytics/next';
import ConditionalChrome from '@/components/layout/ConditionalChrome';
import { getSettings } from '@/sanity/lib/vitrine';

// Grotesque de caractère (Fontshare), auto-hébergé : titres. Formes serrées
// et légèrement condensées, une personnalité que n'ont pas les sans-serif
// génériques, tout en restant sobre et monochrome.
const cabinet = localFont({
  src: [
    { path: '../../public/fonts/CabinetGrotesk-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/CabinetGrotesk-500.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/CabinetGrotesk-700.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/CabinetGrotesk-800.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-cabinet',
  display: 'swap',
});

// Grotesque scandinave neutre et très lisible en petit : corps, labels, UI.
const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-schibsted',
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
    <html lang="fr" className={`${cabinet.variable} ${schibsted.variable}`}>
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
