import React from 'react';

const HrContactCard = ({
  name,
  title,
  imageUrl,
  heightClassName = 'h-96 md:h-[28rem]',
  className = ''
}) => {
  return (
    <div
      className={`relative rounded-xl overflow-hidden max-w-md sm:max-w-lg mx-auto md:ml-auto border-r-4 border-[#004fa2] shadow-[0_12px_24px_-12px_rgba(0,79,162,0.35)] ${className}`}
    >
      <div
        className={`w-full ${heightClassName} bg-cover bg-center`}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="absolute bottom-6 right-6 text-right">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{name}</h3>
        <div className="w-16 h-1 bg-[#004fa2] mb-2 ml-auto"></div>
        <p className="text-lg text-white">{title}</p>
      </div>
    </div>
  );
};

export default HrContactCard;
