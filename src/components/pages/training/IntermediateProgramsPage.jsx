import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cloud, BarChart3, Server, Clock, Users, Star, ChevronRight, Award, Database, Network, Target } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';
import HrContactSection from '../../common/HrContactSection.jsx';
import ParallaxDivider from '../../common/ParallaxDivider.jsx';
import { getTrainingCoursesByCategory } from '../../../data/trainingCourses.js';
import TrainingBreadcrumb from './TrainingBreadcrumb';
import useSEO from '../../../hooks/useSEO';

const IntermediateProgramsPage = () => {
  useSEO({
    title: 'Intermediate Training Programs',
    description: 'Advance your skills with intermediate-level courses in cloud computing, data analytics, and web development at Zyra Tech Hub.'
  });

  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const navigate = useNavigate();
  const _motion = motion;

  const iconMap = {
    cloud: Cloud,
    barChart: BarChart3,
    server: Server,
    database: Database,
    network: Network
  };

  const intermediatePrograms = getTrainingCoursesByCategory('intermediate');

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
      icon: BarChart3,
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
            className="relative overflow-hidden bg-cover bg-center bg-scroll md:bg-fixed min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen flex items-center"
            style={{
              backgroundImage: 'url(/images/image3.png)'
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative px-4 sm:px-6 md:px-10 lg:px-14 py-16 sm:py-20 md:py-24 lg:py-32 min-h-[500px] md:min-h-[580px] lg:min-h-[680px] flex items-center">
              
              {/* Hero Content */}
              <motion.div 
                className="max-w-3xl pt-8 sm:pt-12 md:pt-16 lg:pt-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Main Heading */}
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 md:mb-10 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  Advance Your Career
                  <span className="text-[#FFD700] block"> with Intermediate Programs</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  className="text-base sm:text-lg md:text-xl font-bold text-white mb-10 sm:mb-12 md:mb-14 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  For experienced professionals ready to specialize and lead. Master advanced concepts and take your technical expertise to the next level.
                </motion.p>

                {/* CTA Button */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <a 
                    href="#programs"
                    className="cta-btn px-6 py-3 rounded-xl text-base sm:text-lg w-full sm:w-auto"
                  >
                    Explore Intermediate Programs
                    <ChevronRight size={18} className="ml-2" />
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
              { label: 'Intermediate' }
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Intermediate Programs
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Perfect for experienced professionals ready to specialize. Advance your career with our comprehensive intermediate programs.
            </p>
          </motion.div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intermediatePrograms.map((program, index) => {
              const IconComponent = iconMap[program.iconKey] || Cloud;
              const placeholderImages = ['/images/image1.png', '/images/image2.png', '/images/image3.png'];
              const imageUrl = placeholderImages[index % placeholderImages.length];
              
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* Image Header */}
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    
                    {/* Content on Image */}
                    <div className="absolute inset-0 p-5 flex flex-col justify-end">
                      {/* Icon + Title */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent size={20} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight">{program.title}</h3>
                      </div>
                      
                      {/* Duration */}
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <Clock size={14} />
                        <span>{program.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">{program.description}</p>
                    
                    {/* Feature Grid 2x2 */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Target size={14} className="text-[#004fa2]" />
                        <span>{program.topics[0] || 'Tech Skills'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Star size={14} className="text-[#004fa2]" />
                        <span>{program.level}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Users size={14} className="text-[#004fa2]" />
                        <span>{program.format || 'Live Classes'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Award size={14} className="text-[#004fa2]" />
                        <span>Certificate</span>
                      </div>
                    </div>
                    
                    {/* Divider */}
                    <div className="border-t border-gray-200 my-4"></div>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500 mb-0.5">Course Fee</div>
                        <div className="text-xl font-bold text-[#004fa2]">{program.price}</div>
                      </div>
                      <button
                        onClick={() => handleEnroll(program.id)}
                        className="cta-btn-sm cta-btn px-5 py-2.5 text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <ParallaxDivider />

      {/* Key Benefits Section */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose Our Intermediate Programs?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Perfect for professionals with foundational knowledge. Build specialized expertise and leadership skills for career advancement.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#004fa2] rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <benefit.icon size={18} className="text-white sm:hidden" />
                  <benefit.icon size={28} className="text-white hidden sm:block" />
                </div>
                <h3 className="text-xs sm:text-base md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{benefit.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-tight">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
