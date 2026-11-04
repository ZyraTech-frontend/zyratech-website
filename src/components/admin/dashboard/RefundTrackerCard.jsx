/**
 * RefundTrackerCard Component
 * Table layout with proper headers matching Payment History design
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, TrendingDown, RefreshCcw } from 'lucide-react';

const RefundTrackerCard = ({ refundData = {} }) => {
  const navigate = useNavigate();
  
  const {
    totalRefundAmount = 0,
    totalRefunds = 0,
    pendingRefunds = 0,
    processedRefunds = 0,
    rejectedRefunds = 0,
    recentRefunds = []
  } = refundData;

  const refundRate = refundData.refundRate || 0;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const handleRefundClick = (refund) => {
    if (refund.reference) {
      navigate(`/admin/payments/${refund.reference}`);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm h-64 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Refunds & Cancellations</h3>
          <p className="text-[10px] text-gray-500">Recent payments history</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 rounded">
          <TrendingDown size={12} className="text-orange-600" />
          <span className="text-[10px] font-semibold text-orange-600">{refundRate.toFixed(1)}%</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
        <div>
          <p className="text-[9px] text-gray-600 mb-0.5">Total Refunded</p>
          <p className="text-lg font-bold text-gray-900">GHS {totalRefundAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="flex gap-3 text-[9px]">
          <div className="text-center">
            <p className="text-gray-600 mb-0.5">Pending</p>
            <p className="text-sm font-bold text-yellow-600">{pendingRefunds}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-0.5">Done</p>
            <p className="text-sm font-bold text-green-600">{processedRefunds}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-0.5">Rejected</p>
            <p className="text-sm font-bold text-red-600">{rejectedRefunds}</p>
          </div>
        </div>
      </div>

      {/* Table with Headers */}
      {recentRefunds.length > 0 ? (
        <div className="flex-1 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 pb-2 mb-2 border-b border-gray-100">
            <div className="col-span-4 text-[10px] text-gray-600 font-medium">Name</div>
            <div className="col-span-2 text-[10px] text-gray-600 font-medium">Date</div>
            <div className="col-span-2 text-[10px] text-gray-600 font-medium">Time</div>
            <div className="col-span-2 text-[10px] text-gray-600 font-medium">Status</div>
            <div className="col-span-2 text-[10px] text-gray-600 font-medium text-right">Amount</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-1">
            {recentRefunds.slice(0, 3).map((refund, index) => (
              <div 
                key={index}
                onClick={() => handleRefundClick(refund)}
                className="grid grid-cols-12 gap-2 py-2 hover:bg-gray-50 rounded cursor-pointer transition-colors items-center"
              >
                {/* Name */}
                <div className="col-span-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-blue-600">
                      {refund.userName?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-gray-900 truncate">
                      {refund.userName || 'Unknown'}
                    </p>
                    <p className="text-[9px] text-gray-500 truncate">
                      {refund.courseTitle || 'Course'}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <p className="text-[11px] text-gray-900">{formatDate(refund.refundedAt)}</p>
                </div>

                {/* Time */}
                <div className="col-span-2">
                  <p className="text-[11px] text-gray-900">{formatTime(refund.refundedAt)}</p>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <div className="flex items-center gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${refund.status === 'refunding' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                    <span className="text-[10px] text-gray-700">
                      {refund.status === 'refunding' ? 'Processing' : 'Successful'}
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <div className="col-span-2 text-right">
                  <p className="text-[11px] font-semibold text-gray-900">
                    {refund.amount?.toLocaleString('en-US', { minimumFractionDigits: 2 })} GHS
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <RefreshCcw size={28} className="text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-500">No refunds yet</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefundTrackerCard;