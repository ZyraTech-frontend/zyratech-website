/**
 * ActivityTable Component - Fixed to match dashboardService data structure
 * Recent activity table with mixed event types
 */

import React from 'react';
import { CheckCircle, Clock, XCircle, ArrowUpRight, CreditCard, MessageSquare, GraduationCap, UserPlus } from 'lucide-react';

const ActivityTable = ({ activities = [], title = "Recent Activity" }) => {
  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'payment':
        return <CreditCard size={14} className="text-green-600" />;
      case 'inquiry':
        return <MessageSquare size={14} className="text-blue-600" />;
      case 'enrollment':
        return <GraduationCap size={14} className="text-purple-600" />;
      case 'user':
        return <UserPlus size={14} className="text-cyan-600" />;
      default:
        return <CheckCircle size={14} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
      case 'successful':
      case 'completed':
      case 'paid':
        return 'text-green-600 bg-green-50';
      case 'pending':
      case 'new':
        return 'text-amber-600 bg-amber-50';
      case 'failed':
      case 'rejected':
        return 'text-red-600 bg-red-50';
      case 'approved':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
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
          <div className="col-span-5">Activity</div>
          <div className="col-span-3">User</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Status</div>
        </div>

        {/* Table Rows */}
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-3 px-3 py-3 text-sm hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
            >
              <div className="col-span-5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#004fa2] flex items-center justify-center text-white flex-shrink-0">
                  {getTypeIcon(activity.type)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate group-hover:text-[#004fa2]">
                    {activity.title}
                  </p>
                  <p className="text-[10px] text-gray-500 truncate capitalize">{activity.type}</p>
                </div>
              </div>
              <div className="col-span-3 text-xs text-gray-600 flex items-center truncate">
                {activity.user || 'Unknown'}
              </div>
              <div className="col-span-2 text-xs text-gray-600 flex items-center">
                {formatDate(activity.timestamp)}
              </div>
              <div className="col-span-2 flex items-center">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold capitalize ${getStatusColor(activity.status)}`}>
                  {activity.status || 'Unknown'}
                </span>
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
