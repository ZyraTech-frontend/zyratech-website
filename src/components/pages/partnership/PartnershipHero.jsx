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
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src = '/images/image3.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#003d7a]/35 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 min-h-[520px] flex items-center">
        <div className="max-w-3xl w-full">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight whitespace-nowrap"
          >
            Build Africa's Future Together
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="mt-5 text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed"
          >
            Partner with ZyraTech to transform communities through technology, innovation, and sustainable impact across Africa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              to="/partnership/apply"
              className="cta-btn rounded-xl px-8 py-4 text-base sm:text-lg transform hover:-translate-y-0.5"
            >
              Become a Partner
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/contact"
              state={{ from: 'partnership' }}
              className="cta-ghost rounded-xl px-8 py-4 text-base sm:text-lg transform hover:-translate-y-0.5"
            >
              Learn More
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipHero;