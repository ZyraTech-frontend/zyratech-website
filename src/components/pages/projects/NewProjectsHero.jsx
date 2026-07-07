import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageWithSkeleton from '../../common/ImageWithSkeleton';

const NewProjectsHero = () => {
  const [projects, setProjects] = useState(0);
  const [success, setSuccess] = useState(0);

  useEffect(() => {
    const projectsInterval = setInterval(() => {
      setProjects(prev => prev < 50 ? prev + 1 : 50);
    }, 30);

    const successInterval = setInterval(() => {
      setSuccess(prev => prev < 100 ? prev + 1 : 100);
    }, 15);

    return () => {
      clearInterval(projectsInterval);
      clearInterval(successInterval);
    };
  }, []);

  return (
    <section className="relative text-white overflow-visible">
      {/* Background Image with Overlays */}
      <div className="absolute inset-0">
        <ImageWithSkeleton
          src="/images/parallax1.webp"
          alt="ZyraTech Projects"
          className="h-full w-full object-cover"
          skeletonClassName="bg-gray-800"
          style={{ objectPosition: 'center 20%' }}
        />
        {/* Match Home Page Hero Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-24 md:py-32 h-[75vh] min-h-[500px] max-h-[700px] flex items-center justify-start">
        <motion.div 
          className="max-w-5xl w-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Headline */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 tracking-tight text-white"
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
          >
            Turn Your Ideas Into Reality
          </motion.h1>

          <motion.p 
            className="text-base md:text-lg lg:text-xl font-normal text-gray-200 mb-8 leading-relaxed max-w-2xl"
            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Custom projects for students, startups, and businesses. From final year projects to full-scale applications, we build it with you.
          </motion.p>

        </motion.div>
      </div>

      {/* Stats Card - Absolutely positioned to overlap section boundary */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 md:p-12">
            <div className="grid grid-cols-3 gap-2 sm:gap-8">
              <div className="text-center">
                <div className="text-xl sm:text-4xl md:text-5xl font-bold text-[#004fa2] mb-1 sm:mb-2 break-words">{projects}+</div>
                <div className="text-xs sm:text-base text-gray-700 font-medium">Projects Delivered</div>
              </div>
              <div className="text-center border-x-2 border-gray-200 px-1 sm:px-4">
                <div className="text-xl sm:text-4xl md:text-5xl font-bold text-[#004fa2] mb-1 sm:mb-2 break-words">{success}%</div>
                <div className="text-xs sm:text-base text-gray-700 font-medium">Student Success</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-4xl md:text-5xl font-bold text-[#004fa2] mb-1 sm:mb-2 break-words">2-8</div>
                <div className="text-xs sm:text-base text-gray-700 font-medium">Weeks Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewProjectsHero;
