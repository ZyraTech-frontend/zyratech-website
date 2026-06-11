import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import contentService from '../../../services/contentService';

const PartnershipHero = () => {
  const [heroData, setHeroData] = useState({
    title: "",
    subtitle: "",
    backgroundImage: "/images/patner.jpg"
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const { data } = await contentService.getPartnershipHero();
        if (data && data.title) setHeroData(data);
      } catch (error) {
        console.error("Error fetching partnership hero:", error);
      }
    };
    fetchHero();
  }, []);

  return (
    <section className="relative text-white overflow-hidden">
      <div className="absolute inset-0">
        {heroData.backgroundImage && (
          <img decoding="async"
            src={heroData.backgroundImage}
            alt="Partnership banner"
            className="h-full w-full object-cover object-center brightness-110"
            onError={(e) => {
              e.target.src = "/images/patner.jpg";
            }}
          />
        )}
        {/* Consistent Gradient from left to dark */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-24 md:py-32 h-[75vh] min-h-[500px] max-h-[700px] flex items-center justify-start">
        {heroData.title && (
          <motion.div 
            className="max-w-5xl w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 tracking-tight text-white"
            >
              {heroData.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
              className="text-base md:text-lg lg:text-xl font-normal text-gray-200 mb-8 leading-relaxed max-w-2xl"
            >
              {heroData.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6"
            >
              <Link
                to="/partner/apply"
                className="bg-[#004fa2] hover:bg-[#003b7a] text-white px-8 py-3.5 rounded text-base md:text-lg font-medium transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center shadow-lg gap-2"
              >
                <span>Become a Partner</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/contact"
                state={{ from: 'partnership' }}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded text-base md:text-lg font-medium transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center gap-2"
              >
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PartnershipHero;
