import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, Award, Clock, Shield } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';

const TrainingBenefits = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Increased Productivity',
      description: 'Boost team efficiency by 40% with practical, hands-on training that directly applies to your business challenges.',
      color: '#004fa2'
    },
    {
      icon: Users,
      title: 'Team Cohesion',
      description: 'Build stronger, more collaborative teams through shared learning experiences and common technical foundations.',
      color: '#004fa2'
    },
    {
      icon: Target,
      title: 'Goal Alignment',
      description: 'Align technical skills with business objectives to ensure training delivers measurable ROI and strategic value.',
      color: '#004fa2'
    },
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'Gain recognized certifications and credentials that enhance your company\'s reputation and employee career paths.',
      color: '#004fa2'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Training programs designed around your business needs with flexible timing, location, and delivery formats.',
      color: '#004fa2'
    },
    {
      icon: Shield,
      title: 'Future-Proof Skills',
      description: 'Stay ahead of technology trends with cutting-edge training in emerging technologies and best practices.',
      color: '#004fa2'
    }
  ];

  const stats = [
    { number: '40%', label: 'Productivity Increase' },
    { number: '95%', label: 'Satisfaction Rate' },
    { number: '3x', label: 'ROI on Training' },
    { number: '85%', label: 'Skill Retention' }
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
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Transform Your Workforce
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our training programs deliver measurable business results through skill development, team building, and technological advancement
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div 
          className="bg-gradient-to-r from-[#004fa2] to-[#2A2D7C] rounded-2xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/90 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gray-50 rounded-2xl p-8 h-full border border-gray-200 hover:border-[#004fa2] hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-[#004fa2]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#004fa2] transition-colors duration-300">
                    <IconComponent size={32} className="text-[#004fa2] group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-black mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-[#004fa2] text-white rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Team?
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of companies that have elevated their teams through our professional training programs. Start your transformation journey today.
            </p>
            <a 
              href="/training/programs"
              className="bg-white text-[#004fa2] hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 inline-flex items-center gap-2"
            >
              Get Started Now
              <TrendingUp size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingBenefits;
