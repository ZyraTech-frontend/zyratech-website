/**
 * Blog Article Form Page (Admin)
 * Form for creating and editing blog articles with live backend API & image upload.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import blogService from '../../../services/blogService';
import {
    ArrowLeft,
    Save,
    X,
    FileText,
    Calendar,
    Image as ImageIcon,
    AlertCircle,
    Loader2,
    Upload,
    CheckCircle2
} from 'lucide-react';

const CATEGORIES = [
    'Tech Training',
    'Projects',
    'Community',
    'Industry News',
    'Success Stories'
];

const BlogFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isEditing = Boolean(id && id !== 'new');
    const fileInputRef = useRef(null);

    const [loadingArticle, setLoadingArticle] = useState(isEditing);
    const [submitting, setSubmitting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: 'Tech Training',
        excerpt: '',
        content: '',
        author: 'ZyraTech Team',
        authorAvatar: '/images/image1.webp',
        coverImageUrl: '',
        status: 'draft',
        featured: false,
    });

    const [errors, setErrors] = useState({});

    // Fetch existing article if editing
    useEffect(() => {
        if (!isEditing) return;

        const fetchArticle = async () => {
            setLoadingArticle(true);
            try {
                const article = await blogService.getAdminArticleById(id);
                if (article) {
                    setFormData({
                        title: article.title || '',
                        slug: article.slug || '',
                        category: article.category || 'Tech Training',
                        excerpt: article.excerpt || '',
                        content: article.content || '',
                        author: article.authorName || 'ZyraTech Team',
                        authorAvatar: article.authorAvatar || '/images/image1.webp',
                        coverImageUrl: article.coverImageUrl || article.image || '',
                        status: article.status || 'draft',
                        featured: Boolean(article.featured),
                    });
                }
            } catch (err) {
                console.error('Failed to load article:', err);
                dispatch(addNotification({
                    type: 'error',
                    message: err.response?.data?.error?.message || err.message || 'Failed to load article details'
                }));
                navigate('/admin/blog');
            } finally {
                setLoadingArticle(false);
            }
        };

        fetchArticle();
    }, [id, isEditing, dispatch, navigate]);

    // Handle slug auto-generation from title
    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            // Only auto-generate slug if it was previously empty or matches auto pattern
            slug: !prev.slug || prev.slug === generateSlug(prev.title) ? generateSlug(title) : prev.slug
        }));
        if (errors.title) {
            setErrors(prev => ({ ...prev, title: '' }));
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Handle File Upload to S3
    const handleFileSelect = async (file) => {
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            dispatch(addNotification({
                type: 'error',
                message: 'Please upload a valid image file (PNG, JPG, WebP, etc.).'
            }));
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            dispatch(addNotification({
                type: 'error',
                message: 'Image size should not exceed 10MB.'
            }));
            return;
        }

        setUploadingImage(true);
        try {
            const uploadedUrl = await blogService.uploadCoverImage(file);
            setFormData(prev => ({ ...prev, coverImageUrl: uploadedUrl }));
            dispatch(addNotification({
                type: 'success',
                message: 'Cover image uploaded successfully'
            }));
        } catch (err) {
            console.error('Image upload failed:', err);
            dispatch(addNotification({
                type: 'error',
                message: err.response?.data?.error?.message || err.message || 'Failed to upload cover image'
            }));
        } finally {
            setUploadingImage(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
        if (!formData.content.trim()) newErrors.content = 'Article content is required';
        if (!formData.author.trim()) newErrors.author = 'Author name is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            dispatch(addNotification({
                type: 'error',
                message: 'Please resolve the highlighted validation errors.'
            }));
            return;
        }

        setSubmitting(true);
        try {
            // Build payload for backend
            const tags = [
                formData.category,
                ...(formData.featured ? ['featured'] : [])
            ].filter(Boolean);

            const payload = {
                title: formData.title.trim(),
                slug: formData.slug.trim(),
                content: formData.content.trim(),
                excerpt: formData.excerpt.trim(),
                coverImageUrl: formData.coverImageUrl || undefined,
                author: formData.author.trim(),
                tags,
                status: formData.status || 'draft'
            };

            if (isEditing) {
                await blogService.updateArticle(id, payload);
                dispatch(addNotification({
                    type: 'success',
                    message: 'Article updated successfully!'
                }));
            } else {
                await blogService.createArticle(payload);
                dispatch(addNotification({
                    type: 'success',
                    message: 'Article created successfully!'
                }));
            }

            navigate('/admin/blog');
        } catch (err) {
            console.error('Failed to save article:', err);
            const errMsg = err.response?.data?.error?.message ||
                err.response?.data?.message ||
                err.message ||
                'Failed to save article';
            dispatch(addNotification({
                type: 'error',
                message: errMsg
            }));
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingArticle) {
        return (
            <AdminLayout>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 size={36} className="animate-spin text-[#004fa2] mx-auto mb-3" />
                        <p className="text-sm font-semibold text-gray-700">Loading article data...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <button
                            onClick={() => navigate('/admin/blog')}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            title="Back to Blog"
                        >
                            <ArrowLeft size={22} className="text-gray-700" />
                        </button>
                        <div>
                            <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                                {isEditing ? 'Edit Article' : 'Create New Article'}
                            </h1>
                            <p className="text-gray-500 text-xs mt-0.5">
                                {isEditing ? 'Update article details, cover image, and publishing status' : 'Draft a new blog article for your website'}
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 md:p-8 space-y-8">
                            {/* Basic Information Section */}
                            <div>
                                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText size={20} className="text-[#004fa2]" />
                                    Basic Information
                                </h2>

                                <div className="space-y-4">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                                            Article Title *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleTitleChange}
                                            placeholder="e.g. Transforming Tech Education in Ghana"
                                            className={`w-full px-3.5 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all ${
                                                errors.title ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                                            }`}
                                        />
                                        {errors.title && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={13} />
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>

                                    {/* Slug */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                                            URL Slug *
                                        </label>
                                        <div className="flex items-center gap-1 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 font-mono text-xs text-gray-600">
                                            <span className="text-gray-400">/blog/</span>
                                            <input
                                                type="text"
                                                name="slug"
                                                value={formData.slug}
                                                onChange={handleChange}
                                                placeholder="article-url-slug"
                                                className="bg-transparent flex-1 outline-none text-gray-800"
                                            />
                                        </div>
                                        {errors.slug && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={13} />
                                                {errors.slug}
                                            </p>
                                        )}
                                    </div>

                                    {/* Category & Status */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                                                Category *
                                            </label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className={`w-full px-3.5 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all ${
                                                    errors.category ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                            >
                                                {CATEGORIES.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                                                Publishing Status
                                            </label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all"
                                            >
                                                <option value="draft">Draft (Visible only to admins)</option>
                                                <option value="published">Published (Live on website)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Excerpt */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                                            Excerpt (Summary) *
                                        </label>
                                        <textarea
                                            name="excerpt"
                                            value={formData.excerpt}
                                            onChange={handleChange}
                                            placeholder="Enter a brief teaser summary of the article..."
                                            rows="2"
                                            className={`w-full px-3.5 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none resize-none transition-all ${
                                                errors.excerpt ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                                            }`}
                                        />
                                        {errors.excerpt && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={13} />
                                                {errors.excerpt}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Cover Image Section */}
                            <div className="border-t border-gray-100 pt-6">
                                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <ImageIcon size={20} className="text-[#004fa2]" />
                                    Featured Cover Image
                                </h2>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            handleFileSelect(e.target.files[0]);
                                        }
                                    }}
                                />

                                <div
                                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                                    onDragLeave={() => setIsDragOver(false)}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                                        isDragOver ? 'border-[#004fa2] bg-blue-50/30' : 'border-gray-200 hover:border-[#004fa2]'
                                    }`}
                                >
                                    {uploadingImage ? (
                                        <div className="py-8 flex flex-col items-center">
                                            <Loader2 size={32} className="animate-spin text-[#004fa2] mb-2" />
                                            <p className="text-xs font-semibold text-gray-700">Uploading cover image to cloud storage...</p>
                                        </div>
                                    ) : formData.coverImageUrl ? (
                                        <div className="relative group">
                                            <img
                                                decoding="async"
                                                src={formData.coverImageUrl}
                                                alt="Cover preview"
                                                className="w-full max-h-64 object-cover rounded-lg shadow-2xs"
                                                onError={(e) => { e.currentTarget.src = '/images/image1.webp'; }}
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        fileInputRef.current?.click();
                                                    }}
                                                    className="px-3 py-1.5 bg-white text-gray-800 text-xs font-semibold rounded-lg shadow-sm hover:bg-gray-100"
                                                >
                                                    Change Image
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFormData(prev => ({ ...prev, coverImageUrl: '' }));
                                                    }}
                                                    className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-red-700"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <p className="text-[11px] text-gray-500 mt-2 flex items-center justify-center gap-1">
                                                <CheckCircle2 size={13} className="text-green-600" /> Image uploaded. Click to change.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="py-6">
                                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 text-[#004fa2]">
                                                <Upload size={22} />
                                            </div>
                                            <p className="text-xs font-bold text-gray-800">
                                                Click to upload cover image or drag and drop
                                            </p>
                                            <p className="text-[11px] text-gray-400 mt-1">
                                                PNG, JPG, WebP up to 10MB
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="border-t border-gray-100 pt-6">
                                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText size={20} className="text-[#004fa2]" />
                                    Article Content *
                                </h2>

                                <div>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        placeholder="Write full article body here (Markdown formatting is supported)..."
                                        rows="12"
                                        className={`w-full px-3.5 py-3 border rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none font-sans text-sm transition-all leading-relaxed ${
                                            errors.content ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                                        }`}
                                    />
                                    {errors.content && (
                                        <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                            <AlertCircle size={13} />
                                            {errors.content}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Author & Extras Section */}
                            <div className="border-t border-gray-100 pt-6">
                                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Calendar size={20} className="text-[#004fa2]" />
                                    Author & Featured Status
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                                            Author Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="author"
                                            value={formData.author}
                                            onChange={handleChange}
                                            placeholder="e.g. ZyraTech Team or John Doe"
                                            className={`w-full px-3.5 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all ${
                                                errors.author ? 'border-red-500' : 'border-gray-200'
                                            }`}
                                        />
                                        {errors.author && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={13} />
                                                {errors.author}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center pt-5">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="featured"
                                                checked={formData.featured}
                                                onChange={handleChange}
                                                className="w-4 h-4 rounded border-gray-300 text-[#004fa2] focus:ring-[#004fa2]"
                                            />
                                            <div>
                                                <span className="text-xs font-bold text-gray-800">Featured Article</span>
                                                <p className="text-[11px] text-gray-500">Highlight as main post on the public blog</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions Footer */}
                        <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/blog')}
                                disabled={submitting}
                                className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1.5"
                            >
                                <X size={15} />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting || uploadingImage}
                                className="px-5 py-2 bg-[#004fa2] hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 size={15} className="animate-spin" />
                                        Saving Article...
                                    </>
                                ) : (
                                    <>
                                        <Save size={15} />
                                        {isEditing ? 'Update Article' : 'Create Article'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default BlogFormPage;
