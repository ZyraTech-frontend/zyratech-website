import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';

const TrainingHero = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  return (
    <section className="relative isolate overflow-hidden min-h-screen">
      <div className="max-w-none px-0">
        {/* Full-bleed hero container */}
        <div 
          className="relative overflow-hidden min-h-screen bg-cover bg-center bg-scroll md:bg-fixed"
          style={{
            backgroundImage: 'url(/images/image2.png)'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative px-4 sm:px-6 md:px-10 lg:px-14 py-16 sm:py-20 md:py-24 lg:py-32 min-h-[500px] md:min-h-[580px] lg:min-h-[680px] flex items-center">
            
            {/* Left Content */}
            <motion.div 
              className="max-w-3xl pt-8 sm:pt-12 md:pt-16 lg:pt-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Main Heading */}
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 sm:mb-8 md:mb-10 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Professional Training for
                <span className="text-[#FFD700] block"> Modern Tech Skills</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                className="text-base sm:text-lg md:text-xl font-bold text-white mb-10 sm:mb-12 md:mb-14 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Elevate your team's capabilities with industry-leading training programs in DevOps, Cloud Computing, Web Development, and more. Transform your workforce into tech leaders.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link 
                  to="/training/programs"
                  className="cta-btn px-8 py-4 rounded-xl text-lg w-full sm:w-auto"
                >
                  Explore Programs
                  <ChevronRight size={20} className="ml-2" />
                </Link>
                
                <Link 
                  to="/training/programs"
                  className="cta-ghost px-8 py-4 rounded-xl text-lg w-full sm:w-auto"
                >
                  Get Quote
                  <ChevronRight size={20} className="ml-2" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingHero;
