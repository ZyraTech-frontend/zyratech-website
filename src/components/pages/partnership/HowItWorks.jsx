import React from 'react';
import { MessageSquare, FileText, Handshake, Rocket } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Connect',
      description: 'Reach out to discuss partnership opportunities'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Explore',
      description: 'Review partnership tiers and benefits'
    },
    {
      icon: <Handshake className="w-6 h-6" />,
      title: 'Collaborate',
      description: 'Finalize terms and begin partnership'
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Grow',
      description: 'Build impact together with ZyraTech'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">Simple steps to become a ZyraTech partner</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-[#004fa2] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
