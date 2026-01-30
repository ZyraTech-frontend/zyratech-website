import React from 'react';
import { Building2, Globe2, TrendingUp } from 'lucide-react';

const setupPoints = [
  {
    icon: Building2,
    title: 'Strategic Location & Partnership',
    description: 'ZyraTech Hub, headquartered in Koforidua, Ghana, serves as the primary contracting partner for local and international clients. We eliminate legal complexities and mitigate security risks while ensuring seamless collaboration between our Ghanaian teams and global partners.'
  },
  {
    icon: Globe2,
    title: 'Operational Excellence',
    description: 'Our Ghana-based operations provide the infrastructure and expertise to rapidly deploy specialized tech teams tailored to client requirements. We manage all processes internally, ensuring efficiency, transparency, and accountability throughout project lifecycles.'
  },
  {
    icon: TrendingUp,
    title: 'Social Impact Mission',
    description: 'As a social enterprise, we reinvest surplus revenue into expanding our training programs and launching community impact initiatives. Our business model creates sustainable value for clients while advancing technology education and economic opportunity across Ghana.'
  }
];

const HowWeAreSetUpSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">How Are We Set Up?</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            A strategic structure designed for seamless collaboration and sustainable impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {setupPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-[#004fa2]/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-[#004fa2] flex items-center justify-center mb-4">
                  <IconComponent className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{point.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowWeAreSetUpSection;
