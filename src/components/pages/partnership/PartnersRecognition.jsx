import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const PartnersRecognition = () => {
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

        {/* Partners Image */}
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
