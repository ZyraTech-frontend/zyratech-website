/**
 * Blog Article Details Page (Admin)
 * Display detailed blog article information with editing and publishing controls
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { articlesData } from '../../../data/articlesData';
import {
    ArrowLeft,
    Edit,
    Trash2,
    ExternalLink,
    Calendar,
    User,
    Tag,
    Clock,
    Eye,
    EyeOff,
    Share2,
    Download,
    CheckCircle,
    AlertCircle,
    Star
} from 'lucide-react';

const BlogDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const article = articlesData.find(a => a.id === parseInt(id));
    const [isPublished, setIsPublished] = useState(article?.featured || true);

    if (!article) {
        return (
            <AdminLayout>
                <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center py-12">
                            <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900">Article Not Found</h2>
                            <p className="text-gray-600 mt-2">The article you're looking for doesn't exist.</p>
                            <button
                                onClick={() => navigate('/admin/blog')}
                                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Back to Blog
                            </button>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    const handleDelete = () => {
        dispatch(openConfirmDialog({
            title: 'Delete Article',
            message: 'Are you sure you want to delete this article? This action cannot be undone.',
            confirmText: 'Delete',
            cancelText: 'Cancel',
            onConfirm: () => {
                navigate('/admin/blog');
            }
        }));
    };

    const handlePublish = () => {
        setIsPublished(!isPublished);
    };

    const handleViewPublic = () => {
        window.open(`/blog/${article.slug}`, '_blank');
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header with Back Button */}
                    <div className="flex items-center gap-3 mb-8">
                        <button
                            onClick={() => navigate('/admin/blog')}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            title="Back to Blog"
                        >
                            <ArrowLeft size={24} className="text-gray-700" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
                            <p className="text-gray-600 text-sm mt-1">Article Details & Management</p>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-96 object-cover"
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Article Content - 2 columns */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Article Information Card */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-6">Article Information</h2>
                                
                                <div className="space-y-6">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                                        <p className="text-base text-gray-900 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            {article.title}
                                        </p>
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                        <div className="flex items-center gap-2">
                                            <Tag size={18} className="text-gray-600" />
                                            <span className="inline-block bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-full text-sm">
                                                {article.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Excerpt */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt</label>
                                        <p className="text-sm text-gray-700 p-4 bg-gray-50 rounded-lg border border-gray-200 leading-relaxed">
                                            {article.excerpt}
                                        </p>
                                    </div>

                                    {/* Reading Time */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Reading Time</label>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Clock size={18} />
                                            <span>{article.readingTime}</span>
                                        </div>
                                    </div>

                                    {/* Featured Status */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Featured</label>
                                        <div className="flex items-center gap-2">
                                            {article.featured ? (
                                                <>
                                                    <Star size={18} className="text-amber-500 fill-amber-500" />
                                                    <span className="text-gray-900 font-medium">Featured Article</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Star size={18} className="text-gray-400" />
                                                    <span className="text-gray-600">Not Featured</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Author Information Card */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-6">Author Information</h2>
                                
                                <div className="flex items-center gap-4">
                                    <img
                                        src={article.author.avatar}
                                        alt={article.author.name}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                                    />
                                    <div>
                                        <p className="text-base font-semibold text-gray-900">{article.author.name}</p>
                                        <p className="text-sm text-gray-600 mt-1">Content Creator</p>
                                        <p className="text-xs text-gray-500 mt-2">Published on <span className="font-medium">{article.date}</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Publishing Status Card */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-6">Publishing Status</h2>
                                
                                <div className="space-y-4">
                                    {/* Status Badge */}
                                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                                        <CheckCircle size={24} className="text-green-600" />
                                        <div>
                                            <p className="font-semibold text-green-900">Published</p>
                                            <p className="text-sm text-green-700">Article is live on the website</p>
                                        </div>
                                    </div>

                                    {/* Publication Date */}
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <Calendar size={20} className="text-gray-600" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Publication Date</p>
                                            <p className="text-base font-semibold text-gray-900">{article.date}</p>
                                        </div>
                                    </div>

                                    {/* Slug for SEO */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">URL Slug</label>
                                        <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg border border-gray-300 font-mono text-sm text-gray-700">
                                            /blog/{article.slug}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Actions - 1 column */}
                        <div className="space-y-6">
                            {/* Quick Actions Card */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                                
                                <div className="space-y-3">
                                    {/* View Public Page */}
                                    <button
                                        onClick={handleViewPublic}
                                        className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
                                    >
                                        <ExternalLink size={20} />
                                        View Public
                                    </button>

                                    {/* Edit Article */}
                                    <button
                                        onClick={() => navigate(`/admin/blog/edit/${article.id}`)}
                                        className="w-full flex items-center gap-3 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all"
                                    >
                                        <Edit size={20} />
                                        Edit Article
                                    </button>

                                    {/* Publish Toggle */}
                                    <button
                                        onClick={handlePublish}
                                        className={`w-full flex items-center gap-3 px-4 py-3 font-semibold rounded-lg transition-all ${
                                            isPublished
                                                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                                : 'bg-green-600 hover:bg-green-700 text-white'
                                        }`}
                                    >
                                        {isPublished ? <Eye size={20} /> : <EyeOff size={20} />}
                                        {isPublished ? 'Unpublish' : 'Publish'}
                                    </button>

                                    {/* Delete Article */}
                                    <button
                                        onClick={handleDelete}
                                        className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all"
                                    >
                                        <Trash2 size={20} />
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* Article Stats Card */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Article Stats</h3>
                                
                                <div className="space-y-4">
                                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                        <p className="text-xs text-blue-600 font-semibold uppercase">Category</p>
                                        <p className="text-base font-semibold text-blue-900 mt-1">{article.category}</p>
                                    </div>

                                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                                        <p className="text-xs text-purple-600 font-semibold uppercase">Reading Time</p>
                                        <p className="text-base font-semibold text-purple-900 mt-1">{article.readingTime}</p>
                                    </div>

                                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                        <p className="text-xs text-green-600 font-semibold uppercase">Status</p>
                                        <p className="text-base font-semibold text-green-900 mt-1">Published</p>
                                    </div>
                                </div>
                            </div>

                            {/* Related Info Card */}
                            <div className="bg-blue-50 rounded-lg border-2 border-blue-200 p-6">
                                <h3 className="text-base font-bold text-blue-900 mb-3">Article ID</h3>
                                <div className="font-mono text-sm text-blue-800 bg-white p-2 rounded border border-blue-300 break-all">
                                    {article.id}
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
