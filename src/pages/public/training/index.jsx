import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TrainingLayout from '../../../components/TrainingLayout';
import TrainingAbout from '../../../components/pages/training/TrainingAbout';
import TrainingHero from '../../../components/pages/training/TrainingHero';
import TrainingBenefits from '../../../components/pages/training/TrainingBenefits';
import TrainingProcess from '../../../components/pages/training/TrainingProcess';
import HrContactSection from '../../../components/common/HrContactSection.jsx';
import useSEO from '../../../hooks/useSEO';
 

const ParallaxDivider = ({ heightClassName = 'h-72 sm:h-80 md:h-96' }) => (
  <section
    className={`hidden md:block relative ${heightClassName} md:bg-fixed bg-center bg-cover`}
    style={{ backgroundImage: "url('/images/image3.png')" }}
  >
    <div className="absolute inset-0 bg-black/60" />
  </section>
);

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
      <ParallaxDivider heightClassName="h-64 sm:h-72 md:h-80" />
      <TrainingBenefits />
      <ParallaxDivider heightClassName="h-64 sm:h-72 md:h-80" />
      <TrainingProcess />
      <HrContactSection
        name="Magdalene"
        title="HR Team Lead"
        imageUrl="/images/Dalene.png"
        email="magdalene@zyratech.com"
      />
    </TrainingLayout>
  );
};

export default TrainingPage;
