import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingSection = () => {
  const navigate = useNavigate();
  const [hoveredTier, setHoveredTier] = useState(null);

  const tiers = [
    {
      name: 'Business Projects',
      price: '2,000 - 5,000',
      description: 'For startups and small businesses',
      features: [
        'Full-stack applications',
        'Complex IoT systems',
        'Database integration',
        '4-8 weeks delivery',
        'Extended support',
        'Deployment assistance'
      ],
      highlight: false
    },
    {
      name: 'Student Projects',
      price: '500 - 2,000',
      description: 'Perfect for final year and capstone projects',
      features: [
        'Basic web or mobile app',
        'Simple IoT/hardware projects',
        'Documentation included',
        '2-4 weeks delivery',
        'Basic support',
        'Source code provided'
      ],
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Large-scale and custom solutions',
      features: [
        'Complex systems',
        'Multiple integrations',
        'Scalable architecture',
        'Flexible timeline',
        'Dedicated support',
        'Maintenance packages'
      ],
      highlight: false
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600">
            Affordable rates for students, competitive pricing for businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              onMouseEnter={() => setHoveredTier(index)}
              onMouseLeave={() => setHoveredTier(null)}
              className={`rounded-lg md:rounded-xl lg:rounded-2xl p-4 md:p-6 lg:p-8 transition-all duration-300 cursor-pointer ${
                tier.highlight 
                  ? 'bg-[#004fa2] text-white shadow-md md:shadow-lg lg:shadow-2xl lg:scale-105' 
                  : 'bg-white border-2 border-gray-200'
              } ${
                hoveredTier === index ? 'shadow-md md:shadow-lg lg:shadow-2xl -translate-y-0.5 md:-translate-y-1 lg:-translate-y-2' : ''
              }`}
            >
              {tier.highlight && (
                <div className="text-center mb-4">
                  <span className="bg-white text-[#004fa2] px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className={`text-xl md:text-2xl font-bold mb-2 ${tier.highlight ? 'text-white' : 'text-gray-900'}`}>
                {tier.name}
              </h3>
              <div className="mb-4">
                <span className={`text-2xl md:text-3xl font-bold ${tier.highlight ? 'text-white' : 'text-[#004fa2]'}`}>
                  GHS {tier.price}
                </span>
              </div>
              <p className={`mb-6 text-xs md:text-sm ${tier.highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                {tier.description}
              </p>
              
              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className={`w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0 ${tier.highlight ? 'text-white' : 'text-[#004fa2]'}`} />
                    <span className={`text-xs md:text-sm ${tier.highlight ? 'text-white' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => navigate('/projects/request')}
                className={`w-full py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm md:text-base ${
                  tier.highlight
                    ? 'bg-white text-[#004fa2] hover:bg-gray-100'
                    : 'bg-[#004fa2] text-white hover:bg-[#003d7a]'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            All prices are in Ghana Cedis (GHS). Final quote depends on project complexity and requirements.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
