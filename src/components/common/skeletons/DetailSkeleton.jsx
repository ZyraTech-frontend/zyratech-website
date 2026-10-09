/**
 * DetailSkeleton Component
 * Unified skeleton loader for all detail pages
 * 
 * Variants:
 * - 'project': Projects detail page skeleton
 * - 'blog': Blog article detail skeleton
 * - 'album': Gallery album detail skeleton
 * - 'job': Job detail skeleton
 * - 'course': Training course detail skeleton
 * - 'default': Generic detail page skeleton
 */

import React from 'react';

const DetailSkeleton = ({ variant = 'default' }) => {
  // Generic skeleton for all types
  const renderGenericSkeleton = () => (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Header skeleton */}
      <div className="h-8 bg-gray-200 rounded w-32 mb-8 animate-pulse"></div>
      
      {/* Hero image skeleton */}
      <div className="w-full h-96 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
      
      {/* Title skeleton */}
      <div className="space-y-4 mb-8">
        <div className="h-12 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>

      {/* Content skeleton - two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-6 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Project-specific skeleton
  const renderProjectSkeleton = () => (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Back button */}
      <div className="h-6 bg-gray-200 rounded w-24 mb-6 animate-pulse"></div>
      
      {/* Hero image */}
      <div className="w-full h-96 bg-gray-200 rounded-2xl mb-8 animate-pulse"></div>
      
      {/* Title and meta */}
      <div className="space-y-4 mb-8">
        <div className="h-10 bg-gray-200 rounded w-2/3 animate-pulse"></div>
        <div className="flex gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="h-7 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
              <div className="space-y-2">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Blog-specific skeleton
  const renderBlogSkeleton = () => (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Back button */}
      <div className="h-6 bg-gray-200 rounded w-24 mb-6 animate-pulse"></div>
      
      {/* Featured image */}
      <div className="w-full h-96 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
      
      {/* Article metadata */}
      <div className="flex gap-4 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
        ))}
      </div>

      {/* Title */}
      <div className="space-y-3 mb-8">
        <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>

      {/* Article content */}
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="h-4 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  // Album/Gallery-specific skeleton
  const renderAlbumSkeleton = () => (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Back button */}
      <div className="h-6 bg-gray-200 rounded w-24 mb-6 animate-pulse"></div>
      
      {/* Album title */}
      <div className="space-y-3 mb-8">
        <div className="h-10 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      </div>

      {/* Image grid - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full h-64 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded w-10 animate-pulse"></div>
        ))}
      </div>
    </div>
  );

  // Job-specific skeleton
  const renderJobSkeleton = () => (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Back button */}
      <div className="h-6 bg-gray-200 rounded w-24 mb-6 animate-pulse"></div>
      
      {/* Title and company */}
      <div className="space-y-4 mb-8">
        <div className="h-10 bg-gray-200 rounded w-2/3 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-7 bg-gray-200 rounded w-1/3 mb-3 animate-pulse"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Course-specific skeleton
  const renderCourseSkeleton = () => (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Breadcrumb */}
      <div className="h-5 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
      
      {/* Hero section */}
      <div className="w-full h-80 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
      
      {/* Course info grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded p-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Content sections */}
      <div className="space-y-8">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <div className="h-7 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Select skeleton based on variant
  const skeletonMap = {
    project: renderProjectSkeleton,
    blog: renderBlogSkeleton,
    album: renderAlbumSkeleton,
    job: renderJobSkeleton,
    course: renderCourseSkeleton,
    default: renderGenericSkeleton,
  };

  const renderSkeleton = skeletonMap[variant] || renderGenericSkeleton;

  return (
    <div className="w-full">
      {renderSkeleton()}
    </div>
  );
};

export default DetailSkeleton;
