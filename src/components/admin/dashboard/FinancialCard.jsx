/**
 * FinancialCard Component - Horizontal Credit Card Style
 * Compact, professional revenue summary with GHS currency
 */

import React from 'react';
import { Wallet, TrendingUp } from 'lucide-react';

const FinancialCard = ({ totalRevenue = 0, weeklyRevenue = 0, weeklyGrowth = 0, currency = 'GHS' }) => {
  const safeRevenue = Number(totalRevenue) || 0;

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm h-64 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Revenue Summary</h3>
        <Wallet size={18} className="text-gray-400" />
      </div>

      {/* Horizontal Credit Card Style Layout */}
      <div className="bg-gradient-to-br from-[#1a7f64] to-[#15624d] rounded-xl p-6 text-white relative overflow-hidden flex-1 flex flex-col justify-center">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full -ml-6 -mb-6"></div>
        
        <div className="relative z-10">
          {/* Top section - Icon and label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
              <span className="text-2xl font-bold">{currency.substring(0, 1)}</span>
            </div>
            <div>
              <p className="text-white/80 text-xs font-medium uppercase tracking-wide">Total Revenue</p>
            </div>
          </div>

          {/* Amount - centered and prominent */}
          <div className="text-center mb-3">
            <p className="text-4xl font-black">{currency} {safeRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>

          {/* Badge - below amount */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full text-sm font-medium">
              <TrendingUp size={14} />
              <span className="text-xs">All Time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCard;


