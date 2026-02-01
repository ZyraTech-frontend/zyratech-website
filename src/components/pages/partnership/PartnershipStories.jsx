import React from 'react';

const PartnershipStories = () => {
  const stories = [
    {
      title: 'Tech Innovation Hub',
      category: 'Corporate Partner',
      story: 'By partnering with ZyraTech, we expanded our reach to underserved communities and trained 500+ students in cutting-edge technologies.',
      impact: '500+ students trained, 20+ internships created'
    },
    {
      title: 'Green Energy Solutions',
      category: 'Sponsor Partner',
      story: 'Our investment in ZyraTech initiatives has directly supported sustainable tech projects that address climate challenges across Africa.',
      impact: '10 green tech projects, 50+ jobs created'
    },
    {
      title: 'Local Community Center',
      category: 'Community Partner',
      story: 'Collaborating with ZyraTech brought digital skills training to our neighborhood, empowering 200+ youth with future-ready skills.',
      impact: '200+ participants, 85% employment rate'
    },
    {
      title: 'University of Ghana',
      category: 'Educational Partner',
      story: 'Our partnership enhanced curriculum with real-world projects, giving students practical experience in circular manufacturing and open-source development.',
      impact: '300+ students, 15+ capstone projects'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Partnership Stories</h2>
          <p className="text-lg text-gray-600">See how our partners are creating real impact</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{story.title}</h3>
                <p className="text-sm font-semibold text-[#004fa2]">{story.category}</p>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">"{story.story}"</p>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600"><strong>Impact:</strong> {story.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipStories;
