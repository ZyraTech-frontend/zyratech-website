import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import jobsService from '../../../services/jobsService';
import {
    ChevronLeft,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    FileText,
    Download,
    Linkedin,
    Github,
    Globe,
    ExternalLink,
    XCircle,
    CheckCircle,
    Calendar,
    Clock,
    AlertCircle,
    Loader,
    Award,
    User,
    Shield,
    Users
} from 'lucide-react';

const JobApplicationDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [previewTitle, setPreviewTitle] = useState('');

    useEffect(() => {
        let isMounted = true;

        const loadApplication = async () => {
            try {
                setError(null);
                console.log('Fetching application details for ID:', id);
                
                const data = await jobsService.getApplication(id);
                
                if (isMounted) {
                    const mappedApp = {
                        id: data.id,
                        jobId: data.jobId,
                        jobTitle: data.jobTitle || 'Position',
                        fullName: `${data.firstName} ${data.lastName}`,
                        emailAddress: data.email,
                        phoneNumber: data.phoneNumber,
                        country: 'Ghana',
                        currentLocation: data.city,
                        educationLevel: 'Not specified',
                        status: data.status || 'pending',
                        appliedDate: data.submittedAt || data.createdAt || new Date().toISOString(),
                        cvFileName: 'Resume.pdf',
                        motivationStatement: data.message || 'No message provided',
                        linkedinUrl: data.linkedin || null,
                        facebookUrl: data.facebook || null,
                        twitterUrl: data.twitter || null,
                        portfolioUrl: data.website || null,
                        githubUrl: data.github || null,
                        workExperience: data.workExperience,
                        residence: data.residence,
                        currentSalary: data.currentSalary,
                        legalAuthorization: data.legalAuthorization,
                        disability: data.disability,
                        certifyTruth: data.certifyTruth,
                        agreePrivacy: data.agreePrivacy,
                        title: data.title,
                        howDidYouKnowZyra: data.howDidYouKnowZyra,
                        howDidYouKnowJob: data.howDidYouKnowJob,
                        backgroundCheck: data.backgroundCheck,
                        criminalCharges: data.criminalCharges,
                        references: data.references,
                        resumeUrl: data.resumeUrl,
                        additionalAttachments: data.additionalDocumentUrl || null,
                        ...data
                    };
                    
                    setApplication(mappedApp);
                    console.log('✅ Application loaded:', mappedApp);
                }
            } catch (err) {
                console.error('Failed to fetch application:', err);
                if (isMounted) {
                    setError('Failed to load application details');
                    setApplication(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadApplication();
        return () => { isMounted = false; };
    }, [id]);

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <Loader size={48} className="text-[#004fa2] animate-spin mb-4" />
                    <h2 className="text-lg font-semibold text-gray-900">Loading application details...</h2>
                </div>
            </AdminLayout>
        );
    }

    if (error || !application) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <AlertCircle size={48} className="text-red-500 mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{error || 'Application Not Found'}</h2>
                    <button
                        onClick={() => navigate('/admin/jobs')}
                        className="text-[#004fa2] hover:underline font-medium mt-2"
                    >
                        Return to Jobs
                    </button>
                </div>
            </AdminLayout>
        );
    }

    const handleApprove = () => {
        dispatch(openConfirmDialog({
            title: 'Approve Application',
            message: `Approve ${application.fullName}'s application?`,
            onConfirm: async () => {
                try {
                    await jobsService.updateApplicationStatus(application.id, 'hired');
                    dispatch(addNotification({
                        type: 'success',
                        message: 'Application approved successfully'
                    }));
                    setApplication(prev => ({ ...prev, status: 'hired' }));
                } catch (error) {
                    console.error('Failed to approve application:', error);
                    dispatch(addNotification({
                        type: 'error',
                        message: 'Failed to approve application'
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
                    await jobsService.updateApplicationStatus(application.id, 'rejected');
                    dispatch(addNotification({
                        type: 'success',
                        message: 'Application rejected successfully'
                    }));
                    setApplication(prev => ({ ...prev, status: 'rejected' }));
                } catch (error) {
                    console.error('Failed to reject application:', error);
                    dispatch(addNotification({
                        type: 'error',
                        message: 'Failed to reject application'
                    }));
                }
            }
        }));
    };

    const handleDownloadCV = () => {
        if (application.resumeUrl) {
            window.open(application.resumeUrl, '_blank');
        } else {
            dispatch(addNotification({
                type: 'info',
                message: 'Resume URL not available'
            }));
        }
    };

    const handlePreviewDocument = (url, title) => {
        setPreviewUrl(url);
        setPreviewTitle(title);
        setPreviewOpen(true);
    };

    const handleClosePreview = () => {
        setPreviewOpen(false);
        setPreviewUrl(null);
        setPreviewTitle('');
    };

    const getStatusColor = (status) => {
        const colors = {
            'approved': 'bg-green-50 text-green-700 border-green-200',
            'hired': 'bg-green-50 text-green-700 border-green-200',
            'rejected': 'bg-red-50 text-red-700 border-red-200',
            'interviewed': 'bg-purple-50 text-purple-700 border-purple-200',
            'reviewed': 'bg-blue-50 text-blue-700 border-blue-200',
            'pending': 'bg-amber-50 text-amber-700 border-amber-200'
        };
        return colors[status] || colors['pending'];
    };

    const getStatusIcon = (status) => {
        if (status === 'approved' || status === 'hired') return <CheckCircle size={16} />;
        if (status === 'rejected') return <XCircle size={16} />;
        return null;
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Tab definitions
    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'background', label: 'Background', icon: Shield },
        { id: 'documents', label: 'Documents', icon: FileText }
    ];

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto pb-12">
                {/* Navigation Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/admin/jobs')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-6 transition-colors"
                    >
                        <ChevronLeft size={20} />
                        Back to Applications
                    </button>
                </div>

                {/* Hero Section - Applicant Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
                    <div className="p-8 bg-gradient-to-r from-[#004fa2]/5 to-transparent">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            {/* Applicant Info */}
                            <div className="flex items-start gap-6">
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-4xl font-bold shadow-lg flex-shrink-0">
                                    {application.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{application.fullName}</h1>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Briefcase size={16} className="text-gray-400" />
                                            <span className="text-sm">{application.jobTitle}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar size={16} className="text-gray-400" />
                                            <span className="text-sm">Applied {formatDate(application.appliedDate)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status & Actions */}
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Status</p>
                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-semibold text-sm ${getStatusColor(application.status)}`}>
                                        {getStatusIcon(application.status)}
                                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                    </div>
                                </div>
                                {application.status === 'pending' && (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleReject}
                                            className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-semibold text-sm flex items-center gap-2"
                                        >
                                            <XCircle size={16} />
                                            Reject
                                        </button>
                                        <button
                                            onClick={handleApprove}
                                            className="px-6 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-semibold text-sm flex items-center gap-2 shadow-sm"
                                        >
                                            <CheckCircle size={16} />
                                            Approve
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Contact Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Email</p>
                                <a href={`mailto:${application.emailAddress}`} className="text-sm font-medium text-[#004fa2] hover:underline truncate">
                                    {application.emailAddress}
                                </a>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Phone</p>
                                <a href={`tel:${application.phoneNumber}`} className="text-sm font-medium text-gray-900">
                                    {application.phoneNumber}
                                </a>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Location</p>
                                <p className="text-sm font-medium text-gray-900">{application.currentLocation}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Application ID</p>
                                <p className="text-sm font-medium text-gray-700 font-mono">{application.id}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-1 mb-8 border-b border-gray-200 overflow-x-auto">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                                    isActive
                                        ? 'border-[#004fa2] text-[#004fa2]'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <Icon size={18} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* OVERVIEW TAB */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Motivation Statement */}
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">Motivation Statement</h2>
                                    <p className="text-gray-700 leading-relaxed text-base">
                                        {application.motivationStatement}
                                    </p>
                                </div>

                                {/* How They Found Us */}
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-900 mb-6">How They Found Us</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {application.howDidYouKnowZyra && (
                                            <div>
                                                <p className="text-xs text-gray-500 font-semibold uppercase mb-3">Source - ZyraTech</p>
                                                <p className="text-gray-700">{application.howDidYouKnowZyra}</p>
                                            </div>
                                        )}
                                        {application.howDidYouKnowJob && (
                                            <div>
                                                <p className="text-xs text-gray-500 font-semibold uppercase mb-3">Source - Position</p>
                                                <p className="text-gray-700">{application.howDidYouKnowJob}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* EXPERIENCE TAB */}
                        {activeTab === 'experience' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-900 mb-6">Work Experience & Qualifications</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Experience</p>
                                            <p className="text-2xl font-bold text-gray-900">{application.workExperience} <span className="text-sm text-gray-500 font-normal">months</span></p>
                                        </div>
                                        {application.title && (
                                            <div>
                                                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Current/Desired Title</p>
                                                <p className="text-lg font-semibold text-gray-900">{application.title}</p>
                                            </div>
                                        )}
                                        {application.residence && (
                                            <div>
                                                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Residence</p>
                                                <p className="text-gray-700">{application.residence}</p>
                                            </div>
                                        )}
                                        {application.currentSalary && (
                                            <div>
                                                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Current Salary</p>
                                                <p className="text-gray-700">{application.currentSalary}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* BACKGROUND TAB */}
                        {activeTab === 'background' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-900 mb-6">Background Information</h2>
                                    <div className="space-y-6">
                                        {/* Legal Authorization */}
                                        <div className="pb-6 border-b border-gray-200">
                                            <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Legal Work Authorization</p>
                                            <div className="flex items-center gap-2">
                                                <Shield size={16} className={application.legalAuthorization === 'Yes' ? 'text-green-600' : 'text-gray-400'} />
                                                <p className="text-gray-900 font-medium">{application.legalAuthorization}</p>
                                            </div>
                                        </div>

                                        {/* Background Check */}
                                        {application.backgroundCheck && (
                                            <div className="pb-6 border-b border-gray-200">
                                                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Background Check</p>
                                                <p className="text-gray-900 font-medium capitalize">{application.backgroundCheck}</p>
                                            </div>
                                        )}

                                        {/* Criminal Charges */}
                                        {application.criminalCharges && (
                                            <div className="pb-6 border-b border-gray-200">
                                                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Criminal Charges</p>
                                                <p className="text-gray-900 font-medium capitalize">{application.criminalCharges}</p>
                                            </div>
                                        )}

                                        {/* Disability */}
                                        {application.disability && application.disability !== 'None' && (
                                            <div className="pb-6 border-b border-gray-200">
                                                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Disability Information</p>
                                                <p className="text-gray-900 font-medium">{application.disability}</p>
                                            </div>
                                        )}

                                        {/* Certifications */}
                                        <div className="pb-6 border-b border-gray-200">
                                            <p className="text-xs text-gray-500 font-semibold uppercase mb-3">Certifications</p>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-3 h-3 rounded-full ${application.certifyTruth ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                                                    <span className="text-sm text-gray-700">Certifies truth of application</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-3 h-3 rounded-full ${application.agreePrivacy ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                                                    <span className="text-sm text-gray-700">Agrees to privacy policy</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* References */}
                                        {application.references && (
                                            <div>
                                                <p className="text-xs text-gray-500 font-semibold uppercase mb-3">References</p>
                                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                    <p className="text-sm text-gray-700 whitespace-pre-wrap font-mono text-xs">{application.references}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* DOCUMENTS TAB */}
                        {activeTab === 'documents' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-900 mb-6">Application Documents</h2>
                                    
                                    {/* Resume */}
                                    <div className="mb-6 pb-6 border-b border-gray-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-sm font-semibold text-gray-900">Resume/CV</p>
                                            <span className="text-xs text-gray-500">Primary Document</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handlePreviewDocument(application.resumeUrl, 'Resume')}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm border border-gray-300"
                                            >
                                                <FileText size={18} />
                                                Preview
                                            </button>
                                            <button
                                                onClick={handleDownloadCV}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-semibold text-sm"
                                            >
                                                <Download size={18} />
                                                Download
                                            </button>
                                        </div>
                                    </div>

                                    {/* Additional Attachments */}
                                    {application.additionalAttachments ? (
                                        <div className="mb-6 pb-6 border-b border-gray-200">
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="text-sm font-semibold text-gray-900">Additional Documents</p>
                                                <span className="text-xs text-gray-500">Supplementary</span>
                                            </div>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handlePreviewDocument(application.additionalAttachments, 'Additional Document')}
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm border border-gray-300"
                                                >
                                                    <FileText size={18} />
                                                    Preview
                                                </button>
                                                <a
                                                    href={application.additionalAttachments}
                                                    download
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-semibold text-sm"
                                                >
                                                    <Download size={18} />
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mb-6 pb-6 border-b border-gray-200">
                                            <p className="text-sm font-semibold text-gray-900 mb-2">Additional Documents</p>
                                            <p className="text-xs text-gray-500 italic">No additional documents provided</p>
                                        </div>
                                    )}

                                    {/* Social Profiles */}
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 mb-4">Social & Professional Profiles</p>
                                        <div className="space-y-3">
                                            {application.linkedinUrl && (
                                                <a
                                                    href={application.linkedinUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 transition-colors group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Linkedin size={20} className="text-blue-600" />
                                                        <span className="font-medium text-gray-900">LinkedIn Profile</span>
                                                    </div>
                                                    <ExternalLink size={18} className="text-gray-400 group-hover:text-blue-600" />
                                                </a>
                                            )}
                                            {application.githubUrl && (
                                                <a
                                                    href={application.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Github size={20} className="text-gray-900" />
                                                        <span className="font-medium text-gray-900">GitHub Profile</span>
                                                    </div>
                                                    <ExternalLink size={18} className="text-gray-400 group-hover:text-gray-900" />
                                                </a>
                                            )}
                                            {application.portfolioUrl && (
                                                <a
                                                    href={application.portfolioUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 transition-colors group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Globe size={20} className="text-blue-600" />
                                                        <span className="font-medium text-gray-900">Portfolio Website</span>
                                                    </div>
                                                    <ExternalLink size={18} className="text-gray-400 group-hover:text-blue-600" />
                                                </a>
                                            )}
                                            {application.twitterUrl && (
                                                <a
                                                    href={application.twitterUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 transition-colors group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Mail size={20} className="text-blue-400" />
                                                        <span className="font-medium text-gray-900">Twitter/X</span>
                                                    </div>
                                                    <ExternalLink size={18} className="text-gray-400 group-hover:text-blue-600" />
                                                </a>
                                            )}
                                            {!application.linkedinUrl && !application.githubUrl && !application.portfolioUrl && !application.twitterUrl && (
                                                <p className="text-center text-gray-500 py-8">No social profiles provided</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Quick Info */}
                    <div className="space-y-6">
                        {/* Status & Contact Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            {/* Status */}
                            <div className="mb-6">
                                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Status</p>
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-semibold text-sm w-full justify-center ${getStatusColor(application.status)}`}>
                                    {getStatusIcon(application.status)}
                                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-200 my-6"></div>

                            {/* Position */}
                            <div className="mb-5">
                                <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Position</p>
                                <p className="text-sm font-bold text-gray-900 leading-snug">{application.jobTitle}</p>
                            </div>

                            {/* Email */}
                            <div className="mb-5">
                                <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Email</p>
                                <a href={`mailto:${application.emailAddress}`} className="text-sm text-[#004fa2] hover:underline break-all font-medium">
                                    {application.emailAddress}
                                </a>
                            </div>

                            {/* Phone */}
                            <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Phone</p>
                                <a href={`tel:${application.phoneNumber}`} className="text-sm font-bold text-gray-900">
                                    {application.phoneNumber}
                                </a>
                            </div>
                        </div>

                        {/* Quick Facts Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <p className="text-xs text-gray-500 font-semibold uppercase mb-4">Quick Facts</p>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Applied</p>
                                    <p className="text-sm font-semibold text-gray-900">{formatDate(application.appliedDate)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Experience</p>
                                    <p className="text-sm font-semibold text-gray-900">{application.workExperience} months</p>
                                </div>
                                {application.currentLocation && (
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Location</p>
                                        <p className="text-sm font-semibold text-gray-900">{application.currentLocation}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">ID</p>
                                    <p className="text-xs font-mono text-gray-700 break-all">{application.id}</p>
                                </div>
                            </div>
                        </div>

                        {/* Compliance Card */}
                        <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                            <h3 className="text-xs font-bold text-green-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                                <CheckCircle size={16} />
                                Compliance
                            </h3>
                            <div className="space-y-2 text-xs">
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0 mt-1.5"></div>
                                    <span className="text-green-900">Information certified</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0 mt-1.5"></div>
                                    <span className="text-green-900">Privacy agreement signed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Document Preview Modal */}
                {previewOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900">{previewTitle}</h2>
                                <button
                                    onClick={handleClosePreview}
                                    className="text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    <XCircle size={24} />
                                </button>
                            </div>

                            {/* Modal Content - PDF Viewer */}
                            <div className="flex-1 overflow-auto bg-gray-50">
                                {previewUrl && (
                                    <iframe
                                        src={`${previewUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                                        title={previewTitle}
                                        className="w-full h-full border-none"
                                        style={{ minHeight: '500px' }}
                                    />
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center gap-3 p-6 border-t border-gray-200 bg-gray-50">
                                <button
                                    onClick={handleClosePreview}
                                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                                >
                                    Close
                                </button>
                                <a
                                    href={previewUrl}
                                    download
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-semibold"
                                >
                                    <Download size={18} />
                                    Download
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default JobApplicationDetailsPage;
