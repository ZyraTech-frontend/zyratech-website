/**
 * RecentActivityCard Component
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
      'contact': 'bg-blue-100',
      'enrollment': 'bg-purple-100',
      'testimonial': 'bg-yellow-100',
      'partnership': 'bg-green-100',
      'blog': 'bg-pink-100',
      'job': 'bg-indigo-100',
      'payment': 'bg-emerald-100',
      'user': 'bg-cyan-100',
      'inquiry': 'bg-orange-100'
    };
    return colors[type?.toLowerCase()] || 'bg-gray-100';
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
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        <button className="text-[#004fa2] hover:text-[#003d82] text-xs font-semibold flex items-center gap-1">
          View All
          <ChevronRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={index}
              className="group flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {/* Icon */}
              <div className={`w-8 h-8 rounded-full ${getIconBgColor(activity.type)} flex items-center justify-center flex-shrink-0 text-base`}>
                {getActivityIcon(activity.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-[#004fa2] transition-colors">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 truncate">{activity.description || activity.subtitle}</p>
              </div>

              {/* Time */}
              <div className="text-[10px] text-gray-400 flex items-center gap-1 flex-shrink-0">
                <Clock size={10} />
                {activity.time || formatRelativeTime(activity.timestamp)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm">
            <Clock className="mx-auto mb-2 text-gray-300" size={24} />
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivityCard;
