import React from 'react';
import { Link } from 'react-router-dom';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const AboutQuote = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const quoteAnimation = useScrollAnimation({ type: 'fadeIn', delay: 0.2 });
  const statsAnimation = useScrollAnimation({ type: 'slideUp', delay: 0.4 });

  return (
    <section className="py-12 sm:py-16 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            ref={titleAnimation.ref}
            initial={titleAnimation.initial}
            animate={titleAnimation.animate}
            variants={titleAnimation.variants}
            transition={titleAnimation.transition}
            className="text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 sm:mb-8 text-gray-600"
          >
            ABOUT ZYRATECH
          </motion.h2>
          
          <motion.div
            ref={quoteAnimation.ref}
            initial={quoteAnimation.initial}
            animate={quoteAnimation.animate}
            variants={quoteAnimation.variants}
            transition={quoteAnimation.transition}
            className="relative max-w-4xl mx-auto"
          >
            <Quote className="hidden sm:block absolute -top-4 -left-4 w-8 sm:w-12 h-8 sm:h-12 text-[#004fa2] opacity-50" />
            <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6 sm:mb-8 px-2 sm:px-0">
              Our mission is to lead Ghana’s technological transformation through world-class Software Engineering, robust Infrastructure & Cloud services, and impactful IT Education. 
              We are building an ecosystem where innovation meets academic excellence
            </blockquote>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8 mb-8 sm:mb-12">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden">
              <img
                src="/images/founder.jpg"
                alt="ZyraTech Founder"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face';
                }}
              />
            </div>
            <div className="text-center md:text-left">
              <div className="text-base sm:text-lg font-semibold text-gray-900">ZyraTech Leadership</div>
              <div className="text-sm sm:text-base text-gray-600">Empowering Ghana's Tech Future</div>
            </div>
          </div>

          <motion.div
            ref={statsAnimation.ref}
            initial={statsAnimation.initial}
            animate={statsAnimation.animate}
            variants={statsAnimation.variants}
            transition={statsAnimation.transition}
            className="grid grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#004fa2] mb-1 sm:mb-2">2019</div>
              <div className="text-xs sm:text-base text-gray-600">Founded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#004fa2] mb-1 sm:mb-2">200+</div>
              <div className="text-xs sm:text-base text-gray-600">Trainees</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#004fa2] mb-1 sm:mb-2">3+</div>
              <div className="text-xs sm:text-base text-gray-600">Locations</div>
            </div>
          </motion.div>

          <Link
            to="/about"
            className="inline-block bg-[#004fa2] hover:bg-[#003d7a] text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-colors duration-300 text-sm sm:text-base"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutQuote;
