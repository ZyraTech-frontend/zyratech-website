import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Settings, Users, DollarSign, Handshake, Heart, CheckCircle } from 'lucide-react';

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

const BenefitsSplit = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Benefits Of Working With Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Drive Forward Your Digital Agenda While Creating Social Impact
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <img
              src="/images/benefits-team.jpg"
              alt="Team collaboration benefits"
              className="w-full h-96 object-cover rounded-xl shadow-lg"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop';
              }}
            />
          </div>

          <div className="space-y-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#004fa2] rounded-lg flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#004fa2] transition-colors">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
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

export default BenefitsSplit;
