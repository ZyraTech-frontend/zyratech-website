/**
 * Services & Benefits Management Page
 * Admin interface to manage services and "Why Choose Us" benefits
 */

import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Save,
    X,
    Loader,
    Briefcase,
    CheckCircle
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import contentService from '../../../services/contentService';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import { useActivityLogger } from '../../../hooks/useActivityLogger';

const ServicesManagementPage = () => {
    const dispatch = useDispatch();
    const { logAction } = useActivityLogger();
    const [activeTab, setActiveTab] = useState('services'); // 'services' or 'benefits'
    const [services, setServices] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [saving, setSaving] = useState(false);

    // Initial form state
    const initialFormState = activeTab === 'services' ? {
        title: '',
        description: '',
        icon: 'Code2',
        highlights: ''
    } : {
        icon: 'ShieldCheck',
        title: '',
        description: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    // Fetch services and benefits on mount
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [servicesRes, benefitsRes] = await Promise.all([
                contentService.getAllServices(),
                contentService.getAllBenefits()
            ]);
            setServices(servicesRes.data || []);
            setBenefits(benefitsRes.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setCurrentItem(item);
            if (activeTab === 'services') {
                setFormData({
                    title: item.title,
                    description: item.description || '',
                    icon: item.icon || 'Code2',
                    highlights: Array.isArray(item.highlights) ? item.highlights.join('\n') : ''
                });
            } else {
                setFormData({
                    icon: item.icon || 'ShieldCheck',
                    title: item.title,
                    description: item.description || ''
                });
            }
        } else {
            setCurrentItem(null);
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
        setFormData(initialFormState);
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
        try {
            setSaving(true);
            
            if (activeTab === 'services') {
                const apiData = {
                    ...formData,
                    highlights: formData.highlights.split('\n').filter(line => line.trim() !== '')
                };

                if (currentItem) {
                    await contentService.updateService(currentItem.id, apiData);
                    logAction({
                        type: 'content_updated',
                        severity: 'info',
                        description: `Updated service: "${apiData.title}"`,
                        details: { contentType: 'Service', contentId: currentItem.id }
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
            } else {
                // Benefits
                if (currentItem) {
                    await contentService.updateBenefit(currentItem.id, formData);
                    logAction({
                        type: 'content_updated',
                        severity: 'info',
                        description: `Updated benefit: "${formData.title}"`,
                        details: { contentType: 'Benefit', contentId: currentItem.id }
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
            }
            
            await fetchData();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = (item) => {
        const isService = activeTab === 'services';
        dispatch(openConfirmDialog({
            title: `Delete ${isService ? 'Service' : 'Benefit'}`,
            message: `Are you sure you want to delete "${item.title}"?`,
            isDangerous: true,
            confirmLabel: 'Delete',
            onConfirm: async () => {
                try {
                    if (isService) {
                        await contentService.deleteService(item.id);
                        setServices(services.filter(s => s.id !== item.id));
                        logAction({
                            type: 'content_deleted',
                            severity: 'warning',
                            description: `Deleted service: "${item.title}"`,
                            details: { contentType: 'Service', contentId: item.id }
                        });
                    } else {
                        await contentService.deleteBenefit(item.id);
                        setBenefits(benefits.filter(b => b.id !== item.id));
                        logAction({
                            type: 'content_deleted',
                            severity: 'warning',
                            description: `Deleted benefit: "${item.title}"`,
                            details: { contentType: 'Benefit', contentId: item.id }
                        });
                    }
                } catch (error) {
                    console.error('Error deleting:', error);
                }
            }
        }));
    };

    const currentData = activeTab === 'services' ? services : benefits;
    const filteredData = currentData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Briefcase className="text-blue-600" size={22} />
                            </div>
                            Services & Benefits
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-14">
                            {activeTab === 'services' 
                                ? 'Manage services shown on the homepage' 
                                : 'Manage "Why Choose Us" benefits'}
                        </p>
                    </div>

                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-[#004fa2] text-white px-4 py-2 rounded-lg hover:bg-[#003d7a] transition-colors shadow-sm"
                    >
                        <Plus size={18} />
                        <span>Add {activeTab === 'services' ? 'Service' : 'Benefit'}</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-gray-200">
                    <button
                        onClick={() => {
                            setActiveTab('services');
                            setSearchTerm('');
                        }}
                        className={`px-4 py-3 font-medium transition-all border-b-2 ${
                            activeTab === 'services'
                                ? 'border-[#004fa2] text-[#004fa2]'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <Briefcase size={18} />
                            Services ({services.length})
                        </div>
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('benefits');
                            setSearchTerm('');
                        }}
                        className={`px-4 py-3 font-medium transition-all border-b-2 ${
                            activeTab === 'benefits'
                                ? 'border-[#004fa2] text-[#004fa2]'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle size={18} />
                            Why Choose Us ({benefits.length})
                        </div>
                    </button>
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab === 'services' ? 'services' : 'benefits'}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]"
                    />
                </div>

                {/* Content List */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className="animate-spin text-[#004fa2]" size={32} />
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            {activeTab === 'services' ? (
                                <Briefcase className="text-gray-400" size={32} />
                            ) : (
                                <CheckCircle className="text-gray-400" size={32} />
                            )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No {activeTab === 'services' ? 'services' : 'benefits'} found
                        </h3>
                        <p className="text-gray-500 mb-6">Get started by adding your first item.</p>
                        <button
                            onClick={() => handleOpenModal()}
                            className="inline-flex items-center gap-2 text-[#004fa2] font-medium hover:underline"
                        >
                            <Plus size={16} />
                            Add {activeTab === 'services' ? 'Service' : 'Benefit'}
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredData.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full"
                            >
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                            {item.description}
                                        </p>
                                    )}
                                    {activeTab === 'services' && item.highlights && (
                                        <div className="text-xs text-gray-500 space-y-1">
                                            {Array.isArray(item.highlights) && item.highlights.map((h, idx) => (
                                                <div key={idx}>• {h}</div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => handleOpenModal(item)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title={`Edit ${activeTab === 'services' ? 'Service' : 'Benefit'}`}
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title={`Delete ${activeTab === 'services' ? 'Service' : 'Benefit'}`}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Edit/Create Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
                        <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl transform transition-all max-h-[85vh] flex flex-col">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl sticky top-0 z-10">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {currentItem ? 'Edit' : 'Add'} {activeTab === 'services' ? 'Service' : 'Benefit'}
                                </h3>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-1 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Title <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                            placeholder={activeTab === 'services' 
                                                ? 'e.g. SOFTWARE ENGINEERING' 
                                                : 'e.g. Low Risk'}
                                        />
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] resize-none transition-all"
                                            placeholder="Brief description..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Icon
                                        </label>
                                        <select
                                            name="icon"
                                            value={formData.icon}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] bg-white transition-all"
                                        >
                                            <option value="Code2">Code / Development</option>
                                            <option value="ServerCog">Server / Infrastructure</option>
                                            <option value="BookOpen">Learning / Research</option>
                                            <option value="GraduationCap">Education / Training</option>
                                            <option value="Shield">Security / Managed Services</option>
                                            <option value="ShieldCheck">Shield Check</option>
                                            <option value="Briefcase">Business / General</option>
                                            <option value="Globe">Web / Global</option>
                                            <option value="Smartphone">Mobile / Apps</option>
                                            <option value="Database">Data / Storage</option>
                                            <option value="Layout">Design / UI/UX</option>
                                            <option value="Cpu">Hardware / IoT</option>
                                            <option value="Cog">Cog</option>
                                            <option value="TrendingUp">TrendingUp</option>
                                            <option value="DollarSign">DollarSign</option>
                                            <option value="Users">Users</option>
                                        </select>
                                    </div>

                                    {activeTab === 'services' && (
                                        <div className="col-span-1 md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Highlights (One per line)
                                            </label>
                                            <textarea
                                                name="highlights"
                                                value={formData.highlights}
                                                onChange={handleInputChange}
                                                rows={4}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] resize-none transition-all font-mono text-sm"
                                                placeholder="Example:&#10;Web & mobile app development&#10;API integration&#10;Cloud deployment"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Key features, one per line.</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium border border-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-6 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors font-medium"
                                    >
                                        {saving && <Loader size={16} className="animate-spin" />}
                                        {currentItem ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ServicesManagementPage;
