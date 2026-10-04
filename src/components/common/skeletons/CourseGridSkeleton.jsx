/**
 * CourseGridSkeleton Component
 * Skeleton loader for course grid with multiple cards
 */

import CourseCardSkeleton from './CourseCardSkeleton';

const CourseGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" role="status" aria-label="Loading courses">
      {Array.from({ length: count }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default CourseGridSkeleton;
