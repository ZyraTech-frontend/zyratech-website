import React, { useState, useMemo, useEffect } from 'react';
import { Play, Grid, List, X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

const MediaGrid = ({ filters = {} }) => {
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null); // for modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // for modal navigation
  const [isFullscreen, setIsFullscreen] = useState(false); // fullscreen mode

  // Complete media packages
  const allMediaItems = [
    {
      id: 1,
      title: "SafeDrive IoT System Development",
      type: "package",
      thumbnail: "/images/image1.png",
      category: "projects",
      images: [
        "/images/image1.png",
        "/images/image2.png", 
        "/images/image3.png",
        "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png"
      ],
      keywords: ["iot", "safety", "smart", "development", "transportation"]
    },
    {
      id: 2,
      title: "EcoWatch Environmental Monitoring Platform",
      type: "package",
      thumbnail: "/images/image2.png",
      category: "projects",
      images: [
        "/images/image2.png",
        "/images/image3.png",
        "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
        "/images/image1.png"
      ],
      keywords: ["environment", "monitoring", "platform", "sensors", "data"]
    },
    {
      id: 3,
      title: "AgriZ Planter Precision Farming Solution",
      type: "package",
      thumbnail: "/images/image3.png",
      category: "projects",
      images: [
        "/images/image3.png",
        "/images/image1.png",
        "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
        "/images/image2.png"
      ],
      keywords: ["agriculture", "precision", "farming", "technology", "innovation"]
    },
    {
      id: 4,
      title: "Software Development Training Workshop",
      type: "package",
      thumbnail: "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
      category: "training",
      images: [
        "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
        "/images/image1.png",
        "/images/image2.png",
        "/images/image3.png"
      ],
      keywords: ["training", "software", "development", "workshop", "skills"]
    },
    {
      id: 5,
      title: "Mobile App Development Bootcamp",
      type: "package",
      thumbnail: "/images/image1.png",
      category: "training",
      images: [
        "/images/image1.png",
        "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
        "/images/image2.png",
        "/images/image3.png"
      ],
      keywords: ["mobile", "app", "development", "bootcamp", "programming"]
    },
    {
      id: 6,
      title: "Web Development Certification Program",
      type: "package",
      thumbnail: "/images/image2.png",
      category: "training",
      images: [
        "/images/image2.png",
        "/images/image3.png",
        "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
        "/images/image1.png"
      ],
      keywords: ["web", "development", "certification", "fullstack", "javascript"]
    },
    {
      id: 7,
      title: "Data Science and Analytics Training",
      type: "package",
      thumbnail: "/images/image3.png",
      category: "training",
      images: [
        "/images/image3.png",
        "/images/image1.png",
        "/images/image2.png",
        "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png"
      ],
      keywords: ["data", "science", "analytics", "machine", "learning"]
    },
    {
      id: 8,
      title: "IoT Solutions Implementation",
      type: "package",
      thumbnail: "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
      category: "projects",
      images: [
        "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
        "/images/image2.png",
        "/images/image3.png",
        "/images/image1.png"
      ],
      keywords: ["iot", "solutions", "implementation", "smart", "devices"]
    },
    {
      id: 9,
      title: "Team Building and Collaboration Session",
      type: "package",
      thumbnail: "/images/Dalene.png",
      category: "community",
      images: [
        "/images/Dalene.png",
        "/images/image1.png",
        "/images/image2.png",
        "/images/image3.png"
      ],
      keywords: ["team", "building", "collaboration", "community", "engagement"]
    },
    {
      id: 10,
      title: "Innovation Showcase 2024",
      type: "package",
      thumbnail: "/images/image1.png",
      category: "events",
      images: [
        "/images/image1.png",
        "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
        "/images/image2.png",
        "/images/image3.png"
      ],
      keywords: ["innovation", "showcase", "2024", "technology", "exhibition"]
    }
  ];

  // Filter and search functionality
  const filteredItems = useMemo(() => {
    let filtered = allMediaItems;

    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchLower) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    return filtered;
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
        setCurrentImageIndex(0);
        setIsFullscreen(false);
      } else if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : selectedItem.images.length - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev < selectedItem.images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-black mb-2">
              Media Gallery
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
              {filters.searchTerm && ` for "${filters.searchTerm}"`}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 sm:p-2 rounded-md transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#004fa2] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <Grid size={18} className="sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 sm:p-2 rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-[#004fa2] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="List View"
                aria-label="List View"
              >
                <List size={18} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        ) : (
          <>
            {/* Media Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 lg:grid-cols-2'
            }`}>
            {paginatedItems.map((item) => (
              <div 
                key={item.id} 
                className={`group cursor-pointer ${
                  viewMode === 'list' ? 'flex flex-col sm:flex-row gap-3 sm:gap-4' : ''
                }`}
                onClick={() => {
                  setSelectedItem(item);
                  setCurrentImageIndex(0);
                }}
              >
              
              {/* Media Thumbnail */}
              <div className={`relative overflow-hidden rounded-xl ${
                viewMode === 'list' ? 'w-full sm:w-48 h-40 sm:h-32 flex-shrink-0' : 'aspect-video'
              }`}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Category Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-[#004fa2]/90 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>

                {/* Package Indicator */}
                <div className="absolute top-2 right-2">
                  <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                    </svg>
                    {item.images.length}
                  </span>
                </div>
                  
                {/* Play Button for Videos */}
                {item.type === 'videos' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Play className="text-white ml-1" size={20} />
                    </div>
                  </div>
                )}

                {/* Duration */}
                {item.duration && (
                  <div className="absolute bottom-2 right-2">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {item.duration}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`${viewMode === 'list' ? 'flex-1' : 'mt-3'}`}>
                <h3 className="font-bold text-black group-hover:text-[#004fa2] transition-colors mb-1 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-sm text-gray-600 capitalize">{item.category}</p>
              </div>
            </div>
          ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-8 sm:mt-12">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? 'bg-[#004fa2] text-white'
                          : 'border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
          </>
        )}
        
        {/* Enhanced Modal for viewing */}
        {selectedItem && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50" 
            onClick={() => {
              setSelectedItem(null);
              setCurrentImageIndex(0);
              setIsFullscreen(false);
            }}
          >
            {/* Modal Container */}
            <div 
              className={`relative w-full h-full flex flex-col ${isFullscreen ? '' : 'max-w-7xl max-h-[95vh] sm:max-h-[90vh] m-4'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Controls */}
              <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 to-transparent p-3 sm:p-4 flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <h3 className="text-white text-base sm:text-lg md:text-xl font-bold line-clamp-2">
                    {selectedItem.title}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm mt-1 capitalize">
                    {selectedItem.category} • {selectedItem.images.length} {selectedItem.images.length === 1 ? 'photo' : 'photos'}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Fullscreen Toggle */}
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                    title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                    aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? <Minimize2 size={16} className="sm:w-5 sm:h-5" /> : <Maximize2 size={16} className="sm:w-5 sm:h-5" />}
                  </button>
                  
                  {/* Close Button */}
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      setCurrentImageIndex(0);
                      setIsFullscreen(false);
                    }}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                    aria-label="Close"
                  >
                    <X size={18} className="sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>

              {/* Main Image Area */}
              <div className="flex-1 flex items-center justify-center relative px-12 sm:px-16 py-16 sm:py-20">
                <img
                  src={selectedItem.images[currentImageIndex]}
                  alt={`${selectedItem.title} - Image ${currentImageIndex + 1}`}
                  className={`max-w-full max-h-full object-contain rounded-lg ${isFullscreen ? 'rounded-none' : ''}`}
                />

                {/* Navigation Buttons */}
                {selectedItem.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : selectedItem.images.length - 1))}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} className="sm:w-7 sm:h-7" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev < selectedItem.images.length - 1 ? prev + 1 : 0))}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} className="sm:w-7 sm:h-7" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {selectedItem.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                    {currentImageIndex + 1} / {selectedItem.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {selectedItem.images.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-4">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    {selectedItem.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all ${
                          currentImageIndex === index
                            ? 'ring-2 ring-white scale-105 opacity-100'
                            : 'opacity-50 hover:opacity-80'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
};

export default MediaGrid;

