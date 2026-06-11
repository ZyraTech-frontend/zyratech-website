import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const BlogHero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative text-white overflow-hidden">
      {/* Background Image with Overlays */}
      <div className="absolute inset-0">
        <img 
          decoding="async"
          src="/images/download.jpg"
          alt="ZyraTech Blog Banner"
          className="h-full w-full object-cover brightness-110"
          style={{ objectPosition: 'right 25%' }}
        />
        {/* Consistent Gradient from left to dark */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-24 md:py-32 h-[75vh] min-h-[500px] max-h-[700px] flex items-center justify-start">
        <motion.div 
          className="max-w-5xl w-full"
          initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        >
          {/* Main Headline */}
          <motion.h1 
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0 }}
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 tracking-tight text-white"
          >
            Insights & Stories from ZyraTech
          </motion.h1>

          <motion.p 
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0.1 }}
            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
            className="text-base md:text-lg lg:text-xl font-normal text-gray-200 mb-8 leading-relaxed max-w-2xl"
          >
            Explore our journey in tech education, innovation, and community impact through articles, project showcases, and success stories.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
