import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const PartnershipHero = () => {
  return (
    <section className="relative text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png"
          alt="Partnership banner"
          className="h-full w-full object-cover object-center brightness-110"
          onError={(e) => {
            e.target.src = '/images/image3.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-[#003d7a]/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 min-h-[450px] sm:min-h-[520px] flex items-center">
        <div className="max-w-3xl w-full">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight whitespace-nowrap"
          >
            Build Africa's Future Together
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/95 max-w-2xl leading-relaxed"
          >
            Partner with ZyraTech to transform communities through technology, innovation, and sustainable impact across Africa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link
              to="/partner/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#004fa2] font-bold rounded-lg px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Become a Partner</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            <Link
              to="/contact"
              state={{ from: 'partnership' }}
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white font-bold rounded-lg px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg hover:bg-white hover:text-[#004fa2] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipHero;