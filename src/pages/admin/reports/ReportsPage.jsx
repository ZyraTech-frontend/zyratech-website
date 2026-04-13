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

    const itemsPerPage = 6;

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

                {/* Quick Stats - Ultra High Density */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
                    {quickStats.map((stat) => {
                        const Icon = stat.icon;
                        const isUp = stat.trend === 'up';

                        return (
                            <div
                                key={stat.id}
                                className="group bg-white rounded-lg p-2 sm:p-2.5 shadow-sm border border-gray-200 hover:border-[#004fa2]/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-0"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors uppercase tracking-wider truncate pr-2">
                                        {stat.title}
                                    </p>
                                    <Icon className="text-gray-300 group-hover:text-[#004fa2] transition-colors duration-300 shrink-0" size={12} />
                                </div>
                                <div className="flex items-end justify-between gap-1.5 mt-0.5 sm:mt-1">
                                    <p className="text-[13px] sm:text-[15px] font-extrabold text-gray-900 truncate leading-none pt-0.5">
                                        {stat.value}
                                    </p>
                                    <div className={`flex items-center gap-0.5 text-[8.5px] sm:text-[9px] font-bold px-1 py-0.5 rounded leading-none shrink-0 ${isUp ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                        {isUp ? <ArrowUpRight size={8} strokeWidth={3} /> : <ArrowDownRight size={8} strokeWidth={3} />}
                                        {stat.change}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Tabs - Sleek & Compact */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-1 inline-flex w-full sm:w-auto overflow-x-auto scrollbar-hide shadow-sm shrink-0 items-center justify-start">
                    <button
                        onClick={() => setActiveTab('reports')}
                        className={`shrink-0 px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all flex items-center gap-1.5 ${activeTab === 'reports'
                            ? 'bg-white text-[#004fa2] shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                    >
                        <FileText size={14} />
                        Saved 
                        <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${activeTab === 'reports' ? 'bg-[#004fa2]/10 text-[#004fa2]' : 'bg-gray-200'
                            }`}>
                            {mockReports.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('quick')}
                        className={`shrink-0 px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all flex items-center gap-1.5 ${activeTab === 'quick'
                            ? 'bg-white text-[#004fa2] shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                    >
                        <BarChart3 size={14} />
                        Quick
                    </button>
                    <button
                        onClick={() => setActiveTab('scheduled')}
                        className={`shrink-0 px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all flex items-center gap-1.5 ${activeTab === 'scheduled'
                            ? 'bg-white text-[#004fa2] shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                    >
                        <Calendar size={14} />
                        Scheduled
                    </button>
                </div>

                {/* Filters and Search - Ultra Compact Dropdowns */}
                {activeTab === 'reports' && (
                    <div className="bg-white rounded-xl p-2 sm:p-2.5 shadow-sm border border-gray-200">
                        <div className="flex flex-col md:flex-row gap-2">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search reports..."
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                    className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004fa2] text-[12px] bg-gray-50/50 transition-all font-medium h-[34px]"
                                />
                            </div>

                            {/* Filters Row */}
                            <div className="flex gap-2">
                                <select
                                    value={selectedType}
                                    onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                                    className="flex-1 sm:flex-none px-1.5 sm:px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004fa2] text-[11px] sm:text-xs bg-gray-50/50 min-w-0 font-medium h-[34px]"
                                >
                                    <option value="all">All Types</option>
                                    {Object.entries(REPORT_TYPE_CONFIG).map(([key, val]) => (
                                        <option key={key} value={key}>{val.label}</option>
                                    ))}
                                </select>

                                <select
                                    value={selectedStatus}
                                    onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                                    className="flex-1 sm:flex-none px-1.5 sm:px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004fa2] text-[11px] sm:text-xs bg-gray-50/50 min-w-0 font-medium h-[34px]"
                                >
                                    <option value="all">Status</option>
                                    <option value="active">Active</option>
                                    <option value="paused">Paused</option>
                                    <option value="draft">Draft</option>
                                </select>

                                {(searchQuery || selectedType !== 'all' || selectedStatus !== 'all') && (
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
                )}

                {/* Saved Reports Tab - High Density Flow */}
                {activeTab === 'reports' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pb-4">
                        {paginatedReports.map((report) => {
                            const typeConfig = REPORT_TYPE_CONFIG[report.type];
                            const TypeIcon = typeConfig.icon;
                            const freqConfig = FREQUENCY_CONFIG[report.frequency];

                            return (
                                <div
                                    key={report.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-[#004fa2]/40 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group relative"
                                >
                                    <div className="p-3 sm:p-4 flex-1">
                                        <div className="flex items-start gap-3">
                                            {/* Icon */}
                                            <div className={`w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 shrink-0 group-hover:bg-[#004fa2]/5 transition-colors`}>
                                                <TypeIcon size={18} />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="font-bold text-gray-900 text-[13px] sm:text-sm truncate pr-2 group-hover:text-[#004fa2] transition-colors">{report.name}</h3>
                                                        <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 line-clamp-1">{report.description}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1 shrink-0 bg-gray-50 border border-gray-100 rounded-md px-1.5 py-0.5">
                                                        <span className={`w-1.5 h-1.5 rounded-full ${report.status === 'active' ? 'bg-green-500' :
                                                            report.status === 'paused' ? 'bg-amber-500' : 'bg-gray-400'}`} />
                                                        <span className="text-[9px] font-bold uppercase text-gray-600 tracking-wider">
                                                            {report.status}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Meta Info */}
                                                <div className="flex items-center flex-wrap gap-2 mt-2.5">
                                                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${typeConfig.color}`}>
                                                        {typeConfig.label}
                                                    </span>
                                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${freqConfig.color}`}>
                                                        {freqConfig.label}
                                                    </span>
                                                    <span className="text-[10px] font-medium text-gray-500 flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                                        <FileText size={10} className="text-gray-400" />
                                                        {report.format}
                                                    </span>
                                                    <span className="text-[10px] font-medium text-gray-500 flex items-center gap-1">
                                                        <Mail size={10} className="text-gray-400" />
                                                        {report.recipients.length} rec.
                                                    </span>
                                                </div>
                                                
                                                {/* Metrics Space (optional spacing element instead of listing them full) */}
                                                <div className="flex flex-wrap gap-1 md:gap-1.5 mt-2.5 pt-2.5 border-t border-gray-50">
                                                    {report.metrics.slice(0, 3).map((metric, idx) => (
                                                        <span key={idx} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[9px] font-medium truncate max-w-[100px]">
                                                            {metric}
                                                        </span>
                                                    ))}
                                                    {report.metrics.length > 3 && (
                                                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-400 rounded text-[9px] font-medium">
                                                            +{report.metrics.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions & Footer */}
                                    <div className="px-3 py-2 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                                        <div className="text-[10px] font-medium text-gray-500 flex flex-wrap gap-2 truncate">
                                            <span>By {report.createdBy}</span>
                                            {report.nextScheduled && (
                                                <span className="flex items-center gap-1 before:content-['•'] before:text-gray-300 before:mr-1 max-sm:hidden">
                                                    <Clock size={10} />
                                                    {formatDate(report.nextScheduled).split(',')[0]}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0 ml-2">
                                            <button
                                                onClick={() => handleRunReport(report)}
                                                className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                                                title="Run Now"
                                            >
                                                <Play size={13} />
                                            </button>
                                            <button
                                                onClick={() => handleDownloadReport(report)}
                                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                title="Download"
                                            >
                                                <Download size={13} />
                                            </button>
                                            <button
                                                onClick={() => handleViewReport(report)}
                                                className="p-1.5 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={13} />
                                            </button>
                                            <button
                                                onClick={() => handleToggleStatus(report)}
                                                className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                                            >
                                                {report.status === 'active' ? <Pause size={13} /> : <Play size={13} />}
                                            </button>
                                            <button
                                                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                                            >
                                                <MoreVertical size={13} />
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
                            <div className="flex justify-center sm:justify-between items-center bg-white rounded-xl p-2.5 sm:p-3 shadow-sm border border-gray-200 mt-2">
                                <p className="text-[11px] sm:text-xs text-gray-500 font-medium hidden sm:block">
                                    Showing <span className="font-bold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                                    <span className="font-bold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredReports.length)}</span> of{' '}
                                    <span className="font-bold text-gray-900">{filteredReports.length}</span> reports
                                </p>
                                <div className="flex items-center gap-1 sm:ml-auto">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`min-w-[28px] h-7 px-2 rounded-md text-[11px] font-bold transition-all ${currentPage === page
                                                    ? 'bg-[#004fa2] text-white shadow-sm'
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
                                        className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Quick Reports Tab - High Density */}
                {activeTab === 'quick' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {Object.entries(REPORT_TYPE_CONFIG).filter(([key]) => key !== 'custom').map(([key, config]) => {
                            const Icon = config.icon;
                            return (
                                <div
                                    key={key}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-[#004fa2]/40 transition-all duration-300 group cursor-pointer overflow-hidden flex items-stretch"
                                    onClick={() => console.log('Generate quick report:', key)}
                                >
                                    <div className={`w-12 shrink-0 bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
                                        <Icon className="text-white opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all" size={20} />
                                    </div>
                                    <div className="p-3 flex-1 min-w-0 flex flex-col justify-center">
                                        <h3 className="font-bold text-gray-900 text-[13px] group-hover:text-[#004fa2] transition-colors truncate">
                                            {config.label}
                                        </h3>
                                        <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">
                                            Generate for current period
                                        </p>
                                        <div className="mt-2 text-[#004fa2] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 group-hover:underline">
                                            <Play size={8} /> Run Now
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
                            <table className="w-full min-w-[800px]">
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

            {/* View Report Modal - High Density & Professional */}
            {viewingReport && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 sm:p-4">
                    <div className="bg-white sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl max-h-[90vh] flex flex-col md:overflow-hidden rounded-t-2xl animate-fade-in-up sm:animate-scale-in">
                        {/* Modal Header */}
                        <div className={`px-4 sm:px-6 py-4 bg-gradient-to-r ${REPORT_TYPE_CONFIG[viewingReport.type].gradient} flex items-start justify-between gap-4 shrink-0`}>
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-white/20 sm:bg-white/20 rounded-xl flex items-center justify-center shadow-sm">
                                    {React.createElement(REPORT_TYPE_CONFIG[viewingReport.type].icon, { className: 'text-white', size: 22 })}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-sm sm:text-lg font-bold text-white leading-tight mb-0.5 pr-2 truncate">{viewingReport.name}</h2>
                                    <p className="text-white/80 text-[10px] sm:text-xs font-medium tracking-wide uppercase">{viewingReport.id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingReport(null)}
                                className="p-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all shrink-0 -mr-2 sm:mr-0"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 sm:p-6 overflow-y-auto w-full">
                            <div className="space-y-5 sm:space-y-6">
                                {/* Status & Type - Compact Row */}
                                <div className="flex items-center flex-wrap gap-2">
                                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${REPORT_TYPE_CONFIG[viewingReport.type].color}`}>
                                        {React.createElement(REPORT_TYPE_CONFIG[viewingReport.type].icon, { size: 10 })}
                                        {REPORT_TYPE_CONFIG[viewingReport.type].label}
                                    </span>
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${FREQUENCY_CONFIG[viewingReport.frequency].color}`}>
                                        {FREQUENCY_CONFIG[viewingReport.frequency].label}
                                    </span>
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${viewingReport.status === 'active' ? 'bg-green-100 text-green-700' :
                                        viewingReport.status === 'paused' ? 'bg-amber-100 text-amber-700' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${viewingReport.status === 'active' ? 'bg-green-500' : viewingReport.status === 'paused' ? 'bg-amber-500' : 'bg-gray-400'}`} />
                                        {viewingReport.status}
                                    </span>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Description</h3>
                                    <p className="text-[13px] sm:text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">{viewingReport.description}</p>
                                </div>

                                {/* Schedule Info */}
                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 sm:p-4">
                                        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                                            <Calendar size={12} /> Last Generated
                                        </div>
                                        <div className="text-[13px] sm:text-sm font-bold text-gray-900 truncate">
                                            {formatDate(viewingReport.lastGenerated)}
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 sm:p-4">
                                        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                                            <Clock size={12} /> Next Scheduled
                                        </div>
                                        <div className="text-[13px] sm:text-sm font-bold text-gray-900 truncate">
                                            {formatDate(viewingReport.nextScheduled)}
                                        </div>
                                    </div>
                                </div>

                                {/* Metrics */}
                                <div>
                                    <h3 className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Included Metrics</h3>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {viewingReport.metrics.map((metric, idx) => (
                                            <span key={idx} className="px-2.5 py-1 text-[11px] sm:text-xs bg-cyan-50/50 border border-cyan-100 text-[#004fa2] rounded-lg font-semibold hover:bg-cyan-50 transition-colors">
                                                {metric}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Recipients */}
                                <div>
                                    <h3 className="text-[11px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <Mail size={12} />
                                        Recipients <span className="bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-md text-[9px]">{viewingReport.recipients.length}</span>
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {viewingReport.recipients.map((email, idx) => (
                                            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-2.5 flex items-center gap-2.5 shadow-sm">
                                                <div className="w-8 h-8 rounded-full bg-[#004fa2]/10 flex items-center justify-center text-[#004fa2] text-[11px] font-bold shrink-0">
                                                    {email.split('@')[0][0].toUpperCase()}
                                                </div>
                                                <p className="text-[12px] text-gray-800 font-semibold truncate min-w-0" title={email}>{email}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Format & Creator */}
                                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-0">
                                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                                        <div className="w-9 h-9 rounded-lg bg-gray-200/60 flex items-center justify-center shrink-0">
                                            <FileText size={16} className="text-gray-500" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[10px] text-gray-400 uppercase font-semibold">Format</p>
                                            <p className="text-[12px] sm:text-sm font-bold text-gray-900 truncate">
                                                {viewingReport.format}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                                        <div className="w-9 h-9 rounded-lg bg-gray-200/60 flex items-center justify-center shrink-0">
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[10px] text-gray-400 uppercase font-semibold">Created By</p>
                                            <p className="text-[12px] sm:text-sm font-bold text-gray-900 truncate">
                                                {viewingReport.createdBy}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer - Responsive */}
                        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 bg-gray-50 flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-3 shrink-0">
                            <button
                                onClick={() => setViewingReport(null)}
                                className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors font-bold text-[13px] sm:text-sm"
                            >
                                Close
                            </button>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <button
                                    onClick={() => handleDownloadReport(viewingReport)}
                                    className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors shadow-sm font-bold text-[13px] sm:text-sm flex items-center justify-center gap-1.5 whitespace-nowrap"
                                >
                                    <Download size={15} className="text-gray-500" />
                                    Download
                                </button>
                                <button
                                    onClick={() => handleRunReport(viewingReport)}
                                    className="flex-1 sm:flex-none px-5 py-2 bg-[#004fa2] border border-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-all shadow-md hover:shadow-lg font-bold text-[13px] sm:text-sm flex items-center justify-center gap-1.5 whitespace-nowrap"
                                >
                                    <Play size={15} className="fill-current" />
                                    Run Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Report Modal - Professional UI Form */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 sm:p-4">
                    <div className="bg-white sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl max-h-[90vh] flex flex-col md:overflow-hidden rounded-t-2xl animate-fade-in-up sm:animate-scale-in">
                        {/* Modal Header */}
                        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-start justify-between gap-4 bg-gray-50/50 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                    <Plus className="text-white" size={22} />
                                </div>
                                <div>
                                    <h2 className="text-sm sm:text-lg font-bold text-gray-900">Create New Report</h2>
                                    <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5">Configure report parameters and schedule</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors shrink-0 -mt-1 sm:mt-0"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 sm:p-6 overflow-y-auto w-full">
                            <form className="space-y-6">
                                {/* Basic Details */}
                                <div>
                                    <h3 className="text-[11px] sm:text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Basic Information</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1.5">Report Name <span className="text-red-500">*</span></label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Q1 Marketing Campaign Analysis" 
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-white shadow-sm transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1.5">Description</label>
                                            <textarea 
                                                placeholder="Briefly describe the purpose of this report..." 
                                                rows="2"
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-white shadow-sm transition-all resize-none"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                {/* Configuration */}
                                <div>
                                    <h3 className="text-[11px] sm:text-xs font-bold text-gray-800 uppercase tracking-wider mb-3 pt-2 border-t border-gray-100">Configuration</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1.5">Data Source (Type) <span className="text-red-500">*</span></label>
                                            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-white shadow-sm transition-all">
                                                <option value="" disabled selected>Select a report type...</option>
                                                {Object.entries(REPORT_TYPE_CONFIG).map(([key, val]) => (
                                                    <option key={key} value={key}>{val.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1.5">Export Format <span className="text-red-500">*</span></label>
                                            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-white shadow-sm transition-all">
                                                <option value="PDF">PDF Document (.pdf)</option>
                                                <option value="Excel">Excel Spreadsheet (.xlsx)</option>
                                                <option value="CSV">Data File (.csv)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Schedule & Delivery */}
                                <div>
                                    <h3 className="text-[11px] sm:text-xs font-bold text-gray-800 uppercase tracking-wider mb-3 pt-2 border-t border-gray-100">Schedule & Delivery</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1.5">Generation Frequency</label>
                                            <select className="w-full sm:w-1/2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-white shadow-sm transition-all">
                                                <option value="one_time">One-time (Run immediately)</option>
                                                <option value="daily">Daily</option>
                                                <option value="weekly">Weekly</option>
                                                <option value="monthly">Monthly</option>
                                                <option value="quarterly">Quarterly</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                                                Recipients <span className="text-gray-400 font-normal">(comma separated emails)</span>
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                                <input 
                                                    type="text" 
                                                    placeholder="admin@zyratech.com, managers@zyratech.com" 
                                                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-white shadow-sm transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 bg-gray-50 flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-3 shrink-0">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors font-bold text-[13px] sm:text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    /* Fake submit logic for now */
                                    console.log("Create button clicked");
                                    setShowCreateModal(false);
                                }}
                                className="w-full sm:w-auto px-6 py-2 bg-[#004fa2] border border-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] hover:shadow-lg transition-all font-bold text-[13px] sm:text-sm flex items-center justify-center gap-1.5"
                            >
                                <CheckCircle size={15} className="text-white" />
                                Save & Create Report
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ReportsPage;
