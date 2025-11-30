import React, { useState } from 'react';

const PartnershipHero = () => {
  const [activeTab, setActiveTab] = useState('Corporate');

  const tabs = [
    'Educational',
    'Corporate', 
    'NGO & Government',
    'Technology'
  ];

  const tabContent = {
    'Educational': {
      title: 'Educational Partnerships',
      description: 'Introduce digital learning programs in your school. We work with schools to integrate practical technology training into their curriculum.',
      benefits: ['Digital learning programs', 'Teacher training support', 'Student internship opportunities', 'School IT infrastructure setup']
    },
    'Corporate': {
      title: 'Corporate Partnerships',
      description: 'Sponsor or host interns. Companies can support our programs through sponsorships and provide real-world internship opportunities.',
      benefits: ['Internship hosting', 'Talent pipeline development', 'CSR impact', 'Brand visibility']
    },
    'NGO & Government': {
      title: 'NGO & Government Partnerships',
      description: 'Support youth capacity-building initiatives. Collaborate with us to expand technology education and digital services.',
      benefits: ['Youth capacity building', 'Community reach', 'Policy alignment', 'Sustainable impact']
    },
    'Technology': {
      title: 'Technology Partnerships',
      description: 'Co-develop tools and solutions with us. Technology partners help us build innovative platforms and services.',
      benefits: ['Co-development opportunities', 'Innovation collaboration', 'Technology integration', 'Market expansion']
    }
  };

  return (
    <>
      {/* Hero Section - About Style */}
      <section className="pt-4 pb-8 sm:pt-6 sm:pb-10 lg:pt-8 lg:pb-12 bg-white from-white to-gray-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Card Container with Border Radius */}
          <div className="p-4 sm:p-6 sm:bg-[#004fa2] sm:rounded-xl sm:border sm:border-[#004fa2] sm:shadow-sm md:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              
              {/* Left Content */}
              <div className="max-w-xl">
                {/* Main Heading */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Let's Build the Future Together.
                  <br />
                  <span className="text-green-400">Collaboration Creates Impact.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 leading-relaxed">
                  Join forces with Zyra Tech Hub to transform education and technology in Ghana through partnerships, sponsorships, and donations.
                </p>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a 
                    href="#partnership-tabs"
                    className="bg-white hover:from-[#000000] hover:to-[#000000] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center justify-center gap-2 text-base w-full sm:w-auto"
                  >
                    Explore Partnership Opportunities
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Right Content - Gradient Box */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-white flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <p className="text-lg font-semibold">Partnership Opportunities</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Tabs Section */}
      <section id="partnership-tabs" className="pt-12 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Partnership Tabs */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-[#004fa2] text-white border-b-2 border-[#004fa2]'
                      : 'text-gray-600 hover:text-[#004fa2] hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white">
              <div className="max-w-4xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4 leading-tight">
                  {tabContent[activeTab].title}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                  {tabContent[activeTab].description}
                </p>
                
                {/* Key Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tabContent[activeTab].benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#004fa2] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnershipHero;



