import React from 'react';

import OurServicesHeroSection from './components/OurServicesHeroSection';
import ServicesGridSection from './components/ServicesGridSection';
import WhyPartnersChooseUsSection from './components/WhyPartnersChooseUsSection';
import HrContactSection from '../../../components/common/HrContactSection';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import ParallaxDivider from '../../../components/common/ParallaxDivider.jsx';

const OurServices = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <OurServicesHeroSection />

      {/* Services Grid */}
      <ServicesGridSection />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />

      {/* + Why choose us */}
      <WhyPartnersChooseUsSection />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />

      {/* HR Contact */}
      <HrContactSection />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />

      {/* Newsletter */}
      <NewsletterHero />
    </div>
  );
};

export default OurServices;
