import Hero from '@/components/vitrine/Hero';
import Reassurance from '@/components/vitrine/Reassurance';
import Atelier from '@/components/vitrine/Atelier';
import Galerie from '@/components/vitrine/Galerie';
import SurMesure from '@/components/vitrine/SurMesure';
import OuAcheter from '@/components/vitrine/OuAcheter';
import Contact from '@/components/vitrine/Contact';

// Site vitrine (une page) : présentation de l'activité de Caro. La vente se
// fait sur les marchés et via Instagram, pas en ligne.
// Contenu relu depuis Sanity toutes les 60 s (repli sur le contenu figé).
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reassurance />
      <Atelier />
      <Galerie />
      <SurMesure />
      <OuAcheter />
      <Contact />
    </>
  );
}
