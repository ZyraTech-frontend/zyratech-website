/**
 * QuickActionCard Component
 * Quick access cards for management pages
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const QuickActionCard = ({ icon: Icon, label, path, count, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
    cyan: 'from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700',
    pink: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700',
  };

  return (
    <Link
      to={path}
      className={`group relative bg-gradient-to-br ${colorClasses[color]} rounded-xl p-5 text-white transition-all duration-200 hover:shadow-lg hover:scale-105 overflow-hidden`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-6 -mt-6"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-4 -mb-4"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Icon size={20} />
          </div>
          {count !== undefined && (
            <div className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
              {count}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold mb-1">{label}</h3>
          <div className="flex items-center text-xs text-white/80 group-hover:text-white transition-colors">
            <span>Manage</span>
            <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuickActionCard;