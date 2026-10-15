import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cog, TrendingUp, DollarSign, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import contentService from '../../../services/contentService';

const ICON_MAP = {
  ShieldCheck,
  Cog,
  TrendingUp,
  DollarSign,
  Users,
  Globe
};

const BenefitsShowcase = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const cardsAnimation = useScrollAnimation({ type: 'fadeIn', delay: 0.2 });

  const [benefitsList, setBenefitsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        setLoading(true);
        // Use public endpoint (no authentication required)
        const response = await contentService.getPublicBenefits();
        // getPublicBenefits already returns array directly
        const benefitsData = Array.isArray(response) ? response : [];
        if (benefitsData && benefitsData.length > 0) {
          setBenefitsList(benefitsData.map(benefit => ({
            ...benefit,
            icon: ICON_MAP[benefit.icon] || ShieldCheck
          })));
        }
      } catch (error) {
        console.error('Error fetching benefits:', error);
        setBenefitsList([]); // Empty array on error, no fallback
      } finally {
        setLoading(false);
      }
    };
    fetchBenefits();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#004fa2] text-white rounded-full text-sm font-medium mb-6">
            Why Choose ZyraTech
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
            Benefits Of Working With Us
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Drive Forward Your Digital Agenda While Creating Social Impact
          </p>
        </motion.div>

        <motion.div
          ref={cardsAnimation.ref}
          initial={cardsAnimation.initial}
          animate={cardsAnimation.animate}
          variants={cardsAnimation.variants}
          transition={cardsAnimation.transition}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {loading ? (
            <div className="col-span-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004fa2]"></div>
            </div>
          ) : benefitsList.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No benefits available</p>
            </div>
          ) : (
            benefitsList.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors">{benefit.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">{benefit.description}</p>
                </div>
              );
            })
          )}
        </motion.div>

        <div className="text-center">
          <Link
            to="/work-with-us"
            className="inline-flex items-center px-8 py-4 bg-[#004fa2] hover:bg-[#003d7a] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Learn More
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BenefitsShowcase;
