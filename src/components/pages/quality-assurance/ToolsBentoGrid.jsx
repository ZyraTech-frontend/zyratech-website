import React from 'react';

const toolsData = [
  {
    category: 'Cloud & Infrastructure',
    tools: [
      { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
      { name: 'GCP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' }
    ],
    span: 'md:col-span-2 md:row-span-2',
    bgGradient: 'from-[#5B9BD5]/10 to-[#5B9BD5]/5'
  },
  {
    category: 'Testing & QA',
    tools: [
      { name: 'Selenium', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg' },
      { name: 'JUnit', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/junit/junit-original.svg' },
      { name: 'Cypress', logo: 'https://asset.brandfetch.io/idIq_kF0rb/idv3zwmSiY.jpeg' },
      { name: 'TestNG', logo: 'https://avatars.githubusercontent.com/u/12528662?s=200&v=4' }
    ],
    span: 'md:col-span-2',
    bgGradient: 'from-[#002D25]/10 to-[#002D25]/5'
  },
  {
    category: 'Design & UI',
    tools: [
      { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Adobe', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' }
    ],
    span: 'md:col-span-2',
    bgGradient: 'from-[#004fa2]/10 to-[#003d7a]/10'
  },
  {
    category: 'DevOps',
    tools: [
      { name: 'Jenkins', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
      { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'SonarQube', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg' }
    ],
    span: 'md:col-span-1',
    bgGradient: 'from-[#003d7a]/10 to-[#004fa2]/10'
  },
  {
    category: 'API Tools',
    tools: [
      { name: 'Postman', logo: 'https://cdn.worldvectorlogo.com/logos/postman.svg' },
      { name: 'Jira', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' }
    ],
    span: 'md:col-span-1',
    bgGradient: 'from-[#5B9BD5]/10 to-[#004fa2]/10'
  },
  {
    category: 'Collaboration',
    tools: [
      { name: 'Slack', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg' },
      { name: 'MS Teams', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-teams-1.svg' },
      { name: 'Confluence', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg' }
    ],
    span: 'md:col-span-2',
    bgGradient: 'from-[#004fa2]/10 to-[#5B9BD5]/10'
  }
];

const ToolsBentoGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
      {toolsData.map((category, index) => (
        <div
          key={index}
          className={`${category.span} group relative bg-gradient-to-br ${category.bgGradient} backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#004fa2]/20 hover:border-[#004fa2]/40 overflow-hidden min-h-[200px] sm:min-h-[220px] lg:min-h-0`}
        >
          {/* Animated gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#004fa2]/0 to-[#004fa2]/0 group-hover:from-[#004fa2]/8 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
          
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className={`relative flex flex-col ${category.category === 'Cloud & Infrastructure' || category.category === 'Collaboration' || category.category === 'Testing & QA' || category.category === 'Design & UI' ? 'md:justify-center md:items-center md:h-full' : ''}`}>
            <h3 className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider text-gray-800 mb-4 sm:mb-5 group-hover:text-[#004fa2] transition-colors duration-300 relative">
              {category.category}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#004fa2] group-hover:w-full transition-all duration-500"></span>
            </h3>
            <div className={`flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-3 lg:gap-4 ${category.category === 'Cloud & Infrastructure' || category.category === 'Collaboration' || category.category === 'Testing & QA' || category.category === 'Design & UI' ? 'md:justify-center' : ''}`}>
              {category.tools.map((tool, toolIndex) => (
                <div
                  key={toolIndex}
                  className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/50 hover:bg-white/90 border border-gray-200/60 hover:border-[#004fa2]/60 shadow-sm hover:shadow-lg transition-all duration-300 group/tool cursor-pointer transform hover:scale-105 backdrop-blur-sm w-full sm:w-auto"
                >
                  <img 
                    src={tool.logo} 
                    alt={tool.name}
                    className={`${category.category === 'Cloud & Infrastructure' ? 'w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20' : 'w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16'} object-contain group-hover/tool:scale-110 transition-transform duration-300 drop-shadow-sm`}
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <span className="text-xs sm:text-sm lg:text-base font-bold text-gray-800 group-hover/tool:text-[#004fa2] transition-colors duration-300">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolsBentoGrid;
