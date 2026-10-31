/**
 * FinancialCard Component - Compact version
 * Main financial summary card with solid background
 */

import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

const FinancialCard = ({ totalRevenue = 0, weeklyRevenue = 0, weeklyGrowth = 0, currency = 'GHS' }) => {
  const safeRevenue = Number(totalRevenue) || 0;
  const safeWeekly = Number(weeklyRevenue) || 0;
  const safeGrowth = Number(weeklyGrowth) || 0;

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-gray-700">Revenue Summary</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Main Card Display */}
      <div className="bg-[#1a7f64] rounded-lg p-4 text-white mb-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-6 -mt-6"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-4 -mb-4"></div>
        
        <div className="relative z-10">
          <p className="text-white/80 text-[10px] font-medium mb-1">Total Balance</p>
          <p className="text-2xl font-bold mb-3">{currency} {safeRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-[10px]">●●●● 9090</p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-[9px]">Valid Thru</p>
              <p className="text-white text-xs font-semibold">12/26</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Revenue */}
      <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
        <div>
          <p className="text-[10px] text-gray-500 mb-0.5">Weekly Revenue</p>
          <p className="text-base font-bold text-gray-900">+{safeWeekly.toLocaleString()} {currency}</p>
        </div>
        <div className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold flex items-center gap-1">
          <TrendingUp size={10} />
          +{safeGrowth.toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

export default FinancialCard;
