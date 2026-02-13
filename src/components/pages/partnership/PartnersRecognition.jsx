import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Building2 } from 'lucide-react';
import partnersService from '../../../services/partnersService';

const PartnersRecognition = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data } = await partnersService.getAllPartnerships();
        // Filter for active/featured partners
        const activePartners = data.filter(p =>
          (p.status === 'active' || p.featured) && p.organization
        );
        setPartners(activePartners);
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-8 h-8 text-[#004fa2]" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
              Our Partners
            </h2>
          </div>
          <p className="text-gray-600 max-w-4xl mx-auto">
            At ZyraTech, our partnerships are the cornerstone of our mission to connect IT talent with global markets.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="min-h-[200px]">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004fa2]"></div>
            </div>
          ) : partners.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
            >
              {partners.map((partner) => (
                <motion.div
                  key={partner.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center h-40 hover:shadow-md transition-all duration-300 group"
                >
                  {partner.organization.logo ? (
                    <img
                      src={partner.organization.logo}
                      alt={partner.organization.name}
                      className="max-w-full max-h-24 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}

                  {/* Fallback Text (shown if no logo or logo error) */}
                  <div
                    className={`flex flex-col items-center justify-center text-center ${partner.organization.logo ? 'hidden' : 'flex'}`}
                  >
                    <Building2 className="w-8 h-8 text-gray-300 mb-2 group-hover:text-[#004fa2] transition-colors" />
                    <span className="text-sm font-bold text-gray-600 group-hover:text-[#004fa2] transition-colors line-clamp-2">
                      {partner.organization.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Keep the static image as ultimate fallback if no data
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center items-center py-8"
            >
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 max-w-4xl w-full flex justify-center items-center">
                <img
                  src="/images/partnershiplogo.jpeg"
                  alt="Our Partners"
                  className="max-w-full h-auto object-contain max-h-[400px]"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join a growing community of organizations committed to driving innovation and creating positive social impact across Africa.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersRecognition;
