import React from 'react';

const CollaborationTestimonialSection = ({ testimonial }) => {
  return (
    <section className="bg-gradient-to-r from-[#004fa2] to-[#003d7a] text-white py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-5xl leading-none text-orange-500 mb-6">“</p>
        <p className="text-lg sm:text-xl leading-relaxed max-w-4xl mx-auto">{testimonial?.quote}</p>
        <p className="mt-6 text-sm text-white/80">{testimonial?.attribution}</p>
        <p className="text-5xl leading-none text-orange-500 mt-6">”</p>
      </div>
    </section>
  );
};

export default CollaborationTestimonialSection;
