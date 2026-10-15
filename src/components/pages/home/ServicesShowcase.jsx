import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import contentService from '../../../services/contentService';

const ServicesShowcase = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        // Use public endpoint (no authentication required)
        const response = await contentService.getPublicServices();
        // getPublicServices already returns array directly
        const servicesData = Array.isArray(response) ? response : [];
        if (servicesData && servicesData.length > 0) {
          setServices(servicesData.map(s => s.title));
        } else {
          setServices([]); // No fallback - empty array
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
        setServices([]); // No fallback on error
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-16 bg-[#004fa2] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">Our Services</h2>
        <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
          Comprehensive technology solutions tailored to drive your digital transformation
        </p>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/70">No services available</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {services.slice(0, 3).map((service, index) => (
                <div key={index} className="bg-white rounded-xl p-8 h-32 flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#004fa2] transition-colors">{service}</h3>
                </div>
              ))}
            </div>

            {services.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
                {services.slice(3).map((service, index) => (
                  <div key={index} className="bg-white rounded-xl p-8 h-32 flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#004fa2] transition-colors">{service}</h3>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

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
