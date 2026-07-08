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
    priority = false,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const loading = priority ? 'eager' : props.loading || 'lazy';
    const decoding = props.decoding || 'async';
    const fetchPriority = priority ? 'high' : props.fetchPriority || 'auto';

    return (
        <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
            {/* Pulse/Shimmer effect (Skeleton) while loading or on error */}
            {!isLoaded && !hasError && (
                <div className={`absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 motion-safe:animate-pulse ${skeletonClassName}`}>
                    <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.45)_35%,transparent_50%)] bg-[length:200%_100%] opacity-70" />
                </div>
            )}

            {/* Fallback pattern / color if image fails to load entirely */}
            {hasError && (
                <div className={`absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 text-sm ${skeletonClassName}`}>
                    <svg className="w-8 h-8 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                loading={loading}
                decoding={decoding}
                fetchPriority={fetchPriority}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
                {...props}
            />
        </div>
    );
};

export default ImageWithSkeleton;
