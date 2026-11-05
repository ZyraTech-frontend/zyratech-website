/**
 * Activity Logs Page (Admin)
 * Professional admin interface for viewing system activity and audit logs
 * Now reads REAL logs from activityLogService (localStorage-backed) merged with seed data.
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import AdminLayout from '../../../components/admin/layout/AdminLayout';

import activityLogService from '../../../services/activityLogService';
import {
    Activity,
    Search,
    Filter,
    Eye,
    Download,
    ChevronLeft,
    ChevronRight,
    X,
    User,
    Users,
    Shield,
    FileText,
    Edit,
    Trash2,
    Plus,
    LogIn,
    LogOut,
    Settings,
    Mail,
    CreditCard,
    GraduationCap,
    Briefcase,
    Calendar,
    Clock,
    AlertCircle,
    CheckCircle,
    XCircle,
    Info,
    Monitor,
    Smartphone,
    Globe,
    MapPin,
    RefreshCw,
    ChevronDown,
    ExternalLink,
    Copy,
    Server,
    Database,
    Lock,
    Unlock,
    UserPlus,
    UserMinus,
    FileEdit,
    FilePlus,
    FileX,
    Image,
    MessageSquare,
    Bell,
    Zap,
    Key
} from 'lucide-react';

// Activity type configuration
const ACTIVITY_TYPE_CONFIG = {
    // Authentication
    'login': {
        label: 'Login',
        color: 'bg-green-100 text-green-700',
        icon: LogIn,
        category: 'auth'
    },
    'logout': {
        label: 'Logout',
        color: 'bg-gray-100 text-gray-700',
        icon: LogOut,
        category: 'auth'
    },
    'login_failed': {
        label: 'Failed Login',
        color: 'bg-red-100 text-red-700',
        icon: XCircle,
        category: 'auth'
    },
    'password_reset': {
        label: 'Password Reset',
        color: 'bg-amber-100 text-amber-700',
        icon: Key,
        category: 'auth'
    },

    // User Management
    'user_created': {
        label: 'User Created',
        color: 'bg-blue-100 text-blue-700',
        icon: UserPlus,
        category: 'users'
    },
    'user_updated': {
        label: 'User Updated',
        color: 'bg-cyan-100 text-cyan-700',
        icon: Edit,
        category: 'users'
    },
    'user_deleted': {
        label: 'User Deleted',
        color: 'bg-red-100 text-red-700',
        icon: UserMinus,
        category: 'users'
    },
    'role_changed': {
        label: 'Role Changed',
        color: 'bg-purple-100 text-purple-700',
        icon: Shield,
        category: 'users'
    },

    // Content Management
    'content_created': {
        label: 'Content Created',
        color: 'bg-green-100 text-green-700',
        icon: FilePlus,
        category: 'content'
    },
    'content_updated': {
        label: 'Content Updated',
        color: 'bg-blue-100 text-blue-700',
        icon: FileEdit,
        category: 'content'
    },
    'content_deleted': {
        label: 'Content Deleted',
        color: 'bg-red-100 text-red-700',
        icon: FileX,
        category: 'content'
    },
    'content_published': {
        label: 'Content Published',
        color: 'bg-emerald-100 text-emerald-700',
        icon: CheckCircle,
        category: 'content'
    },

    // Enrollments & Payments
    'enrollment_created': {
        label: 'New Enrollment',
        color: 'bg-indigo-100 text-indigo-700',
        icon: GraduationCap,
        category: 'enrollments'
    },
    'payment_received': {
        label: 'Payment Received',
        color: 'bg-emerald-100 text-emerald-700',
        icon: CreditCard,
        category: 'payments'
    },
    'refund_processed': {
        label: 'Refund Processed',
        color: 'bg-orange-100 text-orange-700',
        icon: CreditCard,
        category: 'payments'
    },

    // System Events
    'settings_changed': {
        label: 'Settings Changed',
        color: 'bg-gray-100 text-gray-700',
        icon: Settings,
        category: 'system'
    },
    'backup_created': {
        label: 'Backup Created',
        color: 'bg-blue-100 text-blue-700',
        icon: Database,
        category: 'system'
    },
    'error_logged': {
        label: 'Error Logged',
        color: 'bg-red-100 text-red-700',
        icon: AlertCircle,
        category: 'system'
    },
    'notification_sent': {
        label: 'Notification Sent',
        color: 'bg-violet-100 text-violet-700',
        icon: Bell,
        category: 'system'
    }
};

// Category configuration
const CATEGORY_CONFIG = {
    'auth': { label: 'Authentication', icon: Lock, color: 'text-green-600' },
    'users': { label: 'User Management', icon: Users, color: 'text-blue-600' },
    'content': { label: 'Content', icon: FileText, color: 'text-purple-600' },
    'enrollments': { label: 'Enrollments', icon: GraduationCap, color: 'text-indigo-600' },
    'payments': { label: 'Payments', icon: CreditCard, color: 'text-emerald-600' },
    'system': { label: 'System', icon: Server, color: 'text-gray-600' }
};

// Severity levels
const SEVERITY_CONFIG = {
    'info': { label: 'Info', color: 'bg-blue-500', icon: Info },
    'success': { label: 'Success', color: 'bg-green-500', icon: CheckCircle },
    'warning': { label: 'Warning', color: 'bg-amber-500', icon: AlertCircle },
    'error': { label: 'Error', color: 'bg-red-500', icon: XCircle }
};



// Format timestamp
const formatTimestamp = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const formatFullTimestamp = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

const ActivityLogsPage = () => {
    const { userRole } = useAuth();
  const isSuperAdmin = userRole?.toLowerCase() === 'super_admin' || userRole?.toLowerCase() === 'super admin';

    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedSeverity, setSelectedSeverity] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewingLog, setViewingLog] = useState(null);
    const [expandedLogs, setExpandedLogs] = useState(new Set());
    const [realLogs, setRealLogs] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(null);
    const itemsPerPage = 15;

    // Load real logs from the backend API
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                setLoading(true);
                setApiError(null);
                const { logs, error } = await activityLogService.getLogs({ limit: 100 });
                
                if (error) {
                    setApiError(error);
                    console.error('[ActivityLogsPage] API Error:', error);
                }
                
                setRealLogs(logs || []);
            } catch (err) {
                console.error('[ActivityLogsPage] Failed to fetch logs:', err);
                setApiError(err.message);
                setRealLogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, [refreshKey]);
    // Use only real logs from API
    const allLogs = useMemo(() => {
        return [...realLogs].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }, [realLogs]);


    // Filter logs
    const filteredLogs = useMemo(() => {
        let result = [...allLogs];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(log =>
                log.id.toLowerCase().includes(query) ||
                log.description.toLowerCase().includes(query) ||
                log.user.name.toLowerCase().includes(query) ||
                log.user.email.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(log =>
                ACTIVITY_TYPE_CONFIG[log.type]?.category === selectedCategory
            );
        }

        // Severity filter
        if (selectedSeverity !== 'all') {
            result = result.filter(log => log.severity === selectedSeverity);
        }

        // Date range filter
        if (dateRange !== 'all') {
            const now = new Date();
            let cutoffDate;

            switch (dateRange) {
                case 'today':
                    cutoffDate = new Date(now.setHours(0, 0, 0, 0));
                    break;
                case 'week':
                    cutoffDate = new Date(now.setDate(now.getDate() - 7));
                    break;
                case 'month':
                    cutoffDate = new Date(now.setMonth(now.getMonth() - 1));
                    break;
                default:
                    cutoffDate = null;
            }

            if (cutoffDate) {
                result = result.filter(log => new Date(log.timestamp) >= cutoffDate);
            }
        }

        return result;
    }, [searchQuery, selectedCategory, selectedSeverity, dateRange, allLogs]);

    // Pagination
    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
    const paginatedLogs = filteredLogs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return {
            total: allLogs.length,
            today: allLogs.filter(log => new Date(log.timestamp) >= today).length,
            warnings: allLogs.filter(log => log.severity === 'warning').length,
            errors: allLogs.filter(log => log.severity === 'error').length,
            logins: allLogs.filter(log => log.type === 'login').length,
            failedLogins: allLogs.filter(log => log.type === 'login_failed').length
        };
    }, [allLogs]);

    // Handlers
    const handleViewDetails = (log) => {
        setViewingLog(log);
    };

    const toggleExpand = (logId) => {
        const newExpanded = new Set(expandedLogs);
        if (newExpanded.has(logId)) {
            newExpanded.delete(logId);
        } else {
            newExpanded.add(logId);
        }
        setExpandedLogs(newExpanded);
    };

    const handleExport = () => {
        activityLogService.exportLogs();
    };

    const handleRefresh = useCallback(() => {
        setRefreshKey(k => k + 1);
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedSeverity('all');
        setDateRange('all');
        setCurrentPage(1);
    };

    return (
        <AdminLayout>
            <div className="space-y-3 md:space-y-6 pb-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                <Activity className="text-white" size={22} />
                            </div>
                            Activity Logs
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Monitor system activity and audit trail
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleRefresh}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm font-medium text-sm"
                        >
                            <RefreshCw size={16} />
                            Refresh
                        </button>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm font-medium text-sm"
                        >
                            <Download size={16} />
                            Export
                        </button>
                    </div>
                </div>

                {/* Statistics Cards - High Density Professional Design */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
                    {[
                        { label: 'Total Events', value: stats.total, icon: Activity, iconColor: 'text-blue-600' },
                        { label: 'Today', value: stats.today, icon: Clock, iconColor: 'text-green-600', badge: 'Live', badgeColor: 'bg-green-100 text-green-700' },
                        { label: 'Logins', value: stats.logins, icon: LogIn, iconColor: 'text-emerald-600' },
                        { label: 'Warnings', value: stats.warnings, icon: AlertCircle, iconColor: 'text-amber-600' },
                        { label: 'Errors', value: stats.errors, icon: XCircle, iconColor: 'text-red-600' },
                        { label: 'Failed Logins', value: stats.failedLogins, icon: Shield, iconColor: 'text-rose-600', alert: stats.failedLogins > 0 }
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className={`group bg-white rounded-xl p-2.5 sm:p-3 border shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${stat.alert ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-[#004fa2]'}`}
                        >
                            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                                <stat.icon className={`${stat.iconColor} group-hover:scale-110 transition-transform duration-300 shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4`} />
                                <p className="text-base sm:text-xl font-bold text-gray-900 truncate">
                                    {stat.value.toLocaleString()}
                                </p>
                                {stat.badge && <span className={`ml-auto px-1.5 py-0.5 text-[9px] font-bold rounded-full hidden sm:inline-block ${stat.badgeColor}`}>{stat.badge}</span>}
                                {stat.alert && <span className="ml-auto px-1.5 py-0.5 bg-red-100 text-red-700 text-[9px] font-bold rounded-full hidden sm:inline-block animate-pulse">Alert</span>}
                            </div>
                            <p className="text-[9px] sm:text-[10px] font-semibold text-gray-500 uppercase tracking-wide truncate">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Filters and Search - Ultra Compact Dropdowns */}
                <div className="bg-white rounded-xl p-2 sm:p-2.5 shadow-sm border border-gray-200">
                    <div className="flex flex-col md:flex-row gap-2">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder="Search logs..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004fa2] focus:border-[#004fa2] text-[12px] bg-gray-50/50 transition-all font-medium h-[34px]"
                            />
                        </div>

                        {/* Filters Row */}
                        <div className="flex gap-2">
                            <select
                                value={selectedCategory}
                                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                                className="flex-1 sm:flex-none px-1.5 sm:px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004fa2] text-[11px] sm:text-xs bg-gray-50/50 min-w-0 font-medium h-[34px]"
                            >
                                <option value="all">Categories</option>
                                {Object.entries(CATEGORY_CONFIG).map(([key, val]) => (
                                    <option key={key} value={key}>{val.label}</option>
                                ))}
                            </select>

                            <select
                                value={selectedSeverity}
                                onChange={(e) => { setSelectedSeverity(e.target.value); setCurrentPage(1); }}
                                className="flex-1 sm:flex-none px-1.5 sm:px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004fa2] text-[11px] sm:text-xs bg-gray-50/50 min-w-0 font-medium h-[34px]"
                            >
                                <option value="all">Severity</option>
                                <option value="info">Info</option>
                                <option value="success">Success</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                            </select>

                            <select
                                value={dateRange}
                                onChange={(e) => { setDateRange(e.target.value); setCurrentPage(1); }}
                                className="flex-1 sm:flex-none px-1.5 sm:px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004fa2] text-[11px] sm:text-xs bg-gray-50/50 min-w-0 font-medium h-[34px]"
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">Past Week</option>
                                <option value="month">Past Month</option>
                            </select>

                            {(searchQuery || selectedCategory !== 'all' || selectedSeverity !== 'all' || dateRange !== 'all') && (
                                <button
                                    onClick={resetFilters}
                                    className="shrink-0 h-[34px] w-[34px] flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 border border-gray-200 rounded-lg transition-colors bg-gray-50"
                                    title="Reset Filters"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Activity Log Timeline - High Density */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="divide-y divide-gray-200">
                        {paginatedLogs.map((log) => {
                            const typeConfig = ACTIVITY_TYPE_CONFIG[log.type] || { label: log.type, color: 'bg-gray-100 text-gray-700', icon: Activity };
                            const TypeIcon = typeConfig.icon;
                            const SeverityIcon = SEVERITY_CONFIG[log.severity]?.icon || Info;
                            const severityColor = SEVERITY_CONFIG[log.severity]?.color || 'bg-gray-500';
                            const isExpanded = expandedLogs.has(log.id);
                            const isSystem = log.user.id === 'SYSTEM';

                            return (
                                <div key={log.id} className="hover:bg-blue-50/30 transition-colors">
                                    <div className="px-4 py-3">
                                        <div className="flex items-start gap-2 md:gap-4">
                                            {/* Severity Indicator */}
                                            <div className={`w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 shadow-sm ${severityColor}`} />

                                            {/* Icon */}
                                            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-white ${typeConfig.color}`}>
                                                <TypeIcon size={14} />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                                                    <div className="flex-1">
                                                        <p className="text-[13px] sm:text-sm font-semibold text-gray-900 leading-tight">
                                                            {log.description}
                                                        </p>
                                                        <div className="flex items-center flex-wrap gap-2 mt-1.5">
                                                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${typeConfig.color}`}>
                                                                {typeConfig.label}
                                                            </span>
                                                            {!isSystem && (
                                                                <span className="text-[11px] font-medium text-gray-600 flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded">
                                                                    <User size={10} className="text-gray-400" />
                                                                    {log.user.name}
                                                                </span>
                                                            )}
                                                            {isSystem && (
                                                                <span className="text-[11px] font-medium text-gray-500 flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded">
                                                                    <Server size={10} className="text-gray-400" />
                                                                    System
                                                                </span>
                                                            )}
                                                            {log.details.ip && (
                                                                <span className="text-[11px] font-medium text-gray-500 flex items-center gap-1 hidden md:flex">
                                                                    <Globe size={10} className="text-gray-400" />
                                                                    {log.details.ip}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto mt-1 sm:mt-0">
                                                        <span className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                                            {formatTimestamp(log.timestamp)}
                                                        </span>
                                                        <button
                                                            onClick={() => toggleExpand(log.id)}
                                                            className="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                                                            title={isExpanded ? "Collapse" : "Expand"}
                                                        >
                                                            <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleViewDetails(log)}
                                                            className="p-1.5 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-md transition-colors"
                                                            title="View full details"
                                                        >
                                                            <Eye size={14} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Expanded Details */}
                                                {isExpanded && (
                                                    <div className="mt-3 p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs space-y-2 animate-in slide-in-from-top-1 fade-in duration-200">
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                            {log.details.device && (
                                                                <div className="flex items-center gap-1.5">
                                                                    <Monitor size={12} className="text-gray-400" />
                                                                    <span className="text-gray-600 font-medium">{log.details.device}</span>
                                                                </div>
                                                            )}
                                                            {log.details.browser && (
                                                                <div className="flex items-center gap-1.5">
                                                                    <Globe size={12} className="text-gray-400" />
                                                                    <span className="text-gray-600 font-medium">{log.details.browser}</span>
                                                                </div>
                                                            )}
                                                            {log.details.location && (
                                                                <div className="flex items-center gap-1.5">
                                                                    <MapPin size={12} className="text-gray-400" />
                                                                    <span className="text-gray-600">{log.details.location}</span>
                                                                </div>
                                                            )}
                                                            <div className="flex items-center gap-1.5">
                                                                <Clock size={12} className="text-gray-400" />
                                                                <span className="text-gray-600">{formatFullTimestamp(log.timestamp)}</span>
                                                            </div>
                                                        </div>
                                                        {Object.entries(log.details).filter(([key]) => !['ip', 'device', 'browser', 'location'].includes(key)).length > 0 && (
                                                            <div className="pt-2 border-t border-gray-200 flex flex-wrap gap-2">
                                                                {Object.entries(log.details)
                                                                    .filter(([key]) => !['ip', 'device', 'browser', 'location'].includes(key))
                                                                    .map(([key, value]) => (
                                                                        <span key={key} className="px-2 py-1 bg-white rounded border border-gray-200">
                                                                            <span className="text-gray-400">{key}: </span>
                                                                            <span className="text-gray-700 font-medium">{value}</span>
                                                                        </span>
                                                                    ))
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {filteredLogs.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Activity className="text-gray-400" size={28} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No activity logs found</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Try adjusting your search or filter criteria
                            </p>
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2 text-sm text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors font-medium"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredLogs.length)}</span> of{' '}
                            <span className="font-semibold text-gray-900">{filteredLogs.length}</span> logs
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                    let page;
                                    if (totalPages <= 5) {
                                        page = i + 1;
                                    } else if (currentPage <= 3) {
                                        page = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        page = totalPages - 4 + i;
                                    } else {
                                        page = currentPage - 2 + i;
                                    }
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-all ${currentPage === page
                                                ? 'bg-[#004fa2] text-white shadow-md'
                                                : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Log Details Modal */}
            {viewingLog && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-gradient-to-r from-[#004fa2] to-[#0066cc] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Activity className="text-white" size={22} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Activity Details</h2>
                                    <p className="text-blue-100 text-xs font-mono">{viewingLog.id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingLog(null)}
                                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                            <div className="space-y-5">
                                {/* Type & Severity */}
                                <div className="flex items-center flex-wrap gap-2">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium ${ACTIVITY_TYPE_CONFIG[viewingLog.type]?.color || 'bg-gray-100 text-gray-700'}`}>
                                        {React.createElement(ACTIVITY_TYPE_CONFIG[viewingLog.type]?.icon || Activity, { size: 12 })}
                                        {ACTIVITY_TYPE_CONFIG[viewingLog.type]?.label || viewingLog.type}
                                    </span>
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium text-white ${SEVERITY_CONFIG[viewingLog.severity]?.color || 'bg-gray-500'}`}>
                                        {React.createElement(SEVERITY_CONFIG[viewingLog.severity]?.icon || Info, { size: 12 })}
                                        {SEVERITY_CONFIG[viewingLog.severity]?.label || viewingLog.severity}
                                    </span>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Description</h3>
                                    <p className="text-gray-900 font-medium">{viewingLog.description}</p>
                                </div>

                                {/* User Info */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                                        <User size={14} />
                                        Performed By
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <div className={`shrink-0 w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${viewingLog.user.id === 'SYSTEM' ? 'bg-gray-500' : 'bg-gradient-to-br from-[#004fa2] to-[#0066cc]'}`}>
                                            {viewingLog.user.id === 'SYSTEM' ? <Server size={18} /> : viewingLog.user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 truncate">{viewingLog.user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{viewingLog.user.email}</p>
                                        </div>
                                        <span className="shrink-0 whitespace-nowrap ml-auto px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                            {viewingLog.user.role}
                                        </span>
                                    </div>
                                </div>

                                {/* Timestamp */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                                        <Calendar size={14} />
                                        Timestamp
                                    </h3>
                                    <p className="text-gray-900 font-medium">{formatFullTimestamp(viewingLog.timestamp)}</p>
                                </div>

                                {/* Technical Details */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                                        <Monitor size={14} />
                                        Technical Details
                                    </h3>
                                    <div className="space-y-3">
                                        {/* Device Information */}
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Device & Browser</h4>
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                {(viewingLog.deviceType || viewingLog.details?.device) && (
                                                    <div className="flex items-center gap-2">
                                                        <Monitor size={14} className="text-gray-400" />
                                                        <span className="text-gray-600">Device:</span>
                                                        <span className="text-gray-900">{viewingLog.deviceType || viewingLog.details?.device || 'Unknown'}</span>
                                                    </div>
                                                )}
                                                {viewingLog.deviceModel && (
                                                    <div className="flex items-center gap-2">
                                                        <Smartphone size={14} className="text-gray-400" />
                                                        <span className="text-gray-600">Model:</span>
                                                        <span className="text-gray-900">{viewingLog.deviceModel}</span>
                                                    </div>
                                                )}
                                                {(viewingLog.osName || viewingLog.osVersion) && (
                                                    <div className="flex items-center gap-2">
                                                        <Monitor size={14} className="text-gray-400" />
                                                        <span className="text-gray-600">OS:</span>
                                                        <span className="text-gray-900">
                                                            {viewingLog.osName} {viewingLog.osVersion}
                                                        </span>
                                                    </div>
                                                )}
                                                {(viewingLog.browserName || viewingLog.browserVersion || viewingLog.details?.browser) && (
                                                    <div className="flex items-center gap-2">
                                                        <Globe size={14} className="text-gray-400" />
                                                        <span className="text-gray-600">Browser:</span>
                                                        <span className="text-gray-900">
                                                            {viewingLog.browserName && viewingLog.browserVersion
                                                                ? `${viewingLog.browserName} ${viewingLog.browserVersion}`
                                                                : viewingLog.details?.browser || 'Unknown'}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Location Information */}
                                        <div className="space-y-2 pt-2 border-t border-gray-200">
                                            <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Location</h4>
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                {(viewingLog.city || viewingLog.region || viewingLog.country || viewingLog.details?.location) && (
                                                    <div className="flex items-center gap-2 col-span-2">
                                                        <MapPin size={14} className="text-gray-400" />
                                                        <span className="text-gray-600">Location:</span>
                                                        <span className="text-gray-900">
                                                            {viewingLog.city && viewingLog.region && viewingLog.country
                                                                ? `${viewingLog.city}, ${viewingLog.region}, ${viewingLog.country}`
                                                                : viewingLog.details?.location || 'Unknown'}
                                                        </span>
                                                    </div>
                                                )}
                                                {viewingLog.isp && (
                                                    <div className="flex items-center gap-2">
                                                        <Globe size={14} className="text-gray-400" />
                                                        <span className="text-gray-600">ISP:</span>
                                                        <span className="text-gray-900">{viewingLog.isp}</span>
                                                    </div>
                                                )}
                                                {(viewingLog.ipAddress || viewingLog.details?.ip) && (
                                                    <div className="flex items-center gap-2">
                                                        <Globe size={14} className="text-gray-400" />
                                                        <span className="text-gray-600">IP:</span>
                                                        <span className="font-mono text-gray-900">{viewingLog.ipAddress || viewingLog.details?.ip}</span>
                                                        <button 
                                                            onClick={() => copyToClipboard(viewingLog.ipAddress || viewingLog.details?.ip)} 
                                                            className="p-1 hover:bg-gray-200 rounded"
                                                        >
                                                            <Copy size={12} className="text-gray-400" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Metadata */}
                                {Object.entries(viewingLog.details).filter(([key]) => !['ip', 'device', 'browser', 'location'].includes(key)).length > 0 && (
                                    <div className="bg-blue-50 rounded-xl p-4">
                                        <h3 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                                            <Info size={14} />
                                            Additional Information
                                        </h3>
                                        <div className="space-y-2">
                                            {Object.entries(viewingLog.details)
                                                .filter(([key]) => !['ip', 'device', 'browser', 'location'].includes(key))
                                                .map(([key, value]) => (
                                                    <div key={key} className="flex items-center justify-between text-sm">
                                                        <span className="text-blue-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                        <span className="text-blue-900 font-medium">{value}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                            <button
                                onClick={() => copyToClipboard(JSON.stringify(viewingLog, null, 2))}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm flex items-center gap-1.5"
                            >
                                <Copy size={14} />
                                Copy JSON
                            </button>
                            <button
                                onClick={() => setViewingLog(null)}
                                className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-medium text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ActivityLogsPage;


