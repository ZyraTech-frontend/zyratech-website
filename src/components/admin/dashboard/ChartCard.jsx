/**
 * ChartCard Component - Fixed with safe defaults and solid colors
 * Revenue/Engagement chart with period toggle
 */

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const ChartCard = ({ title = 'Revenue Trend', data = [], type = 'bar', metric = 'Revenue' }) => {
  const [period, setPeriod] = useState('monthly');

  // Safe data processing
  const safeData = Array.isArray(data) && data.length > 0 ? data : [
    { month: 'Jan', revenue: 0 },
    { month: 'Feb', revenue: 0 },
    { month: 'Mar', revenue: 0 },
    { month: 'Apr', revenue: 0 },
    { month: 'May', revenue: 0 },
    { month: 'Jun', revenue: 0 }
  ];

  const maxValue = Math.max(...safeData.map(d => Number(d.amount || d.value || d.revenue) || 0), 1);
  const peakMonth = safeData.reduce((max, d) => {
    const currentVal = Number(d.amount || d.value || d.revenue) || 0;
    const maxVal = Number(max.amount || max.value || max.revenue) || 0;
    return currentVal > maxVal ? d : max;
  }, safeData[0]);

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              period === 'monthly'
                ? 'bg-[#1a7f64] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPeriod('annually')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              period === 'annually'
                ? 'bg-[#1a7f64] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Annually
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-around gap-3 px-2">
          {safeData.map((item, index) => {
            const value = Number(item.amount || item.value || item.revenue) || 0;
            const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
            const isPeak = item.month === peakMonth?.month;

            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center mb-2">
                  {isPeak && value > 0 && (
                    <div className="mb-1 px-2 py-0.5 bg-[#1a7f64] text-white rounded text-[10px] font-bold">
                      {(value / 1000).toFixed(1)}k
                    </div>
                  )}
                  <div
                    className="w-full bg-[#1a7f64] rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer relative group"
                    style={{ height: `${percentage}%`, minHeight: '8px' }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      GHS {value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.1)_4px,rgba(255,255,255,0.1)_8px)]"></div>
                  </div>
                </div>
                <p className="text-[10px] font-medium text-gray-500 mt-2">{item.month || `M${index + 1}`}</p>
              </div>
            );
          })}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] text-gray-400 -ml-8">
          <span>{(maxValue / 1000).toFixed(0)}k</span>
          <span>{(maxValue / 2000).toFixed(0)}k</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
