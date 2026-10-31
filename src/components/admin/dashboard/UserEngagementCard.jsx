/**
 * UserEngagementCard Component
 * Displays user activity and engagement metrics
 */

import React from 'react';
import { Users, TrendingUp, Clock, UserCheck } from 'lucide-react';

const UserEngagementCard = ({ engagement = {} }) => {
  const metrics = [
    {
      label: 'Active Today',
      value: engagement.activeToday || 0,
      icon: Users,
      color: '#3b82f6',
      trend: engagement.activeTodayTrend || 0
    },
    {
      label: 'New This Week',
      value: engagement.newThisWeek || 0,
      icon: UserCheck,
      color: '#10b981',
      trend: engagement.newThisWeekTrend || 0
    },
    {
      label: 'Avg. Session',
      value: engagement.avgSession || '0m',
      icon: Clock,
      color: '#8b5cf6',
      trend: null
    },
    {
      label: 'Retention Rate',
      value: `${engagement.retentionRate || 0}%`,
      icon: TrendingUp,
      color: '#f59e0b',
      trend: null
    }
  ];

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-gray-700">User Engagement</h3>
        <span className="text-[9px] text-gray-500">Last 7 days</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {metrics.map((metric, index) => (
          <div key={index} className="p-2.5 bg-gray-50 rounded-lg hover:shadow-sm transition-all">
            <div className="flex items-center gap-2 mb-1">
              <div 
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${metric.color}15`, color: metric.color }}
              >
                <metric.icon size={14} />
              </div>
              {metric.trend !== null && metric.trend !== undefined && (
                <span className={`text-[9px] font-semibold ${metric.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.trend >= 0 ? '+' : ''}{metric.trend}%
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-gray-900 mb-0.5">{metric.value}</p>
            <p className="text-[9px] text-gray-500">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Peak Activity Time */}
      {engagement.peakHour && (
        <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-[10px] text-blue-700 font-semibold">
            🔥 Peak activity: {engagement.peakHour} ({engagement.peakCount || 0} users)
          </p>
        </div>
      )}
    </div>
  );
};

export default UserEngagementCard;
