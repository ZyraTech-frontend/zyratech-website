import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Code, Target, Clock, Users, Star, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';

const BasicProgramsPage = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  const basicPrograms = [
    {
      id: 2,
      title: 'Cloud Computing (AWS/Azure)',
      icon: Cloud,
      duration: '12 weeks',
      level: 'Beginner to Advanced',
      participants: '20-25',
      rating: 4.8,
      reviews: 98,
      price: 'GHS 4,200',
      badge: 'Bestseller',
      instructor: 'Sarah Johnson',
      schedule: 'Weekends 9AM-1PM',
      format: 'Online',
      description: 'Comprehensive cloud training with AWS/Azure certification preparation.',
      topics: ['Cloud Foundations', 'Compute Services', 'Storage', 'Networking', 'Security', 'Certification Prep']
    },
    {
      id: 3,
      title: 'Full Stack Web Development',
      icon: Code,
      duration: '16 weeks',
      level: 'Beginner',
      participants: '18-22',
      rating: 4.7,
      reviews: 156,
      price: 'GHS 3,800',
      instructor: 'David Mensah',
      schedule: 'Weekdays 5PM-7PM',
      format: 'Hybrid',
      description: 'Learn modern web development from frontend to backend with real projects.',
      topics: ['HTML/CSS/JS', 'React', 'Node.js', 'Databases', 'APIs', 'Deployment']
    },
    {
      id: 4,
      title: 'Corporate Digital Transformation',
      icon: Target,
      duration: 'Custom',
      level: 'All Levels',
      participants: 'Custom',
      rating: 5.0,
      reviews: 45,
      price: 'Custom Quote',
      badge: 'Premium',
      instructor: 'Team of Experts',
      schedule: 'Flexible',
      format: 'Onsite/Online',
      description: 'Tailored training programs for corporate digital transformation initiatives.',
      topics: ['Digital Strategy', 'Process Automation', 'Team Training', 'Change Management']
    }
  ];

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
                  Start Your Tech Journey with
                  <span className="text-[#FFD700] block"> Basic Training Programs</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  className="text-sm sm:text-base md:text-lg font-bold text-white mb-6 sm:mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Build your tech foundation from scratch. No prior experience needed. Start your journey to a rewarding career in technology with our comprehensive beginner-friendly programs.
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
                    Explore Basic Programs
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
              Why Choose Our Basic Programs?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Perfect for beginners and those new to technology. Build your foundation with expert-led courses designed to launch your career in tech.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#004fa2] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Experience Required</h3>
              <p className="text-gray-600">Start from scratch with our beginner-friendly approach</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#004fa2] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals with real-world experience</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#004fa2] rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Job-Ready Skills</h3>
              <p className="text-gray-600">Gain practical skills that employers are looking for</p>
            </motion.div>
          </div>
        </div>
      </section>

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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Learning Experience</h3>
            <p className="text-gray-600">We've designed our basic programs with your success in mind. Learn through hands-on projects, expert guidance, and real-world applications.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code,
                title: "Hands-On Projects",
                description: "Build real applications and solve practical problems from day one"
              },
              {
                icon: Users,
                title: "Expert Mentorship",
                description: "Get personalized guidance from industry professionals"
              },
              {
                icon: Star,
                title: "Portfolio Building",
                description: "Create impressive projects to showcase your skills to employers"
              },
              {
                icon: Target,
                title: "Community Support",
                description: "Join a supportive community of fellow learners"
              }
            ].map((feature, index) => (
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
            <h3 className="text-5xl font-black text-yellow-300 mb-8 drop-shadow-lg leading-tight">Your Learning Journey</h3>
            <p className="text-yellow-100 text-xl font-semibold drop-shadow leading-relaxed">From complete beginner to job-ready professional</p>
          </motion.div>

          {/* Vertical Alternating Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* The Spine - Central Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-white/20"></div>
            
            {/* Step 1 - Left of Spine */}
            <div className="relative flex items-center mb-8">
              {/* Node Marker */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-white shadow-md z-10"></div>
              
              {/* Card - Left Side */}
              <div className="w-5/12 pr-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-blue-900 border border-blue-700 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  {/* Light Blue Icon Box - Top Left */}
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center mr-4">
                      <Code className="text-yellow-300" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-white mb-2">1</div>
                      <h4 className="text-lg font-bold text-white mb-2">Start Your Foundation</h4>
                      <p className="text-white/90 text-sm mb-4">Begin with core concepts and fundamental skills. No prior experience needed.</p>
                    </div>
                  </div>
                  <p className="text-white/90 mb-4">Begin with core concepts and fundamental skills. No prior experience needed.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      Basic Concepts
                    </li>
                  </ul>
                </motion.div>
              </div>
              {/* Empty Right Side */}
              <div className="w-5/12 pl-8"></div>
            </div>

            {/* Step 2 - Right of Spine */}
            <div className="relative flex items-center mb-8">
              {/* Empty Left Side */}
              <div className="w-5/12 pr-8"></div>
              
              {/* Card - Right Side */}
              <div className="w-5/12 pl-8">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-blue-900 border border-blue-700 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  {/* Light Blue Icon Box - Top Left */}
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center mr-4">
                      <Target className="text-yellow-300" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-white mb-2">2</div>
                      <h4 className="text-lg font-bold text-white mb-2">Build Practical Skills</h4>
                      <p className="text-white/90 text-sm mb-4">Apply your knowledge through hands-on exercises and real-world projects.</p>
                    </div>
                  </div>
                  <p className="text-white/90 mb-4">Apply your knowledge through hands-on exercises and real-world projects.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      Hands-On Practice
                    </li>
                  </ul>
                </motion.div>
              </div>
              
              {/* Node Marker */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-white shadow-md z-10"></div>
            </div>

            {/* Step 3 - Left of Spine */}
            <div className="relative flex items-center mb-8">
              {/* Node Marker */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-white shadow-md z-10"></div>
              
              {/* Card - Left Side */}
              <div className="w-5/12 pr-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-blue-900 border border-blue-700 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  {/* Light Blue Icon Box - Top Left */}
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center mr-4">
                      <Star className="text-yellow-300" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-white mb-2">3</div>
                      <h4 className="text-lg font-bold text-white mb-2">Create Your Portfolio</h4>
                      <p className="text-white/90 text-sm mb-4">Build impressive projects that showcase your skills to potential employers.</p>
                    </div>
                  </div>
                  <p className="text-white/90 mb-4">Build impressive projects that showcase your skills to potential employers.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      Real Projects
                    </li>
                  </ul>
                </motion.div>
              </div>
              {/* Empty Right Side */}
              <div className="w-5/12 pl-8"></div>
            </div>

            {/* Step 4 - Right of Spine */}
            <div className="relative flex items-center">
              {/* Empty Left Side */}
              <div className="w-5/12 pr-8"></div>
              
              {/* Card - Right Side */}
              <div className="w-5/12 pl-8">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-600 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  {/* Light Blue Icon Box - Top Left */}
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center mr-4">
                      <Users className="text-yellow-300" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-white mb-2">4</div>
                      <h4 className="text-lg font-bold text-white mb-2">Launch Your Career</h4>
                      <p className="text-white/90 text-sm mb-4">Graduate with job-ready skills and confidence to start your tech career.</p>
                    </div>
                  </div>
                  <p className="text-white/90 mb-4">Graduate with job-ready skills and confidence to start your tech career.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      Career Ready
                    </li>
                  </ul>
                </motion.div>
              </div>
              
              {/* Node Marker */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-white shadow-md z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-12 bg-white">
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
              Basic Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Perfect for beginners and those new to technology. Start your tech journey with our foundational programs.
            </p>
          </motion.div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {basicPrograms.map((program, index) => {
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
                          program.badge === 'Bestseller' ? 'bg-green-100 text-green-700' :
                          program.badge === 'Premium' ? 'bg-blue-100 text-blue-700' :
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
    </div>
  );
};

export default BasicProgramsPage;
