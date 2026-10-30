/**
 * Training Courses Management Page (Super Admin)
 * Professional admin interface for managing training courses only
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import { fetchCourses, deleteCourse, togglePublishCourse } from '../../../store/slices/coursesSlice';
import { useAuth } from '../../../hooks/useAuth';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { getCourseImageUrl } from '../../../utils/imageUrl';
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
    Award
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

const TrainingCoursesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux courses state
    const { items: courses = [], loading: coursesLoading } = useSelector((state) => state.courses);

    // Courses state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewingCourse, setViewingCourse] = useState(null);

    const itemsPerPage = 8;

    // Fetch courses on mount
    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    // Filter and search courses
    const filteredCourses = useMemo(() => {
        let result = [...courses];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(course =>
                (course.title || '').toLowerCase().includes(query) ||
                (course.description || '').toLowerCase().includes(query) ||
                (course.shortDescription || '').toLowerCase().includes(query) ||
                (course.instructor || '').toLowerCase().includes(query)
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(course => (course.category || '').toLowerCase() === selectedCategory.toLowerCase());
        }

        // Level filter
        if (selectedLevel !== 'all') {
            result = result.filter(course => (course.level || '').toLowerCase().includes(selectedLevel.toLowerCase()));
        }

        return result;
    }, [courses, searchQuery, selectedCategory, selectedLevel]);

    // Pagination
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const paginatedCourses = filteredCourses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => ({
        total: courses.length,
        basic: courses.filter(c => (c.category || '').toLowerCase() === 'basic').length,
        intermediate: courses.filter(c => (c.category || '').toLowerCase() === 'intermediate').length,
        advanced: courses.filter(c => (c.category || '').toLowerCase() === 'advanced').length,
        matured: courses.filter(c => (c.category || '').toLowerCase() === 'matured').length,
        internship: courses.filter(c => (c.category || '').toLowerCase() === 'internship').length,
        avgRating: (courses.reduce((acc, c) => acc + (c.rating || 5.0), 0) / Math.max(1, courses.length)).toFixed(1),
        totalReviews: courses.reduce((acc, c) => acc + (c.reviews || 0), 0)
    }), [courses]);

    // Unique levels for filter
    const uniqueLevels = useMemo(() => {
        const levels = new Set(courses.map(c => c.level));
        return Array.from(levels);
    }, [courses]);

    // Handlers
    const handleDelete = (course) => {
        dispatch(openConfirmDialog({
            title: 'Delete Course',
            message: `Are you sure you want to delete "${course.title}"? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: async () => {
                try {
                    await dispatch(deleteCourse(course.id)).unwrap();
                    dispatch(addNotification({
                        type: 'success',
                        message: `Course "${course.title}" deleted successfully`
                    }));
                } catch (err) {
                    dispatch(addNotification({
                        type: 'error',
                        message: err || 'Failed to delete course'
                    }));
                }
            }
        }));
    };

    const handleTogglePublish = async (course) => {
        const isPublished = course.status === 'active' || course.status === 'published' || course.isPublished;
        const nextStatus = isPublished ? 'draft' : 'active';
        try {
            await dispatch(togglePublishCourse({ id: course.id, status: nextStatus })).unwrap();
            dispatch(addNotification({
                type: 'success',
                message: `Course "${course.title}" marked as ${nextStatus === 'active' ? 'published' : 'draft'}`
            }));
        } catch (err) {
            dispatch(addNotification({
                type: 'error',
                message: err || 'Failed to update course status'
            }));
        }
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

    return (
        <AdminLayout>
            <div className="space-y-3 md:space-y-6 pb-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
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

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                        { id: 'all', title: 'Total Courses', count: stats.total, icon: BookOpen, cColor: 'text-blue-600', bg: 'bg-blue-50', badge: 'All' },
                        { id: 'basic', title: 'Basic Programs', count: stats.basic, icon: Target, cColor: 'text-green-600', bg: 'bg-green-50', badge: 'Basic' },
                        { id: 'intermediate', title: 'Intermediate', count: stats.intermediate, icon: TrendingUp, cColor: 'text-blue-600', bg: 'bg-blue-50', badge: 'Intermediate' },
                        { id: 'advanced', title: 'Advanced', count: stats.advanced, icon: Award, cColor: 'text-purple-600', bg: 'bg-purple-50', badge: 'Advanced' },
                        { id: 'internship', title: 'Internships', count: stats.internship, icon: Users, cColor: 'text-cyan-600', bg: 'bg-cyan-50', badge: 'Internship' },
                    ].map((stat, i) => (
                        <div key={i} className="p-2.5 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all bg-gray-50/80 flex items-center gap-2.5 cursor-pointer"
                            onClick={() => { setSelectedCategory(stat.id); setCurrentPage(1); }}
                        >
                            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-md shrink-0 flex items-center justify-center ${stat.bg}`}>
                                <stat.icon className={stat.cColor} size={14} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1 mb-0.5">
                                    <span className="text-[10px] text-gray-500 font-medium truncate">{stat.title}</span>
                                    <span className={`text-[8px] font-bold uppercase px-1.5 py-[1px] rounded-full shrink-0 ${stat.bg} ${stat.cColor}`}>
                                        {stat.badge}
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-gray-900 leading-none">{stat.count}</p>
                            </div>
                        </div>
                    ))}

                    {/* Rating Card */}
                    <div className="p-2.5 rounded-lg border border-[#0066cc]/20 transition-all bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center gap-2.5 hover:shadow-md hover:brightness-105">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-md shrink-0 flex items-center justify-center bg-white/20">
                            <Star className="text-white" size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                                <span className="text-[10px] text-blue-100 font-medium truncate">Reviews</span>
                                <span className="text-[8px] font-bold uppercase px-1.5 py-[1px] rounded-full shrink-0 bg-white/20 text-white/90">
                                    Rating
                                </span>
                            </div>
                            <div className="flex items-end gap-1">
                                <p className="text-sm font-bold text-white leading-none">{stats.avgRating}</p>
                                <span className="text-[8px] text-blue-100/80 leading-none pb-px">({stats.totalReviews})</span>
                            </div>
                        </div>
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
                {coursesLoading ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[300px]">
                        <div className="w-10 h-10 border-4 border-[#004fa2]/20 border-t-[#004fa2] rounded-full animate-spin mb-3"></div>
                        <p className="text-sm font-medium text-gray-600">Loading courses from server...</p>
                    </div>
                ) : filteredCourses.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                        <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-500 font-medium">No courses found matching your filters</p>
                        <button
                            onClick={resetFilters}
                            className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {paginatedCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col"
                                >
                                    {/* Card Cover Image Header */}
                                    <div className="relative h-36 w-full bg-slate-100 overflow-hidden shrink-0">
                                        {(() => {
                                            const resolvedImg = getCourseImageUrl(course);
                                            if (!resolvedImg) {
                                                return (
                                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
                                                        <GraduationCap size={32} className="opacity-40 mb-1" />
                                                        <span className="text-[10px] font-medium text-slate-400">No Image</span>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <img
                                                    src={resolvedImg}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3C/svg%3E';
                                                    }}
                                                />
                                            );
                                        })()}

                                        {/* Status badge */}
                                        {course.badge && (
                                            <div className="absolute top-2 left-2">
                                                <CourseBadge type={course.badge}>{course.badge}</CourseBadge>
                                            </div>
                                        )}

                                        {/* Publish status */}
                                        <div className="absolute top-2 right-2">
                                            {(course.status === 'active' || course.status === 'published' || course.isPublished) ? (
                                                <span className="px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                                                    <Eye size={10} /> Live
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 bg-gray-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                                                    <EyeOff size={10} /> Draft
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-4 flex flex-col flex-1">
                                        {/* Category and Duration */}
                                        <div className="flex items-center justify-between mb-2 gap-2">
                                            {course.category && (
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${CATEGORY_CONFIG[course.category.toLowerCase()]?.color || 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {CATEGORY_CONFIG[course.category.toLowerCase()]?.label || course.category}
                                                </span>
                                            )}
                                            {course.duration && (
                                                <div className="flex items-center gap-1 text-gray-500">
                                                    <Clock size={12} />
                                                    <span className="text-[10px] font-medium">{course.duration}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Course Title */}
                                        <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 min-h-[2.5rem] flex-shrink-0">
                                            {course.title}
                                        </h3>

                                        {/* Short Description */}
                                        {course.shortDescription && (
                                            <p className="text-xs text-gray-600 line-clamp-2 mb-3 flex-1">
                                                {course.shortDescription}
                                            </p>
                                        )}

                                        {/* Meta Info */}
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-3 border-b border-gray-100">
                                            <div className="flex items-center gap-1">
                                                <Users size={12} />
                                                <span>{course.enrollments || 0} enrolled</span>
                                            </div>
                                            {course.rating && (
                                                <div className="flex items-center gap-1">
                                                    <Star size={12} className="fill-amber-400 text-amber-400" />
                                                    <span className="font-medium text-gray-900">{course.rating}</span>
                                                    <span className="text-gray-400">({course.reviews || 0})</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Price and Actions */}
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex items-center gap-1">
                                                {course.price > 0 ? (
                                                    <>
                                                        <DollarSign size={14} className="text-green-600" />
                                                        <span className="text-base font-bold text-gray-900">{course.price}</span>
                                                    </>
                                                ) : (
                                                    <span className="text-sm font-bold text-green-600">FREE</span>
                                                )}
                                            </div>

                                            {/* Actions Menu */}
                                            <div className="relative group/menu">
                                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <MoreVertical size={16} className="text-gray-500" />
                                                </button>

                                                {/* Dropdown Menu */}
                                                <div className="absolute right-0 bottom-full mb-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10">
                                                    <button
                                                        onClick={() => handleView(course)}
                                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                    >
                                                        <Eye size={14} />
                                                        View Details
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(course)}
                                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                    >
                                                        <Edit size={14} />
                                                        Edit Course
                                                    </button>
                                                    <button
                                                        onClick={() => handleTogglePublish(course)}
                                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                    >
                                                        {(course.status === 'active' || course.status === 'published' || course.isPublished) ? (
                                                            <>
                                                                <EyeOff size={14} />
                                                                Unpublish
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Eye size={14} />
                                                                Publish
                                                            </>
                                                        )}
                                                    </button>
                                                    <div className="border-t border-gray-100 my-1"></div>
                                                    <button
                                                        onClick={() => handleDelete(course)}
                                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                    >
                                                        <Trash2 size={14} />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="text-sm text-gray-600">
                                    Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                                    <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredCourses.length)}</span> of{' '}
                                    <span className="font-semibold">{filteredCourses.length}</span> courses
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>

                                    <div className="flex items-center gap-1">
                                        {[...Array(totalPages)].map((_, i) => {
                                            const page = i + 1;
                                            if (
                                                page === 1 ||
                                                page === totalPages ||
                                                (page >= currentPage - 1 && page <= currentPage + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                                            ? 'bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white'
                                                            : 'hover:bg-gray-100 text-gray-700'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            } else if (page === currentPage - 2 || page === currentPage + 2) {
                                                return <span key={page} className="px-2 text-gray-400">...</span>;
                                            }
                                            return null;
                                        })}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Quick View Modal */}
                {viewingCourse && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setViewingCourse(null)}>
                        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-900">Course Details</h2>
                                <button onClick={() => setViewingCourse(null)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                {getCourseImageUrl(viewingCourse) && (
                                    <img
                                        src={getCourseImageUrl(viewingCourse)}
                                        alt={viewingCourse.title}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                )}

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{viewingCourse.title}</h3>
                                    {viewingCourse.shortDescription && (
                                        <p className="text-gray-600 mb-4">{viewingCourse.shortDescription}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Category</p>
                                        <p className="font-semibold text-gray-900">{viewingCourse.category}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Duration</p>
                                        <p className="font-semibold text-gray-900">{viewingCourse.duration || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Price</p>
                                        <p className="font-semibold text-gray-900">
                                            {viewingCourse.price > 0 ? `$${viewingCourse.price}` : 'FREE'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Enrollments</p>
                                        <p className="font-semibold text-gray-900">{viewingCourse.enrollments || 0}</p>
                                    </div>
                                </div>

                                {viewingCourse.description && (
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                                        <div className="text-gray-600 whitespace-pre-wrap">{viewingCourse.description}</div>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => {
                                            setViewingCourse(null);
                                            handleEdit(viewingCourse);
                                        }}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Edit size={16} />
                                        Edit Course
                                    </button>
                                    <button
                                        onClick={() => setViewingCourse(null)}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default TrainingCoursesPage;


