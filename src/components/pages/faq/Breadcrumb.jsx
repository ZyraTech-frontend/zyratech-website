import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Breadcrumb = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm overflow-x-auto">
          <Link 
            to="/faq" 
            className="text-gray-600 hover:text-[#004fa2] transition-colors whitespace-nowrap flex-shrink-0"
          >
            Home
          </Link>
          
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
          
          <span className="text-black font-medium whitespace-nowrap">
            FAQ
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumb;

