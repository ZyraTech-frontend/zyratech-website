import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const SplitTestimonial = () => {
  const anim = useScrollAnimation({ type: 'fadeIn', delay: 0 });
  const imageAnim = useScrollAnimation({ type: 'slideLeft', delay: 0.1 });
  const contentAnim = useScrollAnimation({ type: 'slideRight', delay: 0.15 });

  return (
    <section className="bg-white mb-8 md:mb-12">
      <div className="w-full">
        <motion.div
          ref={anim.ref}
          initial={anim.initial}
          animate={anim.animate}
          variants={anim.variants}
          transition={anim.transition}
          className="w-screen -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden shadow-lg md:flex md:items-stretch"
        >
          {/* Image - on mobile show first */}
          <motion.div
            ref={imageAnim.ref}
            initial={imageAnim.initial}
            animate={imageAnim.animate}
            variants={imageAnim.variants}
            transition={imageAnim.transition}
            className="md:w-1/2 order-1 md:order-2 h-48 md:h-[360px] relative overflow-hidden"
          >
            <img
              src="/images/testimonial.jpg"
              alt="Smiling local shop owner"
              className="w-full h-full object-cover object-center"
              style={{ objectPosition: 'center 30%' }}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#004fa2]/10 to-transparent" />
          </motion.div>

          {/* Content */}
          <motion.div
            ref={contentAnim.ref}
            initial={contentAnim.initial}
            animate={contentAnim.animate}
            variants={contentAnim.variants}
            transition={contentAnim.transition}
            className="md:w-1/2 bg-[#004fa2] text-white px-6 sm:px-8 md:px-12 py-6 md:py-10 flex flex-col justify-center order-2 md:order-1"
          >
            <div className="max-w-xl mx-auto">
              <div className="text-[#5c3a21] text-5xl leading-none font-extrabold mb-3">“</div>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-3">We’re Impacting The Local Economy!</h3>

              <p className="text-white/90 text-base leading-relaxed mb-5">
                "In 2019, a business moved into the office building across the street. Below the company sign 
                “AmaliTech”, it said, “IT Service Company”. I didn’t exactly know what they were doing. But now I 
                know many people who work there. They come to shop with me regularly. I doubled my shop area in 2020! 
                I also built a storage room for my fruit. Just look around – the fruit varieties in the assortment have 
                grown quite a bit."
              </p>

              <div className="flex items-center gap-3">
                <span className="text-[#5c3a21] font-bold">—</span>
                <div>
                  <div className="font-semibold">Theresa</div>
                  <div className="text-sm text-white/80">Foodshop Owner in Takoradi</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SplitTestimonial;
