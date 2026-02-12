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
      <section className="py-12 sm:py-16 bg-[#004fa2] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 sm:mb-8">OUR PARTNERS</h2>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-8 sm:mb-16 max-w-4xl mx-auto leading-tight px-2 sm:px-0">
            At ZyraTech, our partnerships are the cornerstone of our mission to connect IT talent with global markets.
          </h3>

          <div className="bg-white rounded-lg py-6 sm:py-8 md:py-12 px-2 sm:px-4 md:px-8 flex flex-col justify-center items-center overflow-hidden">
            <img
              src="/images/partnershiplogo.jpeg"
              alt="Royal Klast"
              className="max-w-full h-auto object-contain max-h-32 sm:max-h-48 md:max-h-64 filter hover:grayscale-0 transition-all duration-300 mb-6"
            />
            <p className="text-xl sm:text-2xl font-bold text-gray-800">Royal Klast</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnersShowcase;
