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
    StarHalf,
    Send
} from 'lucide-react';

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
const AvatarDisplay = ({ name, avatarUrl, size = 'md' }) => {
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

    if (avatarUrl) {
        return (
            <img decoding="async"
                src={avatarUrl}
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

    // State management - Initialize as empty array to prevent undefined errors
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
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
                const response = await testimonialsService.getAdminTestimonials(1, 100);
                
                // DEBUG: Log the FULL response structure to verify nesting levels
                console.log('[TestimonialsManagement] Full axios response:', response);
                console.log('[TestimonialsManagement] response.data:', response?.data);
                console.log('[TestimonialsManagement] response.data.data:', response?.data?.data);
                console.log('[TestimonialsManagement] response.data.data.data:', response?.data?.data?.data);
                
                // API returns: { success, data: { data: [...], pagination: {} } }
                // Axios wraps it: response.data = { success, data: { data: [...], pagination: {} } }
                // So testimonials array is at: response.data.data.data
                const apiResponseData = response?.data?.data; // This is { data: [...], pagination: {} }
                const testimonialsList = apiResponseData?.data ?? []; // This is the actual array
                const paginationInfo = apiResponseData?.pagination ?? {};
                
                console.log('[TestimonialsManagement] Extracted testimonials array:', testimonialsList);
                console.log('[TestimonialsManagement] Is array?', Array.isArray(testimonialsList));
                console.log('[TestimonialsManagement] Count:', Array.isArray(testimonialsList) ? testimonialsList.length : 'NOT AN ARRAY');
                
                // Ensure we always set an array, even if API returns unexpected structure
                setTestimonials(Array.isArray(testimonialsList) ? testimonialsList : []);
            } catch (error) {
                console.error('[TestimonialsManagement] Error fetching testimonials:', error);
                // Set empty array on error to prevent crashes
                setTestimonials([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);



    // Filter and search testimonials - with Array guard
    const filteredTestimonials = useMemo(() => {
        // Safety check: ensure testimonials is always an array
        const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
        let result = [...safeTestimonials];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(t =>
                t.name?.toLowerCase().includes(query) ||
                (t.content || '').toLowerCase().includes(query) ||
                (t.role || '').toLowerCase().includes(query) ||
                (t.organization || '').toLowerCase().includes(query)
            );
        }

        // Type filter - removed since backend API doesn't have 'type' field
        // if (selectedType !== 'all') {
        //     result = result.filter(t => t.type === selectedType);
        // }

        // Status filter
        if (selectedStatus !== 'all') {
            result = result.filter(t => t.status === selectedStatus);
        }

        return result;
    }, [testimonials, searchQuery, selectedStatus]);

    // Pagination
    const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
    const paginatedTestimonials = filteredTestimonials.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics - with Array guard
    const stats = useMemo(() => {
        const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
        return {
            total: safeTestimonials.length,
            published: safeTestimonials.filter(t => t.status === 'published').length,
            pending: safeTestimonials.filter(t => t.status === 'pending').length,
            drafts: safeTestimonials.filter(t => t.status === 'draft').length,
            featured: safeTestimonials.filter(t => t.isFeatured).length,
            avgRating: safeTestimonials.length > 0 ? (safeTestimonials.reduce((acc, t) => acc + (t.rating || 0), 0) / safeTestimonials.length).toFixed(1) : 0
        };
    }, [testimonials]);

    // Handlers
    const handleDelete = (testimonial) => {
        dispatch(openConfirmDialog({
            title: 'Delete Testimonial',
            message: `Are you sure you want to delete the testimonial from "${testimonial.name}"? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: async () => {
                try {
                    await testimonialsService.deleteAdminTestimonial(testimonial.id);
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
            // Update the isFeatured status
            await testimonialsService.updateAdminTestimonial(testimonial.id, {
                isFeatured: !testimonial.isFeatured
            });
            setTestimonials(prev => prev.map(t =>
                t.id === testimonial.id ? { ...t, isFeatured: !t.isFeatured } : t
            ));
        } catch (error) {
            console.error('Error toggling featured status:', error);
        }
    };

    const handlePublish = async (testimonial) => {
        try {
            // Update status to published
            await testimonialsService.updateAdminTestimonial(testimonial.id, {
                status: 'published'
            });
            setTestimonials(prev => prev.map(t =>
                t.id === testimonial.id ? { ...t, status: 'published' } : t
            ));
        } catch (error) {
            console.error('Error publishing testimonial:', error);
        }
    };

    const resetFilters = () => {
        setSearchQuery('');
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
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-4">
                    {[
                        { title: 'Total', count: stats.total, icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-50', onClick: () => { setSelectedStatus('all'); setCurrentPage(1); } },
                        { title: 'Published', count: stats.published, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', onClick: () => { setSelectedStatus('published'); setCurrentPage(1); } },
                        { title: 'Pending', count: stats.pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', onClick: () => { setSelectedStatus('pending'); setCurrentPage(1); } },
                        { title: 'Drafts', count: stats.drafts, icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-100', onClick: () => { setSelectedStatus('draft'); setCurrentPage(1); } },
                        { title: 'Featured', count: stats.featured, icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50', onClick: () => {} },
                        { title: 'Avg Rating', count: stats.avgRating, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50', onClick: () => {} }
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
                            placeholder="Search by name, content, role..."
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
                        {(searchQuery || selectedStatus !== 'all') && (
                            <button onClick={resetFilters} className="bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 h-[34px] w-[34px] rounded-xl transition-colors shadow-sm flex items-center justify-center shrink-0">
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Testimonials Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(Array.isArray(paginatedTestimonials) ? paginatedTestimonials : []).map((testimonial) => {
                            return (
                                <div key={testimonial.id} className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md border-2 flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-4 ${testimonial.isFeatured ? 'border-amber-300 ring-2 ring-amber-200' : 'border-gray-200 hover:border-[#004fa2]'}`}>
                                    {/* Header with Avatar and Info */}
                                    <div className="flex items-start gap-3 mb-4">
                                        <AvatarDisplay name={testimonial.name} avatarUrl={testimonial.avatarUrl} size="md" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <h3 className="text-sm font-bold text-gray-900 truncate">{testimonial.name}</h3>
                                                {testimonial.isFeatured && <Star className="text-amber-500 fill-amber-500 flex-shrink-0" size={14} />}
                                            </div>
                                            <p className="text-xs text-gray-600 truncate mb-0.5">{testimonial.role}</p>
                                            {testimonial.organization && (
                                                <p className="text-[10px] text-gray-500 truncate">{testimonial.organization}</p>
                                            )}
                                        </div>
                                        <StatusBadge status={testimonial.status} />
                                    </div>
                                    
                                    {/* Quote Content */}
                                    <div className="relative mb-4 flex-1 bg-white rounded-xl p-3 border border-gray-100">
                                        <Quote className="absolute -top-2 -left-2 text-blue-100" size={24} />
                                        <p className="text-xs text-gray-700 leading-relaxed line-clamp-4 relative z-10 italic">
                                            {testimonial.content}
                                        </p>
                                    </div>
                                    
                                    {/* Footer with Rating and Actions */}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                        <div className="flex items-center gap-1.5">
                                            <StarRating rating={testimonial.rating} size={12} />
                                            <span className="text-xs font-bold text-gray-700 ml-1">{testimonial.rating}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => handleView(testimonial)} className="p-1.5 hover:bg-blue-100 rounded-lg text-gray-500 hover:text-[#004fa2] transition-all" title="View">
                                                <Eye size={14} />
                                            </button>
                                            <button onClick={() => handleEdit(testimonial)} className="p-1.5 hover:bg-green-100 rounded-lg text-gray-500 hover:text-green-600 transition-all" title="Edit">
                                                <Edit size={14} />
                                            </button>
                                            {testimonial.status !== 'published' && (
                                                <button onClick={() => handlePublish(testimonial)} className="p-1.5 rounded-lg text-gray-500 hover:bg-emerald-100 hover:text-emerald-600 transition-all" title="Publish">
                                                    <Send size={14} />
                                                </button>
                                            )}
                                            <button onClick={() => handleToggleFeatured(testimonial)} className="p-1.5 rounded-lg text-gray-500 hover:bg-amber-100 hover:text-amber-500 transition-all" title="Toggle Featured">
                                                <Star size={14} className={testimonial.isFeatured ? "fill-amber-500 text-amber-500" : ""} />
                                            </button>
                                            <button onClick={() => handleDelete(testimonial)} className="p-1.5 hover:bg-red-100 rounded-lg text-gray-500 hover:text-red-600 transition-all" title="Delete">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* List View */
                    <div className="flex flex-col gap-2">
                        {(Array.isArray(paginatedTestimonials) ? paginatedTestimonials : []).map((testimonial) => {
                            return (
                                <div key={testimonial.id} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center p-3 gap-3 hover:border-[#004fa2] transition-colors group">
                                    <div className="flex items-center gap-3 md:w-1/4 shrink-0">
                                        <AvatarDisplay name={testimonial.name} avatarUrl={testimonial.avatarUrl} size="sm" />
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-1">
                                                <h3 className="text-xs font-bold text-gray-900 truncate">{testimonial.name}</h3>
                                                {testimonial.isFeatured && <Star className="text-amber-500 fill-amber-500" size={10} />}
                                            </div>
                                            <p className="text-[10px] text-gray-500 truncate">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-gray-600 line-clamp-2 md:w-2/5 flex-1 italic relative">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="flex items-center justify-between md:justify-end gap-3 md:w-1/3 shrink-0">
                                        <StarRating rating={testimonial.rating} size={10} />
                                        <StatusBadge status={testimonial.status} />
                                        <div className="flex items-center gap-0.5 border-l border-gray-100 pl-2">
                                            <button onClick={() => handleView(testimonial)} className="p-1.5 hover:bg-blue-50 rounded text-gray-400 hover:text-[#004fa2] transition-colors" title="View"><Eye size={14} /></button>
                                            <button onClick={() => handleEdit(testimonial)} className="p-1.5 hover:bg-green-50 rounded text-gray-400 hover:text-green-600 transition-colors" title="Edit"><Edit size={14} /></button>
                                            {testimonial.status !== 'published' && (
                                                <button onClick={() => handlePublish(testimonial)} className="p-1.5 hover:bg-emerald-50 rounded text-gray-400 hover:text-emerald-600 transition-colors" title="Publish"><Send size={14} /></button>
                                            )}
                                            <button onClick={() => handleDelete(testimonial)} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 size={14} /></button>
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
                                    <AvatarDisplay name={viewingTestimonial.name} avatarUrl={viewingTestimonial.avatarUrl} size="lg" />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xl font-bold text-gray-900">{viewingTestimonial.name}</h3>
                                            {viewingTestimonial.verified && (
                                                <CheckCircle className="text-blue-500" size={18} />
                                            )}
                                            {viewingTestimonial.isFeatured && (
                                                <Star className="text-amber-500 fill-amber-500" size={18} />
                                            )}
                                        </div>
                                        <p className="text-gray-500">{viewingTestimonial.role}</p>
                                        {viewingTestimonial.organization && (
                                            <p className="text-sm text-gray-600 mt-1">{viewingTestimonial.organization}</p>
                                        )}
                                        <div className="flex items-center gap-2 mt-2">
                                            <StatusBadge status={viewingTestimonial.status} />
                                        </div>
                                    </div>
                                </div>

                                {/* Quote */}
                                <div className="bg-gray-50 rounded-xl p-5 relative">
                                    <Quote className="absolute top-4 left-4 text-gray-200" size={32} />
                                    <p className="text-lg text-gray-700 leading-relaxed pl-8 italic">
                                        "{viewingTestimonial.content}"
                                    </p>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center justify-center gap-2">
                                    <StarRating rating={viewingTestimonial.rating} size={24} />
                                    <span className="text-lg font-bold text-gray-900 ml-2">{viewingTestimonial.rating}/5</span>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4">
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
                                    <Star size={14} className={viewingTestimonial.isFeatured ? 'fill-white' : ''} />
                                    {viewingTestimonial.isFeatured ? 'Unfeature' : 'Feature'}
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
