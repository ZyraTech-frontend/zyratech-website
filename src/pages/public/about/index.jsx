import React from 'react';
import AboutHero from '../../../components/pages/about/AboutHero';
import OurMission from '../../../components/pages/about/OurMission';
import WhyGhana from '../../../components/pages/about/WhyGhana';
import Milestones from '../../../components/pages/about/Milestones';
import SplitTestimonial from '../../../components/pages/about/SplitTestimonial';
import ImpactCTA from '../../../components/pages/about/ImpactCTA';
import Timeline from '../../../components/pages/about/Timeline';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';
import ParallaxDivider from '../../../components/common/ParallaxDivider.jsx';
import HrContactSection from '../../../components/common/HrContactSection.jsx';
import useSEO from '../../../hooks/useSEO';

const AboutPage = () => {
  useSEO({
    title: 'About Us',
    description: 'Learn about Zyra Tech Hub\'s mission to empower Ghana through technology education, digital skills training, and community development in Koforidua.',
    url: '/about',
    keywords: 'about Zyra Tech, Ghana tech education, digital empowerment Ghana, Koforidua technology center'
  });

  return (
    <div>
      <AboutHero />

      <OurMission />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax1.jpeg" />

      <WhyGhana />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax9.png" />

      <Milestones />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax3.png" />

      <SplitTestimonial />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax8.png" bgPosition="bg-top" />

      <ImpactCTA />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax7.png" bgPosition="bg-top" />

      <Timeline />

      <ParallaxDivider heightClassName="h-56 sm:h-64 md:h-72" imageUrl="/images/parallax10.png" bgPosition="bg-top" />
      <HrContactSection />

      <NewsletterHero />
    </div>
  );
};

export default AboutPage;
