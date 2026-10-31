/**
 * ActivityTable Component
 * Recent activity/payment history table
 */

import React from 'react';
import { CheckCircle, Clock, XCircle, ArrowUpRight } from 'lucide-react';

const ActivityTable = ({ activities = [], title = "Recent Activity" }) => {
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'successful':
      case 'completed':
        return <CheckCircle size={14} className="text-green-600" />;
      case 'pending':
        return <Clock size={14} className="text-amber-600" />;
      case 'failed':
        return <XCircle size={14} className="text-red-600" />;
      default:
        return <CheckCircle size={14} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'successful':
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-amber-600 bg-amber-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <ArrowUpRight size={18} />
        </button>
      </div>

      <div className="space-y-1">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-3 px-3 py-2 text-xs font-semibold text-gray-500 border-b border-gray-100">
          <div className="col-span-4">Name</div>
          <div className="col-span-3">Date</div>
          <div className="col-span-2">Time</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Amount</div>
        </div>

        {/* Table Rows */}
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-3 px-3 py-3 text-sm hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
            >
              <div className="col-span-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {activity.icon || activity.name?.charAt(0) || '?'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate group-hover:text-[#004fa2]">
                    {activity.name || activity.description}
                  </p>
                  <p className="text-[10px] text-gray-500 truncate">{activity.subtitle || activity.type}</p>
                </div>
              </div>
              <div className="col-span-3 text-xs text-gray-600 flex items-center">
                {activity.date || 'N/A'}
              </div>
              <div className="col-span-2 text-xs text-gray-600 flex items-center">
                {activity.time || 'N/A'}
              </div>
              <div className="col-span-2 flex items-center">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${getStatusColor(activity.status)}`}>
                  {getStatusIcon(activity.status)}
                  {activity.status || 'Unknown'}
                </span>
              </div>
              <div className="col-span-1 text-xs font-bold text-gray-900 text-right flex items-center justify-end">
                {activity.amount || '-'}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm">
            No recent activity
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTable;