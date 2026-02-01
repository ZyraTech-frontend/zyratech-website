import React, { useState } from 'react';
import { Cpu, Code, Smartphone, Database, Sparkles, Settings } from 'lucide-react';

const WhatWeBuild = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'IoT & Hardware',
      description: 'Smart devices, sensors, Arduino/Raspberry Pi projects, automation systems',
      examples: ['Smart irrigation', 'Home automation', 'Environmental monitoring', 'Security systems'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Web Applications',
      description: 'Full-stack web apps, dashboards, e-commerce, management systems',
      examples: ['School portals', 'E-commerce sites', 'Booking systems', 'Admin dashboards'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile Apps',
      description: 'Android & iOS applications for business and personal use',
      examples: ['Delivery apps', 'Social platforms', 'Fitness trackers', 'Educational apps'],
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Data & Analytics',
      description: 'Data visualization, analytics platforms, reporting systems',
      examples: ['Business intelligence', 'Real-time dashboards', 'Data collection', 'Report generators'],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'AI & Machine Learning',
      description: 'Intelligent systems, predictions, image recognition, chatbots',
      examples: ['Recommendation systems', 'Image classification', 'Chatbots', 'Predictive models'],
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Custom Solutions',
      description: 'Unique projects tailored to your specific needs and requirements',
      examples: ['Research projects', 'Prototypes', 'Proof of concepts', 'Innovation challenges'],
      gradient: 'from-gray-600 to-gray-800'
    }
  ];

  return (
    <section id="what-we-build" className="pt-32 pb-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What We Can Build For You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From simple prototypes to complex systems, we handle projects across multiple domains
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl cursor-pointer"
              style={{
                transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)'
              }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="p-6 relative">
                {/* Icon and Title Row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-gray-700 flex-shrink-0">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 hover:text-[#004fa2] transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {category.description}
                </p>
                
                {/* Examples List */}
                <div className="space-y-2">
                  {category.examples.map((example, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start text-sm text-gray-500 transform transition-all duration-300"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeBuild;
