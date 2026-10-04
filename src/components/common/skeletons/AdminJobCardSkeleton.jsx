/**
 * AdminJobCardSkeleton Component
 * Skeleton loader matching the admin job card layout
 */

const AdminJobCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col p-3 animate-pulse" role="status" aria-label="Loading job card">
      <div className="flex justify-between items-start mb-2">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-12"></div>
      </div>
      
      <div className="h-5 bg-gray-200 rounded-md w-3/4 mb-2"></div>
      <div className="space-y-1 mb-2">
        <div className="h-3 bg-gray-200 rounded-md w-full"></div>
        <div className="h-3 bg-gray-200 rounded-md w-5/6"></div>
      </div>
      
      <div className="mt-auto space-y-2 pt-2 border-t border-gray-50">
        <div className="h-3 bg-gray-200 rounded-md w-1/2"></div>
        <div className="flex items-center justify-between gap-2">
          <div className="h-5 bg-gray-200 rounded-full w-12"></div>
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-5 bg-gray-200 rounded w-5"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobCardSkeleton;
