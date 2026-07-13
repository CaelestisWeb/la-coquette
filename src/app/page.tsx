import Hero from '@/components/vitrine/Hero';
import Atelier from '@/components/vitrine/Atelier';
import Galerie from '@/components/vitrine/Galerie';
import OuAcheter from '@/components/vitrine/OuAcheter';
import Contact from '@/components/vitrine/Contact';

// Site vitrine (une page) : présentation de l'activité de Caro. La vente se
// fait sur les marchés et via Instagram, pas en ligne.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Atelier />
      <Galerie />
      <OuAcheter />
      <Contact />
    </>
  );
}
