import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const CollaborationTestimonialSection = ({ testimonial }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-gradient-to-r from-[#004fa2] to-[#003d7a] text-white py-24">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
      >
        <p className="text-5xl leading-none text-[#004fa2] mb-6">“</p>
        <p className="text-lg sm:text-xl leading-relaxed max-w-4xl mx-auto">{testimonial?.quote}</p>
        <p className="mt-6 text-sm text-white/80">{testimonial?.attribution}</p>
        <p className="text-5xl leading-none text-[#004fa2] mt-6">”</p>
      </motion.div>
    </section>
  );
};

export default CollaborationTestimonialSection;
