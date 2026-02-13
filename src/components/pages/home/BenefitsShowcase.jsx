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

  const [benefitsList, setBenefitsList] = useState([
    {
      icon: ShieldCheck,
      title: 'Low Risk',
      description: 'Commit-as-you-go model, coupled with globally recognized standards'
    },
    {
      icon: Cog,
      title: 'Client-Individual Set Up',
      description: 'Tailored competencies and cooperation models, adapted to your needs'
    },
    {
      icon: TrendingUp,
      title: 'Scalable',
      description: 'Build and grow teams: on-demand and adaptable'
    },
    {
      icon: DollarSign,
      title: 'Cost Efficiency',
      description: 'Commercial models more attractive than traditional off-shore options'
    },
    {
      icon: Users,
      title: 'Seamless Collaboration',
      description: 'Minimal time difference to entire teams with English as their native language'
    },
    {
      icon: Globe,
      title: 'Social Impact',
      description: 'Projects help fund initiatives closing the gender IT gap, coding for kids and our IT training academy'
    }
  ]);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const { data } = await contentService.getAllBenefits();
        if (data && data.length > 0) {
          setBenefitsList(data.map(benefit => ({
            ...benefit,
            icon: ICON_MAP[benefit.icon] || ShieldCheck
          })));
        }
      } catch (error) {
        console.error('Error fetching benefits:', error);
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
          {benefitsList.map((benefit, index) => {
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
          })}
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
