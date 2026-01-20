import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const CommunityImpact = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const quoteAnimation = useScrollAnimation({ type: 'slideUp', delay: 0.1 });
  const attributionAnimation = useScrollAnimation({ type: 'slideUp', delay: 0.2 });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.blockquote
          ref={quoteAnimation.ref}
          initial={quoteAnimation.initial}
          animate={quoteAnimation.animate}
          variants={quoteAnimation.variants}
          transition={quoteAnimation.transition}
          className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic"
        >
          "In 2020, a business moved into the office building across the street. Below the
          company sign 'Zyra Tech Hub', it said, 'Technology Innovation Center'. I didn't
          exactly know what they were doing. But now I know many people who work there.
          They come to shop with me regularly. I expanded my shop area in 2022! I also built
          a storage room for my products. Just look around – the product varieties in the
          assortment have grown quite a bit."
        </motion.blockquote>

        <motion.div
          ref={attributionAnimation.ref}
          initial={attributionAnimation.initial}
          animate={attributionAnimation.animate}
          variants={attributionAnimation.variants}
          transition={attributionAnimation.transition}
          className="text-lg font-semibold text-[#004fa2] mb-2"
        >
          — Akua Mensah
        </motion.div>

        <motion.div
          className="text-gray-600"
        >
          Shop Owner in Koforidua
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityImpact;