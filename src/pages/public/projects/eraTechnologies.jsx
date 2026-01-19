import React from 'react';
import Navbar from '../../../components/Navbar';
import ProjectDetailHero from '../../../components/pages/projects/ProjectDetailHero';
import ProjectOverview from '../../../components/pages/projects/ProjectOverview';
import ProjectChallenges from '../../../components/pages/projects/ProjectChallenges';
import ProjectGallery from '../../../components/pages/projects/ProjectGallery';
import ProjectImpact from '../../../components/pages/projects/ProjectImpact';
import RelatedProjects from '../../../components/pages/projects/RelatedProjects';
import ProjectDetailCTA from '../../../components/pages/projects/ProjectDetailCTA';
import CoreProductsSection from '../../../components/pages/projects/CoreProductsSection';

const EraTechnologiesPage = () => {
  const projectData = {
    title: 'Zyra Tech Hub: Digital Tools Empowering Ghana',
    category: 'Business Solutions',
    description: 'Zyra Tech Hub delivers practical, reliable, and scalable digital tools designed for Ghanaian businesses, schools, and startups. Our platforms streamline operations, improve accountability, and help teams make data-driven decisions with ease.',
    status: 'Active',
    year: '2024',
    image: '/images/era-technologies/era-kpi2.jpg'
  };

  const overview = {
    description: 'Zyra Tech Hub delivers practical, reliable, and scalable digital tools designed for Ghanaian businesses, schools, and startups. Our platforms streamline operations, improve accountability, and help teams make data-driven decisions with ease.',
    details: 'Built in Ghana, for Ghana – solving operational problems with local context and affordability. Fast, secure, and scalable – suitable for growing businesses and institutions. Integrated with Zyra Tech Hub solutions – works seamlessly with IoT devices, student projects, and enterprise tools developed in-house.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Cloud Infrastructure', 'Real-time Analytics', 'SMS/Email APIs'],
    timeline: '12 months',
    teamSize: '5 developers + 2 business analysts + 1 product manager'
  };

  const coreProducts = [
    {
      title: 'Performance Dashboard',
      description: 'A performance-tracking dashboard that helps organizations monitor productivity, evaluate progress, and align teams with strategic goals.',
      features: [
        'Real-time performance monitoring',
        'Automated performance summaries',
        'Customizable metrics for startups, SMEs, and training programs'
      ]
    },
    {
      title: 'Attendance Management',
      description: 'A seamless digital attendance and workforce management system built for companies, schools, and training hubs.',
      features: [
        'QR-based check-ins',
        'Auto-generated attendance reports',
        'Staff and student performance insights'
      ]
    },
    {
      title: 'Communication Platform',
      description: 'A reliable communication suite that enables organizations to reach large audiences instantly.',
      features: [
        'Send mass SMS and email campaigns',
        'Multi-branch communication control',
        'Ideal for schools, SMEs, events, and civic organizations'
      ]
    }
  ];

  const challenges = [
    {
      type: 'challenge',
      description: 'Creating an integrated platform that combines multiple business functions while maintaining ease of use and scalability for diverse business types.'
    },
    {
      type: 'solution',
      description: 'Developed a modular architecture that allows businesses to use individual tools or the complete suite, with seamless integration between modules and real-time data synchronization.'
    },
    {
      type: 'results',
      description: 'Successfully deployed across 50+ companies with 85% user adoption rate and 40% average improvement in operational efficiency.'
    }
  ];

  const metrics = [
    { value: '50+', label: 'Companies Using' },
    { value: '85%', label: 'User Adoption' },
    { value: '40%', label: 'Efficiency Gain' }
  ];

  const relatedProjects = [
    {
      title: 'SafeDrive',
      description: 'Intelligent road safety system',
      image: '/images/image1.png',
      link: '/projects/safedrive'
    },
    {
      title: 'EcoWatch',
      description: 'Air quality monitoring system',
      image: '/images/image2.png',
      link: '/projects/ecowatch'
    },
    {
      title: 'AgrizPlanter',
      description: 'An automated rice planting device designed to eliminate the stress of manual transplanting, increase planting speed and accuracy, and improve farmers\' efficiency and productivity.',
      image: '/images/image3.png',
      link: '/projects/agrizplanter'
    }
  ];

  const galleryItems = [
    { image: '/images/image1.png', alt: 'ERA KPI dashboard' },
    { image: '/images/image2.png', alt: 'ERA Technologies interface' },
    { image: '/images/image3.png', alt: 'ERA Technologies performance tracking' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ProjectDetailHero project={projectData} />
      <ProjectOverview overview={overview} />
      <CoreProductsSection products={coreProducts} />
      <ProjectChallenges challenges={challenges} />
      <ProjectGallery items={galleryItems} galleryLink="/projects/era-technologies/gallery" />
      <ProjectImpact metrics={metrics} />
      <RelatedProjects projects={relatedProjects} />
      <ProjectDetailCTA />
    </div>
  );
};

export default EraTechnologiesPage;

