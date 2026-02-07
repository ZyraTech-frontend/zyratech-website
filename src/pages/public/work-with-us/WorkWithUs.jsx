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

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax3.png" />

      <ProjectSetupSection />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax4.png" />

      <InterculturalCollaborationSection />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax5.png" />

      {/* <OpportunitiesSection /> */}

      <HowWeHireSection />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax6.png" />

      <HrContactSection />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax7.png" />


      <NewsletterHero />
    </div>
  );
};

export default WorkWithUs;
