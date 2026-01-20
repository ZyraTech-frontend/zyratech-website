import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';

const WhyGhana = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const contentAnimation = useScrollAnimation({ type: 'slideUp', delay: 0.1 });
  const statsAnimation = useScrollAnimation({ type: 'slideUp', delay: 0.2 });
  const imageAnimation = useScrollAnimation({ type: 'slideUp', delay: 0.3 });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-3xl md:text-4xl font-bold text-black mb-8"
        >
          Why We Chose Ghana
        </motion.h2>

        <motion.div
          ref={contentAnimation.ref}
          initial={contentAnimation.initial}
          animate={contentAnimation.animate}
          variants={contentAnimation.variants}
          transition={contentAnimation.transition}
          className="mb-12"
        >
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Ghana's rapid urbanization is bringing larger shares of the growing population closer to better infrastructure, connectivity and educational opportunities.
          </p>
        </motion.div>

        {/* Statistics Cards */}
        <div className="max-w-md mx-auto mb-12">
          {/* Ghana Card */}
          <motion.div
            ref={statsAnimation.ref}
            initial={statsAnimation.initial}
            animate={statsAnimation.animate}
            variants={statsAnimation.variants}
            transition={statsAnimation.transition}
            className="bg-white rounded-xl shadow-sm p-8 border border-gray-200"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#004fa2] rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#004fa2]">Koforidua, Ghana</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Population (Million)</span>
                <span className="font-semibold text-black">34.1</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Median Age (yrs)</span>
                <span className="font-semibold text-black">21.1</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Time Difference (hrs)</span>
                <span className="font-semibold text-black">1-2</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Languages</span>
                <span className="font-semibold text-black text-right text-sm">English (official) with various local languages belonging to the Akan and Ewe groups among others</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-sm mb-8"
        >
          <p className="text-gray-700 mb-4">
            We have committed to training 2,000 individuals and providing 500 jobs by 2026
            as part of our commitment to Ghana's digital transformation.
          </p>
          <Link
            to="/impact"
            className="inline-flex items-center text-[#004fa2] hover:text-[#003d7a] font-semibold transition-colors"
          >
            Learn More About Our Impact
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          ref={imageAnimation.ref}
          initial={imageAnimation.initial}
          animate={imageAnimation.animate}
          variants={imageAnimation.variants}
          transition={imageAnimation.transition}
          className="relative max-w-md mx-auto"
        >
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/images/image1.png"
              alt="Zyra Tech Hub team member working on technology projects"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyGhana;