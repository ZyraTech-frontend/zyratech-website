/**
 * Service Add/Edit Form Page
 * Dedicated page for creating and editing services
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
    Layers,
    BadgeCheck
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
    { value: 'Users', label: 'Users', icon: Users },
    { value: 'Layers', label: 'Layers', icon: Layers },
    { value: 'BadgeCheck', label: 'Badge Check', icon: BadgeCheck },
    { value: 'Cog', label: 'Cog', icon: Cog },
    { value: 'TrendingUp', label: 'Trending Up', icon: TrendingUp },
    { value: 'DollarSign', label: 'Dollar Sign', icon: DollarSign }
];

const ServiceFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { logAction } = useActivityLogger();
    
    const [loading, setLoading] = useState(!!id);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: 'Code2',
        highlights: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchService();
        }
    }, [id]);

    const fetchService = async () => {
        try {
            setLoading(true);
            // contentService.getService already returns the service object directly
            const service = await contentService.getService(id);
            setFormData({
                title: service.title || '',
                description: service.description || '',
                icon: service.icon || 'Code2',
                highlights: Array.isArray(service.highlights) ? service.highlights.join('\n') : ''
            });
        } catch (err) {
            console.error('Error fetching service:', err);
            setError('Failed to load service');
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

            const apiData = {
                title: formData.title,
                description: formData.description,
                icon: formData.icon,
                highlights: formData.highlights.split('\n').filter(line => line.trim() !== '')
            };

            if (id) {
                await contentService.updateService(id, apiData);
                logAction({
                    type: 'content_updated',
                    severity: 'info',
                    description: `Updated service: "${apiData.title}"`,
                    details: { contentType: 'Service', contentId: id }
                });
            } else {
                await contentService.createService(apiData);
                logAction({
                    type: 'content_created',
                    severity: 'success',
                    description: `Created new service: "${apiData.title}"`,
                    details: { contentType: 'Service' }
                });
            }

            navigate('/admin/content/services');
        } catch (err) {
            console.error('Error saving service:', err);
            setError(err.message || 'Failed to save service');
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
                        onClick={() => navigate('/admin/content/services')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Go back"
                    >
                        <ArrowLeft size={24} className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {id ? 'Edit Service' : 'Add Service'}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {id ? 'Update service details' : 'Create a new service'}
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
                                    placeholder="e.g. SOFTWARE ENGINEERING"
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
                                    placeholder="Describe what this service offers..."
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

                            {/* Highlights */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Highlights (One per line)
                                </label>
                                <textarea
                                    name="highlights"
                                    value={formData.highlights}
                                    onChange={handleInputChange}
                                    rows={5}
                                    placeholder="Example:&#10;Web & mobile app development&#10;API integration&#10;Cloud deployment"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] resize-none transition-all font-mono text-sm"
                                />
                                <p className="text-xs text-gray-500 mt-2">Key features of this service, one per line</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 justify-end">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/content/services')}
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
                                {id ? 'Update Service' : 'Create Service'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </AdminLayout>
    );
};

export default ServiceFormPage;
