import React, { useState } from 'react';
import Breadcrumb from './Breadcrumb';

const ProjectsHero = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Education', 'Health', 'Climate', 'Business'];
  
  const breadcrumbItems = [
    { label: 'Services', link: '/services/projects' },
    { label: 'Projects' }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <Breadcrumb items={breadcrumbItems} homePath="/services/projects" />

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-6 leading-tight">
            Real Projects. Real Impact.
          </h1>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="cta-btn px-6 py-3 font-semibold rounded-lg">
            View All Projects
          </button>
          <button className="cta-ghost px-6 py-3 font-medium rounded-lg">
            Submit a Project
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-[#004fa2] text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#004fa2] hover:text-[#004fa2]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsHero;

