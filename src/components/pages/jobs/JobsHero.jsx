import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const JobsHero = () => {
  return (
    <section className="relative text-white overflow-hidden">
      {/* Background Image with Overlays */}
      <div className="absolute inset-0">
        <img 
          decoding="async"
          src="/images/jobb.jpg"
          alt="Careers banner"
          className="h-full w-full object-cover brightness-110"
          style={{ objectPosition: 'center 25%' }}
        />
        {/* Consistent Gradient from left to dark */}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 tracking-tight text-white"
          >
            Build Your Career With Us
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
            className="text-base md:text-lg lg:text-xl font-normal text-gray-200 mb-8 leading-relaxed max-w-2xl"
          >
            Join ZyraTech and be part of a mission to empower innovators and transform communities across Africa through technology and innovation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6"
          >
            <Link
              to="#explore-roles"
              className="bg-[#004fa2] hover:bg-[#003b7a] text-white px-8 py-3.5 rounded text-base md:text-lg font-medium transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center shadow-lg"
            >
              Explore Roles
            </Link>

            <Link
              to="#life-at-zyratech"
              className="bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/70 text-white px-8 py-3.5 rounded text-base md:text-lg font-medium transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center"
            >
              Our Culture
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default JobsHero;
