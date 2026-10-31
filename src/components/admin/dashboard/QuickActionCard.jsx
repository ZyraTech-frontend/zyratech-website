/**
 * QuickActionCard Component - Compact version
 * Quick access cards for management pages
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';

const QuickActionCard = ({ title, count, color = '#3b82f6', onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-lg p-3 text-white transition-all duration-200 hover:shadow-lg hover:scale-105 overflow-hidden cursor-pointer"
      style={{ backgroundColor: color }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-4 -mt-4"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/5 rounded-full -ml-3 -mb-3"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <div className="text-sm font-bold">{count || 0}</div>
          </div>
          {count > 0 && (
            <div className="px-1.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[9px] font-bold">
              New
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xs font-bold mb-0.5">{title}</h3>
          <div className="flex items-center text-[10px] text-white/80 group-hover:text-white transition-colors">
            <span>View Details</span>
            <ArrowRight size={10} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;
