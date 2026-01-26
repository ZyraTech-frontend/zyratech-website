import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { services } from '../servicesData';
import { containerVariants, itemVariants } from '../motionVariants';

const ServicesGridSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">Our Services</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our forward-thinking approach and commitment to reliability make us a trusted partner for enhancing your
            business through technology. Explore how ZyraTech Services can transform your operations and propel you
            towards your strategic objectives.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {services.map((s, idx) => {
            const isFeatured = idx === 0;

            return (
              <motion.article
                key={s.title}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-200/80 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#004fa2]/25 cursor-pointer h-full ${
                  isFeatured ? 'lg:col-span-2' : ''
                }`}
              >
                <div className="relative p-4 sm:p-5 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-2xl bg-[#004fa2] text-white flex items-center justify-center text-sm font-bold transition-transform duration-200 group-hover:scale-105 shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 leading-snug">{s.title}</h3>
                        <div className="mt-1.5 h-0.5 w-10 rounded-full bg-[#004fa2]/80" />
                      </div>
                    </div>

                    <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-[#004fa2]/25 bg-white text-gray-900 transition-colors duration-300 group-hover:border-[#004fa2]/60 group-hover:text-[#004fa2] shrink-0">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mt-2.5 flex-1">
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{s.desc}</p>

                    {Array.isArray(s.highlights) && s.highlights.length > 0 && (
                      <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
                        <span className="font-semibold text-gray-900">Includes:</span>{' '}
                        {s.highlights.join(' • ')}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-200/60">
                    <Link
                      to="/contact"
                      state={{ from: 'our-services' }}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#004fa2] hover:text-[#003d7a] transition"
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGridSection;
