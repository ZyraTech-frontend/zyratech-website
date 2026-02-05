/**
 * Reports Page (Admin)
 * Professional admin interface for generating and viewing business reports
 */

import React, { useState, useMemo } from 'react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import {
    FileBarChart,
    Search,
    Filter,
    Eye,
    Download,
    ChevronLeft,
    ChevronRight,
    X,
    Calendar,
    Clock,
    TrendingUp,
    TrendingDown,
    Users,
    GraduationCap,
    DollarSign,
    CreditCard,
    BarChart3,
    PieChart,
    LineChart,
    Activity,
    FileText,
    Printer,
    Share2,
    RefreshCw,
    Plus,
    Settings,
    Mail,
    CheckCircle,
    AlertCircle,
    Briefcase,
    Target,
    Award,
    Star,
    Building,
    Globe,
    Percent,
    ArrowUpRight,
    ArrowDownRight,
    ChevronDown,
    Play,
    Pause,
    MoreVertical
} from 'lucide-react';

// Report type configuration
const REPORT_TYPE_CONFIG = {
    'enrollment': {
        label: 'Enrollment Report',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: GraduationCap,
        gradient: 'from-blue-500 to-cyan-500'
    },
    'revenue': {
        label: 'Revenue Report',
        color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        icon: DollarSign,
        gradient: 'from-emerald-500 to-green-500'
    },
    'user_activity': {
        label: 'User Activity',
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        icon: Activity,
        gradient: 'from-purple-500 to-violet-500'
    },
    'course_performance': {
        label: 'Course Performance',
        color: 'bg-amber-100 text-amber-700 border-amber-200',
        icon: BarChart3,
        gradient: 'from-amber-500 to-orange-500'
    },
    'payment': {
        label: 'Payment Report',
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: CreditCard,
        gradient: 'from-green-500 to-emerald-500'
    },
    'partnership': {
        label: 'Partnership Report',
        color: 'bg-indigo-100 text-indigo-700 border-indigo-200',
        icon: Building,
        gradient: 'from-indigo-500 to-blue-500'
    },
    'marketing': {
        label: 'Marketing Report',
        color: 'bg-pink-100 text-pink-700 border-pink-200',
        icon: Target,
        gradient: 'from-pink-500 to-rose-500'
    },
    'custom': {
        label: 'Custom Report',
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: FileBarChart,
        gradient: 'from-gray-500 to-slate-500'
    }
};

// Report frequency configuration
const FREQUENCY_CONFIG = {
    'one_time': { label: 'One-time', color: 'bg-gray-100 text-gray-600' },
    'daily': { label: 'Daily', color: 'bg-blue-100 text-blue-700' },
    'weekly': { label: 'Weekly', color: 'bg-green-100 text-green-700' },
    'monthly': { label: 'Monthly', color: 'bg-purple-100 text-purple-700' },
    'quarterly': { label: 'Quarterly', color: 'bg-amber-100 text-amber-700' }
};

// Mock quick stats
const quickStats = [
    {
        id: 1,
        title: 'Total Enrollments',
        value: '2,547',
        change: '+12.5%',
        trend: 'up',
        icon: GraduationCap,
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: 2,
        title: 'Revenue (MTD)',
        value: 'GHS 125,450',
        change: '+8.3%',
        trend: 'up',
        icon: DollarSign,
        color: 'from-emerald-500 to-green-500'
    },
    {
        id: 3,
        title: 'Active Students',
        value: '1,234',
        change: '+5.2%',
        trend: 'up',
        icon: Users,
        color: 'from-purple-500 to-violet-500'
    },
    {
        id: 4,
        title: 'Completion Rate',
        value: '78.5%',
        change: '-2.1%',
        trend: 'down',
        icon: Award,
        color: 'from-amber-500 to-orange-500'
    },
    {
        id: 5,
        title: 'Avg. Rating',
        value: '4.8/5',
        change: '+0.2',
        trend: 'up',
        icon: Star,
        color: 'from-yellow-500 to-amber-500'
    },
    {
        id: 6,
        title: 'Partner Companies',
        value: '45',
        change: '+3',
        trend: 'up',
        icon: Building,
        color: 'from-indigo-500 to-blue-500'
    }
];

// Mock saved reports
const mockReports = [
    {
        id: 'RPT-001',
        name: 'Monthly Enrollment Summary',
        description: 'Comprehensive overview of student enrollments across all courses',
        type: 'enrollment',
        frequency: 'monthly',
        lastGenerated: '2024-12-19T10:00:00Z',
        nextScheduled: '2025-01-01T00:00:00Z',
        createdBy: 'Admin User',
        status: 'active',
        format: 'PDF',
        recipients: ['admin@zyratech.com', 'ceo@zyratech.com'],
        metrics: ['Total Enrollments', 'New vs Returning', 'Course Breakdown', 'Demographics']
    },
    {
        id: 'RPT-002',
        name: 'Weekly Revenue Analysis',
        description: 'Detailed breakdown of revenue by course, payment method, and region',
        type: 'revenue',
        frequency: 'weekly',
        lastGenerated: '2024-12-18T08:00:00Z',
        nextScheduled: '2024-12-25T08:00:00Z',
        createdBy: 'Finance Team',
        status: 'active',
        format: 'Excel',
        recipients: ['finance@zyratech.com'],
        metrics: ['Total Revenue', 'Payment Methods', 'Refunds', 'Outstanding Payments']
    },
    {
        id: 'RPT-003',
        name: 'Course Performance Dashboard',
        description: 'Performance metrics for all active training courses',
        type: 'course_performance',
        frequency: 'monthly',
        lastGenerated: '2024-12-15T12:00:00Z',
        nextScheduled: '2025-01-15T12:00:00Z',
        createdBy: 'Admin User',
        status: 'active',
        format: 'PDF',
        recipients: ['admin@zyratech.com', 'instructors@zyratech.com'],
        metrics: ['Completion Rates', 'Student Satisfaction', 'Instructor Ratings', 'Drop-off Points']
    },
    {
        id: 'RPT-004',
        name: 'Daily User Activity Log',
        description: 'Summary of user logins, page views, and engagement metrics',
        type: 'user_activity',
        frequency: 'daily',
        lastGenerated: '2024-12-19T06:00:00Z',
        nextScheduled: '2024-12-20T06:00:00Z',
        createdBy: 'System',
        status: 'active',
        format: 'CSV',
        recipients: ['it@zyratech.com'],
        metrics: ['Active Users', 'Session Duration', 'Page Views', 'Platform Usage']
    },
    {
        id: 'RPT-005',
        name: 'Partnership Impact Report',
        description: 'Analysis of partnership contributions and student placements',
        type: 'partnership',
        frequency: 'quarterly',
        lastGenerated: '2024-10-01T10:00:00Z',
        nextScheduled: '2025-01-01T10:00:00Z',
        createdBy: 'Partnerships Team',
        status: 'active',
        format: 'PDF',
        recipients: ['partnerships@zyratech.com', 'ceo@zyratech.com'],
        metrics: ['Total Partners', 'Students Placed', 'Partner Satisfaction', 'Revenue Impact']
    },
    {
        id: 'RPT-006',
        name: 'Marketing Campaign Analysis',
        description: 'Performance analysis of marketing campaigns and lead generation',
        type: 'marketing',
        frequency: 'weekly',
        lastGenerated: '2024-12-16T09:00:00Z',
        nextScheduled: '2024-12-23T09:00:00Z',
        createdBy: 'Marketing Team',
        status: 'paused',
        format: 'PDF',
        recipients: ['marketing@zyratech.com'],
        metrics: ['Lead Sources', 'Conversion Rates', 'Campaign ROI', 'Website Traffic']
    },
    {
        id: 'RPT-007',
        name: 'Payment Reconciliation Report',
        description: 'Detailed payment transactions and reconciliation summary',
        type: 'payment',
        frequency: 'daily',
        lastGenerated: '2024-12-19T07:00:00Z',
        nextScheduled: '2024-12-20T07:00:00Z',
        createdBy: 'Finance Team',
        status: 'active',
        format: 'Excel',
        recipients: ['finance@zyratech.com', 'accounting@zyratech.com'],
        metrics: ['Transactions', 'Payment Methods', 'Failed Payments', 'Refunds']
    },
    {
        id: 'RPT-008',
        name: 'Q4 2024 Executive Summary',
        description: 'Comprehensive quarterly report for executive leadership',
        type: 'custom',
        frequency: 'one_time',
        lastGenerated: null,
        nextScheduled: null,
        createdBy: 'Admin User',
        status: 'draft',
        format: 'PDF',
        recipients: ['ceo@zyratech.com', 'board@zyratech.com'],
        metrics: ['Revenue', 'Enrollments', 'Partnerships', 'Growth Metrics', 'Forecasts']
    }
];

// Format date
const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const formatRelativeDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const ReportsPage = () => {
    const { isSuperAdmin } = usePermissions();

    // State management
    const [activeTab, setActiveTab] = useState('reports');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewingReport, setViewingReport] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const itemsPerPage = 10;

    // Filter reports
    const filteredReports = useMemo(() => {
        let result = [...mockReports];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(r =>
                r.name.toLowerCase().includes(query) ||
                r.description.toLowerCase().includes(query) ||
                r.createdBy.toLowerCase().includes(query)
            );
        }

        if (selectedType !== 'all') {
            result = result.filter(r => r.type === selectedType);
        }

        if (selectedStatus !== 'all') {
            result = result.filter(r => r.status === selectedStatus);
        }

        return result;
    }, [searchQuery, selectedType, selectedStatus]);

    // Pagination
    const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
    const paginatedReports = filteredReports.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handlers
    const handleViewReport = (report) => {
        setViewingReport(report);
    };

    const handleDownloadReport = (report) => {
        console.log('Downloading report:', report.id);
    };

    const handleRunReport = (report) => {
        console.log('Running report:', report.id);
    };

    const handleToggleStatus = (report) => {
        console.log('Toggling status for:', report.id);
    };

    const handleDeleteReport = (report) => {
        console.log('Deleting report:', report.id);
    };

    const handleExportAll = () => {
        console.log('Exporting all reports...');
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedType('all');
        setSelectedStatus('all');
        setCurrentPage(1);
    };

    return (
        <AdminLayout>
            <div className="space-y-6 pb-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                <FileBarChart className="text-white" size={22} />
                            </div>
                            Reports Center
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Generate, schedule, and download business reports
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleExportAll}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm font-medium text-sm"
                        >
                            <Download size={16} />
                            Export
                        </button>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d7a] hover:to-[#004fa2] transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
                        >
                            <Plus size={18} />
                            Create Report
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {quickStats.map((stat) => {
                        const Icon = stat.icon;
                        const isUp = stat.trend === 'up';

                        return (
                            <div
                                key={stat.id}
                                className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 text-white`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                                        <Icon className="text-white" size={18} />
                                    </div>
                                    <div className={`flex items-center gap-0.5 text-xs font-bold ${isUp ? 'text-green-200' : 'text-red-200'}`}>
                                        {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                        {stat.change}
                                    </div>
                                </div>
                                <p className="text-xl font-bold">{stat.value}</p>
                                <p className="text-xs text-white/80 mt-0.5">{stat.title}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 inline-flex">
                    <button
                        onClick={() => setActiveTab('reports')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'reports'
                            ? 'bg-[#004fa2] text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <FileText size={16} />
                        Saved Reports
                        <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'reports' ? 'bg-white/20' : 'bg-gray-100'
                            }`}>
                            {mockReports.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('quick')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'quick'
                            ? 'bg-[#004fa2] text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <BarChart3 size={16} />
                        Quick Reports
                    </button>
                    <button
                        onClick={() => setActiveTab('scheduled')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'scheduled'
                            ? 'bg-[#004fa2] text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Calendar size={16} />
                        Scheduled
                    </button>
                </div>

                {/* Filters and Search */}
                {activeTab === 'reports' && (
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search reports by name, description, or creator..."
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all"
                                />
                            </div>

                            {/* Type Filter */}
                            <div className="flex items-center gap-2">
                                <Filter className="text-gray-400" size={18} />
                                <select
                                    value={selectedType}
                                    onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                                    className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[160px]"
                                >
                                    <option value="all">All Types</option>
                                    {Object.entries(REPORT_TYPE_CONFIG).map(([key, val]) => (
                                        <option key={key} value={key}>{val.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Status Filter */}
                            <select
                                value={selectedStatus}
                                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                                className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[120px]"
                            >
                                <option value="all">All Status</option>
                                <option value="active">✓ Active</option>
                                <option value="paused">⏸ Paused</option>
                                <option value="draft">📝 Draft</option>
                            </select>

                            {/* Reset Filters */}
                            {(searchQuery || selectedType !== 'all' || selectedStatus !== 'all') && (
                                <button
                                    onClick={resetFilters}
                                    className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <X size={16} />
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Saved Reports Tab */}
                {activeTab === 'reports' && (
                    <div className="space-y-4">
                        {paginatedReports.map((report) => {
                            const typeConfig = REPORT_TYPE_CONFIG[report.type];
                            const TypeIcon = typeConfig.icon;
                            const freqConfig = FREQUENCY_CONFIG[report.frequency];

                            return (
                                <div
                                    key={report.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden"
                                >
                                    <div className="p-5">
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${typeConfig.gradient} flex items-center justify-center text-white shrink-0`}>
                                                <TypeIcon size={22} />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h3 className="font-bold text-gray-900 text-lg">{report.name}</h3>
                                                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{report.description}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${report.status === 'active' ? 'bg-green-100 text-green-700' :
                                                            report.status === 'paused' ? 'bg-amber-100 text-amber-700' :
                                                                'bg-gray-100 text-gray-600'
                                                            }`}>
                                                            {report.status}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Meta Info */}
                                                <div className="flex items-center flex-wrap gap-3 mt-3">
                                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ${typeConfig.color}`}>
                                                        <TypeIcon size={10} />
                                                        {typeConfig.label}
                                                    </span>
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${freqConfig.color}`}>
                                                        {freqConfig.label}
                                                    </span>
                                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                                        <FileText size={10} />
                                                        {report.format}
                                                    </span>
                                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                                        <Clock size={10} />
                                                        Last: {formatRelativeDate(report.lastGenerated)}
                                                    </span>
                                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                                        <Mail size={10} />
                                                        {report.recipients.length} recipient{report.recipients.length > 1 ? 's' : ''}
                                                    </span>
                                                </div>

                                                {/* Metrics */}
                                                <div className="flex flex-wrap gap-1 mt-3">
                                                    {report.metrics.slice(0, 4).map((metric, idx) => (
                                                        <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px]">
                                                            {metric}
                                                        </span>
                                                    ))}
                                                    {report.metrics.length > 4 && (
                                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded text-[10px]">
                                                            +{report.metrics.length - 4} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                        <div className="text-xs text-gray-400">
                                            Created by <span className="font-medium text-gray-600">{report.createdBy}</span>
                                            {report.nextScheduled && (
                                                <span className="ml-3">
                                                    Next run: <span className="font-medium text-gray-600">{formatDate(report.nextScheduled)}</span>
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleRunReport(report)}
                                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Run Now"
                                            >
                                                <Play size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDownloadReport(report)}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Download"
                                            >
                                                <Download size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleViewReport(report)}
                                                className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleToggleStatus(report)}
                                                className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                title={report.status === 'active' ? 'Pause' : 'Activate'}
                                            >
                                                {report.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                                            </button>
                                            <button
                                                onClick={() => { }}
                                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="More"
                                            >
                                                <MoreVertical size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Empty State */}
                        {filteredReports.length === 0 && (
                            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileBarChart className="text-gray-400" size={28} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports found</h3>
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

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <p className="text-sm text-gray-500">
                                    Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                                    <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredReports.length)}</span> of{' '}
                                    <span className="font-semibold text-gray-900">{filteredReports.length}</span> reports
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
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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
                                        ))}
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
                )}

                {/* Quick Reports Tab */}
                {activeTab === 'quick' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {Object.entries(REPORT_TYPE_CONFIG).filter(([key]) => key !== 'custom').map(([key, config]) => {
                            const Icon = config.icon;
                            return (
                                <div
                                    key={key}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                                    onClick={() => console.log('Generate quick report:', key)}
                                >
                                    <div className={`h-24 bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
                                        <Icon className="text-white" size={40} />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors">
                                            {config.label}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Generate a quick {config.label.toLowerCase()} for the current period
                                        </p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-xs text-gray-400">Instant generation</span>
                                            <button className="px-3 py-1.5 bg-gray-100 hover:bg-[#004fa2] hover:text-white text-gray-600 rounded-lg text-xs font-medium transition-all flex items-center gap-1">
                                                <Play size={12} />
                                                Generate
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Scheduled Reports Tab */}
                {activeTab === 'scheduled' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Report</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Frequency</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Run</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Next Run</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Recipients</th>
                                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {mockReports.filter(r => r.frequency !== 'one_time').map((report) => {
                                        const typeConfig = REPORT_TYPE_CONFIG[report.type];
                                        const TypeIcon = typeConfig.icon;
                                        const freqConfig = FREQUENCY_CONFIG[report.frequency];

                                        return (
                                            <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${typeConfig.gradient} flex items-center justify-center text-white shrink-0`}>
                                                            <TypeIcon size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900 text-sm">{report.name}</p>
                                                            <p className="text-xs text-gray-400">{report.format}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${freqConfig.color}`}>
                                                        {freqConfig.label}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-600">
                                                    {formatRelativeDate(report.lastGenerated)}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-600">
                                                    {formatDate(report.nextScheduled)}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-1">
                                                        <Mail size={12} className="text-gray-400" />
                                                        <span className="text-sm text-gray-600">{report.recipients.length}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${report.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                                        }`}>
                                                        {report.status === 'active' ? <CheckCircle size={10} /> : <Pause size={10} />}
                                                        {report.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <button
                                                            onClick={() => handleToggleStatus(report)}
                                                            className={`p-2 rounded-lg transition-colors ${report.status === 'active'
                                                                ? 'text-gray-400 hover:text-amber-600 hover:bg-amber-50'
                                                                : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                                                                }`}
                                                            title={report.status === 'active' ? 'Pause' : 'Activate'}
                                                        >
                                                            {report.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                                                        </button>
                                                        <button
                                                            onClick={() => handleViewReport(report)}
                                                            className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Settings"
                                                        >
                                                            <Settings size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* View Report Modal */}
            {viewingReport && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className={`px-6 py-4 bg-gradient-to-r ${REPORT_TYPE_CONFIG[viewingReport.type].gradient} flex items-center justify-between`}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    {React.createElement(REPORT_TYPE_CONFIG[viewingReport.type].icon, { className: 'text-white', size: 22 })}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">{viewingReport.name}</h2>
                                    <p className="text-white/80 text-xs">{viewingReport.id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingReport(null)}
                                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                            <div className="space-y-5">
                                {/* Status & Type */}
                                <div className="flex items-center flex-wrap gap-2">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border ${REPORT_TYPE_CONFIG[viewingReport.type].color}`}>
                                        {React.createElement(REPORT_TYPE_CONFIG[viewingReport.type].icon, { size: 12 })}
                                        {REPORT_TYPE_CONFIG[viewingReport.type].label}
                                    </span>
                                    <span className={`px-2.5 py-1 rounded text-xs font-medium ${FREQUENCY_CONFIG[viewingReport.frequency].color}`}>
                                        {FREQUENCY_CONFIG[viewingReport.frequency].label}
                                    </span>
                                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${viewingReport.status === 'active' ? 'bg-green-100 text-green-700' :
                                        viewingReport.status === 'paused' ? 'bg-amber-100 text-amber-700' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                        {viewingReport.status.toUpperCase()}
                                    </span>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 mb-1">Description</h3>
                                    <p className="text-gray-700">{viewingReport.description}</p>
                                </div>

                                {/* Schedule Info */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                                        <Calendar size={14} />
                                        Schedule
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-400">Last Generated</p>
                                            <p className="font-semibold text-gray-900">{formatDate(viewingReport.lastGenerated)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Next Scheduled</p>
                                            <p className="font-semibold text-gray-900">{formatDate(viewingReport.nextScheduled)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Metrics */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Included Metrics</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {viewingReport.metrics.map((metric, idx) => (
                                            <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                                                {metric}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Recipients */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                                        <Mail size={14} />
                                        Recipients ({viewingReport.recipients.length})
                                    </h3>
                                    <div className="space-y-1">
                                        {viewingReport.recipients.map((email, idx) => (
                                            <div key={idx} className="text-sm text-gray-700 flex items-center gap-2 py-1">
                                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                                                    {email.split('@')[0][0].toUpperCase()}
                                                </div>
                                                {email}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Format & Creator */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="bg-gray-50 rounded-xl p-3">
                                        <p className="text-gray-400">Format</p>
                                        <p className="font-semibold text-gray-900 flex items-center gap-1">
                                            <FileText size={14} />
                                            {viewingReport.format}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-3">
                                        <p className="text-gray-400">Created By</p>
                                        <p className="font-semibold text-gray-900">{viewingReport.createdBy}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                            <button
                                onClick={() => setViewingReport(null)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                            >
                                Close
                            </button>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleDownloadReport(viewingReport)}
                                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <Download size={14} />
                                    Download
                                </button>
                                <button
                                    onClick={() => handleRunReport(viewingReport)}
                                    className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <Play size={14} />
                                    Run Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Report Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                    <Plus className="text-white" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">Create New Report</h2>
                                    <p className="text-gray-500 text-xs">Configure a new scheduled report</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle className="text-amber-500" size={32} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
                                <p className="text-sm text-gray-500 max-w-md mx-auto">
                                    The report builder form will be available once the backend API is ready.
                                    You will be able to configure custom reports with flexible scheduling and delivery options.
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
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

export default ReportsPage;
