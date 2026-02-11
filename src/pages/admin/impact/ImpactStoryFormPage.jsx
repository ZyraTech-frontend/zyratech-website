/**
 * Impact Success Story Form Page (Admin)
 * Form for creating and editing success stories
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import {
    ArrowLeft,
    Save,
    Quote,
    AlertCircle,
    Star,
    Image as ImageIcon
} from 'lucide-react';
import impactService from '../../../services/impactService';

const ImpactStoryFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = id && id !== 'new';

    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(isEditing);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        title: '',
        role: '',
        organization: '',
        location: '',
        quote: '',
        image: null,
        featured: false,
        active: true,
        datePublished: new Date().toISOString().split('T')[0]
    });

    // Load story if editing
    useEffect(() => {
        if (isEditing) {
            const loadStory = async () => {
                try {
                    const data = await impactService.fetchSuccessStory(id);
                    if (data) {
                        setStory(data);
                        setFormData({
                            name: data.name,
                            title: data.title || '',
                            role: data.role,
                            organization: data.organization || '',
                            location: data.location || '',
                            quote: data.quote,
                            image: data.image || null,
                            featured: data.featured ?? false,
                            active: data.active ?? true,
                            datePublished: data.datePublished || new Date().toISOString().split('T')[0]
                        });
                    }
                } catch (error) {
                    console.error('Error loading story:', error);
                    setErrors({ submit: 'Failed to load story' });
                } finally {
                    setLoading(false);
                }
            };
            loadStory();
        }
    }, [isEditing, id]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        if (!formData.role.trim()) newErrors.role = 'Role/position is required';
        if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.quote.trim()) newErrors.quote = 'Quote/testimonial is required';
        if (formData.quote.length < 20) newErrors.quote = 'Quote should be at least 20 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) : value)
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, you'd upload the file to storage
            // For now, we'll just store the filename
            setFormData(prev => ({
                ...prev,
                image: file.name
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);
        try {
            if (isEditing) {
                await impactService.updateSuccessStory(id, formData);
            } else {
                await impactService.createSuccessStory(formData);
            }
            navigate('/admin/impact');
        } catch (error) {
            console.error('Error saving story:', error);
            setErrors({ submit: 'Failed to save story. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004fa2]"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto pb-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => navigate('/admin/impact')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Back to Impact Management"
                    >
                        <ArrowLeft className="text-gray-600" size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                <Quote className="text-white" size={22} />
                            </div>
                            {isEditing ? 'Edit Success Story' : 'Create New Success Story'}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            {isEditing ? 'Update the success story details' : 'Add a new graduate success story'}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100">
                    {/* Error Alert */}
                    {errors.submit && (
                        <div className="p-4 bg-red-50 border-b border-red-100">
                            <div className="flex items-center gap-3 text-red-700">
                                <AlertCircle size={20} />
                                <span className="text-sm font-medium">{errors.submit}</span>
                            </div>
                        </div>
                    )}

                    {/* Form Content */}
                    <div className="p-6 space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                <span className="flex items-center gap-1">Full Name <span className="text-red-500">*</span></span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g., Kwame Asante"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm ${
                                    errors.name ? 'border-red-300' : 'border-gray-200'
                                }`}
                            />
                            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                        </div>

                        {/* Story Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                <span className="flex items-center gap-1">Story Title <span className="text-red-500">*</span></span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., From Unemployed to Lead Developer"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm ${
                                    errors.title ? 'border-red-300' : 'border-gray-200'
                                }`}
                            />
                            {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
                        </div>

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Role */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    <span className="flex items-center gap-1">Current Role/Position <span className="text-red-500">*</span></span>
                                </label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder="e.g., Senior Software Developer"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm ${
                                        errors.role ? 'border-red-300' : 'border-gray-200'
                                    }`}
                                />
                                {errors.role && <p className="text-xs text-red-600 mt-1">{errors.role}</p>}
                            </div>

                            {/* Organization */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    <span className="flex items-center gap-1">Organization <span className="text-red-500">*</span></span>
                                </label>
                                <input
                                    type="text"
                                    name="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    placeholder="e.g., TechVision Ltd"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm ${
                                        errors.organization ? 'border-red-300' : 'border-gray-200'
                                    }`}
                                />
                                {errors.organization && <p className="text-xs text-red-600 mt-1">{errors.organization}</p>}
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                <span className="flex items-center gap-1">Location <span className="text-red-500">*</span></span>
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g., Accra, Ghana"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm ${
                                    errors.location ? 'border-red-300' : 'border-gray-200'
                                }`}
                            />
                            {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
                        </div>

                        {/* Quote/Testimonial */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                <span className="flex items-center gap-1">Testimonial/Quote <span className="text-red-500">*</span></span>
                            </label>
                            <textarea
                                name="quote"
                                value={formData.quote}
                                onChange={handleChange}
                                placeholder="Share the graduate's experience and impact..."
                                rows="4"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm resize-none ${
                                    errors.quote ? 'border-red-300' : 'border-gray-200'
                                }`}
                            />
                            <div className="flex justify-between items-center mt-1">
                                <p className="text-xs text-gray-500">Minimum 20 characters</p>
                                <p className="text-xs text-gray-400">{formData.quote.length} characters</p>
                            </div>
                            {errors.quote && <p className="text-xs text-red-600 mt-1">{errors.quote}</p>}
                        </div>

                        {/* Dates */}
                        {/* Publication Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Publication Date
                            </label>
                            <input
                                type="date"
                                name="datePublished"
                                value={formData.datePublished}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm"
                            />
                        </div>

                        {/* Profile Image */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Profile Image
                            </label>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-[#004fa2] hover:bg-blue-50 transition-all cursor-pointer">
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                    id="image-input"
                                />
                                <label htmlFor="image-input" className="cursor-pointer flex flex-col items-center gap-2">
                                    <ImageIcon className="text-gray-400" size={24} />
                                    <span className="text-sm font-medium text-gray-700">Click to upload image</span>
                                    <span className="text-xs text-gray-500">{formData.image || 'No image selected'}</span>
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF (max. 5MB)</p>
                        </div>

                        {/* Checkboxes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-gray-300 text-[#004fa2] focus:ring-[#004fa2]"
                                />
                                <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Star size={16} className={formData.featured ? 'text-amber-500 fill-amber-500' : 'text-gray-300'} />
                                    Featured Story
                                </span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={formData.active}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded border-gray-300 text-[#004fa2] focus:ring-[#004fa2]"
                                />
                                <span className="text-sm font-medium text-gray-700">Publish This Story</span>
                            </label>
                        </div>
                    </div>

                    {/* Form Footer */}
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50 rounded-b-xl">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/impact')}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-5 py-2 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-lg hover:from-[#003d7a] hover:to-[#004fa2] transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save size={16} />
                            {submitting ? 'Saving...' : isEditing ? 'Update Story' : 'Create Story'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default ImpactStoryFormPage;
