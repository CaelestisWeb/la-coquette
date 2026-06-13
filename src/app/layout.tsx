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
  title: 'La Coquette |Bijoux artisanaux pour femmes élégantes',
  description: 'Découvrez la collection La Coquette : bijoux en acier inoxydable, élégants et durables. Boucles d\'oreilles, bracelets, colliers pensés pour révéler votre féminité au quotidien.',
  keywords: ['bijoux', 'boucles d\'oreilles', 'bracelets', 'colliers', 'artisanal', 'acier inoxydable', 'femme'],
  icons: { icon: '/logo.png', apple: '/logo.png' },
  openGraph: {
    title: 'La Coquette |Bijoux artisanaux',
    description: 'Des créations pensées pour révéler votre élégance au quotidien.',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${pompiere.variable} ${montserrat.variable} ${caveat.variable}`}>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
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
