/**
 * Blog Management Page (Admin)
 * Professional admin interface for managing blog articles via live API.
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import blogService from '../../../services/blogService';
import {
    FileText,
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    Calendar,
    Tag,
    ChevronLeft,
    ChevronRight,
    BookOpen,
    ExternalLink,
    CheckCircle,
    AlertCircle,
    Loader2,
    RefreshCw,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';

// Status badge component
const StatusBadge = ({ status = 'draft' }) => {
    const isPublished = status === 'published';
    if (isPublished) {
        return (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-green-200 text-[9px] font-bold uppercase bg-green-50 text-green-700">
                <CheckCircle size={10} />
                Published
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-amber-200 text-[9px] font-bold uppercase bg-amber-50 text-amber-700">
            <AlertCircle size={10} />
            Draft
        </span>
    );
};

const BlogManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuperAdmin } = usePermissions();

    // State management
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoadingId, setActionLoadingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });

    const itemsPerPage = 10;

    // Debounce search query
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery.trim());
            setCurrentPage(1);
        }, 350);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Fetch articles from live backend API
    const loadArticles = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: itemsPerPage,
            };
            if (debouncedSearch) params.search = debouncedSearch;
            if (selectedCategory !== 'all') params.tag = selectedCategory;
            if (selectedStatus !== 'all') params.status = selectedStatus;

            const res = await blogService.getAdminArticles(params);
            setArticles(res.data || []);
            setPagination(res.pagination || { page: currentPage, limit: itemsPerPage, total: res.data?.length || 0, totalPages: 1 });
        } catch (err) {
            console.error('Failed to load blog articles:', err);
            dispatch(addNotification({
                type: 'error',
                message: err.response?.data?.error?.message || err.message || 'Failed to load blog articles'
            }));
        } finally {
            setLoading(false);
        }
    }, [currentPage, debouncedSearch, selectedCategory, selectedStatus, dispatch]);

    useEffect(() => {
        loadArticles();
    }, [loadArticles]);

    // Extract all unique categories from loaded articles
    const allCategories = useMemo(() => {
        const set = new Set();
        articles.forEach(a => {
            if (a.category) set.add(a.category);
            if (Array.isArray(a.tags)) {
                a.tags.forEach(t => {
                    if (t.toLowerCase() !== 'featured') set.add(t);
                });
            }
        });
        // Default standard categories if none present
        if (set.size === 0) {
            return ['Tech Training', 'Projects', 'Community', 'Industry News', 'Success Stories'];
        }
        return Array.from(set);
    }, [articles]);

    // Statistics calculated from current data / pagination
    const stats = useMemo(() => {
        const publishedCount = articles.filter(a => a.status === 'published').length;
        const draftCount = articles.filter(a => a.status !== 'published').length;
        return {
            total: pagination.total || articles.length,
            published: publishedCount,
            draft: draftCount,
            categories: allCategories.length,
        };
    }, [articles, pagination.total, allCategories]);

    // Quick toggle publish / draft
    const handleToggleStatus = async (article) => {
        const newStatus = article.status === 'published' ? 'draft' : 'published';
        setActionLoadingId(article.id);
        try {
            await blogService.updateArticle(article.id, { status: newStatus });
            setArticles(prev => prev.map(a => a.id === article.id ? { ...a, status: newStatus } : a));
            dispatch(addNotification({
                type: 'success',
                message: `Article marked as ${newStatus}`
            }));
        } catch (err) {
            dispatch(addNotification({
                type: 'error',
                message: err.response?.data?.error?.message || err.message || 'Failed to update status'
            }));
        } finally {
            setActionLoadingId(null);
        }
    };

    // Handle delete article
    const handleDeleteArticle = (article) => {
        dispatch(openConfirmDialog({
            title: 'Delete Article',
            message: `Are you sure you want to permanently delete "${article.title}"? This action cannot be undone.`,
            confirmText: 'Delete',
            cancelText: 'Cancel',
            onConfirm: async () => {
                setActionLoadingId(article.id);
                try {
                    await blogService.deleteArticle(article.id);
                    dispatch(addNotification({
                        type: 'success',
                        message: 'Article deleted successfully'
                    }));
                    loadArticles();
                } catch (err) {
                    dispatch(addNotification({
                        type: 'error',
                        message: err.response?.data?.error?.message || err.message || 'Failed to delete article'
                    }));
                } finally {
                    setActionLoadingId(null);
                }
            }
        }));
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex justify-between items-center bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm mb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-2.5 rounded-lg shrink-0">
                                <BookOpen size={20} className="text-[#004fa2]" />
                            </div>
                            <div>
                                <h1 className="text-sm md:text-lg font-bold text-gray-900 leading-tight">Blog Management</h1>
                                <p className="text-[11px] text-gray-500">Live article publishing, editing, and media controls</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={loadArticles}
                                disabled={loading}
                                title="Refresh articles"
                                className="p-2 text-gray-500 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                            </button>
                            <button
                                onClick={() => navigate('/admin/blog/new')}
                                className="bg-[#004fa2] hover:bg-blue-800 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
                            >
                                <Plus size={16} />
                                <span className="text-xs hidden sm:inline">New Article</span>
                            </button>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        {[
                            { title: 'Total Articles', count: stats.total, icon: FileText, cColor: 'text-blue-600', bg: 'bg-blue-50' },
                            { title: 'Published', count: stats.published, icon: CheckCircle, cColor: 'text-green-600', bg: 'bg-green-50' },
                            { title: 'Drafts', count: stats.draft, icon: AlertCircle, cColor: 'text-amber-600', bg: 'bg-amber-50' },
                            { title: 'Categories', count: stats.categories, icon: Tag, cColor: 'text-purple-600', bg: 'bg-purple-50' }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 flex items-center justify-start gap-3 shadow-sm hover:border-[#004fa2] transition-colors">
                                <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${stat.bg}`}>
                                    <stat.icon className={stat.cColor} size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide truncate">{stat.title}</p>
                                    <p className="text-base font-bold text-gray-900 leading-none">{stat.count}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Search and Filter Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        {/* Search Input */}
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <Filter size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                            >
                                <option value="all">All Categories</option>
                                {allCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <Filter size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <select
                                value={selectedStatus}
                                onChange={(e) => {
                                    setSelectedStatus(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                            >
                                <option value="all">All Statuses</option>
                                <option value="published">Published Only</option>
                                <option value="draft">Drafts Only</option>
                            </select>
                        </div>
                    </div>

                    {/* Articles Table / Mobile Cards */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-[40%]">Article</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Author</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-right text-[10px] font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-16 text-center">
                                                <Loader2 size={32} className="animate-spin text-[#004fa2] mx-auto mb-2" />
                                                <p className="text-xs text-gray-500">Loading articles from live database...</p>
                                            </td>
                                        </tr>
                                    ) : articles.length > 0 ? (
                                        articles.map((article) => {
                                            const isActionLoading = actionLoadingId === article.id;
                                            return (
                                                <tr key={article.id} className="hover:bg-gray-50/80 transition-colors group">
                                                    {/* Title & Image */}
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                decoding="async"
                                                                src={article.image}
                                                                alt=""
                                                                aria-hidden="true"
                                                                className="w-10 h-10 rounded-lg shrink-0 object-cover border border-gray-200 shadow-2xs"
                                                                onError={(e) => { e.currentTarget.src = '/images/image1.webp'; }}
                                                            />
                                                            <div className="min-w-0 flex-1">
                                                                <button
                                                                    onClick={() => navigate(`/admin/blog/${article.id}`)}
                                                                    className="text-left font-bold text-gray-900 text-xs line-clamp-1 group-hover:text-[#004fa2] transition-colors"
                                                                >
                                                                    {article.title}
                                                                </button>
                                                                <p className="text-gray-500 text-[10px] mt-0.5 truncate">{article.readingTime} • /{article.slug}</p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Category */}
                                                    <td className="px-4 py-3">
                                                        <span className="inline-block bg-blue-50 text-[#004fa2] text-[9px] font-bold px-2 py-0.5 rounded border border-blue-200 uppercase whitespace-nowrap">
                                                            {article.category}
                                                        </span>
                                                    </td>

                                                    {/* Author */}
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-1.5">
                                                            <img
                                                                decoding="async"
                                                                src={article.authorAvatar || '/images/image1.webp'}
                                                                alt=""
                                                                aria-hidden="true"
                                                                className="w-5 h-5 rounded-full shrink-0 border border-gray-200 object-cover"
                                                                onError={(e) => { e.currentTarget.src = '/images/image1.webp'; }}
                                                            />
                                                            <span className="text-[11px] text-gray-700 font-medium whitespace-nowrap truncate max-w-[100px]">
                                                                {article.authorName}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Date */}
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-1 text-[10px] text-gray-500 whitespace-nowrap">
                                                            <Calendar size={11} className="text-gray-400" />
                                                            {article.date || 'Unpublished'}
                                                        </div>
                                                    </td>

                                                    {/* Status & Quick Toggle */}
                                                    <td className="px-4 py-3">
                                                        <button
                                                            onClick={() => handleToggleStatus(article)}
                                                            disabled={isActionLoading}
                                                            title={`Click to ${article.status === 'published' ? 'unpublish' : 'publish'}`}
                                                            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                                                        >
                                                            <StatusBadge status={article.status} />
                                                        </button>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-4 py-3 text-right">
                                                        <div className="flex justify-end items-center gap-1">
                                                            {isActionLoading ? (
                                                                <Loader2 size={14} className="animate-spin text-gray-400" />
                                                            ) : (
                                                                <>
                                                                    <button
                                                                        onClick={() => navigate(`/admin/blog/${article.id}`)}
                                                                        title="View Details"
                                                                        className="p-1.5 text-gray-500 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                                    >
                                                                        <Eye size={15} />
                                                                    </button>
                                                                    {article.status === 'published' && (
                                                                        <button
                                                                            onClick={() => window.open(`/blog/${article.slug}`, '_blank')}
                                                                            title="View Public Page"
                                                                            className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                                        >
                                                                            <ExternalLink size={15} />
                                                                        </button>
                                                                    )}
                                                                    <button
                                                                        onClick={() => navigate(`/admin/blog/edit/${article.id}`)}
                                                                        title="Edit Article"
                                                                        className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                                    >
                                                                        <Edit size={15} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteArticle(article)}
                                                                        title="Delete Article"
                                                                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                    >
                                                                        <Trash2 size={15} />
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-14 text-center">
                                                <FileText size={42} className="mx-auto text-gray-300 mb-2" />
                                                <p className="text-sm font-semibold text-gray-700">No articles found</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all'
                                                        ? 'Try clearing your filters or search terms.'
                                                        : 'Get started by creating your first blog article!'}
                                                </p>
                                                <button
                                                    onClick={() => navigate('/admin/blog/new')}
                                                    className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#004fa2] text-white text-xs font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-xs"
                                                >
                                                    <Plus size={14} />
                                                    Create Article
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
                            <p>
                                Showing {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, pagination.total)} of {pagination.total} articles
                            </p>
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1 || loading}
                                    className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg font-semibold text-gray-800">
                                    {currentPage} / {pagination.totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                                    disabled={currentPage === pagination.totalPages || loading}
                                    className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default BlogManagementPage;
