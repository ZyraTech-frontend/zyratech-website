import React from 'react';
import WorkWithUsHeroSection from '../../../components/pages/work-with-us/WorkWithUsHeroSection';
import HowWeAreSetUpSection from '../../../components/pages/work-with-us/HowWeAreSetUpSection';
import ProjectSetupSection from '../../../components/pages/work-with-us/ProjectSetupSection';
import InterculturalCollaborationSection from '../../../components/pages/work-with-us/InterculturalCollaborationSection';
import HowWeHireSection from '../../../components/pages/work-with-us/HowWeHireSection';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactSection from '../../../components/common/HrContactSection';
import ParallaxDivider from '../../../components/common/ParallaxDivider';

const WorkWithUs = () => {
  return (
    <div className="bg-white">
      <WorkWithUsHeroSection />

      <HowWeAreSetUpSection />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />

      <ProjectSetupSection />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />

      <InterculturalCollaborationSection />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />

      {/* <OpportunitiesSection /> */}

      <HowWeHireSection />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />
    
      <HrContactSection/>

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" />

    
      <NewsletterHero/>
    </div>
  );
};

export default WorkWithUs;
