import React, { useState } from 'react';

/**
 * ImageWithSkeleton - A reusable component that displays a shimmering skeleton
 * while the image is loading, and smoothly fades in the image once it's ready.
 *
 * @param {string} src - The source URL of the image
 * @param {string} alt - Alternative text for the image
 * @param {string} className - Additional CSS classes applied to the container and image
 * @param {string} skeletonClassName - Additional CSS classes applied uniquely to the skeleton payload (e.g. rounded corners)
 * @param {object} props - Any other props passed down to the img element
 */
const ImageWithSkeleton = ({
    src,
    alt = '',
    className = '',
    skeletonClassName = '',
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Pulse/Shimmer effect (Skeleton) while loading or on error */}
            {!isLoaded && !hasError && (
                <div className={`absolute inset-0 bg-gray-200 animate-pulse ${skeletonClassName}`} />
            )}

            {/* Fallback pattern / color if image fails to load entirely */}
            {hasError && (
                <div className={`absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 text-sm ${skeletonClassName}`}>
                    <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                </div>
            )}

            {/* Actual Image */}
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                {...props}
            />
        </div>
    );
};

export default ImageWithSkeleton;
