import React from 'react';

const YearCard = ({ year, title, children }) => (
  <div className="flex-1 text-center px-4">
    <div className="flex justify-center mb-4">
      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow">
        <div className="w-8 h-8 bg-[#f1f8fb] rounded-full flex items-center justify-center text-[#0b4f57] font-semibold">•</div>
      </div>
    </div>
    <div className="text-2xl font-bold text-[#0b4f57] mb-2">{year}</div>
    <div className="text-sm text-gray-600 max-w-[220px] mx-auto">{children}</div>
  </div>
);

const Timeline = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-[#0b4f57] mb-10">Started in 2019 - Now We're Here!</h2>

        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 justify-between">

          <YearCard year="2019" title="Start">
            Start of operations in Takoradi, Ghana. First cohort starts training at the Zyra Tech Training Academy.
          </YearCard>

          <div className="hidden lg:flex items-center">
            <svg width="120" height="48" viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 24 C30 10, 60 10, 90 24" stroke="#ff6a00" strokeWidth="2" strokeDasharray="4 6" strokeLinecap="round" />
            </svg>
          </div>

          <YearCard year="2020" title="Service Centre">
            Service Centre opens in Takoradi with first European clients.
          </YearCard>

          <div className="hidden lg:flex items-center">
            <svg width="120" height="48" viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 24 C30 38, 60 38, 90 24" stroke="#ff6a00" strokeWidth="2" strokeDasharray="4 6" strokeLinecap="round" />
            </svg>
          </div>

          <YearCard year="2021" title="Expansion">
            Expansion to new cities; satellite offices and cohorts start training.
          </YearCard>

          <div className="hidden lg:flex items-center">
            <svg width="120" height="48" viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 24 C30 10, 60 10, 90 24" stroke="#ff6a00" strokeWidth="2" strokeDasharray="4 6" strokeLinecap="round" />
            </svg>
          </div>

          <YearCard year="2022" title="Scaling">
            Service Centre opens in additional locations; European clients scale with us.
          </YearCard>

          <div className="hidden lg:flex items-center">
            <svg width="120" height="48" viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 24 C30 38, 60 38, 90 24" stroke="#ff6a00" strokeWidth="2" strokeDasharray="4 6" strokeLinecap="round" />
            </svg>
          </div>

          <YearCard year="2023" title="Partnerships">
            First partnerships with international corporations; move to larger office spaces.
          </YearCard>

          <div className="hidden lg:flex items-center">
            <svg width="120" height="48" viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 24 C30 10, 60 10, 90 24" stroke="#ff6a00" strokeWidth="2" strokeDasharray="4 6" strokeLinecap="round" />
            </svg>
          </div>

          <YearCard year="2024" title="Growth">
            Collaboration with partners to train thousands and open new offices in key cities.
          </YearCard>

        </div>
      </div>
    </section>
  );
};

export default Timeline;
