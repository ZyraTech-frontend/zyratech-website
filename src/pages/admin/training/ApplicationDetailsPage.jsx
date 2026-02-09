import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
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
    Clock
} from 'lucide-react';

// Mock Applications Data (Should be shared or fetched via API)
// In a real app, this would be fetched by ID
const MOCK_APPLICATIONS = [
    {
        id: 'APP001',
        courseId: 1,
        courseTitle: 'Full Stack Web Development',
        fullName: 'Kwame Mensah',
        emailAddress: 'kwame.mensah@email.com',
        phoneNumber: '+233 24 123 4567',
        country: 'Ghana',
        currentLocation: 'Accra',
        educationLevel: 'Undergraduate',
        preferredCohort: 'April to July',
        learningMode: 'Hybrid',
        status: 'pending',
        appliedDate: '2026-02-05',
        cvFileName: 'Kwame_Mensah_CV.pdf',
        motivationStatement: 'I am passionate about web development and have been self-learning for 2 years. This program will help me transition into a full-time developer role.',
        message: 'I have a laptop but it is a bit old (i3 processor). Will that be enough?',
        linkedinUrl: 'https://linkedin.com/in/kwamemensah',
        websiteUrl: 'https://kwamemensah.dev'
    },
    {
        id: 'APP002',
        courseId: 2,
        courseTitle: 'Software Development Internship',
        fullName: 'Ama Osei',
        emailAddress: 'ama.osei@email.com',
        phoneNumber: '+233 27 987 6543',
        country: 'Ghana',
        currentLocation: 'Kumasi',
        educationLevel: 'Graduate',
        preferredCohort: 'January to April',
        learningMode: 'Onsite',
        status: 'approved',
        appliedDate: '2026-02-03',
        cvFileName: 'Ama_Osei_Resume.pdf',
        motivationStatement: 'Recent CS graduate eager to gain hands-on industry experience. I have strong foundation in Java and Python.',
        linkedinUrl: 'https://linkedin.com/in/amaosei'
    },
    {
        id: 'APP003',
        courseId: 3,
        courseTitle: 'AI & Machine Learning',
        fullName: 'Kofi Asante',
        emailAddress: 'kofi.asante@email.com',
        phoneNumber: '+233 20 555 8888',
        country: 'Ghana',
        currentLocation: 'Takoradi',
        educationLevel: 'Graduate',
        preferredCohort: 'July to October',
        learningMode: 'Online',
        status: 'pending',
        appliedDate: '2026-02-07',
        cvFileName: 'Kofi_Asante_CV.pdf',
        motivationStatement: 'Data scientist looking to expand skills in AI/ML. Have experience with TensorFlow and want to work on real-world projects.',
        linkedinUrl: 'https://linkedin.com/in/kofiasante',
        websiteUrl: 'https://github.com/kofiasante'
    },
    {
        id: 'APP004',
        courseId: 1,
        courseTitle: 'Full Stack Web Development',
        fullName: 'Abena Frimpong',
        emailAddress: 'abena.frimpong@email.com',
        phoneNumber: '+233 24 777 3333',
        country: 'Ghana',
        currentLocation: 'Koforidua',
        educationLevel: 'Diploma',
        preferredCohort: 'April to July',
        learningMode: 'Hybrid',
        status: 'rejected',
        appliedDate: '2026-02-01',
        cvFileName: 'Abena_Frimpong_CV.pdf',
        motivationStatement: 'Career changer from marketing to tech. Completed online HTML/CSS courses and ready for intensive training.',
        rejectionReason: 'Insufficient technical background for this advanced program'
    },
    {
        id: 'APP005',
        courseId: 4,
        courseTitle: 'DevOps Engineering',
        fullName: 'Yaw Boateng',
        emailAddress: 'yaw.boateng@email.com',
        phoneNumber: '+233 55 444 2222',
        country: 'Ghana',
        currentLocation: 'Accra',
        educationLevel: 'Undergraduate',
        preferredCohort: 'April to July',
        learningMode: 'Online',
        status: 'approved',
        appliedDate: '2026-02-06',
        cvFileName: 'Yaw_Boateng_Resume.pdf',
        motivationStatement: 'Systems administrator with 3 years experience. Want to learn modern DevOps practices, CI/CD, and cloud infrastructure.',
        linkedinUrl: 'https://linkedin.com/in/yawboateng'
    },
    {
        id: 'APP006',
        courseId: 5,
        courseTitle: 'Career Transition to Tech Program',
        fullName: 'Efua Darko',
        emailAddress: 'efua.darko@email.com',
        phoneNumber: '+233 26 111 9999',
        country: 'Ghana',
        currentLocation: 'Tema',
        educationLevel: 'JHS / SHS',
        preferredCohort: 'January to April',
        learningMode: 'Onsite',
        status: 'pending',
        appliedDate: '2026-02-08',
        cvFileName: 'Efua_Darko_CV.pdf',
        motivationStatement: 'Teacher looking to transition into tech industry. Fascinated by technology and eager to learn coding from scratch.',
        message: 'Do you offer flexible payment plans?'
    }
];

const ApplicationDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // In real app, fetch from API
    const application = MOCK_APPLICATIONS.find(app => app.id === id);

    if (!application) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Application Not Found</h2>
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
            message: `Approve ${application.fullName}'s application for ${application.courseTitle}?`,
            onConfirm: () => {
                console.log('Approved', application.id);
                // In real app, update state/API here
                navigate('/admin/training');
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
                // In real app, update state/API here
                navigate('/admin/training');
            }
        }));
    };

    const handleDownloadCV = () => {
        console.log('Downloading CV:', application.cvFileName);
    };

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto space-y-6 pb-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/admin/training')}
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
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                                        {application.fullName.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{application.fullName}</h2>
                                        <p className="text-sm text-gray-500">{application.educationLevel}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 mb-1">Applying for</p>
                                    <p className="text-sm font-bold text-[#004fa2]">{application.courseTitle}</p>
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
                                        <GraduationCap size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Education</p>
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

                        {/* Attachments Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Attachments</h3>
                            {application.cvFileName && (
                                <div className="border border-gray-200 rounded-xl p-4 hover:border-[#004fa2] transition-colors group cursor-pointer" onClick={handleDownloadCV}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
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
                            )}
                        </div>

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
