
/**
 * About Quote Management Page
 * Admin interface to manage the "About ZyraTech" quote and stats section on homepage
 */

import React, { useState, useEffect } from 'react';
import {
    Save,
    Quote,
    Loader,
    Image as ImageIcon
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import contentService from '../../../services/contentService';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';

const AboutQuoteManagementPage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        quote: '',
        authorName: '',
        authorTitle: '',
        authorImage: '',
        stat1Value: '',
        stat1Label: '',
        stat2Value: '',
        stat2Label: '',
        stat3Value: '',
        stat3Label: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await contentService.getAboutQuote();
                if (data) {
                    setFormData(data);
                }
            } catch (error) {
                console.error('Error fetching about quote data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await contentService.updateAboutQuote(formData);
            dispatch(openConfirmDialog({
                title: 'Success',
                message: 'About section updated successfully.',
                confirmText: 'OK',
                hideCancelButton: true
            }));
        } catch (error) {
            console.error('Error updating about quote:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <Loader className="animate-spin text-[#004fa2]" size={32} />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Quote className="text-blue-600" size={22} />
                        </div>
                        About Section Management
                    </h1>
                    <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                        Manage the introductory quote and statistics on the homepage
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-8">

                    {/* Quote Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                            Main Content
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Quote / Mission Statement <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="quote"
                                value={formData.quote}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Author / Section Title
                                </label>
                                <input
                                    type="text"
                                    name="authorName"
                                    value={formData.authorName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]"
                                    placeholder="e.g. ZyraTech Leadership"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subtitle / Role
                                </label>
                                <input
                                    type="text"
                                    name="authorTitle"
                                    value={formData.authorTitle}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]"
                                    placeholder="e.g. Empowering Ghana's Tech Future"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image URL
                                </label>
                                <div className="flex gap-4 items-start">
                                    <input
                                        type="text"
                                        name="authorImage"
                                        value={formData.authorImage}
                                        onChange={handleChange}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]"
                                        placeholder="/images/tex1.png"
                                    />
                                    {formData.authorImage && (
                                        <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
                                            <img
                                                src={formData.authorImage}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                            Key Statistics
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Stat 1 */}
                            <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase">Statistic 1</h3>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Value</label>
                                    <input
                                        type="text"
                                        name="stat1Value"
                                        value={formData.stat1Value}
                                        onChange={handleChange}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
                                        placeholder="e.g. 2024"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Label</label>
                                    <input
                                        type="text"
                                        name="stat1Label"
                                        value={formData.stat1Label}
                                        onChange={handleChange}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
                                        placeholder="e.g. Founded"
                                    />
                                </div>
                            </div>

                            {/* Stat 2 */}
                            <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase">Statistic 2</h3>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Value</label>
                                    <input
                                        type="text"
                                        name="stat2Value"
                                        value={formData.stat2Value}
                                        onChange={handleChange}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
                                        placeholder="e.g. 50+"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Label</label>
                                    <input
                                        type="text"
                                        name="stat2Label"
                                        value={formData.stat2Label}
                                        onChange={handleChange}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
                                        placeholder="e.g. Trainees"
                                    />
                                </div>
                            </div>

                            {/* Stat 3 */}
                            <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase">Statistic 3</h3>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Value</label>
                                    <input
                                        type="text"
                                        name="stat3Value"
                                        value={formData.stat3Value}
                                        onChange={handleChange}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
                                        placeholder="e.g. 1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Label</label>
                                    <input
                                        type="text"
                                        name="stat3Label"
                                        value={formData.stat3Label}
                                        onChange={handleChange}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
                                        placeholder="e.g. Location"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 bg-[#004fa2] text-white px-8 py-3 rounded-lg hover:bg-[#003d7a] transition-colors font-medium shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <Loader size={20} className="animate-spin" />
                                    Saving Changes...
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AboutQuoteManagementPage;
