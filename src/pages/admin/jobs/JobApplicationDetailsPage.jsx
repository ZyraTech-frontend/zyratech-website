import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
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
    ExternalLink,
    XCircle,
    CheckCircle,
    Calendar,
    Clock,
    AlertCircle
} from 'lucide-react';

// Mock Applications Data
const MOCK_JOB_APPLICATIONS = [
    {
        id: '1',
        jobId: 1,
        jobTitle: 'ZyraTech Internship Program',
        fullName: 'Kwame Asante',
        emailAddress: 'kwame@email.com',
        phoneNumber: '+233 24 123 4567',
        country: 'Ghana',
        currentLocation: 'Accra',
        educationLevel: 'Undergraduate',
        status: 'pending',
        appliedDate: '2026-02-05',
        cvFileName: 'Kwame_Asante_CV.pdf',
        motivationStatement: 'I am passionate about technology and innovation. This internship program aligns perfectly with my career goals in tech.',
        relevantExperience: '2 years of self-learning in web development, completed 3 online projects',
        linkedinUrl: 'https://linkedin.com/in/kwameasante',
        portfolioUrl: 'https://kwameasante.dev',
        availableStartDate: '2026-03-01'
    },
    {
        id: '2',
        jobId: 2,
        jobTitle: 'National Service at ZyraTech',
        fullName: 'Ama Serwaa',
        emailAddress: 'ama@email.com',
        phoneNumber: '+233 20 234 5678',
        country: 'Ghana',
        currentLocation: 'Kumasi',
        educationLevel: 'Graduate',
        status: 'reviewed',
        appliedDate: '2026-02-03',
        cvFileName: 'Ama_Serwaa_Resume.pdf',
        motivationStatement: 'Recent computer science graduate eager to contribute to meaningful tech projects while serving the community.',
        relevantExperience: 'Recent CS graduate, Java, Python, web development background',
        linkedinUrl: 'https://linkedin.com/in/amaserwaa',
        githubUrl: 'https://github.com/amaserwaa'
    },
    {
        id: '3',
        jobId: 3,
        jobTitle: 'Software Engineer',
        fullName: 'Kofi Mensah',
        emailAddress: 'kofi@email.com',
        phoneNumber: '+233 27 345 6789',
        country: 'Ghana',
        currentLocation: 'Takoradi',
        educationLevel: 'Bachelor\'s Degree',
        status: 'interviewed',
        appliedDate: '2026-02-07',
        cvFileName: 'Kofi_Mensah_CV.pdf',
        motivationStatement: 'Software engineer with 3 years of experience in full-stack development. Excited about ZyraTech\'s mission in education and community impact.',
        relevantExperience: '3 years full-stack development, React, Node.js, AWS, Docker, Kubernetes',
        linkedinUrl: 'https://linkedin.com/in/kofimensah',
        portfolioUrl: 'https://kofimensah.dev',
        githubUrl: 'https://github.com/kofimensah'
    },
    {
        id: '4',
        jobId: 1,
        jobTitle: 'ZyraTech Internship Program',
        fullName: 'Akua Frimpong',
        emailAddress: 'akua@email.com',
        phoneNumber: '+233 24 456 7890',
        country: 'Ghana',
        currentLocation: 'Koforidua',
        educationLevel: 'Diploma',
        status: 'rejected',
        appliedDate: '2026-02-01',
        cvFileName: 'Akua_Frimpong_CV.pdf',
        motivationStatement: 'Career changer from marketing to tech. Completed online coding bootcamp and ready to apply skills.',
        relevantExperience: 'Bootcamp graduate, HTML, CSS, JavaScript basics',
        rejectionReason: 'Does not meet the minimum experience requirement for this position'
    },
    {
        id: '5',
        jobId: 2,
        jobTitle: 'National Service at ZyraTech',
        fullName: 'Yaw Boateng',
        emailAddress: 'yaw@email.com',
        phoneNumber: '+233 55 567 8901',
        country: 'Ghana',
        currentLocation: 'Accra',
        educationLevel: 'Undergraduate',
        status: 'pending',
        appliedDate: '2026-02-08',
        cvFileName: 'Yaw_Boateng_CV.pdf',
        motivationStatement: 'Computer science student passionate about solving real-world problems with technology.',
        relevantExperience: 'Currently studying CS, worked on 2 personal projects, basic Python and JavaScript',
        linkedinUrl: 'https://linkedin.com/in/yawboateng',
        githubUrl: 'https://github.com/yawboateng'
    }
];

const JobApplicationDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // In real app, fetch from API
    const application = MOCK_JOB_APPLICATIONS.find(app => app.id === id);

    if (!application) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <AlertCircle size={48} className="text-red-500 mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Application Not Found</h2>
                    <button
                        onClick={() => navigate('/admin/jobs')}
                        className="text-[#004fa2] hover:underline font-medium"
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
            message: `Approve ${application.fullName}'s application for ${application.jobTitle}?`,
            onConfirm: () => {
                console.log('Approved', application.id);
                navigate('/admin/jobs');
            }
        }));
    };

    const handleReject = () => {
        dispatch(openConfirmDialog({
            title: 'Reject Application',
            message: `Are you sure you want to reject ${application.fullName}'s application?`,
            isDangerous: true,
            onConfirm: () => {
                console.log('Rejected', application.id);
                navigate('/admin/jobs');
            }
        }));
    };

    const handleDownloadCV = () => {
        console.log('Downloading CV:', application.cvFileName);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-700 border border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-700 border border-red-200';
            case 'interviewed':
                return 'bg-purple-100 text-purple-700 border border-purple-200';
            case 'reviewed':
                return 'bg-blue-100 text-blue-700 border border-blue-200';
            default:
                return 'bg-amber-100 text-amber-700 border border-amber-200';
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto space-y-6 pb-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/admin/jobs')}
                            className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
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
                                    Approve
                                </button>
                            </>
                        )}
                        {application.status !== 'pending' && (
                            <span className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${getStatusColor(application.status)}`}>
                                {application.status === 'approved' ? <CheckCircle size={18} /> : <XCircle size={18} />}
                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
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
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                                        {application.fullName.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{application.fullName}</h2>
                                        <p className="text-sm text-gray-500">{application.educationLevel}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 mb-1">Applying for</p>
                                    <p className="text-sm font-bold text-[#004fa2]">{application.jobTitle}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Email Address</p>
                                        <p className="text-sm font-semibold text-gray-900">{application.emailAddress}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Phone Number</p>
                                        <p className="text-sm font-semibold text-gray-900">{application.phoneNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Location</p>
                                        <p className="text-sm font-semibold text-gray-900">{application.currentLocation}, {application.country}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
                                        <Briefcase size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Education Level</p>
                                        <p className="text-sm font-semibold text-gray-900">{application.educationLevel}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Motivation Statement */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FileText size={20} className="text-[#004fa2]" />
                                Motivation Statement
                            </h3>
                            <div className="prose prose-sm max-w-none text-gray-600 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                {application.motivationStatement}
                            </div>
                        </div>

                        {/* Relevant Experience */}
                        {application.relevantExperience && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Briefcase size={20} className="text-[#004fa2]" />
                                    Relevant Experience
                                </h3>
                                <div className="text-gray-600 bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                                    {application.relevantExperience}
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
                        {/* Application Status Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Application Status</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-2">Current Status</p>
                                    <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold ${getStatusColor(application.status)}`}>
                                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                    </span>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-xs text-gray-500 mb-2">Applied Date</p>
                                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                        <Calendar size={16} className="text-gray-400" />
                                        {new Date(application.appliedDate).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Available Start Date */}
                        {application.availableStartDate && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Availability</h3>
                                <p className="text-xs text-gray-500 mb-2">Can Start</p>
                                <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                    <Clock size={16} className="text-gray-400" />
                                    {new Date(application.availableStartDate).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        )}

                        {/* CV & Documents */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Documents</h3>
                            <button
                                onClick={handleDownloadCV}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#004fa2] text-white rounded-xl hover:bg-[#003d7a] transition-colors font-medium"
                            >
                                <Download size={18} />
                                Download CV
                            </button>
                            <p className="text-xs text-gray-500 mt-2 text-center">{application.cvFileName}</p>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Social Profiles</h3>
                            <div className="space-y-3">
                                {application.linkedinUrl && (
                                    <a
                                        href={application.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors group"
                                    >
                                        <Linkedin size={20} className="text-gray-400 group-hover:text-blue-600" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500">LinkedIn</p>
                                            <p className="text-sm font-medium text-gray-900 truncate">View Profile</p>
                                        </div>
                                        <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                                    </a>
                                )}
                                {application.portfolioUrl && (
                                    <a
                                        href={application.portfolioUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors group"
                                    >
                                        <Briefcase size={20} className="text-gray-400 group-hover:text-blue-600" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500">Portfolio</p>
                                            <p className="text-sm font-medium text-gray-900 truncate">View Portfolio</p>
                                        </div>
                                        <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                                    </a>
                                )}
                                {application.githubUrl && (
                                    <a
                                        href={application.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-900/5 rounded-xl transition-colors group"
                                    >
                                        <Github size={20} className="text-gray-400 group-hover:text-gray-900" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-500">GitHub</p>
                                            <p className="text-sm font-medium text-gray-900 truncate">View Repos</p>
                                        </div>
                                        <ExternalLink size={16} className="text-gray-400 group-hover:text-gray-900 flex-shrink-0" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default JobApplicationDetailsPage;
