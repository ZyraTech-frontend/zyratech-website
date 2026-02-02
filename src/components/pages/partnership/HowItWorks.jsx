import React from 'react';
import { FileText, DollarSign, Users, Rocket } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      title: 'Submit Your Idea',
      description: 'Fill out our simple form with your project details, requirements, and timeline'
    },
    {
      number: '2',
      title: 'Get a Quote',
      description: 'We review your request and provide a detailed quote within 24 hours'
    },
    {
      number: '3',
      title: 'We Build Together',
      description: 'Collaborate with our team throughout development with regular updates'
    },
    {
      number: '4',
      title: 'Launch & Support',
      description: 'Deploy your project and get ongoing support for a successful launch'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">Simple, transparent process from idea to launch</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <span className="block">
                <span className="w-16 h-16 bg-[#004fa2] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {step.number}
                </span>
                <span className="text-xl font-bold text-gray-900 mb-2 block">{step.title}</span>
              </span>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;