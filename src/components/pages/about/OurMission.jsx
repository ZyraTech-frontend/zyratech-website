import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const OurMission = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const contentAnimation = useScrollAnimation({ type: 'slideUp', delay: 0.1 });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-6"
        >
          Our Mission
        </motion.h2>

        <motion.div
          ref={contentAnimation.ref}
          initial={contentAnimation.initial}
          animate={contentAnimation.animate}
          variants={contentAnimation.variants}
          transition={contentAnimation.transition}
          className="text-lg text-gray-700 leading-relaxed max-w-4xl"
        >
          Our mission is to drive technological transformation across Ghana by bridging the gap between education and industry through Software Engineering, Cloud Infrastructure, and Academic Research.
        </motion.div>
      </div>
    </section>
  );
};

export default OurMission;
