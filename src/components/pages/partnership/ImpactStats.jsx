import React from 'react';

const ImpactStats = () => {
  const stats = [
    { number: '50+', label: 'Active Partners' },
    { number: '10K+', label: 'Students Trained' },
    { number: '100+', label: 'Projects Completed' },
    { number: '5M+', label: 'Lives Impacted' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#004fa2] mb-2">{stat.number}</div>
              <p className="text-gray-600 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
