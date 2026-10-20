
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
    const [uploading, setUploading] = useState(false);

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

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // File validation
        if (file.size > 5 * 1024 * 1024) {
            dispatch(openConfirmDialog({
                title: 'Error',
                message: 'File must be smaller than 5MB',
                confirmText: 'OK',
                hideCancelButton: true
            }));
            return;
        }

        try {
            setUploading(true);
            const imageUrl = await contentService.uploadImage(file);
            setFormData(prev => ({
                ...prev,
                authorImage: imageUrl
            }));
        } catch (err) {
            console.error('Error uploading image:', err);
            dispatch(openConfirmDialog({
                title: 'Error',
                message: err.message || 'Failed to upload image',
                confirmText: 'OK',
                hideCancelButton: true
            }));
        } finally {
            setUploading(false);
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
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                            <Quote className="text-blue-600" size={22} />
                        </div>
                        About Section Management
                    </h1>
                    <p className="text-sm text-gray-500 mt-2 sm:mt-1 sm:ml-[52px]">
                        Manage the introductory quote and statistics on the homepage
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-6 sm:space-y-8">

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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Author Image (Upload)
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#004fa2] transition-colors cursor-pointer" onClick={() => !uploading && document.getElementById('author-image-upload').click()} style={{ opacity: uploading ? 0.6 : 1, pointerEvents: uploading ? 'none' : 'auto' }}>
                                    <input id="author-image-upload" type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
                                    <div className="flex flex-col items-center justify-center">
                                        {uploading ? (
                                            <>
                                                <div className="w-8 h-8 text-[#004fa2] mb-2 animate-spin">
                                                    <svg className="animate-spin h-8 w-8 text-[#004fa2]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                </div>
                                                <p className="text-sm font-medium text-gray-700">Uploading...</p>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                                <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                                                <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                {formData.authorImage && (
                                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-600 mb-2">Preview:</p>
                                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#004fa2]">
                                            <img decoding="async"
                                                src={formData.authorImage}
                                                alt="Preview"
                                                loading="lazy"
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Statistics Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                            Key Statistics
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
