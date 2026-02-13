import React, { useState, useEffect } from 'react';
import partnersService from '../../../services/partnersService';

const PartnersShowcase = () => {
  const [partner, setPartner] = useState(null);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const { data } = await partnersService.getAllPartnerships();
        const featured = data.filter(p => p.featured && p.status === 'active');

        if (featured.length > 0) {
          // Select a random featured partner to showcase
          const random = featured[Math.floor(Math.random() * featured.length)];
          setPartner({
            name: random.organization.name,
            logo: random.organization.logo
          });
        }
      } catch (error) {
        console.error('Failed to fetch spotlight partner:', error);
      }
    };
    fetchPartner();
  }, []);

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
              src={partner?.logo || "/images/partnershiplogo.jpeg"}
              alt={partner?.name || "Featured Partner"}
              className="max-w-full h-auto object-contain max-h-32 sm:max-h-48 md:max-h-64 filter hover:grayscale-0 transition-all duration-300 mb-6"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/partnershiplogo.jpeg";
              }}
            />
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{partner?.name || "Royal Klast"}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnersShowcase;
