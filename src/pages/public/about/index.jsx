import React from 'react';
import AboutHero from '../../../components/pages/about/AboutHero';
import OurMission from '../../../components/pages/about/OurMission';
import WhyGhana from '../../../components/pages/about/WhyGhana';
import Milestones from '../../../components/pages/about/Milestones';
import SplitTestimonial from '../../../components/pages/about/SplitTestimonial';
import ImpactCTA from '../../../components/pages/about/ImpactCTA';
import Timeline from '../../../components/pages/about/Timeline';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import ParallaxDivider from '../../../components/common/ParallaxDivider.jsx';
import HrContactSection from '../../../components/common/HrContactSection.jsx';

 const AboutPage = () => {
  return (
    <div>
      <AboutHero />

      <OurMission />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />

      <WhyGhana />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />

      <Milestones />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />

      <SplitTestimonial />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />

      <ImpactCTA />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />

      <Timeline />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />
      <HrContactSection/>

      <NewsletterHero />
    </div>
  );
};

export default AboutPage;
