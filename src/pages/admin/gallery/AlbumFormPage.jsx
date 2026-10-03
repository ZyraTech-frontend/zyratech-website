/**
 * Album Form Page (Admin)
 * Legacy form page - Use GalleryManagementPage modal for creating/editing albums instead
 * This page is kept for backwards compatibility but uses API instead of mock data
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import galleryService from '../../../services/galleryService';
import {
    ArrowLeft,
    Save,
    X,
    Tag,
    FileText,
    AlertCircle,
    Loader
} from 'lucide-react';

const AlbumFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = id && id !== 'new';
    const [isLoading, setIsLoading] = useState(isEditing);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        category: 'events',
        description: '',
        status: 'draft',
        cover: ''
    });

    // Fetch album if editing
    useEffect(() => {
        if (isEditing) {
            const fetchAlbum = async () => {
                try {
                    setIsLoading(true);
                    const album = await galleryService.getAlbum(id);
                    setFormData({
                        title: album.title || '',
                        category: album.category || 'events',
                        description: album.description || '',
                        status: album.status || 'draft',
                        cover: album.cover || ''
                    });
                } catch (err) {
                    console.error('Error fetching album:', err);
                    setError('Failed to load album');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchAlbum();
        }
    }, [id, isEditing]);

    const categories = ['events', 'training', 'community'];
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Album title is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            if (isEditing) {
                // Update existing album
                await galleryService.updateAlbum(id, {
                    title: formData.title,
                    category: formData.category,
                    description: formData.description,
                    status: formData.status
                });
            } else {
                // Create new album
                await galleryService.createAlbum({
                    title: formData.title,
                    category: formData.category,
                    description: formData.description
                });
            }
            navigate('/admin/gallery');
        } catch (err) {
            console.error('Error saving album:', err);
            setError('Failed to save album. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-3 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                        <button
                            onClick={() => navigate('/admin/gallery')}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            title="Back to Gallery"
                        >
                            <ArrowLeft size={24} className="text-gray-700" />
                        </button>
                        <div>
                            <h1 className="text-xl md:text-3xl font-bold text-gray-900">
                                {isEditing ? 'Edit Album' : 'Create New Album'}
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                {isEditing ? 'Update album information' : 'Create a new media album for your gallery'}
                            </p>
                        </div>
                    </div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex items-center justify-center py-12">
                            <Loader className="animate-spin text-[#004fa2]" size={40} />
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <p className="text-red-700 font-medium">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    {!isLoading && (
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
                        <div className="p-4 md:p-8 space-y-6 md:space-y-8">
                            {/* Basic Information Section */}
                            <div>
                                <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
                                    <FileText size={20} className="text-blue-600" />
                                    Album Information
                                </h2>

                                <div className="space-y-6">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Album Title *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Enter album title"
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
                                                <option key={cat} value={cat}>
                                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.category}
                                            </p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Description *
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Enter album description"
                                            rows="4"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all ${
                                                errors.description ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        <p className="text-gray-600 text-xs mt-1">{formData.description.length} characters</p>
                                        {errors.description && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Publication Details Section */}
                            <div className="border-t border-gray-200 pt-8">
                                <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
                                    <Tag size={20} className="text-blue-600" />
                                    Publication Settings
                                </h2>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Status
                                    </label>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                            <input
                                                type="radio"
                                                name="status"
                                                value="published"
                                                checked={formData.status === 'published'}
                                                onChange={handleChange}
                                                className="w-4 h-4"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Published</p>
                                                <p className="text-xs text-gray-600">Album is visible on website</p>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                            <input
                                                type="radio"
                                                name="status"
                                                value="draft"
                                                checked={formData.status === 'draft'}
                                                onChange={handleChange}
                                                className="w-4 h-4"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Draft</p>
                                                <p className="text-xs text-gray-600">Album is hidden from website</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="bg-gray-50 px-4 md:px-8 py-4 md:py-6 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 sm:justify-end border-t border-gray-200 rounded-b-lg">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/gallery')}
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
                                {submitting ? 'Saving...' : isEditing ? 'Update Album' : 'Create Album'}
                            </button>
                        </div>
                    </form>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AlbumFormPage;
