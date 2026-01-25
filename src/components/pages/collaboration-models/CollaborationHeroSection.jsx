import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const CollaborationHeroSection = ({ hero }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white">
      <div className="w-full">
        <img
          src={hero?.bannerImage}
          alt="Collaboration"
          className="w-full h-56 sm:h-72 lg:h-96 object-cover"
          onError={(e) => {
            e.currentTarget.src = hero?.bannerFallback;
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
        >
          {hero?.title}
        </motion.h1>
        <motion.p
          className="mt-5 text-gray-600 max-w-4xl mx-auto"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.1 }}
        >
          {hero?.description}
        </motion.p>
      </div>
    </section>
  );
};

export default CollaborationHeroSection;
