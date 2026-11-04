/**
 * RefundTrackerCard Component
 * Compact professional refund display without scrolling
 * Optimized to fit all content in fixed height
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, TrendingDown, RefreshCcw, Clock, CheckCircle, XCircle } from 'lucide-react';

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

  // Handle click on refund card
  const handleRefundClick = (refund) => {
    if (refund.reference) {
      navigate(`/admin/payments/${refund.reference}`);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm h-64 flex flex-col">
      {/* Header - Compact */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Refunds & Cancellations</h3>
        <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-50 rounded">
          <TrendingDown size={12} className="text-orange-600" />
          <span className="text-[10px] font-semibold text-orange-600">{refundRate.toFixed(1)}%</span>
        </div>
      </div>

      {/* Total Amount - More Compact */}
      <div className="mb-3 p-2.5 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <div className="p-1 bg-orange-100 rounded">
            <RefreshCcw size={14} className="text-orange-600" />
          </div>
          <div>
            <p className="text-[9px] text-gray-600 font-medium">Total Refunded</p>
            <p className="text-base font-bold text-gray-900">
              GHS {totalRefundAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Status Breakdown - Smaller */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="p-1.5 bg-yellow-50 rounded border border-yellow-100">
          <div className="flex items-center gap-0.5 mb-0.5">
            <Clock size={10} className="text-yellow-600" />
            <span className="text-[8px] text-yellow-700 font-medium">Pending</span>
          </div>
          <p className="text-base font-bold text-yellow-900">{pendingRefunds}</p>
        </div>
        
        <div className="p-1.5 bg-green-50 rounded border border-green-100">
          <div className="flex items-center gap-0.5 mb-0.5">
            <CheckCircle size={10} className="text-green-600" />
            <span className="text-[8px] text-green-700 font-medium">Done</span>
          </div>
          <p className="text-base font-bold text-green-900">{processedRefunds}</p>
        </div>
        
        <div className="p-1.5 bg-red-50 rounded border border-red-100">
          <div className="flex items-center gap-0.5 mb-0.5">
            <XCircle size={10} className="text-red-600" />
            <span className="text-[8px] text-red-700 font-medium">Rejected</span>
          </div>
          <p className="text-base font-bold text-red-900">{rejectedRefunds}</p>
        </div>
      </div>

      {/* Recent Refunds - Single Most Recent Only */}
      {recentRefunds.length > 0 && (
        <div className="border-t border-gray-200 pt-2 mb-2">
          <h4 className="text-[9px] font-semibold text-gray-700 mb-1.5">Most Recent Refund</h4>
          {recentRefunds.slice(0, 1).map((refund, index) => (
            <div 
              key={index} 
              onClick={() => handleRefundClick(refund)}
              className="bg-gray-50 rounded p-2 border border-gray-200 hover:border-blue-300 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-[11px] font-semibold text-gray-900 truncate flex-1">
                  {refund.userName || 'Unknown Student'}
                </p>
                <span className="text-orange-600 font-bold text-[11px] ml-2">GHS {refund.amount?.toLocaleString() || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[9px] text-gray-500 truncate flex-1">{refund.courseTitle || 'Course'}</p>
                {refund.status === 'refunding' ? (
                  <span className="text-[8px] px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded font-medium">
                    Processing
                  </span>
                ) : (
                  <span className="text-[8px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-medium">
                    Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Top Cancellation Reason - Single Only */}
      {topCancellationReasons.length > 0 && (
        <div className="border-t border-gray-200 pt-2">
          <h4 className="text-[9px] font-semibold text-gray-700 mb-1.5">Top Cancellation Reason</h4>
          <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded border border-gray-100">
            <span className="text-[10px] text-gray-700 truncate flex-1">{topCancellationReasons[0].reason}</span>
            <span className="text-[10px] text-gray-900 font-bold ml-2 bg-white px-1.5 py-0.5 rounded">{topCancellationReasons[0].count}</span>
          </div>
        </div>
      )}

      {/* Empty State - Compact */}
      {recentRefunds.length === 0 && topCancellationReasons.length === 0 && (
        <div className="flex-1 flex items-center justify-center border-t border-gray-200 pt-2">
          <div className="text-center">
            <AlertCircle size={24} className="text-gray-300 mx-auto mb-1" />
            <p className="text-[10px] text-gray-500 font-medium">No refunds yet</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefundTrackerCard;