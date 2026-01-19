import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "EDUCATION & INTERNSHIP",
      description: "Practical training in coding, robotics, AI, and IT systems. Bridge the gap between classroom learning and real-world experience with our 3-6 month internship program. Join 500+ students transforming their futures.",
      pillar: "Education & Internship",
      icon: "🎓",
      backgroundImage: "/images/image1.png",
      cta1: { text: "Apply for Internship", link: "/training/programs/internship" },
      cta2: { text: "Read Success Stories", link: "/#impact-stories" }
    },
    {
      title: "TRANSFORMING LIVES THROUGH TECH",
      description: "Meet Naomi, Isaac, and student teams who built educational apps, installed school networks, and created SME solutions. Real stories of innovation and impact from our internship program.",
      pillar: "Impact Stories",
      icon: "🌟",
      backgroundImage: "/images/stories/hero.jpg",
      cta1: { text: "Explore Stories", link: "/#impact-stories" },
      cta2: { text: "Join Our Program", link: "/training" }
    },
    {
      title: "INNOVATION & COMMUNITY",
      description: "A passionate team driven by innovation and education. From AWS-certified leadership to dedicated coordinators, we're empowering Ghana's next generation of tech talent.",
      pillar: "About & Team",
      icon: "👥",
      backgroundImage: "/images/team/hero.jpg",
      cta1: { text: "Meet Our Team", link: "/about#team" },
      cta2: { text: "Partner With Us", link: "/partner" }
    },
    {
      title: "IT & NETWORKING SOLUTIONS",
      description: "LAN/WAN installation, WiFi setup, server deployment, and digital infrastructure solutions. Build robust networks that power your organization with professional support.",
      pillar: "IT & Networking",
      icon: "🌐",
      backgroundImage: "/images/image2.png",
      cta1: { text: "Learn More", link: "/services/software" },
      cta2: { text: "Get Started", link: "/contact" }
    },
    {
      title: "WEB & SOFTWARE SOLUTIONS",
      description: "Custom websites, management systems, and cloud-based tools for schools and businesses. We deliver professional, reliable, and affordable IT solutions tailored to your needs.",
      pillar: "Web & Software",
      icon: "💻",
      backgroundImage: "/images/image3.png",
      cta1: { text: "Our Services", link: "/services/software" },
      cta2: { text: "Request a Quote", link: "/contact" }
    }
  ];

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);


  return (
    <section className="relative w-full text-white overflow-hidden" style={{ height: 'calc(100vh - 88px)' }}>
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          key={currentSlide}
          src={slides[currentSlide].backgroundImage}
          alt={slides[currentSlide].pillar}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
          style={{
            objectPosition: 'center center',
            filter: 'brightness(1.1) contrast(1.05)'
          }}
          loading="lazy"
        />
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
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-relaxed mb-8 tracking-tight text-white"
              style={{ 
                textShadow: '3px 3px 12px rgba(0,0,0,0.7)',
                lineHeight: '1.2'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              {slides[currentSlide].title}
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
              {slides[currentSlide].description}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 md:gap-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
            <a 
              href={slides[currentSlide].cta1.link}
              className="group bg-[#004fa2] hover:bg-[#000000] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center justify-center gap-4 transform hover:-translate-y-1"
            >
              {slides[currentSlide].cta1.text}
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a 
              href={slides[currentSlide].cta2.link}
              className="group bg-transparent border-3 border-white hover:bg-white hover:text-[#004fa2] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center justify-center gap-4 transform hover:-translate-y-1"
            >
              {slides[currentSlide].cta2.text}
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
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
            className={`rounded-full transition-all duration-500 hover:scale-110 ${
              index === currentSlide
                ? 'bg-white w-12 h-3 shadow-lg'
                : 'bg-white/50 w-3 h-3 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;


