import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroService from '../../../services/heroService';
import OptimizedImage from '../../common/OptimizedImage';

const Hero = () => {
  // Default initial slides to show something immediately (LCP optimization)
  const defaultSlides = [
    {
      id: 'initial',
      title: 'Empowering Ghana\'s Future Through Technology',
      description: 'Zyra Tech Hub provides world-class digital training, internships, and professional IT services to build the next generation of tech leaders.',
      backgroundImage: "/images/hero1.webp",
      pillar: 'Innovation',
      cta1Text: 'Explore Programs',
      cta1Link: '/training',
      cta2Text: 'Partner With Us',
      cta2Link: '/partner',
      isVisible: true
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState(defaultSlides);
  const [loading, setLoading] = useState(true);

  const preloadImage = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = resolve; // Ignore errors for preloading
    });
  };

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await heroService.getAllSlides();
        const visibleSlides = response.data.filter(s => s.isVisible);
        if (visibleSlides.length > 0) {
          setSlides(visibleSlides);
        }
      } catch (error) {
        console.error('Failed to fetch hero slides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    if (slides.length <= 1) return;

    // Preload next image
    const nextIndex = (currentSlide + 1) % slides.length;
    preloadImage(slides[nextIndex].backgroundImage);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length, currentSlide]);

  // Fallback if no slides are returned
  if (slides.length === 0) {
    return null;
  }

  const slide = slides[currentSlide];

  // Helper to convert ALL CAPS to Title Case (and keep IT uppercase)
  const formatTitle = (title) => {
    if (!title) return '';
    if (title === title.toUpperCase()) {
      return title
        .toLowerCase()
        .split(' ')
        .map(word => {
          if (word === 'it') return 'IT';
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
    }
    return title;
  };

  // Helper to shorten description to make it punchy like AmaliTech
  const formatDescription = (desc) => {
    if (!desc) return '';
    // If there's a period, cut it off after the first sentence
    const firstPeriod = desc.indexOf('.');
    if (firstPeriod > -1 && firstPeriod < desc.length - 1) {
      return desc.substring(0, firstPeriod + 1);
    }
    return desc;
  };

  return (
    <section className="relative w-full text-white overflow-hidden" style={{ height: 'calc(100vh - 88px)' }}>
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
            style={{
              filter: 'brightness(1.1) contrast(1.05)'
            }}
          >
            <OptimizedImage
              src={slide.backgroundImage}
              alt={slide.pillar}
              width={1920}
              height={1080}
              priority={currentSlide === 0}
              className="absolute inset-0 w-full h-full object-cover"
              containerClassName="absolute inset-0 w-full h-full"
              onError={(e) => {
                if (e.target) {
                  e.target.src = "/images/hero2.webp";
                }
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay - Gradient from left to dark, similar to AmaliTech */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content with animations - Left aligned */}
      <div className="relative z-10 w-full h-full flex items-center justify-start px-6 md:px-16 lg:px-24 pt-20 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            className="max-w-5xl w-full"
            key={currentSlide}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Headline */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 tracking-tight text-white"
              style={{
                textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              {formatTitle(slide.title)}
            </motion.h1>

            {/* Pillar (Sub-heading) - AmaliTech puts it below headline */}
            {slide.pillar && (
              <motion.h3
                className="text-lg md:text-xl font-bold text-white mb-3"
                style={{
                  textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {formatTitle(slide.pillar)}
              </motion.h3>
            )}

            {/* Description */}
            <motion.p
              className="text-base md:text-lg lg:text-xl font-normal text-gray-200 mb-8 leading-relaxed max-w-2xl"
              style={{
                textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {formatDescription(slide.description)}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {slide.cta1Text && slide.cta1Link && (
                <Link
                  to={slide.cta1Link}
                  className="bg-[#004fa2] hover:bg-[#003b7a] text-white px-8 py-3.5 rounded text-base md:text-lg font-medium transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center shadow-lg"
                >
                  {slide.cta1Text}
                </Link>
              )}

              {slide.cta2Text && slide.cta2Link && (
                <Link
                  to={slide.cta2Link}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded text-base md:text-lg font-medium transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center"
                >
                  {slide.cta2Text}
                </Link>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slideshow Controls (Dots) - Bottom left */}
      <div className="absolute bottom-12 left-6 md:left-16 lg:left-24 z-20">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'bg-[#004fa2] w-8 h-1.5 shadow-lg'
                  : 'bg-white/40 w-4 h-1.5 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
