import React from 'react';

const tools = [
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: 'border-orange-400' },
  { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: 'border-purple-500' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: 'border-blue-400' },
  { name: 'Jenkins', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', color: 'border-red-500' },
  { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: 'border-gray-300' },
  { name: 'Jira', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg', color: 'border-blue-600' },
  { name: 'Postman', logo: 'https://cdn.worldvectorlogo.com/logos/postman.svg', color: 'border-orange-600' },
  { name: 'Cypress', logo: 'https://asset.brandfetch.io/idIq_kF0rb/idv3zwmSiY.jpeg', color: 'border-green-400' },
  { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', color: 'border-blue-500' },
  { name: 'Selenium', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg', color: 'border-green-500' },
];

const ToolsOrbit = ({ tools = [] }) => {
  // If no tools provided, don't break, maybe render empty or null?
  // Or better, let parent handle data.
  const displayTools = tools && tools.length > 0 ? tools : [];

  if (displayTools.length === 0) return null;

  return (
    <section className="relative w-full min-h-[600px] md:min-h-[900px] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden py-20 md:py-40">

      {/* Central Hub */}
      <div className="relative z-10 w-40 h-40 md:w-64 md:h-64 rounded-full bg-white border-4 border-[#004fa2] flex items-center justify-center shadow-[0_0_50px_rgba(0,79,162,0.5)]">
        <img
          src="/zyratecpng.png"
          alt="ZyraTech Logo"
          className="w-28 h-28 md:w-48 md:h-48 object-contain"
        />
      </div>

      {/* The Orbiting Ring */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] border border-gray-300/30 rounded-full pointer-events-auto">
          {displayTools.map((tool, index) => {
            const angle = (index / displayTools.length) * 360;
            return (
              <div
                key={tool.name || index}
                style={{
                  transform: `rotate(${angle}deg) translate(${window.innerWidth < 768 ? 140 : 250}px) rotate(-${angle}deg)`,
                }}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-28 md:h-28 bg-white border-2 ${tool.color || 'border-gray-200'} rounded-2xl flex flex-col items-center justify-center shadow-lg hover:scale-125 transition-transform duration-300 cursor-help group`}
              >
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-8 h-8 md:w-16 md:h-16 object-contain mb-1"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <span className="text-[6px] md:text-[8px] font-medium text-gray-700">{tool.name}</span>
                <span className="absolute -top-10 bg-[#004fa2] text-white px-3 py-1.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  {tool.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>


    </section>
  );
};

export default ToolsOrbit;
