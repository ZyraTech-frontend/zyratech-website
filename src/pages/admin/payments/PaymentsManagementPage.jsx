/**
 * Payments Management Page (Admin)
 * Professional admin interface for managing transactions and revenue
 */

import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import {
    CreditCard,
    Search,
    Filter,
    Eye,
    Download,
    ChevronLeft,
    ChevronRight,
    X,
    DollarSign,
    TrendingUp,
    TrendingDown,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    RefreshCcw,
    Calendar,
    User,
    FileText,
    ArrowUpRight,
    ArrowDownRight,
    BarChart3,
    Wallet,
    Receipt,
    BadgeCheck,
    Ban,
    History,
    ExternalLink,
    Copy,
    Printer
} from 'lucide-react';

// Payment status configuration
const STATUS_CONFIG = {
    'completed': {
        label: 'Completed',
        color: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
        icon: CheckCircle,
        dotColor: 'bg-green-500'
    },
    'pending': {
        label: 'Pending',
        color: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
        icon: Clock,
        dotColor: 'bg-amber-500'
    },
    'failed': {
        label: 'Failed',
        color: 'bg-gradient-to-r from-red-500 to-rose-500 text-white',
        icon: XCircle,
        dotColor: 'bg-red-500'
    },
    'refunded': {
        label: 'Refunded',
        color: 'bg-gradient-to-r from-purple-500 to-violet-500 text-white',
        icon: RefreshCcw,
        dotColor: 'bg-purple-500'
    },
    'cancelled': {
        label: 'Cancelled',
        color: 'bg-gray-100 text-gray-600 border border-gray-200',
        icon: Ban,
        dotColor: 'bg-gray-400'
    }
};

// Payment method icons
const PAYMENT_METHODS = {
    'mobile_money': { label: 'Mobile Money', icon: '📱', color: 'bg-amber-100 text-amber-700' },
    'card': { label: 'Card', icon: '💳', color: 'bg-blue-100 text-blue-700' },
    'bank': { label: 'Bank Transfer', icon: '🏦', color: 'bg-green-100 text-green-700' },
    'paystack': { label: 'Paystack', icon: '💳', color: 'bg-cyan-100 text-cyan-700' },
    'cash': { label: 'Cash', icon: '💵', color: 'bg-emerald-100 text-emerald-700' }
};

// Mock transactions data
const mockTransactions = [
    {
        id: 'TXN-2024-001',
        reference: 'PSK_abc123xyz789',
        student: { name: 'Kwame Asante', email: 'kwame@example.com', avatar: null },
        course: 'Web Development Bootcamp',
        amount: 850.00,
        currency: 'GHS',
        method: 'mobile_money',
        status: 'completed',
        date: '2024-12-15T14:30:00Z',
        description: 'Course enrollment payment'
    },
    {
        id: 'TXN-2024-002',
        reference: 'PSK_def456uvw012',
        student: { name: 'Ama Mensah', email: 'ama@example.com', avatar: null },
        course: 'Data Science Fundamentals',
        amount: 650.00,
        currency: 'GHS',
        method: 'card',
        status: 'completed',
        date: '2024-12-14T10:15:00Z',
        description: 'Course enrollment payment'
    },
    {
        id: 'TXN-2024-003',
        reference: 'PSK_ghi789rst345',
        student: { name: 'Kofi Boateng', email: 'kofi@example.com', avatar: null },
        course: 'STEM Basics for Kids',
        amount: 350.00,
        currency: 'GHS',
        method: 'mobile_money',
        status: 'pending',
        date: '2024-12-14T09:45:00Z',
        description: 'Course enrollment - awaiting confirmation'
    },
    {
        id: 'TXN-2024-004',
        reference: 'PSK_jkl012mno678',
        student: { name: 'Fatima Ibrahim', email: 'fatima@example.com', avatar: null },
        course: 'UI/UX Design Masterclass',
        amount: 720.00,
        currency: 'GHS',
        method: 'bank',
        status: 'completed',
        date: '2024-12-13T16:20:00Z',
        description: 'Course enrollment payment'
    },
    {
        id: 'TXN-2024-005',
        reference: 'PSK_pqr345stu901',
        student: { name: 'Emmanuel Osei', email: 'emmanuel@example.com', avatar: null },
        course: 'Mobile App Development',
        amount: 950.00,
        currency: 'GHS',
        method: 'paystack',
        status: 'refunded',
        date: '2024-12-12T11:00:00Z',
        description: 'Refund processed - student request'
    },
    {
        id: 'TXN-2024-006',
        reference: 'PSK_vwx678yza234',
        student: { name: 'Grace Addo', email: 'grace@example.com', avatar: null },
        course: 'Python Programming',
        amount: 550.00,
        currency: 'GHS',
        method: 'mobile_money',
        status: 'failed',
        date: '2024-12-12T08:30:00Z',
        description: 'Payment failed - insufficient funds'
    },
    {
        id: 'TXN-2024-007',
        reference: 'PSK_bcd901efg567',
        student: { name: 'Samuel Mensah', email: 'samuel@example.com', avatar: null },
        course: 'Robotics Engineering',
        amount: 1200.00,
        currency: 'GHS',
        method: 'card',
        status: 'completed',
        date: '2024-12-11T15:45:00Z',
        description: 'Course enrollment payment'
    },
    {
        id: 'TXN-2024-008',
        reference: 'PSK_hij234klm890',
        student: { name: 'Abigail Owusu', email: 'abigail@example.com', avatar: null },
        course: 'IoT Development',
        amount: 780.00,
        currency: 'GHS',
        method: 'mobile_money',
        status: 'completed',
        date: '2024-12-10T12:10:00Z',
        description: 'Course enrollment payment'
    },
    {
        id: 'TXN-2024-009',
        reference: 'PSK_nop567qrs123',
        student: { name: 'Daniel Adjei', email: 'daniel@example.com', avatar: null },
        course: 'Cybersecurity Basics',
        amount: 680.00,
        currency: 'GHS',
        method: 'paystack',
        status: 'cancelled',
        date: '2024-12-09T09:20:00Z',
        description: 'Transaction cancelled by user'
    },
    {
        id: 'TXN-2024-010',
        reference: 'PSK_tuv890wxy456',
        student: { name: 'Linda Amponsah', email: 'linda@example.com', avatar: null },
        course: 'Machine Learning Intro',
        amount: 890.00,
        currency: 'GHS',
        method: 'bank',
        status: 'completed',
        date: '2024-12-08T14:55:00Z',
        description: 'Course enrollment payment'
    }
];

// Format currency
const formatCurrency = (amount, currency = 'GHS') => {
    return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Status badge component
const StatusBadge = ({ status }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG['pending'];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${config.color}`}>
            <Icon size={10} />
            {config.label}
        </span>
    );
};

const PaymentsManagementPage = () => {
    const dispatch = useDispatch();
    const { isSuperAdmin } = usePermissions();

    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedMethod, setSelectedMethod] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewingTransaction, setViewingTransaction] = useState(null);

    const itemsPerPage = 10;

    // Filter transactions
    const filteredTransactions = useMemo(() => {
        let result = [...mockTransactions];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(t =>
                t.id.toLowerCase().includes(query) ||
                t.reference.toLowerCase().includes(query) ||
                t.student.name.toLowerCase().includes(query) ||
                t.student.email.toLowerCase().includes(query) ||
                t.course.toLowerCase().includes(query)
            );
        }

        // Status filter
        if (selectedStatus !== 'all') {
            result = result.filter(t => t.status === selectedStatus);
        }

        // Method filter
        if (selectedMethod !== 'all') {
            result = result.filter(t => t.method === selectedMethod);
        }

        return result;
    }, [searchQuery, selectedStatus, selectedMethod]);

    // Pagination
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => {
        const completed = mockTransactions.filter(t => t.status === 'completed');
        const totalRevenue = completed.reduce((acc, t) => acc + t.amount, 0);
        const refunded = mockTransactions.filter(t => t.status === 'refunded');
        const refundedAmount = refunded.reduce((acc, t) => acc + t.amount, 0);

        return {
            totalTransactions: mockTransactions.length,
            totalRevenue,
            completedCount: completed.length,
            pendingCount: mockTransactions.filter(t => t.status === 'pending').length,
            failedCount: mockTransactions.filter(t => t.status === 'failed').length,
            refundedCount: refunded.length,
            refundedAmount,
            successRate: Math.round((completed.length / mockTransactions.length) * 100)
        };
    }, []);

    // Handlers
    const handleView = (transaction) => {
        setViewingTransaction(transaction);
    };

    const handleRefund = (transaction) => {
        dispatch(openConfirmDialog({
            title: 'Process Refund',
            message: `Are you sure you want to refund ${formatCurrency(transaction.amount)} to ${transaction.student.name}? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: () => {
                console.log('Processing refund:', transaction.id);
            }
        }));
    };

    const handleExport = () => {
        console.log('Exporting transactions...');
        // TODO: Implement CSV/Excel export
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // TODO: Show toast notification
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedStatus('all');
        setSelectedMethod('all');
        setDateRange('all');
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
                                <CreditCard className="text-white" size={22} />
                            </div>
                            Payments & Transactions
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Monitor revenue and manage payment transactions
                        </p>
                    </div>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow font-medium"
                    >
                        <Download size={18} />
                        Export Report
                    </button>
                </div>

                {/* Revenue Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Revenue */}
                    <div className="bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl p-5 shadow-lg text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-11 h-11 bg-white/20 rounded-lg flex items-center justify-center">
                                    <DollarSign className="text-white" size={22} />
                                </div>
                                <div className="flex items-center gap-1 text-emerald-300 text-xs font-medium bg-emerald-500/20 px-2 py-1 rounded-full">
                                    <ArrowUpRight size={12} />
                                    +12.5%
                                </div>
                            </div>
                            <p className="text-3xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
                            <p className="text-blue-100 text-sm mt-1">Total Revenue</p>
                        </div>
                    </div>

                    {/* Successful Transactions */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-11 h-11 bg-green-50 rounded-lg flex items-center justify-center">
                                <CheckCircle className="text-green-600" size={22} />
                            </div>
                            <div className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
                                {stats.successRate}%
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.completedCount}</p>
                        <p className="text-gray-500 text-sm mt-1">Successful Payments</p>
                    </div>

                    {/* Pending */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-11 h-11 bg-amber-50 rounded-lg flex items-center justify-center">
                                <Clock className="text-amber-600" size={22} />
                            </div>
                            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                                Awaiting
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.pendingCount}</p>
                        <p className="text-gray-500 text-sm mt-1">Pending Transactions</p>
                    </div>

                    {/* Refunds */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-11 h-11 bg-purple-50 rounded-lg flex items-center justify-center">
                                <RefreshCcw className="text-purple-600" size={22} />
                            </div>
                            <div className="flex items-center gap-1 text-red-500 text-xs font-medium bg-red-50 px-2 py-1 rounded-full">
                                <ArrowDownRight size={12} />
                                {formatCurrency(stats.refundedAmount)}
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.refundedCount}</p>
                        <p className="text-gray-500 text-sm mt-1">Refunds Processed</p>
                    </div>
                </div>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <button
                        onClick={() => { setSelectedStatus('all'); setCurrentPage(1); }}
                        className={`p-3 rounded-lg border text-center transition-all ${selectedStatus === 'all'
                                ? 'bg-[#004fa2] text-white border-[#004fa2]'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-[#004fa2]/50'
                            }`}
                    >
                        <p className="text-lg font-bold">{stats.totalTransactions}</p>
                        <p className="text-xs opacity-80">All Transactions</p>
                    </button>
                    <button
                        onClick={() => { setSelectedStatus('completed'); setCurrentPage(1); }}
                        className={`p-3 rounded-lg border text-center transition-all ${selectedStatus === 'completed'
                                ? 'bg-green-500 text-white border-green-500'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-green-500/50'
                            }`}
                    >
                        <p className="text-lg font-bold">{stats.completedCount}</p>
                        <p className="text-xs opacity-80">Completed</p>
                    </button>
                    <button
                        onClick={() => { setSelectedStatus('pending'); setCurrentPage(1); }}
                        className={`p-3 rounded-lg border text-center transition-all ${selectedStatus === 'pending'
                                ? 'bg-amber-500 text-white border-amber-500'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-amber-500/50'
                            }`}
                    >
                        <p className="text-lg font-bold">{stats.pendingCount}</p>
                        <p className="text-xs opacity-80">Pending</p>
                    </button>
                    <button
                        onClick={() => { setSelectedStatus('failed'); setCurrentPage(1); }}
                        className={`p-3 rounded-lg border text-center transition-all ${selectedStatus === 'failed'
                                ? 'bg-red-500 text-white border-red-500'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-red-500/50'
                            }`}
                    >
                        <p className="text-lg font-bold">{stats.failedCount}</p>
                        <p className="text-xs opacity-80">Failed</p>
                    </button>
                    <button
                        onClick={() => { setSelectedStatus('refunded'); setCurrentPage(1); }}
                        className={`p-3 rounded-lg border text-center transition-all ${selectedStatus === 'refunded'
                                ? 'bg-purple-500 text-white border-purple-500'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-purple-500/50'
                            }`}
                    >
                        <p className="text-lg font-bold">{stats.refundedCount}</p>
                        <p className="text-xs opacity-80">Refunded</p>
                    </button>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by ID, reference, student, or course..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-400" size={18} />
                            <select
                                value={selectedStatus}
                                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                                className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[130px]"
                            >
                                <option value="all">All Status</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                                <option value="refunded">Refunded</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        {/* Method Filter */}
                        <select
                            value={selectedMethod}
                            onChange={(e) => { setSelectedMethod(e.target.value); setCurrentPage(1); }}
                            className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[150px]"
                        >
                            <option value="all">All Methods</option>
                            {Object.entries(PAYMENT_METHODS).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                            ))}
                        </select>

                        {/* Date Range */}
                        <select
                            value={dateRange}
                            onChange={(e) => { setDateRange(e.target.value); }}
                            className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[130px]"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="quarter">This Quarter</option>
                        </select>

                        {/* Reset Filters */}
                        {(searchQuery || selectedStatus !== 'all' || selectedMethod !== 'all' || dateRange !== 'all') && (
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

                {/* Transactions Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Transaction</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Method</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedTransactions.map((transaction) => {
                                    const methodConfig = PAYMENT_METHODS[transaction.method] || PAYMENT_METHODS['card'];
                                    const statusConfig = STATUS_CONFIG[transaction.status];

                                    return (
                                        <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${statusConfig.dotColor}`}></div>
                                                    <div>
                                                        <p className="font-mono text-sm font-semibold text-gray-900">{transaction.id}</p>
                                                        <p className="text-xs text-gray-400 font-mono">{transaction.reference.slice(0, 16)}...</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-xs font-bold">
                                                        {transaction.student.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-sm">{transaction.student.name}</p>
                                                        <p className="text-xs text-gray-400">{transaction.student.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-700 max-w-[180px] truncate">{transaction.course}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className={`text-sm font-bold ${transaction.status === 'refunded' ? 'text-purple-600' :
                                                        transaction.status === 'completed' ? 'text-green-600' : 'text-gray-900'
                                                    }`}>
                                                    {transaction.status === 'refunded' && '-'}
                                                    {formatCurrency(transaction.amount, transaction.currency)}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${methodConfig.color}`}>
                                                    <span>{methodConfig.icon}</span>
                                                    {methodConfig.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={transaction.status} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-600">{formatDate(transaction.date)}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => handleView(transaction)}
                                                        className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    {transaction.status === 'completed' && (
                                                        <button
                                                            onClick={() => handleRefund(transaction)}
                                                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                            title="Process Refund"
                                                        >
                                                            <RefreshCcw size={16} />
                                                        </button>
                                                    )}
                                                    <button
                                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                        title="Download Receipt"
                                                    >
                                                        <Receipt size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredTransactions.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CreditCard className="text-gray-400" size={28} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
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
                            <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredTransactions.length)}</span> of{' '}
                            <span className="font-semibold text-gray-900">{filteredTransactions.length}</span> transactions
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

            {/* Transaction Details Modal */}
            {viewingTransaction && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-gradient-to-r from-[#004fa2] to-[#0066cc] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Receipt className="text-white" size={22} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Transaction Details</h2>
                                    <p className="text-blue-100 text-xs font-mono">{viewingTransaction.id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingTransaction(null)}
                                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                            <div className="space-y-5">
                                {/* Amount & Status */}
                                <div className="bg-gray-50 rounded-xl p-5 text-center">
                                    <p className={`text-4xl font-bold ${viewingTransaction.status === 'refunded' ? 'text-purple-600' :
                                            viewingTransaction.status === 'completed' ? 'text-green-600' :
                                                viewingTransaction.status === 'failed' ? 'text-red-600' : 'text-gray-900'
                                        }`}>
                                        {viewingTransaction.status === 'refunded' && '-'}
                                        {formatCurrency(viewingTransaction.amount, viewingTransaction.currency)}
                                    </p>
                                    <div className="mt-3">
                                        <StatusBadge status={viewingTransaction.status} />
                                    </div>
                                </div>

                                {/* Transaction Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-xs font-medium text-gray-500 mb-1">Transaction ID</p>
                                        <div className="flex items-center gap-2">
                                            <p className="font-mono text-sm font-semibold text-gray-900">{viewingTransaction.id}</p>
                                            <button
                                                onClick={() => copyToClipboard(viewingTransaction.id)}
                                                className="p-1 text-gray-400 hover:text-gray-600 rounded"
                                            >
                                                <Copy size={12} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-xs font-medium text-gray-500 mb-1">Reference</p>
                                        <div className="flex items-center gap-2">
                                            <p className="font-mono text-sm font-semibold text-gray-900 truncate">{viewingTransaction.reference}</p>
                                            <button
                                                onClick={() => copyToClipboard(viewingTransaction.reference)}
                                                className="p-1 text-gray-400 hover:text-gray-600 rounded shrink-0"
                                            >
                                                <Copy size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Student Info */}
                                <div className="border border-gray-200 rounded-xl p-4">
                                    <p className="text-xs font-medium text-gray-500 mb-3">Student Information</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white font-bold">
                                            {viewingTransaction.student.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{viewingTransaction.student.name}</p>
                                            <p className="text-sm text-gray-500">{viewingTransaction.student.email}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Course & Payment Details */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-xs font-medium text-gray-500 mb-1">Course</p>
                                        <p className="font-semibold text-gray-900">{viewingTransaction.course}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-xs font-medium text-gray-500 mb-1">Payment Method</p>
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${PAYMENT_METHODS[viewingTransaction.method]?.color}`}>
                                            <span>{PAYMENT_METHODS[viewingTransaction.method]?.icon}</span>
                                            {PAYMENT_METHODS[viewingTransaction.method]?.label}
                                        </span>
                                    </div>
                                </div>

                                {/* Date & Description */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-xs font-medium text-gray-500 mb-1">Date & Time</p>
                                        <p className="font-semibold text-gray-900">{formatDate(viewingTransaction.date)}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-xs font-medium text-gray-500 mb-1">Description</p>
                                        <p className="text-sm text-gray-700">{viewingTransaction.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                            <button
                                onClick={() => setViewingTransaction(null)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                            >
                                Close
                            </button>
                            <div className="flex items-center gap-2">
                                {viewingTransaction.status === 'completed' && (
                                    <button
                                        onClick={() => {
                                            setViewingTransaction(null);
                                            handleRefund(viewingTransaction);
                                        }}
                                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium text-sm flex items-center gap-1.5"
                                    >
                                        <RefreshCcw size={14} />
                                        Process Refund
                                    </button>
                                )}
                                <button
                                    className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <Printer size={14} />
                                    Print Receipt
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default PaymentsManagementPage;
