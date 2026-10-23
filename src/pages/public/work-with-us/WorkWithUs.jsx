import React, { useState, useEffect } from 'react';
import WorkWithUsHeroSection from '../../../components/pages/work-with-us/WorkWithUsHeroSection';
import HowWeAreSetUpSection from '../../../components/pages/work-with-us/HowWeAreSetUpSection';
import ProjectSetupSection from '../../../components/pages/work-with-us/ProjectSetupSection';
import InterculturalCollaborationSection from '../../../components/pages/work-with-us/InterculturalCollaborationSection';
import HowWeHireSection from '../../../components/pages/work-with-us/HowWeHireSection';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactSection from '../../../components/common/HrContactSection';
import ParallaxDivider from '../../../components/common/ParallaxDivider';
import FullPageSkeleton from '../../../components/common/FullPageSkeleton';
import contentService from '../../../services/contentService';
import useSEO from '../../../hooks/useSEO';

const WorkWithUs = () => {
  useSEO({
    title: 'Work With Us',
    description: 'Learn how to work with Zyra Tech Hub — from organizational setup to project collaboration and intercultural partnerships. Join our growing team in Ghana.',
    url: '/work-with-us',
    keywords: 'work with Zyra Tech Hub, careers Ghana, tech jobs, intercultural collaboration, hiring Ghana'
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await contentService.getPublicWorkWithUs();
        let workWithUsData = response?.data || response;
        
        // Handle single object response (new format)
        if (workWithUsData && !Array.isArray(workWithUsData) && workWithUsData.id) {
          // Parse content field which contains setup, projectSteps, collaboration, hiring
          const contentData = typeof workWithUsData.content === 'string' 
            ? JSON.parse(workWithUsData.content) 
            : workWithUsData.content || {};
          
          setData({
            hero: {
              title: workWithUsData.title,
              subtitle: workWithUsData.subtitle,
              description: workWithUsData.description,
              image: workWithUsData.image || workWithUsData.imageUrl
            },
            setup: contentData.setup || [],
            projectSteps: contentData.projectSteps || [],
            collaboration: contentData.collaboration || { 
              title: '',
              description: '',
              image: '',
              points: [] 
            },
            hiring: contentData.hiring || []
          });
        }
        // Handle array response (old format)
        else if (Array.isArray(workWithUsData) && workWithUsData.length > 0) {
          const heroItem = workWithUsData[0];
          
          // Try to parse content if it exists
          const contentData = heroItem.content 
            ? (typeof heroItem.content === 'string' ? JSON.parse(heroItem.content) : heroItem.content)
            : {};
          
          setData({
            hero: {
              title: heroItem.title,
              subtitle: heroItem.subtitle,
              description: heroItem.description,
              image: heroItem.image || heroItem.imageUrl
            },
            setup: contentData.setup || [],
            projectSteps: contentData.projectSteps || [],
            collaboration: contentData.collaboration || { 
              title: '',
              description: '',
              image: '',
              points: [] 
            },
            hiring: contentData.hiring || []
          });
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Failed to fetch Work With Us data:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <FullPageSkeleton />;
  }

  if (!data) return null;

  return (
    <div className="bg-white">
      <WorkWithUsHeroSection
        title={data.hero?.title}
        subtitle={data.hero?.subtitle}
        description={data.hero?.description}
        image={data.hero?.image}
      />

      <HowWeAreSetUpSection items={data.setup} />

      <ParallaxDivider heightClassName="h-32 sm:h-40 md:h-48" imageUrl="/images/parallax3.webp" />

      <ProjectSetupSection steps={data.projectSteps} />

      <ParallaxDivider heightClassName="h-32 sm:h-40 md:h-48" imageUrl="/images/parallax4.webp" />

      <InterculturalCollaborationSection
        title={data.collaboration?.title}
        description={data.collaboration?.description}
        image={data.collaboration?.image}
        points={data.collaboration?.points}
      />

      {/* <OpportunitiesSection /> */}

      <HowWeHireSection steps={data.hiring} />

      <HrContactSection />

      <NewsletterHero />
    </div>
  );
};

export default WorkWithUs;
