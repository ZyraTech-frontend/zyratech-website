import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cloud, BarChart, Target, Clock, Users, Star, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';
import HrContactSection from '../../common/HrContactSection.jsx';

const IntermediateProgramsPage = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const navigate = useNavigate();

  const intermediatePrograms = [
    {
      id: 1,
      title: 'DevOps Engineering',
      icon: Cloud,
      duration: '8 weeks',
      level: 'Intermediate',
      participants: '15-20',
      rating: 4.9,
      reviews: 127,
      price: 'GHS 3,500',
      originalPrice: 'GHS 4,500',
      badge: 'Popular',
      instructor: 'Michael Afedi',
      schedule: 'Weekdays 6PM-8PM',
      format: 'Online + Onsite',
      description: 'Master CI/CD pipelines, containerization, cloud deployment, and infrastructure automation.',
      topics: ['Docker', 'Kubernetes', 'AWS/Azure', 'Jenkins', 'Terraform', 'Monitoring']
    },
    {
      id: 5,
      title: 'Data Science & Analytics',
      icon: BarChart,
      duration: '10 weeks',
      level: 'Intermediate',
      participants: '12-15',
      rating: 4.6,
      reviews: 73,
      price: 'GHS 4,000',
      instructor: 'Dr. Emma Wilson',
      originalPrice: 'GHS 5,800',
      badge: 'Advanced',
      description: 'Transform data into insights with machine learning, statistics, and data visualization.',
      topics: ['Python for Data Science', 'Machine Learning', 'Data Visualization', 'Statistical Analysis', 'Big Data Tools']
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: 'Advanced Specialization',
      description: 'Deep dive into specialized technical areas and become an expert'
    },
    {
      icon: Users,
      title: 'Leadership Skills',
      description: 'Develop the skills needed to lead technical teams and projects'
    },
    {
      icon: Star,
      title: 'Career Acceleration',
      description: 'Position yourself for senior roles and higher responsibilities'
    }
  ];

  const learningFeatures = [
    {
      icon: Cloud,
      title: "Advanced Workshops",
      description: "Intensive hands-on sessions with industry experts and mentors"
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Get personalized guidance from senior professionals"
    },
    {
      icon: Star,
      title: "Capstone Projects",
      description: "Complete comprehensive projects that showcase your expertise"
    },
    {
      icon: Target,
      title: "Industry Integration",
      description: "Connect with industry leaders and work on real-world challenges"
    }
  ];

  const journeySteps = [
    {
      step: 1,
      icon: Cloud,
      title: 'Build Advanced Foundation',
      description: 'Strengthen your core knowledge and prepare for specialization.',
      detail: 'Strengthen your core knowledge and prepare for specialization.',
      highlight: 'Advanced Concepts',
      position: 'left'
    },
    {
      step: 2,
      icon: BarChart,
      title: 'Specialize & Excel',
      description: 'Master advanced techniques in your chosen technical domain.',
      detail: 'Master advanced techniques in your chosen technical domain.',
      highlight: 'Specialized Skills',
      position: 'right'
    },
    {
      step: 3,
      icon: Star,
      title: 'Lead & Innovate',
      description: 'Apply your expertise to solve complex business challenges.',
      detail: 'Apply your expertise to solve complex business challenges.',
      highlight: 'Leadership Projects',
      position: 'left'
    },
    {
      step: 4,
      icon: Users,
      title: 'Transform Your Career',
      description: 'Position yourself for senior roles and industry leadership.',
      detail: 'Position yourself for senior roles and industry leadership.',
      highlight: 'Career Advancement',
      position: 'right',
      isLast: true
    }
  ];

  const handleEnroll = (programId) => {
    navigate(`/training/course/${programId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <div className="max-w-none px-0">
          {/* Full-bleed hero container */}
          <div 
            className="relative overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/image3.png)',
              backgroundAttachment: 'fixed'
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative px-4 sm:px-6 md:px-10 lg:px-14 py-12 sm:py-16 md:py-20 min-h-[400px] md:min-h-[450px] flex items-center">
              
              {/* Hero Content */}
              <motion.div 
                className="max-w-3xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Main Heading */}
                <motion.h1 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  Advance Your Career with
                  <span className="text-[#FFD700] block"> Intermediate Programs</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  className="text-sm sm:text-base md:text-lg font-bold text-white mb-6 sm:mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  For experienced professionals ready to specialize and lead. Master advanced concepts and take your technical expertise to the next level.
                </motion.p>

                {/* CTA Button */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 md:gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <a 
                    href="#programs"
                    className="group bg-[#004fa2] hover:bg-[#000000] text-white px-6 py-3 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 inline-flex items-center justify-center gap-3 transform hover:-translate-y-1 w-full sm:w-auto"
                  >
                    Explore Intermediate Programs
                    <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </a>
                  <a 
                    href="/training/programs"
                    className="group bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 backdrop-blur-sm inline-flex items-center justify-center gap-3 w-full sm:w-auto"
                  >
                    View All Programs
                    <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-12 bg-white" id="programs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={titleAnimation.ref}
            initial={titleAnimation.initial}
            animate={titleAnimation.animate}
            variants={titleAnimation.variants}
            transition={titleAnimation.transition}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Intermediate Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Perfect for experienced professionals ready to specialize. Advance your career with our comprehensive intermediate programs.
            </p>
          </motion.div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intermediatePrograms.map((program, index) => {
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
                          program.badge === 'Advanced' ? 'bg-purple-100 text-purple-700' :
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
                        onClick={() => handleEnroll(program.id)}
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

      {/* Key Benefits Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Intermediate Programs?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Perfect for professionals with foundational knowledge. Build specialized expertise and leadership skills for career advancement.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#004fa2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {false && (
        <>
          {/* Learning Experience Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Advanced Learning Experience</h3>
                <p className="text-gray-600">We've designed our intermediate programs for professionals ready to level up. Master complex concepts through challenging projects and expert mentorship.</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {learningFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-[#004fa2]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="text-[#004fa2]" size={32} />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Learning Journey Section */}
          <section className="py-16 bg-gradient-to-br from-[#004fa2] to-[#2A2D7C]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h3 className="text-5xl font-black text-yellow-300 mb-8 drop-shadow-lg leading-tight">Your Advanced Journey</h3>
                <p className="text-yellow-100 text-xl font-semibold drop-shadow leading-relaxed">From experienced professional to industry expert</p>
              </motion.div>

              {/* Vertical Alternating Timeline */}
              <div className="relative max-w-4xl mx-auto">
                {/* The Spine - Central Vertical Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-white/20"></div>
                
                {journeySteps.map((step) => (
                  <div key={step.step} className="relative flex items-center mb-8">
                    {/* Node Marker */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-white shadow-md z-10"></div>
                    
                    {/* Card - Position based on step.position */}
                    {step.position === 'left' ? (
                      <>
                        {/* Card - Left Side */}
                        <div className="w-5/12 pr-8">
                          <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={`${
                              step.isLast 
                                ? 'bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-600' 
                                : 'bg-blue-900 border border-blue-700'
                            } rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow`}
                          >
                            {/* Light Blue Icon Box - Top Left */}
                            <div className="flex items-start mb-4">
                              <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center mr-4">
                                <step.icon className="text-yellow-300" size={20} />
                              </div>
                              <div className="flex-1">
                                <div className="text-2xl font-bold text-white mb-2">{step.step}</div>
                                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                                <p className="text-white/90 text-sm mb-4">{step.description}</p>
                              </div>
                            </div>
                            <p className="text-white/90 mb-4">{step.detail}</p>
                            <ul className="space-y-2">
                              <li className="flex items-center text-white/80">
                                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                {step.highlight}
                              </li>
                            </ul>
                          </motion.div>
                        </div>
                        {/* Empty Right Side */}
                        <div className="w-5/12 pl-8"></div>
                      </>
                    ) : (
                      <>
                        {/* Empty Left Side */}
                        <div className="w-5/12 pr-8"></div>
                        
                        {/* Card - Right Side */}
                        <div className="w-5/12 pl-8">
                          <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`${
                              step.isLast 
                                ? 'bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-600' 
                                : 'bg-blue-900 border border-blue-700'
                            } rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow`}
                          >
                            {/* Light Blue Icon Box - Top Left */}
                            <div className="flex items-start mb-4">
                              <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center mr-4">
                                <step.icon className="text-yellow-300" size={20} />
                              </div>
                              <div className="flex-1">
                                <div className="text-2xl font-bold text-white mb-2">{step.step}</div>
                                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                                <p className="text-white/90 text-sm mb-4">{step.description}</p>
                              </div>
                            </div>
                            <p className="text-white/90 mb-4">{step.detail}</p>
                            <ul className="space-y-2">
                              <li className="flex items-center text-white/80">
                                <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                {step.highlight}
                              </li>
                            </ul>
                          </motion.div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <HrContactSection
        name="Magdalene"
        title="HR Team Lead"
        imageUrl="/images/Dalene.png"
        email="magdalene@zyratech.com"
      />
    </div>
  );
};

export default IntermediateProgramsPage;
