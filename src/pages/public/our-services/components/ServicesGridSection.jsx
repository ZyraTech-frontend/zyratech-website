import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { services } from '../servicesData';
import { containerVariants, itemVariants } from '../motionVariants';

const ServicesGridSection = () => {
  const topServices = services.slice(0, 6);
  const bottomServices = services.slice(6);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">Our Services</h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
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
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {topServices.map((s, idx) => {
            return (
              <motion.article
                key={s.title}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#004fa2]/30 hover:shadow-md cursor-pointer h-full"
              >
                <div className="h-full flex flex-col items-center">
                  <div className="text-sm font-bold text-gray-600 mb-4">{String(idx + 1).padStart(2, '0')}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 uppercase tracking-wide">{s.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">{s.desc}</p>

                  {Array.isArray(s.highlights) && s.highlights.length > 0 && (
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-8">
                      <span className="font-semibold text-gray-900">Includes:</span>{' '}
                      {s.highlights.join(' • ')}
                    </p>
                  )}

                  <div className="mt-auto">
                    <Link
                      to="/contact"
                      state={{ from: 'our-services' }}
                      className="inline-flex items-center justify-center border border-[#004fa2]/60 text-[#004fa2] px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-[#004fa2] hover:text-white text-sm"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {bottomServices.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
          >
            {bottomServices.map((s, idx) => {
              const globalIndex = topServices.length + idx;
              const isSingle = bottomServices.length === 1;

              return (
                <motion.article
                  key={s.title}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className={`group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#004fa2]/30 hover:shadow-md cursor-pointer h-full ${
                    isSingle ? 'md:col-span-2 md:max-w-[560px] md:mx-auto' : ''
                  }`}
                >
                  <div className="h-full flex flex-col items-center">
                    <div className="text-sm font-bold text-gray-600 mb-4">{String(globalIndex + 1).padStart(2, '0')}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 uppercase tracking-wide">{s.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">{s.desc}</p>

                    {Array.isArray(s.highlights) && s.highlights.length > 0 && (
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-8">
                        <span className="font-semibold text-gray-900">Includes:</span>{' '}
                        {s.highlights.join(' • ')}
                      </p>
                    )}

                    <div className="mt-auto">
                      <Link
                        to="/contact"
                        state={{ from: 'our-services' }}
                        className="inline-flex items-center justify-center border border-[#004fa2]/60 text-[#004fa2] px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-[#004fa2] hover:text-white text-sm"
                      >
                        Learn more
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServicesGridSection;
