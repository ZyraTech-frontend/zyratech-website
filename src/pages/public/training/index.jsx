import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TrainingLayout from '../../../components/TrainingLayout';
import TrainingAbout from '../../../components/pages/training/TrainingAbout';
import TrainingHero from '../../../components/pages/training/TrainingHero';
import TrainingBenefits from '../../../components/pages/training/TrainingBenefits';
import TrainingTestimonial from '../../../components/pages/training/TrainingTestimonial';
import HrContactSection from '../../../components/common/HrContactSection.jsx';
import ParallaxDivider from '../../../components/common/ParallaxDivider.jsx';
import useSEO from '../../../hooks/useSEO';
import NewsletterHero from '../../../components/pages/home/NewsletterHero.jsx';

const TrainingPage = () => {
  const location = useLocation();

  useSEO({
    title: 'Training Programs',
    description: 'Explore hands-on tech training programs at Zyra Tech Hub. From beginner to advanced levels, gain practical skills in software development, data analytics, and more.'
  });

  useEffect(() => {
    if (!location.hash) return;

    const targetId = location.hash.replace('#', '');
    const element = document.getElementById(targetId);
    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.hash]);

  return (
    <TrainingLayout>
      <TrainingHero />
      <TrainingAbout />
      <ParallaxDivider heightClassName="h-64 sm:h-72 md:h-80" imageUrl="/images/parallax3.png" />
      <TrainingTestimonial />
      <TrainingBenefits />

      <HrContactSection />
      <NewsletterHero />




    </TrainingLayout>
  );
};

export default TrainingPage;
