/**
 * Training Courses Management Page (Super Admin)
 * Professional admin interface for managing training courses
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import { trainingCourses as initialMockCourses } from '../../../data/trainingCourses';
import {
    GraduationCap,
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Clock,
    Users,
    DollarSign,
    Star,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    X,
    BookOpen,
    Target,
    TrendingUp,
    Calendar,
    Award,
    ExternalLink,
    CheckCircle,
    XCircle,
    AlertCircle,
    FileText,
    Download,
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Globe
} from 'lucide-react';

// Category colors and labels
const CATEGORY_CONFIG = {
    basic: { label: 'Basic', color: 'bg-green-100 text-green-700 border-green-200' },
    intermediate: { label: 'Intermediate', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    advanced: { label: 'Advanced', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    matured: { label: 'Matured', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    internship: { label: 'Internship', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' }
};

// Status badge component
const CourseBadge = ({ type, children }) => {
    const badgeStyles = {
        Popular: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
        Bestseller: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
        Premium: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white',
        Advanced: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
        Creative: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
        default: 'bg-gray-100 text-gray-700'
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${badgeStyles[type] || badgeStyles.default}`}>
            {children}
        </span>
    );
};

// Mock Applications Data (TODO: Replace with API calls)
const MOCK_APPLICATIONS = [
    {
        id: 'APP001',
        courseId: 1,
        courseTitle: 'Full Stack Web Development',
        applicantName: 'Kwame Mensah',
        email: 'kwame.mensah@email.com',
        phone: '+233 24 123 4567',
        country: 'Ghana',
        location: 'Accra',
        educationLevel: 'Undergraduate',
        preferredCohort: 'April to July',
        learningMode: 'Hybrid',
        status: 'pending',
        appliedDate: '2026-02-05',
        cvFileName: 'Kwame_Mensah_CV.pdf',
        motivationStatement: 'I am passionate about web development and have been self-learning for 2 years. This program will help me transition into a full-time developer role.',
        linkedinUrl: 'https://linkedin.com/in/kwamemensah',
        websiteUrl: 'https://kwamemensah.dev'
    },
    {
        id: 'APP002',
        courseId: 2,
        courseTitle: 'Software Development Internship',
        applicantName: 'Ama Osei',
        email: 'ama.osei@email.com',
        phone: '+233 27 987 6543',
        country: 'Ghana',
        location: 'Kumasi',
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
        applicantName: 'Kofi Asante',
        email: 'kofi.asante@email.com',
        phone: '+233 20 555 8888',
        country: 'Ghana',
        location: 'Takoradi',
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
        applicantName: 'Abena Frimpong',
        email: 'abena.frimpong@email.com',
        phone: '+233 24 777 3333',
        country: 'Ghana',
        location: 'Koforidua',
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
        applicantName: 'Yaw Boateng',
        email: 'yaw.boateng@email.com',
        phone: '+233 55 444 2222',
        country: 'Ghana',
        location: 'Accra',
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
        applicantName: 'Efua Darko',
        email: 'efua.darko@email.com',
        phone: '+233 26 111 9999',
        country: 'Ghana',
        location: 'Tema',
        educationLevel: 'JHS / SHS',
        preferredCohort: 'January to April',
        learningMode: 'Onsite',
        status: 'pending',
        appliedDate: '2026-02-08',
        cvFileName: 'Efua_Darko_CV.pdf',
        motivationStatement: 'Teacher looking to transition into tech industry. Fascinated by technology and eager to learn coding from scratch.'
    }
];

const TrainingCoursesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuperAdmin } = usePermissions();

    // Tab state
    const [activeTab, setActiveTab] = useState('courses'); // 'courses' or 'applications'

    // Courses state
    const [courses, setCourses] = useState(initialMockCourses);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewingCourse, setViewingCourse] = useState(null);
    const [showDropdown, setShowDropdown] = useState(null);

    // Applications state
    const [applications, setApplications] = useState(MOCK_APPLICATIONS);
    const [applicationsSearch, setApplicationsSearch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [applicationsPage, setApplicationsPage] = useState(1);

    const itemsPerPage = 8;

    // Filter and search courses
    const filteredCourses = useMemo(() => {
        let result = [...courses];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(course =>
                course.title.toLowerCase().includes(query) ||
                course.description.toLowerCase().includes(query) ||
                course.instructor?.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(course => course.category === selectedCategory);
        }

        // Level filter
        if (selectedLevel !== 'all') {
            result = result.filter(course => course.level.toLowerCase().includes(selectedLevel.toLowerCase()));
        }

        return result;
    }, [searchQuery, selectedCategory, selectedLevel]);

    // Pagination
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const paginatedCourses = filteredCourses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    // Statistics
    const stats = useMemo(() => ({
        total: courses.length,
        basic: courses.filter(c => c.category === 'basic').length,
        intermediate: courses.filter(c => c.category === 'intermediate').length,
        advanced: courses.filter(c => c.category === 'advanced').length,
        matured: courses.filter(c => c.category === 'matured').length,
        internship: courses.filter(c => c.category === 'internship').length,
        avgRating: (courses.reduce((acc, c) => acc + c.rating, 0) / Math.max(1, courses.length)).toFixed(1),
        totalReviews: courses.reduce((acc, c) => acc + c.reviews, 0)
    }), [courses]);

    // Applications filtering and stats
    const filteredApplications = useMemo(() => {
        let result = [...applications];

        // Search filter
        if (applicationsSearch) {
            const query = applicationsSearch.toLowerCase();
            result = result.filter(app =>
                app.applicantName.toLowerCase().includes(query) ||
                app.email.toLowerCase().includes(query) ||
                app.courseTitle.toLowerCase().includes(query) ||
                app.id.toLowerCase().includes(query)
            );
        }

        // Status filter
        if (selectedStatus !== 'all') {
            result = result.filter(app => app.status === selectedStatus);
        }

        // Course filter
        if (selectedCourse !== 'all') {
            result = result.filter(app => app.courseId === parseInt(selectedCourse));
        }

        return result;
    }, [applicationsSearch, selectedStatus, selectedCourse]);

    const applicationsStats = useMemo(() => ({
        total: applications.length,
        pending: applications.filter(a => a.status === 'pending').length,
        approved: applications.filter(a => a.status === 'approved').length,
        rejected: applications.filter(a => a.status === 'rejected').length
    }), [applications]);

    // Applications pagination
    const totalApplicationsPages = Math.ceil(filteredApplications.length / itemsPerPage);
    const paginatedApplications = filteredApplications.slice(
        (applicationsPage - 1) * itemsPerPage,
        applicationsPage * itemsPerPage
    );

    // Unique levels for filter
    const uniqueLevels = useMemo(() => {
        const levels = new Set(courses.map(c => c.level));
        return Array.from(levels);
    }, []);

    // Handlers
    const handleDelete = (course) => {
        dispatch(openConfirmDialog({
            title: 'Delete Course',
            message: `Are you sure you want to delete "${course.title}"? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: () => {
                setCourses(prev => prev.filter(c => c.id !== course.id));
                dispatch(addNotification({
                    type: 'success',
                    message: `Course "${course.title}" deleted successfully`
                }));
            }
        }));
    };

    const handleView = (course) => {
        setViewingCourse(course);
    };

    const handleEdit = (course) => {
        navigate(`/admin/training/edit/${course.id}`);
    };

    const handleAddNew = () => {
        navigate('/admin/training/new');
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedLevel('all');
        setCurrentPage(1);
    };

    // Application handlers
    const handleViewApplication = (application) => {
        navigate(`/admin/training/applications/${application.id}`);
    };

    const handleApproveApplication = (application) => {
        dispatch(openConfirmDialog({
            title: 'Approve Application',
            message: `Approve ${application.applicantName}'s application for ${application.courseTitle}?`,
            onConfirm: () => {
                setApplications(prev => prev.map(app =>
                    app.id === application.id ? { ...app, status: 'approved' } : app
                ));
                dispatch(addNotification({
                    type: 'success',
                    message: `Application for ${application.applicantName} approved`
                }));
            }
        }));
    };

    const handleRejectApplication = (application) => {
        dispatch(openConfirmDialog({
            title: 'Reject Application',
            message: `Are you sure you want to reject ${application.applicantName}'s application?`,
            isDangerous: true,
            onConfirm: () => {
                setApplications(prev => prev.map(app =>
                    app.id === application.id ? { ...app, status: 'rejected' } : app
                ));
                dispatch(addNotification({
                    type: 'info',
                    message: `Application for ${application.applicantName} rejected`
                }));
            }
        }));
    };

    const handleDownloadCV = (application) => {
        dispatch(addNotification({
            type: 'info',
            message: `Downloading CV for ${application.applicantName}...`
        }));
        // Simulate download
        setTimeout(() => {
            const element = document.createElement("a");
            const file = new Blob(["Simulated CV content"], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = application.cvFileName;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
            dispatch(addNotification({
                type: 'success',
                message: 'Download started'
            }));
        }, 1000);
    };

    return (
        <AdminLayout>
            <div className="space-y-6 pb-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                <GraduationCap className="text-white" size={22} />
                            </div>
                            Training Courses
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Manage all training programs and courses
                        </p>
                    </div>
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d7a] hover:to-[#004fa2] transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                    >
                        <Plus size={20} strokeWidth={2.5} />
                        Add New Course
                    </button>
                </div>

                {/* Tab Switcher */}
                <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100 inline-flex gap-1">
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${activeTab === 'courses'
                            ? 'bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <BookOpen size={16} />
                        Courses
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === 'courses' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                            }`}>
                            {stats.total}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${activeTab === 'applications'
                            ? 'bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Users size={16} />
                        Applications
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === 'applications' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                            }`}>
                            {applicationsStats.total}
                        </span>
                        {applicationsStats.pending > 0 && (
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                        )}
                    </button>
                </div>

                {/* Statistics Cards - Conditionally Render Based on Active Tab */}
                {activeTab === 'courses' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                            onClick={() => { setSelectedCategory('all'); setCurrentPage(1); }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    <BookOpen className="text-blue-600" size={18} />
                                </div>
                                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">All</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            <p className="text-xs text-gray-500 mt-0.5">Total Courses</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                            onClick={() => { setSelectedCategory('basic'); setCurrentPage(1); }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                    <Target className="text-green-600" size={18} />
                                </div>
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Basic</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{stats.basic}</p>
                            <p className="text-xs text-gray-500 mt-0.5">Basic Programs</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                            onClick={() => { setSelectedCategory('intermediate'); setCurrentPage(1); }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    <TrendingUp className="text-blue-600" size={18} />
                                </div>
                                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Intermediate</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{stats.intermediate}</p>
                            <p className="text-xs text-gray-500 mt-0.5">Intermediate</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                            onClick={() => { setSelectedCategory('advanced'); setCurrentPage(1); }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                    <Award className="text-purple-600" size={18} />
                                </div>
                                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">Advanced</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{stats.advanced}</p>
                            <p className="text-xs text-gray-500 mt-0.5">Advanced</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                            onClick={() => { setSelectedCategory('internship'); setCurrentPage(1); }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="w-9 h-9 bg-cyan-50 rounded-lg flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                                    <Users className="text-cyan-600" size={18} />
                                </div>
                                <span className="text-xs font-medium text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">Internship</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{stats.internship}</p>
                            <p className="text-xs text-gray-500 mt-0.5">Internships</p>
                        </div>

                        <div className="bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="flex items-center justify-between mb-2">
                                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                                    <Star className="text-white" size={18} />
                                </div>
                                <span className="text-xs font-medium text-white/90 bg-white/20 px-2 py-0.5 rounded-full">Rating</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{stats.avgRating}</p>
                            <p className="text-xs text-blue-100 mt-0.5">{stats.totalReviews} Reviews</p>
                        </div>
                    </div>
                )}

                {/* Courses Tab Content */}
                {activeTab === 'courses' && (
                    <>
                        {/* Filters and Search */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex flex-col lg:flex-row gap-4">
                                {/* Search */}
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search courses by title, description, or instructor..."
                                        value={searchQuery}
                                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all"
                                    />
                                </div>

                                {/* Category Filter */}
                                <div className="flex items-center gap-2">
                                    <Filter className="text-gray-400" size={18} />
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                                        className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[140px]"
                                    >
                                        <option value="all">All Categories</option>
                                        {Object.entries(CATEGORY_CONFIG).map(([key, { label }]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Level Filter */}
                                <select
                                    value={selectedLevel}
                                    onChange={(e) => { setSelectedLevel(e.target.value); setCurrentPage(1); }}
                                    className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[140px]"
                                >
                                    <option value="all">All Levels</option>
                                    {uniqueLevels.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>

                                {/* Reset Filters */}
                                {(searchQuery || selectedCategory !== 'all' || selectedLevel !== 'all') && (
                                    <button
                                        onClick={resetFilters}
                                        className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <X size={16} />
                                        Reset
                                    </button>
                                )}
                            </div>

                            {/* Active filter badges */}
                            {(selectedCategory !== 'all' || selectedLevel !== 'all') && (
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                                    <span className="text-xs text-gray-500">Active filters:</span>
                                    {selectedCategory !== 'all' && (
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${CATEGORY_CONFIG[selectedCategory]?.color}`}>
                                            {CATEGORY_CONFIG[selectedCategory]?.label}
                                            <button onClick={() => setSelectedCategory('all')} className="ml-1.5 hover:opacity-70">×</button>
                                        </span>
                                    )}
                                    {selectedLevel !== 'all' && (
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-gray-100 text-gray-700 border-gray-200">
                                            {selectedLevel}
                                            <button onClick={() => setSelectedLevel('all')} className="ml-1.5 hover:opacity-70">×</button>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Course Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {paginatedCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                                >
                                    {/* Card Header with Category */}
                                    <div className="relative p-4 pb-2">
                                        <div className="flex items-start justify-between mb-3">
                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${CATEGORY_CONFIG[course.category]?.color}`}>
                                                {CATEGORY_CONFIG[course.category]?.label}
                                            </span>
                                            {course.badge && <CourseBadge type={course.badge}>{course.badge}</CourseBadge>}
                                        </div>

                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors line-clamp-2 min-h-[48px]">
                                            {course.title}
                                        </h3>

                                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                                            {course.description}
                                        </p>
                                    </div>

                                    {/* Course Meta */}
                                    <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                <Clock size={13} className="text-gray-400" />
                                                <span>{course.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                <Users size={13} className="text-gray-400" />
                                                <span>{course.participants}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                <Star size={13} className="text-amber-400 fill-amber-400" />
                                                <span className="font-semibold text-gray-900">{course.rating}</span>
                                                <span className="text-gray-400">({course.reviews})</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <DollarSign size={13} className="text-green-500" />
                                                <span className="font-bold text-gray-900">{course.price}</span>
                                            </div>
                                        </div>

                                        {/* Level and Format */}
                                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                                            <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                {course.level}
                                            </span>
                                            <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                {course.format}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleView(course)}
                                                className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(course)}
                                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Edit Course"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(course)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete Course"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <a
                                            href={`/training/course/${course.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-xs text-[#004fa2] hover:underline font-medium"
                                        >
                                            Preview
                                            <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredCourses.length === 0 && (
                            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <GraduationCap className="text-gray-400" size={28} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Try adjusting your search or filter criteria
                                </p>
                                <button
                                    onClick={resetFilters}
                                    className="px-4 py-2 text-sm text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors font-medium"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <p className="text-sm text-gray-500">
                                    Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                                    <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredCourses.length)}</span> of{' '}
                                    <span className="font-semibold text-gray-900">{filteredCourses.length}</span> courses
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-all ${currentPage === page
                                                    ? 'bg-[#004fa2] text-white shadow-md'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Applications Tab Content */}
                {activeTab === 'applications' && (
                    <>
                        {/* Applications Statistics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                                        <Users className="text-blue-600" size={18} />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{applicationsStats.total}</p>
                                <p className="text-xs text-gray-500 mt-0.5">Total Applications</p>
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center">
                                        <Clock className="text-orange-600" size={18} />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-orange-600">{applicationsStats.pending}</p>
                                <p className="text-xs text-gray-500 mt-0.5">Pending Review</p>
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                                        <CheckCircle className="text-green-600" size={18} />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-green-600">{applicationsStats.approved}</p>
                                <p className="text-xs text-gray-500 mt-0.5">Approved</p>
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
                                        <XCircle className="text-red-600" size={18} />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-red-600">{applicationsStats.rejected}</p>
                                <p className="text-xs text-gray-500 mt-0.5">Rejected</p>
                            </div>
                        </div>

                        {/* Applications Filters */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search by name, email, course, or ID..."
                                        value={applicationsSearch}
                                        onChange={(e) => { setApplicationsSearch(e.target.value); setApplicationsPage(1); }}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Filter className="text-gray-400" size={18} />
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => { setSelectedStatus(e.target.value); setApplicationsPage(1); }}
                                        className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[140px]"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>

                                <select
                                    value={selectedCourse}
                                    onChange={(e) => { setSelectedCourse(e.target.value); setApplicationsPage(1); }}
                                    className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[180px]"
                                >
                                    <option value="all">All Courses</option>
                                    {trainingCourses.map(course => (
                                        <option key={course.id} value={course.id}>{course.title}</option>
                                    ))}
                                </select>

                                {(applicationsSearch || selectedStatus !== 'all' || selectedCourse !== 'all') && (
                                    <button
                                        onClick={() => {
                                            setApplicationsSearch('');
                                            setSelectedStatus('all');
                                            setSelectedCourse('all');
                                        }}
                                        className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <X size={16} />
                                        Reset
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Applications Cards */}
                        <div className="space-y-4">
                            {paginatedApplications.map((app) => (
                                <div
                                    key={app.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
                                >
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-bold text-gray-900">{app.applicantName}</h3>
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${app.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                        app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                            'bg-orange-100 text-orange-700'
                                                        }`}>
                                                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 font-medium mb-1">{app.courseTitle}</p>
                                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={12} />
                                                        Applied: {new Date(app.appliedDate).toLocaleDateString()}
                                                    </span>
                                                    <span>ID: {app.id}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleViewApplication(app)}
                                                    className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                {app.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApproveApplication(app)}
                                                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                            title="Approve"
                                                        >
                                                            <CheckCircle size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleRejectApplication(app)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Reject"
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Mail size={14} className="text-gray-400" />
                                                <span className="truncate">{app.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Phone size={14} className="text-gray-400" />
                                                <span>{app.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <MapPin size={14} className="text-gray-400" />
                                                <span>{app.location}, {app.country}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Applications Empty State */}
                        {filteredApplications.length === 0 && (
                            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="text-gray-400" size={28} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
                                <p className="text-sm text-gray-500">
                                    Try adjusting your search or filter criteria
                                </p>
                            </div>
                        )}

                        {/* Applications Pagination */}
                        {totalApplicationsPages > 1 && (
                            <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <p className="text-sm text-gray-500">
                                    Showing <span className="font-semibold text-gray-900">{(applicationsPage - 1) * itemsPerPage + 1}</span> to{' '}
                                    <span className="font-semibold text-gray-900">{Math.min(applicationsPage * itemsPerPage, filteredApplications.length)}</span> of{' '}
                                    <span className="font-semibold text-gray-900">{filteredApplications.length}</span> applications
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setApplicationsPage(p => Math.max(1, p - 1))}
                                        disabled={applicationsPage === 1}
                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: totalApplicationsPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setApplicationsPage(page)}
                                                className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-all ${applicationsPage === page
                                                    ? 'bg-[#004fa2] text-white shadow-md'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setApplicationsPage(p => Math.min(totalApplicationsPages, p + 1))}
                                        disabled={applicationsPage === totalApplicationsPages}
                                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* View Course Modal */}
            {viewingCourse && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#004fa2] to-[#0066cc]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <GraduationCap className="text-white" size={22} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Course Details</h2>
                                    <p className="text-blue-100 text-xs">ID: {viewingCourse.id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingCourse(null)}
                                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                            <div className="space-y-5">
                                {/* Title and Badge */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${CATEGORY_CONFIG[viewingCourse.category]?.color}`}>
                                            {CATEGORY_CONFIG[viewingCourse.category]?.label}
                                        </span>
                                        {viewingCourse.badge && <CourseBadge type={viewingCourse.badge}>{viewingCourse.badge}</CourseBadge>}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{viewingCourse.title}</h3>
                                    <p className="text-sm text-gray-600 mt-2">{viewingCourse.longDescription || viewingCourse.description}</p>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                                        <Clock className="mx-auto text-gray-400 mb-1" size={18} />
                                        <p className="text-sm font-bold text-gray-900">{viewingCourse.duration}</p>
                                        <p className="text-xs text-gray-500">Duration</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                                        <Users className="mx-auto text-gray-400 mb-1" size={18} />
                                        <p className="text-sm font-bold text-gray-900">{viewingCourse.participants}</p>
                                        <p className="text-xs text-gray-500">Participants</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                                        <Star className="mx-auto text-amber-400 fill-amber-400 mb-1" size={18} />
                                        <p className="text-sm font-bold text-gray-900">{viewingCourse.rating}</p>
                                        <p className="text-xs text-gray-500">{viewingCourse.reviews} reviews</p>
                                    </div>
                                    <div className="bg-green-50 rounded-xl p-3 text-center">
                                        <DollarSign className="mx-auto text-green-500 mb-1" size={18} />
                                        <p className="text-sm font-bold text-green-700">{viewingCourse.price}</p>
                                        {viewingCourse.originalPrice && (
                                            <p className="text-xs text-gray-400 line-through">{viewingCourse.originalPrice}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Course Details */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 mb-1">Instructor</p>
                                            <p className="text-sm font-semibold text-gray-900">{viewingCourse.instructor}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 mb-1">Level</p>
                                            <p className="text-sm font-semibold text-gray-900">{viewingCourse.level}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 mb-1">Format</p>
                                            <p className="text-sm font-semibold text-gray-900">{viewingCourse.format}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 mb-1">Schedule</p>
                                            <p className="text-sm font-semibold text-gray-900">{viewingCourse.schedule}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 mb-1">Deadline</p>
                                            <p className="text-sm font-semibold text-gray-900">{viewingCourse.deadline}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 mb-1">Certificate</p>
                                            <p className="text-sm font-semibold text-gray-900">{viewingCourse.certificate}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Topics */}
                                {viewingCourse.topics && (
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 mb-2">Topics Covered</p>
                                        <div className="flex flex-wrap gap-2">
                                            {viewingCourse.topics.map((topic, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Programme Objectives */}
                                {viewingCourse.programmeObjectives && (
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 mb-2">Programme Objectives</p>
                                        <div className="space-y-2">
                                            {viewingCourse.programmeObjectives.map((obj, idx) => (
                                                <div key={idx} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                                                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={14} />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{obj.title}</p>
                                                        <p className="text-xs text-gray-500">{obj.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                            <button
                                onClick={() => setViewingCourse(null)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                            >
                                Close
                            </button>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        setViewingCourse(null);
                                        handleEdit(viewingCourse);
                                    }}
                                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <Edit size={14} />
                                    Edit
                                </button>
                                <a
                                    href={`/training/course/${viewingCourse.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <ExternalLink size={14} />
                                    View Public Page
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </AdminLayout>
    );
};

export default TrainingCoursesPage;
