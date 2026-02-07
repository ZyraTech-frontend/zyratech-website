import React from 'react';

const ParallaxDivider = ({
  heightClassName = 'h-64 sm:h-72 md:h-80',
  imageUrl = '/images/image3.png',
  className = '',
  overlayClassName = 'bg-black/60',
  bgPosition = 'bg-center',
  children
}) => (
  <section
    className={`hidden md:block relative ${heightClassName} bg-scroll md:bg-fixed motion-reduce:bg-scroll motion-reduce:md:bg-scroll ${bgPosition} bg-cover ${className}`}
    style={{ backgroundImage: `url('${imageUrl}')` }}
  >
    <div className={`absolute inset-0 ${overlayClassName}`} />
    {children ? (
      <div className="relative h-full flex items-center justify-center px-4">
        {children}
      </div>
    ) : null}
  </section>
);

export default ParallaxDivider;
