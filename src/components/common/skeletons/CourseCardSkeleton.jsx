/**
 * CourseCardSkeleton Component
 * Skeleton loader matching the CourseCard layout
 */

const CourseCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors animate-pulse" role="status" aria-label="Loading course card">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200"></div>
      
      {/* Content skeleton */}
      <div className="p-4 sm:p-6 space-y-3">
        <div className="h-4 bg-gray-200 rounded-md w-32"></div>
        <div className="h-6 bg-gray-200 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
        
        {/* Meta info skeleton */}
        <div className="flex items-center justify-between gap-2 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="h-3 bg-gray-200 rounded-md w-20"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded-md w-24"></div>
        </div>
        
        {/* CTA button skeleton */}
        <div className="h-10 bg-gray-200 rounded-md w-full mt-4"></div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
