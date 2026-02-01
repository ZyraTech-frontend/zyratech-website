import React from 'react';
import { Target, Users, TrendingUp, Globe } from 'lucide-react';

const WhyPartner = () => {
  const reasons = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Mission Alignment',
      description: 'Work with an organization dedicated to solving real community challenges through technology.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Impact',
      description: 'Directly contribute to empowering thousands of students and entrepreneurs across Africa.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Business Growth',
      description: 'Expand your reach, build brand reputation, and create new business opportunities.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Network',
      description: 'Connect with like-minded organizations and leaders transforming Africa\'s tech ecosystem.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Partner With ZyraTech?</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white rounded-xl p-8 text-center">
              <div className="text-[#004fa2] mb-4 flex justify-center">{reason.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPartner;
