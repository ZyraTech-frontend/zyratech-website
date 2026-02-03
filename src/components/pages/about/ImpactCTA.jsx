import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';

const ImpactCTA = () => {
  const anim = useScrollAnimation({ type: 'fadeIn', delay: 0 });

  return (
    <section className="relative bg-[#004fa2] py-12 sm:py-14 overflow-hidden mt-6 sm:mt-10">
      {/* faint pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 800 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#004fa2" />
            <stop offset="100%" stopColor="#004fa2" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="#ffffff" strokeOpacity="0.03" strokeWidth="1">
          <circle cx="100" cy="100" r="2" />
          <circle cx="200" cy="150" r="2" />
          <circle cx="350" cy="120" r="2" />
          <circle cx="600" cy="200" r="2" />
          <circle cx="700" cy="80" r="2" />
          <circle cx="500" cy="400" r="2" />
        </g>
      </svg>

      <motion.div
        ref={anim.ref}
        initial={anim.initial}
        animate={anim.animate}
        variants={anim.variants}
        transition={anim.transition}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 max-w-4xl">
            <span className="block">Our Approach Builds The Ecosystem</span>
            <span className="block">And Creates Sustainable Growth In Ghana And Rwanda</span>
          </h2>

          <p className="text-white/90 max-w-[700px] mb-6 text-base sm:text-lg mx-auto text-center">
            We have committed to training 3,000 individuals and providing 1,000 jobs by 2025 as part of the UN Decent Job For Youth Campaign.
          </p>

          <Link
            to="/impact"
            className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-[#004fa2] font-semibold px-6 py-2.5 rounded-md shadow-lg hover:shadow-2xl transform transition-all duration-200 hover:scale-105 mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#004fa2]"
            aria-label="Learn more about our impact"
          >
            Learn More
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default ImpactCTA;
