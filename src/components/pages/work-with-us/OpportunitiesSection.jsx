import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

const openings = [
  { role: 'Full Stack Engineer', location: 'Accra, Ghana', type: 'Full-time' },
  { role: 'QA Engineer', location: 'Remote', type: 'Contract' },
  { role: 'Program Manager', location: 'Lagos, Nigeria', type: 'Full-time' },
];

const OpportunitiesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Opportunities</h2>
        <p className="text-gray-600 mb-10 text-base sm:text-lg max-w-2xl">
          We hire engineers, product builders, trainers and program leads. Below are some open roles — if you don't see a fit, still send us a note.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {openings.map((opening) => (
            <div 
              key={opening.role}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#004fa2]/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#004fa2] transition-colors">
                    {opening.role}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Clock size={14} />
                    <span>{opening.type}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                <MapPin size={14} className="text-[#004fa2]" />
                <span>{opening.location}</span>
              </div>

              <Link 
                to="/partner/apply"
                className="inline-flex items-center gap-2 text-[#004fa2] font-semibold text-sm group-hover:gap-3 transition-all"
              >
                Apply now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
