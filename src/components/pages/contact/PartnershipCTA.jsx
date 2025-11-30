import React from 'react';
import { ArrowRight } from 'lucide-react';

const PartnershipCTA = () => {
  return (
    <section className="pt-2 pb-8 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Looking to partner with us?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white hover:from-[#000000] hover:to-[#000000] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md">
              Request Service
            </button>
            <button className="border-2 border-[#004fa2] text-[#004fa2] hover:bg-[#004fa2] hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 bg-white shadow-sm hover:shadow-md">
              Partner With Us
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PartnershipCTA;


