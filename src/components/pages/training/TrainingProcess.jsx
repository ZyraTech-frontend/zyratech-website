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
    <section className="py-16 sm:py-20 bg-gray-50">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            How Our Training Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A systematic approach to corporate training that ensures measurable results and lasting impact on your team's performance
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#004fa2]/20"></div>
          
          <div className="space-y-12">
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
                  {/* Timeline Dot */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#004fa2] rounded-full border-4 border-white shadow-lg"></div>
                  
                  {/* Content */}
                  <div className={`${isEven ? 'lg:pr-12' : 'lg:pl-12 lg:col-start-2'}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#004fa2]/10 rounded-xl flex items-center justify-center">
                          <IconComponent size={24} className="text-[#004fa2]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-black">{step.title}</h3>
                          <span className="text-sm text-gray-500">{step.duration}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                      
                      <div className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-[#004fa2] rounded-full flex-shrink-0"></div>
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className={`${isEven ? 'lg:col-start-2' : ''}`}></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Process Summary */}
        <motion.div 
          className="mt-16 bg-[#004fa2] text-white rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">6-12 Weeks</div>
              <div className="text-white/90">Average Program Duration</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-white/90">Customized Content</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Lifetime</div>
              <div className="text-white/90">Support & Resources</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingProcess;
