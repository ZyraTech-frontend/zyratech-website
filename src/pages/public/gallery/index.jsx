import React, { useState } from 'react';
import FilterNavigation from '../../../components/pages/gallery/FilterNavigation';
import MediaGrid from '../../../components/pages/gallery/MediaGrid';
import useSEO from '../../../hooks/useSEO';
import ImageWithSkeleton from '../../../components/common/ImageWithSkeleton';

const GalleryPage = () => {
  useSEO({
    title: 'Gallery',
    description: 'Explore photos and videos from Zyra Tech Hub\'s training programs, events, and student achievements in Koforidua, Ghana.',
    url: '/gallery',
    keywords: 'Zyra Tech gallery, Ghana tech training photos, student success photos, tech events Ghana'
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        {/* Background Image with Overlays */}
        <div className="absolute inset-0">
          <ImageWithSkeleton
            src="/images/FINAL/0B2A2001.jpg"
            alt="ZyraTech Gallery"
            className="h-full w-full"
            skeletonClassName="bg-gray-800"
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#004fa2]/25 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-20 sm:py-24 md:py-28 min-h-[420px] flex items-center">
          <div className="max-w-4xl mx-auto text-center w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Our Gallery
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-semibold text-white/90 max-w-3xl mx-auto leading-relaxed">
              Explore our journey through innovation, training, and impact. Discover the stories behind our projects and the people who make it happen.
            </p>
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
