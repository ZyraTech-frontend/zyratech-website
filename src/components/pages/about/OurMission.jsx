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
          Our mission is to drive technological transformation across Ghana by bridging the gap between education and industry.
          We are building a dynamic ecosystem where talent thrives, businesses scale, and communities prosper.
          Through continuous learning and innovation, we equip our workforce with cutting-edge skills to meet
          the evolving demands of the global technology landscape.
          With Africa projected to be home to over 40% of the world's youth population (ages 15-24) by 2030,
          Ghana's rapid urbanization is creating unprecedented opportunities. Improved infrastructure, expanding digital connectivity,
          and enhanced educational access are positioning Ghana as a premier destination for tech talent development.
        </motion.div>
      </div>
    </section>
  );
};

export default OurMission;
