/**
 * Project Requests Management Page (Admin)
 * Professional admin interface for managing submitted project requests
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import projectRequestService from '../../../services/projectRequestService';
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

// Status badge component
const StatusBadge = ({ status }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG['pending'];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${config.color}`}>
            <Icon size={10} />
            {config.label}
        </span>
    );
};

// Package type badge component
const PackageTypeBadge = ({ packageType }) => {
    const config = PACKAGE_TYPE_CONFIG[packageType] || PACKAGE_TYPE_CONFIG['student-projects'];
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${config.color}`}>
            <span>{config.icon}</span>
            {config.label}
        </span>
    );
};

const ProjectRequestsManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State management
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPackageType, setSelectedPackageType] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [detailsModal, setDetailsModal] = useState(null);
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
        setDetailsModal(request);
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
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px]">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name & Email</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Project</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Package</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {paginatedRequests.map((request) => (
                                        <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-4">
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">{request.fullName}</p>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                                        <Mail size={12} />
                                                        <a href={`mailto:${request.email}`} className="hover:text-[#004fa2] break-all">{request.email}</a>
                                                    </div>
                                                    {request.phone && (
                                                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                                            <Phone size={12} />
                                                            <a href={`tel:${request.phone}`} className="hover:text-[#004fa2]">{request.phone}</a>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm line-clamp-1">{request.projectTitle}</p>
                                                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{request.description}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <PackageTypeBadge packageType={request.packageType} />
                                            </td>
                                            <td className="px-4 py-4">
                                                <StatusBadge status={request.status} />
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-xs">
                                                    <p className="font-semibold text-gray-900">{formatDate(request.createdAt)}</p>
                                                    <p className="text-gray-500">{formatTime(request.createdAt)}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => handleView(request)}
                                                        className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="View details"
                                                    >
                                                        <Eye size={14} />
                                                    </button>
                                                    <div className="relative group">
                                                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                                            <MoreVertical size={14} />
                                                        </button>
                                                        <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-50 invisible group-hover:visible">
                                                            {request.status !== 'approved' && (
                                                                <button
                                                                    onClick={() => { setStatusModal({ ...request, newStatus: 'approved' }); }}
                                                                    className="block w-full text-left px-3 py-2 text-xs font-medium text-green-600 hover:bg-green-50 border-b border-gray-100"
                                                                >
                                                                    Approve
                                                                </button>
                                                            )}
                                                            {request.status !== 'rejected' && (
                                                                <button
                                                                    onClick={() => { setStatusModal({ ...request, newStatus: 'rejected' }); }}
                                                                    className="block w-full text-left px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 border-b border-gray-100"
                                                                >
                                                                    Reject
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleDelete(request)}
                                                                className="block w-full text-left px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                                                            >
                                                                Delete
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

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
                                <p className="text-xs text-gray-600">
                                    Page {currentPage} of {totalPages} • Showing {paginatedRequests.length} of {filteredRequests.length}
                                </p>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft size={14} />
                                    </button>
                                    <span className="text-xs text-gray-600 mx-2">{currentPage}</span>
                                    <button
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Details Modal */}
                {detailsModal && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-white border-b border-gray-100 p-4 md:p-6 flex items-start justify-between">
                                <div>
                                    <h2 className="text-lg md:text-xl font-bold text-gray-900">Project Request Details</h2>
                                    <p className="text-xs md:text-sm text-gray-500 mt-1">ID: {detailsModal.id}</p>
                                </div>
                                <button onClick={() => setDetailsModal(null)} className="text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-4 md:p-6 space-y-6">
                                {/* Requester Information */}
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-sm mb-3">Requester Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Full Name</label>
                                            <p className="text-sm text-gray-900 mt-1">{detailsModal.fullName}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Email</label>
                                            <a href={`mailto:${detailsModal.email}`} className="text-sm text-[#004fa2] hover:underline mt-1 break-all">{detailsModal.email}</a>
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Phone</label>
                                            <a href={`tel:${detailsModal.phone}`} className="text-sm text-[#004fa2] hover:underline mt-1">{detailsModal.phone}</a>
                                        </div>
                                        {detailsModal.company && (
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Company</label>
                                                <p className="text-sm text-gray-900 mt-1">{detailsModal.company}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Project Information */}
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-sm mb-3">Project Information</h3>
                                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Project Title</label>
                                            <p className="text-sm text-gray-900 mt-1">{detailsModal.projectTitle}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Description</label>
                                            <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{detailsModal.description}</p>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Project Type</label>
                                                <p className="text-sm text-gray-900 mt-1 capitalize">{detailsModal.projectType}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Package Type</label>
                                                <div className="mt-1">
                                                    <PackageTypeBadge packageType={detailsModal.packageType} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</label>
                                                <div className="mt-1">
                                                    <StatusBadge status={detailsModal.status} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Details */}
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-sm mb-3">Additional Details</h3>
                                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                                        {detailsModal.budget && (
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Budget</label>
                                                <p className="text-sm text-gray-900 mt-1">{detailsModal.budget}</p>
                                            </div>
                                        )}
                                        {detailsModal.timeline && (
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Timeline</label>
                                                <p className="text-sm text-gray-900 mt-1">{detailsModal.timeline}</p>
                                            </div>
                                        )}
                                        {detailsModal.technologies && detailsModal.technologies.length > 0 && (
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Technologies</label>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {detailsModal.technologies.map((tech, idx) => (
                                                        <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {detailsModal.additionalNotes && (
                                            <div>
                                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Additional Notes</label>
                                                <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{detailsModal.additionalNotes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Metadata */}
                                <div className="border-t border-gray-100 pt-4">
                                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                                        <div>
                                            <span className="font-semibold">Submitted:</span>
                                            <p className="mt-1">{formatDate(detailsModal.createdAt)} at {formatTime(detailsModal.createdAt)}</p>
                                        </div>
                                        {detailsModal.updatedAt && (
                                            <div>
                                                <span className="font-semibold">Last Updated:</span>
                                                <p className="mt-1">{formatDate(detailsModal.updatedAt)} at {formatTime(detailsModal.updatedAt)}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="bg-gray-50 border-t border-gray-100 p-4 md:p-6 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {detailsModal.status !== 'approved' && (
                                        <button
                                            onClick={() => { setStatusModal({ ...detailsModal, newStatus: 'approved' }); }}
                                            className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Approve
                                        </button>
                                    )}
                                    {detailsModal.status !== 'rejected' && (
                                        <button
                                            onClick={() => { setStatusModal({ ...detailsModal, newStatus: 'rejected' }); }}
                                            className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            Reject
                                        </button>
                                    )}
                                </div>
                                <button
                                    onClick={() => setDetailsModal(null)}
                                    className="px-3 py-1.5 bg-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Status Update Modal */}
                {statusModal && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-blue-50 to-white border-b border-gray-100 p-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">Update Status</h2>
                                    <p className="text-xs text-gray-500 mt-1">Reviewing request from {statusModal.fullName}</p>
                                </div>
                                <button onClick={() => setStatusModal(null)} className="text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">New Status</label>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                        <p className="text-sm font-semibold text-gray-900 capitalize">{statusModal.newStatus}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Review Notes (Optional)</label>
                                    <textarea
                                        value={statusNotes}
                                        onChange={(e) => setStatusNotes(e.target.value)}
                                        placeholder="Add any notes about this decision..."
                                        rows="4"
                                        className="w-full px-3 py-2 text-sm bg-white border border-gray-100 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="bg-gray-50 border-t border-gray-100 p-6 flex items-center justify-end gap-3">
                                <button
                                    onClick={() => setStatusModal(null)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(statusModal, statusModal.newStatus)}
                                    className={`px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors ${
                                        statusModal.newStatus === 'approved'
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : 'bg-red-600 hover:bg-red-700'
                                    }`}
                                >
                                    Confirm
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
