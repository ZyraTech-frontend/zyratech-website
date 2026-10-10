
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import testimonialsService from '../../../services/testimonialsService';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Get published and featured testimonials
        const response = await testimonialsService.getPublicTestimonials(1, 10, true);
        
        // API returns: { success, data: { data: [...], pagination: {} } }
        const apiResponseData = response?.data?.data;
        const testimonialsList = apiResponseData?.data || [];
        
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

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 3 >= testimonials.length ? 0 : prev + 3
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, testimonials.length - 3) : Math.max(0, prev - 3)
    );
  };

  // Don't render if no testimonials
  if (!loading && testimonials.length === 0) return null;

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Subtle wave pattern background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" className="text-blue-400" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <motion.div
          ref={titleAnimation.ref}
          initial={titleAnimation.initial}
          animate={titleAnimation.animate}
          variants={titleAnimation.variants}
          transition={titleAnimation.transition}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read what our customers have to say about our product.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-white rounded-2xl h-80 shadow-lg"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  {/* Avatar and Name at Top */}
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 shrink-0 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      {testimonial.avatarUrl ? (
                        <img
                          src={testimonial.avatarUrl}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<span class="text-2xl font-bold text-blue-600">${testimonial.name.charAt(0).toUpperCase()}</span>`;
                          }}
                        />
                      ) : (
                        <span className="text-2xl font-bold text-blue-600">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role || 'Customer'}</p>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <p className="text-gray-700 leading-relaxed flex-grow line-clamp-6">
                    {testimonial.content}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {testimonials.length > 3 && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={currentIndex + 3 >= testimonials.length}
                  className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
                  aria-label="Next testimonials"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;

