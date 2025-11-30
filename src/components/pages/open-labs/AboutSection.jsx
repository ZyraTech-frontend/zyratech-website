import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-12 bg-white" id="about-labs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4 sm:px-6 lg:px-8">
        {/* Text Left */}
        <div className="flex-1 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#004fa2] mb-4">About the Labs</h2>
          <p className="text-gray-700 mb-5">
            Zyra Tech Hub Open Labs are community-driven innovation spaces where students, startups, and entrepreneurs access tools to prototype, test, and refine ideas. Robotics kits, electronics benches, computers, and expert mentorship are all available to help you create solutions for real problems—no matter your background or skill level.
          </p>
          <p className="text-gray-600">Innovation belongs to everyone – our labs ensure any idea can become reality.</p>
        </div>
        {/* Gradient Box Right */}
        <div className="flex-1 flex justify-center">
          <div
            className="rounded-2xl w-full max-w-md h-64 shadow-lg border border-gray-200 bg-white flex items-center justify-center"
          >
            <p className="text-gray-400 font-semibold">Open Labs Equipment</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;



