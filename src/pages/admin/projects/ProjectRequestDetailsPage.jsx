/**
 * Project Request Details Page
 * Full-page display of a single project request with all information
 * Simple, clean styling with no gradients
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import projectRequestService from '../../../services/projectRequestService';
import {
    ArrowLeft,
    AlertCircle,
    Clock,
    CheckCircle,
    XCircle,
    Trash2,
    Mail,
    Phone,
    Building2,
    FileText,
    Calendar,
    Zap,
    X,
    Loader,
} from 'lucide-react';

// Status configuration
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

// Package type badge component
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
            <span className="text-lg leading-none">{config.icon}</span>
            {config.label}
        </span>
    );
};

const ProjectRequestDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusModal, setStatusModal] = useState(null);
    const [statusNotes, setStatusNotes] = useState('');
    const [updatingStatus, setUpdatingStatus] = useState(false);

    // Fetch project request details
    useEffect(() => {
        fetchRequestDetails();
    }, [id]);

    const fetchRequestDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await projectRequestService.getProjectRequestById(id);
            setRequest(response);
        } catch (err) {
            console.error('Failed to fetch project request:', err);
            setError(err.message || 'Failed to load project request details');
            dispatch(addNotification({
                type: 'error',
                message: 'Failed to load project request details'
            }));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        dispatch(openConfirmDialog({
            title: 'Delete Project Request',
            message: `Are you sure you want to delete this project request from ${request.fullName}? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: async () => {
                try {
                    await projectRequestService.deleteProjectRequest(id);
                    dispatch(addNotification({
                        type: 'success',
                        message: 'Project request deleted successfully'
                    }));
                    navigate('/admin/project-requests');
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

    const handleStatusUpdate = async (newStatus) => {
        try {
            setUpdatingStatus(true);
            await projectRequestService.updateProjectRequestStatus(id, {
                status: newStatus,
                reviewNotes: statusNotes
            });

            // Update local state
            setRequest(prev => ({
                ...prev,
                status: newStatus,
                reviewNotes: statusNotes
            }));

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
        } finally {
            setUpdatingStatus(false);
        }
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

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">Loading request details...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <button
                        onClick={() => navigate('/admin/project-requests')}
                        className="flex items-center gap-2 text-[#004fa2] hover:text-[#003d80] font-medium mb-6 transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Back to Requests
                    </button>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
                        <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
                        <div>
                            <h2 className="text-lg font-bold text-red-900 mb-1">Error Loading Request</h2>
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (!request) {
        return (
            <AdminLayout>
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <button
                        onClick={() => navigate('/admin/project-requests')}
                        className="flex items-center gap-2 text-[#004fa2] hover:text-[#003d80] font-medium mb-6 transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Back to Requests
                    </button>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex items-start gap-4">
                        <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
                        <div>
                            <h2 className="text-lg font-bold text-yellow-900 mb-1">Request Not Found</h2>
                            <p className="text-yellow-700">The project request you're looking for doesn't exist or has been deleted.</p>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto px-4 py-8 pb-12">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/admin/project-requests')}
                    className="flex items-center gap-2 text-[#004fa2] hover:text-[#003d80] font-medium mb-6 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Requests
                </button>

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            {request.projectTitle}
                        </h1>
                        <p className="text-gray-600">Request ID: {request.id}</p>
                    </div>
                    <StatusBadge status={request.status} size="lg" />
                </div>

                {/* Requester Information Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">👤</span>
                        Requester Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Full Name</label>
                            <p className="text-base font-medium text-gray-900">{request.fullName}</p>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Email Address</label>
                            <a href={`mailto:${request.email}`} className="text-base font-medium text-[#004fa2] hover:text-[#003d80] hover:underline break-all">
                                {request.email}
                            </a>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Phone</label>
                            <a href={`tel:${request.phone}`} className="text-base font-medium text-[#004fa2] hover:text-[#003d80] hover:underline">
                                {request.phone}
                            </a>
                        </div>
                        {request.company && (
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Company</label>
                                <p className="text-base font-medium text-gray-900">{request.company}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Project Information Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                        <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm">📋</span>
                        Project Information
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Project Description</label>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">{request.description}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Project Type</label>
                                <p className="text-base font-medium text-gray-900 capitalize">{request.projectType}</p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Package Type</label>
                                <PackageTypeBadge packageType={request.packageType} size="md" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Status</label>
                                <StatusBadge status={request.status} size="md" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Details Section */}
                {(request.budget || request.timeline || request.technologies || request.additionalNotes) && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-6 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                            <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm">⚡</span>
                            Additional Details
                        </h2>
                        <div className="space-y-6">
                            {request.budget && (
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Budget</label>
                                    <p className="text-base font-medium text-gray-900">{request.budget}</p>
                                </div>
                            )}
                            {request.timeline && (
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Timeline</label>
                                    <p className="text-base font-medium text-gray-900">{request.timeline}</p>
                                </div>
                            )}
                            {request.technologies && request.technologies.length > 0 && (
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Technologies</label>
                                    <div className="flex flex-wrap gap-2">
                                        {request.technologies.map((tech, idx) => (
                                            <span key={idx} className="inline-block px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {request.additionalNotes && (
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Additional Notes</label>
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{request.additionalNotes}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Submission Details Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                        <span className="w-8 h-8 bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center text-sm">📅</span>
                        Submission Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Submitted</label>
                            <p className="text-base font-medium text-gray-900">{formatDate(request.createdAt)}</p>
                            <p className="text-sm text-gray-600 mt-1">{formatTime(request.createdAt)}</p>
                        </div>
                        {request.updatedAt && (
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">Last Updated</label>
                                <p className="text-base font-medium text-gray-900">{formatDate(request.updatedAt)}</p>
                                <p className="text-sm text-gray-600 mt-1">{formatTime(request.updatedAt)}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                    {request.status !== 'approved' && (
                        <button
                            onClick={() => setStatusModal('approved')}
                            className="flex-1 sm:flex-none px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-sm hover:shadow-md"
                        >
                            ✓ Approve Request
                        </button>
                    )}
                    {request.status !== 'rejected' && (
                        <button
                            onClick={() => setStatusModal('rejected')}
                            className="flex-1 sm:flex-none px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm hover:shadow-md"
                        >
                            ✕ Reject Request
                        </button>
                    )}
                    <button
                        onClick={handleDelete}
                        className="flex-1 sm:flex-none px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                    >
                        <Trash2 size={18} />
                        Delete Request
                    </button>
                </div>

                {/* Status Update Modal */}
                {statusModal && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
                            {/* Modal Header */}
                            <div className={`${statusModal === 'approved' ? 'bg-green-600' : 'bg-red-600'} text-white px-6 md:px-8 py-6 flex items-start justify-between rounded-t-xl`}>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold">
                                        {statusModal === 'approved' ? '✓ Approve Request' : '✕ Reject Request'}
                                    </h2>
                                    <p className={`text-sm mt-2 ${statusModal === 'approved' ? 'text-green-100' : 'text-red-100'}`}>
                                        Reviewing request from {request.fullName}
                                    </p>
                                </div>
                                <button onClick={() => setStatusModal(null)} className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors flex-shrink-0">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 md:p-8 space-y-6">
                                {/* Status Summary */}
                                <div className={`${statusModal === 'approved' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg p-4`}>
                                    <p className={`text-sm font-medium ${statusModal === 'approved' ? 'text-green-900' : 'text-red-900'}`}>
                                        {statusModal === 'approved' 
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
                                            <p className="text-sm font-semibold text-gray-900 mt-1">{request.fullName}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Project</p>
                                            <p className="text-sm font-semibold text-gray-900 mt-1 line-clamp-1">{request.projectTitle}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Package Type</p>
                                            <div className="mt-2">
                                                <PackageTypeBadge packageType={request.packageType} size="sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Review Notes */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                                        Review Notes {statusModal === 'rejected' && '(Recommended)'}
                                    </label>
                                    <textarea
                                        value={statusNotes}
                                        onChange={(e) => setStatusNotes(e.target.value)}
                                        placeholder={statusModal === 'approved' 
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
                                    onClick={() => handleStatusUpdate(statusModal)}
                                    disabled={updatingStatus}
                                    className={`px-6 py-2.5 text-white text-sm font-semibold rounded-lg transition-colors duration-150 shadow-sm hover:shadow-md flex items-center gap-2 ${
                                        statusModal === 'approved'
                                            ? 'bg-green-600 hover:bg-green-700 disabled:bg-green-400'
                                            : 'bg-red-600 hover:bg-red-700 disabled:bg-red-400'
                                    } disabled:opacity-75 disabled:cursor-not-allowed`}
                                >
                                    {updatingStatus && <Loader size={16} className="animate-spin" />}
                                    {statusModal === 'approved' ? '✓ Approve' : '✕ Reject'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ProjectRequestDetailsPage;
