import React from 'react';
import { Image } from '@unpic/react';

const OptimizedImage = ({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
  containerClassName = '',
  onError,
  ...props
}) => {
  const loading = priority ? 'eager' : props.loading || 'lazy';
  const decoding = props.decoding || 'async';
  const fetchPriority = priority ? 'high' : props.fetchPriority || 'auto';

  return (
    <div className={containerClassName}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout="constrained"
        priority={priority}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={className}
        onError={onError}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
