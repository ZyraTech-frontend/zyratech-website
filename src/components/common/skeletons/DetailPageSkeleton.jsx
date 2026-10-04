/**
 * DetailPageSkeleton Component
 * Skeleton loader for job and course detail pages
 */

const DetailPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white animate-pulse" role="status" aria-label="Loading details">
      {/* Hero section skeleton */}
      <div className="bg-gray-200 h-64 sm:h-80 md:h-96 w-full"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb skeleton */}
        <div className="flex gap-2 mb-6 sm:mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-4 bg-gray-200 rounded-md w-20"></div>
              {i < 3 && <div className="h-4 bg-gray-200 rounded-md w-4"></div>}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main content skeleton */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Title skeleton */}
            <div>
              <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
            </div>
            
            {/* Content sections skeleton */}
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="space-y-3 sm:space-y-4">
                <div className="h-6 bg-gray-200 rounded-md w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-4/5"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Sidebar skeleton */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded-md w-full"></div>
                  <div className="h-3 bg-gray-200 rounded-md w-4/5"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPageSkeleton;
