import React from 'react';
import { Users, MapPin, TrendingUp } from 'lucide-react';

const timelineData = [
  { year: '2024', title: 'Established', desc: 'Zyra Tech Hub was formally established in Koforidua, Ghana.', icon: Users },
  { year: '2025', title: 'Expansion', desc: 'Expanded training cohorts and strengthened operations to serve more learners and clients.', icon: MapPin },
  { year: '2026', title: 'Growth', desc: 'Scaling with partners and clients to expand our training programs and services.', icon: TrendingUp },
];

const Timeline = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#004fa2] mb-6">Our Journey</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Key milestones from 2024 to 2026.</p>
        </div>

        <ol className="relative max-w-3xl mx-auto pl-6">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-[#004fa2]/20" />
          <div className="space-y-10 sm:space-y-12">
            {timelineData.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.year} className="relative">
                  <div className="absolute left-3 top-1 w-8 h-8 rounded-full bg-[#eaf6ff] flex items-center justify-center -translate-x-1/2 border border-[#004fa2]/20 shadow-sm">
                    <Icon className="w-4 h-4 text-[#004fa2]" />
                  </div>

                  <div className="ml-6 bg-white rounded-xl p-6 border border-[#004fa2]/10 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                      <div className="text-sm font-semibold text-[#004fa2] bg-[#004fa2]/10 px-3 py-1 rounded-full w-fit">{item.year}</div>
                      <div className="mt-2 sm:mt-0 text-base font-semibold text-gray-900">{item.title}</div>
                    </div>
                    <div className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">{item.desc}</div>
                  </div>
                </li>
              );
            })}
          </div>
        </ol>

        <div className="hidden mt-8">
          <svg className="w-full h-12" viewBox="0 0 1200 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 30 L1150 30" stroke="#dbeafe" strokeWidth="6" strokeLinecap="round" />
            {timelineData.map((_, i) => {
              const x = 50 + (1100 / (timelineData.length - 1)) * i;
              return <circle key={i} cx={x} cy={30} r={6} fill="#ff6a00" />;
            })}
            {/* small connecting traces to look 'circuit-like' */}
            {timelineData.map((_, i) => {
              const x = 50 + (1100 / (timelineData.length - 1)) * i;
              return <rect key={`r-${i}`} x={x - 2} y={20} width={4} height={6} fill="#ff6a00" opacity="0.6" />;
            })}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
