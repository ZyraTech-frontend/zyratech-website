import React from 'react';
import { Link } from 'react-router-dom';

const WhyPartnersChooseUsSection = () => {
  return (
    <section className="bg-[#004fa2] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 self-start">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
            Why partners choose <span className="whitespace-nowrap">Zyra Tech Hub</span>
          </h3>
          <p className="text-lg text-blue-100/90 mb-8 leading-relaxed">
            Based in Koforidua, Ghana, we combine hands-on training and internship talent with professional IT delivery—helping schools, businesses, and communities ship solutions that work in the real world.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white border border-gray-200/70 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Reliable delivery</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Robust processes and QA to deliver predictable outcomes—from planning to deployment.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200/70 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Local teams</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">On-the-ground teams who understand context and execution across Ghana.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200/70 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Market experience</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Support for rollout and scaling—especially across schools, SMEs, and community programs.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200/70 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Impact focus</h4>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Every partnership strengthens skills development and creates pathways for Ghana’s tech talent.</p>
            </div>
          </div>
        </div>

        <aside className="bg-white border border-gray-200/70 rounded-2xl p-6 shadow-sm mt-20">
          <h4 className="text-lg font-semibold mb-3 text-gray-900">Our value proposition</h4>
          <ul className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#004fa2] flex-shrink-0" />
              <span>
                <span className="font-semibold text-gray-900">Education + internship pipeline</span> — practical training that builds job-ready skills and delivery capacity.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#004fa2] flex-shrink-0" />
              <span>
                <span className="font-semibold text-gray-900">IT, networking & software delivery</span> — websites, systems, and infrastructure support tailored to your needs.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#004fa2] flex-shrink-0" />
              <span>
                <span className="font-semibold text-gray-900">Flexible partnership models</span> — project delivery, capacity building, and co-delivery designed for long-term impact.
              </span>
            </li>
          </ul>
          <div className="mt-6">
            <Link
              to="/partner/apply"
              className="block text-center cta-ghost px-4 py-3 font-semibold text-base sm:text-lg"
            >
              Apply as a partner
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default WhyPartnersChooseUsSection;
