import React from 'react';

const JobsHero = () => {
  return (
    <div className="bg-[#004fa2] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black mb-4">Build Your Career With Us</h1>
        <p className="text-lg text-gray-200 max-w-2xl mb-6">
          Join ZyraTech and be part of a mission to empower innovators and transform communities across Africa through technology and innovation.
        </p>
        <div className="flex gap-4">
          <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-lg">
            <p className="text-sm text-gray-300">Open Positions</p>
            <p className="text-3xl font-bold">3+</p>
          </div>
          <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-lg">
            <p className="text-sm text-gray-300">Locations</p>
            <p className="text-3xl font-bold">3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsHero;
