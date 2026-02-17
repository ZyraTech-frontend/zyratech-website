import React, { useState, useEffect } from 'react';
import partnersService from '../../../services/partnersService';

const PartnersShowcase = () => {
  // Hardcoded partner as per user request to only show Royal Klast
  const partner = {
    name: "Royal Klast",
    logo: "/images/partnershiplogo.jpeg"
  };

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
              src={partner.logo}
              alt={partner.name}
              className="max-w-full h-auto object-contain max-h-32 sm:max-h-48 md:max-h-64 filter hover:grayscale-0 transition-all duration-300 mb-6"
            />
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{partner.name}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnersShowcase;
