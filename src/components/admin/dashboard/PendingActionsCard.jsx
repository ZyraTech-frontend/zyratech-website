/**
 * PendingActionsCard Component - Compact version
 * Displays pending items requiring admin attention with priority levels
 * Shows only first 4 items, "View All" navigates to full list
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  AlertCircle, 
  ChevronRight,
  FileText,
  MessageSquare,
  Star,
  FileEdit,
  Handshake,
  Image,
  GraduationCap,
  Briefcase,
  FolderKanban,
  Shield,
  CreditCard,
  Mail
} from 'lucide-react';

const PendingActionsCard = ({ actions = [], title = "Pending Actions" }) => {
  const navigate = useNavigate();
  
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    const iconProps = { size: 14, className: "text-gray-600" };
    const icons = {
      'Applications': <FileText {...iconProps} />,
      'Contact Form': <MessageSquare {...iconProps} />,
      'Testimonials': <Star {...iconProps} />,
      'Content': <FileEdit {...iconProps} />,
      'Partnerships': <Handshake {...iconProps} />,
      'Gallery': <Image {...iconProps} />,
      'Training': <GraduationCap {...iconProps} />,
      'Jobs': <Briefcase {...iconProps} />,
      'Projects': <FolderKanban {...iconProps} />,
      'KYC': <Shield {...iconProps} />,
      'Payments': <CreditCard {...iconProps} />,
      'Newsletter': <Mail {...iconProps} />
    };
    return icons[category] || <AlertCircle {...iconProps} />;
  };

  // Navigate to pending actions overview page
  const handleViewAll = () => {
    navigate('/admin/pending-actions');
  };

  // Show only first 4 items
  const displayedActions = actions.slice(0, 4);
  const hasMore = actions.length > 4;

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
          {actions.length > 0 && (
            <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded-full text-[10px] font-bold">
              {actions.length}
            </span>
          )}
        </div>
        {actions.length > 0 && (
          <button 
            onClick={handleViewAll}
            className="text-[#004fa2] hover:text-[#003d82] text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            View All
            <ChevronRight size={12} />
          </button>
        )}
      </div>

      <div className="space-y-2">
        {displayedActions.length > 0 ? (
          <>
            {displayedActions.map((action, index) => (
              <div
                key={index}
                className="group p-2.5 rounded-lg border border-gray-100 hover:border-[#004fa2] hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0 flex items-start gap-2">
                    <span className="flex-shrink-0 mt-0.5">{getCategoryIcon(action.category)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 group-hover:text-[#004fa2] transition-colors truncate">
                        {action.title}
                      </p>
                      <p className="text-[10px] text-gray-500">{action.category}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase border ${getPriorityColor(action.priority)}`}>
                      {action.priority}
                    </span>
                    <span className="text-[9px] text-gray-400 flex items-center gap-0.5">
                      <Clock size={9} />
                      {action.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {hasMore && (
              <div className="text-center pt-2">
                <button
                  onClick={handleViewAll}
                  className="text-[10px] text-gray-500 hover:text-[#004fa2] font-medium"
                >
                  +{actions.length - 4} more pending actions
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6 text-gray-400 text-xs">
            <AlertCircle className="mx-auto mb-1 text-gray-300" size={20} />
            <p>No pending actions</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingActionsCard;
