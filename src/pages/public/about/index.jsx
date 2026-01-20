import React from 'react';
import Breadcrumb from '../../../components/pages/about/Breadcrumb';
import AboutHero from '../../../components/pages/about/AboutHero';
import OurMission from '../../../components/pages/about/OurMission';
import WhyGhana from '../../../components/pages/about/WhyGhana';
import CommunityImpact from '../../../components/pages/about/CommunityImpact';
import Milestones from '../../../components/pages/about/Milestones';
import Approach from '../../../components/pages/about/Approach';
import ImpactTestimonial from '../../../components/pages/about/ImpactTestimonial';
import Timeline from '../../../components/pages/about/Timeline';

const AboutPage = () => {
  return (
    <div>
      <Breadcrumb />
      <AboutHero />
      <OurMission />
      <WhyGhana />
      <Milestones />
      <ImpactTestimonial />
      <Approach />
      <Timeline />
      <CommunityImpact />
    </div>
  );
};

export default AboutPage;
