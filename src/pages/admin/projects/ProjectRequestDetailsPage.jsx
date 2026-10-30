/**
 * Project Request Details Page - COMPACT VERSION
 * Full-page display of a single project request with all information
 * Compact layout, no overlapping text, no gradients
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
    Check,
    X,
    Trash2,
    Loader,
} from 'lucide-react';

// Status configuration - simple, no colors
const STATUS_CONFIG = {
    'pending': { label: 'Pending' },
    'approved': { label: 'Approved' },
    'rejected': { label: 'Rejected' }
};

// Status badge component - minimal
const StatusBadge = ({ status }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG['pending'];
    
    return (
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
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
                        <p className="text-gray-600 text-sm">Loading request details...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="max-w-2xl mx-auto px-4 py-4">
                    <button
                        onClick={() => navigate('/admin/project-requests')}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium mb-4"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>
                    <div className="bg-white border border-gray-200 rounded p-4 flex items-start gap-3">
                        <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <h2 className="font-semibold text-gray-900 text-sm mb-1">Error Loading Request</h2>
                            <p className="text-gray-700 text-xs">{error}</p>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (!request) {
        return (
            <AdminLayout>
                <div className="max-w-2xl mx-auto px-4 py-4">
                    <button
                        onClick={() => navigate('/admin/project-requests')}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium mb-4"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>
                    <div className="bg-white border border-gray-200 rounded p-4 flex items-start gap-3">
                        <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <h2 className="font-semibold text-gray-900 text-sm mb-1">Request Not Found</h2>
                            <p className="text-gray-700 text-xs">The project request you're looking for doesn't exist or has been deleted.</p>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto px-4 py-4 pb-8">
                {/* HEADER ROW - Back button LEFT, Title CENTER, Action buttons RIGHT */}
                <div className="flex items-center justify-between gap-4 mb-4">
                    {/* Back Button LEFT */}
                    <button
                        onClick={() => navigate('/admin/project-requests')}
                        className="flex-shrink-0 flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>

                    {/* Title CENTER */}
                    <h1 className="flex-1 text-center text-lg font-bold text-gray-900 truncate px-4">
                        {request.projectTitle}
                    </h1>

                    {/* Action buttons RIGHT */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        {request.status !== 'approved' && (
                            <button
                                onClick={() => setStatusModal('approved')}
                                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 transition-colors"
                                title="Approve"
                            >
                                <Check size={14} />
                                Approve
                            </button>
                        )}
                        {request.status !== 'rejected' && (
                            <button
                                onClick={() => setStatusModal('rejected')}
                                className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 transition-colors"
                                title="Reject"
                            >
                                <X size={14} />
                                Reject
                            </button>
                        )}
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-1 px-3 py-1.5 bg-gray-300 text-gray-700 text-xs font-semibold rounded hover:bg-gray-400 transition-colors"
                            title="Delete"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>

                {/* ID and Status Row */}
                <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                    <p className="text-xs text-gray-600 font-medium">
                        ID: <span className="font-semibold text-gray-900">{request.id}</span>
                    </p>
                    <StatusBadge status={request.status} />
                </div>

                {/* REQUESTER SECTION - 2x2 grid */}
                <div className="bg-white border border-gray-200 rounded p-4 mb-4">
                    <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3 pb-2 border-b border-gray-100">
                        Requester Information
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="min-w-0">
                            <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Name</p>
                            <p className="text-sm text-gray-900 font-medium truncate">{request.fullName}</p>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Email</p>
                            <a href={`mailto:${request.email}`} className="text-sm text-blue-600 hover:underline truncate block">
                                {request.email}
                            </a>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Phone</p>
                            <a href={`tel:${request.phone}`} className="text-sm text-blue-600 hover:underline truncate block">
                                {request.phone}
                            </a>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Company</p>
                            <p className="text-sm text-gray-900 font-medium truncate">{request.company || '—'}</p>
                        </div>
                    </div>
                </div>

                {/* PROJECT SECTION */}
                <div className="bg-white border border-gray-200 rounded p-4 mb-4">
                    <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3 pb-2 border-b border-gray-100">
                        Project Information
                    </h2>
                    
                    {/* Title and Description */}
                    <div className="mb-3">
                        <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Title</p>
                        <p className="text-sm text-gray-900 font-medium line-clamp-2">{request.projectTitle}</p>
                    </div>
                    <div className="mb-3">
                        <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Description</p>
                        <p className="text-sm text-gray-700 line-clamp-3 bg-gray-50 p-2 rounded border border-gray-100">
                            {request.description}
                        </p>
                    </div>

                    {/* Type, Package, Status in compact grid */}
                    <div className="grid grid-cols-3 gap-2">
                        <div className="min-w-0">
                            <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Type</p>
                            <p className="text-xs text-gray-900 font-medium truncate capitalize">
                                {request.projectType}
                            </p>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Package</p>
                            <p className="text-xs text-gray-900 font-medium truncate capitalize">
                                {request.packageType?.replace('-', ' ')}
                            </p>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Status</p>
                            <div className="truncate">
                                <StatusBadge status={request.status} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* DETAILS SECTION */}
                <div className="bg-white border border-gray-200 rounded p-4 mb-4">
                    <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3 pb-2 border-b border-gray-100">
                        Details
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-3">
                        {request.budget && (
                            <div className="min-w-0">
                                <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Budget</p>
                                <p className="text-sm text-gray-900 font-medium truncate">{request.budget}</p>
                            </div>
                        )}
                        {request.timeline && (
                            <div className="min-w-0">
                                <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Timeline</p>
                                <p className="text-sm text-gray-900 font-medium truncate">{request.timeline}</p>
                            </div>
                        )}
                    </div>

                    {request.technologies && request.technologies.length > 0 && (
                        <div className="mt-3">
                            <p className="text-xs text-gray-600 font-semibold uppercase mb-2">Technologies</p>
                            <div className="flex flex-wrap gap-1">
                                {request.technologies.map((tech, idx) => (
                                    <span key={idx} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {request.additionalNotes && (
                        <div className="mt-3">
                            <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Notes</p>
                            <p className="text-xs text-gray-700 line-clamp-3 bg-gray-50 p-2 rounded border border-gray-100">
                                {request.additionalNotes}
                            </p>
                        </div>
                    )}
                </div>

                {/* DATES SECTION */}
                <div className="bg-white border border-gray-200 rounded p-4">
                    <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3 pb-2 border-b border-gray-100">
                        Dates
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Submitted</p>
                            <p className="text-xs text-gray-900 font-medium">{formatDate(request.createdAt)}</p>
                            <p className="text-xs text-gray-600">{formatTime(request.createdAt)}</p>
                        </div>
                        {request.updatedAt && (
                            <div>
                                <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Updated</p>
                                <p className="text-xs text-gray-900 font-medium">{formatDate(request.updatedAt)}</p>
                                <p className="text-xs text-gray-600">{formatTime(request.updatedAt)}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Status Update Modal */}
                {statusModal && (
                    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded shadow-lg max-w-md w-full">
                            {/* Modal Header */}
                            <div className={`${statusModal === 'approved' ? 'bg-green-600' : 'bg-red-600'} text-white px-4 py-3 flex items-center justify-between`}>
                                <h3 className="text-sm font-bold">
                                    {statusModal === 'approved' ? 'Approve Request' : 'Reject Request'}
                                </h3>
                                <button onClick={() => setStatusModal(null)} className="text-white hover:bg-white/20 p-1 rounded">
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-4 space-y-3">
                                {/* Status Info */}
                                <div className={`${statusModal === 'approved' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded p-3`}>
                                    <p className={`text-xs font-medium ${statusModal === 'approved' ? 'text-green-900' : 'text-red-900'}`}>
                                        {statusModal === 'approved' 
                                            ? 'This request will be marked as Approved' 
                                            : 'This request will be marked as Rejected'}
                                    </p>
                                </div>

                                {/* Request Summary */}
                                <div className="bg-gray-50 border border-gray-200 rounded p-3">
                                    <p className="text-xs text-gray-600 font-semibold uppercase mb-2">Request</p>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-xs text-gray-600 uppercase font-semibold">Name</p>
                                            <p className="text-sm text-gray-900 font-medium truncate">{request.fullName}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 uppercase font-semibold">Project</p>
                                            <p className="text-sm text-gray-900 font-medium line-clamp-1">{request.projectTitle}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Review Notes */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                                        Review Notes
                                    </label>
                                    <textarea
                                        value={statusNotes}
                                        onChange={(e) => setStatusNotes(e.target.value)}
                                        placeholder={statusModal === 'approved' 
                                            ? "Add any notes..." 
                                            : "Explain the rejection..."}
                                        rows="3"
                                        maxLength="300"
                                        className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{statusNotes.length}/300</p>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 flex gap-2 justify-end">
                                <button
                                    onClick={() => setStatusModal(null)}
                                    className="px-3 py-1.5 bg-white text-gray-700 text-xs font-semibold rounded border border-gray-300 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(statusModal)}
                                    disabled={updatingStatus}
                                    className={`px-3 py-1.5 text-white text-xs font-semibold rounded flex items-center gap-1.5 ${
                                        statusModal === 'approved'
                                            ? 'bg-green-600 hover:bg-green-700 disabled:bg-green-400'
                                            : 'bg-red-600 hover:bg-red-700 disabled:bg-red-400'
                                    }`}
                                >
                                    {updatingStatus && <Loader size={12} className="animate-spin" />}
                                    {statusModal === 'approved' ? 'Approve' : 'Reject'}
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

