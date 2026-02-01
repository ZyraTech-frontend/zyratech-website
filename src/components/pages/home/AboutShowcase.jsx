import React from 'react';
import { Link } from 'react-router-dom';

const AboutShowcase = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              We Are Not A Classic Technology Provider
            </h2>
            
            <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
              <p>
                Unlike classic technology providers, we follow an integrated approach. Our clients work very closely with their ZyraTech teams on a day-to-day basis – as one team!
              </p>
              
              <p>
                Our goal is to establish long-term strategic partnerships adjusted to our client's individual needs, whether it's specific technical expertise, scaling opportunities or agile enablement. By adapting our training to the in-demand skills of our client base, we are able to provide sustainable and individual solutions for our clients to drive forward their digital agenda.
              </p>
            </div>

            <Link
              to="/about"
              className="inline-block bg-[#004fa2] hover:bg-[#003d7a] text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-colors duration-300 text-sm sm:text-base"
            >
              Learn more
            </Link>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute -right-2 sm:-right-4 -top-2 sm:-top-4 w-full h-full bg-[#004fa2] rounded-lg"></div>
            <img
              src="/images/team-collaboration.jpg"
              alt="ZyraTech team member working"
              className="relative w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutShowcase;