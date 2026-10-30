/**
 * Hero Slide Add/Edit Form Page
 * Dedicated page for creating and editing hero slides
 */

import { useDispatch } from 'react-redux';
import { addNotification } from '../../../store/slices/uiSlice';
import React, { useDispatch } { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    Loader,
    Eye,
    EyeOff,
    ExternalLink
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import LinkPicker from '../../../components/admin/common/LinkPicker';
import heroService from '../../../services/heroService';
import contentService from '../../../services/contentService';

const HeroSlideFormPage = () => {
    const dispatch = useDispatch();
    const { userPermissions } = useAuth();
    
    // Permission checks
    const canContent = userPermissions?.includes('content') ?? false;

    const handlePermissionDenied = () => {
        dispatch(addNotification({
            type: 'error',
            title: 'Permission Required',
            message: 'You do not have permission to create or edit hero slides.',
            description: 'Contact Super Admin at admin@zyratechhub.com',
            duration: 6000
        }));
    };
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Create abort controller for upload cancellation
    const abortControllerRef = React.useRef(null);
    
    const [loading, setLoading] = useState(!!id);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
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
        
        // Cleanup: abort upload if component unmounts
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [id]);

    const fetchSlide = async () => {
        try {
            setLoading(true);
            // heroService.getSlide returns { data: slide }, so extract data
            const response = await heroService.getSlide(id);
            const slide = response.data || response;
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
        if (!canContent) { handlePermissionDenied(); return; }
        e.preventDefault();
        
        if (!formData.title.trim() || !formData.description.trim()) {
            setError('Title and description are required');
            return;
        }

        if (!formData.backgroundImage) {
            setError('Background image is required');
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

                            {/* Background Image - File Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Background Image <span className="text-red-500">*</span>
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#004fa2] transition-colors cursor-pointer group"
                                    onClick={() => !uploading && document.getElementById('image-upload').click()}
                                    style={{ opacity: uploading ? 0.6 : 1, pointerEvents: uploading ? 'none' : 'auto' }}>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        disabled={uploading}
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            
                                            // Prevent concurrent uploads
                                            if (uploading) {
                                                setError('Another upload is in progress');
                                                return;
                                            }
                                            
                                            // Frontend file size check (5MB max)
                                            if (file.size > 5 * 1024 * 1024) {
                                                setError('File must be smaller than 5MB');
                                                return;
                                            }
                                            
                                            try {
                                                setUploading(true);
                                                setError(null);
                                                
                                                // Create abort controller for this upload
                                                abortControllerRef.current = new AbortController();
                                                
                                                // Use the new upload endpoint instead of base64
                                                const imageUrl = await contentService.uploadImage(file);
                                                
                                                // Only update if component still mounted (check uploading state)
                                                setFormData(prev => ({
                                                    ...prev,
                                                    backgroundImage: imageUrl
                                                }));
                                            } catch (err) {
                                                console.error('Error uploading image:', err);
                                                // Show more specific error message
                                                const errorMsg = err.message || 'Failed to upload image. Please try again.';
                                                setError(errorMsg);
                                            } finally {
                                                setUploading(false);
                                                abortControllerRef.current = null;
                                            }
                                        }}
                                        className="hidden"
                                    />
                                    <div className="flex flex-col items-center justify-center">
                                        {uploading ? (
                                            <>
                                                <Loader className="w-12 h-12 text-[#004fa2] mb-2 animate-spin" />
                                                <p className="text-sm font-medium text-gray-700">Uploading image...</p>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                <p className="text-sm font-medium text-gray-700">Click or drag to upload image</p>
                                                <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                {formData.backgroundImage && (
                                    <div className="mt-4">
                                        <p className="text-xs text-gray-500 mb-2">Preview:</p>
                                        <div className="relative overflow-hidden rounded-lg border border-gray-200 max-h-48">
                                            <img 
                                                src={formData.backgroundImage} 
                                                alt="Preview" 
                                                className="w-full h-auto object-cover"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* CTA 1 */}
                            <div className="border-t border-gray-100 pt-6">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Primary Call-to-Action</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Button Text
                                        </label>
                                        <input
                                            type="text"
                                            name="cta1Text"
                                            value={formData.cta1Text}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Learn More, Get Started"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Where should it go?
                                        </label>
                                        <LinkPicker
                                            value={formData.cta1Link}
                                            onChange={(link) => setFormData(prev => ({ ...prev, cta1Link: link }))}
                                            placeholder="Select a page or paste external link"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* CTA 2 */}
                            <div className="border-t border-gray-100 pt-6">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Secondary Call-to-Action</h3>
                                <p className="text-xs text-gray-500 mb-4">(Optional - leave blank to hide this button)</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Button Text
                                        </label>
                                        <input
                                            type="text"
                                            name="cta2Text"
                                            value={formData.cta2Text}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Watch Demo, Contact Us"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Where should it go?
                                        </label>
                                        <LinkPicker
                                            value={formData.cta2Link}
                                            onChange={(link) => setFormData(prev => ({ ...prev, cta2Link: link }))}
                                            placeholder="Select a page or paste external link"
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
                                disabled={saving || uploading}
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
