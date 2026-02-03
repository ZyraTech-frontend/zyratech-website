import React, { useState } from 'react';
import JobCard from './JobCard';
import { jobsData } from '../../../data/jobsData';
import { Search } from 'lucide-react';

const JobsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const types = ['all', ...new Set(jobsData.map(j => j.type))];
  
  const filtered = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || job.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-8 sm:mb-12">
        <div className="max-w-4xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4 sm:mb-6">Explore Opportunities</h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
            Join our mission to empower innovators and transform communities across Africa. Discover career opportunities that align with your passion for technology and social impact.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4 sm:mb-6">
          <Search className="absolute left-3 sm:left-4 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by job title or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent text-sm sm:text-base"
          />
        </div>

        {/* Type Filter */}
        <div className="flex gap-2 flex-wrap">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedType === type
                  ? 'bg-[#004fa2] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type === 'all' ? 'All Positions' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      {filtered.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {filtered.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-12">
          <p className="text-gray-600 text-base sm:text-lg">No positions match your search.</p>
        </div>
      )}
    </div>
  );
};

export default JobsList;
