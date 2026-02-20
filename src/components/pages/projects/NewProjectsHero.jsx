import React, { useState, useEffect } from 'react';

const NewProjectsHero = () => {
  const [projects, setProjects] = useState(0);
  const [success, setSuccess] = useState(0);

  useEffect(() => {
    const projectsInterval = setInterval(() => {
      setProjects(prev => prev < 50 ? prev + 1 : 50);
    }, 30);

    const successInterval = setInterval(() => {
      setSuccess(prev => prev < 100 ? prev + 1 : 100);
    }, 15);

    return () => {
      clearInterval(projectsInterval);
      clearInterval(successInterval);
    };
  }, []);

  return (
    <section className="relative text-white overflow-visible">
      {/* Background Image with Overlays */}
      <div className="absolute inset-0">
        <img
          src="/images/parallax1.jpeg"
          alt="ZyraTech Projects"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 20%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#004fa2]/25 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-20 sm:py-24 md:py-28 pb-32 sm:pb-40 min-h-[520px] flex items-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            Turn Your Ideas Into Reality
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-semibold text-white/90 max-w-3xl mx-auto leading-relaxed">
            Custom projects for students, startups, and businesses. From final year projects to full-scale applications, we build it with you.
          </p>
        </div>
      </div>

      {/* Stats Card - Absolutely positioned to overlap section boundary */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 md:p-12">
            <div className="grid grid-cols-3 gap-2 sm:gap-8">
              <div className="text-center">
                <div className="text-xl sm:text-4xl md:text-5xl font-bold text-[#004fa2] mb-1 sm:mb-2 break-words">{projects}+</div>
                <div className="text-xs sm:text-base text-gray-700 font-medium">Projects Delivered</div>
              </div>
              <div className="text-center border-x-2 border-gray-200 px-1 sm:px-4">
                <div className="text-xl sm:text-4xl md:text-5xl font-bold text-[#004fa2] mb-1 sm:mb-2 break-words">{success}%</div>
                <div className="text-xs sm:text-base text-gray-700 font-medium">Student Success</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-4xl md:text-5xl font-bold text-[#004fa2] mb-1 sm:mb-2 break-words">2-8</div>
                <div className="text-xs sm:text-base text-gray-700 font-medium">Weeks Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewProjectsHero;
