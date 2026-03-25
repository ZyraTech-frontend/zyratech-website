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
  return (
    <div className={containerClassName}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout="constrained"
        priority={priority}
        className={className}
        onError={onError}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
