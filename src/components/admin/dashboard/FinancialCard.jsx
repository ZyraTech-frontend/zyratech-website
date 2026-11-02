/**
 * FinancialCard Component - Full height to match chart
 * Main financial summary card with solid background
 */

import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

const FinancialCard = ({ totalRevenue = 0, weeklyRevenue = 0, weeklyGrowth = 0, currency = 'GHS' }) => {
  const safeRevenue = Number(totalRevenue) || 0;
  const safeWeekly = Number(weeklyRevenue) || 0;
  const safeGrowth = Number(weeklyGrowth) || 0;

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Revenue Summary</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <ArrowUpRight size={18} />
        </button>
      </div>

      {/* Main Card Display - Takes up remaining space */}
      <div className="flex-1 flex flex-col">
        <div className="bg-gradient-to-br from-[#1a7f64] to-[#15624d] rounded-xl p-6 text-white mb-4 relative overflow-hidden flex-1 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>
          
          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <p className="text-white/80 text-xs font-medium mb-2">Total Balance</p>
            <p className="text-4xl font-bold mb-8">{currency} {safeRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            
            <div className="flex items-center justify-between mt-auto">
              <div>
                <p className="text-white/70 text-sm tracking-wider">●●●● 9090</p>
              </div>
              <div className="text-right">
                <p className="text-white/70 text-xs">Valid Thru</p>
                <p className="text-white text-sm font-semibold">12/26</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Revenue */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="text-xs text-gray-500 mb-1">Weekly Revenue</p>
            <p className="text-xl font-bold text-gray-900">+{safeWeekly.toLocaleString()} {currency}</p>
          </div>
          <div className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1.5">
            <TrendingUp size={14} />
            +{safeGrowth.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCard;
