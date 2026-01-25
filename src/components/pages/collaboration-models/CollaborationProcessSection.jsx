import React from 'react';

const CollaborationProcessSection = ({ title = 'Our collaboration process', steps = [] }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">{title}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#004fa2] text-white flex items-center justify-center font-bold mb-4">
                {s.step}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h4>
              <p className="text-gray-600">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaborationProcessSection;
