import React, { useState, useEffect, useRef } from 'react';
import { Users, Recycle, Lightbulb, Globe, DollarSign, BookOpen, Briefcase, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import impactService from '../../../services/impactService';

const ImpactStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({});
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef();
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  // Icon mapping helper
  const getIconForCategory = (category, title) => {
    const lowerTitle = title?.toLowerCase() || '';

    if (category === 'students' || lowerTitle.includes('student')) return Users;
    if (category === 'partnerships' || lowerTitle.includes('partner')) return Recycle; // Using Recycle as in original or Handshake
    if (category === 'projects' || lowerTitle.includes('project')) return Globe;
    if (category === 'financial' || lowerTitle.includes('fee')) return DollarSign;
    if (category === 'courses') return BookOpen;
    if (category === 'employment') return Briefcase;
    if (category === 'awards') return Award;
    return Lightbulb; // Default
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const metrics = await impactService.fetchMetricsByLocation('home');

        const formattedStats = metrics.map(m => ({
          icon: getIconForCategory(m.category, m.title),
          number: typeof m.value === 'number' ? m.value : parseFloat(m.value) || 0,
          displayValue: m.value, // Keep original value for text types
          isNumeric: typeof m.value === 'number',
          suffix: m.suffix || '',
          prefix: m.prefix || '',
          label: m.title,
          color: '#004fa2' // Default color
        }));

        setStats(formattedStats);
      } catch (error) {
        console.error('Failed to fetch impact stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          startCountingAnimation();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, stats]); // Add stats dependnecy

  // Animated number counting
  const startCountingAnimation = () => {
    stats.forEach((stat, index) => {
      if (stat.isNumeric && stat.number > 0) {
        let start = 0;
        const end = stat.number;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }

          setAnimatedNumbers(prev => ({
            ...prev,
            [index]: Math.floor(start)
          }));
        }, 16);
      }
    });
  };

  if (loading) return null; // Or a skeleton loader

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-white from-gray-100 to-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-left mb-8"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight mb-4">
            Our Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            We measure success not by numbers, but by transformation. Our achievements in education, internships, and professional services.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
                className="group relative bg-white p-3 sm:p-4 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)` }}
                ></div>

                {/* Content */}
                <div className="flex items-center space-x-2 sm:space-x-3 relative z-10">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 bg-gray-50 group-hover:bg-gray-100 flex-shrink-0"
                  >
                    <IconComponent
                      size={20}
                      className="sm:w-6 sm:h-6"
                      style={{ color: stat.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline space-x-1">
                      <span
                        className="text-xl sm:text-xl md:text-2xl font-extrabold leading-tight truncate"
                        style={{ color: stat.color }}
                      >
                        {stat.prefix}
                        {stat.isNumeric ? (isVisible ? (animatedNumbers[index] || 0) : 0) : stat.displayValue}
                      </span>
                      {stat.isNumeric && stat.suffix && (
                        <span
                          className="text-base sm:text-lg md:text-xl font-bold"
                          style={{ color: stat.color }}
                        >
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm md:text-sm font-semibold text-black mt-0.5 sm:mt-1 leading-tight line-clamp-2">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Partner CTA */}
        <div className="flex justify-center mt-8">
          <a
            href="/partner"
            className="bg-gradient-to-r from-[#004fa2] to-[#003a7a] hover:from-[#003a7a] hover:to-[#002855] text-white font-bold text-base px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-2"
          >
            Support Our Mission
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;


