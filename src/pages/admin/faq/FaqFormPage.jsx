/**
 * FAQ Form Page (Admin)
 * Create and edit FAQ items with validation and status management
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import faqService, { FAQ_CATEGORIES } from '../../../services/faqService';
import {
    Save,
    X,
    AlertCircle,
    HelpCircle,
    Users,
    Settings,
    MessageCircle,
    Mail,
    Sparkles,
    GripVertical
} from 'lucide-react';

// Using FAQ_CATEGORIES from service would be cleaner, but keeping local config mapping for Icons is fine
// We can use the service keys for the select options
const CATEGORY_KEYS = Object.keys(FAQ_CATEGORIES);

export default function FaqFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isSuperAdmin } = usePermissions();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        category: 'General',
        question: '',
        answer: '',
        status: 'draft',
        order: 1
    });

    // Load FAQ data if editing
    useEffect(() => {
        const loadFaq = async () => {
            if (id) {
                setLoading(true);
                try {
                    const response = await faqService.getFaqById(id);
                    if (response.data) {
                        setFormData({
                            category: response.data.category,
                            question: response.data.question,
                            answer: response.data.answer,
                            status: response.data.status,
                            order: response.data.order || 1
                        });
                    }
                } catch (error) {
                    console.error("Error loading FAQ:", error);
                    setErrors({ submit: "Failed to load FAQ." });
                } finally {
                    setLoading(false);
                }
            }
        };
        loadFaq();
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

        if (!formData.question.trim()) {
            newErrors.question = 'Question is required';
        } else if (formData.question.trim().length < 5) {
            newErrors.question = 'Question must be at least 5 characters';
        } else if (formData.question.trim().length > 500) {
            newErrors.question = 'Question cannot exceed 500 characters';
        }

        if (!formData.answer.trim()) {
            newErrors.answer = 'Answer is required';
        } else if (formData.answer.trim().length < 10) {
            newErrors.answer = 'Answer must be at least 10 characters';
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        if (formData.order < 1) {
            newErrors.order = 'Order must be at least 1';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'order' ? parseInt(value) || 1 : value
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

    const handleStatusChange = (status) => {
        setFormData(prev => ({ ...prev, status }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            if (id) {
                await faqService.updateFaq(id, formData);
            } else {
                await faqService.createFaq(formData);
            }

            // Navigate back to FAQ management
            navigate('/admin/faq');
        } catch (error) {
            console.error('Error saving FAQ:', error);
            setErrors({ submit: 'Failed to save FAQ. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/admin/faq');
    };

    const categories = CATEGORY_KEYS;

    return (
        <AdminLayout>
            <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {id ? 'Edit FAQ' : 'Create New FAQ'}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {id ? 'Update the FAQ content and status' : 'Add a new frequently asked question'}
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

                        {/* Category Selection */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
                                Category *
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 rounded-lg border ${errors.category ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                                    } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        {/* Question */}
                        <div>
                            <label htmlFor="question" className="block text-sm font-semibold text-gray-900 mb-2">
                                Question *
                            </label>
                            <input
                                type="text"
                                id="question"
                                name="question"
                                value={formData.question}
                                onChange={handleChange}
                                placeholder="Enter the FAQ question"
                                className={`w-full px-4 py-2.5 rounded-lg border ${errors.question ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                                    } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                            />
                            <div className="flex justify-between mt-2">
                                {errors.question && (
                                    <p className="text-red-600 text-sm flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.question}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 ml-auto">
                                    {formData.question.length} / 500
                                </p>
                            </div>
                        </div>

                        {/* Answer */}
                        <div>
                            <label htmlFor="answer" className="block text-sm font-semibold text-gray-900 mb-2">
                                Answer *
                            </label>
                            <textarea
                                id="answer"
                                name="answer"
                                value={formData.answer}
                                onChange={handleChange}
                                placeholder="Enter the detailed answer"
                                rows={6}
                                className={`w-full px-4 py-2.5 rounded-lg border ${errors.answer ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                                    } text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none`}
                            />
                            <div className="mt-2">
                                {errors.answer && (
                                    <p className="text-red-600 text-sm flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.answer}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500">
                                    {formData.answer.length} characters
                                </p>
                            </div>
                        </div>

                        {/* Status Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-3">
                                Status
                            </label>
                            <div className="flex gap-4">
                                {['draft', 'published'].map(status => (
                                    <button
                                        key={status}
                                        type="button"
                                        onClick={() => handleStatusChange(status)}
                                        className={`flex-1 px-4 py-2.5 rounded-lg border-2 font-medium transition-all duration-200 ${formData.status === status
                                            ? status === 'published'
                                                ? 'border-green-500 bg-green-50 text-green-700'
                                                : 'border-amber-500 bg-amber-50 text-amber-700'
                                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                            }`}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Order */}
                        <div>
                            <label htmlFor="order" className="block text-sm font-semibold text-gray-900 mb-2">
                                Display Order
                            </label>
                            <div className="flex items-center gap-2">
                                <GripVertical className="w-5 h-5 text-gray-400" />
                                <input
                                    type="number"
                                    id="order"
                                    name="order"
                                    value={formData.order}
                                    onChange={handleChange}
                                    min="1"
                                    className={`w-32 px-4 py-2.5 rounded-lg border ${errors.order ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                                        } text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                />
                            </div>
                            {errors.order && (
                                <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.order}
                                </p>
                            )}
                            <p className="text-xs text-gray-500 mt-2">Lower numbers appear first in the FAQ list</p>
                        </div>

                        {/* Form Actions */}
                        <div className="flex gap-3 pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <Save className="w-5 h-5" />
                                {loading ? 'Saving...' : 'Save FAQ'}
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
