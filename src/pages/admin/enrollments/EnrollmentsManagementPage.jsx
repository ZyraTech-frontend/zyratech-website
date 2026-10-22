/**
 * Enrollments Management Page (Admin)
 * Professional admin interface for managing course enrollments
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import trainingService from '../../../services/trainingService';
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
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    // ✅ Fetch real enrollments from API
    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                setLoading(true);
                const response = await trainingService.getAllEnrollments({ limit: 1000 });
                const data = Array.isArray(response) ? response : (response.data || []);
                setEnrollments(data);
            } catch (error) {
                console.error('Error fetching enrollments:', error);
                setEnrollments([]);
            } finally {
                setLoading(false);
            }
        };
        fetchEnrollments();
    }, []);

    // Filter enrollments
    const filteredEnrollments = useMemo(() => {
        let result = [...enrollments];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(e =>
                e.id?.toLowerCase().includes(query) ||
                e.student?.name?.toLowerCase().includes(query) ||
                e.student?.email?.toLowerCase().includes(query) ||
                e.course?.title?.toLowerCase().includes(query)
            );
        }

        // Status filter
        if (selectedStatus !== 'all') {
            result = result.filter(e => e.status === selectedStatus);
        }

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(e => e.course?.category === selectedCategory);
        }

        return result;
    }, [enrollments, searchQuery, selectedStatus, selectedCategory]);

    // Pagination
    const totalPages = Math.ceil(filteredEnrollments.length / itemsPerPage);
    const paginatedEnrollments = filteredEnrollments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => {
        return {
            totalEnrollments: enrollments.length,
            pending: enrollments.filter(e => e.status === 'pending').length,
            approved: enrollments.filter(e => e.status === 'approved').length,
            inProgress: enrollments.filter(e => e.status === 'in_progress').length,
            completed: enrollments.filter(e => e.status === 'completed').length,
            rejected: enrollments.filter(e => e.status === 'rejected').length,
            avgProgress: Math.round(
                enrollments.filter(e => e.status === 'in_progress' || e.status === 'completed')
                    .reduce((acc, e) => acc + (e.progress || 0), 0) /
                enrollments.filter(e => e.status === 'in_progress' || e.status === 'completed').length || 0
            )
        };
    }, [enrollments]);

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
            <div className="space-y-3 md:space-y-6 pb-8">
                {/* Page Header & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                            <GraduationCap size={18} className="text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-[11px] md:text-base font-bold text-gray-900 leading-tight">Enrollments Management</h1>
                            <p className="text-[10px] text-gray-500">Track and manage student course enrollments</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <button
                            onClick={handleExport}
                            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-all shadow-sm text-xs font-semibold"
                        >
                            <Download size={14} /> Export
                        </button>
                        <Link
                            to="/admin/enrollments/new"
                            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-all shadow-sm text-xs font-semibold"
                        >
                            <Plus size={14} /> Add Enrollment
                        </Link>
                    </div>
                </div>

                {/* Quick Status Bar */}
                <div className="flex flex-wrap text-[11px] gap-2 mb-4">
                    {[
                        { label: 'All', id: 'all', count: stats.totalEnrollments, active: selectedStatus === 'all' },
                        { label: 'Pending Review', id: 'pending', count: stats.pending, active: selectedStatus === 'pending' },
                        { label: 'Active/Approved', id: 'approved', count: stats.approved, active: selectedStatus === 'approved' },
                        { label: 'In Progress', id: 'in_progress', count: stats.inProgress, active: selectedStatus === 'in_progress' },
                        { label: 'Completed', id: 'completed', count: stats.completed, active: selectedStatus === 'completed' },
                        { label: 'Rejected', id: 'rejected', count: stats.rejected, active: selectedStatus === 'rejected' }
                    ].map(st => (
                        <button
                            key={st.id}
                            onClick={() => { setSelectedStatus(st.id); setCurrentPage(1); }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${st.active ? 'bg-[#004fa2] text-white border-[#004fa2]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                        >
                            {st.label} <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${st.active ? 'bg-white/20' : 'bg-gray-100'}`}>{st.count}</span>
                        </button>
                    ))}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 text-blue-800 font-bold ml-auto cursor-default">
                         <TrendingUp size={12}/> Avg Progress: {stats.avgProgress}%
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-2 mb-4">
                    <div className="col-span-2 md:col-span-6 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search by ID, student name, email, or course..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-3 relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                            className="w-full px-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
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

                    <div className="col-span-1 md:col-span-3 relative flex gap-2">
                        <select
                            value={selectedCategory}
                            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                            className="w-full px-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                        >
                            <option value="all">All Categories</option>
                            {Object.entries(COURSE_CATEGORIES).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                            ))}
                        </select>

                        {(searchQuery || selectedStatus !== 'all' || selectedCategory !== 'all') && (
                            <button onClick={resetFilters} className="bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 h-[34px] px-3 rounded-xl transition-colors shadow-sm flex items-center justify-center shrink-0">
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Enrollments Grid */}
                <div className="flex flex-col gap-2">
                    {paginatedEnrollments.map((enrollment) => {
                        const categoryConfig = COURSE_CATEGORIES[enrollment.course.category];
                        const statusConfig = STATUS_CONFIG[enrollment.status];

                        return (
                            <div key={enrollment.id} className={`bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col xl:flex-row xl:items-center p-3 gap-3 hover:border-[#004fa2] transition-colors group relative overflow-hidden`}>
                                {/* Left Indicator */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${statusConfig.dotColor}`}></div>
                                
                                {/* Student Info */}
                                <div className="flex items-start gap-3 min-w-0 xl:w-2/6">
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                                        {enrollment.student.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-gray-900 text-xs truncate">{enrollment.student.name}</p>
                                        <p className="text-[10px] text-gray-500 truncate">{enrollment.student.email}</p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <p className="font-mono text-[9px] font-bold text-gray-400">{enrollment.id}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Course Details */}
                                <div className="xl:w-2/6 py-1 xl:py-0 border-y xl:border-y-0 border-gray-50 flex flex-col justify-center">
                                    <p className="text-[11px] font-bold text-gray-800 line-clamp-1">{enrollment.course.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium ${categoryConfig?.color || 'bg-gray-100 text-gray-700'}`}>
                                            {categoryConfig?.label || 'General'}
                                        </span>
                                        <span className="text-[9px] text-gray-500 font-mono tracking-wider">Starts: {formatDate(enrollment.startDate)}</span>
                                    </div>
                                </div>

                                {/* Progress & Status */}
                                <div className="xl:w-1/6 flex flex-col justify-center gap-1">
                                    <ProgressBar progress={enrollment.progress} />
                                    <div className="mt-1">
                                        <StatusBadge status={enrollment.status} />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between xl:justify-end gap-2 xl:w-1/6 shrink-0 border-t xl:border-t-0 pt-2 xl:pt-0 border-gray-50">
                                    <div className="flex items-center gap-0.5 ml-auto">
                                        <Link to={`/admin/enrollments/${enrollment.id}`} className="p-1.5 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-[#004fa2] transition-colors"><Eye size={14} /></Link>
                                        {enrollment.status === 'pending' && (
                                            <>
                                                <button onClick={() => handleApprove(enrollment)} className="p-1.5 hover:bg-green-50 rounded-lg text-gray-400 hover:text-green-600 transition-colors"><Check size={14} /></button>
                                                <button onClick={() => handleReject(enrollment)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors"><XCircle size={14} /></button>
                                            </>
                                        )}
                                        <button onClick={() => handleEdit(enrollment)} className="p-1.5 hover:bg-amber-50 rounded-lg text-gray-400 hover:text-amber-600 transition-colors"><Edit size={14} /></button>
                                        <button onClick={() => handleDelete(enrollment)} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {filteredEnrollments.length === 0 && (
                        <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm">
                            <GraduationCap className="mx-auto text-gray-300 mb-2" size={24} />
                            <h3 className="text-sm font-bold text-gray-900 mb-1">No enrollments found</h3>
                            <button onClick={resetFilters} className="text-[11px] text-[#004fa2] hover:underline font-semibold mt-2">Clear filters</button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100 gap-3 mt-4">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                            Showing <span className="text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="text-gray-900">{Math.min(currentPage * itemsPerPage, filteredEnrollments.length)}</span> of{' '}
                            <span className="text-gray-900">{filteredEnrollments.length}</span>
                        </p>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-1 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded transition-colors disabled:opacity-40"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`min-w-[24px] h-6 flex items-center justify-center rounded text-[10px] font-bold transition-all ${currentPage === page
                                            ? 'bg-[#004fa2] text-white shadow-sm'
                                            : 'text-gray-500 hover:bg-gray-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-1 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded transition-colors disabled:opacity-40"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default EnrollmentsManagementPage;
