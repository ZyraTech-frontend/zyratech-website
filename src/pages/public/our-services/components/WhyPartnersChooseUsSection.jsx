import React from 'react';
import { Link } from 'react-router-dom';

const WhyPartnersChooseUsSection = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-gray-900">Why partners choose us</h3>
          <p className="text-gray-600 mb-6">
            We combine deep technical expertise with local delivery and international market experience to reduce risk
            and accelerate impact.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white border border-gray-200/70 rounded-2xl shadow-sm">
              <h4 className="font-semibold mb-2">Reliable delivery</h4>
              <p className="text-gray-600 text-sm">Robust processes and QA ensure predictable outcomes.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200/70 rounded-2xl shadow-sm">
              <h4 className="font-semibold mb-2">Local teams</h4>
              <p className="text-gray-600 text-sm">On-the-ground teams who understand context and execution.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200/70 rounded-2xl shadow-sm">
              <h4 className="font-semibold mb-2">Market experience</h4>
              <p className="text-gray-600 text-sm">Support for market entry and scaling across regions.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200/70 rounded-2xl shadow-sm">
              <h4 className="font-semibold mb-2">Impact focus</h4>
              <p className="text-gray-600 text-sm">We measure outcomes and align work to impact goals.</p>
            </div>
          </div>
        </div>

        <aside className="bg-white border border-gray-200/70 rounded-2xl p-6 shadow-sm">
          <h4 className="text-lg font-semibold mb-3">Our value proposition</h4>
          <ul className="space-y-3 text-gray-700">
            <li>
              <span className="text-[#004fa2] mr-2">•</span>Local delivery + international reach
            </li>
            <li>
              <span className="text-[#004fa2] mr-2">•</span>Proven engineering practices
            </li>
            <li>
              <span className="text-[#004fa2] mr-2">•</span>Flexible engagement models
            </li>
          </ul>
          <div className="mt-6">
            <Link to="/partner/apply" className="block text-center cta-ghost px-4 py-3">
              Apply as a partner
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default WhyPartnersChooseUsSection;
