/**
 * PendingActionsPage - Overview of all pending actions across categories
 * Shows all pending items requiring admin attention from:
 * - Project Requests, Job Applications, KYC Verifications, Payments
 * - Contact Inquiries, Course Enrollments, Partnerships, Newsletter Subscriptions
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertCircle, 
  Filter, 
  Search,
  ChevronRight,
  FileText,
  MessageSquare,
  Handshake,
  GraduationCap,
  Briefcase,
  FolderKanban,
  Shield,
  CreditCard,
  Mail,
  Loader2
} from 'lucide-react';
import dashboardService from '../../../services/dashboardService';

const PendingActionsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingActions, setPendingActions] = useState([]);
  const [filteredActions, setFilteredActions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Category mapping to routes
  const categoryRoutes = {
    'Projects': '/admin/project-requests',
    'Applications': '/admin/jobs',
    'KYC': '/admin/users',
    'Payments': '/admin/payments',
    'Contact Form': '/admin/contact-inquiries',
    'Training': '/admin/training-applications',
    'Partnerships': '/admin/partnerships',
    'Newsletter': '/admin/newsletter'
  };

  const getCategoryIcon = (category) => {
    const iconProps = { size: 18, className: "text-gray-600" };
    const icons = {
      'Applications': <FileText {...iconProps} />,
      'Contact Form': <MessageSquare {...iconProps} />,
      'Partnerships': <Handshake {...iconProps} />,
      'Training': <GraduationCap {...iconProps} />,
      'Jobs': <Briefcase {...iconProps} />,
      'Projects': <FolderKanban {...iconProps} />,
      'KYC': <Shield {...iconProps} />,
      'Payments': <CreditCard {...iconProps} />,
      'Newsletter': <Mail {...iconProps} />
    };
    return icons[category] || <AlertCircle {...iconProps} />;
  };

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

  useEffect(() => {
    fetchPendingActions();
  }, []);

  useEffect(() => {
    filterActions();
  }, [searchTerm, selectedCategory, pendingActions]);

  const fetchPendingActions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getDashboardData();
      setPendingActions(data.pendingActions || []);
    } catch (err) {
      console.error('Error fetching pending actions:', err);
      setError('Failed to load pending actions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterActions = () => {
    let filtered = [...pendingActions];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(action => action.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(action =>
        action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        action.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredActions(filtered);
  };

  const handleActionClick = (action) => {
    const route = categoryRoutes[action.category];
    if (route) {
      navigate(route);
    }
  };

  const categories = ['all', ...new Set(pendingActions.map(a => a.category))];

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#004fa2] mr-2" size={24} />
          <span className="text-gray-600">Loading pending actions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pending Actions</h1>
        <p className="text-gray-600">
          All items requiring your attention across the platform ({pendingActions.length} total)
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search pending actions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="md:w-64">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-red-600" size={20} />
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        </div>
      )}

      {/* Pending Actions List */}
      {filteredActions.length > 0 ? (
        <div className="space-y-3">
          {filteredActions.map((action, index) => (
            <div
              key={index}
              onClick={() => handleActionClick(action)}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:border-[#004fa2] hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    {getCategoryIcon(action.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#004fa2] transition-colors truncate">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-500">{action.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getPriorityColor(action.priority)}`}>
                    {action.priority}
                  </span>
                  <span className="text-sm text-gray-500 hidden sm:block">
                    {action.time}
                  </span>
                  <ChevronRight className="text-gray-400 group-hover:text-[#004fa2] transition-colors" size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <AlertCircle className="mx-auto mb-4 text-gray-300" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm || selectedCategory !== 'all' ? 'No matching actions found' : 'No pending actions'}
          </h3>
          <p className="text-gray-500">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your filters or search term'
              : 'All caught up! No items require your attention right now.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PendingActionsPage;
