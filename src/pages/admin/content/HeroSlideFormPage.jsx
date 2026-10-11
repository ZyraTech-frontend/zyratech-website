/**
 * Hero Slide Add/Edit Form Page
 * Dedicated page for creating and editing hero slides
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    Loader,
    Eye,
    EyeOff,
    ExternalLink
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import heroService from '../../../services/heroService';

const HeroSlideFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [loading, setLoading] = useState(!!id);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        pillar: '',
        backgroundImage: '',
        cta1Text: '',
        cta1Link: '',
        cta2Text: '',
        cta2Link: '',
        isVisible: true
    });
    const [error, setError] = useState(null);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    useEffect(() => {
        if (id) {
            fetchSlide();
        }
    }, [id]);

    const fetchSlide = async () => {
        try {
            setLoading(true);
            const response = await heroService.getSlide(id);
            const slide = response.data;
            setFormData({
                title: slide.title || '',
                description: slide.description || '',
                pillar: slide.pillar || '',
                backgroundImage: slide.backgroundImage || '',
                cta1Text: slide.cta1Text || '',
                cta1Link: slide.cta1Link || '',
                cta2Text: slide.cta2Text || '',
                cta2Link: slide.cta2Link || '',
                isVisible: slide.isVisible !== undefined ? slide.isVisible : true
            });
        } catch (err) {
            console.error('Error fetching slide:', err);
            setError('Failed to load slide');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title.trim() || !formData.description.trim()) {
            setError('Title and description are required');
            return;
        }

        try {
            setSaving(true);
            setError(null);

            if (id) {
                await heroService.updateSlide(id, formData);
            } else {
                await heroService.createSlide(formData);
            }

            navigate('/admin/content/hero');
        } catch (err) {
            console.error('Error saving slide:', err);
            setError(err.message || 'Failed to save slide');
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate('/admin/content/hero')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Go back"
                    >
                        <ArrowLeft size={24} className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {id ? 'Edit Hero Slide' : 'Add Hero Slide'}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {id ? 'Update slide details' : 'Create a new hero slide'}
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
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Slide title..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    placeholder="Slide description..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] resize-none transition-all"
                                />
                            </div>

                            {/* Pillar */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pillar
                                </label>
                                <input
                                    type="text"
                                    name="pillar"
                                    value={formData.pillar}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Web Development"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                />
                            </div>

                            {/* Background Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Background Image URL
                                </label>
                                <input
                                    type="url"
                                    name="backgroundImage"
                                    value={formData.backgroundImage}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                />
                                {formData.backgroundImage && (
                                    <div className="mt-3 relative overflow-hidden rounded-lg border border-gray-200 max-h-48">
                                        <img 
                                            src={formData.backgroundImage} 
                                            alt="Preview" 
                                            className="w-full h-auto object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* CTA 1 */}
                            <div className="border-t border-gray-100 pt-6">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Primary Call-to-Action</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Text
                                        </label>
                                        <input
                                            type="text"
                                            name="cta1Text"
                                            value={formData.cta1Text}
                                            onChange={handleInputChange}
                                            placeholder="Button text"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Link
                                        </label>
                                        <input
                                            type="url"
                                            name="cta1Link"
                                            value={formData.cta1Link}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* CTA 2 */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Secondary Call-to-Action</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Text
                                        </label>
                                        <input
                                            type="text"
                                            name="cta2Text"
                                            value={formData.cta2Text}
                                            onChange={handleInputChange}
                                            placeholder="Button text (optional)"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Link
                                        </label>
                                        <input
                                            type="url"
                                            name="cta2Link"
                                            value={formData.cta2Link}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com (optional)"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Visibility */}
                            <div className="border-t border-gray-100 pt-6">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="isVisible"
                                        checked={formData.isVisible}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-[#004fa2]"
                                    />
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">
                                            {formData.isVisible ? (
                                                <span className="flex items-center gap-2 text-green-600">
                                                    <Eye size={16} /> Visible on homepage
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2 text-gray-500">
                                                    <EyeOff size={16} /> Hidden from homepage
                                                </span>
                                            )}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1">
                                            When unchecked, this slide won't appear on the homepage
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 justify-end">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/content/hero')}
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
                                {id ? 'Update Slide' : 'Create Slide'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </AdminLayout>
    );
};

export default HeroSlideFormPage;
