/**
 * Benefit Add/Edit Form Page
 * Dedicated page for creating and editing "Why Choose Us" benefits
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    Loader,
    Code2,
    ServerCog,
    BookOpen,
    GraduationCap,
    Shield,
    ShieldCheck,
    Briefcase,
    Globe,
    Smartphone,
    Database,
    Layout,
    Cpu,
    Cog,
    TrendingUp,
    DollarSign,
    Users,
    CheckCircle
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import contentService from '../../../services/contentService';
import { useActivityLogger } from '../../../hooks/useActivityLogger';

const ICON_OPTIONS = [
    { value: 'Code2', label: 'Code / Development', icon: Code2 },
    { value: 'ServerCog', label: 'Server / Infrastructure', icon: ServerCog },
    { value: 'BookOpen', label: 'Learning / Research', icon: BookOpen },
    { value: 'GraduationCap', label: 'Education / Training', icon: GraduationCap },
    { value: 'Shield', label: 'Security / Managed Services', icon: Shield },
    { value: 'ShieldCheck', label: 'Shield Check', icon: ShieldCheck },
    { value: 'Briefcase', label: 'Business / General', icon: Briefcase },
    { value: 'Globe', label: 'Web / Global', icon: Globe },
    { value: 'Smartphone', label: 'Mobile / Apps', icon: Smartphone },
    { value: 'Database', label: 'Data / Storage', icon: Database },
    { value: 'Layout', label: 'Design / UI/UX', icon: Layout },
    { value: 'Cpu', label: 'Hardware / IoT', icon: Cpu },
    { value: 'Cog', label: 'Cog', icon: Cog },
    { value: 'TrendingUp', label: 'TrendingUp', icon: TrendingUp },
    { value: 'DollarSign', label: 'DollarSign', icon: DollarSign },
    { value: 'Users', label: 'Users', icon: Users },
    { value: 'CheckCircle', label: 'Check Circle', icon: CheckCircle }
];

const BenefitFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { logAction } = useActivityLogger();
    
    const [loading, setLoading] = useState(!!id);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: 'ShieldCheck'
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchBenefit();
        }
    }, [id]);

    const fetchBenefit = async () => {
        try {
            setLoading(true);
            const response = await contentService.getBenefit(id);
            const benefit = response.data;
            setFormData({
                title: benefit.title || '',
                description: benefit.description || '',
                icon: benefit.icon || 'ShieldCheck'
            });
        } catch (err) {
            console.error('Error fetching benefit:', err);
            setError('Failed to load benefit');
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
        e.preventDefault();
        
        if (!formData.title.trim() || !formData.description.trim()) {
            setError('Title and description are required');
            return;
        }

        try {
            setSaving(true);
            setError(null);

            if (id) {
                await contentService.updateBenefit(id, formData);
                logAction({
                    type: 'content_updated',
                    severity: 'info',
                    description: `Updated benefit: "${formData.title}"`,
                    details: { contentType: 'Benefit', contentId: id }
                });
            } else {
                await contentService.createBenefit(formData);
                logAction({
                    type: 'content_created',
                    severity: 'success',
                    description: `Created new benefit: "${formData.title}"`,
                    details: { contentType: 'Benefit' }
                });
            }

            navigate('/admin/content/benefits');
        } catch (err) {
            console.error('Error saving benefit:', err);
            setError(err.message || 'Failed to save benefit');
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
                        onClick={() => navigate('/admin/content/benefits')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Go back"
                    >
                        <ArrowLeft size={24} className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {id ? 'Edit Benefit' : 'Add Benefit'}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {id ? 'Update benefit details' : 'Create a new "Why Choose Us" benefit'}
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
                                    placeholder="e.g. Low Risk"
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
                                    placeholder="Describe this benefit..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] resize-none transition-all"
                                />
                            </div>

                            {/* Icon Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Icon
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {ICON_OPTIONS.map(option => {
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
                                onClick={() => navigate('/admin/content/benefits')}
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
                                {id ? 'Update Benefit' : 'Create Benefit'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </AdminLayout>
    );
};

export default BenefitFormPage;
