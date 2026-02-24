
import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import testimonialsService from '../../../services/testimonialsService';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const cardsAnimation = useScrollAnimation({ type: 'fadeIn', delay: 0.2 });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialsService.getAllTestimonials();
        // Show only published testimonials, prioritizing featured ones
        const published = response.data
          .filter(t => t.status === 'published')
          .sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1))
          .slice(0, 3); // Limit to 3 for the homepage section

        setTestimonials(published);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Don't render anything if we've finished loading and have no testimonials
  if (!loading && testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-[#004fa2] text-white">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
            // Loading skeleton - rendered INSIDE the animated wrapper
            [1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-white/10 rounded-xl h-64"></div>
            ))
          ) : (
            testimonials.map((testimonial, index) => (
              <div key={testimonial.id || index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-[transform,shadow,opacity] duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer group flex flex-col h-full">
                <Quote className="w-8 h-8 text-[#004fa2] mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />

                <div className="flex-grow">
                  <p className="text-gray-700 leading-relaxed mb-6 italic group-hover:text-gray-900 transition-colors duration-300 line-clamp-4">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 shrink-0 border border-gray-100 bg-gray-200">
                    {testimonial.avatar ? (
                      <img decoding="async"
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width="64"
                        height="64"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 scale-[3.0] origin-top -translate-y-2"
                        style={{ objectPosition: 'center 5%' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-[#004fa2] font-bold text-lg" style={{ display: testimonial.avatar ? 'none' : 'flex' }}>
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors duration-300 truncate max-w-[150px]">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300 truncate max-w-[150px]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

