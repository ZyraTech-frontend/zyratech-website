import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="py-6 sm:py-8 border-b border-gray-200 bg-white">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{job.title}</h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed line-clamp-3 mb-4 lg:mb-0">{job.description}</p>
          
          {/* Mobile location */}
          <div className="flex items-center gap-2 text-gray-600 mb-4 lg:hidden">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium">Remote / Hybrid / On-site</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 lg:gap-4 lg:flex-shrink-0">
          {/* Desktop location */}
          <div className="hidden lg:flex items-center gap-2 text-gray-600 min-w-max xl:mb-0 lg:mb-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium">Remote / Hybrid / On-site</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="bg-[#004fa2] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded hover:bg-[#003d7a] font-medium text-sm transition-colors"
            >
              Apply Now
            </button>
            
            <button
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="border-2 border-[#004fa2] text-[#004fa2] px-4 sm:px-6 py-2 sm:py-2.5 rounded hover:bg-[#004fa2]/10 font-medium text-sm transition-colors"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
