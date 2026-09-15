import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Cpu, Server, Clock, Users, Star, ChevronRight, Target, Award, Network, Rocket, Database } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';
import HrContactSection from '../../common/HrContactSection.jsx';
import { getTrainingCoursesByCategory } from '../../../data/trainingCourses.js';
import trainingService from '../../../services/trainingService.js';
import { getCourseImageUrl } from '../../../utils/imageUrl';
import TrainingBreadcrumb from './TrainingBreadcrumb';
import useSEO from '../../../hooks/useSEO';

const AdvancedProgramsPage = () => {
  useSEO({
    title: 'Advanced Training Programs',
    description: 'Master cutting-edge technologies with advanced courses in AI, machine learning, and full-stack development at Zyra Tech Hub.',
    url: '/training/programs/advanced'
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

  const [advancedPrograms, setAdvancedPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadCourses = async () => {
      try {
        const allCourses = await trainingService.getAllCourses();
        if (isMounted) {
          const advancedCourses = Array.isArray(allCourses) 
            ? allCourses.filter(c => (c.category || '').toLowerCase() === 'advanced')
            : [];
          
          if (advancedCourses.length > 0) {
            setAdvancedPrograms(advancedCourses);
          } else {
            console.warn('No advanced courses found from API, using default catalog');
            setAdvancedPrograms(getTrainingCoursesByCategory('advanced'));
          }
        }
      } catch (err) {
        console.warn('Could not fetch courses from API:', err);
        if (isMounted) {
          setAdvancedPrograms(getTrainingCoursesByCategory('advanced'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    loadCourses();
    return () => { isMounted = false; };
  }, []);

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
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            decoding="async"
            src="/images/image3.webp"
            alt="Advanced programs banner"
            className="h-full w-full object-cover object-center brightness-110"
          />
          {/* Consistent Gradient from left to dark */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-24 md:py-32 h-[75vh] min-h-[500px] max-h-[700px] flex items-center justify-start">
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
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 tracking-tight text-white whitespace-nowrap"
            >
              Master Cutting-Edge Technologies
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
              className="text-base md:text-lg lg:text-xl font-normal text-gray-200 mb-8 leading-relaxed max-w-2xl"
            >
              For seasoned professionals ready to pioneer innovation. Lead technological transformation and become an industry expert.
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
                <span>Explore Advanced Programs</span>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
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
              const imageUrl = getCourseImageUrl(program) || program.heroImage || program.image || null;

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image Header */}
                  <div className="relative h-60 overflow-hidden bg-gradient-to-br from-[#002f6c] to-[#004fa2] shrink-0">
                    {imageUrl ? (
                      <img decoding="async"
                        src={imageUrl}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-white/30">
                        <IconComponent size={56} className="opacity-40 mb-2" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"></div>

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
        imageUrl="/images/Dalene.webp"
        email="magdalene@zyratech.com"
      />
    </div>
  );
};

export default AdvancedProgramsPage;
