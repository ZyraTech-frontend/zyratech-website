import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Clock, Star, Award, Target, BookOpen, Briefcase, GraduationCap, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';
import HrContactSection from '../../common/HrContactSection.jsx';
import { getTrainingCoursesByCategory } from '../../../data/trainingCourses.js';
import TrainingBreadcrumb from './TrainingBreadcrumb';
import useSEO from '../../../hooks/useSEO';

const MaturedProgramsPage = () => {
  useSEO({
    title: 'Matured Learner Programs',
    description: 'Specialized tech training for working professionals and adults. Flexible schedules and practical skills for career advancement at Zyra Tech Hub.'
  });

  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const navigate = useNavigate();
  const _motion = motion;

  const iconMap = {
    bookOpen: BookOpen,
    target: Target,
    briefcase: Briefcase
  };

  const maturedPrograms = getTrainingCoursesByCategory('matured');

  const benefits = [
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Weekend and evening classes designed for working professionals'
    },
    {
      icon: Users,
      title: 'Peer Learning',
      description: 'Learn with professionals at similar career stages'
    },
    {
      icon: GraduationCap,
      title: 'Career Support',
      description: 'Resume building, interview prep, and job placement assistance'
    },
    {
      icon: Award,
      title: 'Recognized Certification',
      description: 'Industry-recognized certificates to boost your career'
    }
  ];

  const learningFeatures = [
    {
      icon: BookOpen,
      title: "Self-Paced Learning",
      description: "Learn at your own pace with flexible schedules"
    },
    {
      icon: Users,
      title: "Peer Support",
      description: "Connect with professionals at similar career stages"
    },
    {
      icon: Target,
      title: "Practical Skills",
      description: "Focus on job-ready, practical skills"
    },
    {
      icon: Briefcase,
      title: "Career Guidance",
      description: "Personalized career coaching and support"
    }
  ];

  const journeySteps = [
    {
      step: 1,
      icon: BookOpen,
      title: 'Build Foundation',
      description: 'Start with the basics and build a strong foundation in your chosen field.',
      detail: 'Start with the basics and build a strong foundation in your chosen field.',
      highlight: 'Fundamental Skills',
      position: 'left'
    },
    {
      step: 2,
      icon: Target,
      title: 'Develop Competence',
      description: 'Gain confidence and competence through practical exercises and projects.',
      detail: 'Gain confidence and competence through practical exercises and projects.',
      highlight: 'Skill Development',
      position: 'right'
    },
    {
      step: 3,
      icon: Users,
      title: 'Network & Connect',
      description: 'Build professional networks and connect with industry peers.',
      detail: 'Build professional networks and connect with industry peers.',
      highlight: 'Professional Network',
      position: 'left'
    },
    {
      step: 4,
      icon: Briefcase,
      title: 'Transition Successfully',
      description: 'Make a successful career transition with confidence and support.',
      detail: 'Make a successful career transition with confidence and support.',
      highlight: 'Career Transition',
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
                  Transform Your Career with
                  <span className="text-[#FFD700] block"> Matured Professionals Program</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  className="text-sm sm:text-base md:text-lg font-bold text-white mb-6 sm:mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Designed specifically for mature professionals and career changers. Learn at your pace with flexible schedules and personalized support.
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
                    Explore Matured Programme
                    <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </a>
                  <Link 
                    to="/training/programs"
                    className="group bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 backdrop-blur-sm inline-flex items-center justify-center gap-3 w-full sm:w-auto"
                  >
                    View All Programs
                    <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-12 bg-white" id="programs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrainingBreadcrumb
            className="mb-8"
            items={[
              { label: 'Programs', link: '/training/programs' },
              { label: 'Matured' }
            ]}
          />
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

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maturedPrograms.map((program, index) => {
              const IconComponent = iconMap[program.iconKey] || Users;
              
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
              Why Choose Our Matured Professionals Program?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Designed for mature professionals and career changers. Enjoy flexible learning, peer support, and personalized career guidance.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
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


      {import.meta.env.DEV && (
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
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Learning Experience</h3>
                <p className="text-gray-600">Our matured professionals program offers flexible learning schedules, peer support, and personalized career guidance to ensure your success.</p>
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
                <h3 className="text-5xl font-black text-yellow-300 mb-8 drop-shadow-lg leading-tight">Your Career Journey</h3>
                <p className="text-yellow-100 text-xl font-semibold drop-shadow leading-relaxed">From foundation building to successful career transition</p>
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

export default MaturedProgramsPage;
