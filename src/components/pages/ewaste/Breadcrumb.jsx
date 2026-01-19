import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = () => {
  return (
    <nav className="bg-gray-50 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm overflow-x-auto">
          <Link 
            to="/donate" 
            className="text-gray-500 hover:text-[#004fa2] transition-colors duration-200 whitespace-nowrap flex-shrink-0"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
          <Link 
            to="/donate" 
            className="text-gray-500 hover:text-[#004fa2] transition-colors duration-200 whitespace-nowrap flex-shrink-0"
          >
            Donate
          </Link>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
          <span className="text-gray-900 font-medium whitespace-nowrap">E-Waste Donation</span>
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumb;

