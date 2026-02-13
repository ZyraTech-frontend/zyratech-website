import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import partnersService from '../../../services/partnersService';

const Partners = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await partnersService.getAllPartnerships();
        // Display active partners. You can also filter by 'featured' if desired.
        const activePartners = response.data.filter(p => p.status === 'active');

        setPartners(activePartners.map(p => ({
          name: p.organization.name,
          logo: p.organization.logo || 'https://via.placeholder.com/150?text=' + p.organization.name.charAt(0),
          alt: `${p.organization.name} logo`
        })));
      } catch (error) {
        console.error('Failed to fetch partners:', error);
      }
    };
    fetchPartners();
  }, []);

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



