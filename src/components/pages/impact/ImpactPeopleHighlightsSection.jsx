import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const ImpactPeopleHighlightsSection = ({
  title = 'Voices from Our Community',
  description =
    'Our values come alive through the people who learn with us, build with us, and partner with us.',
  people = []
}) => {
  const isSingle = people.length === 1;
  const shouldReduceMotion = useReducedMotion();
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const descAnimation = useScrollAnimation({ type: 'slideUp', delay: 0.1 });

  return (
    <section className="py-12 bg-[#004fa2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <motion.h2
            ref={titleAnimation.ref}
            initial={titleAnimation.initial}
            animate={titleAnimation.animate}
            variants={titleAnimation.variants}
            transition={titleAnimation.transition}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6"
          >
            {title}
          </motion.h2>
          <motion.p
            ref={descAnimation.ref}
            initial={descAnimation.initial}
            animate={descAnimation.animate}
            variants={descAnimation.variants}
            transition={descAnimation.transition}
            className="text-lg text-white/90 leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {people.map((person, idx) => {
            const hasQuote = Boolean(person.quote);
            const cardLayoutClass = isSingle ? 'lg:col-start-2' : '';
            const initials = String(person.name || '')
              .trim()
              .split(/\s+/)
              .slice(0, 2)
              .map((part) => part.charAt(0).toUpperCase())
              .join('');

            return (
              <motion.div
                key={`${person.name}-${person.role || ''}`}
                className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#004fa2]/25 cursor-pointer h-full ${cardLayoutClass}`}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
              >
                <div className="relative p-6 sm:p-7 flex flex-col h-full">
                  {hasQuote ? (
                    <>
                      <div className="absolute top-6 right-6 text-6xl text-[#004fa2]/10 font-serif leading-none select-none">
                        “
                      </div>
                      <blockquote className="text-[15px] sm:text-base text-gray-800 leading-relaxed pr-10 line-clamp-5">
                        {person.quote}
                      </blockquote>
                    </>
                  ) : null}

                  <div className={hasQuote ? 'mt-6' : ''}>
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-full bg-[#004fa2] text-white flex items-center justify-center font-bold overflow-hidden transition-transform duration-200 group-hover:scale-105">
                        <span className="relative z-10">{initials || 'ZT'}</span>
                        {person.image ? (
                          <img
                            src={person.image}
                            alt={person.name}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : null}
                      </div>

                      <div>
                        <div className="text-lg font-bold text-gray-900">{person.name}</div>
                        <div className="mt-1 text-sm sm:text-[15px] text-gray-600 leading-snug">
                          {person.role}
                          {person.organization ? `, ${person.organization}` : ''}
                        </div>
                      </div>
                    </div>
                    {person.location ? (
                      <div className="mt-3">
                        <span className="inline-flex text-sm font-semibold text-[#004fa2] bg-[#004fa2]/10 px-3 py-1 rounded-full">
                          {person.location}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactPeopleHighlightsSection;
