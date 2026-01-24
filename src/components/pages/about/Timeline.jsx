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

        <div className="hidden md:block">
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute left-0 right-0 top-6 -translate-y-1/2 h-2 bg-[#004fa2] rounded-full" />

            <div className="grid grid-cols-3 gap-8">
              {timelineData.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.year} className="relative pt-12 group">
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center border border-[#004fa2]/25 shadow-sm z-10 transition-transform duration-200 group-hover:scale-105 group-focus-within:scale-105">
                      <Icon className="w-5 h-5 text-[#004fa2]" />
                    </div>

                    <div className="text-center">
                      <div className="inline-flex text-sm font-semibold text-[#004fa2] bg-[#004fa2]/10 px-3 py-1 rounded-full">
                        {item.year}
                      </div>
                    </div>

                    <div
                      tabIndex={0}
                      className="mt-4 bg-white rounded-2xl p-6 border-[3px] border-[#004fa2] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004fa2]/35 focus-visible:ring-offset-2"
                    >
                      <div className="text-lg font-semibold text-gray-900">{item.title}</div>
                      <div className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <ol className="relative max-w-5xl mx-auto">
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 -translate-x-1/2 w-2 bg-[#004fa2] rounded-full" />
            <div className="space-y-8 sm:space-y-10">
              {timelineData.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.year} className="relative group">
                    <div className="absolute left-4 sm:left-6 top-6 w-10 h-10 rounded-full bg-white flex items-center justify-center -translate-x-1/2 border border-[#004fa2]/25 shadow-sm transition-transform duration-200 group-hover:scale-105 group-focus-within:scale-105">
                      <Icon className="w-5 h-5 text-[#004fa2]" />
                    </div>

                    <div className="pl-12 sm:pl-16">
                      <div className="grid gap-3 sm:gap-4 sm:grid-cols-[140px_1fr] items-start">
                        <div className="pt-2">
                          <div className="text-sm font-semibold text-[#004fa2] bg-[#004fa2]/10 px-3 py-1 rounded-full w-fit">
                            {item.year}
                          </div>
                        </div>

                        <div
                          tabIndex={0}
                          className="bg-white rounded-2xl p-6 border-[3px] border-[#004fa2] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004fa2]/35 focus-visible:ring-offset-2"
                        >
                          <div className="text-lg font-semibold text-gray-900">{item.title}</div>
                          <div className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">{item.desc}</div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </div>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
