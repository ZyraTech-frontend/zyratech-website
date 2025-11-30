import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const AboutHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const contentAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const imageAnimation = useScrollAnimation({ type: 'slideRight', delay: 0.2 });

  useEffect(() => {
    setIsVisible(true);
  }, []);


  return (
    <section className="pt-4 pb-8 sm:pt-6 sm:pb-10 lg:pt-8 lg:pb-12 bg-white from-white to-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card Container with Border Radius */}
        <div className="p-4 sm:p-6 sm:bg-white sm:rounded-xl sm:border sm:border-gray-200 sm:shadow-sm md:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          
          {/* Left Content - Hero Image */}
          <motion.div 
            ref={imageAnimation.ref}
            initial={imageAnimation.initial}
            animate={imageAnimation.animate}
            variants={imageAnimation.variants}
            transition={imageAnimation.transition}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/images/image1.png" 
                alt="Zyra Tech Hub team collaborating in modern workspace" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </motion.div>
          
          {/* Right Content */}
          <motion.div 
            ref={contentAnimation.ref}
            initial={contentAnimation.initial}
            animate={contentAnimation.animate}
            variants={contentAnimation.variants}
            transition={contentAnimation.transition}
            className="order-1 lg:order-2"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 leading-tight">
              Empowering Ghana's Future Through 
              <span className="text-[#004fa2]"> Technology</span>
            </h1>
            
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              Zyra Tech Hub is a technology and innovation center in Koforidua, Ghana, 
              providing digital training, internships, IT services, and partnerships that 
              empower students, schools, and businesses to thrive in the digital economy.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a 
                href="/contact"
                className="bg-white hover:from-[#000000] hover:to-[#000000] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center justify-center gap-2 text-base w-full sm:w-auto"
              >
                Get In Touch
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="/partner"
                className="border-2 border-[#004fa2] text-[#004fa2] hover:bg-[#004fa2] hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 inline-flex items-center justify-center gap-2 text-base w-full sm:w-auto"
              >
                Partner With Us
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;


