
import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import testimonialsService from '../../../services/testimonialsService';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const cardsAnimation = useScrollAnimation({ type: 'fadeIn', delay: 0.2 });
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Get all featured testimonials
        const response = await testimonialsService.getPublicTestimonials(1, 50, true);
        
        // API returns: { success, data: { data: [...], pagination: {} } }
        // Axios wraps it, so array is at: response.data.data.data
        const apiResponseData = response?.data?.data; // { data: [...], pagination: {} }
        const testimonialsList = apiResponseData?.data || []; // The actual array
        
        console.log('[TestimonialsSection] Fetched testimonials:', testimonialsList?.length || 0);
        setTestimonials(testimonialsList);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (loading || testimonials.length <= 3 || isPaused) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 3;
        return next >= testimonials.length ? 0 : next;
      });
    }, 6000); // 6 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [loading, testimonials.length, isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const next = prev + 3;
      return next >= testimonials.length ? 0 : next;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        // Go to last set
        const remainder = testimonials.length % 3;
        return remainder === 0 
          ? testimonials.length - 3 
          : testimonials.length - remainder;
      }
      return Math.max(0, prev - 3);
    });
  };

  // Don't render anything if we've finished loading and have no testimonials
  if (!loading && testimonials.length === 0) return null;

  // Get current visible testimonials (3 at a time)
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);
  
  // If we have less than 3 testimonials at the end, loop to get more from the start
  if (visibleTestimonials.length < 3 && testimonials.length > 0) {
    const needed = 3 - visibleTestimonials.length;
    visibleTestimonials.push(...testimonials.slice(0, needed));
  }

  return (
    <section 
      className="py-20 bg-[#004fa2] text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title - always attach the ref so useInView works correctly */}
        <motion.div
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            What Our Community Says
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Hear from the tech professionals we've helped transform their careers and businesses across Ghana.
          </p>
        </motion.div>

        {/* Cards area - always attach the ref so useInView works correctly */}
        <motion.div
          ref={cardsAnimation.ref}
          initial={cardsAnimation.initial}
          animate={cardsAnimation.animate}
          variants={cardsAnimation.variants}
          transition={cardsAnimation.transition}
          className="mb-12"
        >
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-white/10 rounded-xl h-64"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id || index}-${currentIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-[transform,shadow,opacity] duration-300 hover:-translate-y-2 cursor-pointer group flex flex-col"
                >
                  {/* Star Rating at Top - GOLD COLOR */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                    ))}
                    {[...Array(Math.max(0, 5 - (testimonial.rating || 5)))].map((_, i) => (
                      <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <div className="flex-grow mb-4">
                    <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-300 line-clamp-3">
                      {testimonial.content}
                    </p>
                  </div>

                  {/* Avatar and Name at Bottom */}
                  <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 shrink-0 border border-gray-100 bg-gray-200">
                      {testimonial.avatarUrl ? (
                        <img 
                          decoding="async"
                          src={testimonial.avatarUrl}
                          alt={testimonial.name}
                          width="40"
                          height="40"
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="w-full h-full flex items-center justify-center bg-blue-100 text-[#004fa2] font-bold text-sm" 
                        style={{ display: testimonial.avatarUrl ? 'none' : 'flex' }}
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#004fa2] transition-colors duration-300 truncate max-w-[150px]">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300 truncate max-w-[150px]">
                        {testimonial.role || 'Professional'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Navigation Arrows - Only show if more than 3 testimonials */}
        {!loading && testimonials.length > 3 && (
          <div className="flex justify-center gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;

