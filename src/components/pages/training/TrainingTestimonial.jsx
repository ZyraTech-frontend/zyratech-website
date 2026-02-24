import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const TrainingTestimonial = () => {
  const anim = useScrollAnimation({ type: 'fadeIn', delay: 0 });
  const imageAnim = useScrollAnimation({ type: 'slideRight', delay: 0.1 });
  const contentAnim = useScrollAnimation({ type: 'slideLeft', delay: 0.15 });

  return (
    <section className="py-16 bg-[#004fa2] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image with background accent */}
          <motion.div
            ref={imageAnim.ref}
            initial={imageAnim.initial}
            animate={imageAnim.animate}
            variants={imageAnim.variants}
            transition={imageAnim.transition}
            className="relative order-1 lg:order-1"
          >
            <div className="absolute -right-4 -top-4 w-full h-full bg-white/10 rounded-lg border border-white/20"></div>
            <img decoding="async"
              src="/images/trainingtest.png"
              alt="ZyraTech Training Graduate"
              loading="lazy"
              className="relative w-full h-80 md:h-[450px] object-cover rounded-lg shadow-2xl"
              style={{ objectPosition: 'center 20%' }}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200'; }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            ref={contentAnim.ref}
            initial={contentAnim.initial}
            animate={contentAnim.animate}
            variants={contentAnim.variants}
            transition={contentAnim.transition}
            className="order-2 lg:order-2"
          >
            <div className="pl-0 lg:pl-8 text-white">
              <div className="text-white text-6xl leading-none font-extrabold mb-4">"</div>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                Transforming Careers Through Training
              </h3>

              <p className="text-white/90 text-lg leading-relaxed mb-8">
                "My journey at ZyraTech transformed my career completely. In just six months, I developed my skills in
                software development and was offered a position as a Full Stack Developer. The training and mentorship
                I received was exceptional."
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-white"></div>
                <div>
                  <div className="font-bold text-xl">ZyraTech Graduate</div>
                  <div className="text-white/80 font-medium">Full Stack Development Programme</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrainingTestimonial;
