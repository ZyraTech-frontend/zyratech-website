import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const CollaborationProcessSection = ({ title = 'Our engagement process', steps = [] }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h3
          className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        >
          {title}
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <motion.div
              key={s.step}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
            >
              <div className="w-10 h-10 rounded-full bg-[#004fa2] text-white flex items-center justify-center font-bold mb-4">
                {s.step}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h4>
              <p className="text-gray-600">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationProcessSection;
