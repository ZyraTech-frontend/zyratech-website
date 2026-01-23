import React from 'react';
import AboutHero from '../../../components/pages/about/AboutHero';
import OurMission from '../../../components/pages/about/OurMission';
import WhyGhana from '../../../components/pages/about/WhyGhana';
import Milestones from '../../../components/pages/about/Milestones';
import SplitTestimonial from '../../../components/pages/about/SplitTestimonial';
import ImpactCTA from '../../../components/pages/about/ImpactCTA';
import Timeline from '../../../components/pages/about/Timeline';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';

const AboutPage = () => {
  return (
    <div>
      <AboutHero />
      <OurMission />
      <WhyGhana />
      <Milestones />
      <SplitTestimonial />
      <ImpactCTA />
      <Timeline />
      <NewsletterHero />
    </div>
  );
};

export default AboutPage;
