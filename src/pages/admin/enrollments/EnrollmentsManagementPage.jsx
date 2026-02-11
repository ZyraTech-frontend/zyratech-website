/**
 * Enrollments Management Page (Admin)
 * Professional admin interface for managing course enrollments
 */

import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import {
    GraduationCap,
    Search,
    Filter,
    Eye,
    Edit,
    Trash2,
    Download,
    ChevronLeft,
    ChevronRight,
    X,
    CheckCircle,
    XCircle,
    Clock,
    User,
    BookOpen,
    Mail,
    Phone,
    Plus,
    UserCheck,
    UserX,
    Users,
    TrendingUp,
    Award,
    RefreshCcw,
    Check,
    MessageSquare
} from 'lucide-react';

// Enrollment status configuration
const STATUS_CONFIG = {
    'approved': {
        label: 'Approved',
        color: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
        icon: CheckCircle,
        dotColor: 'bg-green-500'
    },
    'pending': {
        label: 'Pending Review',
        color: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
        icon: Clock,
        dotColor: 'bg-amber-500'
    },
    'in_progress': {
        label: 'In Progress',
        color: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
        icon: RefreshCcw,
        dotColor: 'bg-blue-500'
    },
    'completed': {
        label: 'Completed',
        color: 'bg-gradient-to-r from-purple-500 to-violet-500 text-white',
        icon: Award,
        dotColor: 'bg-purple-500'
    },
    'rejected': {
        label: 'Rejected',
        color: 'bg-gradient-to-r from-red-500 to-rose-500 text-white',
        icon: XCircle,
        dotColor: 'bg-red-500'
    },
    'withdrawn': {
        label: 'Withdrawn',
        color: 'bg-gray-100 text-gray-600 border border-gray-200',
        icon: UserX,
        dotColor: 'bg-gray-400'
    }
};

// Course categories
const COURSE_CATEGORIES = {
    'basic': { label: 'Basic', color: 'bg-blue-100 text-blue-700' },
    'intermediate': { label: 'Intermediate', color: 'bg-amber-100 text-amber-700' },
    'advanced': { label: 'Advanced', color: 'bg-purple-100 text-purple-700' },
    'internship': { label: 'Internship', color: 'bg-green-100 text-green-700' },
    'matured': { label: 'Career Transition', color: 'bg-cyan-100 text-cyan-700' }
};

// Mock enrollments data
const mockEnrollments = [
    {
        id: 'ENR-2024-001',
        student: {
            name: 'Kwame Asante',
            email: 'kwame.asante@example.com',
            phone: '+233 24 123 4567',
            avatar: null,
            city: 'Accra'
        },
        course: {
            id: 1,
            title: 'DevOps Engineering',
            category: 'intermediate',
            duration: '8 weeks',
            price: 'GHS 3,500'
        },
        status: 'approved',
        enrolledDate: '2024-12-15T10:30:00Z',
        startDate: '2024-01-15',
        progress: 65,
        paymentStatus: 'paid',
        notes: 'Strong technical background'
    },
    {
        id: 'ENR-2024-002',
        student: {
            name: 'Ama Mensah',
            email: 'ama.mensah@example.com',
            phone: '+233 20 987 6543',
            avatar: null,
            city: 'Kumasi'
        },
        course: {
            id: 3,
            title: 'Full Stack Web Development',
            category: 'basic',
            duration: '16 weeks',
            price: 'GHS 3,800'
        },
        status: 'in_progress',
        enrolledDate: '2024-12-10T14:15:00Z',
        startDate: '2024-01-08',
        progress: 42,
        paymentStatus: 'paid',
        notes: 'Motivated self-learner'
    },
    {
        id: 'ENR-2024-003',
        student: {
            name: 'Kofi Boateng',
            email: 'kofi.b@example.com',
            phone: '+233 26 555 1234',
            avatar: null,
            city: 'Takoradi'
        },
        course: {
            id: 5,
            title: 'Data Science & Analytics',
            category: 'intermediate',
            duration: '10 weeks',
            price: 'GHS 4,000'
        },
        status: 'pending',
        enrolledDate: '2024-12-18T09:45:00Z',
        startDate: null,
        progress: 0,
        paymentStatus: 'pending',
        notes: 'Background in statistics'
    },
    {
        id: 'ENR-2024-004',
        student: {
            name: 'Fatima Ibrahim',
            email: 'fatima.i@example.com',
            phone: '+233 27 888 9999',
            avatar: null,
            city: 'Tema'
        },
        course: {
            id: 7,
            title: 'AI & Machine Learning',
            category: 'advanced',
            duration: '12 weeks',
            price: 'GHS 5,500'
        },
        status: 'approved',
        enrolledDate: '2024-12-12T11:00:00Z',
        startDate: '2024-01-20',
        progress: 0,
        paymentStatus: 'paid',
        notes: 'Python experience required - verified'
    },
    {
        id: 'ENR-2024-005',
        student: {
            name: 'Emmanuel Osei',
            email: 'emmanuel.o@example.com',
            phone: '+233 23 111 2222',
            avatar: null,
            city: 'Accra'
        },
        course: {
            id: 11,
            title: 'Software Development Internship',
            category: 'internship',
            duration: '3 months',
            price: 'GHS 3,200'
        },
        status: 'completed',
        enrolledDate: '2024-08-01T08:00:00Z',
        startDate: '2024-08-15',
        progress: 100,
        paymentStatus: 'paid',
        notes: 'Excellent performance, hired by partner company'
    },
    {
        id: 'ENR-2024-006',
        student: {
            name: 'Grace Addo',
            email: 'grace.addo@example.com',
            phone: '+233 55 333 4444',
            avatar: null,
            city: 'Cape Coast'
        },
        course: {
            id: 10,
            title: 'Career Transition to Tech Program',
            category: 'matured',
            duration: '12 weeks',
            price: 'GHS 4,500'
        },
        status: 'in_progress',
        enrolledDate: '2024-11-20T16:30:00Z',
        startDate: '2024-12-01',
        progress: 35,
        paymentStatus: 'paid',
        notes: 'Previous career in accounting'
    },
    {
        id: 'ENR-2024-007',
        student: {
            name: 'Daniel Mensah',
            email: 'daniel.m@example.com',
            phone: '+233 50 666 7777',
            avatar: null,
            city: 'Accra'
        },
        course: {
            id: 2,
            title: 'Cloud Computing (AWS/Azure)',
            category: 'basic',
            duration: '12 weeks',
            price: 'GHS 4,200'
        },
        status: 'rejected',
        enrolledDate: '2024-12-05T13:20:00Z',
        startDate: null,
        progress: 0,
        paymentStatus: 'refunded',
        notes: 'Prerequisites not met'
    },
    {
        id: 'ENR-2024-008',
        student: {
            name: 'Abena Osei',
            email: 'abena.o@example.com',
            phone: '+233 24 444 5555',
            avatar: null,
            city: 'Kumasi'
        },
        course: {
            id: 6,
            title: 'Cloud Architecture',
            category: 'advanced',
            duration: '8 weeks',
            price: 'GHS 4,200'
        },
        status: 'pending',
        enrolledDate: '2024-12-19T10:00:00Z',
        startDate: null,
        progress: 0,
        paymentStatus: 'pending',
        notes: 'Awaiting interview'
    },
    {
        id: 'ENR-2024-009',
        student: {
            name: 'Samuel Adjei',
            email: 'samuel.a@example.com',
            phone: '+233 26 999 0000',
            avatar: null,
            city: 'Ho'
        },
        course: {
            id: 13,
            title: 'Digital Marketing Internship',
            category: 'internship',
            duration: '2 months',
            price: 'GHS 2,200'
        },
        status: 'withdrawn',
        enrolledDate: '2024-11-15T09:30:00Z',
        startDate: '2024-12-01',
        progress: 15,
        paymentStatus: 'partial_refund',
        notes: 'Personal reasons'
    },
    {
        id: 'ENR-2024-010',
        student: {
            name: 'Linda Amponsah',
            email: 'linda.amp@example.com',
            phone: '+233 20 777 8888',
            avatar: null,
            city: 'Accra'
        },
        course: {
            id: 8,
            title: 'IT Fundamentals for Professionals',
            category: 'matured',
            duration: '6 weeks',
            price: 'GHS 2,800'
        },
        status: 'in_progress',
        enrolledDate: '2024-12-01T14:45:00Z',
        startDate: '2024-12-10',
        progress: 58,
        paymentStatus: 'paid',
        notes: 'Corporate sponsor'
    }
];

// Format date
const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

// Status badge component
const StatusBadge = ({ status }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG['pending'];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${config.color}`}>
            <Icon size={10} />
            {config.label}
        </span>
    );
};

// Progress bar component
const ProgressBar = ({ progress }) => {
    const getColor = () => {
        if (progress >= 80) return 'from-green-500 to-emerald-500';
        if (progress >= 50) return 'from-blue-500 to-cyan-500';
        if (progress >= 25) return 'from-amber-500 to-orange-500';
        return 'from-gray-400 to-gray-500';
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="font-bold text-gray-700">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full bg-gradient-to-r ${getColor()} rounded-full transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

const EnrollmentsManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuperAdmin } = usePermissions();

    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    // Filter enrollments
    const filteredEnrollments = useMemo(() => {
        let result = [...mockEnrollments];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(e =>
                e.id.toLowerCase().includes(query) ||
                e.student.name.toLowerCase().includes(query) ||
                e.student.email.toLowerCase().includes(query) ||
                e.course.title.toLowerCase().includes(query)
            );
        }

        // Status filter
        if (selectedStatus !== 'all') {
            result = result.filter(e => e.status === selectedStatus);
        }

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(e => e.course.category === selectedCategory);
        }

        return result;
    }, [searchQuery, selectedStatus, selectedCategory]);

    // Pagination
    const totalPages = Math.ceil(filteredEnrollments.length / itemsPerPage);
    const paginatedEnrollments = filteredEnrollments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => {
        return {
            totalEnrollments: mockEnrollments.length,
            pending: mockEnrollments.filter(e => e.status === 'pending').length,
            approved: mockEnrollments.filter(e => e.status === 'approved').length,
            inProgress: mockEnrollments.filter(e => e.status === 'in_progress').length,
            completed: mockEnrollments.filter(e => e.status === 'completed').length,
            rejected: mockEnrollments.filter(e => e.status === 'rejected').length,
            avgProgress: Math.round(
                mockEnrollments.filter(e => e.status === 'in_progress' || e.status === 'completed')
                    .reduce((acc, e) => acc + e.progress, 0) /
                mockEnrollments.filter(e => e.status === 'in_progress' || e.status === 'completed').length || 0
            )
        };
    }, []);

    const handleEdit = (enrollment) => {
        navigate(`/admin/enrollments/edit/${enrollment.id}`);
    };

    const handleApprove = (enrollment) => {
        dispatch(openConfirmDialog({
            title: 'Approve Enrollment',
            message: `Are you sure you want to approve ${enrollment.student.name}'s enrollment for "${enrollment.course.title}"?`,
            isDangerous: false,
            onConfirm: () => {
                console.log('Approving enrollment:', enrollment.id);
            }
        }));
    };

    const handleReject = (enrollment) => {
        dispatch(openConfirmDialog({
            title: 'Reject Enrollment',
            message: `Are you sure you want to reject ${enrollment.student.name}'s enrollment for "${enrollment.course.title}"? This will notify the student.`,
            isDangerous: true,
            onConfirm: () => {
                console.log('Rejecting enrollment:', enrollment.id);
            }
        }));
    };

    const handleDelete = (enrollment) => {
        dispatch(openConfirmDialog({
            title: 'Delete Enrollment',
            message: `Are you sure you want to delete enrollment ${enrollment.id}? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: () => {
                console.log('Deleting enrollment:', enrollment.id);
            }
        }));
    };

    const handleExport = () => {
        console.log('Exporting enrollments...');
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedStatus('all');
        setSelectedCategory('all');
        setCurrentPage(1);
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
                            Enrollments Management
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Track and manage student course enrollments
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm font-medium text-sm"
                        >
                            <Download size={16} />
                            Export
                        </button>
                        <Link
                            to="/admin/enrollments/new"
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d7a] hover:to-[#004fa2] transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
                        >
                            <Plus size={18} />
                            Add Enrollment
                        </Link>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('all'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <Users className="text-blue-600" size={18} />
                            </div>
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">All</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalEnrollments}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Total Enrollments</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('pending'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                                <Clock className="text-amber-600" size={18} />
                            </div>
                            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Review</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Pending</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('approved'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                <UserCheck className="text-green-600" size={18} />
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Active</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Approved</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('in_progress'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-cyan-50 rounded-lg flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                                <RefreshCcw className="text-cyan-600" size={18} />
                            </div>
                            <span className="text-xs font-medium text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">Active</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                        <p className="text-xs text-gray-500 mt-0.5">In Progress</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('completed'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                <Award className="text-purple-600" size={18} />
                            </div>
                            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">Done</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Completed</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('rejected'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                <UserX className="text-red-600" size={18} />
                            </div>
                            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Declined</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Rejected</p>
                    </div>

                    <div className="bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                                <TrendingUp className="text-white" size={18} />
                            </div>
                            <span className="text-xs font-medium text-white/90 bg-white/20 px-2 py-0.5 rounded-full">Avg</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{stats.avgProgress}%</p>
                        <p className="text-xs text-blue-100 mt-0.5">Avg Progress</p>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by ID, student name, email, or course..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-400" size={18} />
                            <select
                                value={selectedStatus}
                                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                                className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[140px]"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="rejected">Rejected</option>
                                <option value="withdrawn">Withdrawn</option>
                            </select>
                        </div>

                        {/* Category Filter */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                            className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[150px]"
                        >
                            <option value="all">All Categories</option>
                            {Object.entries(COURSE_CATEGORIES).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                            ))}
                        </select>

                        {/* Reset Filters */}
                        {(searchQuery || selectedStatus !== 'all' || selectedCategory !== 'all') && (
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <X size={16} />
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                {/* Enrollments Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Progress</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Enrolled</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedEnrollments.map((enrollment) => {
                                    const categoryConfig = COURSE_CATEGORIES[enrollment.course.category];
                                    const statusConfig = STATUS_CONFIG[enrollment.status];

                                    return (
                                        <tr key={enrollment.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-sm font-bold">
                                                        {enrollment.student.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{enrollment.student.name}</p>
                                                        <p className="text-xs text-gray-400">{enrollment.student.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900 text-sm">{enrollment.course.title}</p>
                                                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium ${categoryConfig?.color}`}>
                                                        {categoryConfig?.label}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={enrollment.status} />
                                            </td>
                                            <td className="px-6 py-4 w-32">
                                                <ProgressBar progress={enrollment.progress} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-600">{formatDate(enrollment.enrolledDate)}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-600">{formatDate(enrollment.startDate)}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link
                                                        to={`/admin/enrollments/${enrollment.id}`}
                                                        className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        <Eye size={16} />
                                                    </Link>
                                                    {enrollment.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleApprove(enrollment)}
                                                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                                title="Approve"
                                                            >
                                                                <Check size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(enrollment)}
                                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Reject"
                                                            >
                                                                <XCircle size={16} />
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        onClick={() => handleEdit(enrollment)}
                                                        className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(enrollment)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredEnrollments.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <GraduationCap className="text-gray-400" size={28} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No enrollments found</h3>
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
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredEnrollments.length)}</span> of{' '}
                            <span className="font-semibold text-gray-900">{filteredEnrollments.length}</span> enrollments
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
            </div>
        </AdminLayout>
    );
};

export default EnrollmentsManagementPage;
