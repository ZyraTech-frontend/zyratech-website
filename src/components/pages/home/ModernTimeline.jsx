import React from "react";
import { FaFlagCheckered, FaRocket, FaBuilding, FaHandshake, FaChartLine, FaUsers } from "react-icons/fa";

const timeline = [
  {
    year: "2019",
    title: "Inception",
    description:
      "Start of operations in Takoradi, Ghana — first cohort trained at Zyra Tech Training Academy.",
    icon: FaFlagCheckered,
    color: "from-[#004fa2] to-[#2A2D7C]",
  },
  {
    year: "2020",
    title: "Service Centre",
    description: "Service Centre opens in Takoradi with our first European clients.",
    icon: FaBuilding,
    color: "from-[#5c3a21] to-[#7a4f33]",
  },
  {
    year: "2021",
    title: "Expansion",
    description: "Expansion to new cities; satellite offices and new cohorts begin training.",
    icon: FaRocket,
    color: "from-[#2A2D7C] to-[#004fa2]",
  },
  {
    year: "2022",
    title: "Scaling",
    description: "Service Centre opens in additional locations; European client work grows.",
    icon: FaChartLine,
    color: "from-[#7a4f33] to-[#5c3a21]",
  },
  {
    year: "2023",
    title: "Partnerships",
    description: "First partnerships with international corporations; move to larger office spaces.",
    icon: FaHandshake,
    color: "from-[#004fa2] to-[#5c3a21]",
  },
  {
    year: "2024",
    title: "Established — Koforidua",
    description:
      "Company formally established in 2024 in Koforidua. Collaboration with partners to train thousands and open new offices in key cities.",
    icon: FaUsers,
    color: "from-[#2A2D7C] to-[#7a4f33]",
    highlight: true,
  },
];

const ModernTimeline = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">Started in 2019 — Now We're Here!</h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-gray-200 to-gray-300 rounded" />

          <div className="space-y-10">
            {timeline.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              const Icon = item.icon;
              return (
                <div key={item.year} className="relative flex flex-col md:flex-row items-center md:items-stretch">
                  <div className={`md:w-1/2 md:pr-8 ${isLeft ? 'md:pr-12 md:pl-0' : 'md:pl-12 md:pr-0'} flex justify-${isLeft ? 'end' : 'start'}`}>
                    <div className={`w-full md:max-w-md bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1 ${item.highlight ? 'ring-4 ring-[#FFD580]/30' : ''}`}>
                      <div className="flex items-center gap-4 mb-2">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${item.color}`}>
                          <Icon />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">{item.year}</div>
                          <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </div>

                  {/* timeline marker */}
                  <div className="md:w-1/12 flex justify-center items-center z-10">
                    <div className="w-6 h-6 rounded-full bg-white border-4 border-gray-200 shadow-sm flex items-center justify-center -translate-y-2">
                      <div className="w-3 h-3 rounded-full bg-[#004fa2]" />
                    </div>
                  </div>

                  <div className={`md:w-1/12 md:pl-8 ${isLeft ? 'md:pl-0 md:pr-12' : 'md:pr-0 md:pl-12'} hidden md:flex`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernTimeline;
