import React, { useState } from 'react';
import { Cpu, Code, Smartphone, Database, Sparkles, Settings } from 'lucide-react';

const WhatWeBuild = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    {
      icon: <Cpu className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'IoT & Hardware',
      description: 'Smart devices, sensors, Arduino/Raspberry Pi projects, automation systems',
      examples: ['Smart irrigation', 'Home automation', 'Environmental monitoring', 'Security systems']
    },
    {
      icon: <Code className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'Web Applications',
      description: 'Full-stack web apps, dashboards, e-commerce, management systems',
      examples: ['School portals', 'E-commerce sites', 'Booking systems', 'Admin dashboards']
    },
    {
      icon: <Smartphone className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'Mobile Apps',
      description: 'Android & iOS applications for business and personal use',
      examples: ['Delivery apps', 'Social platforms', 'Fitness trackers', 'Educational apps']
    },
    {
      icon: <Database className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'Data & Analytics',
      description: 'Data visualization, analytics platforms, reporting systems',
      examples: ['Business intelligence', 'Real-time dashboards', 'Data collection', 'Report generators']
    },
    {
      icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'AI & Machine Learning',
      description: 'Intelligent systems, predictions, image recognition, chatbots',
      examples: ['Recommendation systems', 'Image classification', 'Chatbots', 'Predictive models']
    },
    {
      icon: <Settings className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: 'Custom Solutions',
      description: 'Unique projects tailored to your specific needs and requirements',
      examples: ['Research projects', 'Prototypes', 'Proof of concepts', 'Innovation challenges']
    }
  ];

  return (
    <section id="what-we-build" className="pt-24 sm:pt-32 md:pt-32 pb-12 sm:pb-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            What We Can Build For You
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            From simple prototypes to complex systems, we handle projects across multiple domains
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 transition-all duration-300 cursor-pointer hover:shadow-lg sm:hover:shadow-2xl hover:border-[#004fa2]/30"
              style={{
                transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-gray-700 flex-shrink-0 transition-transform duration-300" style={{
                  transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)'
                }}>
                  {category.icon}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 transition-colors duration-300" style={{
                  color: hoveredCard === index ? '#004fa2' : '#111827'
                }}>
                  {category.title}
                </h3>
              </div>
              
              <p className="text-gray-600 mb-4 text-xs sm:text-sm leading-relaxed">
                {category.description}
              </p>
              
              <div className="space-y-2">
                {category.examples.map((example, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start text-xs sm:text-sm text-gray-500 transition-all duration-300"
                    style={{
                      opacity: hoveredCard === index ? 1 : 0.7,
                      transform: hoveredCard === index ? 'translateX(4px)' : 'translateX(0)'
                    }}
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 mr-2 flex-shrink-0" />
                    <span>{example}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeBuild;
