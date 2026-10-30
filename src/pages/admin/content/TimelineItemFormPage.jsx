/**
 * Timeline Item Add/Edit Form Page
 * Dedicated page for creating and editing timeline items
 */

import { useDispatch } from 'react-redux';
import React, { useDispatch } { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    Loader,
    Users,
    MapPin,
    TrendingUp,
    Globe,
    Target,
    Flag
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import contentService from '../../../services/contentService';
import { addNotification } from '../../../store/slices/uiSlice';
import { useActivityLogger } from '../../../hooks/useActivityLogger';

const TIMELINE_ICONS = [
    { value: 'Users', label: 'Users', icon: Users },
    { value: 'MapPin', label: 'Map Pin', icon: MapPin },
    { value: 'TrendingUp', label: 'Trending Up', icon: TrendingUp },
    { value: 'Globe', label: 'Globe', icon: Globe },
    { value: 'Target', label: 'Target', icon: Target },
    { value: 'Flag', label: 'Flag', icon: Flag }
];

const TimelineItemFormPage = () => {
    const dispatch = useDispatch();
    const { userPermissions } = useAuth();
    
    // Permission checks
    const canContent = userPermissions?.includes('content') ?? false;

    const handlePermissionDenied = () => {
        dispatch(addNotification({
            type: 'error',
            title: 'Permission Required',
            message: 'You do not have permission to create or edit timeline items.',
            description: 'Contact Super Admin at admin@zyratechhub.com',
            duration: 6000
        }));
    };
    const navigate = useNavigate();
    const { id } = useParams();
    const { logAction } = useActivityLogger();
    
    const [loading, setLoading] = useState(!!id);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        year: new Date().getFullYear().toString(),
        title: '',
        desc: '',
        icon: 'Flag'
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchTimelineItem();
        }
    }, [id]);

    const fetchTimelineItem = async () => {
        try {
            setLoading(true);
            // contentService.getTimelineItem already returns the item object directly
            const item = await contentService.getTimelineItem(id);
            setFormData({
                year: item.year || new Date().getFullYear().toString(),
                title: item.title || '',
                desc: item.desc || '',
                icon: item.icon || 'Flag'
            });
        } catch (err) {
            console.error('Error fetching timeline item:', err);
            setError('Failed to load timeline item');
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

    const handleSubmit = async (e) => {
        if (!canContent) { handlePermissionDenied(); return; }
        e.preventDefault();
        
        if (!formData.year.trim() || !formData.title.trim() || !formData.desc.trim()) {
            setError('Year, title, and description are required');
            return;
        }

        try {
            setSaving(true);
            setError(null);

            if (id) {
                await contentService.updateTimelineItem(id, formData);
                logAction({
                    type: 'content_updated',
                    severity: 'info',
                    description: `Updated timeline item: "${formData.title}"`,
                    details: { contentType: 'TimelineItem', contentId: id }
                });
            } else {
                await contentService.createTimelineItem(formData);
                logAction({
                    type: 'content_created',
                    severity: 'success',
                    description: `Created new timeline item: "${formData.title}"`,
                    details: { contentType: 'TimelineItem' }
                });
            }

            navigate('/admin/content/about-page');
        } catch (err) {
            console.error('Error saving timeline item:', err);
            setError(err.message || 'Failed to save timeline item');
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
                        onClick={() => navigate('/admin/content/about-page')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Go back"
                    >
                        <ArrowLeft size={24} className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {id ? 'Edit Timeline Item' : 'Add Timeline Item'}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {id ? 'Update timeline event details' : 'Create a new timeline event'}
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
                            {/* Year */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Year <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. 2024"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                />
                            </div>

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
                                    placeholder="Timeline event title..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="desc"
                                    value={formData.desc}
                                    onChange={handleInputChange}
                                    required
                                    rows={4}
                                    placeholder="Event description..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] resize-none transition-all"
                                />
                            </div>

                            {/* Icon Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Icon
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {TIMELINE_ICONS.map(option => {
                                        const IconComponent = option.icon;
                                        const isSelected = formData.icon === option.value;
                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, icon: option.value }))}
                                                className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                                                    isSelected
                                                        ? 'border-[#004fa2] bg-blue-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <IconComponent
                                                    size={20}
                                                    className={isSelected ? 'text-[#004fa2]' : 'text-gray-600'}
                                                />
                                                <span className={`text-sm font-medium ${
                                                    isSelected ? 'text-[#004fa2]' : 'text-gray-700'
                                                }`}>
                                                    {option.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 justify-end">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/content/about-page')}
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
                                {id ? 'Update Timeline Item' : 'Create Timeline Item'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </AdminLayout>
    );
};

export default TimelineItemFormPage;
