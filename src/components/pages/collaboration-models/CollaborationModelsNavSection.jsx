import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const CollaborationModelsNavSection = ({ title = 'Our Engagement Models', models = [] }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-gradient-to-r from-[#004fa2] to-[#003d7a] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-10"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map((m, idx) => (
            <motion.button
              key={m.id}
              type="button"
              onClick={() => scrollToId(m.id)}
              className="bg-white/10 text-white border border-white/25 rounded-md py-8 px-6 text-center font-semibold hover:bg-white/20 transition"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
            >
              {m.tab}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationModelsNavSection;
