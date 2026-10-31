/**
 * RevenueBreakdownCard Component
 * Displays revenue distribution by source with donut chart
 */

import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

const RevenueBreakdownCard = ({ breakdown = {} }) => {
  const sources = [
    { 
      name: 'Training Courses', 
      value: breakdown.training || 0, 
      color: '#8b5cf6',
      percentage: 0
    },
    { 
      name: 'Job Postings', 
      value: breakdown.jobs || 0, 
      color: '#3b82f6',
      percentage: 0
    },
    { 
      name: 'Partnerships', 
      value: breakdown.partnerships || 0, 
      color: '#10b981',
      percentage: 0
    },
    { 
      name: 'Other Services', 
      value: breakdown.other || 0, 
      color: '#f59e0b',
      percentage: 0
    }
  ];

  // Calculate percentages
  const total = sources.reduce((sum, source) => sum + source.value, 0);
  sources.forEach(source => {
    source.percentage = total > 0 ? ((source.value / total) * 100).toFixed(1) : 0;
  });

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-gray-700">Revenue Sources</h3>
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUp size={12} />
          <span className="text-[10px] font-bold">+{breakdown.growth || 0}%</span>
        </div>
      </div>

      {/* Total Revenue */}
      <div className="mb-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <DollarSign size={16} className="text-blue-600" />
          <span className="text-[9px] text-gray-600 font-medium">Total Revenue</span>
        </div>
        <p className="text-xl font-bold text-gray-900">
          GHS {total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Sources List */}
      <div className="space-y-2">
        {sources.map((source, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-[10px] text-gray-600">{source.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-900">
                  GHS {source.value.toLocaleString()}
                </span>
                <span className="text-[9px] text-gray-500">
                  {source.percentage}%
                </span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ 
                  width: `${source.percentage}%`,
                  backgroundColor: source.color
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Highest Performer */}
      {sources.length > 0 && (
        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-[10px] text-green-700 font-semibold">
            🏆 Top performer: {sources.reduce((max, s) => s.value > max.value ? s : max, sources[0]).name}
          </p>
        </div>
      )}
    </div>
  );
};

export default RevenueBreakdownCard;
