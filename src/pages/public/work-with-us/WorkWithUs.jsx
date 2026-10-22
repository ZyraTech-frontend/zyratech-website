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
        const items = response?.data || response;
        
        // Backend returns an array of items, transform it to the structure components expect
        if (Array.isArray(items) && items.length > 0) {
          // Find the hero item (first item or one with order: 0)
          const heroItem = items[0];
          
          setData({
            hero: {
              title: heroItem.title,
              subtitle: heroItem.subtitle,
              description: heroItem.description,
              image: heroItem.image || heroItem.imageUrl
            }
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

  if (!data || !data.hero) return null;

  return (
    <div className="bg-white">
      <WorkWithUsHeroSection
        title={data.hero?.title}
        subtitle={data.hero?.subtitle}
        description={data.hero?.description}
        image={data.hero?.image}
      />

      <HowWeAreSetUpSection items={data.setup} />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax3.webp" />

      <ProjectSetupSection steps={data.projectSteps} />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax4.webp" />

      <InterculturalCollaborationSection
        title={data.collaboration?.title}
        description={data.collaboration?.description}
        image={data.collaboration?.image}
        points={data.collaboration?.points}
      />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax5.webp" />

      {/* <OpportunitiesSection /> */}

      <HowWeHireSection steps={data.hiring} />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax6.webp" />

      <HrContactSection />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax7.webp" />

      <NewsletterHero />
    </div>
  );
};

export default WorkWithUs;
