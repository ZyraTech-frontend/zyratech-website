import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import contentService from '../../../services/contentService';

const AboutHero = ({
  title: initialTitle,
  highlight: initialHighlight,
  description: initialDescription,
  backgroundImage: initialBackgroundImage
}) => {
  const shouldReduceMotion = useReducedMotion();

  const [heroData, setHeroData] = useState({
    title: initialTitle || 'Building the next generation of',
    highlight: initialHighlight || 'tech talent',
    description: initialDescription || 'We bridge the gap between education and industry through comprehensive training, professional internships, and real-world projects—empowering individuals and organizations with job-ready digital skills.',
    backgroundImage: initialBackgroundImage || '/images/image1.png'
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const { data } = await contentService.getAboutHero();
        if (data) {
          setHeroData({
            title: data.title || heroData.title,
            highlight: data.highlight || heroData.highlight,
            description: data.description || heroData.description,
            backgroundImage: data.backgroundImage || heroData.backgroundImage
          });
        }
      } catch (error) {
        console.error('Error fetching About Hero data:', error);
      }
    };
    fetchHeroData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative isolate overflow-hidden">
      <div className="max-w-none px-0">
        <div
          className="relative overflow-hidden h-[70vh] min-h-[520px] max-h-[780px] bg-cover bg-center bg-scroll md:bg-fixed"
          style={{
            backgroundImage: `url(${heroData.backgroundImage})`
          }}
        >
          <div className="absolute inset-0 bg-black/45" />

          <div className="relative px-4 sm:px-6 md:px-10 lg:px-14 py-16 sm:py-20 md:py-24 lg:py-28 h-full flex items-center">
            <motion.div
              className="max-w-4xl"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-0 leading-tight">
                Building the Next Generation <span className="text-[#004fa2] block">of Tech Talent</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg md:text-xl font-semibold text-white/90 leading-relaxed max-w-3xl">
                {heroData.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;


