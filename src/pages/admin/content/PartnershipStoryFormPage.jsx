/**
 * Partnership Story Add/Edit Form Page
 * Dedicated page for creating and editing partnership stories
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    Loader,
    Upload,
    X
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import contentService from '../../../services/contentService';
import { useActivityLogger } from '../../../hooks/useActivityLogger';
import LinkPicker from '../../../components/admin/common/LinkPicker';

const PartnershipStoryFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { logAction } = useActivityLogger();
    
    const [loading, setLoading] = useState(!!id);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        impact: '',
        image: '',
        fallbackImage: '',
        link: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchStory();
        }
    }, [id]);

    const fetchStory = async () => {
        try {
            setLoading(true);
            // contentService.getPartnershipStory already returns the story object directly
            const story = await contentService.getPartnershipStory(id);
            setFormData({
                title: story.title || '',
                category: story.category || '',
                description: story.description || '',
                impact: story.impact || '',
                image: story.image || '',
                fallbackImage: story.fallbackImage || '',
                link: story.link || ''
            });
        } catch (err) {
            console.error('Error fetching story:', err);
            setError('Failed to load story');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be less than 5MB');
            return;
        }

        try {
            setUploading(true);
            setError(null);
            const imageUrl = await contentService.uploadImage(file);
            setFormData(prev => ({ ...prev, image: imageUrl }));
        } catch (err) {
            console.error('Upload error:', err);
            setError(err.message || 'Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, image: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title.trim() || !formData.category.trim() || !formData.description.trim() || !formData.impact.trim()) {
            setError('Title, category, story, and impact are required');
            return;
        }

        if (!formData.image) {
            setError('Please upload a story image');
            return;
        }

        try {
            setSaving(true);
            setError(null);

            if (id) {
                await contentService.updatePartnershipStory(id, formData);
                logAction({
                    type: 'content_updated',
                    severity: 'info',
                    description: `Updated partnership story: "${formData.title}"`,
                    details: { contentType: 'PartnershipStory', contentId: id }
                });
            } else {
                await contentService.createPartnershipStory(formData);
                logAction({
                    type: 'content_created',
                    severity: 'success',
                    description: `Created new partnership story: "${formData.title}"`,
                    details: { contentType: 'PartnershipStory' }
                });
            }

            navigate('/admin/content/partnership');
        } catch (err) {
            console.error('Error saving story:', err);
            setError(err.message || 'Failed to save story');
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate('/admin/content/partnership')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Go back"
                    >
                        <ArrowLeft size={24} className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {id ? 'Edit Partnership Story' : 'Add Partnership Story'}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {id ? 'Update story details' : 'Create a new partnership story'}
                        </p>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 flex items-center justify-center">
                        <Loader className="animate-spin text-[#004fa2]" size={32} />
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
                        {error}
                    </div>
                )}

                {/* Form */}
                {!loading && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Partner Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. Royal Klast Group"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                />
                            </div>

                            {/* Category (Partner Name) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Partner Category <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. Strategic Partner, Technology Partner"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                />
                            </div>

                            {/* Description (Story) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Partnership Story <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={5}
                                    placeholder="Describe the partnership story and collaboration..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] resize-none transition-all"
                                />
                            </div>

                            {/* Impact */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Impact <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="impact"
                                    value={formData.impact}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. Strategic Brand Integration, High-Impact Media Production"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Story Image <span className="text-red-500">*</span>
                                </label>
                                
                                {!formData.image ? (
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={uploading}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label
                                            htmlFor="image-upload"
                                            className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                                                uploading 
                                                    ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                                                    : 'border-gray-300 hover:border-[#004fa2] hover:bg-[#004fa2]/5'
                                            }`}
                                        >
                                            {uploading ? (
                                                <div className="flex flex-col items-center gap-2">
                                                    <Loader className="animate-spin text-[#004fa2]" size={32} />
                                                    <p className="text-sm text-gray-500">Uploading...</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <Upload className="mb-2 text-gray-400" size={40} />
                                                    <p className="text-sm text-gray-600 font-medium">Click to upload image</p>
                                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (max 5MB)</p>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <img 
                                            src={formData.image} 
                                            alt="Preview" 
                                            className="w-full h-48 object-cover rounded-lg border border-gray-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                            title="Remove image"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Fallback Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Fallback Image URL (Optional)
                                </label>
                                <input
                                    type="url"
                                    name="fallbackImage"
                                    value={formData.fallbackImage}
                                    onChange={handleInputChange}
                                    placeholder="https://images.unsplash.com/photo-..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                />
                                <p className="mt-1 text-xs text-gray-500">Backup image to display if main image fails to load</p>
                            </div>

                            {/* Link Picker */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Story Link
                                </label>
                                <LinkPicker
                                    value={formData.link}
                                    onChange={(value) => setFormData(prev => ({ ...prev, link: value }))}
                                    placeholder="Select a page or enter custom URL"
                                />
                                {formData.link && (
                                    <p className="mt-2 text-sm text-gray-500">
                                        Selected: <span className="font-medium text-[#004fa2]">{formData.link}</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 justify-end">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/content/partnership')}
                                className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium border border-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors font-medium"
                            >
                                {saving && <Loader size={16} className="animate-spin" />}
                                {id ? 'Update Story' : 'Create Story'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </AdminLayout>
    );
};

export default PartnershipStoryFormPage;
