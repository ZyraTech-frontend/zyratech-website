/**
 * StatCard Component - Compact version
 * Displays a single metric with icon, value, subtitle, and optional trend
 */

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ 
  icon: Icon, 
  title,
  subtitle,
  value, 
  trend,
  color = '#3b82f6',
  alert = false,
  onClick,
  compact = false
}) => {
  const isPositive = trend && trend > 0;

  if (compact) {
    return (
      <div 
        className={`bg-white rounded-lg p-4 border ${alert ? 'border-amber-300' : 'border-gray-100'} shadow-sm h-64 flex flex-col justify-center ${onClick ? 'cursor-pointer hover:shadow-md' : ''} transition-all duration-200`}
        onClick={onClick}
      >
        <div className="flex items-center justify-center mb-4">
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}15`, color: color }}
          >
            {Icon && <Icon size={28} />}
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-600 text-xs font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value?.toLocaleString() || 0}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          {trend !== undefined && trend !== null && (
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold mt-2 ${isPositive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {Math.abs(trend).toFixed(1)}%
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-white rounded-lg p-4 border ${alert ? 'border-amber-300' : 'border-gray-100'} shadow-sm hover:shadow-md transition-all duration-200 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          {Icon && <Icon size={20} />}
        </div>
        {trend !== undefined && trend !== null && (
          <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${isPositive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
            {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {Math.abs(trend).toFixed(1)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-500 text-[10px] font-medium mb-0.5">{title}</p>
        <p className="text-xl font-bold text-gray-900 mb-0.5">{value?.toLocaleString() || 0}</p>
        {subtitle && <p className="text-[10px] text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatCard;