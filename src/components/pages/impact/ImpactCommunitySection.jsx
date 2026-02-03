import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const ImpactCommunitySection = ({
  title = 'The ZyraTech Community',
  description =
    'The ZyraTech community is a vibrant and diverse network of learners, mentors, educators, and partners dedicated to building practical skills and technology solutions that matter. United by a common goal, we collaborate across different backgrounds and perspectives—working together to create opportunity, strengthen local innovation, and build a more connected future through technology.'
}) => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const contentAnimation = useScrollAnimation({ type: 'slideUp', delay: 0.1 });

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <motion.h2
            ref={titleAnimation.ref}
            initial={titleAnimation.initial}
            animate={titleAnimation.animate}
            variants={titleAnimation.variants}
            transition={titleAnimation.transition}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-6"
          >
            {title}
          </motion.h2>
          <motion.p
            ref={contentAnimation.ref}
            initial={contentAnimation.initial}
            animate={contentAnimation.animate}
            variants={contentAnimation.variants}
            transition={contentAnimation.transition}
            className="text-lg text-gray-700 leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ImpactCommunitySection;
