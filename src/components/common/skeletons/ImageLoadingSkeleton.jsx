/**
 * ImageLoadingSkeleton Component
 * Skeleton loader for images, showing a shimmering placeholder while loading
 */

const ImageLoadingSkeleton = ({ 
  width = 'w-full', 
  height = 'h-96',
  className = '' 
}) => {
  return (
    <div 
      className={`${width} ${height} ${className} bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-lg`}
      role="status"
      aria-label="Loading image"
    />
  );
};

export default ImageLoadingSkeleton;
