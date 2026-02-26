import React from 'react';

const FullPageSkeleton = () => {
  return (
    <div role="status" aria-label="Loading content" className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Nav placeholder */}
        <div className="h-16 w-full rounded-md bg-gray-200 animate-pulse mt-6"></div>

        {/* Hero placeholder */}
        <div className="mt-6 w-full rounded-lg bg-gray-200 animate-pulse h-64 md:h-96"></div>

        {/* Content grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4 lg:col-span-2">
            <div className="h-6 w-3/4 rounded bg-gray-200 animate-pulse"></div>
            <div className="h-4 w-full rounded bg-gray-200 animate-pulse"></div>
            <div className="h-4 w-full rounded bg-gray-200 animate-pulse"></div>
            <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse"></div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-40 rounded bg-gray-200 animate-pulse"></div>
              <div className="h-40 rounded bg-gray-200 animate-pulse"></div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="h-8 w-2/3 rounded bg-gray-200 animate-pulse"></div>
            <div className="h-32 rounded bg-gray-200 animate-pulse"></div>
            <div className="h-20 rounded bg-gray-200 animate-pulse"></div>
          </aside>
        </div>

        {/* Repeated sections */}
        <div className="mt-10 space-y-6">
          <div className="h-6 w-1/3 rounded bg-gray-200 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-44 rounded bg-gray-200 animate-pulse"></div>
            <div className="h-44 rounded bg-gray-200 animate-pulse"></div>
            <div className="h-44 rounded bg-gray-200 animate-pulse"></div>
          </div>
        </div>

        {/* Footer placeholder */}
        <div className="mt-12 mb-8">
          <div className="h-24 w-full rounded bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default FullPageSkeleton;
