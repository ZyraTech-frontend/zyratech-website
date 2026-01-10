import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Star, Award, Target, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';

const MaturedProgramsPage = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  const maturedPrograms = [
    {
      id: 8,
      title: 'IT Fundamentals for Professionals',
      icon: BookOpen,
      duration: '6 weeks',
      level: 'Beginner Friendly',
      participants: '15-20',
      rating: 4.7,
      reviews: 89,
      price: 'GHS 2,800',
      badge: 'Popular',
      instructor: 'Senior IT Team',
      schedule: 'Weekends 2PM-5PM',
      format: 'Flexible',
      description: 'Designed specifically for mature professionals looking to transition into IT careers with comprehensive foundational training.',
      topics: ['Computer Basics', 'Internet & Email', 'Office Software', 'Digital Security', 'IT Career Paths', 'Professional Skills']
    },
    {
      id: 9,
      title: 'Digital Literacy & Office Automation',
      icon: Target,
      duration: '4 weeks',
      level: 'All Levels',
      participants: '20-25',
      rating: 4.6,
      reviews: 67,
      price: 'GHS 1,800',
      instructor: 'Office Skills Team',
      schedule: 'Weekdays 5PM-7PM',
      format: 'Hybrid',
      description: 'Perfect for professionals wanting to enhance their digital skills and improve workplace productivity through technology.',
      topics: ['Microsoft Office', 'Google Workspace', 'Digital Communication', 'Data Management', 'Presentation Skills', 'Time Management Tools']
    },
    {
      id: 10,
      title: 'Career Transition to Tech Program',
      icon: Briefcase,
      duration: '12 weeks',
      level: 'Career Changers',
      participants: '12-15',
      rating: 4.8,
      reviews: 102,
      price: 'GHS 4,500',
      badge: 'Premium',
      instructor: 'Career Development Team',
      schedule: 'Flexible Schedule',
      format: 'Online + Mentorship',
      description: 'Comprehensive program designed for professionals from other fields looking to successfully transition into technology careers.',
      topics: ['Tech Industry Overview', 'Skill Assessment', 'Career Planning', 'Portfolio Building', 'Interview Preparation', 'Networking Skills']
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
            Matured Professionals Program
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Designed specifically for mature professionals and career changers. Learn at your pace with flexible schedules and personalized support.
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <div className="w-12 h-12 bg-[#004fa2] rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock size={24} className="text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Flexible Schedule</h3>
            <p className="text-sm text-gray-600">Weekend and evening classes designed for working professionals</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <div className="w-12 h-12 bg-[#004fa2] rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users size={24} className="text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Peer Learning</h3>
            <p className="text-sm text-gray-600">Learn with professionals at similar career stages</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <div className="w-12 h-12 bg-[#004fa2] rounded-lg flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={24} className="text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Career Support</h3>
            <p className="text-sm text-gray-600">Resume building, interview prep, and job placement assistance</p>
          </div>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {maturedPrograms.map((program, index) => {
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
                        program.badge === 'Popular' ? 'bg-orange-100 text-orange-700' :
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

export default MaturedProgramsPage;
