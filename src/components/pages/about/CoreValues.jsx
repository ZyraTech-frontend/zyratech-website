import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const CoreValues = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  const coreValues = [
    {
      title: "Innovation",
      description: "Driving change through creativity and technology.",
      icon: "💡",
      color: "#004fa2"
    },
    {
      title: "Integrity", 
      description: "Delivering quality with professionalism.",
      icon: "🎯",
      color: "#004fa2"
    },
    {
      title: "Collaboration",
      description: "Building strong partnerships that create impact.",
      icon: "🤝",
      color: "#004fa2"
    },
    {
      title: "Accessibility",
      description: "Making digital learning affordable and inclusive.",
      icon: "🌍",
      color: "#004fa2"
    },
    {
      title: "Impact",
      description: "Turning knowledge into solutions that matter.",
      icon: "🚀",
      color: "#004fa2"
    }
  ];

  return (
    <section id="core-values" className="py-16 bg-gray-50 from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-12 text-center"
        >
          Core Values
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {coreValues.map((value, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg p-8 transition-all duration-300 hover:-translate-y-1 group cursor-pointer text-center"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-black group-hover:text-[#004fa2] mb-4 transition-colors duration-300">{value.title}</h3>
              <p className="text-base text-gray-700 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValues;
