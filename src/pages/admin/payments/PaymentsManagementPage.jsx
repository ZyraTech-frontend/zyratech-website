/**
 * Payments Management Page (Admin)
 * Professional admin interface for managing transactions and revenue
 */

import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
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
        student: { name: 'Samuel Dogbe', email: 'samuel@example.com', avatar: null },
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
        student: { name: 'Eunice Mensah', email: 'eunice@example.com', avatar: null },
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
        student: { name: 'Daniel Antwi', email: 'daniel@example.com', avatar: null },
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
        dispatch(addNotification({
            type: 'info',
            message: 'Exporting transactions report...'
        }));
        // Simulate export delay
        setTimeout(() => {
            dispatch(addNotification({
                type: 'success',
                message: 'Transactions report exported successfully'
            }));
        }, 1500);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        dispatch(addNotification({
            type: 'success',
            message: 'Copied to clipboard'
        }));
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
            <div className="space-y-3 md:space-y-6 pb-8">
                {/* Page Header & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                            <CreditCard size={18} className="text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-[11px] md:text-base font-bold text-gray-900 leading-tight">Payments & Transactions</h1>
                            <p className="text-[10px] text-gray-500">Monitor revenue and manage payment transactions</p>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleExport}
                        className="w-full md:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-all shadow-sm text-xs font-semibold"
                    >
                        <Download size={14} /> Export Report
                    </button>
                </div>

                {/* Revenue Overview Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    <div className="bg-[#004fa2] rounded-xl p-3 shadow text-white relative overflow-hidden flex flex-col justify-between h-full">
                        <div className="flex items-center justify-between mb-2 z-10">
                            <div className="bg-white/20 p-1.5 rounded-lg"><DollarSign size={16} /></div>
                            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded flex items-center gap-0.5">+12.5%<ArrowUpRight size={10} /></span>
                        </div>
                        <div className="z-10 mt-auto">
                            <p className="text-xl font-black leading-none">{formatCurrency(stats.totalRevenue)}</p>
                            <p className="text-[10px] text-blue-100 font-medium tracking-wide">Total Revenue</p>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-10"><DollarSign size={80} /></div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow relative overflow-hidden cursor-pointer" onClick={() => { setSelectedStatus('completed'); setCurrentPage(1); }}>
                        <div className="flex items-center justify-between mb-1">
                            <div className="bg-green-50 p-1.5 rounded-lg"><CheckCircle className="text-green-600" size={16} /></div>
                            <span className="text-[10px] bg-green-50 text-green-700 font-bold px-1.5 py-0.5 rounded">{stats.successRate}%</span>
                        </div>
                        <div className="mt-2">
                            <p className="text-xl font-bold text-gray-900 leading-none">{stats.completedCount}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Successful</p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow relative overflow-hidden cursor-pointer" onClick={() => { setSelectedStatus('pending'); setCurrentPage(1); }}>
                        <div className="flex items-center justify-between mb-1">
                            <div className="bg-amber-50 p-1.5 rounded-lg"><Clock className="text-amber-600" size={16} /></div>
                        </div>
                        <div className="mt-2">
                            <p className="text-xl font-bold text-gray-900 leading-none">{stats.pendingCount}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Pending</p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow relative overflow-hidden cursor-pointer" onClick={() => { setSelectedStatus('refunded'); setCurrentPage(1); }}>
                        <div className="flex items-center justify-between mb-1">
                            <div className="bg-purple-50 p-1.5 rounded-lg"><RefreshCcw className="text-purple-600" size={16} /></div>
                        </div>
                        <div className="mt-2">
                            <p className="text-xl font-bold text-gray-900 leading-none">{stats.refundedCount}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Refunds</p>
                        </div>
                    </div>
                </div>

                {/* Quick Status Bar */}
                <div className="flex flex-wrap text-[11px] gap-2 mb-4">
                    {[
                        { label: 'All', id: 'all', count: stats.totalTransactions, active: selectedStatus === 'all' },
                        { label: 'Completed', id: 'completed', count: stats.completedCount, active: selectedStatus === 'completed' },
                        { label: 'Pending', id: 'pending', count: stats.pendingCount, active: selectedStatus === 'pending' },
                        { label: 'Failed', id: 'failed', count: stats.failedCount, active: selectedStatus === 'failed' },
                        { label: 'Refunded', id: 'refunded', count: stats.refundedCount, active: selectedStatus === 'refunded' }
                    ].map(st => (
                        <button
                            key={st.id}
                            onClick={() => { setSelectedStatus(st.id); setCurrentPage(1); }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${st.active ? 'bg-[#004fa2] text-white border-[#004fa2]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                        >
                            {st.label} <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${st.active ? 'bg-white/20' : 'bg-gray-100'}`}>{st.count}</span>
                        </button>
                    ))}
                </div>

                {/* Filters and Search */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-2 mb-4">
                    <div className="col-span-2 md:col-span-5 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search ID, reference, student, course..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2 relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                            className="w-full px-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                            <option value="refunded">Refunded</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="col-span-1 md:col-span-3 relative">
                        <select
                            value={selectedMethod}
                            onChange={(e) => { setSelectedMethod(e.target.value); setCurrentPage(1); }}
                            className="w-full px-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                        >
                            <option value="all">All Methods</option>
                            {Object.entries(PAYMENT_METHODS).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-1 md:col-span-2 relative">
                        <select
                            value={dateRange}
                            onChange={(e) => { setDateRange(e.target.value); }}
                            className="w-full px-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="quarter">This Quarter</option>
                        </select>
                    </div>

                    {(searchQuery || selectedStatus !== 'all' || selectedMethod !== 'all' || dateRange !== 'all') && (
                        <div className="col-span-1 flex items-center justify-end">
                            <button onClick={resetFilters} className="bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 h-[34px] xl:px-4 rounded-xl transition-colors shadow-sm flex items-center justify-center shrink-0 w-full xl:w-auto gap-1 text-[11px] font-semibold">
                                <X size={12} /> <span className="hidden xl:inline">Reset</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Transactions Grid */}
                <div className="flex flex-col gap-2">
                    {paginatedTransactions.map((transaction) => {
                        const methodConfig = PAYMENT_METHODS[transaction.method] || PAYMENT_METHODS['card'];
                        const statusConfig = STATUS_CONFIG[transaction.status];

                        return (
                            <div key={transaction.id} className={`bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col xl:flex-row xl:items-center p-3 gap-3 hover:border-[#004fa2] transition-colors group relative overflow-hidden ${transaction.status === 'failed' ? 'border-red-100' : ''}`}>
                                {/* ID and Status Left Indicator */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${statusConfig.dotColor}`}></div>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 xl:w-1/3 min-w-0">
                                    <div className="flex items-start gap-3 min-w-0">
                                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-xs font-bold shrink-0">
                                            {transaction.student.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-gray-900 text-xs truncate">{transaction.student.name}</p>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <p className="font-mono text-[9px] font-bold text-gray-500">{transaction.id}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="xl:w-1/3 py-1 xl:py-0 border-y xl:border-y-0 border-gray-50">
                                    <p className="text-[11px] font-medium text-gray-800 line-clamp-1">{transaction.course}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium ${methodConfig.color}`}>
                                            <span>{methodConfig.icon}</span> {methodConfig.label}
                                        </span>
                                        <span className="text-[9px] text-gray-400 font-mono tracking-wider">{formatDate(transaction.date)}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between xl:justify-end gap-4 xl:w-1/3 shrink-0">
                                    <div className="text-left xl:text-right">
                                        <p className={`text-sm font-black ${transaction.status === 'refunded' ? 'text-purple-600' : transaction.status === 'completed' ? 'text-green-600' : transaction.status === 'failed' ? 'text-red-500' : 'text-gray-900'}`}>
                                            {transaction.status === 'refunded' && '-'}
                                            {formatCurrency(transaction.amount, transaction.currency)}
                                        </p>
                                        <div className="mt-0.5">
                                            <StatusBadge status={transaction.status} />
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-0.5 ml-2 border-l border-gray-100 pl-2">
                                        <button className="p-1.5 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-[#004fa2] transition-colors"><Eye size={14} /></button>
                                        {transaction.status === 'completed' && (
                                            <button onClick={() => handleRefund(transaction)} className="p-1.5 hover:bg-purple-50 rounded-lg text-gray-400 hover:text-purple-600 transition-colors"><RefreshCcw size={14} /></button>
                                        )}
                                        <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition-colors"><Receipt size={14} /></button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {filteredTransactions.length === 0 && (
                        <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm">
                            <CreditCard className="mx-auto text-gray-300 mb-2" size={24} />
                            <h3 className="text-sm font-bold text-gray-900 mb-1">No transactions found</h3>
                            <button onClick={resetFilters} className="text-[11px] text-[#004fa2] hover:underline font-semibold mt-2">Clear filters</button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100 gap-3 mt-4">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                            Showing <span className="text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="text-gray-900">{Math.min(currentPage * itemsPerPage, filteredTransactions.length)}</span> of{' '}
                            <span className="text-gray-900">{filteredTransactions.length}</span>
                        </p>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-1 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded transition-colors disabled:opacity-40"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`min-w-[24px] h-6 flex items-center justify-center rounded text-[10px] font-bold transition-all ${currentPage === page
                                            ? 'bg-[#004fa2] text-white shadow-sm'
                                            : 'text-gray-500 hover:bg-gray-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-1 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded transition-colors disabled:opacity-40"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </AdminLayout>
    );
};

export default PaymentsManagementPage;
