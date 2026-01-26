import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { services } from '../servicesData';
import { containerVariants, itemVariants } from '../motionVariants';

const ServicesGridSection = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Our Services</h2>
          <p className="mt-4 text-gray-600 max-w-4xl mx-auto leading-relaxed">
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
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-7"
        >
          {services.map((s) => {
            const Icon = s.icon;

            return (
              <motion.article
                key={s.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="bg-white border border-gray-200/70 rounded-2xl p-7 shadow-sm hover:shadow-lg hover:border-gray-200 transition h-full"
              >
                <div className="flex items-start gap-4 h-full">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#e6f0fb] rounded-xl flex items-center justify-center text-[#004fa2] shrink-0">
                    <Icon size={22} />
                  </div>

                  <div className="flex-1 flex flex-col h-full">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">{s.title}</h3>
                    <div className="mt-2 h-0.5 w-16 bg-[#ff7a00]" />
                    <p className="mt-4 text-gray-600 leading-relaxed">{s.desc}</p>

                    {Array.isArray(s.highlights) && s.highlights.length > 0 && (
                      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
                        {s.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#004fa2]" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-6 mt-auto pt-2">
                      <Link
                        to="/contact"
                        state={{ from: 'our-services' }}
                        className="inline-flex items-center gap-2 font-semibold text-[#004fa2] hover:text-[#003d7a] transition"
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
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
