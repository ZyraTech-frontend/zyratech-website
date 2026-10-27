import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import trainingApplicationService from '../../../services/trainingApplicationService';
import LoadingSpinner from '../../../components/admin/shared/LoadingSpinner';
import {
    Users,
    ChevronLeft,
    Mail,
    Phone,
    MapPin,
    GraduationCap,
    FileText,
    Download,
    Linkedin,
    Globe,
    ExternalLink,
    XCircle,
    CheckCircle,
    Calendar,
    Clock,
    CreditCard,
    DollarSign
} from 'lucide-react';

const ApplicationDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchApplication();
    }, [id]);

    const fetchApplication = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Fetch application details (should include payment if it exists)
            const response = await trainingApplicationService.getApplication(id);
            const applicationData = response.data || response;
            
            console.log('📋 Full application data from backend:', applicationData);
            
            setApplication(applicationData);
        } catch (err) {
            console.error('Failed to fetch application:', err);
            setError(err.response?.data?.message || 'Failed to load application details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <LoadingSpinner text="Loading application details..." />
            </AdminLayout>
        );
    }

    if (error || !application) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Application Not Found</h2>
                    <p className="text-gray-500 mb-4">{error || 'The application you are looking for does not exist.'}</p>
                    <button
                        onClick={() => navigate('/admin/training')}
                        className="text-[#004fa2] hover:underline"
                    >
                        Return to Training
                    </button>
                </div>
            </AdminLayout>
        );
    }

    const handleApprove = () => {
        dispatch(openConfirmDialog({
            title: 'Approve Application',
            message: `Approve ${application.fullName}'s application for ${application.courseTitle || application.course?.title || 'this course'}?`,
            onConfirm: async () => {
                try {
                    await trainingApplicationService.updateApplicationStatus(application.id, 'approved');
                    dispatch(addNotification({
                        type: 'success',
                        message: 'Application approved successfully'
                    }));
                    navigate('/admin/training');
                } catch (error) {
                    dispatch(addNotification({
                        type: 'error',
                        message: error.response?.data?.message || 'Failed to approve application'
                    }));
                }
            }
        }));
    };

    const handleReject = () => {
        dispatch(openConfirmDialog({
            title: 'Reject Application',
            message: `Are you sure you want to reject ${application.fullName}'s application?`,
            isDangerous: true,
            onConfirm: async () => {
                try {
                    await trainingApplicationService.updateApplicationStatus(application.id, 'rejected');
                    dispatch(addNotification({
                        type: 'success',
                        message: 'Application rejected'
                    }));
                    navigate('/admin/training');
                } catch (error) {
                    dispatch(addNotification({
                        type: 'error',
                        message: error.response?.data?.message || 'Failed to reject application'
                    }));
                }
            }
        }));
    };

    const handleDownloadCV = () => {
        console.log('Downloading CV:', application.cvFileName);
    };

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto space-y-3 md:space-y-6 pb-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/admin/training')}
                            className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <span>ID: {application.id}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    Applied {new Date(application.appliedDate).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {application.status === 'pending' && (
                            <>
                                <button
                                    onClick={handleReject}
                                    className="px-4 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors font-medium flex items-center gap-2"
                                >
                                    <XCircle size={18} />
                                    Reject
                                </button>
                                <button
                                    onClick={handleApprove}
                                    className="px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2 shadow-sm"
                                >
                                    <CheckCircle size={18} />
                                    Approve Application
                                </button>
                            </>
                        )}
                        {application.status !== 'pending' && (
                            <span className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${application.status === 'approved'
                                ? 'bg-green-100 text-green-700 border border-green-200'
                                : 'bg-red-100 text-red-700 border border-red-200'
                                }`}>
                                {application.status === 'approved' ? <CheckCircle size={18} /> : <XCircle size={18} />}
                                {application.status ? application.status.charAt(0).toUpperCase() + application.status.slice(1) : 'Unknown'}
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Applicant Profile Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                                        {application.fullName ? application.fullName.charAt(0).toUpperCase() : '?'}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{application.fullName}</h2>
                                        <p className="text-sm text-gray-500">{application.educationLevel}</p>
                                        {/* Display payment amount here if available */}
                                        {application.payment && application.payment.amount && (
                                            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-lg">
                                                <DollarSign size={14} className="text-green-600" />
                                                <span className="text-sm font-bold text-green-700">
                                                    GHS {parseFloat(application.payment.amount).toFixed(2)} paid
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 mb-1">Applying for</p>
                                    <p className="text-sm font-bold text-[#004fa2]">{application.courseTitle}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Email Address</p>
                                        <p className="text-sm font-semibold text-gray-900">{application.emailAddress}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Phone Number</p>
                                        <p className="text-sm font-semibold text-gray-900">{application.phoneNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Location</p>
                                        <p className="text-sm font-semibold text-gray-900">{application.currentLocation}, {application.country}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
                                        <GraduationCap size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Education</p>
                                        <p className="text-sm font-semibold text-gray-900">{application.educationLevel}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Motivation Statement - Only show if it exists */}
                        {application.motivationStatement && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText size={20} className="text-[#004fa2]" />
                                    Motivation Statement
                                </h3>
                                <div className="prose prose-sm max-w-none text-gray-600 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    {application.motivationStatement}
                                </div>
                            </div>
                        )}

                        {/* Additional Message */}
                        {application.message && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Mail size={20} className="text-[#004fa2]" />
                                    Additional Message
                                </h3>
                                <div className="text-gray-600 bg-blue-50/50 p-6 rounded-xl border border-blue-100 italic">
                                    "{application.message}"
                                </div>
                            </div>
                        )}

                        {/* Payment Information */}
                        {application.payment && application.payment.amount && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <CreditCard size={20} className="text-[#004fa2]" />
                                    Payment Information
                                </h3>
                                <div className="space-y-4">
                                    {/* Payment Amount */}
                                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                                <DollarSign size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-green-600 font-medium">Amount Paid</p>
                                                <p className="text-2xl font-bold text-green-700">
                                                    {application.payment.currency || 'GHS'} {parseFloat(application.payment.amount).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                        {application.payment.status && (
                                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                application.payment.status === 'completed' || application.payment.status === 'success'
                                                    ? 'bg-green-100 text-green-700'
                                                    : application.payment.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}>
                                                {application.payment.status.charAt(0).toUpperCase() + application.payment.status.slice(1)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Payment Details Grid */}
                                    {(application.payment.paymentMethod || application.payment.reference || application.payment.paidAt || application.payment.createdAt) && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {application.payment.paymentMethod && (
                                                <div className="p-3 bg-gray-50 rounded-lg">
                                                    <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                                                    <p className="text-sm font-semibold text-gray-900 capitalize">{application.payment.paymentMethod.replace('_', ' ')}</p>
                                                </div>
                                            )}
                                            {application.payment.reference && (
                                                <div className="p-3 bg-gray-50 rounded-lg">
                                                    <p className="text-xs text-gray-500 mb-1">Transaction Reference</p>
                                                    <p className="text-sm font-mono text-gray-900">{application.payment.reference}</p>
                                                </div>
                                            )}
                                            {application.payment.paidAt && (
                                                <div className="p-3 bg-gray-50 rounded-lg">
                                                    <p className="text-xs text-gray-500 mb-1">Payment Date</p>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {new Date(application.payment.paidAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            )}
                                            {application.payment.createdAt && (
                                                <div className="p-3 bg-gray-50 rounded-lg">
                                                    <p className="text-xs text-gray-500 mb-1">Payment Created</p>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {new Date(application.payment.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Rejection Reason (if applicable) */}
                        {application.status === 'rejected' && application.rejectionReason && (
                            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                                <h3 className="text-lg font-bold text-red-800 mb-2">Rejection Reason</h3>
                                <p className="text-red-700">{application.rejectionReason}</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Preferences Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Preferences</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Preferred Cohort</p>
                                    <div className="flex items-center gap-2 font-medium text-gray-900 bg-blue-50 p-3 rounded-lg border border-blue-100">
                                        <Calendar size={16} className="text-[#004fa2]" />
                                        {application.preferredCohort}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Learning Mode</p>
                                    <div className="flex items-center gap-2 font-medium text-gray-900 bg-purple-50 p-3 rounded-lg border border-purple-100">
                                        <Users size={16} className="text-purple-600" />
                                        {application.learningMode}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Attachments Card - Only show if CV exists */}
                        {application.cvFileName && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Attachments</h3>
                                <div className="border border-gray-200 rounded-xl p-4 hover:border-[#004fa2] transition-colors group cursor-pointer" onClick={handleDownloadCV}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
                                            <FileText size={20} />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#004fa2] transition-colors">
                                                {application.cvFileName}
                                            </p>
                                            <p className="text-xs text-gray-500">PDF Document</p>
                                        </div>
                                        <Download size={18} className="text-gray-400 group-hover:text-[#004fa2]" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Social Links */}
                        {(application.linkedinUrl || application.websiteUrl) && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Professional Links</h3>
                                <div className="space-y-3">
                                    {application.linkedinUrl && (
                                        <a
                                            href={application.linkedinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#0077b5] hover:bg-[#0077b5]/5 transition-all text-gray-700 hover:text-[#0077b5]"
                                        >
                                            <Linkedin size={20} />
                                            <span className="font-medium text-sm">LinkedIn Profile</span>
                                            <ExternalLink size={14} className="ml-auto" />
                                        </a>
                                    )}
                                    {application.websiteUrl && (
                                        <a
                                            href={application.websiteUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all text-gray-700 hover:text-gray-900"
                                        >
                                            <Globe size={20} />
                                            <span className="font-medium text-sm">Portfolio/Website</span>
                                            <ExternalLink size={14} className="ml-auto" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ApplicationDetailsPage;
