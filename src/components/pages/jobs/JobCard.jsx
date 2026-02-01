import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="py-8 border-b border-gray-200 flex gap-8 items-start justify-between bg-white">
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{job.title}</h3>
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{job.description}</p>
      </div>
      
      <div className="flex items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-2 text-gray-600 min-w-max">
          <MapPin className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium">{job.locations.join(' / ')}</span>
        </div>
        
        <button
          onClick={() => navigate(`/jobs/${job.id}`)}
          className="bg-[#004fa2] text-white px-6 py-2 rounded hover:bg-[#003d7a] font-medium text-sm whitespace-nowrap"
        >
          Apply Now
        </button>
        
        <button
          onClick={() => navigate(`/jobs/${job.id}`)}
          className="border-2 border-[#004fa2] text-[#004fa2] px-6 py-2 rounded hover:bg-[#004fa2]/10 font-medium text-sm whitespace-nowrap"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
