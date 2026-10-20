import React from 'react';
import Hero from '../../../components/pages/home/Hero';
import PartnersShowcase from '../../../components/pages/home/PartnersShowcase';
import AboutQuote from '../../../components/pages/home/AboutQuote';
import AboutShowcase from '../../../components/pages/home/AboutShowcase';
import ServicesShowcase from '../../../components/pages/home/ServicesShowcase';
import BenefitsShowcase from '../../../components/pages/home/BenefitsShowcase';
import TestimonialsSection from '../../../components/pages/home/TestimonialsSection';
import ParallaxDivider from '../../../components/common/ParallaxDivider';
import ErrorBoundary from '../../../components/common/ErrorBoundary';
import useSEO from '../../../hooks/useSEO';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactSection from '../../../components/common/HrContactSection';

const HomePage = () => {
  useSEO({
    title: 'Welcome',
    description: 'Zyra Tech Hub in Koforidua, Ghana empowers students, schools, and businesses through hands-on digital training, internships, and professional IT services.',
    url: '/',
    keywords: 'Zyra Tech Hub, Software Engineering Ghana, IT Training Koforidua, Coding Bootcamp Ghana, Web Development classes, Python training Koforidua, Mobile App Development Ghana, Tech Internships Koforidua, KTU tech hub'
  });

  return (
    <div>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <AboutQuote />
      </ErrorBoundary>

      <ErrorBoundary>
        <ParallaxDivider heightClassName="h-48 sm:h-56 md:h-64" imageUrl="/images/parallax1.webp" />
      </ErrorBoundary>

      <ErrorBoundary>
        <PartnersShowcase />
      </ErrorBoundary>
      <ErrorBoundary>
        <AboutShowcase />
      </ErrorBoundary>

      <ErrorBoundary>
        <ParallaxDivider heightClassName="h-48 sm:h-56 md:h-64" imageUrl="/images/parallax2.webp" />
      </ErrorBoundary>

      <ErrorBoundary>
        <ServicesShowcase />
      </ErrorBoundary>
      <ErrorBoundary>
        <BenefitsShowcase />
      </ErrorBoundary>

      <ErrorBoundary>
        <ParallaxDivider heightClassName="h-48 sm:h-56 md:h-64" imageUrl="/images/parallax3.webp" />
      </ErrorBoundary>

      <ErrorBoundary>
        <TestimonialsSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <HrContactSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <NewsletterHero />
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
