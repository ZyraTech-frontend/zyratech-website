/**
 * FinancialCard Component - Clean Revenue Summary
 * Main financial summary card with solid background
 */

import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

const FinancialCard = ({ totalRevenue = 0, weeklyRevenue = 0, weeklyGrowth = 0, currency = 'GHS' }) => {
  const safeRevenue = Number(totalRevenue) || 0;

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Revenue Summary</h3>
        <DollarSign size={20} className="text-gray-400" />
      </div>

      {/* Main Revenue Display */}
      <div className="flex-1">
        <div className="bg-gradient-to-br from-[#1a7f64] to-[#15624d] rounded-xl p-8 text-white relative overflow-hidden h-full flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8"></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <DollarSign size={32} className="text-white" />
            </div>
            <p className="text-white/80 text-sm font-medium mb-2 uppercase tracking-wide">Total Revenue</p>
            <p className="text-5xl font-black mb-2">{currency} {safeRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full text-sm font-medium mt-4">
              <TrendingUp size={16} />
              <span>All Time Earnings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCard;
