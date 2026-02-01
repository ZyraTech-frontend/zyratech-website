import React, { useState } from 'react';
import { FileText, MessageSquare, Code, Rocket } from 'lucide-react';

const HowItWorks = () => {
  const [hoveredStep, setHoveredStep] = useState(null);
  const steps = [
    {
      icon: <FileText className="w-5 h-5 md:w-7 md:h-7 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />,
      title: 'Submit Your Idea',
      description: 'Fill out our simple form with your project details, requirements, and timeline'
    },
    {
      icon: <MessageSquare className="w-5 h-5 md:w-7 md:h-7 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />,
      title: 'Get a Quote',
      description: 'We review your request and provide a detailed quote within 24 hours'
    },
    {
      icon: <Code className="w-5 h-5 md:w-7 md:h-7 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />,
      title: 'We Build Together',
      description: 'Collaborate with our team throughout development with regular updates'
    },
    {
      icon: <Rocket className="w-5 h-5 md:w-7 md:h-7 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />,
      title: 'Launch & Support',
      description: 'Deploy your project and get ongoing support for a successful launch'
    }
  ];

  return (
    <section className="py-16 bg-[#004fa2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-white/90">
            Simple, transparent process from idea to launch
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center transition-all duration-300 cursor-pointer hover:shadow-lg sm:hover:shadow-2xl"
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
              style={{
                transform: hoveredStep === index ? 'translateY(-8px)' : 'translateY(0)'
              }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-white/30 -z-10"></div>
              )}
              
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-8 lg:h-8 xl:w-10 xl:h-10 bg-[#004fa2] text-white rounded-full transition-transform duration-300" style={{
                  transform: hoveredStep === index ? 'scale(1.1)' : 'scale(1)'
                }}>
                  {step.icon}
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
              </div>
              <div className="absolute top-2 right-2 bg-[#004fa2] text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                {index + 1}
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
