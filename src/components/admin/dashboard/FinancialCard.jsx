/**
 * FinancialCard Component - Fixed with safe defaults
 * Main financial summary card with gradient background
 */

import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

const FinancialCard = ({ totalRevenue = 0, weeklyRevenue = 0, weeklyGrowth = 0, currency = 'GHS' }) => {
  // Safe number conversion
  const safeRevenue = Number(totalRevenue) || 0;
  const safeWeekly = Number(weeklyRevenue) || 0;
  const safeGrowth = Number(weeklyGrowth) || 0;

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Revenue Summary</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <ArrowUpRight size={18} />
        </button>
      </div>

      {/* Main Card Display */}
      <div className="bg-[#1a7f64] rounded-xl p-5 text-white mb-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-6 -mb-6"></div>
        
        <div className="relative z-10">
          <p className="text-white/80 text-xs font-medium mb-1">Total Balance</p>
          <p className="text-3xl font-bold mb-4">{currency} {safeRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-xs">●●●● 9090</p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs">Valid Thru</p>
              <p className="text-white text-sm font-semibold">12/26</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Revenue */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Weekly Revenue</p>
          <p className="text-lg font-bold text-gray-900">+{safeWeekly.toLocaleString()} {currency}</p>
        </div>
        <div className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
          <TrendingUp size={12} />
          +{safeGrowth.toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

export default FinancialCard;
