import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const CollaborationModelSection = ({ model, reverse = false }) => {
  return (
    <section id={model?.id} className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className={reverse ? 'lg:order-2' : ''}>
          <h3 className="text-3xl font-bold text-gray-900 mb-6">{model?.title}</h3>
          <ul className="space-y-5 text-gray-600">
            {(model?.bullets || []).map((b) => (
              <li key={b} className="flex items-start gap-4">
                <span className="text-orange-500 mt-1">
                  <CheckCircle size={18} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link to="/our-services" className="inline-block bg-orange-500 text-white px-8 py-3 font-semibold rounded-sm">
              Our Services
            </Link>
          </div>
        </div>

        <div className={reverse ? 'lg:order-1' : ''}>
          <div className="relative">
            <img
              src={model?.image}
              alt={model?.title}
              className="w-full h-72 sm:h-80 lg:h-[420px] object-cover"
              onError={(e) => {
                e.currentTarget.src = model?.imageFallback;
              }}
            />
            <div className="absolute top-0 right-0 h-full w-3 bg-orange-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationModelSection;
