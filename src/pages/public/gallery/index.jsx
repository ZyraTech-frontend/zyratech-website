import React, { useState } from 'react';
import FilterNavigation from '../../../components/pages/gallery/FilterNavigation';
import MediaGrid from '../../../components/pages/gallery/MediaGrid';

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden">
        <div className="max-w-none px-0">
          <div
            className="relative overflow-hidden h-[70vh] min-h-[400px] max-h-[700px] bg-cover bg-center bg-scroll md:bg-fixed"
            style={{
              backgroundImage: `url(/images/image1.png)`,
              filter: 'brightness(1.1) contrast(1.05)'
            }}
          >
            {/* Lighter Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#004fa2]/60 to-[#2A2D7C]/60" />

            {/* Content */}
            <div className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 h-full flex items-center justify-center">
              <div className="max-w-4xl text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
                  Our Gallery
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                  Explore our journey through innovation, training, and impact. Discover the stories behind our projects and the people who make it happen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Navigation */}
      <FilterNavigation
        onFilterChange={setActiveFilter}
        onSearchChange={setSearchTerm}
      />

      {/* Media Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <MediaGrid filters={{ category: activeFilter, searchTerm: searchTerm }} />
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
