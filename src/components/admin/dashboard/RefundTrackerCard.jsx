/**
 * RefundTrackerCard Component
 * Clean table-based design matching Payment History style
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, TrendingDown, RefreshCcw, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const RefundTrackerCard = ({ refundData = {} }) => {
  const navigate = useNavigate();
  
  const {
    totalRefundAmount = 0,
    totalRefunds = 0,
    pendingRefunds = 0,
    processedRefunds = 0,
    rejectedRefunds = 0,
    recentRefunds = [],
    topCancellationReasons = []
  } = refundData;

  const refundRate = refundData.refundRate || 0;

  // Format refund date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Handle click on refund row
  const handleRefundClick = (refund) => {
    if (refund.reference) {
      navigate(`/admin/payments/${refund.reference}`);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm h-64 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">Refunds & Cancellations</h3>
        <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 rounded-md">
          <TrendingDown size={12} className="text-orange-600" />
          <span className="text-[10px] font-semibold text-orange-600">{refundRate.toFixed(1)}%</span>
        </div>
      </div>

      {/* Summary Stats Row */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <div>
          <p className="text-[10px] text-gray-600 mb-1">Total Refunded</p>
          <p className="text-lg font-bold text-gray-900">GHS {totalRefundAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="flex gap-3">
          <div className="text-center">
            <p className="text-[9px] text-gray-600 mb-1">Pending</p>
            <p className="text-sm font-bold text-yellow-600">{pendingRefunds}</p>
          </div>
          <div className="text-center">
            <p className="text-[9px] text-gray-600 mb-1">Done</p>
            <p className="text-sm font-bold text-green-600">{processedRefunds}</p>
          </div>
          <div className="text-center">
            <p className="text-[9px] text-gray-600 mb-1">Rejected</p>
            <p className="text-sm font-bold text-red-600">{rejectedRefunds}</p>
          </div>
        </div>
      </div>

      {/* Recent Refunds Table */}
      {recentRefunds.length > 0 ? (
        <div className="flex-1 overflow-hidden">
          <h4 className="text-[10px] font-semibold text-gray-700 mb-2">Most Recent Refund</h4>
          <div className="space-y-2">
            {recentRefunds.slice(0, 3).map((refund, index) => (
              <div 
                key={index}
                onClick={() => handleRefundClick(refund)}
                className="flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded cursor-pointer transition-colors border-b border-gray-100 last:border-0"
              >
                {/* Student Name */}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-gray-900 truncate">
                    {refund.userName || 'Unknown Student'}
                  </p>
                  <p className="text-[9px] text-gray-500 truncate">{refund.courseTitle || 'Course'}</p>
                </div>

                {/* Date */}
                <div className="text-center mx-2">
                  <p className="text-[10px] text-gray-900">{formatDate(refund.refundedAt)}</p>
                  <p className="text-[9px] text-gray-500">{formatTime(refund.refundedAt)}</p>
                </div>

                {/* Status */}
                <div className="mx-2">
                  {refund.status === 'refunding' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-[9px] font-medium">
                      <Clock size={8} />
                      Processing
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-[9px] font-medium">
                      <CheckCircle size={8} />
                      Completed
                    </span>
                  )}
                </div>

                {/* Amount */}
                <div className="text-right">
                  <p className="text-[11px] font-bold text-orange-600">GHS {refund.amount?.toLocaleString() || 0}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <RefreshCcw size={28} className="text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-500 font-medium">No refunds yet</p>
            <p className="text-[10px] text-gray-400 mt-1">All transactions running smoothly</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefundTrackerCard;