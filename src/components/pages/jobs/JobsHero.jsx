import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const JobsHero = () => {
  return (
    <section className="relative text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png"
          alt="Careers banner"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src = '/images/image3.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#003d7a]/35 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 min-h-[400px] sm:min-h-[480px] lg:min-h-[520px] flex items-center">
        <div className="max-w-3xl w-full">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight"
          >
            Build Your Career With Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl leading-relaxed"
          >
            Join ZyraTech and be part of a mission to empower innovators and transform communities across Africa through technology and innovation.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default JobsHero;
