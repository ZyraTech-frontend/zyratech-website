import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroService from '../../../services/heroService';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
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
        // ✅ Use PUBLIC endpoint for public site (no authentication)
        const response = await heroService.getPublicSlides();
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

  // Show skeleton while loading
  if (loading || slides.length === 0) {
    return (
      <section className="relative w-full text-white overflow-hidden" style={{ height: 'calc(100vh - 88px)' }}>
        {/* Skeleton Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse"></div>
        
        {/* Skeleton Content */}
        <div className="relative z-10 w-full h-full flex items-center justify-start px-6 md:px-16 lg:px-24 pt-20 pb-20">
          <div className="max-w-5xl w-full space-y-6">
            {/* Skeleton Title */}
            <div className="space-y-4">
              <div className="h-16 md:h-20 bg-gray-400 rounded-lg animate-pulse w-3/4"></div>
              <div className="h-6 md:h-8 bg-gray-400 rounded-lg animate-pulse w-2/3"></div>
            </div>
            
            {/* Skeleton Description */}
            <div className="space-y-3 max-w-2xl">
              <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-400 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-400 rounded animate-pulse w-4/5"></div>
            </div>
            
            {/* Skeleton Buttons */}
            <div className="flex gap-4 pt-4">
              <div className="h-12 bg-gray-400 rounded-lg animate-pulse w-40"></div>
              <div className="h-12 bg-gray-400 rounded-lg animate-pulse w-40"></div>
            </div>
          </div>
        </div>

        {/* Skeleton Dots */}
        <div className="absolute bottom-12 left-6 md:left-16 lg:left-24 z-20 flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-1.5 bg-gray-400 rounded-full animate-pulse" style={{ width: i === 0 ? '32px' : '16px' }}></div>
          ))}
        </div>
      </section>
    );
  }

  const slide = slides[currentSlide];

  // Guard against null backgroundImage
  if (!slide?.backgroundImage) {
    return null;
  }

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
      {/* Background Image - NO ANIMATION, INSTANT SWAP */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          key={currentSlide}
          decoding="async"
          src={slide.backgroundImage}
          alt={slide.pillar}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          onError={(e) => {
            e.target.src = "/images/hero2.webp";
          }}
        />

        {/* Overlay - Light gradient from left to dark for text readability ONLY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-transparent"></div>
      </div>

      {/* Content with animations - Left aligned */}
      <div className="relative z-10 w-full h-full flex items-center justify-start px-6 md:px-16 lg:px-24 pt-20 pb-20">
        {/* Motion container with key to re-trigger animation on slide change */}
        <motion.div
          key={currentSlide}
          className="max-w-5xl w-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 tracking-tight text-white"
            style={{
              textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            {formatTitle(slide.title)}
          </motion.h1>

          {/* Pillar (Sub-heading) */}
          {slide.pillar && (
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl font-bold text-white mb-3"
              style={{
                textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
              }}
            >
              {formatTitle(slide.pillar)}
            </motion.h3>
          )}

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl font-normal text-gray-200 mb-8 leading-relaxed max-w-2xl"
            style={{
              textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
            }}
          >
            {formatDescription(slide.description)}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-8"
          >
            {slide.cta1Text && (
              <Link
                to={slide.cta1Link || '#'}
                className="bg-[#004fa2] hover:bg-[#003b7a] text-white px-8 py-3.5 rounded text-base md:text-lg font-medium transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center shadow-lg"
              >
                {slide.cta1Text}
              </Link>
            )}

            {slide.cta2Text && (
              <Link
                to={slide.cta2Link || '#'}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3.5 rounded text-base md:text-lg font-medium transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center"
              >
                {slide.cta2Text}
              </Link>
            )}
          </motion.div>
        </motion.div>
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
