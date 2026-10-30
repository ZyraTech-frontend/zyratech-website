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

    // Get initials from full name
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto px-4 py-6 pb-8">
                {/* HEADER */}
                <div className="flex items-center justify-between gap-4 mb-6">
                    <button
                        onClick={() => navigate('/admin/project-requests')}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Requests
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Project Request Details</h1>
                    <div className="w-32" />
                </div>

                {/* TWO-COLUMN LAYOUT */}
                <div className="grid grid-cols-3 gap-6">
                    {/* LEFT COLUMN - 60% (2/3) */}
                    <div className="col-span-2 space-y-6">
                        {/* APPLICANT CARD */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start gap-4">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-sm">
                                        {getInitials(request.fullName)}
                                    </div>
                                </div>

                                {/* Applicant Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div className="min-w-0">
                                            <h2 className="text-lg font-bold text-gray-900">{request.fullName}</h2>
                                            <p className="text-sm text-gray-600 mt-1">{request.company || 'Individual'}</p>
                                        </div>
                                        <StatusBadge status={request.status} />
                                    </div>

                                    {/* Contact Info Grid */}
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Email</p>
                                            <a href={`mailto:${request.email}`} className="text-sm text-blue-600 hover:underline truncate block">
                                                {request.email}
                                            </a>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Phone</p>
                                            <a href={`tel:${request.phone}`} className="text-sm text-blue-600 hover:underline truncate block">
                                                {request.phone}
                                            </a>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Project Type</p>
                                            <p className="text-sm text-gray-900 font-medium capitalize truncate">{request.projectType}</p>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Package</p>
                                            <p className="text-sm text-gray-900 font-medium capitalize truncate">{request.packageType?.replace('-', ' ')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PROJECT DESCRIPTION */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 pb-3 border-b border-gray-100">
                                Project Overview
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Project Title</p>
                                    <p className="text-base font-semibold text-gray-900">{request.projectTitle}</p>
                                </div>
                                
                                <div>
                                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Description</p>
                                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded border border-gray-100">
                                        {request.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* PROJECT DETAILS */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 pb-3 border-b border-gray-100">
                                Project Details
                            </h3>

                            <div className="space-y-4">
                                {/* Budget and Timeline */}
                                <div className="grid grid-cols-2 gap-4">
                                    {request.budget && (
                                        <div>
                                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Budget</p>
                                            <p className="text-base text-gray-900 font-semibold">{request.budget}</p>
                                        </div>
                                    )}
                                    {request.timeline && (
                                        <div>
                                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Timeline</p>
                                            <p className="text-base text-gray-900 font-semibold">{request.timeline}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Technologies */}
                                {request.technologies && request.technologies.length > 0 && (
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Technologies</p>
                                        <div className="flex flex-wrap gap-2">
                                            {request.technologies.map((tech, idx) => (
                                                <span key={idx} className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Additional Notes */}
                                {request.additionalNotes && (
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Additional Notes</p>
                                        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded border border-gray-100">
                                            {request.additionalNotes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR - 40% (1/3) */}
                    <div className="col-span-1 space-y-6">
                        {/* ACTION BUTTONS */}
                        <div className="space-y-3">
                            {request.status !== 'approved' && (
                                <button
                                    onClick={() => setStatusModal('approved')}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                                >
                                    <Check size={16} />
                                    Approve
                                </button>
                            )}
                            {request.status !== 'rejected' && (
                                <button
                                    onClick={() => setStatusModal('rejected')}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                                >
                                    <X size={16} />
                                    Reject
                                </button>
                            )}
                            <button
                                onClick={handleDelete}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-300 transition-colors shadow-sm"
                            >
                                <Trash2 size={16} />
                                Delete
                            </button>
                        </div>

                        {/* REQUEST INFO CARD */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 pb-3 border-b border-gray-100">
                                Request Info
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Request ID</p>
                                    <p className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1.5 rounded border border-gray-100 break-all">
                                        {request.id}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Status</p>
                                    <StatusBadge status={request.status} />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Package Type</p>
                                    <p className="text-sm text-gray-900 font-medium capitalize">{request.packageType?.replace('-', ' ')}</p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Budget</p>
                                    <p className="text-sm text-gray-900 font-semibold">{request.budget || '—'}</p>
                                </div>
                            </div>
                        </div>

                        {/* TIMELINE CARD */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 pb-3 border-b border-gray-100">
                                Timeline
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Submitted</p>
                                    <p className="text-sm text-gray-900 font-medium">{formatDate(request.createdAt)}</p>
                                    <p className="text-xs text-gray-600">{formatTime(request.createdAt)}</p>
                                </div>

                                {request.updatedAt && (
                                    <div className="pt-3 border-t border-gray-100">
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Last Updated</p>
                                        <p className="text-sm text-gray-900 font-medium">{formatDate(request.updatedAt)}</p>
                                        <p className="text-xs text-gray-600">{formatTime(request.updatedAt)}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Update Modal */}
                {statusModal && (
                    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                            {/* Modal Header */}
                            <div className={`${statusModal === 'approved' ? 'bg-green-600' : 'bg-red-600'} text-white px-6 py-4 flex items-center justify-between`}>
                                <h3 className="text-base font-bold">
                                    {statusModal === 'approved' ? 'Approve Request' : 'Reject Request'}
                                </h3>
                                <button onClick={() => setStatusModal(null)} className="text-white hover:bg-white/20 p-1 rounded transition-colors">
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 space-y-4">
                                {/* Status Info */}
                                <div className={`${statusModal === 'approved' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg p-3`}>
                                    <p className={`text-sm font-medium ${statusModal === 'approved' ? 'text-green-900' : 'text-red-900'}`}>
                                        {statusModal === 'approved' 
                                            ? 'This request will be marked as Approved' 
                                            : 'This request will be marked as Rejected'}
                                    </p>
                                </div>

                                {/* Request Summary */}
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-3">Request Summary</p>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Applicant</p>
                                            <p className="text-sm text-gray-900 font-medium truncate">{request.fullName}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Project</p>
                                            <p className="text-sm text-gray-900 font-medium line-clamp-1">{request.projectTitle}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Review Notes */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        {statusModal === 'approved' ? 'Approval Notes' : 'Rejection Reason'}
                                    </label>
                                    <textarea
                                        value={statusNotes}
                                        onChange={(e) => setStatusNotes(e.target.value)}
                                        placeholder={statusModal === 'approved' 
                                            ? "Add any notes about this approval..." 
                                            : "Explain why this request is being rejected..."}
                                        rows="4"
                                        maxLength="300"
                                        className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">{statusNotes.length}/300 characters</p>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3 justify-end rounded-b-lg">
                                <button
                                    onClick={() => setStatusModal(null)}
                                    className="px-4 py-2 bg-white text-gray-700 text-sm font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(statusModal)}
                                    disabled={updatingStatus}
                                    className={`px-4 py-2 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors ${
                                        statusModal === 'approved'
                                            ? 'bg-green-600 hover:bg-green-700 disabled:bg-green-400'
                                            : 'bg-red-600 hover:bg-red-700 disabled:bg-red-400'
                                    }`}
                                >
                                    {updatingStatus && <Loader size={14} className="animate-spin" />}
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

