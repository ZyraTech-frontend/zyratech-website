import React from 'react';
import { Settings, ChevronRight, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const MaintenanceHero = () => {
  return (
    <section className="relative pt-8 sm:pt-10 pb-8 sm:pb-10 bg-white from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          
          {/* Left Content */}
          <motion.div 
            className="max-w-2xl"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6 leading-tight">
              Keeping Innovation Running Smoothly
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed max-w-3xl">
              Professional maintenance and repair services to keep your devices, systems, and equipment operating at peak performance.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a 
                href="/services/manufacturing/book-technician"
                className="bg-[#004fa2] hover:bg-[#000000] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto text-center inline-flex items-center justify-center gap-2"
              >
                Book a Service
                <ChevronRight size={18} />
              </a>
            </div>
          </motion.div>
          
          {/* Right - Image */}
          <motion.div 
            className="relative"
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl h-80 flex items-center justify-center">
              <div className="text-center text-white/60">
                <Wrench size={48} className="mx-auto mb-3 text-[#004fa2]/60" />
                <p className="text-lg font-semibold">Maintenance Services</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MaintenanceHero;



