import React, { useState, useEffect, useRef } from 'react';
import { Users, Recycle, Lightbulb, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const ImpactStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({});
  const sectionRef = useRef();
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  const stats = [
    {
      icon: Users,
      number: 500,
      suffix: '+',
      label: 'Students trained',
      color: '#004fa2'
    },
    {
      icon: Recycle,
      number: 10,
      suffix: '+',
      label: 'Partner schools',
      color: '#004fa2'
    },
    {
      icon: Lightbulb,
      number: 350,
      suffix: 'GHS',
      label: 'Affordable internship fee',
      color: '#000000'
    },
    {
      icon: Globe,
      number: 20,
      suffix: '+',
      label: 'Professional projects',
      color: '#004fa2'
    }
  ];

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          startCountingAnimation();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Animated number counting
  const startCountingAnimation = () => {
    stats.forEach((stat, index) => {
      if (stat.number > 0) {
        let start = 0;
        const end = stat.number;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          
          setAnimatedNumbers(prev => ({
            ...prev,
            [index]: Math.floor(start)
          }));
        }, 16);
      }
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-12 bg-white from-gray-100 to-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div 
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-left mb-8"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight mb-4">
            Our Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            We measure success not by numbers, but by transformation. Our achievements in education, internships, and professional services.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div 
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
                className="group relative bg-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)` }}
                ></div>
                
                {/* Content */}
                <div className="flex items-center space-x-2 sm:space-x-3 relative z-10">
                  <div 
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 bg-gray-50 group-hover:bg-gray-100 flex-shrink-0"
                  >
                    <IconComponent 
                      size={20} 
                      className="sm:w-6 sm:h-6"
                      style={{ color: stat.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline space-x-1">
                      <span 
                        className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight"
                        style={{ color: stat.color }}
                      >
                        {stat.placeholder ? stat.placeholder : (isVisible ? (animatedNumbers[index] || 0) : 0)}
                      </span>
                      {!stat.placeholder && (
                        <span 
                          className="text-base sm:text-lg md:text-xl font-bold"
                          style={{ color: stat.color }}
                        >
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm md:text-base font-semibold text-black mt-0.5 sm:mt-1 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Partner CTA */}
        <div className="flex justify-center mt-8">
          <a 
            href="/partner"
            className="bg-white hover:from-[#000000] hover:to-[#000000] text-white font-bold text-base px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-2"
          >
            Support Our Mission
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;


