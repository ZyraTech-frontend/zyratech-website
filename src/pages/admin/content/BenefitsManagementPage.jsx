
/**
 * Benefits Management Page
 * Admin interface to manage homepage benefits section
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
    ShieldCheck,
    Cog,
    TrendingUp,
    DollarSign,
    Users,
    Globe,
    CheckCircle
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import contentService from '../../../services/contentService';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';

const REC_ICONS = {
    'ShieldCheck': ShieldCheck,
    'Cog': Cog,
    'TrendingUp': TrendingUp,
    'DollarSign': DollarSign,
    'Users': Users,
    'Globe': Globe,
    'CheckCircle': CheckCircle
};

const ICON_OPTIONS = Object.keys(REC_ICONS);

const BenefitsManagementPage = () => {
    const dispatch = useDispatch();
    const [benefits, setBenefits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentBenefit, setCurrentBenefit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [saving, setSaving] = useState(false);

    // Initial form state
    const initialFormState = {
        title: '',
        description: '',
        icon: 'CheckCircle'
    };

    const [formData, setFormData] = useState(initialFormState);

    // Fetch benefits on mount
    useEffect(() => {
        fetchBenefits();
    }, []);

    const fetchBenefits = async () => {
        try {
            setLoading(true);
            const response = await contentService.getAllBenefits();
            setBenefits(response.data);
        } catch (error) {
            console.error('Error fetching benefits:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (benefit = null) => {
        if (benefit) {
            setCurrentBenefit(benefit);
            setFormData({
                title: benefit.title,
                description: benefit.description || '',
                icon: benefit.icon || 'CheckCircle'
            });
        } else {
            setCurrentBenefit(null);
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentBenefit(null);
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
            if (currentBenefit) {
                await contentService.updateBenefit(currentBenefit.id, formData);
            } else {
                await contentService.createBenefit(formData);
            }
            await fetchBenefits();
            handleCloseModal();
        } catch (error) {
            console.error('Error saving benefit:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = (benefit) => {
        dispatch(openConfirmDialog({
            title: 'Delete Benefit',
            message: `Are you sure you want to delete "${benefit.title}"?`,
            isDangerous: true,
            confirmLabel: 'Delete',
            onConfirm: async () => {
                try {
                    await contentService.deleteBenefit(benefit.id);
                    setBenefits(benefits.filter(b => b.id !== benefit.id));
                } catch (error) {
                    console.error('Error deleting benefit:', error);
                }
            }
        }));
    };

    const filteredBenefits = benefits.filter(benefit =>
        benefit.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                <CheckCircle className="text-blue-600" size={22} />
                            </div>
                            Benefits Management
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Manage the benefits/features listed on the homepage
                        </p>
                    </div>

                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-[#004fa2] text-white px-4 py-2 rounded-lg hover:bg-[#003d7a] transition-colors shadow-sm"
                    >
                        <Plus size={18} />
                        <span>Add New Benefit</span>
                    </button>
                </div>

                {/* Content List */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className="animate-spin text-[#004fa2]" size={32} />
                    </div>
                ) : filteredBenefits.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No benefits found</h3>
                        <button
                            onClick={() => handleOpenModal()}
                            className="inline-flex items-center gap-2 text-[#004fa2] font-medium hover:underline"
                        >
                            <Plus size={16} />
                            Add Benefit
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBenefits.map((benefit) => {
                            const IconComp = REC_ICONS[benefit.icon] || CheckCircle;
                            return (
                                <div
                                    key={benefit.id}
                                    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#004fa2]">
                                            <IconComp size={20} />
                                        </div>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => handleOpenModal(benefit)}
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(benefit)}
                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-3">
                                        {benefit.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Edit/Create Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
                        <div className="bg-white rounded-2xl w-full max-w-md shadow-xl transform transition-all my-8">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {currentBenefit ? 'Edit Benefit' : 'Add New Benefit'}
                                </h3>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-1"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]"
                                        placeholder="e.g. Low Risk"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Icon
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {ICON_OPTIONS.map(iconName => {
                                            const IconComp = REC_ICONS[iconName];
                                            const isSelected = formData.icon === iconName;
                                            return (
                                                <button
                                                    key={iconName}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, icon: iconName }))}
                                                    className={`flex flex-col items-center justify-center p-2 rounded-lg border ${isSelected ? 'border-[#004fa2] bg-blue-50 text-[#004fa2]' : 'border-gray-200 hover:bg-gray-50'}`}
                                                >
                                                    <IconComp size={20} />
                                                    <span className="text-[10px] mt-1 truncate w-full text-center">{iconName}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] resize-none"
                                        placeholder="Description..."
                                    />
                                </div>

                                <div className="flex gap-3 justify-end pt-2">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
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
                                                Save Benefit
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

export default BenefitsManagementPage;
