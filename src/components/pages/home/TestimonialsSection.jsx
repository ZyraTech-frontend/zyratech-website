import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'Agyare Boas Tieku',
    role: 'Software Developer',
    image: '/images/tes1.png',
    quote: 'ZyraTech transformed my career. Their hands-on approach and real-world projects gave me the skills I needed to land my dream job in tech.',
    rating: 5,
    imageClassName: 'object-top scale-[2.0] origin-top'
  },
  {
    name: 'Chemogoh Rhydal Maanou',
    role: 'Digital Marketer',
    image: '/images/tes2.png',
    quote: 'The training quality is exceptional. ZyraTech doesn\'t just teach theory - they prepare you for the actual challenges you\'ll face in the industry.',
    rating: 5,
    imageClassName: 'object-top scale-[2.0] origin-top'
  },
  {
    name: 'Joseph Mensah',
    role: 'IT Manager',
    image: '/images/testimonial-3.jpg',
    quote: 'Working with ZyraTech has been a game-changer for our team. Their collaborative approach and expertise helped us scale our operations efficiently.',
    rating: 5,
    imageClassName: 'object-cover'
  }
];

const TestimonialsSection = () => {
  const titleAnimation = useScrollAnimation({ type: 'slideUp', delay: 0 });
  const cardsAnimation = useScrollAnimation({ type: 'fadeIn', delay: 0.2 });

  return (
    <section className="py-20 bg-[#004fa2] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <motion.div
          ref={cardsAnimation.ref}
          initial={cardsAnimation.initial}
          animate={cardsAnimation.animate}
          variants={cardsAnimation.variants}
          transition={cardsAnimation.transition}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer group">
              <Quote className="w-8 h-8 text-[#004fa2] mb-4 group-hover:scale-110 transition-transform duration-300" />

              <p className="text-gray-700 leading-relaxed mb-6 italic group-hover:text-gray-900 transition-colors duration-300">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 shrink-0 border border-gray-100">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className={`w-full h-full object-cover transition-transform duration-300 ${testimonial.imageClassName || ''}`}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face';
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors duration-300">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
