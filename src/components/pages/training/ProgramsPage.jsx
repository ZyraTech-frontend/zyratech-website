import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Award, Brain, Briefcase, Users, ChevronRight, Check } from 'lucide-react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation.js';
import HrContactSection from '../../common/HrContactSection.jsx';
import { getTrainingCoursesByCategory } from '../../../data/trainingCourses.js';
import useSEO from '../../../hooks/useSEO';

const ProgramsPage = () => {
  useSEO({
    title: 'All Training Programs',
    description: 'Browse all training categories at Zyra Tech Hub - Basic, Intermediate, Advanced, Internship, and Matured programs for every skill level.'
  });

  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const _motion = motion;

  const programCategories = [
    {
      id: 'basic',
      title: 'Basic Programs',
      description: 'Perfect for beginners and those new to technology. Start your tech journey with our foundational programs.',
      icon: BookOpen,
      link: '/training/programs/basic',
      color: 'bg-blue-500'
    },
    {
      id: 'intermediate',
      title: 'Intermediate Programs',
      description: 'For those with some experience looking to advance their skills. Take your career to the next level.',
      icon: Award,
      link: '/training/programs/intermediate',
      color: 'bg-green-500'
    },
    {
      id: 'advanced',
      title: 'Advanced Programs',
      description: 'For experienced professionals ready to master cutting-edge technologies. Lead innovation with expert-level training.',
      icon: Brain,
      link: '/training/programs/advanced',
      color: 'bg-purple-500'
    },
    {
      id: 'internship',
      title: 'Immersive Internship Programme',
      description: 'Gain real-world experience through hands-on projects. Build your portfolio and launch your tech career.',
      icon: Briefcase,
      link: '/training/programs/internship',
      color: 'bg-orange-500'
    },
    {
      id: 'matured',
      title: 'Matured Programme',
      description: 'Designed specifically for mature professionals and career changers. Learn at your pace with flexible schedules.',
      icon: Users,
      link: '/training/programs/matured',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <div className="max-w-none px-0">
          {/* Full-bleed hero container */}
          <div 
            className="relative overflow-hidden bg-cover bg-center bg-scroll md:bg-fixed"
            style={{
              backgroundImage: 'url(/images/image3.png)'
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative px-4 sm:px-6 md:px-10 lg:px-14 py-12 sm:py-16 md:py-20 min-h-[400px] md:min-h-[450px] flex items-center">
              
              {/* Left Content */}
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
                  <span className="text-[#FFD700] block"> Professional Tech Training in Ghana</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p 
                  className="text-sm sm:text-base md:text-lg font-bold text-white mb-6 sm:mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Unlock your potential with industry-validated training programs designed to empower you with the skills and experience needed to excel in the technology industry.
                </motion.p>

                {/* CTA Button */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 md:gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <a 
                    href="#program-categories"
                    className="group bg-[#004fa2] hover:bg-[#000000] text-white px-6 py-3 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 inline-flex items-center justify-center gap-3 transform hover:-translate-y-1 w-full sm:w-auto"
                  >
                    Discover Your Path
                    <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Header - White Background */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            ref={titleAnimation.ref}
            initial={titleAnimation.initial}
            animate={titleAnimation.animate}
            variants={titleAnimation.variants}
            transition={titleAnimation.transition}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Explore Our Programmes In Ghana
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Unlock your potential with our diverse range of programmes in Ghana, designed to empower you with the skills and experience needed to excel in the technology industry. Discover more about our programmes today and take the first step towards a rewarding career in tech.
            </p>
          </motion.div>

          <div className="pt-4 sm:pt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 sm:mb-8">How to Choose a Programme</h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Basic Programs</div>
                    <p className="text-slate-600 leading-relaxed">New to tech or starting from zero</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Intermediate Programs</div>
                    <p className="text-slate-600 leading-relaxed">You have fundamentals and want to specialize</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Advanced Programs</div>
                    <p className="text-slate-600 leading-relaxed">You’re experienced and want expert-level mastery</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Immersive Internship Programme</div>
                    <p className="text-slate-600 leading-relaxed">You want real projects and a portfolio</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Matured Programme</div>
                    <p className="text-slate-600 leading-relaxed">Career switchers who need flexible learning</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Next Steps</h3>
              <ol className="relative border-l-4 border-[#004fa2] pl-6 sm:pl-8 space-y-6 sm:space-y-8">
                <li className="relative ml-2">
                  <div className="absolute -left-5 top-1.5 w-6 h-6 rounded-full bg-[#004fa2] flex items-center justify-center text-white font-bold text-base shadow-md">
                    1
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-lg text-[#004fa2] mb-1">Choose a category</div>
                    <div className="text-gray-700 text-base">Pick a category below that matches your experience level.</div>
                  </div>
                </li>

                <li className="relative ml-2">
                  <div className="absolute -left-5 top-1.5 w-6 h-6 rounded-full bg-[#004fa2] flex items-center justify-center text-white font-bold text-base shadow-md">
                    2
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-lg text-[#004fa2] mb-1">Explore programmes</div>
                    <div className="text-gray-700 text-base">Open the category and review the programmes inside it.</div>
                  </div>
                </li>

                <li className="relative ml-2">
                  <div className="absolute -left-5 top-1.5 w-6 h-6 rounded-full bg-[#004fa2] flex items-center justify-center text-white font-bold text-base shadow-md">
                    3
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-lg text-[#004fa2] mb-1">Open a programme</div>
                    <div className="text-gray-700 text-base">View programme details and proceed from there.</div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Program Categories - Brand Background */}
      <section id="program-categories" className="py-10 sm:py-16 bg-gradient-to-br from-[#004fa2] to-[#2A2D7C]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mobile Layout - Compact horizontal cards */}
          <div className="sm:hidden space-y-3">
            {programCategories.map((category, index) => {
              const IconComponent = category.icon;
              const programCount = getTrainingCoursesByCategory(category.id).length;
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link
                    to={category.link}
                    className="flex items-center gap-3 bg-white rounded-lg p-3 hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Icon */}
                    <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <IconComponent size={20} className="text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 truncate">{category.title}</h3>
                      <p className="text-xs text-gray-500">{programCount} programme{programCount === 1 ? '' : 's'}</p>
                    </div>
                    
                    {/* Arrow */}
                    <ChevronRight size={18} className="text-[#004fa2] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Tablet/Desktop Layout - Original 3-2 grid */}
          <div className="hidden sm:block">
            {/* Program Categories Grid - 3-2 Balanced Stack Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {programCategories.slice(0, 3).map((category, index) => {
                const IconComponent = category.icon;
                const programCount = getTrainingCoursesByCategory(category.id).length;
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 text-center border border-white/20 relative"
                  >
                    {/* Icon - Right Corner */}
                    <div className="absolute top-4 right-4">
                      <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center`}>
                        <IconComponent size={24} className="text-white" />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-6 pr-16">{category.title}</h3>

                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="text-xs font-semibold text-gray-500 mb-5">
                      {programCount} programme{programCount === 1 ? '' : 's'}
                    </div>
                    
                    {/* Button */}
                    <Link
                      to={category.link}
                      className="inline-flex items-center gap-2 bg-[#004fa2] hover:bg-[#2A2D7C] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg text-sm"
                    >
                      Explore Programme
                      <ChevronRight size={16} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Bottom Row - 2 Programs (Centered) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {programCategories.slice(3, 5).map((category, index) => {
                const IconComponent = category.icon;
                const programCount = getTrainingCoursesByCategory(category.id).length;
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                    className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 text-center border border-white/20 relative"
                  >
                    {/* Icon - Right Corner */}
                    <div className="absolute top-4 right-4">
                      <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center`}>
                        <IconComponent size={24} className="text-white" />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-6 pr-16">{category.title}</h3>

                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="text-xs font-semibold text-gray-500 mb-5">
                      {programCount} programme{programCount === 1 ? '' : 's'}
                    </div>
                    
                    {/* Button */}
                    <Link
                      to={category.link}
                      className="inline-flex items-center gap-2 bg-[#004fa2] hover:bg-[#2A2D7C] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg text-sm"
                    >
                      Explore Programme
                      <ChevronRight size={16} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <HrContactSection
        name="Magdalene"
        title="HR Team Lead"
        imageUrl="/images/Dalene.png"
        email="magdalene@zyratech.com"
      />

      {/* Newsletter Subscription Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#004fa2] to-[#2A2D7C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Stay updated with our latest training programs, industry insights, and exclusive offers. Join our community of tech professionals in Ghana.
            </p>
            
            <div className="max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow px-4 py-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-gray-900 bg-white"
                  required
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-gray-100 text-[#004fa2] px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-sm text-white/80 mt-4">
                By subscribing, you agree to our privacy policy. You can unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ProgramsPage;
