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
import useSEO from '../../../hooks/useSEO';

const ProjectsPage = () => {
  useSEO({
    title: 'Projects',
    description: 'Explore software projects built by Zyra Tech Hub — from web apps to mobile solutions. See what we build and request your own custom project.',
    url: '/projects',
    keywords: 'software projects Ghana, web development, mobile apps, custom software, Zyra Tech Hub projects'
  });

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
