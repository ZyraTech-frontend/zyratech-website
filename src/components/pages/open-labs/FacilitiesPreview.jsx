import React from 'react';
import { Printer, Cpu, Wrench, Cloud } from 'lucide-react';

const facilities = [
  {
    title: '3D Printing',
    description: 'Rapid prototyping of custom parts & devices.',
    icon: Printer,
    color: '#004fa2'
  },
  {
    title: 'Electronics Benches',
    description: 'Circuits, soldering, and device assembly.',
    icon: Cpu,
    color: '#004fa2'
  },
  {
    title: 'Machining Tools',
    description: 'Fabricate, cut, or shape components.',
    icon: Wrench,
    color: '#000000'
  },
  {
    title: 'Cloud Workstations',
    description: 'Advanced computers & connectivity for all.',
    icon: Cloud,
    color: '#004fa2'
  }
];

const FacilitiesPreview = () => {
  return (
    <section id="facilities" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3">
              Facilities Preview
            </h2>
          </div>
          <a
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 text-[#004fa2] hover:text-[#000000] font-semibold transition-colors group"
          >
            View All Facilities
          </a>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => {
            const IconComponent = facility.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:border-gray-300 group"
              >
                {/* Icon */}
                <div className="mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${facility.color}15`, border: `2px solid ${facility.color}30` }}
                  >
                    <IconComponent size={24} style={{ color: facility.color }} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#004fa2] transition-colors">
                  {facility.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {facility.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="sm:hidden flex justify-center mt-6">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#004fa2] hover:bg-[#000000] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View All Facilities
          </a>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesPreview;

