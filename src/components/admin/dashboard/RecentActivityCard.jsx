/**
 * RecentActivityCard Component - Compact version
 * Timeline view of recent activities in the last 24 hours
 */

import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';

const RecentActivityCard = ({ activities = [], title = "Recent Activity", subtitle = "Last 24 hours" }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'contact': '📧',
      'enrollment': '🎓',
      'testimonial': '⭐',
      'partnership': '🤝',
      'blog': '📝',
      'job': '💼',
      'payment': '💳',
      'user': '👤',
      'inquiry': '💬'
    };
    return icons[type?.toLowerCase()] || '📌';
  };

  const getIconBgColor = (type) => {
    const colors = {
      'contact': 'bg-blue-50',
      'enrollment': 'bg-purple-50',
      'testimonial': 'bg-yellow-50',
      'partnership': 'bg-green-50',
      'blog': 'bg-pink-50',
      'job': 'bg-indigo-50',
      'payment': 'bg-emerald-50',
      'user': 'bg-cyan-50',
      'inquiry': 'bg-orange-50'
    };
    return colors[type?.toLowerCase()] || 'bg-gray-50';
  };

  const formatRelativeTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffMs = now - activityTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Yesterday';
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
          <p className="text-[10px] text-gray-500">{subtitle}</p>
        </div>
        <button className="text-[#004fa2] hover:text-[#003d82] text-xs font-semibold flex items-center gap-1">
          View All
          <ChevronRight size={12} />
        </button>
      </div>

      <div className="space-y-2">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={index}
              className="group flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {/* Icon */}
              <div className={`w-7 h-7 rounded-full ${getIconBgColor(activity.type)} flex items-center justify-center flex-shrink-0 text-sm`}>
                {getActivityIcon(activity.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 group-hover:text-[#004fa2] transition-colors">
                  {activity.title}
                </p>
                <p className="text-[10px] text-gray-500 truncate">{activity.description || activity.subtitle}</p>
              </div>

              {/* Time */}
              <div className="text-[9px] text-gray-400 flex items-center gap-0.5 flex-shrink-0">
                <Clock size={9} />
                {activity.time || formatRelativeTime(activity.timestamp)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-400 text-xs">
            <Clock className="mx-auto mb-1 text-gray-300" size={20} />
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityCard;
