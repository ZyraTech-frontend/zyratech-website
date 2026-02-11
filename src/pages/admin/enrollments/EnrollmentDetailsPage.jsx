/**
 * Enrollment Details Page (Admin)
 * Dedicated page for viewing enrollment details
 * Fields match the public CourseApplicationForm
 */

import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { trainingCourses } from '../../../data/trainingCourses';
import {
    GraduationCap,
    ChevronLeft,
    Mail,
    Phone,
    MapPin,
    FileText,
    Download,
    Linkedin,
    Globe,
    ExternalLink,
    Calendar,
    Clock,
    CreditCard,
    Edit,
    User,
    BookOpen,
    TrendingUp,
    CheckCircle,
    XCircle,
    AlertCircle,
    Users,
    Settings
} from 'lucide-react';

// Status configuration
const STATUS_CONFIG = {
    pending: { label: 'Pending Review', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: AlertCircle },
    approved: { label: 'Approved', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
    in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: TrendingUp },
    completed: { label: 'Completed', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
    withdrawn: { label: 'Withdrawn', color: 'bg-gray-100 text-gray-600 border-gray-200', icon: XCircle }
};

const PAYMENT_CONFIG = {
    pending: { label: 'Pending', color: 'bg-amber-50 text-amber-600 border-amber-200' },
    paid: { label: 'Paid', color: 'bg-green-50 text-green-600 border-green-200' },
    partial: { label: 'Partial Payment', color: 'bg-blue-50 text-blue-600 border-blue-200' },
    refunded: { label: 'Refunded', color: 'bg-gray-50 text-gray-600 border-gray-200' },
    partial_refund: { label: 'Partial Refund', color: 'bg-orange-50 text-orange-600 border-orange-200' }
};

// Mock enrollments data (matches EnrollmentsManagementPage format/IDs)
const MOCK_ENROLLMENTS = [
    {
        id: 'ENR-2024-001',
        fullName: 'Kwame Asante',
        email: 'kwame.asante@example.com',
        phone: '+233 24 123 4567',
        country: 'Ghana',
        currentLocation: 'Accra',
        educationLevel: 'Undergraduate',
        preferredCohort: 'January to April',
        learningMode: 'Hybrid',
        courseId: 1,
        courseTitle: 'DevOps Engineering',
        courseCategory: 'intermediate',
        courseDuration: '8 weeks',
        coursePrice: 'GHS 3,500',
        status: 'approved',
        paymentStatus: 'paid',
        progress: 65,
        enrolledDate: '2024-12-15',
        startDate: '2024-01-15',
        motivationStatement: 'Passionate about cloud infrastructure and automation. Looking to advance my career in DevOps.',
        linkedinUrl: 'https://linkedin.com/in/kwameasante',
        notes: 'Strong technical background'
    },
    {
        id: 'ENR-2024-002',
        fullName: 'Ama Mensah',
        email: 'ama.mensah@example.com',
        phone: '+233 20 987 6543',
        country: 'Ghana',
        currentLocation: 'Kumasi',
        educationLevel: 'Graduate',
        preferredCohort: 'January to April',
        learningMode: 'Onsite',
        courseId: 3,
        courseTitle: 'Full Stack Web Development',
        courseCategory: 'basic',
        courseDuration: '16 weeks',
        coursePrice: 'GHS 3,800',
        status: 'in_progress',
        paymentStatus: 'paid',
        progress: 42,
        enrolledDate: '2024-12-10',
        startDate: '2024-01-08',
        notes: 'Motivated self-learner'
    },
    {
        id: 'ENR-2024-003',
        fullName: 'Kofi Boateng',
        email: 'kofi.b@example.com',
        phone: '+233 26 555 1234',
        country: 'Ghana',
        currentLocation: 'Takoradi',
        educationLevel: 'Graduate',
        preferredCohort: 'April to July',
        learningMode: 'Online',
        courseId: 5,
        courseTitle: 'Data Science & Analytics',
        courseCategory: 'intermediate',
        courseDuration: '10 weeks',
        coursePrice: 'GHS 4,000',
        status: 'pending',
        paymentStatus: 'pending',
        progress: 0,
        enrolledDate: '2024-12-18',
        startDate: null,
        motivationStatement: 'Background in statistics, want to transition to data science role.',
        linkedinUrl: 'https://linkedin.com/in/kofiboateng',
        notes: 'Background in statistics'
    },
    {
        id: 'ENR-2024-004',
        fullName: 'Fatima Ibrahim',
        email: 'fatima.i@example.com',
        phone: '+233 27 888 9999',
        country: 'Ghana',
        currentLocation: 'Tema',
        educationLevel: 'Graduate',
        preferredCohort: 'January to April',
        learningMode: 'Hybrid',
        courseId: 7,
        courseTitle: 'AI & Machine Learning',
        courseCategory: 'advanced',
        courseDuration: '12 weeks',
        coursePrice: 'GHS 5,500',
        status: 'approved',
        paymentStatus: 'paid',
        progress: 0,
        enrolledDate: '2024-12-12',
        startDate: '2024-01-20',
        motivationStatement: 'Experienced Python developer looking to specialize in AI/ML.',
        linkedinUrl: 'https://linkedin.com/in/fatimaibrahim',
        cvFileName: 'Fatima_Ibrahim_CV.pdf',
        notes: 'Python experience required - verified'
    },
    {
        id: 'ENR-2024-005',
        fullName: 'Emmanuel Osei',
        email: 'emmanuel.o@example.com',
        phone: '+233 23 111 2222',
        country: 'Ghana',
        currentLocation: 'Accra',
        educationLevel: 'Undergraduate',
        preferredCohort: 'July to October',
        learningMode: 'Onsite',
        courseId: 11,
        courseTitle: 'Software Development Internship',
        courseCategory: 'internship',
        courseDuration: '3 months',
        coursePrice: 'GHS 3,200',
        status: 'completed',
        paymentStatus: 'paid',
        progress: 100,
        enrolledDate: '2024-08-01',
        startDate: '2024-08-15',
        motivationStatement: 'CS student seeking practical experience in software development.',
        linkedinUrl: 'https://linkedin.com/in/emmanuelosei',
        cvFileName: 'Emmanuel_Osei_Resume.pdf',
        notes: 'Excellent performance, hired by partner company'
    },
    {
        id: 'ENR-2024-006',
        fullName: 'Grace Addo',
        email: 'grace.addo@example.com',
        phone: '+233 55 333 4444',
        country: 'Ghana',
        currentLocation: 'Cape Coast',
        educationLevel: 'Graduate',
        preferredCohort: 'October to January',
        learningMode: 'Hybrid',
        courseId: 10,
        courseTitle: 'Career Transition to Tech Program',
        courseCategory: 'matured',
        courseDuration: '12 weeks',
        coursePrice: 'GHS 4,500',
        status: 'in_progress',
        paymentStatus: 'paid',
        progress: 35,
        enrolledDate: '2024-11-20',
        startDate: '2024-12-01',
        motivationStatement: 'Transitioning from accounting to tech. Excited about new career opportunities.',
        linkedinUrl: 'https://linkedin.com/in/graceaddo',
        cvFileName: 'Grace_Addo_CV.pdf',
        notes: 'Previous career in accounting'
    },
    {
        id: 'ENR-2024-007',
        fullName: 'Daniel Mensah',
        email: 'daniel.m@example.com',
        phone: '+233 50 666 7777',
        country: 'Ghana',
        currentLocation: 'Accra',
        educationLevel: 'Diploma',
        preferredCohort: 'January to April',
        learningMode: 'Online',
        courseId: 2,
        courseTitle: 'Cloud Computing (AWS/Azure)',
        courseCategory: 'basic',
        courseDuration: '12 weeks',
        coursePrice: 'GHS 4,200',
        status: 'rejected',
        paymentStatus: 'refunded',
        progress: 0,
        enrolledDate: '2024-12-05',
        startDate: null,
        notes: 'Prerequisites not met'
    },
    {
        id: 'ENR-2024-008',
        fullName: 'Abena Osei',
        email: 'abena.o@example.com',
        phone: '+233 24 444 5555',
        country: 'Ghana',
        currentLocation: 'Kumasi',
        educationLevel: 'Graduate',
        preferredCohort: 'April to July',
        learningMode: 'Hybrid',
        courseId: 6,
        courseTitle: 'Cloud Architecture',
        courseCategory: 'advanced',
        courseDuration: '8 weeks',
        coursePrice: 'GHS 4,200',
        status: 'pending',
        paymentStatus: 'pending',
        progress: 0,
        enrolledDate: '2024-12-19',
        startDate: null,
        motivationStatement: 'Want to design scalable cloud solutions for enterprise clients.',
        linkedinUrl: 'https://linkedin.com/in/abenaosei',
        cvFileName: 'Abena_Osei_CV.pdf',
        notes: 'Awaiting interview'
    },
    {
        id: 'ENR-2024-009',
        fullName: 'Samuel Adjei',
        email: 'samuel.a@example.com',
        phone: '+233 26 999 0000',
        country: 'Ghana',
        currentLocation: 'Ho',
        educationLevel: 'Undergraduate',
        preferredCohort: 'October to January',
        learningMode: 'Onsite',
        courseId: 13,
        courseTitle: 'Digital Marketing Internship',
        courseCategory: 'internship',
        courseDuration: '2 months',
        coursePrice: 'GHS 2,200',
        status: 'withdrawn',
        paymentStatus: 'partial_refund',
        progress: 15,
        enrolledDate: '2024-11-15',
        startDate: '2024-12-01',
        notes: 'Personal reasons'
    },
    {
        id: 'ENR-2024-010',
        fullName: 'Linda Amponsah',
        email: 'linda.amp@example.com',
        phone: '+233 20 777 8888',
        country: 'Ghana',
        currentLocation: 'Accra',
        educationLevel: 'Graduate',
        preferredCohort: 'October to January',
        learningMode: 'Hybrid',
        courseId: 8,
        courseTitle: 'IT Fundamentals for Professionals',
        courseCategory: 'matured',
        courseDuration: '6 weeks',
        coursePrice: 'GHS 2,800',
        status: 'in_progress',
        paymentStatus: 'paid',
        progress: 58,
        enrolledDate: '2024-12-01',
        startDate: '2024-12-10',
        motivationStatement: 'Manager looking to understand IT to lead technology teams effectively.',
        linkedinUrl: 'https://linkedin.com/in/lindaamponsah',
        cvFileName: 'Linda_Amponsah_CV.pdf',
        notes: 'Corporate sponsor'
    }
];

// Progress bar component
const ProgressBar = ({ progress }) => (
    <div className="w-full">
        <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Course Progress</span>
            <span className="text-sm font-bold text-gray-900">{progress}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
                className={`h-full rounded-full transition-all duration-500 ${
                    progress === 100 ? 'bg-emerald-500' :
                    progress >= 50 ? 'bg-blue-500' :
                    progress > 0 ? 'bg-amber-500' :
                    'bg-gray-300'
                }`}
                style={{ width: `${progress}%` }}
            />
        </div>
    </div>
);

const EnrollmentDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // In real app, fetch from API
    const enrollment = MOCK_ENROLLMENTS.find(e => e.id === id);

    if (!enrollment) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <GraduationCap size={48} className="text-gray-300 mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Enrollment Not Found</h2>
                    <p className="text-gray-500 mb-4">The enrollment you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={() => navigate('/admin/enrollments')}
                        className="text-[#004fa2] hover:underline font-medium"
                    >
                        Return to Enrollments
                    </button>
                </div>
            </AdminLayout>
        );
    }

    const statusConfig = STATUS_CONFIG[enrollment.status] || STATUS_CONFIG.pending;
    const paymentConfig = PAYMENT_CONFIG[enrollment.paymentStatus] || PAYMENT_CONFIG.pending;
    const StatusIcon = statusConfig.icon;

    // Check if course requires extra fields (advanced, internship, matured)
    const requiresExtraFields = ['advanced', 'internship', 'matured'].includes(enrollment.courseCategory);

    const handleDownloadCV = () => {
        console.log('Downloading CV:', enrollment.cvFileName);
        // In real app, trigger file download
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto space-y-6 pb-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/admin/enrollments')}
                            className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Enrollment Details</h1>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <span>ID: {enrollment.id}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    Enrolled {formatDate(enrollment.enrolledDate)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <Link
                        to={`/admin/enrollments/edit/${enrollment.id}`}
                        className="px-4 py-2.5 bg-[#004fa2] text-white rounded-xl hover:bg-[#003d7a] transition-colors font-medium flex items-center gap-2 shadow-sm self-start sm:self-auto"
                    >
                        <Edit size={18} />
                        Edit Enrollment
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Student Profile Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                                        {enrollment.fullName.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{enrollment.fullName}</h2>
                                        <p className="text-sm text-gray-500">{enrollment.educationLevel}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 mb-1">Course</p>
                                    <p className="text-sm font-bold text-[#004fa2]">{enrollment.courseTitle}</p>
                                </div>
                            </div>

                            {/* Status Badges */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border ${statusConfig.color}`}>
                                    <StatusIcon size={16} />
                                    {statusConfig.label}
                                </span>
                                <span className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 border ${paymentConfig.color}`}>
                                    <CreditCard size={16} />
                                    {paymentConfig.label}
                                </span>
                            </div>

                            {/* Contact Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Email Address</p>
                                        <p className="text-sm font-semibold text-gray-900">{enrollment.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Phone Number</p>
                                        <p className="text-sm font-semibold text-gray-900">{enrollment.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Location</p>
                                        <p className="text-sm font-semibold text-gray-900">{enrollment.currentLocation}, {enrollment.country}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 shadow-sm">
                                        <GraduationCap size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Education</p>
                                        <p className="text-sm font-semibold text-gray-900">{enrollment.educationLevel}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <TrendingUp size={20} className="text-[#004fa2]" />
                                Course Progress
                            </h3>
                            <ProgressBar progress={enrollment.progress} />
                        </div>

                        {/* Motivation Statement (for advanced courses) */}
                        {requiresExtraFields && enrollment.motivationStatement && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText size={20} className="text-[#004fa2]" />
                                    Motivation Statement
                                </h3>
                                <div className="prose prose-sm max-w-none text-gray-600 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    {enrollment.motivationStatement}
                                </div>
                            </div>
                        )}

                        {/* Admin Notes */}
                        {enrollment.notes && (
                            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                                <h3 className="text-lg font-bold text-amber-800 mb-2 flex items-center gap-2">
                                    <FileText size={18} />
                                    Admin Notes
                                </h3>
                                <p className="text-amber-700">{enrollment.notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Course Details Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <BookOpen size={18} className="text-[#004fa2]" />
                                Course Details
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Course Title</p>
                                    <p className="font-semibold text-gray-900">{enrollment.courseTitle}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Duration</p>
                                        <p className="font-semibold text-gray-900">{enrollment.courseDuration}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Price</p>
                                        <p className="font-semibold text-gray-900">{enrollment.coursePrice}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Category</p>
                                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium capitalize border border-blue-100">
                                        {enrollment.courseCategory}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Preferences Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Settings size={18} className="text-[#004fa2]" />
                                Preferences
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Preferred Cohort</p>
                                    <div className="flex items-center gap-2 font-medium text-gray-900 bg-blue-50 p-3 rounded-lg border border-blue-100">
                                        <Calendar size={16} className="text-[#004fa2]" />
                                        {enrollment.preferredCohort}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Learning Mode</p>
                                    <div className="flex items-center gap-2 font-medium text-gray-900 bg-purple-50 p-3 rounded-lg border border-purple-100">
                                        <Users size={16} className="text-purple-600" />
                                        {enrollment.learningMode}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Important Dates Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Calendar size={18} className="text-[#004fa2]" />
                                Important Dates
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Enrolled Date</p>
                                    <p className="font-semibold text-gray-900">{formatDate(enrollment.enrolledDate)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Start Date</p>
                                    <p className="font-semibold text-gray-900">{formatDate(enrollment.startDate)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Attachments Card (for advanced courses) */}
                        {requiresExtraFields && enrollment.cvFileName && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Attachments</h3>
                                <div
                                    className="border border-gray-200 rounded-xl p-4 hover:border-[#004fa2] transition-colors group cursor-pointer"
                                    onClick={handleDownloadCV}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
                                            <FileText size={20} />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#004fa2] transition-colors">
                                                {enrollment.cvFileName}
                                            </p>
                                            <p className="text-xs text-gray-500">PDF Document</p>
                                        </div>
                                        <Download size={18} className="text-gray-400 group-hover:text-[#004fa2]" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Professional Links (for advanced courses) */}
                        {requiresExtraFields && (enrollment.linkedinUrl || enrollment.websiteUrl) && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Professional Links</h3>
                                <div className="space-y-3">
                                    {enrollment.linkedinUrl && (
                                        <a
                                            href={enrollment.linkedinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#0077b5] hover:bg-[#0077b5]/5 transition-all text-gray-700 hover:text-[#0077b5]"
                                        >
                                            <Linkedin size={20} />
                                            <span className="font-medium text-sm">LinkedIn Profile</span>
                                            <ExternalLink size={14} className="ml-auto" />
                                        </a>
                                    )}
                                    {enrollment.websiteUrl && (
                                        <a
                                            href={enrollment.websiteUrl}
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

export default EnrollmentDetailsPage;
