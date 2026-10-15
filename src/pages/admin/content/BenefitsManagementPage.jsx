/**
 * Benefits Management Page
 * Standalone page for managing "Why Choose Us" benefits
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Loader,
    CheckCircle
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import contentService from '../../../services/contentService';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import { useActivityLogger } from '../../../hooks/useActivityLogger';

const BenefitsManagementPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { logAction } = useActivityLogger();
    const [benefits, setBenefits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch benefits on mount
    useEffect(() => {
        fetchBenefits();
    }, []);

    const fetchBenefits = async () => {
        try {
            setLoading(true);
            const response = await contentService.getAllBenefits();
            // contentService already extracts response.data.data, so response is an array
            setBenefits(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error('Error fetching benefits:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (item) => {
        dispatch(openConfirmDialog({
            title: 'Delete Benefit',
            message: `Are you sure you want to delete "${item.title}"?`,
            isDangerous: true,
            confirmLabel: 'Delete',
            onConfirm: async () => {
                try {
                    await contentService.deleteBenefit(item.id);
                    setBenefits(benefits.filter(b => b.id !== item.id));
                    logAction({
                        type: 'content_deleted',
                        severity: 'warning',
                        description: `Deleted benefit: "${item.title}"`,
                        details: { contentType: 'Benefit', contentId: item.id }
                    });
                } catch (error) {
                    console.error('Error deleting:', error);
                }
            }
        }));
    };

    const handleAddClick = () => {
        navigate('/admin/content/benefits/add');
    };

    const handleEditClick = (item) => {
        navigate(`/admin/content/benefits/edit/${item.id}`);
    };

    const filteredData = benefits.filter(item =>
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
                                <CheckCircle className="text-blue-600" size={22} />
                            </div>
                            Why Choose Us
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-14">
                            Manage "Why Choose Us" benefits shown on the homepage
                        </p>
                    </div>

                    <button
                        onClick={handleAddClick}
                        className="flex items-center gap-2 bg-[#004fa2] text-white px-4 py-2 rounded-lg hover:bg-[#003d7a] transition-colors shadow-sm"
                    >
                        <Plus size={18} />
                        <span>Add Benefit</span>
                    </button>
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search benefits..."
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
                            <CheckCircle className="text-gray-400" size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No benefits found
                        </h3>
                        <p className="text-gray-500 mb-6">Get started by adding your first benefit.</p>
                        <button
                            onClick={handleAddClick}
                            className="inline-flex items-center gap-2 text-[#004fa2] font-medium hover:underline"
                        >
                            <Plus size={16} />
                            Add Benefit
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
                                </div>
                                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => handleEditClick(item)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit Benefit"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete Benefit"
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

export default BenefitsManagementPage;
