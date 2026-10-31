/**
 * QuickActionCard Component - Fixed to match dashboard usage, solid colors only
 * Quick access cards for management pages
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';

const QuickActionCard = ({ title, count, color = '#3b82f6', onClick, path }) => {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-xl p-5 text-white transition-all duration-200 hover:shadow-lg hover:scale-105 overflow-hidden cursor-pointer"
      style={{ backgroundColor: color }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-6 -mt-6"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-4 -mb-4"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <div className="text-xl font-bold">{count || 0}</div>
          </div>
          {count > 0 && (
            <div className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
              New
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold mb-1">{title}</h3>
          <div className="flex items-center text-xs text-white/80 group-hover:text-white transition-colors">
            <span>View Details</span>
            <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;
