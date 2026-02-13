/**
 * Testimonials Form Page (Admin)
 * Create and edit testimonials with rating and status management
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
    User,
    MessageCircle,
    GraduationCap,
    Award,
    Building,
    Briefcase,
    Heart,
    Users,
    Image,
    Loader
} from 'lucide-react';
import testimonialsService from '../../../services/testimonialsService';

// Type configuration
const TYPE_CONFIG = {
    'student': {
        label: 'Student',
        icon: GraduationCap
    },
    'alumni': {
        label: 'Alumni',
        icon: Award
    },
    'partner': {
        label: 'Partner',
        icon: Building
    },
    'corporate': {
        label: 'Corporate',
        icon: Briefcase
    },
    'parent': {
        label: 'Parent',
        icon: Heart
    },
    'mentor': {
        label: 'Mentor',
        icon: Users
    }
};

// Pages/Sections configuration where testimonials can be displayed
const PAGES_CONFIG = {
    'home': {
        label: 'Homepage',
        description: 'Display on home page hero/featured section',
        icon: '🏠'
    },
    'about': {
        label: 'About Us',
        description: 'Display on about page testimonials section',
        icon: '📋'
    },
    'training': {
        label: 'Training Programs',
        description: 'Display on training/courses page',
        icon: '📚'
    },
    'impact': {
        label: 'Impact Page',
        description: 'Display on impact/success stories page',
        icon: '⭐'
    },
    'contact': {
        label: 'Contact Page',
        description: 'Display on contact page testimonials section',
        icon: '📧'
    },
    'services': {
        label: 'Our Services',
        description: 'Display on services page',
        icon: '🛠️'
    }
};

export default function TestimonialsFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isSuperAdmin } = usePermissions();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        type: 'student',
        quote: '',
        rating: 5,
        program: '',
        status: 'draft',
        avatar: '',
        pages: []  // Array of pages where this testimonial will be displayed
    });

    // Load testimonial data if editing
    useEffect(() => {
        if (id) {
            const fetchTestimonial = async () => {
                try {
                    setLoading(true);
                    const response = await testimonialsService.getTestimonialById(id);
                    const testimonial = response.data;
                    setFormData({
                        name: testimonial.name,
                        role: testimonial.role,
                        type: testimonial.type,
                        quote: testimonial.quote,
                        rating: testimonial.rating || 5,
                        program: testimonial.program || '',
                        status: testimonial.status || 'draft',
                        avatar: testimonial.avatar || '',
                        pages: testimonial.pages || []
                    });
                } catch (error) {
                    console.error('Error fetching testimonial:', error);
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
        } else if (formData.name.trim().length > 100) {
            newErrors.name = 'Name cannot exceed 100 characters';
        }

        if (!formData.role.trim()) {
            newErrors.role = 'Role is required';
        } else if (formData.role.trim().length < 3) {
            newErrors.role = 'Role must be at least 3 characters';
        } else if (formData.role.trim().length > 100) {
            newErrors.role = 'Role cannot exceed 100 characters';
        }

        if (!formData.quote.trim()) {
            newErrors.quote = 'Testimonial quote is required';
        } else if (formData.quote.trim().length < 10) {
            newErrors.quote = 'Quote must be at least 10 characters';
        } else if (formData.quote.trim().length > 1000) {
            newErrors.quote = 'Quote cannot exceed 1000 characters';
        }

        if (!formData.type) {
            newErrors.type = 'Type is required';
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

    const togglePage = (page) => {
        setFormData(prev => ({
            ...prev,
            pages: prev.pages.includes(page)
                ? prev.pages.filter(p => p !== page)
                : [...prev.pages, page]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            if (id) {
                await testimonialsService.updateTestimonial(id, formData);
            } else {
                await testimonialsService.createTestimonial(formData);
            }

            // Navigate back to testimonials management
            navigate('/admin/testimonials');
        } catch (error) {
            console.error('Error saving testimonial:', error);
            setErrors({ submit: 'Failed to save testimonial. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/admin/testimonials');
    };

    const types = Object.keys(TYPE_CONFIG);

    return (
        <AdminLayout>
            <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {id ? 'Edit Testimonial' : 'Add New Testimonial'}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {id ? 'Update the testimonial content and details' : 'Create a new customer testimonial'}
                        </p>
                    </div>
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

                        {/* Two Column Layout */}
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

                            {/* Role */}
                            <div>
                                <label htmlFor="role" className="block text-sm font-semibold text-gray-900 mb-2">
                                    Role / Title *
                                </label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder="e.g., STEM Basics Student"
                                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.role ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                                        } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                />
                                {errors.role && (
                                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.role}
                                    </p>
                                )}
                            </div>

                            {/* Type */}
                            <div>
                                <label htmlFor="type" className="block text-sm font-semibold text-gray-900 mb-2">
                                    Type *
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 rounded-lg border ${errors.type ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                                        } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                                >
                                    {types.map(type => (
                                        <option key={type} value={type}>
                                            {TYPE_CONFIG[type].label}
                                        </option>
                                    ))}
                                </select>
                                {errors.type && (
                                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.type}
                                    </p>
                                )}
                            </div>

                            {/* Program */}
                            <div>
                                <label htmlFor="program" className="block text-sm font-semibold text-gray-900 mb-2">
                                    Program
                                </label>
                                <input
                                    type="text"
                                    id="program"
                                    name="program"
                                    value={formData.program}
                                    onChange={handleChange}
                                    placeholder="e.g., STEM Basics, Internship Program"
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            {/* Rating */}
                            <div>
                                <label htmlFor="rating" className="block text-sm font-semibold text-gray-900 mb-2">
                                    Rating *
                                </label>
                                <div className="flex items-center gap-2">
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

                            {/* Avatar URL */}
                            <div>
                                <label htmlFor="avatar" className="block text-sm font-semibold text-gray-900 mb-2">
                                    Avatar URL
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="url"
                                        id="avatar"
                                        name="avatar"
                                        value={formData.avatar}
                                        onChange={handleChange}
                                        placeholder="/images/testimonials/avatar.jpg"
                                        className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                    {formData.avatar && (
                                        <img
                                            src={formData.avatar}
                                            alt="preview"
                                            className="w-10 h-10 rounded-full object-cover"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Quote - Full Width */}
                        <div>
                            <label htmlFor="quote" className="block text-sm font-semibold text-gray-900 mb-2">
                                Testimonial Quote *
                            </label>
                            <textarea
                                id="quote"
                                name="quote"
                                value={formData.quote}
                                onChange={handleChange}
                                placeholder="Write the testimonial quote"
                                rows={5}
                                className={`w-full px-4 py-2.5 rounded-lg border ${errors.quote ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                                    } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none`}
                            />
                            <div className="flex justify-between mt-2">
                                {errors.quote && (
                                    <p className="text-red-600 text-sm flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.quote}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 ml-auto">
                                    {formData.quote.length} / 1000
                                </p>
                            </div>
                        </div>

                        {/* Status and Pages */}
                        <div>
                            {/* Status */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                    Status
                                </label>
                                <div className="flex gap-3">
                                    {['draft', 'published', 'pending'].map(status => (
                                        <button
                                            key={status}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, status }))}
                                            className={`flex-1 px-4 py-2.5 rounded-lg border-2 font-medium transition-all duration-200 ${formData.status === status
                                                ? status === 'published'
                                                    ? 'border-green-500 bg-green-50 text-green-700'
                                                    : status === 'pending'
                                                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                                                        : 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                                }`}
                                        >
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Pages/Sections Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-3">
                                    Display on Pages
                                </label>
                                <p className="text-xs text-gray-600 mb-3">Select which pages/sections this testimonial should appear on</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {Object.entries(PAGES_CONFIG).map(([pageKey, pageConfig]) => (
                                        <button
                                            key={pageKey}
                                            type="button"
                                            onClick={() => togglePage(pageKey)}
                                            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${formData.pages.includes(pageKey)
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.pages.includes(pageKey)}
                                                    readOnly
                                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer mt-0.5"
                                                />
                                                <div>
                                                    <p className={`font-medium ${formData.pages.includes(pageKey) ? 'text-blue-700' : 'text-gray-900'}`}>
                                                        {pageConfig.label}
                                                    </p>
                                                    <p className="text-xs text-gray-600 mt-1">{pageConfig.description}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex gap-3 pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <Save className="w-5 h-5" />
                                {loading ? 'Saving...' : 'Save Testimonial'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
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
