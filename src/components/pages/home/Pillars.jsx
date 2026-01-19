import React from 'react';
import { Monitor, Cpu, Code, Computer, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const Pillars = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  
  const pillars = [
    {
      title: 'Education & Internship',
      description: 'Practical training in coding, robotics, and IT systems with professional mentorship and real-world experience.',
      icon: Monitor,
      color: '#004fa2',
      link: '/training'
    },
    {
      title: 'IT & Networking',
      description: 'LAN/WAN installation, WiFi setup, server deployment, and digital infrastructure solutions.',
      icon: Cpu,
      color: '#004fa2',
      link: '/services/software'
    },
    {
      title: 'Web & Software',
      description: 'Custom websites, management systems, and cloud-based tools for schools and businesses.',
      icon: Code,
      color: '#000000',
      link: '/services/software'
    },
    {
      title: 'Consulting & Support',
      description: 'Digital transformation consulting, system optimization, and ongoing technical support.',
      icon: Computer,
      color: '#004fa2',
      link: '/services/software'
    }
  ];

  return (
    <section className="py-9 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6 tracking-tight"
        >
          Our Core Services
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
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
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div 
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
                className="group bg-white from-white to-gray-50 border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:border-gray-300 hover:from-gray-50 hover:to-gray-100"
              >
                {/* Icon */}
                <div className="mb-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                    style={{ 
                      backgroundColor: `${pillar.color}10`,
                      border: `1px solid ${pillar.color}20`
                    }}
                  >
                    <IconComponent 
                      size={20} 
                      style={{ color: pillar.color }}
                    />
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-base md:text-lg font-bold text-black group-hover:text-gray-700 transition-colors duration-300 mb-2">{pillar.title}</h3>
                
                {/* Description */}
                <p className="text-gray-800 text-sm md:text-base font-medium leading-relaxed mb-4">
                  {pillar.description}
                </p>
                
                {/* Explore Button */}
                <a 
                  href={pillar.link}
                  className="group/btn inline-flex items-center gap-1 font-bold text-base transition-all duration-300 hover:gap-2 text-[#004fa2] hover:text-[#000000]"
                >
                  Explore
                  <ChevronRight 
                    size={14} 
                    className="group-hover/btn:translate-x-0.5 transition-transform duration-300"
                  />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Pillars;


