/**
 * Project Requests Management Page (Admin)
 * Professional admin interface for managing submitted project requests
 * 
 * Improvements:
 * - Enhanced table layout with better spacing and readability
 * - Professional modal design with clear sections
 * - Better visual hierarchy and typography
 * - Improved mobile responsiveness
 * - Subtle shadows and borders for depth
 * - Professional status badges and visual indicators
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import projectRequestService from '../../../services/projectRequestService';
import { useAuth } from '../../../hooks/useAuth';
import { canAccessFeature, isSuperAdmin, checkPermissionAndShowError } from '../../../utils/permissionHelper';
import {
    Inbox,
    Search,
    Filter,
    Eye,
    Trash2,
    ChevronLeft,
    ChevronRight,
    X,
    AlertCircle,
    CheckCircle,
    Clock,
    XCircle,
    Mail,
    Phone,
    Building2,
    FileText,
    Calendar,
    Zap,
    MoreVertical,
    Divider,
    ArrowRight,
} from 'lucide-react';

// Status configuration for project requests
const STATUS_CONFIG = {
    'pending': { label: 'Pending', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock, bg: 'bg-amber-50' },
    'approved': { label: 'Approved', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle, bg: 'bg-green-50' },
    'rejected': { label: 'Rejected', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle, bg: 'bg-red-50' }
};

// Package type configuration
const PACKAGE_TYPE_CONFIG = {
    'student-projects': { label: 'Student Projects', color: 'bg-blue-100 text-blue-700', icon: '🎓' },
    'business-projects': { label: 'Business Projects', color: 'bg-purple-100 text-purple-700', icon: '💼' },
    'enterprise': { label: 'Enterprise', color: 'bg-red-100 text-red-700', icon: '🏢' }
};

// Status badge component with improved styling
const StatusBadge = ({ status, size = 'sm' }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG['pending'];
    const Icon = config.icon;

    const sizeClasses = {
        xs: 'px-2 py-0.5 text-[9px]',
        sm: 'px-2.5 py-1 text-[10px]',
        md: 'px-3 py-1.5 text-xs',
        lg: 'px-3.5 py-2 text-sm'
    };

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-lg font-semibold uppercase tracking-wide border ${config.color} transition-all ${sizeClasses[size]}`}>
            <Icon size={size === 'xs' ? 10 : size === 'sm' ? 12 : size === 'md' ? 14 : 16} className="flex-shrink-0" />
            {config.label}
        </span>
    );
};

// Package type badge component with improved styling
const PackageTypeBadge = ({ packageType, size = 'sm' }) => {
    const config = PACKAGE_TYPE_CONFIG[packageType] || PACKAGE_TYPE_CONFIG['student-projects'];
    
    const sizeClasses = {
        xs: 'px-2 py-0.5 text-[9px]',
        sm: 'px-2.5 py-1 text-[10px]',
        md: 'px-3 py-1.5 text-xs',
        lg: 'px-3.5 py-2 text-sm'
    };

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-lg font-semibold uppercase tracking-wide ${config.color} transition-all ${sizeClasses[size]}`}>
            {config.label}
        </span>
    );
};

const ProjectRequestsManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, userRole, userPermissions, userDepartment } = useAuth();

    // Permission check for projects management
    const hasProjectsPermission = canAccessFeature(userPermissions, userRole, 'projects');
    const isSuperAdminUser = isSuperAdmin(userRole);

    // State management
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPackageType, setSelectedPackageType] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [statusModal, setStatusModal] = useState(null);
    const [statusNotes, setStatusNotes] = useState('');

    const itemsPerPage = 10;

    // Fetch project requests from API on component mount
    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await projectRequestService.getAdminProjectRequests({ limit: 1000 });
            console.log('[ProjectRequestsManagementPage] Full API Response:', response);
            console.log('[ProjectRequestsManagementPage] Requests Array:', response.requests);
            console.log('[ProjectRequestsManagementPage] Requests Length:', response.requests?.length);
            setRequests(response.requests || []);
        } catch (err) {
            console.error('Failed to fetch project requests:', err);
            setError(err.message || 'Failed to load project requests');
            dispatch(addNotification({
                type: 'error',
                message: 'Failed to load project requests from server'
            }));
        } finally {
            setLoading(false);
        }
    };

    // Filter and search requests
    const filteredRequests = useMemo(() => {
        let result = [...requests];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(req =>
                req.fullName.toLowerCase().includes(query) ||
                req.email.toLowerCase().includes(query) ||
                req.projectTitle.toLowerCase().includes(query) ||
                (req.company && req.company.toLowerCase().includes(query))
            );
        }

        // Package type filter
        if (selectedPackageType !== 'all') {
            result = result.filter(req => req.packageType === selectedPackageType);
        }

        // Status filter
        if (selectedStatus !== 'all') {
            result = result.filter(req => req.status === selectedStatus);
        }

        // Sort by date (newest first)
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return result;
    }, [requests, searchQuery, selectedPackageType, selectedStatus]);

    // Pagination
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
    const paginatedRequests = filteredRequests.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => ({
        total: requests.length,
        pending: requests.filter(r => r.status === 'pending').length,
        approved: requests.filter(r => r.status === 'approved').length,
        rejected: requests.filter(r => r.status === 'rejected').length,
        student: requests.filter(r => r.packageType === 'student-projects').length,
        business: requests.filter(r => r.packageType === 'business-projects').length,
        enterprise: requests.filter(r => r.packageType === 'enterprise').length
    }), [requests]);

    // Handlers
    const handleDelete = (request) => {
        // Permission check
        if (!isSuperAdminUser && !hasProjectsPermission) {
            checkPermissionAndShowError(
                userPermissions,
                userRole,
                'projects',
                dispatch,
                'Software Projects',
                'Software'
            );
            return;
        }

        dispatch(openConfirmDialog({
            title: 'Delete Project Request',
            message: `Are you sure you want to delete the request from ${request.fullName}? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: async () => {
                try {
                    await projectRequestService.deleteProjectRequest(request.id);
                    setRequests(prev => prev.filter(r => r.id !== request.id));
                    dispatch(addNotification({
                        type: 'success',
                        message: `Request from ${request.fullName} deleted successfully`
                    }));
                } catch (err) {
                    console.error('Failed to delete request:', err);
                    dispatch(addNotification({
                        type: 'error',
                        message: `Failed to delete request: ${err.message}`
                    }));
                }
            }
        }));
    };

    const handleStatusUpdate = async (request, newStatus) => {
        // Permission check
        if (!isSuperAdminUser && !hasProjectsPermission) {
            checkPermissionAndShowError(
                userPermissions,
                userRole,
                'projects',
                dispatch,
                'Software Projects',
                'Software'
            );
            return;
        }

        try {
            await projectRequestService.updateProjectRequestStatus(request.id, {
                status: newStatus,
                reviewNotes: statusNotes
            });

            // Update local state
            setRequests(prev => prev.map(r =>
                r.id === request.id
                    ? { ...r, status: newStatus, reviewNotes: statusNotes }
                    : r
            ));

            setStatusModal(null);
            setStatusNotes('');

            dispatch(addNotification({
                type: 'success',
                message: `Request status updated to ${newStatus}`
            }));
        } catch (err) {
            console.error('Failed to update status:', err);
            dispatch(addNotification({
                type: 'error',
                message: `Failed to update status: ${err.message}`
            }));
        }
    };

    const handleView = (request) => {
        navigate(`/admin/project-requests/${request.id}`);
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedPackageType('all');
        setSelectedStatus('all');
        setCurrentPage(1);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-3 md:space-y-6 pb-8">
                {/* Error Alert */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                            <h3 className="font-semibold text-red-900">Error Loading Requests</h3>
                            <p className="text-sm text-red-700 mt-1">{error}</p>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
                        <div className="animate-spin">
                            <Clock className="text-blue-600" size={18} />
                        </div>
                        <div>
                            <p className="font-semibold text-blue-900">Loading requests...</p>
                            <p className="text-sm text-blue-700">Fetching project requests from the server</p>
                        </div>
                    </div>
                )}

                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                            <Inbox size={18} className="text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-[11px] md:text-base font-bold text-gray-900 leading-tight">Project Requests</h1>
                            <p className="text-[10px] text-gray-500">Manage incoming project request submissions</p>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-2 md:gap-3 mb-4">
                    {[
                        { title: 'Total', count: stats.total, icon: Inbox, color: 'text-blue-600', bg: 'bg-blue-50', onClick: () => { setSelectedStatus('all'); setCurrentPage(1); } },
                        { title: 'Pending', count: stats.pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', onClick: () => { setSelectedStatus('pending'); setCurrentPage(1); } },
                        { title: 'Approved', count: stats.approved, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', onClick: () => { setSelectedStatus('approved'); setCurrentPage(1); } },
                        { title: 'Rejected', count: stats.rejected, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', onClick: () => { setSelectedStatus('rejected'); setCurrentPage(1); } },
                        { title: 'Student', count: stats.student, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', onClick: () => { setSelectedPackageType('student-projects'); setCurrentPage(1); } },
                        { title: 'Business', count: stats.business, icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50', onClick: () => { setSelectedPackageType('business-projects'); setCurrentPage(1); } },
                        { title: 'Enterprise', count: stats.enterprise, icon: Building2, color: 'text-red-600', bg: 'bg-red-50', onClick: () => { setSelectedPackageType('enterprise'); setCurrentPage(1); } },
                    ].map((stat, i) => (
                        <div key={i} onClick={stat.onClick} className="bg-white border border-gray-100 rounded-xl p-2 md:p-2.5 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-1 md:gap-2 shadow-sm hover:border-[#004fa2] transition-colors cursor-pointer text-center md:text-left group">
                            <div className={`w-6 h-6 md:w-7 md:h-7 rounded-md shrink-0 flex items-center justify-center ${stat.bg}`}>
                                <stat.icon className={stat.color} size={14} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[9px] md:text-[10px] text-gray-500 font-medium uppercase tracking-wide truncate group-hover:text-[#004fa2] transition-colors">{stat.title}</p>
                                <p className="text-xs md:text-sm font-bold text-gray-900 leading-none mt-0.5 md:mt-0">{stat.count}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters and Search */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-2 mb-4">
                    <div className="col-span-2 md:col-span-6 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search by name, email, title..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-3 relative">
                        <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                            value={selectedPackageType}
                            onChange={(e) => { setSelectedPackageType(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                        >
                            <option value="all">All Packages</option>
                            <option value="student-projects">Student Projects</option>
                            <option value="business-projects">Business Projects</option>
                            <option value="enterprise">Enterprise</option>
                        </select>
                    </div>

                    <div className="col-span-1 md:col-span-3 flex items-center justify-end gap-1">
                        <select
                            value={selectedStatus}
                            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                            className="flex-1 px-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        {(searchQuery || selectedPackageType !== 'all' || selectedStatus !== 'all') && (
                            <button onClick={resetFilters} className="bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 h-[34px] w-[34px] rounded-xl transition-colors shadow-sm flex items-center justify-center shrink-0">
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Requests Table */}
                {loading || error ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            {loading ? (
                                <Clock className="text-gray-400 animate-spin" size={28} />
                            ) : (
                                <AlertCircle className="text-red-400" size={28} />
                            )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{loading ? 'Loading Requests' : 'Error Loading Requests'}</h3>
                        <p className="text-sm text-gray-500">{loading ? 'Fetching project requests from the server...' : error}</p>
                    </div>
                ) : paginatedRequests.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                        <Inbox className="text-gray-300 mx-auto mb-4" size={48} />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Requests Found</h3>
                        <p className="text-sm text-gray-500">No project requests match your current filters.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left">
                                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</span>
                                        </th>
                                        <th className="px-6 py-4 text-left">
                                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</span>
                                        </th>
                                        <th className="px-6 py-4 text-left">
                                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Project</span>
                                        </th>
                                        <th className="px-6 py-4 text-left">
                                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Package</span>
                                        </th>
                                        <th className="px-6 py-4 text-left">
                                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</span>
                                        </th>
                                        <th className="px-6 py-4 text-left">
                                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</span>
                                        </th>
                                        <th className="px-6 py-4 text-right">
                                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {paginatedRequests.map((request) => (
                                        <tr key={request.id} className="hover:bg-blue-50/50 transition-colors duration-150 group">
                                            <td className="px-6 py-5 border-r border-gray-200">
                                                <div className="flex flex-col justify-center">
                                                    <p className="font-bold text-gray-900 text-sm leading-snug">{request.fullName}</p>
                                                    <p className="text-xs text-gray-500 mt-1.5">Requester</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col justify-center min-w-0">
                                                    <a href={`mailto:${request.email}`} className="text-sm font-semibold text-[#004fa2] hover:text-[#003d80] hover:underline break-all transition-colors duration-150">
                                                        {request.email}
                                                    </a>
                                                    <p className="text-xs text-gray-500 mt-1.5 truncate">Contact</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="max-w-xs">
                                                    <p className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-[#004fa2] transition-colors">
                                                        {request.projectTitle}
                                                    </p>
                                                    {request.description && (
                                                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                                            {request.description.substring(0, 100)}{request.description.length > 100 ? '...' : ''}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <PackageTypeBadge packageType={request.packageType} size="sm" />
                                            </td>
                                            <td className="px-6 py-5">
                                                <StatusBadge status={request.status} size="sm" />
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="text-sm">
                                                    <p className="font-medium text-gray-900">{formatDate(request.createdAt)}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{formatTime(request.createdAt)}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => handleView(request)}
                                                        className="p-2 text-gray-500 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-all duration-150"
                                                        title="View details"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <div className="relative group/menu">
                                                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-150">
                                                            <MoreVertical size={16} />
                                                        </button>
                                                        <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 invisible group-hover/menu:visible">
                                                            {request.status !== 'approved' && (
                                                                <button
                                                                    onClick={() => { 
                                                                        if (isSuperAdminUser || hasProjectsPermission) {
                                                                            setStatusModal({ ...request, newStatus: 'approved' }); 
                                                                        } else {
                                                                            checkPermissionAndShowError(
                                                                                userPermissions,
                                                                                userRole,
                                                                                'projects',
                                                                                dispatch,
                                                                                'Software Projects',
                                                                                'Software'
                                                                            );
                                                                        }
                                                                    }}
                                                                    disabled={!isSuperAdminUser && !hasProjectsPermission}
                                                                    className="block w-full text-left px-4 py-2.5 text-sm font-medium text-green-700 hover:bg-green-50 border-b border-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                                >
                                                                    ✓ Approve
                                                                </button>
                                                            )}
                                                            {request.status !== 'rejected' && (
                                                                <button
                                                                    onClick={() => { 
                                                                        if (isSuperAdminUser || hasProjectsPermission) {
                                                                            setStatusModal({ ...request, newStatus: 'rejected' }); 
                                                                        } else {
                                                                            checkPermissionAndShowError(
                                                                                userPermissions,
                                                                                userRole,
                                                                                'projects',
                                                                                dispatch,
                                                                                'Software Projects',
                                                                                'Software'
                                                                            );
                                                                        }
                                                                    }}
                                                                    disabled={!isSuperAdminUser && !hasProjectsPermission}
                                                                    className="block w-full text-left px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-50 border-b border-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                                >
                                                                    ✕ Reject
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleDelete(request)}
                                                                disabled={!isSuperAdminUser && !hasProjectsPermission}
                                                                className="block w-full text-left px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                🗑 Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden divide-y divide-gray-100">
                            {paginatedRequests.map((request) => (
                                <div key={request.id} className="p-4 hover:bg-blue-50/50 transition-colors duration-150 space-y-3">
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 text-sm truncate">{request.fullName}</p>
                                            <a href={`mailto:${request.email}`} className="text-xs text-[#004fa2] hover:underline truncate block mt-1">
                                                {request.email}
                                            </a>
                                        </div>
                                        <StatusBadge status={request.status} size="xs" />
                                    </div>

                                    {/* Project Info */}
                                    <div className="border-t border-gray-100 pt-3">
                                        <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">Project</p>
                                        <p className="font-semibold text-gray-900 text-sm line-clamp-1">{request.projectTitle}</p>
                                        {request.description && (
                                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                {request.description.substring(0, 80)}{request.description.length > 80 ? '...' : ''}
                                            </p>
                                        )}
                                    </div>

                                    {/* Meta Info */}
                                    <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
                                        <div className="flex-1">
                                            <PackageTypeBadge packageType={request.packageType} size="xs" />
                                        </div>
                                        <div className="text-right text-xs text-gray-500">
                                            <p>{formatDate(request.createdAt)}</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
                                        <button
                                            onClick={() => handleView(request)}
                                            className="flex-1 px-3 py-2 bg-blue-50 text-[#004fa2] text-sm font-semibold rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Eye size={14} />
                                            View
                                        </button>
                                        {request.status !== 'approved' && (
                                            <button
                                                onClick={() => { 
                                                    if (isSuperAdminUser || hasProjectsPermission) {
                                                        setStatusModal({ ...request, newStatus: 'approved' }); 
                                                    } else {
                                                        checkPermissionAndShowError(
                                                            userPermissions,
                                                            userRole,
                                                            'projects',
                                                            dispatch,
                                                            'Software Projects',
                                                            'Software'
                                                        );
                                                    }
                                                }}
                                                disabled={!isSuperAdminUser && !hasProjectsPermission}
                                                className="px-3 py-2 bg-green-50 text-green-700 text-sm font-semibold rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                title="Approve"
                                            >
                                                ✓
                                            </button>
                                        )}
                                        {request.status !== 'rejected' && (
                                            <button
                                                onClick={() => { 
                                                    if (isSuperAdminUser || hasProjectsPermission) {
                                                        setStatusModal({ ...request, newStatus: 'rejected' }); 
                                                    } else {
                                                        checkPermissionAndShowError(
                                                            userPermissions,
                                                            userRole,
                                                            'projects',
                                                            dispatch,
                                                            'Software Projects',
                                                            'Software'
                                                        );
                                                    }
                                                }}
                                                disabled={!isSuperAdminUser && !hasProjectsPermission}
                                                className="px-3 py-2 bg-red-50 text-red-700 text-sm font-semibold rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                title="Reject"
                                            >
                                                ✕
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(request)}
                                            disabled={!isSuperAdminUser && !hasProjectsPermission}
                                            className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            title="Delete"
                                        >
                                            🗑
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
                                <p className="text-xs text-gray-600 font-medium">
                                    Page {currentPage} of {totalPages} • Showing {paginatedRequests.length} of {filteredRequests.length}
                                </p>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <span className="text-xs text-gray-600 font-medium px-3">{currentPage}</span>
                                    <button
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Status Update Modal */}
                {statusModal && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
                            {/* Modal Header */}
                            <div className={`${statusModal.newStatus === 'approved' ? 'bg-green-600' : 'bg-red-600'} text-white px-6 md:px-8 py-6 flex items-start justify-between rounded-t-xl`}>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold">
                                        {statusModal.newStatus === 'approved' ? '✓ Approve Request' : '✕ Reject Request'}
                                    </h2>
                                    <p className={`text-sm mt-2 ${statusModal.newStatus === 'approved' ? 'text-green-100' : 'text-red-100'}`}>
                                        Reviewing request from {statusModal.fullName}
                                    </p>
                                </div>
                                <button onClick={() => setStatusModal(null)} className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors flex-shrink-0">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 md:p-8 space-y-6">
                                {/* Status Summary */}
                                <div className={`${statusModal.newStatus === 'approved' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg p-4`}>
                                    <p className={`text-sm font-medium ${statusModal.newStatus === 'approved' ? 'text-green-900' : 'text-red-900'}`}>
                                        {statusModal.newStatus === 'approved' 
                                            ? '✓ This request will be marked as Approved' 
                                            : '✕ This request will be marked as Rejected'}
                                    </p>
                                </div>

                                {/* Request Summary */}
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Request Summary</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Name</p>
                                            <p className="text-sm font-semibold text-gray-900 mt-1">{statusModal.fullName}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Project</p>
                                            <p className="text-sm font-semibold text-gray-900 mt-1 line-clamp-1">{statusModal.projectTitle}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Package Type</p>
                                            <div className="mt-2">
                                                <PackageTypeBadge packageType={statusModal.packageType} size="sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Review Notes */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                                        Review Notes {statusModal.newStatus === 'rejected' && '(Recommended)'}
                                    </label>
                                    <textarea
                                        value={statusNotes}
                                        onChange={(e) => setStatusNotes(e.target.value)}
                                        placeholder={statusModal.newStatus === 'approved' 
                                            ? "Add any notes about this approval..." 
                                            : "Explain why this request is being rejected..."}
                                        rows="4"
                                        maxLength="500"
                                        className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">{statusNotes.length}/500 characters</p>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="bg-gray-50 border-t border-gray-200 px-6 md:px-8 py-5 flex items-center justify-end gap-3 rounded-b-xl">
                                <button
                                    onClick={() => setStatusModal(null)}
                                    className="px-4 py-2.5 bg-white text-gray-700 text-sm font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-150"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(statusModal, statusModal.newStatus)}
                                    className={`px-6 py-2.5 text-white text-sm font-semibold rounded-lg transition-colors duration-150 shadow-sm hover:shadow-md flex items-center gap-2 ${
                                        statusModal.newStatus === 'approved'
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : 'bg-red-600 hover:bg-red-700'
                                    }`}
                                >
                                    {statusModal.newStatus === 'approved' ? '✓ Approve' : '✕ Reject'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ProjectRequestsManagementPage;

