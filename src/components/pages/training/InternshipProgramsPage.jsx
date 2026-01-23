import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Users, Clock, Star, Award, Target, BookOpen, Building, Rocket, Handshake, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';
import HrContactSection from '../../common/HrContactSection.jsx';
import ParallaxDivider from '../../common/ParallaxDivider.jsx';
import { getTrainingCoursesByCategory } from '../../../data/trainingCourses.js';
import TrainingBreadcrumb from './TrainingBreadcrumb';
import useSEO from '../../../hooks/useSEO';

const InternshipProgramsPage = () => {
  useSEO({
    title: 'Immersive Internship Programmes',
    description: 'Gain real-world experience with hands-on internship programs at Zyra Tech Hub. Build your portfolio while learning from industry professionals.'
  });

  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const navigate = useNavigate();
  const _motion = motion;

  const iconMap = {
    bookOpen: BookOpen,
    building: Building,
    rocket: Rocket,
    briefcase: Briefcase,
    target: Target,
    handshake: Handshake
  };

  const internshipPrograms = getTrainingCoursesByCategory('internship');

  const benefits = [
    {
      icon: Handshake,
      title: 'Real Projects',
      description: 'Work on actual client projects and build your portfolio'
    },
    {
      icon: Users,
      title: 'Expert Mentorship',
      description: 'One-on-one guidance from industry professionals'
    },
    {
      icon: Award,
      title: 'Certificate',
      description: 'Industry-recognized certification upon completion'
    },
    {
      icon: Briefcase,
      title: 'Job Placement',
      description: 'Assistance with job placement and career opportunities'
    }
  ];

  const learningFeatures = [
    {
      icon: BookOpen,
      title: "Hands-on Projects",
      description: "Work on real projects from day one"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Learn in a collaborative team environment"
    },
    {
      icon: Target,
      title: "Skill Building",
      description: "Develop practical, job-ready skills"
    },
    {
      icon: Rocket,
      title: "Career Launch",
      description: "Launch your career with confidence"
    }
  ];

  const journeySteps = [
    {
      step: 1,
      icon: BookOpen,
      title: 'Learn Fundamentals',
      description: 'Master the essential skills and concepts needed for your chosen field.',
      detail: 'Master the essential skills and concepts needed for your chosen field.',
      highlight: 'Core Skills',
      position: 'left'
    },
    {
      step: 2,
      icon: Building,
      title: 'Apply Knowledge',
      description: 'Put your learning into practice through real-world projects.',
      detail: 'Put your learning into practice through real-world projects.',
      highlight: 'Practical Experience',
      position: 'right'
    },
    {
      step: 3,
      icon: Users,
      title: 'Build Portfolio',
      description: 'Create a professional portfolio showcasing your work and achievements.',
      detail: 'Create a professional portfolio showcasing your work and achievements.',
      highlight: 'Portfolio Development',
      position: 'left'
    },
    {
      step: 4,
      icon: Briefcase,
      title: 'Launch Career',
      description: 'Transition smoothly into your professional career with confidence.',
      detail: 'Transition smoothly into your professional career with confidence.',
      highlight: 'Career Launch',
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
                  Start Your Career
                  <span className="text-[#FFD700] block"> with Immersive Internships</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  className="text-base sm:text-lg md:text-xl font-bold text-white mb-10 sm:mb-12 md:mb-14 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Gain real-world experience through hands-on projects. Build your portfolio and launch your tech career with expert mentorship.
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
                    Explore Internship Programme
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
              { label: 'Internship' }
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
              Immersive Internship Programme
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Gain real-world experience through hands-on projects. Build your portfolio and launch your tech career with confidence.
            </p>
          </motion.div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internshipPrograms.map((program, index) => {
              const IconComponent = iconMap[program.iconKey] || Briefcase;
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
              Why Choose Our Internship Programme?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Perfect for students and recent graduates. Gain practical experience, build your portfolio, and launch your career with confidence.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#004fa2] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <benefit.icon size={20} className="text-white sm:hidden" />
                  <benefit.icon size={28} className="text-white hidden sm:block" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{benefit.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">{benefit.description}</p>
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

export default InternshipProgramsPage;
