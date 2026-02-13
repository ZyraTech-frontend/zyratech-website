import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, Award, Clock, Shield } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';

const TrainingBenefits = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  const benefits = [
    {
      title: 'Increased Productivity',
      description: 'Boost team efficiency by 40% with practical, hands-on training that directly applies to your business challenges.',
      color: '#004fa2'
    },
    {
      title: 'Team Cohesion',
      description: 'Build stronger, more collaborative teams through shared learning experiences and common technical foundations.',
      color: '#004fa2'
    },
    {
      title: 'Goal Alignment',
      description: 'Align technical skills with business objectives to ensure training delivers measurable ROI and strategic value.',
      color: '#004fa2'
    },
    {
      title: 'Industry Recognition',
      description: 'Gain recognized certifications and credentials that enhance your company\'s reputation and employee career paths.',
      color: '#004fa2'
    },
    {
      title: 'Flexible Scheduling',
      description: 'Training programs designed around your business needs with flexible timing, location, and delivery formats.',
      color: '#004fa2'
    },
    {
      title: 'Future-Proof Skills',
      description: 'Stay ahead of technology trends with cutting-edge training in emerging technologies and best practices.',
      color: '#004fa2'
    }
  ];

  return (
    <section id="training-benefits" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-6">
            Transform Your Workforce
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our training programs deliver measurable business results through skill development, team building, and technological advancement
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#004fa2]/20 transition-all duration-300 hover:-translate-y-1 h-full relative overflow-hidden group-hover:bg-slate-50/50">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#004fa2]/5 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#004fa2] text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-[#004fa2]/20 shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors">{benefit.title}</h3>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-base">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Full-width Call to Action */}
      <motion.div
        className="w-full mt-16 sm:mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="bg-[#004fa2] text-white p-16 sm:p-20 md:p-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6">
              Ready to Transform Your Team?
            </h3>
            <p className="text-white/90 mb-10 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed">
              Join hundreds of companies that have elevated their teams through our professional training programs. Start your transformation journey today.
            </p>
            <Link
              to="/training/programs"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#004fa2] hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Get Started Now
              <TrendingUp size={22} />
            </Link>
          </div>
        </div>
      </motion.div>

    </section>
  );
};

export default TrainingBenefits;
