/**
 * JobListSkeleton Component
 * Skeleton loader for job list with 3-4 cards
 */

import JobCardSkeleton from './JobCardSkeleton';

const JobListSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-3 sm:space-y-4" role="status" aria-label="Loading job listings">
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default JobListSkeleton;
