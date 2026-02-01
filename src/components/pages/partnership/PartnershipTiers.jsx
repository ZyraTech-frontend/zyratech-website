import React from 'react';
import { Check } from 'lucide-react';

const PartnershipTiers = () => {
  const tiers = [
    {
      name: 'Community Partner',
      description: 'Support our mission at grassroots level',
      price: 'Flexible',
      benefits: [
        'Logo on website',
        'Social media recognition',
        'Monthly newsletter feature',
        'Access to community events',
        'Collaboration opportunities'
      ],
      color: 'border-blue-200 bg-blue-50'
    },
    {
      name: 'Technology Partner',
      description: 'Provide technical expertise and resources',
      price: 'Custom',
      benefits: [
        'All Community benefits',
        'Featured case study',
        'Co-branded content',
        'Technical collaboration',
        'Priority support',
        'Quarterly business reviews'
      ],
      color: 'border-purple-200 bg-purple-50',
      featured: true
    },
    {
      name: 'Sponsor Partner',
      description: 'Financial support for our initiatives',
      price: 'Custom',
      benefits: [
        'All Technology benefits',
        'Exclusive sponsorship tier',
        'Event naming rights',
        'Annual recognition event',
        'Custom partnership package',
        'Executive engagement'
      ],
      color: 'border-green-200 bg-green-50'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Partnership Tiers</h2>
          <p className="text-lg text-gray-600">Choose the partnership level that works best for you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-xl border-2 p-8 transition-transform hover:scale-105 ${tier.color} ${
                tier.featured ? 'md:scale-105 shadow-xl' : ''
              }`}
            >
              {tier.featured && (
                <div className="bg-[#004fa2] text-white px-4 py-1 rounded-full inline-block mb-4 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
              <p className="text-gray-600 mb-4">{tier.description}</p>
              <div className="text-3xl font-bold text-[#004fa2] mb-6">{tier.price}</div>
              
              <ul className="space-y-3 mb-8">
                {tier.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full px-6 py-3 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-semibold">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipTiers;
