/**
 * Testimonials Management Page (Admin)
 * Professional admin interface for managing customer testimonials
 */

import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import testimonialsService from '../../../services/testimonialsService';
import {
    MessageCircle,
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    Grid,
    List,
    ChevronLeft,
    ChevronRight,
    X,
    Star,
    User,
    Quote,
    Calendar,
    CheckCircle,
    Clock,
    AlertCircle,
    ExternalLink,
    ThumbsUp,
    Image,
    Video,
    Sparkles,
    Award,
    GraduationCap,
    Briefcase,
    Building,
    Users,
    Heart,
    StarHalf
} from 'lucide-react';

// Type/Source configuration
const TYPE_CONFIG = {
    'student': {
        label: 'Student',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: GraduationCap
    },
    'alumni': {
        label: 'Alumni',
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        icon: Award
    },
    'partner': {
        label: 'Partner',
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: Building
    },
    'corporate': {
        label: 'Corporate',
        color: 'bg-cyan-100 text-cyan-700 border-cyan-200',
        icon: Briefcase
    },
    'parent': {
        label: 'Parent',
        color: 'bg-pink-100 text-pink-700 border-pink-200',
        icon: Heart
    },
    'mentor': {
        label: 'Mentor',
        color: 'bg-amber-100 text-amber-700 border-amber-200',
        icon: Users
    }
};



// Status badge component
const StatusBadge = ({ status }) => {
    const statusStyles = {
        published: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
        draft: 'bg-gray-100 text-gray-600 border border-gray-200',
        pending: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
        archived: 'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${statusStyles[status] || statusStyles.draft}`}>
            {status}
        </span>
    );
};

// Star rating component
const StarRating = ({ rating, size = 14 }) => {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={size}
                    className={star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                />
            ))}
        </div>
    );
};

// Avatar component
const AvatarDisplay = ({ name, avatar, size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-6 h-6 md:w-8 md:h-8 text-xs',
        md: 'w-12 h-12 text-sm',
        lg: 'w-16 h-16 text-lg'
    };

    const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    if (avatar) {
        return (
            <img decoding="async"
                src={avatar}
                alt={name}
                loading="lazy"
                className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-white shadow-md`}
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                }}
            />
        );
    }

    return (
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white font-bold ring-2 ring-white shadow-md`}>
            {initials}
        </div>
    );
};

const TestimonialsManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuperAdmin } = usePermissions();

    // State management
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('grid');
    const [showModal, setShowModal] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [viewingTestimonial, setViewingTestimonial] = useState(null);

    const itemsPerPage = 6;

    // Fetch Testimonials
    React.useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await testimonialsService.getAllTestimonials();
                setTestimonials(response.data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);



    // Get unique types
    const uniqueTypes = useMemo(() => {
        return [...new Set(testimonials.map(t => t.type))];
    }, [testimonials]);

    // Filter and search testimonials
    const filteredTestimonials = useMemo(() => {
        let result = [...testimonials];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(t =>
                t.name.toLowerCase().includes(query) ||
                t.quote.toLowerCase().includes(query) ||
                t.role.toLowerCase().includes(query) ||
                t.program?.toLowerCase().includes(query)
            );
        }

        // Type filter
        if (selectedType !== 'all') {
            result = result.filter(t => t.type === selectedType);
        }

        // Status filter
        if (selectedStatus !== 'all') {
            result = result.filter(t => t.status === selectedStatus);
        }

        return result;
    }, [testimonials, searchQuery, selectedType, selectedStatus]);

    // Pagination
    const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
    const paginatedTestimonials = filteredTestimonials.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => ({
        total: testimonials.length,
        published: testimonials.filter(t => t.status === 'published').length,
        pending: testimonials.filter(t => t.status === 'pending').length,
        drafts: testimonials.filter(t => t.status === 'draft').length,
        featured: testimonials.filter(t => t.featured).length,
        avgRating: testimonials.length > 0 ? (testimonials.reduce((acc, t) => acc + (t.rating || 0), 0) / testimonials.length).toFixed(1) : 0,
        totalLikes: testimonials.reduce((acc, t) => acc + (t.likes || 0), 0)
    }), [testimonials]);

    // Handlers
    const handleDelete = (testimonial) => {
        dispatch(openConfirmDialog({
            title: 'Delete Testimonial',
            message: `Are you sure you want to delete the testimonial from "${testimonial.name}"? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: async () => {
                try {
                    await testimonialsService.deleteTestimonial(testimonial.id);
                    setTestimonials(prev => prev.filter(t => t.id !== testimonial.id));
                } catch (error) {
                    console.error('Error deleting testimonial:', error);
                }
            }
        }));
    };

    const handleView = (testimonial) => {
        setViewingTestimonial(testimonial);
    };

    const handleEdit = (testimonial) => {
        navigate(`/admin/testimonials/edit/${testimonial.id}`);
    };

    const handleAddNew = () => {
        navigate('/admin/testimonials/new');
    };

    const handleToggleFeatured = async (testimonial) => {
        try {
            await testimonialsService.toggleFeatured(testimonial.id);
            setTestimonials(prev => prev.map(t =>
                t.id === testimonial.id ? { ...t, featured: !t.featured } : t
            ));
        } catch (error) {
            console.error('Error toggling featured status:', error);
        }
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedType('all');
        setSelectedStatus('all');
        setCurrentPage(1);
    };

    return (
        <AdminLayout>
            <div className="space-y-3 md:space-y-6 pb-8">
                {/* Page Header & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                            <MessageCircle size={18} className="text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-[11px] md:text-base font-bold text-gray-900 leading-tight">Testimonials Management</h1>
                            <p className="text-[10px] text-gray-500">Manage customer reviews and success stories</p>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleAddNew}
                        className="w-full md:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#004fa2] text-white rounded-lg hover:bg-blue-800 transition-all shadow-sm text-xs font-semibold"
                    >
                        <Plus size={14} /> Add Testimonial
                    </button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-3 md:grid-cols-7 gap-2 md:gap-3 mb-4">
                    {[
                        { title: 'Total', count: stats.total, icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-50', onClick: () => { setSelectedStatus('all'); setCurrentPage(1); } },
                        { title: 'Published', count: stats.published, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', onClick: () => { setSelectedStatus('published'); setCurrentPage(1); } },
                        { title: 'Pending', count: stats.pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', onClick: () => { setSelectedStatus('pending'); setCurrentPage(1); } },
                        { title: 'Drafts', count: stats.drafts, icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-100', onClick: () => { setSelectedStatus('draft'); setCurrentPage(1); } },
                        { title: 'Featured', count: stats.featured, icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50', onClick: () => {} },
                        { title: 'Avg Rating', count: stats.avgRating, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50', onClick: () => {} },
                        { title: 'Likes', count: stats.totalLikes, icon: ThumbsUp, color: 'text-pink-600', bg: 'bg-pink-50', onClick: () => {} }
                    ].map((stat, i) => (
                        <div key={i} onClick={stat.onClick} className={`bg-white border border-gray-100 rounded-xl p-2 md:p-2.5 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-1 md:gap-2 shadow-sm hover:border-[#004fa2] transition-colors text-center md:text-left ${stat.onClick ? 'cursor-pointer' : ''} group`}>
                            <div className={`w-6 h-6 md:w-7 md:h-7 rounded-md shrink-0 flex items-center justify-center ${stat.bg}`}>
                                <stat.icon className={stat.color} size={14} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[9px] md:text-[10px] text-gray-500 font-medium uppercase tracking-wide truncate group-hover:text-[#004fa2] transition-colors">{stat.title}</p>
                                <p className="text-xs md:text-sm font-bold text-gray-900 leading-none mt-0.5 md:mt-0">{stat.count}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters and Search */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-2 mb-4">
                    <div className="col-span-2 md:col-span-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search by name, quote, role..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-3 relative">
                        <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                            value={selectedType}
                            onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                        >
                            <option value="all">All Types</option>
                            {uniqueTypes.map((type, idx) => (
                                <option key={`type-${type}-${idx}`} value={type}>{TYPE_CONFIG[type]?.label || type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-1 md:col-span-3 relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                            className="w-full px-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                        >
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="pending">Pending</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>

                    <div className="col-span-2 md:col-span-2 flex items-center justify-end gap-1">
                        <div className="flex bg-white border border-gray-100 rounded-xl p-0.5 shadow-sm h-[34px]">
                            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${viewMode === 'grid' ? 'bg-[#004fa2] text-white' : 'text-gray-400 hover:text-gray-600'}`}>
                                <Grid size={14} />
                            </button>
                            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${viewMode === 'list' ? 'bg-[#004fa2] text-white' : 'text-gray-400 hover:text-gray-600'}`}>
                                <List size={14} />
                            </button>
                        </div>
                        {(searchQuery || selectedType !== 'all' || selectedStatus !== 'all') && (
                            <button onClick={resetFilters} className="bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 h-[34px] w-[34px] rounded-xl transition-colors shadow-sm flex items-center justify-center shrink-0">
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Testimonials Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {paginatedTestimonials.map((testimonial) => {
                            const typeConfig = TYPE_CONFIG[testimonial.type] || TYPE_CONFIG['student'];
                            const TypeIcon = typeConfig.icon;

                            return (
                                <div key={testimonial.id} className={`bg-white rounded-xl shadow-sm border flex flex-col overflow-hidden hover:border-[#004fa2] transition-colors group p-3 ${testimonial.featured ? 'border-amber-200 ring-1 ring-amber-100' : 'border-gray-100'}`}>
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <AvatarDisplay name={testimonial.name} avatar={testimonial.avatar} size="sm" />
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-1">
                                                    <h3 className="text-[11px] font-bold text-gray-900 truncate">{testimonial.name}</h3>
                                                    {testimonial.verified && <CheckCircle className="text-blue-500" size={10} />}
                                                    {testimonial.featured && <Star className="text-amber-500 fill-amber-500" size={10} />}
                                                </div>
                                                <p className="text-[9px] text-gray-500 truncate">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        <StatusBadge status={testimonial.status} />
                                    </div>
                                    
                                    <div className="relative mb-3 flex-1">
                                        <Quote className="absolute -top-1 -left-1 text-gray-100" size={20} />
                                        <p className="text-[10px] text-gray-600 leading-relaxed pl-4 line-clamp-3 relative z-10">{testimonial.quote}</p>
                                    </div>
                                    
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                                        <div className="flex items-center gap-2">
                                            <StarRating rating={testimonial.rating} size={10} />
                                            <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${typeConfig.color}`}>
                                                <TypeIcon size={8} /> {typeConfig.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <button onClick={() => handleView(testimonial)} className="p-1 hover:bg-blue-50 rounded text-gray-400 hover:text-[#004fa2] transition-colors"><Eye size={12} /></button>
                                            <button onClick={() => handleEdit(testimonial)} className="p-1 hover:bg-green-50 rounded text-gray-400 hover:text-green-600 transition-colors"><Edit size={12} /></button>
                                            <button onClick={() => handleToggleFeatured(testimonial)} className="p-1 rounded text-gray-400 hover:bg-amber-50 hover:text-amber-500 transition-colors"><Star size={12} className={testimonial.featured ? "fill-amber-500 text-amber-500" : ""} /></button>
                                            <button onClick={() => handleDelete(testimonial)} className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={12} /></button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* List View */
                    <div className="flex flex-col gap-2">
                        {paginatedTestimonials.map((testimonial) => {
                            const typeConfig = TYPE_CONFIG[testimonial.type] || TYPE_CONFIG['student'];
                            return (
                                <div key={testimonial.id} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center p-3 gap-3 hover:border-[#004fa2] transition-colors group">
                                    <div className="flex items-center gap-3 md:w-1/4 shrink-0">
                                        <AvatarDisplay name={testimonial.name} avatar={testimonial.avatar} size="sm" />
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-1">
                                                <h3 className="text-xs font-bold text-gray-900 truncate">{testimonial.name}</h3>
                                                {testimonial.featured && <Star className="text-amber-500 fill-amber-500" size={10} />}
                                            </div>
                                            <p className="text-[10px] text-gray-500 truncate">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-gray-600 line-clamp-2 md:w-2/5 flex-1 italic relative">
                                        "{testimonial.quote}"
                                    </p>
                                    <div className="flex items-center justify-between md:justify-end gap-3 md:w-1/3 shrink-0">
                                        <StarRating rating={testimonial.rating} size={10} />
                                        <StatusBadge status={testimonial.status} />
                                        <div className="flex items-center gap-0.5 border-l border-gray-100 pl-2">
                                            <button onClick={() => handleView(testimonial)} className="p-1.5 hover:bg-blue-50 rounded text-gray-400 hover:text-[#004fa2] transition-colors"><Eye size={14} /></button>
                                            <button onClick={() => handleEdit(testimonial)} className="p-1.5 hover:bg-green-50 rounded text-gray-400 hover:text-green-600 transition-colors"><Edit size={14} /></button>
                                            <button onClick={() => handleDelete(testimonial)} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Empty State */}
                {filteredTestimonials.length === 0 && (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="text-gray-400" size={28} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No testimonials found</h3>
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
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100 gap-3">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                            Showing <span className="text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="text-gray-900">{Math.min(currentPage * itemsPerPage, filteredTestimonials.length)}</span> of{' '}
                            <span className="text-gray-900">{filteredTestimonials.length}</span>
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

            {/* View Testimonial Modal */}
            {viewingTestimonial && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-gradient-to-r from-[#004fa2] to-[#0066cc] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <MessageCircle className="text-white" size={22} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Testimonial Details</h2>
                                    <p className="text-blue-100 text-xs">{viewingTestimonial.program}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingTestimonial(null)}
                                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto flex-1">
                            <div className="space-y-5">
                                {/* Author Info */}
                                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                                    <AvatarDisplay name={viewingTestimonial.name} avatar={viewingTestimonial.avatar} size="lg" />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xl font-bold text-gray-900">{viewingTestimonial.name}</h3>
                                            {viewingTestimonial.verified && (
                                                <CheckCircle className="text-blue-500" size={18} />
                                            )}
                                            {viewingTestimonial.featured && (
                                                <Star className="text-amber-500 fill-amber-500" size={18} />
                                            )}
                                        </div>
                                        <p className="text-gray-500">{viewingTestimonial.role}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${TYPE_CONFIG[viewingTestimonial.type]?.color}`}>
                                                {TYPE_CONFIG[viewingTestimonial.type]?.label}
                                            </span>
                                            <StatusBadge status={viewingTestimonial.status} />
                                        </div>
                                    </div>
                                </div>

                                {/* Quote */}
                                <div className="bg-gray-50 rounded-xl p-5 relative">
                                    <Quote className="absolute top-4 left-4 text-gray-200" size={32} />
                                    <p className="text-lg text-gray-700 leading-relaxed pl-8 italic">
                                        "{viewingTestimonial.quote}"
                                    </p>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center justify-center gap-2">
                                    <StarRating rating={viewingTestimonial.rating} size={24} />
                                    <span className="text-lg font-bold text-gray-900 ml-2">{viewingTestimonial.rating}/5</span>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <ThumbsUp className="mx-auto text-gray-400 mb-2" size={20} />
                                        <p className="text-lg font-bold text-gray-900">{viewingTestimonial.likes}</p>
                                        <p className="text-xs text-gray-500">Likes</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <Calendar className="mx-auto text-gray-400 mb-2" size={20} />
                                        <p className="text-lg font-bold text-gray-900">{viewingTestimonial.date}</p>
                                        <p className="text-xs text-gray-500">Date Added</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <CheckCircle className="mx-auto text-gray-400 mb-2" size={20} />
                                        <p className="text-lg font-bold text-gray-900">{viewingTestimonial.verified ? 'Yes' : 'No'}</p>
                                        <p className="text-xs text-gray-500">Verified</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                            <button
                                onClick={() => setViewingTestimonial(null)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                            >
                                Close
                            </button>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        setViewingTestimonial(null);
                                        handleEdit(viewingTestimonial);
                                    }}
                                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <Edit size={14} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleToggleFeatured(viewingTestimonial)}
                                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <Star size={14} className={viewingTestimonial.featured ? 'fill-white' : ''} />
                                    {viewingTestimonial.featured ? 'Unfeature' : 'Feature'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Testimonial Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                    {editingTestimonial ? <Edit className="text-white" size={20} /> : <Plus className="text-white" size={20} />}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                                    </h2>
                                    <p className="text-gray-500 text-xs">
                                        {editingTestimonial ? 'Update testimonial information' : 'Create a new customer testimonial'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => { setShowModal(false); setEditingTestimonial(null); }}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto flex-1">
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle className="text-amber-500" size={32} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
                                <p className="text-sm text-gray-500 max-w-md mx-auto">
                                    The testimonial editor form will be available once the backend API is ready.
                                    Currently, testimonials are managed via the <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Testimonials.jsx</code> data file.
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
                            <button
                                onClick={() => { setShowModal(false); setEditingTestimonial(null); }}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default TestimonialsManagementPage;
