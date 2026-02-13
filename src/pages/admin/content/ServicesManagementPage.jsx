
/**
 * Services Management Page
 * Admin interface to manage homepage services list
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
    Briefcase
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import contentService from '../../../services/contentService';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';

const ServicesManagementPage = () => {
    const dispatch = useDispatch();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentService, setCurrentService] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [saving, setSaving] = useState(false);

    // Initial form state
    const initialFormState = {
        title: '',
        description: '',
        icon: 'Code2',
        highlights: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    // Fetch services on mount
    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await contentService.getAllServices();
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (service = null) => {
        if (service) {
            setCurrentService(service);
            setFormData({
                title: service.title,
                description: service.description || '',
                icon: service.icon || 'Code2',
                highlights: Array.isArray(service.highlights) ? service.highlights.join('\n') : ''
            });
        } else {
            setCurrentService(null);
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentService(null);
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
            // Prepare data for API
            const apiData = {
                ...formData,
                highlights: formData.highlights.split('\n').filter(line => line.trim() !== '')
            };

            if (currentService) {
                // Update existing
                await contentService.updateService(currentService.id, apiData);
            } else {
                // Create new
                await contentService.createService(apiData);
            }
            await fetchServices(); // Refresh list
            handleCloseModal();
        } catch (error) {
            console.error('Error saving service:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = (service) => {
        dispatch(openConfirmDialog({
            title: 'Delete Service',
            message: `Are you sure you want to delete "${service.title}"?`,
            isDangerous: true,
            confirmLabel: 'Delete',
            onConfirm: async () => {
                try {
                    await contentService.deleteService(service.id);
                    setServices(services.filter(s => s.id !== service.id));
                } catch (error) {
                    console.error('Error deleting service:', error);
                }
            }
        }));
    };

    // Filter services based on search
    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Briefcase className="text-blue-600" size={22} />
                            </div>
                            Services Management
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Manage the services listed on the homepage
                        </p>
                    </div>

                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-[#004fa2] text-white px-4 py-2 rounded-lg hover:bg-[#003d7a] transition-colors shadow-sm"
                    >
                        <Plus size={18} />
                        <span>Add New Service</span>
                    </button>
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search services..."
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
                ) : filteredServices.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="text-gray-400" size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
                        <p className="text-gray-500 mb-6">Get started by adding your services.</p>
                        <button
                            onClick={() => handleOpenModal()}
                            className="inline-flex items-center gap-2 text-[#004fa2] font-medium hover:underline"
                        >
                            <Plus size={16} />
                            Add Service
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredServices.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full"
                            >
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {service.title}
                                    </h3>
                                    {service.description && (
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                            {service.description}
                                        </p>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => handleOpenModal(service)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit Service"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete Service"
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
                        <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl transform transition-all my-8 max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl sticky top-0 z-10">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {currentService ? 'Edit Service' : 'Add New Service'}
                                </h3>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-1 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Service Title <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                            placeholder="e.g. SOFTWARE ENGINEERING"
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
                                            placeholder="Brief description of the service..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Service Icon
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
                                            <option value="Briefcase">Business / General</option>
                                            <option value="Globe">Web / Global</option>
                                            <option value="Smartphone">Mobile / Apps</option>
                                            <option value="Database">Data / Storage</option>
                                            <option value="Layout">Design / UI/UX</option>
                                            <option value="Cpu">Hardware / IoT</option>
                                        </select>
                                        <p className="text-xs text-gray-500 mt-1">Select an icon representing the service.</p>
                                    </div>

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Role Highlights (One per line)
                                        </label>
                                        <textarea
                                            name="highlights"
                                            value={formData.highlights}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] resize-none transition-all font-mono text-sm"
                                            placeholder="Example:&#10;Web & mobile app development&#10;API integration&#10;Cloud deployment"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Enter key features or offerings, one per line.</p>
                                    </div>
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
                                        className="flex items-center gap-2 bg-[#004fa2] text-white px-6 py-2 rounded-lg hover:bg-[#003d7a] transition-colors font-medium shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {saving ? (
                                            <>
                                                <Loader size={18} className="animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save size={18} />
                                                Save Service
                                            </>
                                        )}
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
