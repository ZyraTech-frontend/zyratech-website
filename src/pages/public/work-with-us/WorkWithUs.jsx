import React, { useState, useEffect } from 'react';
import WorkWithUsHeroSection from '../../../components/pages/work-with-us/WorkWithUsHeroSection';
import HowWeAreSetUpSection from '../../../components/pages/work-with-us/HowWeAreSetUpSection';
import ProjectSetupSection from '../../../components/pages/work-with-us/ProjectSetupSection';
import InterculturalCollaborationSection from '../../../components/pages/work-with-us/InterculturalCollaborationSection';
import HowWeHireSection from '../../../components/pages/work-with-us/HowWeHireSection';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import HrContactSection from '../../../components/common/HrContactSection';
import ParallaxDivider from '../../../components/common/ParallaxDivider';
import contentService from '../../../services/contentService';
import Loader from '../../../components/admin/shared/LoadingSpinner';

const WorkWithUs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await contentService.getWorkWithUs();
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch Work With Us data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
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

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax3.png" />

      <ProjectSetupSection steps={data.projectSteps} />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax4.png" />

      <InterculturalCollaborationSection
        title={data.collaboration?.title}
        description={data.collaboration?.description}
        image={data.collaboration?.image}
        points={data.collaboration?.points}
      />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax5.png" />

      {/* <OpportunitiesSection /> */}

      <HowWeHireSection steps={data.hiring} />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax6.png" />

      <HrContactSection />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax7.png" />

      <NewsletterHero />
    </div>
  );
};

export default WorkWithUs;
