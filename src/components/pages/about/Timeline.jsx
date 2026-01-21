import React from 'react';
import { Users, Building, MapPin, Globe, Handshake, TrendingUp } from 'lucide-react';

const timelineData = [
  { year: '2019', title: 'Inception', desc: 'Start of operations in Takoradi, Ghana. First cohort starts training at the Zyra Tech Training Academy.', icon: Users },
  { year: '2020', title: 'Service Centre', desc: 'Service Centre opens in Takoradi with first European clients.', icon: Building },
  { year: '2021', title: 'Expansion', desc: 'Expansion to new cities; satellite offices and cohorts start training.', icon: MapPin },
  { year: '2022', title: 'Scaling', desc: 'Service Centre opens in additional locations; European clients scale with us.', icon: Globe },
  { year: '2023', title: 'Partnerships', desc: 'First partnerships with international corporations; move to larger office spaces.', icon: Handshake },
  { year: '2024', title: 'Growth', desc: 'Collaboration with partners to train thousands and open new offices in key cities.', icon: TrendingUp },
];

const Timeline = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-[#004fa2] mb-10">Started in 2019 - Now We're Here!</h2>

        <div className="relative">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="relative pl-8">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
              <div className="space-y-12">
                {timelineData.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.year} className="relative flex flex-col sm:flex-row gap-6 items-start">
                      <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-[#eaf6ff] flex items-center justify-center -translate-x-1/2 border border-white/60 shadow-sm">
                        <Icon className="w-4 h-4 text-[#60a5fa]" />
                      </div>

                      <div className="sm:w-1/4 text-right pr-6">
                        <div className="text-2xl font-bold text-[#004fa2]">{item.year}</div>
                      </div>

                      <div className="sm:w-3/4">
                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                          <div className="text-sm font-semibold text-gray-700 mb-2">{item.title}</div>
                          <div className="text-sm text-gray-600">{item.desc}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
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
