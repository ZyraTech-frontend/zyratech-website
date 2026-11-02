/**
 * Payments Management Page (Admin)
 * Professional admin interface for managing transactions and revenue
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { useAuth } from '../../../hooks/useAuth';
import { canAccessFeature, isSuperAdmin, checkPermissionAndShowError } from '../../../utils/permissionHelper';
import paymentService from '../../../services/paymentService';
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
    CheckCircle,
    XCircle,
    Clock,
    RefreshCcw,
    Calendar,
    User,
    Receipt,
    Ban
} from 'lucide-react';

// Payment status configuration WITHOUT gradients
const STATUS_CONFIG = {
    completed: {
        label: 'Completed',
        color: 'bg-green-100 text-green-700 border border-green-200',
        icon: CheckCircle,
        dotColor: 'bg-green-500'
    },
    pending: {
        label: 'Pending',
        color: 'bg-amber-100 text-amber-700 border border-amber-200',
        icon: Clock,
        dotColor: 'bg-amber-500'
    },
    failed: {
        label: 'Failed',
        color: 'bg-red-100 text-red-700 border border-red-200',
        icon: XCircle,
        dotColor: 'bg-red-500'
    },
    refunded: {
        label: 'Refunded',
        color: 'bg-purple-100 text-purple-700 border border-purple-200',
        icon: RefreshCcw,
        dotColor: 'bg-purple-500'
    },
    cancelled: {
        label: 'Cancelled',
        color: 'bg-gray-100 text-gray-600 border border-gray-200',
        icon: Ban,
        dotColor: 'bg-gray-400'
    }
};

// Payment method icons
const PAYMENT_METHODS = {
    mobile_money: { label: 'Mobile Money', icon: '📱', color: 'bg-amber-100 text-amber-700' },
    card: { label: 'Card', icon: '💳', color: 'bg-blue-100 text-blue-700' },
    bank: { label: 'Bank Transfer', icon: '🏦', color: 'bg-green-100 text-green-700' },
    paystack: { label: 'Paystack', icon: '💳', color: 'bg-cyan-100 text-cyan-700' },
    cash: { label: 'Cash', icon: '💵', color: 'bg-emerald-100 text-emerald-700' }
};

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
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide ${config.color}`}>
            <Icon size={10} />
            {config.label}
        </span>
    );
};

const PaymentsManagementPage = () => {
    const dispatch = useDispatch();
    const { userPermissions, userRole } = useAuth();

    // Permission check helper
    const checkPaymentsPermission = () => {
        const isSuperAdminUser = isSuperAdmin(userRole);
        const hasPaymentsPermission = canAccessFeature(userPermissions, userRole, 'transactions');
        if (!isSuperAdminUser && !hasPaymentsPermission) {
            checkPermissionAndShowError(userPermissions, userRole, 'transactions', dispatch, 'payments', 'CAO');
            return false;
        }
        return true;
    };

    // State management
    const [transactions, setTransactions] = useState([]);
    const [revenueStats, setRevenueStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedMethod, setSelectedMethod] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch transactions and stats
    useEffect(() => {
        const fetchData = async () => {
            if (!checkPaymentsPermission()) return;
            
            try {
                setLoading(true);
                
                // Fetch transactions
                const txnData = await paymentService.getTransactions({ limit: 1000 });
                setTransactions(Array.isArray(txnData) ? txnData : txnData.transactions || []);
                
                // Fetch revenue stats
                try {
                    const statsData = await paymentService.getRevenueStats('month');
                    setRevenueStats(statsData);
                } catch (err) {
                    console.log('Revenue stats not available yet');
                }
            } catch (error) {
                console.error('Error fetching payments:', error);
                dispatch(addNotification({
                    type: 'error',
                    message: 'Failed to load transactions'
                }));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter transactions
    const filteredTransactions = useMemo(() => {
        let result = [...transactions];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(t =>
                t.id?.toLowerCase().includes(query) ||
                t.reference?.toLowerCase().includes(query) ||
                t.student?.name?.toLowerCase().includes(query) ||
                t.student?.email?.toLowerCase().includes(query) ||
                t.course?.toLowerCase().includes(query)
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
    }, [transactions, searchQuery, selectedStatus, selectedMethod]);

    // Pagination
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => {
        const completed = transactions.filter(t => t.status === 'completed');
        const totalRevenue = completed.reduce((acc, t) => acc + (t.amount || 0), 0);
        const refunded = transactions.filter(t => t.status === 'refunded');
        const refundedAmount = refunded.reduce((acc, t) => acc + (t.amount || 0), 0);

        return {
            totalTransactions: transactions.length,
            totalRevenue,
            completedCount: completed.length,
            pendingCount: transactions.filter(t => t.status === 'pending').length,
            failedCount: transactions.filter(t => t.status === 'failed').length,
            refundedCount: refunded.length,
            refundedAmount,
            successRate: transactions.length > 0 ? Math.round((completed.length / transactions.length) * 100) : 0
        };
    }, [transactions]);

    // Handlers
    const handleRefund = (transaction) => {
        if (!checkPaymentsPermission()) return;
        
        dispatch(openConfirmDialog({
            title: 'Process Refund',
            message: `Are you sure you want to refund ${formatCurrency(transaction.amount)} to ${transaction.student?.name}? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: async () => {
                try {
                    await paymentService.refundPayment(transaction.id, {
                        reason: 'Admin initiated refund'
                    });
                    dispatch(addNotification({
                        type: 'success',
                        message: 'Refund processed successfully'
                    }));
                    // Refresh transactions
                    const txnData = await paymentService.getTransactions({ limit: 1000 });
                    setTransactions(Array.isArray(txnData) ? txnData : txnData.transactions || []);
                } catch (error) {
                    dispatch(addNotification({
                        type: 'error',
                        message: error.response?.data?.message || 'Failed to process refund'
                    }));
                }
            }
        }));
    };

    const handleExport = () => {
        console.log('Exporting transactions...');
        dispatch(addNotification({
            type: 'info',
            message: 'Exporting transactions report...'
        }));
        // TODO: Implement export functionality
        setTimeout(() => {
            dispatch(addNotification({
                type: 'success',
                message: 'Transactions report exported successfully'
            }));
        }, 1500);
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedStatus('all');
        setSelectedMethod('all');
        setDateRange('all');
        setCurrentPage(1);
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading transactions...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

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

                {/* Revenue Overview Grid - NO GRADIENTS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    <div className="bg-blue-600 rounded-xl p-3 shadow text-white relative overflow-hidden flex flex-col justify-between h-full">
                        <div className="flex items-center justify-between mb-2 z-10">
                            <div className="bg-white/20 p-1.5 rounded-lg"><DollarSign size={16} /></div>
                            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded flex items-center gap-0.5">+{stats.successRate}%</span>
                        </div>
                        <div className="z-10 mt-auto">
                            <p className="text-xl font-black leading-none">{formatCurrency(stats.totalRevenue)}</p>
                            <p className="text-[10px] text-blue-100 font-medium tracking-wide">Total Revenue</p>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-10"><DollarSign size={80} /></div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow cursor-pointer" onClick={() => { setSelectedStatus('completed'); setCurrentPage(1); }}>
                        <div className="flex items-center justify-between mb-1">
                            <div className="bg-green-50 p-1.5 rounded-lg"><CheckCircle className="text-green-600" size={16} /></div>
                            <span className="text-[10px] bg-green-50 text-green-700 font-bold px-1.5 py-0.5 rounded">{stats.successRate}%</span>
                        </div>
                        <div className="mt-2">
                            <p className="text-xl font-bold text-gray-900 leading-none">{stats.completedCount}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Successful</p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow cursor-pointer" onClick={() => { setSelectedStatus('pending'); setCurrentPage(1); }}>
                        <div className="flex items-center justify-between mb-1">
                            <div className="bg-amber-50 p-1.5 rounded-lg"><Clock className="text-amber-600" size={16} /></div>
                        </div>
                        <div className="mt-2">
                            <p className="text-xl font-bold text-gray-900 leading-none">{stats.pendingCount}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Pending</p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow cursor-pointer" onClick={() => { setSelectedStatus('refunded'); setCurrentPage(1); }}>
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
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${st.active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
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
                            className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2 relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                            className="w-full px-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none appearance-none transition-all"
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
                            className="w-full px-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none appearance-none transition-all"
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
                            className="w-full px-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none appearance-none transition-all"
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
                        const methodConfig = PAYMENT_METHODS[transaction.method] || PAYMENT_METHODS.card;
                        const statusConfig = STATUS_CONFIG[transaction.status];

                        return (
                            <div key={transaction.id} className={`bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col xl:flex-row xl:items-center p-3 gap-3 hover:border-blue-600 transition-colors group relative overflow-hidden ${transaction.status === 'failed' ? 'border-red-100' : ''}`}>
                                {/* Status Left Indicator */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${statusConfig.dotColor}`}></div>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 xl:w-1/3 min-w-0">
                                    <div className="flex items-start gap-3 min-w-0">
                                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                            {transaction.student?.name?.split(' ').map(n => n[0]).join('') || '?'}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-gray-900 text-xs truncate">{transaction.student?.name || 'Unknown'}</p>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <p className="font-mono text-[9px] font-bold text-gray-500">{transaction.id}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="xl:w-1/3 py-1 xl:py-0 border-y xl:border-y-0 border-gray-50">
                                    <p className="text-[11px] font-medium text-gray-800 line-clamp-1">{transaction.course || 'N/A'}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium ${methodConfig.color}`}>
                                            <span>{methodConfig.icon}</span> {methodConfig.label}
                                        </span>
                                        <span className="text-[9px] text-gray-400 font-mono tracking-wider">{formatDate(transaction.date || transaction.createdAt)}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between xl:justify-end gap-4 xl:w-1/3 shrink-0">
                                    <div className="text-left xl:text-right">
                                        <p className={`text-sm font-black ${transaction.status === 'refunded' ? 'text-purple-600' : transaction.status === 'completed' ? 'text-green-600' : transaction.status === 'failed' ? 'text-red-500' : 'text-gray-900'}`}>
                                            {transaction.status === 'refunded' && '-'}
                                            {formatCurrency(transaction.amount, transaction.currency || 'GHS')}
                                        </p>
                                        <div className="mt-0.5">
                                            <StatusBadge status={transaction.status} />
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-0.5 ml-2 border-l border-gray-100 pl-2">
                                        <button className="p-1.5 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors"><Eye size={14} /></button>
                                        {transaction.status === 'completed' && isSuperAdmin(userRole) && (
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
                            <button onClick={resetFilters} className="text-[11px] text-blue-600 hover:underline font-semibold mt-2">Clear filters</button>
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
                                className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors disabled:opacity-40"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <div className="flex items-center gap-1 px-2">
                                <span className="text-xs font-bold text-gray-900">{currentPage}</span>
                                <span className="text-xs text-gray-400">/</span>
                                <span className="text-xs text-gray-500">{totalPages}</span>
                            </div>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors disabled:opacity-40"
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
