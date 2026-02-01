import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  'PRODUCT ENGINEERING',
  'WEB AND APP DEVELOPMENT', 
  'QUALITY ASSURANCE',
  'SECURITY',
  'MANAGED SERVICES'
];

const ServicesShowcase = () => {
  return (
    <section className="py-16 bg-[#004fa2] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
        <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
          Comprehensive technology solutions tailored to drive your digital transformation
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {services.slice(0, 3).map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-8 h-32 flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              <h3 className="text-lg font-semibold text-center text-gray-900 group-hover:text-[#004fa2] transition-colors">{service}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          {services.slice(3).map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-8 h-32 flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              <h3 className="text-lg font-semibold text-center text-gray-900 group-hover:text-[#004fa2] transition-colors">{service}</h3>
            </div>
          ))}
        </div>

        <Link
          to="/our-services"
          className="inline-block bg-white hover:bg-gray-100 text-[#004fa2] font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
};

export default ServicesShowcase;
