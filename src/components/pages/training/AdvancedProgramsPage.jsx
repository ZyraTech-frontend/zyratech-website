import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Cpu, Server, Clock, Users, Star, ChevronRight, Target, Award, Network, Rocket, Database } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';
import HrContactSection from '../../common/HrContactSection.jsx';
import { getTrainingCoursesByCategory } from '../../../data/trainingCourses.js';
import TrainingBreadcrumb from './TrainingBreadcrumb';
import useSEO from '../../../hooks/useSEO';

const AdvancedProgramsPage = () => {
  useSEO({
    title: 'Advanced Training Programs',
    description: 'Master cutting-edge technologies with advanced courses in AI, machine learning, and full-stack development at Zyra Tech Hub.'
  });

  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const navigate = useNavigate();
  const _motion = motion;

  const iconMap = {
    globe: Globe,
    cpu: Cpu,
    cloud: Network,
    database: Database,
    server: Server
  };

  const advancedPrograms = getTrainingCoursesByCategory('advanced');

  const benefits = [
    {
      icon: Target,
      title: 'Expert-Level Mastery',
      description: 'Become a recognized expert in cutting-edge technologies and methodologies'
    },
    {
      icon: Rocket,
      title: 'Innovation Leadership',
      description: 'Lead digital transformation initiatives and drive technological innovation'
    },
    {
      icon: Globe,
      title: 'Industry Recognition',
      description: 'Position yourself as a thought leader and technology pioneer'
    }
  ];

  const learningFeatures = [
    {
      icon: Server,
      title: "Research Projects",
      description: "Work on groundbreaking research and innovation initiatives"
    },
    {
      icon: Network,
      title: "Global Network",
      description: "Connect with international experts and industry leaders"
    },
    {
      icon: Target,
      title: "Strategic Thinking",
      description: "Develop high-level strategic and architectural thinking"
    },
    {
      icon: Cpu,
      title: "Cutting-Edge Tech",
      description: "Master the latest technologies and emerging trends"
    }
  ];

  const journeySteps = [
    {
      step: 1,
      icon: Award,
      title: 'Master Expert Concepts',
      description: 'Deepen your understanding of advanced theoretical foundations.',
      detail: 'Deepen your understanding of advanced theoretical foundations.',
      highlight: 'Expert Knowledge',
      position: 'left'
    },
    {
      step: 2,
      icon: Globe,
      title: 'Innovate & Create',
      description: 'Apply advanced concepts to create innovative solutions.',
      detail: 'Apply advanced concepts to create innovative solutions.',
      highlight: 'Innovation Projects',
      position: 'right'
    },
    {
      step: 3,
      icon: Target,
      title: 'Lead Transformation',
      description: 'Drive organizational change and technological transformation.',
      detail: 'Drive organizational change and technological transformation.',
      highlight: 'Leadership Impact',
      position: 'left'
    },
    {
      step: 4,
      icon: Cpu,
      title: 'Become a Pioneer',
      description: 'Establish yourself as a thought leader and industry expert.',
      detail: 'Establish yourself as a thought leader and industry expert.',
      highlight: 'Industry Leadership',
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
                  Master Cutting-Edge
                  <span className="text-[#FFD700] block"> Advanced Programs</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  className="text-base sm:text-lg md:text-xl font-bold text-white mb-10 sm:mb-12 md:mb-14 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  For seasoned professionals ready to pioneer innovation. Lead technological transformation and become an industry expert.
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
                    className="group bg-[#004fa2] hover:bg-[#000000] text-white px-6 py-3 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 inline-flex items-center justify-center gap-3 transform hover:-translate-y-1 w-full sm:w-auto"
                  >
                    Explore Advanced Programs
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
              { label: 'Advanced' }
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
              Advanced Programs
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              For seasoned professionals ready to pioneer innovation. Master cutting-edge technologies and lead digital transformation.
            </p>
          </motion.div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedPrograms.map((program, index) => {
              const IconComponent = iconMap[program.iconKey] || Globe;
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
                        className="bg-[#004fa2] hover:bg-[#003d80] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
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
              Why Choose Our Advanced Programs?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Designed for industry veterans and technology pioneers. Master cutting-edge concepts and lead digital transformation initiatives.
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

export default AdvancedProgramsPage;
