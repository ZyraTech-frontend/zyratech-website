/**
 * Payments Management Page (Admin)
 * Matches backend API specification exactly
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { useAuth } from '../../../hooks/useAuth';
import { canAccessFeature, isSuperAdmin, checkPermissionAndShowError } from '../../../utils/permissionHelper';
import paymentService from '../../../services/paymentService';
import {
    CreditCard,
    Search,
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
    Receipt,
    Ban,
    Book,
    Briefcase
} from 'lucide-react';

// Payment status configuration - NO GRADIENTS
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
    }
};

// Payment method icons
const PAYMENT_METHODS = {
    mobile_money: { label: 'Mobile Money', color: 'bg-amber-100 text-amber-700' },
    card: { label: 'Card', color: 'bg-blue-100 text-blue-700' },
    bank: { label: 'Bank Transfer', color: 'bg-green-100 text-green-700' }
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
    const navigate = useNavigate();
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

    // State management - matches backend API spec
    const [payments, setPayments] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0
    });
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    // Fetch payments from API
    const fetchPayments = async () => {
        if (!checkPaymentsPermission()) return;
        
        try {
            setLoading(true);
            
            const params = {
                page: pagination.page,
                limit: pagination.limit
            };
            
            if (selectedStatus) params.status = selectedStatus;
            if (searchQuery) params.search = searchQuery;
            
            const response = await paymentService.getTransactions(params);
            
            if (response.success) {
                setPayments(response.data.data || []);
                setPagination(response.data.pagination || {
                    page: 1,
                    limit: 20,
                    total: 0,
                    totalPages: 0
                });
            }
        } catch (error) {
            console.error('Error fetching payments:', error);
            dispatch(addNotification({
                type: 'error',
                message: error.response?.data?.message || 'Failed to load transactions'
            }));
        } finally {
            setLoading(false);
        }
    };

    // Fetch on mount and when filters change
    useEffect(() => {
        fetchPayments();
    }, [pagination.page, selectedStatus, searchQuery]);

    // Statistics calculated from current page data
    const stats = useMemo(() => {
        // Defensive: ensure payments is always an array
        const paymentsList = Array.isArray(payments) ? payments : [];
        const completed = paymentsList.filter(t => t.status === 'completed');
        const totalRevenue = completed.reduce((acc, t) => acc + (t.amount || 0), 0);
        const refunded = paymentsList.filter(t => t.status === 'refunded');

        return {
            totalTransactions: pagination.total || paymentsList.length,
            totalRevenue,
            completedCount: completed.length,
            pendingCount: paymentsList.filter(t => t.status === 'pending').length,
            failedCount: paymentsList.filter(t => t.status === 'failed').length,
            refundedCount: refunded.length,
            successRate: paymentsList.length > 0 ? Math.round((completed.length / payments.length) * 100) : 0
        };
    }, [payments, pagination.total]);

    // Handlers
    const handleRefund = (payment) => {
        if (!checkPaymentsPermission()) return;
        
        dispatch(openConfirmDialog({
            title: 'Process Refund',
            message: `Are you sure you want to refund ${formatCurrency(payment.amount)} to ${payment.studentName}? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: async () => {
                const reason = prompt('Enter refund reason:');
                if (!reason) return;

                try {
                    const response = await paymentService.refundPayment(payment.reference, { reason });
                    
                    if (response.success) {
                        dispatch(addNotification({
                            type: 'success',
                            message: 'Payment refunded successfully'
                        }));
                        fetchPayments(); // Refresh list
                    }
                } catch (error) {
                    dispatch(addNotification({
                        type: 'error',
                        message: error.response?.data?.message || 'Failed to process refund'
                    }));
                }
            }
        }));
    };

    const handleExport = async () => {
        if (!checkPaymentsPermission()) return;
        
        try {
            dispatch(addNotification({
                type: 'info',
                message: 'Exporting transactions...'
            }));

            const params = {};
            if (selectedStatus) params.status = selectedStatus;
            if (searchQuery) params.search = searchQuery;

            await paymentService.exportTransactionsCSV(params);
            
            dispatch(addNotification({
                type: 'success',
                message: 'Transactions exported successfully'
            }));
        } catch (error) {
            dispatch(addNotification({
                type: 'error',
                message: error.response?.data?.message || 'Failed to export transactions'
            }));
        }
    };

    const handleViewDetails = async (payment) => {
        if (!checkPaymentsPermission()) return;
        
        try {
            const response = await paymentService.getTransactionDetails(payment.reference);
            if (response.success) {
                setSelectedPayment(response.data);
                setShowDetailsModal(true);
            }
        } catch (error) {
            dispatch(addNotification({
                type: 'error',
                message: error.response?.data?.message || 'Failed to load payment details'
            }));
        }
    };

    const handleDownloadReceipt = async (payment) => {
        if (!checkPaymentsPermission()) return;
        
        try {
            dispatch(addNotification({
                type: 'info',
                message: 'Downloading receipt...'
            }));

            await paymentService.downloadReceipt(payment.reference);
            
            dispatch(addNotification({
                type: 'success',
                message: 'Receipt downloaded successfully'
            }));
        } catch (error) {
            dispatch(addNotification({
                type: 'error',
                message: error.response?.data?.message || 'Failed to download receipt'
            }));
        }
    };

    const handleSearch = (value) => {
        setSearchQuery(value);
        setPagination(prev => ({ ...prev, page: 1 })); // Reset to page 1
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        setPagination(prev => ({ ...prev, page: 1 })); // Reset to page 1
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedStatus('');
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const goToPage = (page) => {
        setPagination(prev => ({ ...prev, page }));
    };

    if (loading && payments.length === 0) {
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
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm gap-3">
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

                {/* Revenue Overview - NO GRADIENTS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="bg-blue-600 rounded-xl p-3 shadow text-white relative overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                            <div className="bg-white/20 p-1.5 rounded-lg"><DollarSign size={16} /></div>
                        </div>
                        <div className="mt-auto">
                            <p className="text-xl font-black leading-none">{formatCurrency(stats.totalRevenue)}</p>
                            <p className="text-[10px] text-blue-100 font-medium tracking-wide">Total Revenue</p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow cursor-pointer" onClick={() => handleStatusChange('completed')}>
                        <div className="flex items-center justify-between mb-1">
                            <div className="bg-green-50 p-1.5 rounded-lg"><CheckCircle className="text-green-600" size={16} /></div>
                            <span className="text-[10px] bg-green-50 text-green-700 font-bold px-1.5 py-0.5 rounded">{stats.successRate}%</span>
                        </div>
                        <div className="mt-2">
                            <p className="text-xl font-bold text-gray-900 leading-none">{stats.completedCount}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Successful</p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow cursor-pointer" onClick={() => handleStatusChange('pending')}>
                        <div className="bg-amber-50 p-1.5 rounded-lg mb-1"><Clock className="text-amber-600" size={16} /></div>
                        <div className="mt-2">
                            <p className="text-xl font-bold text-gray-900 leading-none">{stats.pendingCount}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Pending</p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow cursor-pointer" onClick={() => handleStatusChange('refunded')}>
                        <div className="bg-purple-50 p-1.5 rounded-lg mb-1"><RefreshCcw className="text-purple-600" size={16} /></div>
                        <div className="mt-2">
                            <p className="text-xl font-bold text-gray-900 leading-none">{stats.refundedCount}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Refunds</p>
                        </div>
                    </div>
                </div>

                {/* Status Filters */}
                <div className="flex flex-wrap text-[11px] gap-2">
                    {[
                        { label: 'All', id: '', count: pagination.total },
                        { label: 'Completed', id: 'completed' },
                        { label: 'Pending', id: 'pending' },
                        { label: 'Failed', id: 'failed' },
                        { label: 'Refunded', id: 'refunded' }
                    ].map(st => (
                        <button
                            key={st.id}
                            onClick={() => handleStatusChange(st.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${selectedStatus === st.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                        >
                            {st.label} {st.count !== undefined && <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${selectedStatus === st.id ? 'bg-white/20' : 'bg-gray-100'}`}>{st.count}</span>}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search by reference, name, or email..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                        />
                    </div>

                    {(searchQuery || selectedStatus) && (
                        <button onClick={resetFilters} className="bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 px-4 rounded-xl text-[11px] font-semibold flex items-center gap-1">
                            <X size={12} /> Reset
                        </button>
                    )}
                </div>

                {/* Transactions List */}
                <div className="flex flex-col gap-2">
                    {payments.map((payment) => {
                        const methodConfig = PAYMENT_METHODS[payment.paymentMethod] || PAYMENT_METHODS.card;
                        const statusConfig = STATUS_CONFIG[payment.status];

                        return (
                            <div key={payment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col xl:flex-row xl:items-center p-3 gap-3 hover:border-blue-600 transition-colors relative overflow-hidden">
                                {/* Status indicator */}
                                {/* Status indicator removed - no left border */}
                                
                                {/* Student Info */}
                                <div className="flex items-start gap-3 xl:w-1/4 min-w-0 pl-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                        {(() => {
                                            const name = payment.studentName || payment.studentEmail || "User";
                                            const parts = name.trim().split(" ").filter(n => n);
                                            if (parts.length >= 2) return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
                                            return parts[0] ? parts[0].substring(0, 2).toUpperCase() : "U";
                                        })()}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-gray-900 text-xs truncate">{payment.studentName}</p>
                                        <p className="text-[9px] text-gray-500 truncate">{payment.studentEmail}</p>
                                        <p className="font-mono text-[9px] font-bold text-gray-400 mt-0.5">{payment.reference}</p>
                                    </div>
                                </div>
                                
                                {/* Course/Project Info */}
                                <div className="xl:w-1/3 py-1 xl:py-0 border-y xl:border-y-0 border-gray-50">
                                    <p className="text-xs font-medium text-gray-800 line-clamp-1 mb-1">
                                        {payment.courseTitle || payment.projectTitle || 'N/A'}
                                    </p>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        {payment.paymentType === 'training' ? (
                                            <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">Training</span>
                                        ) : (
                                            <span className="text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded font-medium">Project</span>
                                        )}
                                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${methodConfig.color}`}>{methodConfig.label}</span>
                                        <span className="text-[10px] text-gray-400">{formatDate(payment.createdAt)}</span>
                                    </div>
                                </div>

                                {/* Amount and Status */}
                                <div className="flex items-center justify-between xl:justify-end gap-4 xl:w-1/3">
                                    <div className="text-left xl:text-right">
                                        <p className={`text-sm font-black ${payment.status === 'refunded' ? 'text-purple-600' : payment.status === 'completed' ? 'text-green-600' : payment.status === 'failed' ? 'text-red-500' : 'text-gray-900'}`}>
                                            {payment.status === 'refunded' && '-'}
                                            {formatCurrency(payment.amount, payment.currency)}
                                        </p>
                                        <div className="mt-0.5">
                                            <StatusBadge status={payment.status} />
                                        </div>
                                    </div>
                                    
                                    {/* Actions */}
                                    <div className="flex items-center gap-0.5 border-l border-gray-100 pl-2">
                                        <button onClick={() => handleViewDetails(payment)} className="p-1.5 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors">
                                            <Eye size={14} />
                                        </button>
                                        {payment.status === 'completed' && (
                                            <button 
                                                onClick={() => handleRefund(payment)} 
                                                className="p-1.5 hover:bg-purple-50 rounded-lg text-gray-400 hover:text-purple-600 transition-colors"
                                            >
                                                <RefreshCcw size={14} />
                                            </button>
                                        )}
                                        <button onClick={() => handleDownloadReceipt(payment)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition-colors">
                                            <Receipt size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Empty State */}
                    {payments.length === 0 && !loading && (
                        <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm">
                            <CreditCard className="mx-auto text-gray-300 mb-2" size={24} />
                            <h3 className="text-sm font-bold text-gray-900 mb-1">No transactions found</h3>
                            <button onClick={resetFilters} className="text-[11px] text-blue-600 hover:underline font-semibold mt-2">Clear filters</button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100 gap-3">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                            Showing <span className="text-gray-900">{((pagination.page - 1) * pagination.limit) + 1}</span> to{' '}
                            <span className="text-gray-900">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of{' '}
                            <span className="text-gray-900">{pagination.total}</span>
                        </p>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => goToPage(pagination.page - 1)}
                                disabled={pagination.page === 1}
                                className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <div className="flex items-center gap-1 px-2">
                                <span className="text-xs font-bold text-gray-900">{pagination.page}</span>
                                <span className="text-xs text-gray-400">/</span>
                                <span className="text-xs text-gray-500">{pagination.totalPages}</span>
                            </div>
                            <button
                                onClick={() => goToPage(pagination.page + 1)}
                                disabled={pagination.page === pagination.totalPages}
                                className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
