import React from 'react';
import { Link } from 'react-router-dom';

const ImpactTestimonial = () => {
  return (
    <section className="py-16 bg-[#092e3a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left - text */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">We're Impacting The Local Economy!</h2>

            <div className="text-lg text-white/90 mb-8">
              <div className="text-4xl text-[#ff6a00] leading-none mb-4">“</div>
              <p className="mb-6 leading-relaxed">
                In 2019, a business moved into the office building across the street. Below the company sign
                "Zyra Tech Hub", it said, "Technology Innovation Center". I didn't exactly know what they were doing. But now I know many people who work there.
                They come to shop with me regularly. I expanded my shop area in 2022! I also built a storage room for my products. Just look around – the product varieties in the
                assortment have grown quite a bit.
              </p>
              <div className="text-4xl text-[#ff6a00] leading-none">”</div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-1 bg-[#ff6a00] rounded" />
                <div className="font-semibold text-[#ff6a00]">— Theresa</div>
              </div>
              <div className="mt-3 text-white/80">Foodshop Owner in Takoradi</div>
            </div>
          </div>

          {/* Right - image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
                <img
                  src="/images/testimonial.jpg"
                  alt="Local vendor smiling"
                  className="w-full h-[460px] object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200'; }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImpactTestimonial;
