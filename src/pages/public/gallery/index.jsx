import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
          <img 
            decoding="async"
            src="/images/FINAL/0B2A2001.webp"
            alt="ZyraTech Gallery"
            className="h-full w-full object-cover brightness-110"
            loading="eager"
            fetchPriority="high"
            style={{ objectPosition: 'center 30%' }}
          />
          {/* Consistent Gradient from left to dark */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-24 md:py-32 h-[75vh] min-h-[500px] max-h-[700px] flex items-center justify-start">
          <motion.div 
            className="max-w-5xl w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 tracking-tight text-white"
            >
              Our Gallery
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
              className="text-base md:text-lg lg:text-xl font-normal text-gray-200 mb-8 leading-relaxed max-w-2xl"
            >
              Explore our journey through innovation, training, and impact. Discover the stories behind our projects and the people who make it happen.
            </motion.p>
          </motion.div>
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
