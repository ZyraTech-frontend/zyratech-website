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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-6">Our Services</h2>
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
                className="group relative overflow-hidden rounded-xl border border-[#004fa2]/30 bg-[#004fa2] p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:shadow-md cursor-pointer h-full"
              >
                <div className="h-full flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 uppercase tracking-wide">{s.title}</h3>
                  <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed mb-5 text-left">{s.desc}</p>

                  {Array.isArray(s.highlights) && s.highlights.length > 0 && (
                    <div className="w-full mb-6">
                      <div className="text-sm sm:text-base font-semibold text-white mb-2 text-left">Includes:</div>
                      <ul className="space-y-1.5 text-sm text-blue-50/90 leading-relaxed text-left">
                        {s.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-3 text-left">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/90 flex-shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-auto flex justify-center">
                    <Link
                      to="/contact"
                      state={{ from: 'our-services' }}
                      className="inline-flex items-center justify-center border border-white bg-white text-[#004fa2] px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-white/90 text-sm"
                    >
                      Contact us
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
                  className={`group relative overflow-hidden rounded-xl border border-[#004fa2]/30 bg-[#004fa2] p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:shadow-md cursor-pointer h-full ${
                    isSingle ? 'md:col-span-2 md:max-w-[560px] md:mx-auto' : ''
                  }`}
                >
                  <div className="h-full flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-4 uppercase tracking-wide">{s.title}</h3>
                    <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed mb-5 text-left">{s.desc}</p>

                    {Array.isArray(s.highlights) && s.highlights.length > 0 && (
                      <div className="w-full mb-6">
                        <div className="text-sm sm:text-base font-semibold text-white mb-2 text-left">Includes:</div>
                        <ul className="space-y-1.5 text-sm text-blue-50/90 leading-relaxed text-left">
                          {s.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-3 text-left">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/90 flex-shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-auto flex justify-center">
                      <Link
                        to="/contact"
                        state={{ from: 'our-services' }}
                        className="inline-flex items-center justify-center border border-white bg-white text-[#004fa2] px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-white/90 text-sm"
                      >
                        Contact us
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
