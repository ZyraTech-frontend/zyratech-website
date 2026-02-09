/**
 * Blog Article Form Page (Admin)
 * Form for creating and editing blog articles
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { articlesData, getCategories } from '../../../data/articlesData';
import {
    ArrowLeft,
    Save,
    X,
    FileText,
    Tag,
    User,
    Calendar,
    Star,
    Image as ImageIcon,
    AlertCircle
} from 'lucide-react';

const BlogFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = id && id !== 'new';

    const article = isEditing ? articlesData.find(a => a.id === parseInt(id)) : null;

    const [formData, setFormData] = useState({
        title: article?.title || '',
        category: article?.category || '',
        excerpt: article?.excerpt || '',
        date: article?.date || '',
        readingTime: article?.readingTime || '',
        author: article?.author?.name || '',
        authorAvatar: article?.author?.avatar || '/images/image1.png',
        featured: article?.featured || false,
        image: article?.image || '',
        slug: article?.slug || '',
        content: ''
    });

    const categories = getCategories().filter(cat => cat !== 'all');
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
        if (!formData.author.trim()) newErrors.author = 'Author name is required';
        if (!formData.date) newErrors.date = 'Publication date is required';
        if (!formData.readingTime.trim()) newErrors.readingTime = 'Reading time is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setSubmitting(false);
            navigate('/admin/blog');
        }, 1000);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

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
            slug: generateSlug(title)
        }));
        if (errors.title) {
            setErrors(prev => ({ ...prev, title: '' }));
        }
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8">
                        <button
                            onClick={() => navigate('/admin/blog')}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            title="Back to Blog"
                        >
                            <ArrowLeft size={24} className="text-gray-700" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {isEditing ? 'Edit Article' : 'Create New Article'}
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                {isEditing ? 'Update article information' : 'Add a new blog article to your site'}
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
                        <div className="p-8 space-y-8">
                            {/* Basic Information Section */}
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FileText size={24} className="text-blue-600" />
                                    Basic Information
                                </h2>

                                <div className="space-y-6">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Article Title *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleTitleChange}
                                            placeholder="Enter article title"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                                                errors.title ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.title && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>

                                    {/* Slug (Auto-generated) */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            URL Slug (Auto-generated)
                                        </label>
                                        <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg border border-gray-300 font-mono text-sm text-gray-700">
                                            /blog/{formData.slug || 'your-article-slug'}
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition-all ${
                                                errors.category ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                        {errors.category && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.category}
                                            </p>
                                        )}
                                    </div>

                                    {/* Excerpt */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Excerpt (Short Description) *
                                        </label>
                                        <textarea
                                            name="excerpt"
                                            value={formData.excerpt}
                                            onChange={handleChange}
                                            placeholder="Enter a brief summary of your article"
                                            rows="3"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all ${
                                                errors.excerpt ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        <p className="text-gray-600 text-xs mt-1">{formData.excerpt.length} characters</p>
                                        {errors.excerpt && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.excerpt}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Article Content Section */}
                            <div className="border-t border-gray-200 pt-8">
                                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <ImageIcon size={24} className="text-blue-600" />
                                    Article Content
                                </h2>

                                <div className="space-y-6">
                                    {/* Featured Image */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Featured Image
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                                            {formData.image ? (
                                                <img
                                                    src={formData.image}
                                                    alt="Preview"
                                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                                />
                                            ) : (
                                                <ImageIcon size={48} className="mx-auto text-gray-400 mb-2" />
                                            )}
                                            <p className="text-gray-600 font-medium">Click to upload image or drag and drop</p>
                                            <p className="text-gray-500 text-xs mt-1">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>

                                    {/* Article Content Editor */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Article Content
                                        </label>
                                        <textarea
                                            name="content"
                                            value={formData.content}
                                            onChange={handleChange}
                                            placeholder="Write your article content here... (Markdown supported)"
                                            rows="12"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none font-mono text-sm transition-all"
                                        />
                                        <p className="text-gray-600 text-xs mt-1">Markdown formatting is supported</p>
                                    </div>
                                </div>
                            </div>

                            {/* Publication Details Section */}
                            <div className="border-t border-gray-200 pt-8">
                                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Calendar size={24} className="text-blue-600" />
                                    Publication Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Author */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Author Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="author"
                                            value={formData.author}
                                            onChange={handleChange}
                                            placeholder="Enter author name"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                                                errors.author ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.author && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.author}
                                            </p>
                                        )}
                                    </div>

                                    {/* Author Avatar */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Author Avatar
                                        </label>
                                        <input
                                            type="text"
                                            name="authorAvatar"
                                            value={formData.authorAvatar}
                                            onChange={handleChange}
                                            placeholder="e.g., /images/author1.png"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        />
                                        <p className="text-gray-600 text-xs mt-1">Image path from /public/images/</p>
                                    </div>

                                    {/* Publication Date */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Publication Date *
                                        </label>
                                        <input
                                            type="text"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            placeholder="e.g., January 2026"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                                                errors.date ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.date && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.date}
                                            </p>
                                        )}
                                    </div>

                                    {/* Reading Time */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Reading Time *
                                        </label>
                                        <input
                                            type="text"
                                            name="readingTime"
                                            value={formData.readingTime}
                                            onChange={handleChange}
                                            placeholder="e.g., 5 min read"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                                                errors.readingTime ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.readingTime && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.readingTime}
                                            </p>
                                        )}
                                    </div>

                                    {/* Featured Toggle */}
                                    <div className="flex items-end">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="featured"
                                                checked={formData.featured}
                                                onChange={handleChange}
                                                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <div>
                                                <span className="text-sm font-semibold text-gray-700">Featured Article</span>
                                                <p className="text-xs text-gray-600">Show on homepage</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="bg-gray-50 px-8 py-6 flex gap-4 justify-end border-t border-gray-200 rounded-b-lg">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/blog')}
                                className="px-6 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                                <X size={20} />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                            >
                                <Save size={20} />
                                {submitting ? 'Saving...' : isEditing ? 'Update Article' : 'Create Article'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default BlogFormPage;
