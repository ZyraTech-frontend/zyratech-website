import React from 'react';
import Hero from '../../../components/pages/home/Hero';
import ImpactStats from '../../../components/pages/home/ImpactStats';
import About from '../../../components/pages/home/About';
import Pillars from '../../../components/pages/home/Pillars';
import Projects from '../../../components/pages/home/Projects';
import Testimonials from '../../../components/pages/home/Testimonials';
import Partners from '../../../components/pages/home/Partners';
import Gallery from '../../../components/pages/home/Gallery';
import ImpactStories from '../../../components/pages/home/ImpactStories';
import NewsletterHero from '../../../components/pages/home/NewsletterHero';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ImpactStats />
      <About />
      <Pillars />
      <Projects />
      <Testimonials />
      <ImpactStories />
      <Partners />

      <Gallery />
      <NewsletterHero />
    </div>
  );
};

export default HomePage;
