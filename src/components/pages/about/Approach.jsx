import React from 'react';
import { Link } from 'react-router-dom';

const Approach = () => {
  return (
    <section className="py-20 bg-[#072733] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Our Approach Builds The Ecosystem And Creates
          <span className="block">Sustainable Growth In Ghana And Rwanda</span>
        </h2>

        <p className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          We have committed to training 3,000 individuals and providing 1,000 jobs by 2025 as
          part of the UN Decent Job For Youth Campaign.
        </p>

        <div>
          <Link
            to="/impact"
            className="inline-block bg-[#ff6a00] hover:bg-[#ff7f2a] text-white px-8 py-3 rounded-md font-semibold shadow-lg"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Approach;
