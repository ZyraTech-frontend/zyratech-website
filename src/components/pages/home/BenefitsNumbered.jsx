import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Settings, Users, DollarSign, Handshake, Heart } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Low Risk',
    description: 'Commit-as-you-go model, coupled with globally recognized standards'
  },
  {
    icon: Settings,
    title: 'Client-Individual Set Up',
    description: 'Tailored competencies and cooperation models, adapted to your needs'
  },
  {
    icon: Users,
    title: 'Scalable',
    description: 'Build and grow teams: on-demand and adaptable'
  },
  {
    icon: DollarSign,
    title: 'Cost Efficiency',
    description: 'Commercial models more attractive than traditional off-shore options'
  },
  {
    icon: Handshake,
    title: 'Seamless Collaboration',
    description: 'Minimal time difference to entire teams with English as their native language'
  },
  {
    icon: Heart,
    title: 'Social Impact',
    description: 'Projects help fund initiatives closing the gender IT gap, coding for kids and our IT training academy'
  }
];

const BenefitsNumbered = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Benefits Of Working With Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Drive Forward Your Digital Agenda While Creating Social Impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="flex items-start gap-6 group">
                <div className="flex-shrink-0 w-16 h-16 bg-[#004fa2] rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <IconComponent className="w-5 h-5 text-[#004fa2]" />
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors">{benefit.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/work-with-us"
            className="inline-block bg-[#004fa2] hover:bg-[#003d7a] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BenefitsNumbered;
