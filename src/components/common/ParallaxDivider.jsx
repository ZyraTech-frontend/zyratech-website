import React from 'react';
import OptimizedImage from './OptimizedImage';

const ParallaxDivider = ({
  heightClassName = 'h-64 sm:h-72 md:h-80',
  imageUrl = "/images/image3.webp",
  className = '',
  overlayClassName = 'bg-black/60',
  bgPosition = 'bg-center',
  children
}) => (
  <section
    className={`hidden md:block relative ${heightClassName} bg-scroll md:bg-fixed motion-reduce:bg-scroll motion-reduce:md:bg-scroll ${bgPosition} bg-cover ${className}`}
    style={{ backgroundImage: `url('${imageUrl}')` }}
  >
    {/* Preload image for better performance */}
    <div className="hidden">
      <OptimizedImage
        src={imageUrl}
        alt="Decorative divider background"
        width={1920}
        height={400}
      />
    </div>
    <div className={`absolute inset-0 ${overlayClassName}`} />
    {children ? (
      <div className="relative h-full flex items-center justify-center px-4">
        {children}
      </div>
    ) : null}
  </section>
);

export default ParallaxDivider;
