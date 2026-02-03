import React from 'react';
import { Star } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      company: 'Tech Innovation Hub',
      tier: 'Technology Partner',
      quote: 'Partnering with ZyraTech has amplified our impact in the community.',
      impact: '500+ students trained'
    },
    {
      company: 'Green Energy Solutions',
      tier: 'Sponsor Partner',
      quote: 'A meaningful way to invest in Africa\'s tech future.',
      impact: '10 projects funded'
    },
    {
      company: 'Local Community Center',
      tier: 'Community Partner',
      quote: 'Great collaboration that strengthens our neighborhood.',
      impact: '200+ participants'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600">See how our partners are making a difference</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{story.quote}"</p>
              <div className="border-t pt-4">
                <p className="font-bold text-gray-900">{story.company}</p>
                <p className="text-sm text-[#004fa2] font-semibold mb-2">{story.tier}</p>
                <p className="text-sm text-gray-600">{story.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
