import Hero from '@/components/sections/Hero';
import Reassurance from '@/components/sections/Reassurance';
import Collections from '@/components/sections/Collections';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import Values from '@/components/sections/Values';
import Testimonials from '@/components/sections/Testimonials';
import Newsletter from '@/components/sections/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reassurance />
      <Collections />
      <FeaturedProducts />
      <Values />
      <Testimonials />
      <Newsletter />
    </>
  );
}
