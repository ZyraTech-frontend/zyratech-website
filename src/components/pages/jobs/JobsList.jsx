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
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore Opportunities</h2>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by job title or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
          />
        </div>

        {/* Type Filter */}
        <div className="flex gap-2 flex-wrap">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
        <div className="space-y-4">
          {filtered.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No positions match your search.</p>
        </div>
      )}
    </div>
  );
};

export default JobsList;
