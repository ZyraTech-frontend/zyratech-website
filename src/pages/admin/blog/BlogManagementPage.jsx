/**
 * Blog Management Page (Admin)
 * Professional admin interface for managing blog articles
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import { articlesData } from '../../../data/articlesData';
import {
    FileText,
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    Calendar,
    User,
    Tag,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    X,
    BookOpen,
    TrendingUp,
    Star,
    Clock,
    ExternalLink,
    CheckCircle,
    AlertCircle,
    Zap
} from 'lucide-react';

// Status badge component
const StatusBadge = ({ published = true }) => {
    if (published) {
        return (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-green-200 text-[9px] font-bold uppercase bg-green-50 text-green-700">
                <CheckCircle size={10} />
                Published
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-gray-200 text-[9px] font-bold uppercase bg-gray-50 text-gray-600">
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
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [articles, setArticles] = useState(articlesData);

    // Redirect to form when modal is opened
    useEffect(() => {
        if (showModal) {
            navigate('/admin/blog/new');
            setShowModal(false);
        }
    }, [showModal, navigate]);

    const itemsPerPage = 5;

    // Get all unique categories
    const allCategories = useMemo(() => {
        const categories = [...new Set(articles.map(a => a.category))];
        return categories;
    }, [articles]);

    // Filter and search articles
    const filteredArticles = useMemo(() => {
        let result = [...articles];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(article =>
                article.title.toLowerCase().includes(query) ||
                article.excerpt.toLowerCase().includes(query) ||
                article.author.name.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(article => article.category === selectedCategory);
        }

        // Sort by date (newest first)
        result.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });

        return result;
    }, [searchQuery, selectedCategory, articles]);

    // Pagination
    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
    const paginatedArticles = filteredArticles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => ({
        total: articles.length,
        published: articles.filter(a => a.featured || true).length, // Assume all are published for now
        draft: articles.filter(a => !a.featured).length,
        categories: allCategories.length,
        thisMonth: articles.filter(a => a.date.includes('2026')).length
    }), [articles, allCategories]);

    // Handle delete article
    const handleDeleteArticle = (id) => {
        dispatch(openConfirmDialog({
            title: 'Delete Article',
            message: 'Are you sure you want to delete this article? This action cannot be undone.',
            confirmText: 'Delete',
            cancelText: 'Cancel',
            onConfirm: () => {
                setArticles(articles.filter(a => a.id !== id));
            }
        }));
    };

    // Handle view article details
    const handleViewArticle = (id) => {
        navigate(`/admin/blog/${id}`);
    };

    // Handle edit article
    const handleEditArticle = (id) => {
        navigate(`/admin/blog/edit/${id}`);
    };

    // Handle view public page
    const handleViewPublic = (slug) => {
        window.open(`/blog/${slug}`, '_blank');
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex justify-between items-center bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm mb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                                <BookOpen size={18} className="text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-sm md:text-base font-bold text-gray-900 leading-tight">Blog Management</h1>
                                <p className="text-[10px] text-gray-500">Manage blog articles</p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/admin/blog/new')}
                            className="bg-[#004fa2] hover:bg-blue-800 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
                        >
                            <Plus size={16} />
                            <span className="text-xs hidden sm:inline">New Article</span>
                        </button>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        {[
                            { title: 'Total', count: stats.total, icon: FileText, cColor: 'text-blue-600', bg: 'bg-blue-50' },
                            { title: 'Live', count: stats.published, icon: CheckCircle, cColor: 'text-green-600', bg: 'bg-green-50' },
                            { title: 'Drafts', count: stats.draft, icon: AlertCircle, cColor: 'text-amber-600', bg: 'bg-amber-50' },
                            { title: 'Types', count: stats.categories, icon: Tag, cColor: 'text-purple-600', bg: 'bg-purple-50' }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-xl p-2.5 flex items-center justify-start gap-2.5 shadow-sm hover:border-[#004fa2] transition-colors cursor-pointer">
                                <div className={`w-7 h-7 rounded-md shrink-0 flex items-center justify-center ${stat.bg}`}>
                                    <stat.icon className={stat.cColor} size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide truncate">{stat.title}</p>
                                    <p className="text-sm font-bold text-gray-900 leading-none">{stat.count}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Search and Filter Section */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {/* Search Input */}
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <Filter size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                            >
                                <option value="all">All Categories</option>
                                {allCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Articles Table / Mobile Cards */}
                    <div className="bg-transparent md:bg-white md:rounded-xl md:shadow-sm md:border border-gray-100 overflow-hidden">
                        <div className="overflow-x-visible md:overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="hidden md:table-header-group bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-[45%]">Title</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Author</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-right text-[10px] font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="flex flex-col md:table-row-group divide-y-0 md:divide-y divide-gray-100">
                                    {paginatedArticles.length > 0 ? (
                                        paginatedArticles.map((article) => (
                                            <tr key={article.id} className="flex flex-wrap items-center md:table-row bg-white rounded-xl shadow-sm border border-gray-100 md:border-none md:shadow-none mb-3 md:mb-0 hover:bg-gray-50/80 transition-colors group p-3 md:p-0 gap-x-3 gap-y-1">
                                                
                                                {/* Title & Image - Full width on mobile */}
                                                <td className="w-full md:w-auto md:table-cell md:px-4 md:py-3 mb-1 md:mb-0">
                                                    <div className="flex items-start md:items-center gap-3">
                                                        <img decoding="async"
                                                            src={article.image}
                                                            alt=""
                                                            aria-hidden="true"
                                                            className="w-10 h-10 md:w-10 md:h-10 rounded shrink-0 object-cover border border-gray-200"
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <p className="font-bold text-gray-900 text-sm md:text-xs line-clamp-2 leading-snug group-hover:text-[#004fa2] transition-colors">{article.title}</p>
                                                            <p className="text-gray-500 text-[10px] mt-0.5">{article.readingTime}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Category */}
                                                <td className="w-auto md:table-cell md:px-4 md:py-3">
                                                    <span className="inline-block bg-blue-50 text-blue-700 text-[9px] font-bold px-1.5 py-[1px] rounded border border-blue-200 uppercase whitespace-nowrap">
                                                        {article.category}
                                                    </span>
                                                </td>

                                                {/* Author */}
                                                <td className="w-auto md:table-cell md:px-4 md:py-3">
                                                    <div className="flex items-center gap-1.5 border-l border-gray-200 pl-3 md:border-l-0 md:pl-0">
                                                        <img decoding="async"
                                                            src={article.author.avatar}
                                                            alt=""
                                                            aria-hidden="true"
                                                            className="w-4 h-4 md:w-6 md:h-6 rounded-full shrink-0 border border-gray-200"
                                                        />
                                                        <span className="text-[11px] text-gray-700 font-medium whitespace-nowrap">{article.author.name}</span>
                                                    </div>
                                                </td>

                                                {/* Date */}
                                                <td className="w-auto md:table-cell md:px-4 md:py-3">
                                                    <div className="flex items-center gap-1 text-[10px] text-gray-500 whitespace-nowrap border-l border-gray-200 pl-3 md:border-l-0 md:pl-0">
                                                        <Calendar size={10} className="text-gray-400" />
                                                        {article.date}
                                                    </div>
                                                </td>

                                                {/* Status */}
                                                <td className="w-auto md:table-cell md:px-4 md:py-3">
                                                    <div className="border-l border-gray-200 pl-3 md:border-l-0 md:pl-0">
                                                        <StatusBadge published={article.featured} />
                                                    </div>
                                                </td>

                                                {/* Actions - Flow to bottom on mobile */}
                                                <td className="w-full md:w-auto md:table-cell md:px-4 md:py-3 mt-2 md:mt-0 pt-2 border-t border-gray-100 md:border-none">
                                                    <div className="flex justify-end gap-2 md:gap-1">
                                                        <button
                                                            onClick={() => handleViewArticle(article.id)}
                                                            title="View Details"
                                                            className="p-1 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-gray-500 hover:text-[#004fa2] shadow-none md:shadow-sm"
                                                        >
                                                            <Eye size={16} className="md:w-3.5 md:h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleViewPublic(article.slug)}
                                                            title="View Public Page"
                                                            className="p-1 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-gray-500 hover:text-green-600 shadow-none md:shadow-sm"
                                                        >
                                                            <ExternalLink size={16} className="md:w-3.5 md:h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEditArticle(article.id)}
                                                            title="Edit"
                                                            className="p-1 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-gray-500 hover:text-amber-600 shadow-none md:shadow-sm"
                                                        >
                                                            <Edit size={16} className="md:w-3.5 md:h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteArticle(article.id)}
                                                            title="Delete"
                                                            className="p-1 flex items-center justify-center hover:bg-red-50 rounded transition-colors text-red-500 hover:text-red-700 shadow-none md:shadow-sm"
                                                        >
                                                            <Trash2 size={16} className="md:w-3.5 md:h-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center">
                                                <FileText size={48} className="mx-auto text-gray-300 mb-3" />
                                                <p className="text-gray-500 text-base font-medium">No articles found</p>
                                                <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                                            currentPage === i + 1
                                                ? 'bg-blue-600 text-white'
                                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}

                    {/* Footer Info */}
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredArticles.length)} of {filteredArticles.length} articles
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default BlogManagementPage;
