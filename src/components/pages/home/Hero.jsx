
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroService from '../../../services/heroService';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  };

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await heroService.getAllSlides();
        // Filter only visible slides
        const visibleSlides = response.data.filter(s => s.isVisible);
        setSlides(visibleSlides);

        // Preload first image immediately
        if (visibleSlides.length > 0) {
          preloadImage(visibleSlides[0].backgroundImage);
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

  if (loading) {
    // Show a loading skeleton or a simple placeholder
    return (
      <section className="relative w-full h-[calc(100vh-88px)] bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  // Fallback if no slides are returned
  if (slides.length === 0) {
    return null;
  }

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full text-white overflow-hidden" style={{ height: 'calc(100vh - 88px)' }}>
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={slide.backgroundImage}
            alt={slide.pillar}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
            style={{
              objectPosition: slide.bgPosition || 'center center',
              filter: 'brightness(1.1) contrast(1.05)'
            }}
            onError={(e) => { e.target.src = '/images/hero2.jpeg' }} // Fallback image
          />
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content with animations */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-6 md:px-12 lg:px-16 pt-32 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            className="max-w-4xl w-full"
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Headline */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-relaxed mb-8 tracking-tight text-white uppercase"
              style={{
                textShadow: '3px 3px 12px rgba(0,0,0,0.7)',
                lineHeight: '1.2'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              {slide.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-base md:text-lg lg:text-xl font-medium text-white mb-12 leading-relaxed max-w-2xl"
              style={{
                textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                lineHeight: '1.6'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {slide.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 md:gap-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {slide.cta1Text && slide.cta1Link && (
                <Link
                  to={slide.cta1Link}
                  className="cta-btn px-8 py-4 rounded-xl text-lg transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  {slide.cta1Text}
                  <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              )}

              {slide.cta2Text && slide.cta2Link && (
                <Link
                  to={slide.cta2Link}
                  className="cta-ghost px-8 py-4 rounded-xl text-lg transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  {slide.cta2Text}
                  <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slideshow Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex justify-center items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all duration-500 hover:scale-110 ${index === currentSlide
              ? 'bg-white w-12 h-3 shadow-lg'
              : 'bg-white/50 w-3 h-3 hover:bg-white/70'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
