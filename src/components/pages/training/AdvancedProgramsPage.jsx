import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Cpu, Brain, Clock, Users, Star, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';

const AdvancedProgramsPage = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  const advancedPrograms = [
    {
      id: 6,
      title: 'Cloud Architecture',
      icon: Globe,
      duration: '8 weeks',
      level: 'Advanced',
      participants: '10-15',
      rating: 4.8,
      price: 'GHS 4,200',
      originalPrice: 'GHS 5,200',
      description: 'Design and implement scalable cloud solutions on AWS, Azure, and Google Cloud.',
      topics: ['Cloud Design Patterns', 'Microservices', 'Serverless Architecture', 'Cloud Migration', 'Cost Optimization'],
      outcomes: ['Cloud solution design', 'Cost management', 'Scalable architecture', 'Multi-cloud strategies'],
      instructor: 'Cloud Architects',
      schedule: 'Weekdays 6PM-8PM',
      format: 'Online',
      certificate: 'Cloud Architect Certificate'
    },
    {
      id: 7,
      title: 'AI & Machine Learning',
      icon: Cpu,
      duration: '12 weeks',
      level: 'Advanced',
      participants: '10-12',
      rating: 4.9,
      price: 'GHS 5,500',
      originalPrice: 'GHS 6,500',
      badge: 'Premium',
      description: 'Deep dive into artificial intelligence, neural networks, and cutting-edge ML techniques.',
      topics: ['Deep Learning', 'Neural Networks', 'NLP & Computer Vision', 'ML Operations', 'AI Ethics'],
      outcomes: ['Build AI models', 'ML deployment', 'AI strategy development', 'Ethical AI implementation'],
      instructor: 'AI Research Team',
      schedule: 'Saturdays 9AM-1PM',
      format: 'Hybrid',
      certificate: 'AI Engineer Certificate'
    }
  ];

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Advanced Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            For experienced professionals ready to master cutting-edge technologies. Lead innovation with our expert-level programs.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advancedPrograms.map((program, index) => {
            const IconComponent = program.icon;
            
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Program Header */}
                <div className="p-6 border-b border-gray-100">
                  {/* Badge */}
                  {program.badge && (
                    <div className="inline-block mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        program.badge === 'Premium' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {program.badge}
                      </span>
                    </div>
                  )}
                  
                  {/* Program Title and Icon */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#004fa2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{program.title}</h3>
                      <p className="text-sm text-gray-600">{program.instructor}</p>
                    </div>
                  </div>
                  
                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={i < Math.floor(program.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                          size={16}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{program.rating}</span>
                    <span className="text-sm text-gray-500">({program.reviews} reviews)</span>
                  </div>
                  
                  {/* Program Description */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{program.description}</p>
                  
                  {/* Program Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{program.participants}</span>
                    </div>
                  </div>
                </div>

                {/* Program Footer */}
                <div className="p-6 bg-gray-50">
                  {/* Level and Format */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-1 bg-[#004fa2]/10 text-[#004fa2] rounded text-xs font-medium">
                      {program.level}
                    </span>
                    <span className="text-xs text-gray-500">{program.format}</span>
                  </div>
                  
                  {/* Topics Preview */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {program.topics.slice(0, 3).map((topic, topicIndex) => (
                        <span key={topicIndex} className="text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">
                          {topic}
                        </span>
                      ))}
                    </div>
                    {program.topics.length > 3 && (
                      <div className="text-xs text-gray-500 mt-1">+{program.topics.length - 3} more topics</div>
                    )}
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      {program.originalPrice && (
                        <div className="text-xs text-gray-400 line-through">{program.originalPrice}</div>
                      )}
                      <div className="text-lg font-bold text-[#004fa2]">{program.price}</div>
                    </div>
                    <button 
                      onClick={() => window.location.href = `/training/course/${program.id}`}
                      className="bg-[#004fa2] hover:bg-[#2A2D7C] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      View Program
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdvancedProgramsPage;
