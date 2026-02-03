import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const PartnersRecognition = () => {
  const partners = [
    { 
      name: 'AWS', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/2560px-Amazon_Web_Services_Logo.svg.png',
      alt: 'AWS logo'
    },
    { 
      name: 'Microsoft', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2560px-Microsoft_logo.svg.png',
      alt: 'Microsoft logo'
    },
    { 
      name: 'Google Cloud', 
      logo: 'https://www.gstatic.com/devrel-devsite/prod/v2cf3dd4920cd4a25bd1f441bb58e7853afc04b39a9d9ac4199e1cd7fbe04ef',
      alt: 'Google Cloud logo'
    },
    { 
      name: 'IBM', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png',
      alt: 'IBM logo'
    },
    { 
      name: 'Oracle', 
      logo: 'https://www.oracle.com/asset/web/favicons/favicon-192.png',
      alt: 'Oracle logo'
    },
    { 
      name: 'Cisco', 
      logo: 'https://www.cisco.com/c/dam/en_us/about/ac49/ac11/images/2020/cisco-logo-600.png',
      alt: 'Cisco logo'
    },
    { 
      name: 'Salesforce', 
      logo: 'https://www.salesforce.com/content/dam/web/en_us/www-refresh/images/logos/salesforce-logo.png',
      alt: 'Salesforce logo'
    },
    { 
      name: 'Intel', 
      logo: 'https://www.intel.com/content/dam/www/central-libraries/us/en/images/2020-07/29_16_18_SOCIAL_Intel_Logo_400x400_FINAL_RGBv2.png',
      alt: 'Intel logo'
    },
    { 
      name: 'Adobe', 
      logo: 'https://www.adobe.com/content/dam/cc/en/shared/images/product-icons/svg/creative-cloud.svg',
      alt: 'Adobe logo'
    },
    { 
      name: 'Nvidia', 
      logo: 'https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/logo-and-brand/01-nvidia-logo-t.png',
      alt: 'Nvidia logo'
    },
  ];

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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 md:p-8 h-32 sm:h-48 md:h-56 flex items-center justify-center hover:shadow-xl hover:border-[#004fa2]/20 transition-all duration-300 overflow-hidden relative">
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#004fa2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <img
                  src={partner.logo}
                  alt={partner.alt}
                  className="max-h-16 sm:max-h-32 md:max-h-40 max-w-full w-auto object-contain group-hover:scale-110 transition-transform duration-300 relative z-10"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'block';
                    }
                  }}
                />
                {/* Fallback text */}
                <span
                  className="text-gray-700 font-semibold text-center text-xs sm:text-sm relative z-10"
                  style={{ display: 'none' }}
                >
                  {partner.name}
                </span>
              </div>
              
              {/* Partner name below */}
              <h3 className="mt-2 sm:mt-4 text-xs sm:text-sm font-medium text-gray-700 group-hover:text-[#004fa2] transition-colors duration-200">
                {partner.name}
              </h3>
            </motion.div>
          ))}
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
