/**
 * Testimonials Form Page (Admin)
 * Create and edit testimonials - matches backend API spec
 * Backend expects: name, content, role, organization, avatarUrl, rating, isFeatured, status
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import {
    Save,
    X,
    AlertCircle,
    Star,
    Loader,
    Upload
} from 'lucide-react';
import testimonialsService from '../../../services/testimonialsService';

export default function TestimonialsFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isSuperAdmin } = usePermissions();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        content: '',
        role: '',
        organization: '',
        avatarUrl: '',
        rating: 5,
        isFeatured: false,
        status: 'draft'
    });

    // Load testimonial data if editing
    useEffect(() => {
        if (id) {
            const fetchTestimonial = async () => {
                try {
                    setLoading(true);
                    const response = await testimonialsService.getAdminTestimonialById(id);
                    
                    // Debug logging
                    console.log('[Form] Full response:', response);
                    console.log('[Form] response.data:', response?.data);
                    console.log('[Form] response.data.data:', response?.data?.data);
                    
                    // API returns: { success, data: {...testimonial}, message }
                    // Axios wraps it, so testimonial is at: response.data.data
                    const testimonial = response?.data?.data || response?.data || {};
                    
                    console.log('[Form] Extracted testimonial:', testimonial);
                    
                    setFormData({
                        name: testimonial.name || '',
                        content: testimonial.content || '',
                        role: testimonial.role || '',
                        organization: testimonial.organization || '',
                        avatarUrl: testimonial.avatarUrl || '',
                        rating: testimonial.rating || 5,
                        isFeatured: testimonial.isFeatured || false,
                        status: testimonial.status || 'draft'
                    });
                } catch (error) {
                    console.error('[Form] Error fetching testimonial:', error);
                    setErrors({ submit: 'Failed to load testimonial. Please try again.' });
                } finally {
                    setLoading(false);
                }
            };
            fetchTestimonial();
        }
    }, [id]);

    // Check permissions
    if (!isSuperAdmin) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900">Access Denied</h2>
                        <p className="text-gray-600 mt-2">You don't have permission to access this page.</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.content.trim()) {
            newErrors.content = 'Testimonial content is required';
        } else if (formData.content.trim().length < 10) {
            newErrors.content = 'Content must be at least 10 characters';
        } else if (formData.content.trim().length > 2000) {
            newErrors.content = 'Content cannot exceed 2000 characters';
        }

        if (formData.rating < 1 || formData.rating > 5) {
            newErrors.rating = 'Rating must be between 1 and 5';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (name === 'rating' ? parseInt(value) : value)
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            console.log('[Form] No file selected');
            return;
        }

        console.log('[Form] Uploading avatar:', file.name, file.type, file.size);
        setUploading(true);
        try {
            const response = await testimonialsService.uploadAvatar(file);
            console.log('[Form] Upload response:', response);
            console.log('[Form] response.data:', response?.data);
            
            // Try multiple possible response structures
            const uploadedUrl = 
                response?.data?.data?.url ||      // Nested: response.data.data.url
                response?.data?.url ||            // Direct: response.data.url
                response?.data?.data?.avatarUrl || // Alternative field name
                response?.data?.avatarUrl ||      // Alternative direct
                null;
            
            console.log('[Form] Extracted avatar URL:', uploadedUrl);
            
            if (uploadedUrl) {
                setFormData(prev => ({
                    ...prev,
                    avatarUrl: uploadedUrl
                }));
            } else {
                throw new Error('No URL returned from upload');
            }
        } catch (error) {
            console.error('[Form] Error uploading image:', error);
            setErrors(prev => ({
                ...prev,
                avatar: 'Failed to upload image. Please try again.'
            }));
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            console.warn('[Form] Validation failed:', errors);
            return;
        }

        setLoading(true);
        try {
            // Prepare clean data - only send fields that backend expects
            const submitData = {
                name: formData.name.trim(),
                content: formData.content.trim(),
                role: formData.role.trim() || null,
                organization: formData.organization.trim() || null,
                avatarUrl: formData.avatarUrl || null,
                rating: Number(formData.rating),
                isFeatured: Boolean(formData.isFeatured),
                status: formData.status
            };

            console.log('[Form] Submitting testimonial:', submitData);

            if (id) {
                console.log('[Form] Updating testimonial:', id);
                await testimonialsService.updateAdminTestimonial(id, submitData);
            } else {
                console.log('[Form] Creating new testimonial');
                await testimonialsService.createAdminTestimonial(submitData);
            }

            console.log('[Form] Success! Navigating back...');
            // Navigate back to testimonials management
            navigate('/admin/testimonials');
        } catch (error) {
            console.error('[Form] Error saving testimonial:', error);
            const errorMsg = error?.response?.data?.error?.message || 
                           error?.userMessage ||
                           error?.message || 
                           'Failed to save testimonial. Please try again.';
            console.error('[Form] Error message extracted:', errorMsg);
            setErrors({ submit: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/admin/testimonials');
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto py-8 px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {id ? 'Edit Testimonial' : 'Add New Testimonial'}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {id ? 'Update the testimonial details' : 'Create a new customer testimonial'}
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Submit Error */}
                        {errors.submit && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-red-900">Error</h3>
                                    <p className="text-red-700 text-sm mt-1">{errors.submit}</p>
                                </div>
                            </div>
                        )}

                        {/* Name and Rating - Two Column */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Full name"
                                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                                        } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                />
                                {errors.name && (
                                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Rating */}
                            <div>
                                <label htmlFor="rating" className="block text-sm font-semibold text-gray-900 mb-2">
                                    Rating (1-5 stars)
                                </label>
                                <div className="flex items-center gap-3">
                                    <select
                                        id="rating"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleChange}
                                        className={`flex-1 px-4 py-2.5 rounded-lg border ${errors.rating ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                                            } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    >
                                        {[1, 2, 3, 4, 5].map(num => (
                                            <option key={num} value={num}>{num} Stars</option>
                                        ))}
                                    </select>
                                    <div className="flex items-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={18}
                                                className={star <= formData.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                                            />
                                        ))}
                                    </div>
                                </div>
                                {errors.rating && (
                                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.rating}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Role and Organization */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="role" className="block text-sm font-semibold text-gray-900 mb-2">
                                    Role / Job Title (optional)
                                </label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder="e.g., Software Engineer, Product Manager"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label htmlFor="organization" className="block text-sm font-semibold text-gray-900 mb-2">
                                    Organization (optional)
                                </label>
                                <input
                                    type="text"
                                    id="organization"
                                    name="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    placeholder="e.g., Company Name, Tech Startup"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Content - Full Width */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-semibold text-gray-900 mb-2">
                                Testimonial Content *
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Write the testimonial. What did ZyraTech help you achieve?"
                                rows={6}
                                className={`w-full px-4 py-2.5 rounded-lg border ${errors.content ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                                    } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none`}
                            />
                            <div className="flex justify-between mt-2">
                                {errors.content && (
                                    <p className="text-red-600 text-sm flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.content}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 ml-auto">
                                    {formData.content.length} / 2000
                                </p>
                            </div>
                        </div>

                        {/* Avatar Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Avatar Image (optional)
                            </label>
                            <div className="flex items-end gap-4">
                                <div className="flex-1">
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={uploading}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <div className="flex flex-col items-center gap-2 py-2">
                                            {uploading ? (
                                                <>
                                                    <Loader className="w-5 h-5 text-blue-600 animate-spin" />
                                                    <p className="text-sm text-gray-600">Uploading...</p>
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="w-5 h-5 text-gray-400" />
                                                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP up to 5MB</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {errors.avatar && (
                                        <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.avatar}
                                        </p>
                                    )}
                                </div>

                                {formData.avatarUrl && (
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={formData.avatarUrl}
                                            alt="Avatar preview"
                                            className="w-16 h-16 rounded-full object-cover border-2 border-blue-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, avatarUrl: '' }))}
                                            className="text-xs text-red-600 hover:text-red-700 mt-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Status and Featured */}
                        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                    Publication Status
                                </label>
                                <div className="flex flex-col gap-2">
                                    {['draft', 'published', 'archived'].map(status => (
                                        <label key={status} className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors">
                                            <input
                                                type="radio"
                                                name="status"
                                                value={status}
                                                checked={formData.status === status}
                                                onChange={handleChange}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-sm text-gray-700 capitalize font-medium">{status}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors h-full">
                                    <input
                                        type="checkbox"
                                        name="isFeatured"
                                        checked={formData.isFeatured}
                                        onChange={handleChange}
                                        className="w-5 h-5 rounded text-blue-600"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Featured on Homepage</p>
                                        <p className="text-xs text-gray-600">Display this testimonial on the homepage</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex gap-3 pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={loading || uploading}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <Save className="w-5 h-5" />
                                {loading ? 'Saving...' : 'Save Testimonial'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <X className="w-5 h-5" />
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
