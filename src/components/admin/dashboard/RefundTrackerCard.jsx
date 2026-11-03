/**
 * RefundTrackerCard Component
 * Displays refund statistics, recent refunds with timestamps, and cancellation reasons
 * Clickable refund cards navigate to payment details
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, AlertCircle, TrendingDown, RefreshCcw, Clock, ExternalLink } from 'lucide-react';

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
  const formatRefundDate = (dateString) => {
    if (!dateString) return 'Processing...';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // Handle click on refund card - navigate to payment details
  const handleRefundClick = (refund) => {
    if (refund.reference) {
      navigate(`/admin/payments/${refund.reference}`);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm h-64 flex flex-col overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-gray-700">Refunds & Cancellations</h3>
        <div className="flex items-center gap-1 text-orange-600">
          <TrendingDown size={12} />
          <span className="text-[10px] font-bold">{refundRate.toFixed(1)}%</span>
        </div>
      </div>

      {/* Total Refund Amount */}
      <div className="mb-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <RefreshCcw size={16} className="text-orange-600" />
          <span className="text-[9px] text-gray-600 font-medium">Total Refund Amount</span>
        </div>
        <p className="text-xl font-bold text-gray-900">
          GHS {totalRefundAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Refund Status Breakdown */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span className="text-gray-600">Pending</span>
          </div>
          <span className="font-bold text-gray-900">{pendingRefunds}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-gray-600">Processed</span>
          </div>
          <span className="font-bold text-gray-900">{processedRefunds}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-gray-600">Rejected</span>
          </div>
          <span className="font-bold text-gray-900">{rejectedRefunds}</span>
        </div>
      </div>

      {/* Recent Refunds with Timestamps - CLICKABLE */}
      {recentRefunds.length > 0 && (
        <div className="border-t border-gray-200 pt-3">
          <h4 className="text-[10px] font-semibold text-gray-700 mb-2">Recent Refunds (Click to view details)</h4>
          <div className="space-y-2">
            {recentRefunds.slice(0, 3).map((refund, index) => (
              <div 
                key={index} 
                onClick={() => handleRefundClick(refund)}
                className="bg-gray-50 rounded-lg p-2 border border-gray-100 hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-all group"
                title="Click to view full refund details"
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1 truncate">
                    <p className="text-xs font-semibold text-gray-900 truncate group-hover:text-blue-600">
                      {refund.userName || 'Unknown'}
                    </p>
                    <p className="text-[10px] text-gray-500 line-clamp-1">{refund.reason || 'No reason provided'}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-orange-600 font-bold text-xs">{refund.amount?.toLocaleString() || 0}</span>
                    <ExternalLink size={10} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {refund.status === 'refunding' ? (
                      <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">
                        <Clock size={8} />
                        Processing
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                        ? Completed
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] text-gray-500">{formatRefundDate(refund.refundedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Cancellation Reasons */}
      {topCancellationReasons.length > 0 && (
        <div className="border-t border-gray-200 pt-3 mt-2">
          <h4 className="text-[10px] font-semibold text-gray-700 mb-2">Top Cancellation Reasons</h4>
          <div className="space-y-1">
            {topCancellationReasons.slice(0, 3).map((reason, index) => (
              <div key={index} className="flex items-center justify-between text-[10px]">
                <span className="text-gray-600 truncate flex-1">{reason.reason}</span>
                <span className="text-gray-900 font-bold ml-2">({reason.count})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {recentRefunds.length === 0 && topCancellationReasons.length === 0 && (
        <div className="flex-1 flex items-center justify-center border-t border-gray-200 mt-3 pt-3">
          <div className="text-center">
            <AlertCircle size={24} className="text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-500">No refunds yet</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefundTrackerCard;
