import React from 'react';

const NewProjectsHero = () => {
  return (
    <section className="relative text-white overflow-visible">
      {/* Background Image with Overlays */}
      <div className="absolute inset-0">
        <img 
          src="/images/image1.png" 
          alt="ZyraTech Projects"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src = '/images/image2.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#004fa2]/40 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[520px] flex items-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Turn Your Ideas Into Reality
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
            Custom projects for students, startups, and businesses. From final year projects to full-scale applications, we build it with you.
          </p>
        </div>
      </div>

      {/* Stats Card - Absolutely positioned to overlap section boundary */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-[#004fa2] mb-2">50+</div>
                <div className="text-sm sm:text-base text-gray-700 font-medium">Projects Delivered</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="text-4xl sm:text-5xl font-bold text-[#004fa2] mb-2">100%</div>
                <div className="text-sm sm:text-base text-gray-700 font-medium">Student Success</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-[#004fa2] mb-2">2-8</div>
                <div className="text-sm sm:text-base text-gray-700 font-medium">Weeks Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewProjectsHero;
