/**
 * Blog Article Details Page (Admin)
 * Display detailed blog article information with live editing and publishing controls
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import blogService from '../../../services/blogService';
import {
    ArrowLeft,
    Edit,
    Trash2,
    ExternalLink,
    Calendar,
    Tag,
    Clock,
    Eye,
    EyeOff,
    CheckCircle,
    AlertCircle,
    Star,
    Loader2,
    FileText
} from 'lucide-react';

const BlogDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const data = await blogService.getAdminArticleById(id);
                setArticle(data);
            } catch (err) {
                console.error('Failed to load article:', err);
                dispatch(addNotification({
                    type: 'error',
                    message: err.response?.data?.error?.message || err.message || 'Article not found'
                }));
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchArticle();
        }
    }, [id, dispatch]);

    const isPublished = article?.status === 'published';

    const handleDelete = () => {
        dispatch(openConfirmDialog({
            title: 'Delete Article',
            message: `Are you sure you want to permanently delete "${article?.title}"? This action cannot be undone.`,
            confirmText: 'Delete',
            cancelText: 'Cancel',
            onConfirm: async () => {
                setActionLoading(true);
                try {
                    await blogService.deleteArticle(id);
                    dispatch(addNotification({
                        type: 'success',
                        message: 'Article deleted successfully'
                    }));
                    navigate('/admin/blog');
                } catch (err) {
                    dispatch(addNotification({
                        type: 'error',
                        message: err.response?.data?.error?.message || err.message || 'Failed to delete article'
                    }));
                } finally {
                    setActionLoading(false);
                }
            }
        }));
    };

    const handleTogglePublish = async () => {
        const newStatus = isPublished ? 'draft' : 'published';
        setActionLoading(true);
        try {
            const updated = await blogService.updateArticle(id, { status: newStatus });
            setArticle(updated);
            dispatch(addNotification({
                type: 'success',
                message: `Article ${newStatus === 'published' ? 'published' : 'moved to drafts'}`
            }));
        } catch (err) {
            dispatch(addNotification({
                type: 'error',
                message: err.response?.data?.error?.message || err.message || 'Failed to update publication status'
            }));
        } finally {
            setActionLoading(false);
        }
    };

    const handleViewPublic = () => {
        if (article?.slug) {
            window.open(`/blog/${article.slug}`, '_blank');
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 size={36} className="animate-spin text-[#004fa2] mx-auto mb-3" />
                        <p className="text-sm font-semibold text-gray-700">Loading article details...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (!article) {
        return (
            <AdminLayout>
                <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                        <h2 className="text-xl font-bold text-gray-900">Article Not Found</h2>
                        <p className="text-gray-500 text-sm mt-1">The requested article could not be loaded from the database.</p>
                        <button
                            onClick={() => navigate('/admin/blog')}
                            className="mt-6 px-4 py-2 bg-[#004fa2] text-white text-xs font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
                        >
                            Back to Blog Articles
                        </button>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header with Back Button */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/admin/blog')}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                title="Back to Blog"
                            >
                                <ArrowLeft size={22} className="text-gray-700" />
                            </button>
                            <div>
                                <h1 className="text-lg md:text-2xl font-bold text-gray-900 line-clamp-1">{article.title}</h1>
                                <p className="text-gray-500 text-xs mt-0.5">Article Details & Publishing Overview</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => navigate(`/admin/blog/edit/${article.id}`)}
                                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                            >
                                <Edit size={14} />
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={actionLoading}
                                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                            >
                                <Trash2 size={14} />
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Featured Cover Image */}
                    {article.image && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            <img
                                decoding="async"
                                src={article.image}
                                alt={article.title}
                                className="w-full max-h-96 object-cover"
                                onError={(e) => { e.currentTarget.src = '/images/image1.webp'; }}
                            />
                        </div>
                    )}

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Article Content - 2 columns */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Article Information Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <FileText size={18} className="text-[#004fa2]" />
                                    Article Summary
                                </h2>

                                <div className="space-y-4">
                                    {/* Category & Badges */}
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="inline-flex items-center gap-1 bg-blue-50 text-[#004fa2] font-bold px-2.5 py-1 rounded text-xs border border-blue-200 uppercase">
                                            <Tag size={12} />
                                            {article.category}
                                        </span>
                                        {article.featured && (
                                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded text-xs border border-amber-200">
                                                <Star size={12} className="fill-amber-500 text-amber-500" />
                                                Featured
                                            </span>
                                        )}
                                        <span className="inline-flex items-center gap-1 text-gray-500 text-xs px-2 py-1 bg-gray-50 rounded border border-gray-200">
                                            <Clock size={12} />
                                            {article.readingTime}
                                        </span>
                                    </div>

                                    {/* Excerpt */}
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Excerpt</p>
                                        <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-100 leading-relaxed italic">
                                            "{article.excerpt}"
                                        </p>
                                    </div>

                                    {/* Full Body Content */}
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Content Body</p>
                                        <div className="p-4 bg-gray-50/50 rounded-lg border border-gray-100 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">
                                            {article.content || '(No content body entered yet)'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Author Information Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Author Profile</h2>
                                <div className="flex items-center gap-4">
                                    <img
                                        decoding="async"
                                        src={article.authorAvatar || '/images/image1.webp'}
                                        alt={article.authorName}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-blue-100 shadow-2xs"
                                        onError={(e) => { e.currentTarget.src = '/images/image1.webp'; }}
                                    />
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{article.authorName}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Publisher & Author</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Date: <span className="font-semibold text-gray-600">{article.date || 'Unpublished'}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Actions & Metadata - 1 column */}
                        <div className="space-y-6">
                            {/* Publishing Status Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Status & Actions</h3>

                                <div className="space-y-4">
                                    {/* Status Badge */}
                                    <div className={`flex items-center gap-3 p-3.5 rounded-lg border ${
                                        isPublished
                                            ? 'bg-green-50 border-green-200 text-green-800'
                                            : 'bg-amber-50 border-amber-200 text-amber-800'
                                    }`}>
                                        {isPublished ? <CheckCircle size={20} className="text-green-600" /> : <AlertCircle size={20} className="text-amber-600" />}
                                        <div>
                                            <p className="text-xs font-bold uppercase">{isPublished ? 'Published Live' : 'Draft Mode'}</p>
                                            <p className="text-[11px] opacity-80">
                                                {isPublished ? 'Article is visible to all visitors' : 'Article is only visible to admins'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Quick Actions Buttons */}
                                    <div className="space-y-2 pt-2">
                                        {isPublished && (
                                            <button
                                                onClick={handleViewPublic}
                                                className="w-full flex items-center justify-center gap-2 px-3.5 py-2 bg-[#004fa2] hover:bg-blue-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
                                            >
                                                <ExternalLink size={14} />
                                                View Live Public Page
                                            </button>
                                        )}

                                        <button
                                            onClick={handleTogglePublish}
                                            disabled={actionLoading}
                                            className={`w-full flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors border ${
                                                isPublished
                                                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
                                                    : 'bg-green-600 hover:bg-green-700 text-white border-transparent shadow-xs'
                                            }`}
                                        >
                                            {actionLoading ? (
                                                <Loader2 size={14} className="animate-spin" />
                                            ) : isPublished ? (
                                                <>
                                                    <EyeOff size={14} />
                                                    Unpublish to Drafts
                                                </>
                                            ) : (
                                                <>
                                                    <Eye size={14} />
                                                    Publish Article Now
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* URL & Identification Metadata */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Metadata</h3>

                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Public URL Slug</label>
                                        <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 font-mono text-xs text-gray-700 break-all">
                                            /blog/{article.slug}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Database ID</label>
                                        <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 font-mono text-xs text-gray-500 break-all">
                                            {article.id}
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 space-y-1">
                                        <p>Created: {article.createdAt ? new Date(article.createdAt).toLocaleString() : 'N/A'}</p>
                                        <p>Updated: {article.updatedAt ? new Date(article.updatedAt).toLocaleString() : 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default BlogDetailsPage;
