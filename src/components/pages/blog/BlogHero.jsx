import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const BlogHero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden">
      <div className="max-w-none px-0">
        <div
          className="relative overflow-hidden h-[70vh] min-h-[520px] max-h-[780px] bg-cover bg-center bg-scroll md:bg-fixed"
          style={{
            backgroundImage: `url(/images/image1.png)`
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Content */}
          <div className="relative px-4 sm:px-6 md:px-10 lg:px-14 py-16 sm:py-20 md:py-24 lg:py-28 h-full flex items-center">
            <motion.div
              className="max-w-4xl"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-0 leading-tight">
                Insights & Stories
                <span className="text-[#004fa2] block">from ZyraTech</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg md:text-xl font-semibold text-white/90 leading-relaxed max-w-3xl">
                Explore our journey in tech education, innovation, and community impact through articles, project showcases, and success stories.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
