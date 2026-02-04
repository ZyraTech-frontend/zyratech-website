import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const TrainingTestimonial = () => {
  const anim = useScrollAnimation({ type: 'fadeIn', delay: 0 });
  const imageAnim = useScrollAnimation({ type: 'slideRight', delay: 0.1 });
  const contentAnim = useScrollAnimation({ type: 'slideLeft', delay: 0.15 });

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
          {/* Image */}
          <motion.div
            ref={imageAnim.ref}
            initial={imageAnim.initial}
            animate={imageAnim.animate}
            variants={imageAnim.variants}
            transition={imageAnim.transition}
            className="md:w-1/2 h-48 md:h-[360px] relative overflow-hidden"
          >
            <img
              src="/images/student-success.jpg"
              alt="Kwame Asante - Full Stack Developer"
              className="w-full h-full object-cover object-center"
              style={{ objectPosition: 'center 30%' }}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#004fa2]/10 to-transparent" />
          </motion.div>

          {/* Content */}
          <motion.div
            ref={contentAnim.ref}
            initial={contentAnim.initial}
            animate={contentAnim.animate}
            variants={contentAnim.variants}
            transition={contentAnim.transition}
            className="md:w-1/2 bg-[#004fa2] text-white px-6 sm:px-8 md:px-12 py-6 md:py-10 flex flex-col justify-center"
          >
            <div className="max-w-xl mx-auto">
              <div className="text-white/30 text-6xl leading-none font-extrabold mb-3">"</div>
              <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Transforming Careers Through Training</h3>

              <p className="text-white/90 text-base leading-relaxed mb-5">
                "My journey at ZyraTech transformed my career completely. In just six months, I developed my skills in 
                software development and was offered a position as a Full Stack Developer. The training and mentorship 
                I received was exceptional."
              </p>

              <div className="flex items-center gap-3">
                <span className="text-white/70 font-bold text-xl">—</span>
                <div>
                  <div className="font-semibold text-base">Kwame Asante</div>
                  <div className="text-sm text-white/80">Full Stack Development Programme</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingTestimonial;
