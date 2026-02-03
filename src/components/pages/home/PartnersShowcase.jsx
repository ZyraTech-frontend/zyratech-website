import React from 'react';

const partners = [
  { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { name: 'Google Cloud', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg' },
  { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
  { name: 'Oracle', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
  { name: 'Salesforce', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
];

const PartnersShowcase = () => {
  return (
    <>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 15s linear infinite;
        }
      `}</style>
      <section className="py-12 sm:py-16 bg-[#004fa2] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 sm:mb-8">OUR PARTNERS</h2>
        
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 sm:mb-16 max-w-4xl mx-auto leading-tight px-2 sm:px-0">
          At ZyraTech, our partnerships are the cornerstone of our mission to connect IT talent with global markets.
        </h3>

        <div className="bg-white rounded-lg py-6 sm:py-8 md:py-12 px-2 sm:px-4 md:px-8 overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center h-12 sm:h-16 w-24 sm:w-32 mx-4 sm:mx-8 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-8 sm:max-h-12 max-w-full object-contain filter brightness-0"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/120x60/333/fff?text=${partner.name.split(' ')[0]}`;
                  }}
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div key={`duplicate-${index}`} className="flex items-center justify-center h-12 sm:h-16 w-24 sm:w-32 mx-4 sm:mx-8 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-8 sm:max-h-12 max-w-full object-contain filter brightness-0"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/120x60/333/fff?text=${partner.name.split(' ')[0]}`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default PartnersShowcase;
