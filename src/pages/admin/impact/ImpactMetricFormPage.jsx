/**
 * Impact Metric Form Page (Admin)
 * Form for creating and editing impact metrics
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import {
    ArrowLeft,
    Save,
    X,
    BarChart3,
    AlertCircle,
    TrendingUp,
    Star,
    Hash,
    Percent,
    DollarSign
} from 'lucide-react';
import impactService, { IMPACT_CATEGORIES, METRIC_TYPES, DISPLAY_LOCATIONS } from '../../../services/impactService';

const ImpactMetricFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = id && id !== 'new';

    const [metric, setMetric] = useState(null);
    const [loading, setLoading] = useState(isEditing);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        title: '',
        value: '',
        previousValue: '',
        type: 'number',
        category: 'students',
        description: '',
        suffix: '',
        prefix: '',
        featured: false,
        active: true,
        displayOrder: 0,
        displayLocations: [],
        trend: 'up'
    });

    // Load metric if editing
    useEffect(() => {
        if (isEditing) {
            const loadMetric = async () => {
                try {
                    const data = await impactService.fetchImpactMetric(id);
                    if (data) {
                        setMetric(data);
                        setFormData({
                            title: data.title,
                            value: data.value,
                            previousValue: data.previousValue || '',
                            type: data.type,
                            category: data.category,
                            description: data.description,
                            suffix: data.suffix || '',
                            prefix: data.prefix || '',
                            featured: data.featured,
                            active: data.active,
                            displayOrder: data.displayOrder || 0,
                            displayLocations: data.displayLocations || [],
                            trend: data.trend || 'up'
                        });
                    }
                } catch (error) {
                    console.error('Error loading metric:', error);
                    setErrors({ submit: 'Failed to load metric' });
                } finally {
                    setLoading(false);
                }
            };
            loadMetric();
        }
    }, [isEditing, id]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (formData.value === '') newErrors.value = 'Value is required';
        if (!formData.type) newErrors.type = 'Metric type is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.displayLocations || formData.displayLocations.length === 0) {
            newErrors.displayLocations = 'Select at least one display location';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

    const handleLocationToggle = (locationKey) => {
        setFormData(prev => {
            const locations = prev.displayLocations || [];
            if (locations.includes(locationKey)) {
                return { ...prev, displayLocations: locations.filter(l => l !== locationKey) };
            } else {
                return { ...prev, displayLocations: [...locations, locationKey] };
            }
        });
        if (errors.displayLocations) {
            setErrors(prev => ({ ...prev, displayLocations: '' }));
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
                await impactService.updateImpactMetric(id, formData);
            } else {
                await impactService.createImpactMetric(formData);
            }
            navigate('/admin/impact');
        } catch (error) {
            console.error('Error saving metric:', error);
            setErrors({ submit: 'Failed to save metric. Please try again.' });
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
                                <BarChart3 className="text-white" size={22} />
                            </div>
                            {isEditing ? 'Edit Metric' : 'Create New Metric'}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            {isEditing ? 'Update the metric details' : 'Add a new impact metric'}
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
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                <span className="flex items-center gap-1">Metric Title <span className="text-red-500">*</span></span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Total Students Trained"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm ${
                                    errors.title ? 'border-red-300' : 'border-gray-200'
                                }`}
                            />
                            {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                <span className="flex items-center gap-1">Description <span className="text-red-500">*</span></span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Explain what this metric represents..."
                                rows="3"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm resize-none ${
                                    errors.description ? 'border-red-300' : 'border-gray-200'
                                }`}
                            />
                            {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
                        </div>

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    <span className="flex items-center gap-1">Type <span className="text-red-500">*</span></span>
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm bg-white ${
                                        errors.type ? 'border-red-300' : 'border-gray-200'
                                    }`}
                                >
                                    <option value="">Select type...</option>
                                    {Object.entries(METRIC_TYPES).map(([key, label]) => (
                                        <option key={key} value={key}>{label.label}</option>
                                    ))}
                                </select>
                                {errors.type && <p className="text-xs text-red-600 mt-1">{errors.type}</p>}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    <span className="flex items-center gap-1">Category <span className="text-red-500">*</span></span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm bg-white ${
                                        errors.category ? 'border-red-300' : 'border-gray-200'
                                    }`}
                                >
                                    <option value="">Select category...</option>
                                    {Object.entries(IMPACT_CATEGORIES).map(([key, cat]) => (
                                        <option key={key} value={key}>{cat.label}</option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
                            </div>
                        </div>

                        {/* Value and Previous Value */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Current Value */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    <span className="flex items-center gap-1">Current Value <span className="text-red-500">*</span></span>
                                </label>
                                <input
                                    type={formData.type === 'text' ? 'text' : 'text'}
                                    name="value"
                                    value={formData.value}
                                    onChange={handleChange}
                                    placeholder={formData.type === 'text' ? 'e.g., 2-8, 3x' : '0'}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm ${
                                        errors.value ? 'border-red-300' : 'border-gray-200'
                                    }`}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {formData.type === 'text' ? 'Text values like "2-8" or "3x"' : 'Numeric value (can include decimals)'}
                                </p>
                                {errors.value && <p className="text-xs text-red-600 mt-1">{errors.value}</p>}
                            </div>

                            {/* Previous Value (for trend calculation) */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Previous Value
                                </label>
                                <input
                                    type="number"
                                    name="previousValue"
                                    value={formData.previousValue}
                                    onChange={handleChange}
                                    placeholder="0 (optional)"
                                    step="0.01"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">Used to calculate trend percentage</p>
                            </div>
                        </div>

                        {/* Prefix and Suffix */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Prefix */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Prefix
                                </label>
                                <input
                                    type="text"
                                    name="prefix"
                                    value={formData.prefix}
                                    onChange={handleChange}
                                    placeholder="e.g., GHS, $"
                                    maxLength="10"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">Displayed before the value</p>
                            </div>

                            {/* Suffix */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Suffix
                                </label>
                                <input
                                    type="text"
                                    name="suffix"
                                    value={formData.suffix}
                                    onChange={handleChange}
                                    placeholder="e.g., %, +, /5.0"
                                    maxLength="10"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-1">Displayed after the value</p>
                            </div>
                        </div>

                        {/* Display Order and Trend */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Display Order */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    name="displayOrder"
                                    value={formData.displayOrder}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm"
                                />
                            </div>

                            {/* Trend */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Trend
                                </label>
                                <select
                                    name="trend"
                                    value={formData.trend}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all text-sm bg-white"
                                >
                                    <option value="up">↑ Upward Trend</option>
                                    <option value="down">↓ Downward Trend</option>
                                </select>
                            </div>
                        </div>

                        {/* Display Locations */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                <span className="flex items-center gap-1">Display Locations <span className="text-red-500">*</span></span>
                            </label>
                            <p className="text-xs text-gray-500 mb-3">Select which pages should display this metric</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {Object.entries(DISPLAY_LOCATIONS).map(([key, loc]) => (
                                    <label
                                        key={key}
                                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                            formData.displayLocations?.includes(key)
                                                ? 'border-[#004fa2] bg-[#004fa2]/5'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.displayLocations?.includes(key) || false}
                                            onChange={() => handleLocationToggle(key)}
                                            className="w-4 h-4 rounded border-gray-300 text-[#004fa2] focus:ring-[#004fa2]"
                                        />
                                        <div>
                                            <span className="text-sm font-medium text-gray-800">{loc.label}</span>
                                            <p className="text-xs text-gray-500">{loc.description}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            {errors.displayLocations && <p className="text-xs text-red-600 mt-2">{errors.displayLocations}</p>}
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
                                    Featured on Dashboard
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
                                <span className="text-sm font-medium text-gray-700">Active</span>
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
                            {submitting ? 'Saving...' : isEditing ? 'Update Metric' : 'Create Metric'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default ImpactMetricFormPage;
