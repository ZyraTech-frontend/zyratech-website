import React from 'react';
import Navbar from '../../../components/Navbar';
import NewProjectsHero from '../../../components/pages/projects/NewProjectsHero';
import WhatWeBuild from '../../../components/pages/projects/WhatWeBuild';
import HowItWorks from '../../../components/pages/projects/HowItWorks';
import PricingSection from '../../../components/pages/projects/PricingSection';
import ProjectsFAQ from '../../../components/pages/projects/ProjectsFAQ';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactSection from '../../../components/common/HrContactSection';
import Footer from '../../../components/Footer';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <NewProjectsHero />
      <WhatWeBuild />
      <HowItWorks />
      <PricingSection />
      <ProjectsFAQ />
      <HrContactSection />
      
      <NewsletterHero />
      <Footer />
    </div>
  );
};

export default ProjectsPage;
