import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Building, Users } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';

const TrainingSuccess = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  const successStories = [
    {
      id: 1,
      company: 'Tech Innovate Ghana',
      logo: 'TI',
      quote: 'The DevOps training transformed our development process. We reduced deployment time by 60% and improved code quality significantly. The trainers were industry experts who understood our specific challenges.',
      author: 'Michael Osei',
      role: 'CTO',
      project: 'DevOps Engineering Program',
      participants: 12,
      rating: 5,
      results: ['60% faster deployments', '40% reduction in bugs', '100% team certification'],
      image: '/images/training/tech-innovate.jpg'
    },
    {
      id: 2,
      company: 'Bank of Africa',
      logo: 'BA',
      quote: 'Our cybersecurity team is now fully equipped to handle modern threats. The practical approach and real-world scenarios made the training incredibly valuable for our financial institution.',
      author: 'Sarah Mensah',
      role: 'Head of IT Security',
      project: 'Cybersecurity Fundamentals',
      participants: 8,
      rating: 5,
      results: ['Zero security breaches', '100% compliance audit', 'Improved threat detection'],
      image: '/images/training/bank-africa.jpg'
    },
    {
      id: 3,
      company: 'EduTech Solutions',
      logo: 'ES',
      quote: 'The Full Stack Development training enabled our team to build our new learning management system in-house, saving us over $50,000 in development costs.',
      author: 'David Asante',
      role: 'Product Manager',
      project: 'Full Stack Web Development',
      participants: 15,
      rating: 5,
      results: ['$50K cost savings', 'In-house LMS built', '3x faster development'],
      image: '/images/training/edutech.jpg'
    }
  ];

  const metrics = [
    { number: '500+', label: 'Professionals Trained', icon: Users },
    { number: '95%', label: 'Client Satisfaction', icon: Star },
    { number: '50+', label: 'Corporate Clients', icon: Building },
    { number: '4.9/5', label: 'Average Rating', icon: Star }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
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
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how companies across Ghana and West Africa have transformed their teams through our professional training programs
          </p>
        </motion.div>

        {/* Metrics Overview */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                <IconComponent size={24} className="text-[#004fa2] mx-auto mb-3" />
                <div className="text-2xl font-bold text-black mb-1">{metric.number}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Success Stories Grid */}
        <div className="space-y-8">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Story Content */}
                <div className="lg:col-span-2 p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-[#004fa2] text-white rounded-xl flex items-center justify-center font-bold text-xl">
                          {story.logo}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-black">{story.company}</h3>
                          <div className="text-sm text-gray-500">{story.project}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} size={16} className="text-yellow-400 fill-current" />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">({story.rating}.0/5.0)</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">{story.participants} participants</div>
                    </div>
                  </div>
                  
                  <Quote className="w-8 h-8 text-[#004fa2]/20 mb-4" />
                  
                  <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                    "{story.quote}"
                  </blockquote>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold">{story.author.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-black">{story.author}</div>
                      <div className="text-sm text-gray-500">{story.role}</div>
                    </div>
                  </div>
                  
                  {/* Results */}
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-semibold text-black mb-3">Key Results:</h4>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {story.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Story Image */}
                <div className="relative">
                  <img 
                    src={story.image}
                    alt={story.company}
                    loading="lazy"
                    className="w-full h-full object-cover min-h-[400px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-[#004fa2] to-[#2A2D7C] text-white rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Success Stories
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Transform your team and achieve remarkable results. Your success story could be next.
            </p>
            <a 
              href="#training-enrollment"
              className="bg-white text-[#004fa2] hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 inline-flex items-center gap-2"
            >
              Start Your Journey
              <Quote size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingSuccess;
