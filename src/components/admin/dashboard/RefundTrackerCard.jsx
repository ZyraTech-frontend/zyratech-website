/**
 * RefundTrackerCard Component
 * Professional refund statistics display without gradients
 * Displays refund metrics, recent refunds, and cancellation reasons
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, TrendingDown, RefreshCcw, Clock, ExternalLink, BookOpen, CheckCircle, XCircle } from 'lucide-react';

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
    if (!dateString) return 'No date';
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
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm h-64 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">Refunds & Cancellations</h3>
        <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 rounded-md">
          <TrendingDown size={14} className="text-orange-600" />
          <span className="text-xs font-semibold text-orange-600">{refundRate.toFixed(1)}%</span>
        </div>
      </div>

      {/* Total Refund Amount - Clean Professional Style */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-orange-100 rounded">
              <RefreshCcw size={16} className="text-orange-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-600 font-medium">Total Refunded</p>
              <p className="text-lg font-bold text-gray-900">
                GHS {totalRefundAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Refund Status Breakdown - Grid Layout */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-100">
          <div className="flex items-center gap-1 mb-1">
            <Clock size={12} className="text-yellow-600" />
            <span className="text-[9px] text-yellow-700 font-medium">Pending</span>
          </div>
          <p className="text-lg font-bold text-yellow-900">{pendingRefunds}</p>
        </div>
        
        <div className="p-2 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-center gap-1 mb-1">
            <CheckCircle size={12} className="text-green-600" />
            <span className="text-[9px] text-green-700 font-medium">Done</span>
          </div>
          <p className="text-lg font-bold text-green-900">{processedRefunds}</p>
        </div>
        
        <div className="p-2 bg-red-50 rounded-lg border border-red-100">
          <div className="flex items-center gap-1 mb-1">
            <XCircle size={12} className="text-red-600" />
            <span className="text-[9px] text-red-700 font-medium">Rejected</span>
          </div>
          <p className="text-lg font-bold text-red-900">{rejectedRefunds}</p>
        </div>
      </div>

      {/* Recent Refunds - Simplified */}
      {recentRefunds.length > 0 && (
        <div className="border-t border-gray-200 pt-3">
          <h4 className="text-[10px] font-semibold text-gray-700 mb-2">
            Recent Refunds
          </h4>
          <div className="space-y-2">
            {recentRefunds.slice(0, 2).map((refund, index) => (
              <div 
                key={index} 
                onClick={() => handleRefundClick(refund)}
                className="bg-white rounded-lg p-2 border border-gray-200 hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all group"
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <p className="text-xs font-semibold text-gray-900 truncate group-hover:text-blue-600">
                        {refund.userName || 'Unknown Student'}
                      </p>
                      <ExternalLink size={9} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={9} className="text-gray-400" />
                      <p className="text-[10px] text-gray-500 truncate">{refund.courseTitle || 'Course'}</p>
                    </div>
                  </div>
                  <span className="text-orange-600 font-bold text-xs ml-2">GHS {refund.amount?.toLocaleString() || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  {refund.status === 'refunding' ? (
                    <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded font-medium">
                      <Clock size={8} />
                      Processing
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-medium">
                      <CheckCircle size={8} />
                      Completed
                    </span>
                  )}
                  <span className="text-[9px] text-gray-500">{formatRefundDate(refund.refundedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Cancellation Reasons - Compact */}
      {topCancellationReasons.length > 0 && (
        <div className="border-t border-gray-200 pt-3 mt-2">
          <h4 className="text-[10px] font-semibold text-gray-700 mb-2">Top Cancellation Reasons</h4>
          <div className="space-y-1.5">
            {topCancellationReasons.slice(0, 2).map((reason, index) => (
              <div key={index} className="flex items-center justify-between p-1.5 bg-gray-50 rounded">
                <span className="text-[10px] text-gray-700 truncate flex-1">{reason.reason}</span>
                <span className="text-[10px] text-gray-900 font-bold ml-2 bg-white px-1.5 py-0.5 rounded">{reason.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {recentRefunds.length === 0 && topCancellationReasons.length === 0 && (
        <div className="flex-1 flex items-center justify-center border-t border-gray-200 mt-3 pt-3">
          <div className="text-center">
            <AlertCircle size={32} className="text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-500 font-medium">No refunds yet</p>
            <p className="text-[10px] text-gray-400 mt-1">All transactions are running smoothly</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefundTrackerCard;