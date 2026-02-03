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
          Our mission is to become a leading catalyst for technological transformation in Ghana.
          We strive to bridge the gap between education and industry, creating a robust ecosystem
          where talent flourishes, businesses thrive, and communities prosper. By prioritizing
          continuous learning and development, we ensure that our workforce remains at the forefront
          of technological advancements, ready to meet the evolving needs of the global market.
          In the coming years, Ghana will be increasingly recognized for its growing tech talent:
          by 2030, Africa will be home to more than 40% of the world's youth (15-24). Ghana's
          growing urbanization is bringing larger shares of the population closer to better
          infrastructure, connectivity, and educational opportunities.
        </motion.div>
      </div>
    </section>
  );
};

export default OurMission;
