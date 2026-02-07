import React from 'react';
import Hero from '../../../components/pages/home/Hero';
import PartnersShowcase from '../../../components/pages/home/PartnersShowcase';
import AboutQuote from '../../../components/pages/home/AboutQuote';
import AboutShowcase from '../../../components/pages/home/AboutShowcase';
import ServicesShowcase from '../../../components/pages/home/ServicesShowcase';
import BenefitsShowcase from '../../../components/pages/home/BenefitsShowcase';
import TestimonialsSection from '../../../components/pages/home/TestimonialsSection';
import ParallaxDivider from '../../../components/common/ParallaxDivider';
import useSEO from '../../../hooks/useSEO';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactSection from '../../../components/common/HrContactSection';

const HomePage = () => {
  useSEO({
    title: 'Home',
    description: 'Zyra Tech Hub in Koforidua, Ghana empowers students, schools, and businesses through hands-on digital training, internships, and professional IT services.',
    url: '/',
    keywords: 'tech training Ghana, IT courses Ghana, digital skills training, internships Ghana, Koforidua tech hub, software development Ghana'
  });

  return (
    <div>
      <Hero />
      <AboutQuote />

      <ParallaxDivider heightClassName="h-48 sm:h-56 md:h-64" imageUrl="/images/parallax1.jpeg" />

      <PartnersShowcase />
      <AboutShowcase />

      <ParallaxDivider heightClassName="h-48 sm:h-56 md:h-64" imageUrl="/images/parallax2.png" />

      <ServicesShowcase />
      <BenefitsShowcase />

      <ParallaxDivider heightClassName="h-48 sm:h-56 md:h-64" imageUrl="/images/parallax3.png" />

      <TestimonialsSection />
      <HrContactSection />
      <NewsletterHero />
    </div>
  );
};

export default HomePage;
