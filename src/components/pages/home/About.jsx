import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const About = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const contentAnimation = useScrollAnimation({ type: 'slideUp', delay: 0.1 });
  const imageAnimation = useScrollAnimation({ type: 'slideRight', delay: 0.2 });

  return (
    <section className="py-20 bg-white from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with title and Read More link */}
        <motion.div 
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="flex justify-between items-center mb-2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-tight">About Zyra Tech Hub</h2>
          <a 
            href="/about" 
            className="hidden sm:inline-flex text-[#004fa2] hover:text-[#000000] font-semibold items-center gap-1 transition-colors text-base underline hover:no-underline whitespace-nowrap"
          >
            Read More
            <ChevronRight size={18} />
          </a>
        </motion.div>
        
        {/* Content - Two Column Layout */}
        <motion.div 
          ref={contentAnimation.ref}
          initial={contentAnimation.initial}
          animate={contentAnimation.animate}
          variants={contentAnimation.variants}
          transition={contentAnimation.transition}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          {/* Image */}
          <motion.div 
            ref={imageAnimation.ref}
            initial={imageAnimation.initial}
            animate={imageAnimation.animate}
            variants={imageAnimation.variants}
            transition={imageAnimation.transition}
            className="relative rounded-lg shadow-lg overflow-hidden order-2 lg:order-1 h-48 md:h-64"
          >
            <img 
              src="/images/image1.png" 
              alt="Zyra Tech Hub" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <p className="text-xl text-gray-800 leading-relaxed font-medium">
              Founded in Koforidua, Ghana, Zyra Tech Hub bridges the gap between classroom learning and real-world skills. 
              We equip learners with hands-on experience in programming, robotics, and IT while supporting institutions and businesses 
              with professional digital services. Our dual model empowers both students and organizations, creating a win-win ecosystem of learning and innovation.
            </p>
            
            {/* Mobile Read More Button */}
            <a 
              href="/about" 
              className="sm:hidden mt-4 inline-flex items-center gap-1 text-[#004fa2] hover:text-[#000000] font-semibold text-base transition-colors"
            >
              Read More
              <ChevronRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;


