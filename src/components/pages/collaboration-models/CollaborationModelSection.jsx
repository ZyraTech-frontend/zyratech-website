import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const CollaborationModelSection = ({ model, reverse = false }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id={model?.id} className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <motion.div
          className={reverse ? 'lg:order-2' : ''}
          initial={
            shouldReduceMotion
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: reverse ? 40 : -40 }
          }
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">{model?.title}</h3>
          <ul className="space-y-5 text-gray-600">
            {(model?.bullets || []).map((b) => (
              <li key={b} className="flex items-start gap-4">
                <span className="text-[#004fa2] mt-1">
                  <CheckCircle size={18} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link to="/our-services" className="inline-block bg-[#004fa2] text-white px-8 py-3 font-semibold rounded-sm">
              Our Services
            </Link>
          </div>
        </motion.div>

        <motion.div
          className={reverse ? 'lg:order-1' : ''}
          initial={
            shouldReduceMotion
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: reverse ? -40 : 40 }
          }
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.1 }}
        >
          <div className="relative">
            <img
              src={model?.image}
              alt={model?.title}
              className="w-full h-72 sm:h-80 lg:h-[420px] object-cover"
              onError={(e) => {
                e.currentTarget.src = model?.imageFallback;
              }}
            />
            <div className="absolute top-0 right-0 h-full w-3 bg-[#004fa2]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CollaborationModelSection;
