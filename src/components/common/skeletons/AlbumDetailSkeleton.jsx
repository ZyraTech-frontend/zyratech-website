/**
 * AlbumDetailSkeleton Component
 * Skeleton loader for album detail page with header and image grid
 */

const AlbumDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50" role="status" aria-label="Loading album details">
      {/* Header skeleton */}
      <div className="bg-white border-b border-gray-200 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded-md w-3/4"></div>
          
          {/* Meta info skeleton */}
          <div className="flex items-center gap-4">
            <div className="h-4 bg-gray-200 rounded-md w-32"></div>
            <div className="h-4 bg-gray-200 rounded-md w-24"></div>
          </div>
          
          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded-md w-full"></div>
            <div className="h-3 bg-gray-200 rounded-md w-5/6"></div>
          </div>
        </div>
      </div>

      {/* Main image skeleton */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl aspect-video bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-xl"></div>
      </div>

      {/* Thumbnail grid skeleton */}
      <div className="bg-white border-t border-gray-200 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-4 bg-gray-200 rounded-md w-40 mb-4"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i}
                className="aspect-square bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailSkeleton;
