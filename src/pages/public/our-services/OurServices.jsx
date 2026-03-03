import React from 'react';

import OurServicesHeroSection from './components/OurServicesHeroSection';
import ServicesGridSection from './components/ServicesGridSection';
import WhyPartnersChooseUsSection from './components/WhyPartnersChooseUsSection';
import HrContactSection from '../../../components/common/HrContactSection';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import ParallaxDivider from '../../../components/common/ParallaxDivider.jsx';
import useSEO from '../../../hooks/useSEO';

const OurServices = () => {
  useSEO({
    title: 'Our Services',
    description: 'Explore Zyra Tech Hub\'s professional IT services including software development, quality assurance, digital training, and technology consulting in Ghana.',
    url: '/our-services',
    keywords: 'IT services Ghana, software development, quality assurance, digital training services, technology consulting Koforidua'
  });

  return (
    <div className="bg-white">
      {/* Hero */}
      <OurServicesHeroSection />

      {/* Services Grid */}
      <ServicesGridSection />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax10.png" />

      {/* + Why choose us */}
      <WhyPartnersChooseUsSection />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax1.jpeg" />

      {/* HR Contact */}
      <HrContactSection />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax2.png" />

      {/* Newsletter */}
      <NewsletterHero />
    </div>
  );
};

export default OurServices;
