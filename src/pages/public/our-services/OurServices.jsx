import React from 'react';
 
import OurServicesHeroSection from './components/OurServicesHeroSection';
import ServicesGridSection from './components/ServicesGridSection';
import WhyPartnersChooseUsSection from './components/WhyPartnersChooseUsSection';
import HrContactSection from '../../../components/common/HrContactSection';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';

const OurServices = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <OurServicesHeroSection />

      {/* Services Grid */}
      <ServicesGridSection />

      {/* + Why choose us */}
      <WhyPartnersChooseUsSection />

      {/* HR Contact */}
      <HrContactSection />

      {/* Newsletter */}
      <NewsletterHero />
    </div>
  );
};

export default OurServices;
