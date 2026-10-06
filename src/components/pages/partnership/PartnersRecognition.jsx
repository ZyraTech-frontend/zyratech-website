import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Building2, ExternalLink, X } from 'lucide-react';
import partnersService from '../../../services/partnersService';

const PartnersRecognition = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const partnersPerPage = 10;

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data } = await partnersService.getAllPartnerships({ limit: 100 });
        // Filter for active partners
        const activePartners = data.filter(p => p.status === 'active');
        setPartners(activePartners);
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  const handlePartnerClick = (partner) => {
    setSelectedPartner(partner);
  };

  const confirmVisit = () => {
    if (selectedPartner?.website) {
      window.open(selectedPartner.website, '_blank');
    }
    setSelectedPartner(null);
  };

  // Pagination logic
  const totalPages = Math.ceil(partners.length / partnersPerPage);
  const startIndex = (currentPage - 1) * partnersPerPage;
  const displayedPartners = partners.slice(startIndex, startIndex + partnersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of section
    const section = document.querySelector('[data-partners-section]');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" data-partners-section>
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
            <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12 place-items-center"
            >
              {displayedPartners.map((partner) => (
                <motion.div
                  key={partner.id}
                  whileHover={{ scale: 1.08 }}
                  className="w-full h-32 flex items-center justify-center group cursor-pointer transition-all duration-300"
                  onClick={() => partner.website && handlePartnerClick(partner)}
                  title={partner.website ? `Click to visit ${partner.organizationName}` : partner.organizationName}
                >
                  {partner.logo ? (
                    <img
                      decoding="async"
                      src={partner.logo}
                      alt={partner.organizationName}
                      className="max-w-full max-h-full object-contain filter opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}

                  {/* Fallback if no logo */}
                  <div className={`flex flex-col items-center justify-center text-center ${partner.logo ? 'hidden' : 'flex'}`}>
                    <Building2 className="w-10 h-10 text-gray-300 mb-2 group-hover:text-[#004fa2] transition-colors" />
                    <span className="text-xs font-bold text-gray-600 group-hover:text-[#004fa2] transition-colors line-clamp-2">
                      {partner.organizationName}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-[#004fa2] text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Next
                </button>
              </div>
            )}
            </>
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
                <img decoding="async"
                  src="/images/partnershiplogo.webp"
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

      {/* Confirmation Modal */}
      <AnimatePresence>
        {selectedPartner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPartner(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#004fa2] to-[#003a7a] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {selectedPartner.logo && (
                    <img
                      src={selectedPartner.logo}
                      alt={selectedPartner.organizationName}
                      className="w-8 h-8 object-contain"
                    />
                  )}
                  <h3 className="text-lg font-bold text-white truncate">
                    {selectedPartner.organizationName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <p className="text-gray-700 mb-2">
                  You're about to visit:
                </p>
                <p className="text-sm text-gray-500 break-all mb-6 p-3 bg-gray-50 rounded-lg">
                  {selectedPartner.website}
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  This will open in a new window. Are you sure you want to continue?
                </p>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="flex-1 px-4 py-2 text-gray-700 font-semibold bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmVisit}
                  className="flex-1 px-4 py-2 text-white font-semibold bg-[#004fa2] rounded-lg hover:bg-[#003a7a] transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Website
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PartnersRecognition;
