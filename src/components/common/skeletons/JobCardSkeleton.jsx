/**
 * JobCardSkeleton Component
 * Skeleton loader matching the JobCard layout
 */

const JobCardSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 sm:p-5 hover:border-gray-300 transition-colors animate-pulse" role="status" aria-label="Loading job card">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded-md w-24 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded-md w-20 shrink-0"></div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-200 rounded-md w-full"></div>
        <div className="h-3 bg-gray-200 rounded-md w-5/6"></div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-100">
        <div className="h-3 bg-gray-200 rounded-md w-40"></div>
        <div className="flex items-center gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;
