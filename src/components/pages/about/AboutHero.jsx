import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <section className="relative isolate overflow-hidden min-h-screen">
      <div className="max-w-none px-0">
        {/* Card Container with Border Radius */}
        <div
          className="relative overflow-hidden min-h-screen bg-cover bg-center bg-scroll md:bg-fixed"
          style={{
            backgroundImage: 'url(/images/image1.png)'
          }}
        >
          
          {/* Left Content - Hero Image */}
          <div className="absolute inset-0 bg-black/45" />

          <div className="relative px-4 sm:px-6 md:px-10 lg:px-14 py-16 sm:py-20 md:py-24 lg:py-32 min-h-[500px] md:min-h-[580px] lg:min-h-[680px] flex items-center">
            {/* Right Content */}
            <motion.div
              className="max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-0 leading-tight">
                Building the next generation of
                <span className="text-[#FFD700] block"> tech talent</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg md:text-xl font-semibold text-white/90 leading-relaxed max-w-3xl">
                We bridge learning and industry through hands-on training, internships, and real-world projects—helping people and organizations build practical, job-ready digital skills.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;


