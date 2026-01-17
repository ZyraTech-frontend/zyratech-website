import React from 'react';
import { motion } from 'framer-motion';
import { Search, Users, FileText, Calendar, CheckCircle, Play } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';

const TrainingProcess = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  const processSteps = [
    {
      icon: Search,
      title: 'Needs Assessment',
      description: 'We conduct a thorough analysis of your team\'s current skills, business objectives, and training requirements.',
      details: [
        'Skill gap analysis',
        'Business goal alignment',
        'Technical assessment',
        'Learning objectives definition'
      ],
      duration: '1-2 days'
    },
    {
      icon: Users,
      title: 'Custom Program Design',
      description: 'Our experts design a tailored training program that addresses your specific needs and industry challenges.',
      details: [
        'Customized curriculum',
        'Industry-relevant case studies',
        'Hands-on project design',
        'Assessment framework'
      ],
      duration: '3-5 days'
    },
    {
      icon: FileText,
      title: 'Proposal & Planning',
      description: 'Receive a comprehensive proposal with detailed curriculum, schedule, pricing, and expected outcomes.',
      details: [
        'Detailed curriculum outline',
        'Training schedule',
        'Investment breakdown',
        'Success metrics definition'
      ],
      duration: '2-3 days'
    },
    {
      icon: Calendar,
      title: 'Schedule & Logistics',
      description: 'We coordinate all aspects of training delivery including venue, materials, and instructor assignments.',
      details: [
        'Venue setup (onsite/online)',
        'Training materials preparation',
        'Instructor assignment',
        'Technical requirements'
      ],
      duration: '1 week'
    },
    {
      icon: Play,
      title: 'Training Delivery',
      description: 'Engaging, interactive training sessions led by industry experts with real-world experience.',
      details: [
        'Interactive lectures',
        'Hands-on workshops',
        'Real-world projects',
        'Continuous assessment'
      ],
      duration: '6-12 weeks'
    },
    {
      icon: CheckCircle,
      title: 'Evaluation & Support',
      description: 'Post-training assessment, certification, and ongoing support to ensure lasting impact.',
      details: [
        'Skills assessment',
        'Certification delivery',
        'Performance tracking',
        'Ongoing mentorship'
      ],
      duration: 'Ongoing'
    }
  ];

  return (
    <section id="training-process" className="py-16 sm:py-20 bg-gray-50">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">
            How Our Training Works
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            A systematic approach to corporate training that ensures measurable results and lasting impact on your team's performance
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Timeline Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#004fa2]/20"></div>
          
          {/* Timeline Line - Mobile/Tablet */}
          <div className="lg:hidden absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-[#004fa2]/20"></div>
          
          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative lg:grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:text-right'}`}
                >
                  {/* Step Number - Mobile/Tablet */}
                  <div className="lg:hidden absolute left-0 sm:left-2 w-8 h-8 sm:w-10 sm:h-10 bg-[#004fa2] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg z-10">
                    {index + 1}
                  </div>
                  
                  {/* Timeline Dot - Desktop */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#004fa2] rounded-full border-4 border-white shadow-lg"></div>
                  
                  {/* Content */}
                  <div className={`${isEven ? 'lg:pr-12' : 'lg:pl-12 lg:col-start-2'} ml-12 sm:ml-16 lg:ml-0`}>
                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
                      {/* Header */}
                      <div className="flex items-start sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                        <div className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 bg-[#004fa2]/10 rounded-lg sm:rounded-xl items-center justify-center flex-shrink-0">
                          <IconComponent size={18} className="text-[#004fa2] sm:hidden" />
                          <IconComponent size={24} className="text-[#004fa2] hidden sm:block" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm sm:text-lg md:text-xl font-bold text-black leading-tight">{step.title}</h3>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-6 leading-relaxed">{step.description}</p>
                      
                      {/* Details - Compact grid on mobile */}
                      <div className="grid grid-cols-2 gap-1 sm:gap-2 sm:block sm:space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm text-gray-600">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#004fa2] rounded-full flex-shrink-0"></div>
                            <span className="leading-tight">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className={`hidden lg:block ${isEven ? 'lg:col-start-2' : ''}`}></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Process Summary */}
        <motion.div 
          className="mt-10 sm:mt-16 bg-[#004fa2] text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
            <div>
              <div className="text-lg sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">6-12 Weeks</div>
              <div className="text-white/90 text-[10px] sm:text-xs md:text-sm">Average Program Duration</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">100%</div>
              <div className="text-white/90 text-[10px] sm:text-xs md:text-sm">Customized Content</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Lifetime</div>
              <div className="text-white/90 text-[10px] sm:text-xs md:text-sm">Support & Resources</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingProcess;
