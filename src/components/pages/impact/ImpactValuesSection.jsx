import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const ImpactValuesSection = ({
  title = 'Our Values',
  subtitle = 'We have five fundamental beliefs that drive our work, shape our culture, and guide our actions.',
  items = []
}) => {
  const shouldReduceMotion = useReducedMotion();
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const subtitleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0.1 });

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <motion.h2
            ref={titleAnimation.ref}
            initial={titleAnimation.initial}
            animate={titleAnimation.animate}
            variants={titleAnimation.variants}
            transition={titleAnimation.transition}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-6"
          >
            {title}
          </motion.h2>
          {subtitle ? (
            <motion.p
              ref={subtitleAnimation.ref}
              initial={subtitleAnimation.initial}
              animate={subtitleAnimation.animate}
              variants={subtitleAnimation.variants}
              transition={subtitleAnimation.transition}
              className="text-lg text-gray-700 leading-relaxed"
            >
              {subtitle}
            </motion.p>
          ) : null}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const isFeatured = idx === 0;
            return (
              <motion.div
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#004fa2]/25 cursor-pointer ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
              >
                <div className="relative p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-11 w-11 rounded-2xl bg-[#004fa2] text-white flex items-center justify-center font-bold transition-transform duration-200 group-hover:scale-105">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">{item.title}</h3>
                        <div className="mt-2 h-1 w-10 rounded-full bg-[#004fa2]/80" />
                      </div>
                    </div>

                    <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-[#004fa2]/25 bg-white text-gray-900 transition-colors duration-300 group-hover:border-[#004fa2]/60 group-hover:text-[#004fa2]">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>

                  <p className="mt-5 text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactValuesSection;
