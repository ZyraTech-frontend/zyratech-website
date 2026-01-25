import React from 'react';

const CollaborationHeroSection = ({ hero }) => {
  return (
    <section className="bg-white">
      <div className="w-full">
        <img
          src={hero?.bannerImage}
          alt="Collaboration"
          className="w-full h-56 sm:h-72 lg:h-96 object-cover"
          onError={(e) => {
            e.currentTarget.src = hero?.bannerFallback;
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">{hero?.title}</h1>
        <p className="mt-5 text-gray-600 max-w-4xl mx-auto">{hero?.description}</p>
      </div>
    </section>
  );
};

export default CollaborationHeroSection;
