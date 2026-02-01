import React from 'react';
import Hero from '../../../components/pages/home/Hero';
import PartnersShowcase from '../../../components/pages/home/PartnersShowcase';
import AboutQuote from '../../../components/pages/home/AboutQuote';
import AboutShowcase from '../../../components/pages/home/AboutShowcase';
import ServicesShowcase from '../../../components/pages/home/ServicesShowcase';
import BenefitsShowcase from '../../../components/pages/home/BenefitsShowcase';
import TestimonialsSection from '../../../components/pages/home/TestimonialsSection';
import ParallaxDivider from '../../../components/common/ParallaxDivider';

import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactSection from '../../../components/common/HrContactSection';



const HomePage = () => {
  return (
    <div>
      <Hero />
      <AboutQuote />
      
      <ParallaxDivider heightClassName="h-48 sm:h-56 md:h-64" />
      
      <PartnersShowcase />
      <AboutShowcase />
      
      <ParallaxDivider heightClassName="h-48 sm:h-56 md:h-64" />
      
      <ServicesShowcase />
      <BenefitsShowcase />
      
      <ParallaxDivider heightClassName="h-48 sm:h-56 md:h-64" />
      
      <TestimonialsSection />
      <HrContactSection />
      <NewsletterHero />
    </div>
  );
};

export default HomePage;
