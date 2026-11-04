/**
 * RefundTrackerCard Component
 * Matching the exact design from the first reference image
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingDown, RefreshCcw } from 'lucide-react';

const RefundTrackerCard = ({ refundData = {} }) => {
  const navigate = useNavigate();
  
  const {
    totalRefundAmount = 0,
    pendingRefunds = 0,
    processedRefunds = 0,
    rejectedRefunds = 0,
    recentRefunds = []
  } = refundData;

  const refundRate = refundData.refundRate || 0;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${date.getFullYear()}`;
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
    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm h-64 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Refunds & Cancellations</h3>
          <p className="text-xs text-gray-500 mt-0.5">Recent payments history</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 rounded">
          <TrendingDown size={14} className="text-orange-600" />
          <span className="text-xs font-semibold text-orange-600">{refundRate.toFixed(1)}%</span>
        </div>
      </div>

      {/* Total Refunded + Status Counts */}
      <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
        <div>
          <p className="text-xs text-gray-600 mb-1">Total Refunded</p>
          <p className="text-2xl font-bold text-gray-900">GHS {totalRefundAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="flex gap-6 text-xs">
          <div className="text-center">
            <p className="text-gray-600 mb-1">Pending</p>
            <p className="text-lg font-bold text-yellow-600">{pendingRefunds}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-1">Done</p>
            <p className="text-lg font-bold text-green-600">{processedRefunds}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-1">Rejected</p>
            <p className="text-lg font-bold text-red-600">{rejectedRefunds}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      {recentRefunds.length > 0 ? (
        <div className="flex-1 overflow-hidden">
          {/* Headers */}
          <div className="grid grid-cols-12 gap-3 mb-3">
            <div className="col-span-4 text-xs text-gray-600">Name</div>
            <div className="col-span-2 text-xs text-gray-600">Date</div>
            <div className="col-span-2 text-xs text-gray-600">Time</div>
            <div className="col-span-2 text-xs text-gray-600">Status</div>
            <div className="col-span-2 text-xs text-gray-600 text-right">Amount</div>
          </div>

          {/* Rows */}
          <div className="space-y-2">
            {recentRefunds.slice(0, 3).map((refund, index) => (
              <div 
                key={index}
                onClick={() => handleRefundClick(refund)}
                className="grid grid-cols-12 gap-3 items-center py-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
              >
                {/* Name with Avatar */}
                <div className="col-span-4 flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-blue-600">
                      {refund.userName?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {refund.userName || 'Unknown'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {refund.courseTitle || 'Course'}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">{formatDate(refund.refundedAt)}</p>
                </div>

                {/* Time */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-900">{formatTime(refund.refundedAt)}</p>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-700">
                    {refund.status === 'refunding' ? 'Processing' : 'Successful'}
                  </p>
                </div>

                {/* Amount */}
                <div className="col-span-2 text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {refund.amount?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || '0.00'} GHS
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <RefreshCcw size={32} className="text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No refunds yet</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefundTrackerCard;