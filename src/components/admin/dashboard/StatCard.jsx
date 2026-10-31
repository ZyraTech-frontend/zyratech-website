/**
 * StatCard Component - Fixed to match dashboard usage
 * Displays a single metric with icon, value, subtitle, and optional trend
 */

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ 
  icon: Icon, 
  title,  // Changed from 'label' to match usage
  subtitle,  // Added subtitle prop
  value, 
  trend,  // trend value as number
  color = '#3b82f6',  // Now accepts hex color
  alert = false,  // Added alert prop
  onClick 
}) => {
  const isPositive = trend && trend > 0;

  return (
    <div 
      className={`bg-white rounded-xl p-5 border ${alert ? 'border-amber-300' : 'border-gray-100'} shadow-sm hover:shadow-md transition-all duration-200 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          {Icon && <Icon size={24} />}
        </div>
        {trend !== undefined && trend !== null && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${isPositive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(trend).toFixed(1)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-500 text-xs font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mb-1">{value?.toLocaleString() || 0}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatCard;
