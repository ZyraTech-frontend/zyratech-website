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
        <motion.div
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">Why We Chose Ghana</h2>
          <p className="text-gray-700 mb-4">Ghana's rapid urbanization is concentrating populations around improved infrastructure, digital connectivity and education, creating strong conditions for skills development and technology-driven economic growth.</p>
          <Link to="/impact" className="inline-flex items-center text-[#004fa2] hover:text-[#003d7a] font-semibold transition-colors">
            Learn More About Our Impact
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          ref={contentAnimation.ref}
          initial={contentAnimation.initial}
          animate={contentAnimation.animate}
          variants={contentAnimation.variants}
          transition={contentAnimation.transition}
          className="mb-12"
        >
          <p className="text-lg text-gray-700 leading-relaxed">
            We design programs that meet local market needs, partner with businesses to co-create training, and support startups with mentorship and seed funding.
          </p>
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
              alt="ZyraTech team member working on technology projects in Ghana"
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
