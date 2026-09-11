import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cloud, BarChart3, Server, Clock, Users, Star, ChevronRight, Award, Database, Network, Target } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';
import HrContactSection from '../../common/HrContactSection.jsx';
import { getTrainingCoursesByCategory } from '../../../data/trainingCourses.js';
import { normalizeImageUrl } from '../../../utils/imageUrl';
import TrainingBreadcrumb from './TrainingBreadcrumb';
import useSEO from '../../../hooks/useSEO';

const IntermediateProgramsPage = () => {
  useSEO({
    title: 'Intermediate Training Programs',
    description: 'Advance your skills with intermediate-level courses in cloud computing, data analytics, and web development at Zyra Tech Hub.',
    url: '/training/programs/intermediate'
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
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            decoding="async"
            src="/images/advance.png"
            alt="Intermediate programs banner"
            className="h-full w-full object-cover brightness-110"
            style={{ objectPosition: 'center 40%' }}
          />
          {/* Consistent Gradient from left to dark */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16 md:py-20 h-[75vh] min-h-[500px] max-h-[700px] flex items-center justify-start">
          <motion.div 
            className="max-w-5xl w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 tracking-tight text-white"
            >
              Advance Your Career
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
              className="text-base md:text-lg lg:text-xl font-normal text-gray-200 mb-8 leading-relaxed max-w-2xl"
            >
              For experienced professionals ready to specialize and lead. Master advanced concepts and take your technical expertise to the next level.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6"
            >
              <a
                href="#programs"
                className="bg-[#004fa2] hover:bg-[#003b7a] text-white px-8 py-3.5 rounded text-base md:text-lg font-medium transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center shadow-lg gap-2"
              >
                <span>Explore Intermediate Programs</span>
                <ChevronRight className="w-5 h-5" />
              </a>

              <Link
                to="/training/programs"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded text-base md:text-lg font-medium transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center gap-2"
              >
                <span>View All Programs</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
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
              const defaultImage = "/images/image1.webp";
              const imageUrl = normalizeImageUrl(program.image || program.heroImage) || defaultImage;

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
                    <img decoding="async"
                      src={imageUrl}
                      alt={program.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (!e.currentTarget.dataset.fallbackTried) {
                          e.currentTarget.dataset.fallbackTried = 'true';
                          e.currentTarget.src = defaultImage;
                        }
                      }}
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4">
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
        imageUrl="/images/Dalene.webp"
        email="magdalene@zyratech.com"
      />
    </div>
  );
};

export default IntermediateProgramsPage;
