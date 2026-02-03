import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const Partners = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const partners = [
    { 
      name: 'UNICEF Startup Labs', 
      logo: 'https://www.unicefstartuplabs.org/content/dam/unicefstartuplabs/logo.png',
      alt: 'UNICEF Startup Labs logo'
    },
    { 
      name: 'MEST Africa', 
      logo: 'https://mest.org.gh/wp-content/uploads/2021/08/MEST-Africa-Logo.png',
      alt: 'MEST Africa logo'
    },
    { 
      name: 'Bloomberg Philanthropies', 
      logo: 'https://www.bloombergphilanthropies.org/content/dam/bloombergphilanthropies/Logo.png',
      alt: 'Bloomberg Philanthropies logo'
    },
    { 
      name: 'F6S', 
      logo: 'https://www.f6s.com/assets/logos/f6s-logo.png',
      alt: 'F6S logo'
    },
    { 
      name: 'Kosmos Innovation Center', 
      logo: 'https://kosmos.org.gh/wp-content/uploads/2021/06/Kosmos-Logo-Final.png',
      alt: 'Kosmos Innovation Center logo'
    },
    { 
      name: 'Adwumawura', 
      logo: 'https://adwumawura.com/wp-content/uploads/2022/01/Adwumawura-Logo.png',
      alt: 'Adwumawura logo'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-12"
        >
          Partners & Recognition
        </motion.h2>
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-xl border border-gray-200 p-8 h-40 flex items-center justify-center hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden">
                <img 
                  src={partner.logo} 
                  alt={partner.alt}
                  className="max-h-24 max-w-full w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                {/* Fallback text */}
                <span 
                  className="text-gray-700 font-semibold text-center text-sm"
                  style={{ display: 'none' }}
                >
                  {partner.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;



