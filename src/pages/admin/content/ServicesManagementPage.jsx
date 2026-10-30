/**
 * Services & Benefits Management Page
 * Admin interface to manage services and "Why Choose Us" benefits
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Loader,
    Briefcase,
    CheckCircle
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import contentService from '../../../services/contentService';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import { useActivityLogger } from '../../../hooks/useActivityLogger';

const ServicesManagementPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { logAction } = useActivityLogger();
    const [activeTab, setActiveTab] = useState('services'); // 'services' or 'benefits'
    const [services, setServices] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');



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
            // contentService already extracts response.data.data, so responses are arrays
            setServices(Array.isArray(servicesRes) ? servicesRes : []);
            setBenefits(Array.isArray(benefitsRes) ? benefitsRes : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
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

    const handleAddClick = () => {
        if (activeTab === 'services') {
            navigate('/admin/content/services/add');
        } else {
            navigate('/admin/content/benefits/add');
        }
    };

    const handleEditClick = (item) => {
        if (activeTab === 'services') {
            navigate(`/admin/content/services/edit/${item.id}`);
        } else {
            navigate(`/admin/content/benefits/edit/${item.id}`);
        }
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
                        onClick={handleAddClick}
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
                            onClick={handleAddClick}
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
                                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full overflow-hidden"
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
                                        onClick={() => handleEditClick(item)}
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
            </div>
        </AdminLayout>
    );
};

export default ServicesManagementPage;

