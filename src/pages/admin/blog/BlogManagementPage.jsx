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
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <CheckCircle size={14} />
                Published
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
            <AlertCircle size={14} />
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

    const itemsPerPage = 8;

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
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <BookOpen size={32} className="text-blue-600" />
                                Blog Management
                            </h1>
                            <p className="text-gray-600 mt-1">Manage and publish blog articles</p>
                        </div>
                        <button
                            onClick={() => navigate('/admin/blog/new')}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 px-6 rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
                        >
                            <Plus size={20} />
                            New Article
                        </button>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
                        {/* Total Articles Card */}
                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200">
                            <div className="flex items-start justify-between mb-3">
                                <div className="bg-blue-50 rounded-lg p-2.5">
                                    <FileText size={20} className="text-blue-600" />
                                </div>
                                <span className="text-xs font-bold text-blue-500 uppercase">Total</span>
                            </div>
                            <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1">Total Articles</p>
                            <p className="text-3xl font-bold text-gray-900 mb-2">{stats.total}</p>
                            <p className="text-gray-500 text-xs">All articles</p>
                        </div>

                        {/* Published Card */}
                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200">
                            <div className="flex items-start justify-between mb-3">
                                <div className="bg-green-50 rounded-lg p-2.5">
                                    <CheckCircle size={20} className="text-green-600" />
                                </div>
                                <span className="text-xs font-bold text-green-500 uppercase">Live</span>
                            </div>
                            <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1">Published</p>
                            <p className="text-3xl font-bold text-gray-900 mb-2">{stats.published}</p>
                            <p className="text-gray-500 text-xs">Active articles</p>
                        </div>

                        {/* Drafts Card */}
                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200">
                            <div className="flex items-start justify-between mb-3">
                                <div className="bg-amber-50 rounded-lg p-2.5">
                                    <AlertCircle size={20} className="text-amber-600" />
                                </div>
                                <span className="text-xs font-bold text-amber-500 uppercase">Draft</span>
                            </div>
                            <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1">Drafts</p>
                            <p className="text-3xl font-bold text-gray-900 mb-2">{stats.draft}</p>
                            <p className="text-gray-500 text-xs">In progress</p>
                        </div>

                        {/* Categories Card */}
                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200">
                            <div className="flex items-start justify-between mb-3">
                                <div className="bg-purple-50 rounded-lg p-2.5">
                                    <Tag size={20} className="text-purple-600" />
                                </div>
                                <span className="text-xs font-bold text-purple-500 uppercase">Org</span>
                            </div>
                            <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1">Categories</p>
                            <p className="text-3xl font-bold text-gray-900 mb-2">{stats.categories}</p>
                            <p className="text-gray-500 text-xs">Content types</p>
                        </div>

                        {/* This Month Card */}
                        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200">
                            <div className="flex items-start justify-between mb-3">
                                <div className="bg-pink-50 rounded-lg p-2.5">
                                    <TrendingUp size={20} className="text-pink-600" />
                                </div>
                                <span className="text-xs font-bold text-pink-500 uppercase">Month</span>
                            </div>
                            <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1">This Month</p>
                            <p className="text-3xl font-bold text-gray-900 mb-2">{stats.thisMonth}</p>
                            <p className="text-gray-500 text-xs">New in Feb</p>
                        </div>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Search Input */}
                            <div className="relative">
                                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search articles by title, excerpt, author..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="relative">
                                <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        setSelectedCategory(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
                                >
                                    <option value="all">All Categories</option>
                                    {allCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Articles Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Author</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {paginatedArticles.length > 0 ? (
                                        paginatedArticles.map((article) => (
                                            <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={article.image}
                                                            alt={article.title}
                                                            className="w-12 h-12 rounded object-cover"
                                                        />
                                                        <div>
                                                            <p className="font-semibold text-gray-900 text-sm">{article.title}</p>
                                                            <p className="text-gray-600 text-xs">{article.readingTime}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                                                        {article.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={article.author.avatar}
                                                            alt={article.author.name}
                                                            className="w-8 h-8 rounded-full"
                                                        />
                                                        <span className="text-sm text-gray-900 font-medium">{article.author.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Calendar size={16} />
                                                        {article.date}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge published={article.featured} />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleViewArticle(article.id)}
                                                            title="View Details"
                                                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                                                        >
                                                            <Eye size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleViewPublic(article.slug)}
                                                            title="View Public Page"
                                                            className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600"
                                                        >
                                                            <ExternalLink size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEditArticle(article.id)}
                                                            title="Edit"
                                                            className="p-2 hover:bg-amber-100 rounded-lg transition-colors text-amber-600"
                                                        >
                                                            <Edit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteArticle(article.id)}
                                                            title="Delete"
                                                            className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                                                        >
                                                            <Trash2 size={18} />
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
