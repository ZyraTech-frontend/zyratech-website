import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const WorkWithUsHeroSection = ({ title, subtitle, description, image }) => {
  return (
    <section className="relative text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={image || "/images/work-with-us-hero.jpg"}
          alt="Work with us"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#003d7a]/35 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 min-h-[450px] sm:min-h-[520px] flex items-center">
        <div className="max-w-3xl w-full">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
          >
            {title || "Work With Us"}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.03 }}
              className="text-xl sm:text-2xl font-medium text-blue-200 mt-2"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed"
          >
            {description || "Join a team building impactful technology solutions across African, European and US markets."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
          >
            <Link
              to="/training"
              className="cta-btn rounded-xl px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base md:text-lg transform hover:-translate-y-0.5"
            >
              View Training
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/contact"
              className="cta-ghost rounded-xl px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base md:text-lg transform hover:-translate-y-0.5"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorkWithUsHeroSection;
