
/**
 * Hero Slides Management Page
 * Admin interface to manage homepage hero carousel slides
 */

import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Eye,
    EyeOff,
    MoreVertical,
    Move,
    Save,
    X,
    Image as ImageIcon,
    ExternalLink,
    ChevronUp,
    ChevronDown,
    Loader
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import heroService from '../../../services/heroService';

const HeroSlidesManagementPage = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [saving, setSaving] = useState(false);

    // Initial form state
    const initialFormState = {
        title: '',
        description: '',
        pillar: '',
        backgroundImage: '',
        cta1Text: '',
        cta1Link: '',
        cta2Text: '',
        cta2Link: '',
        isVisible: true
    };

    const [formData, setFormData] = useState(initialFormState);

    // Fetch slides on mount
    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            setLoading(true);
            const response = await heroService.getAllSlides();
            setSlides(response.data);
        } catch (error) {
            console.error('Error fetching slides:', error);
            // Could add toast notification here
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (slide = null) => {
        if (slide) {
            setCurrentSlide(slide);
            setFormData({
                title: slide.title,
                description: slide.description,
                pillar: slide.pillar,
                backgroundImage: slide.backgroundImage,
                cta1Text: slide.cta1Text,
                cta1Link: slide.cta1Link,
                cta2Text: slide.cta2Text || '',
                cta2Link: slide.cta2Link || '',
                isVisible: slide.isVisible
            });
        } else {
            setCurrentSlide(null);
            setFormData(initialFormState);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentSlide(null);
        setFormData(initialFormState);
    };

    const calculateInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            if (currentSlide) {
                // Update existing
                await heroService.updateSlide(currentSlide.id, formData);
            } else {
                // Create new
                await heroService.createSlide(formData);
            }
            await fetchSlides(); // Refresh list
            handleCloseModal();
        } catch (error) {
            console.error('Error saving slide:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this slide?')) {
            try {
                await heroService.deleteSlide(id);
                setSlides(slides.filter(s => s.id !== id));
            } catch (error) {
                console.error('Error deleting slide:', error);
            }
        }
    };

    const handleToggleVisibility = async (slide) => {
        try {
            const updatedSlide = { ...slide, isVisible: !slide.isVisible };
            await heroService.updateSlide(slide.id, updatedSlide);
            setSlides(slides.map(s => s.id === slide.id ? updatedSlide : s));
        } catch (error) {
            console.error('Error toggling visibility:', error);
        }
    };

    // Filter slides based on search
    const filteredSlides = slides.filter(slide =>
        slide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slide.pillar.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout title="Homepage Hero Slides">
            <div className="space-y-6">

                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search slides..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]"
                        />
                    </div>

                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-[#004fa2] text-white px-4 py-2 rounded-lg hover:bg-[#003d7a] transition-colors shadow-sm"
                    >
                        <Plus size={18} />
                        <span>Add New Slide</span>
                    </button>
                </div>

                {/* Content List */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className="animate-spin text-[#004fa2]" size={32} />
                    </div>
                ) : filteredSlides.length === 0 ? (
                    <div className="bg-white rounded-xl border border-blue-100 p-12 text-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ImageIcon className="text-[#004fa2]" size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No slides found</h3>
                        <p className="text-gray-500 mb-6">Get started by creating your first hero slide.</p>
                        <button
                            onClick={() => handleOpenModal()}
                            className="inline-flex items-center gap-2 text-[#004fa2] font-medium hover:underline"
                        >
                            <Plus size={16} />
                            Create Slide
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredSlides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`bg-white rounded-xl border ${slide.isVisible ? 'border-blue-100' : 'border-gray-200 bg-gray-50'} p-4 shadow-sm hover:shadow-md transition-all duration-200`}
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Slide Preview Image */}
                                    <div className="w-full md:w-64 h-40 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative group">
                                        <img
                                            src={slide.backgroundImage}
                                            alt={slide.title}
                                            className={`w-full h-full object-cover transition-opacity ${slide.isVisible ? '' : 'opacity-60 grayscale'}`}
                                            onError={(e) => { e.target.src = '/placeholder-image.jpg' }}
                                        />
                                        {!slide.isVisible && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                                <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Hidden</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Slide Details */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <span className="text-xs font-semibold text-[#004fa2] uppercase tracking-wide mb-1 block">
                                                        {slide.pillar}
                                                    </span>
                                                    <h3 className={`text-lg font-bold ${slide.isVisible ? 'text-gray-900' : 'text-gray-500'}`}>
                                                        {slide.title}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => handleToggleVisibility(slide)}
                                                        className={`p-2 rounded-lg transition-colors ${slide.isVisible ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                                                        title={slide.isVisible ? "Hide Slide" : "Show Slide"}
                                                    >
                                                        {slide.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                                                    </button>
                                                    <button
                                                        onClick={() => handleOpenModal(slide)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit Slide"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(slide.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete Slide"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                                {slide.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {slide.cta1Text && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-blue-200 bg-blue-50 text-blue-700 text-xs">
                                                        <ExternalLink size={10} />
                                                        {slide.cta1Text} ({slide.cta1Link})
                                                    </span>
                                                )}
                                                {slide.cta2Text && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-gray-200 bg-gray-50 text-gray-600 text-xs">
                                                        <ExternalLink size={10} />
                                                        {slide.cta2Text} ({slide.cta2Link})
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Edit/Create Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
                        <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl transform transition-all my-8">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {currentSlide ? 'Edit Hero Slide' : 'Create New Slide'}
                                </h3>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-1"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">

                                {/* Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Headline Title <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={calculateInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]"
                                            placeholder="e.g. EDUCATION & INTERNSHIP"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Pillar / Category <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="pillar"
                                            value={formData.pillar}
                                            onChange={calculateInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]"
                                            placeholder="e.g. Education"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Background Image URL <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                name="backgroundImage"
                                                value={formData.backgroundImage}
                                                onChange={calculateInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]"
                                                placeholder="/images/hero2.jpeg"
                                            />
                                            <button
                                                type="button"
                                                className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors"
                                                title="Upload Image"
                                                onClick={() => document.getElementById('image-upload').click()}
                                            >
                                                <ImageIcon size={18} />
                                            </button>
                                            <input
                                                id="image-upload"
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    // Handle file selection (mock)
                                                    if (e.target.files[0]) {
                                                        const fakeUrl = URL.createObjectURL(e.target.files[0]);
                                                        setFormData(prev => ({ ...prev, backgroundImage: fakeUrl }));
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={calculateInputChange}
                                            required
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] resize-none"
                                            placeholder="Enter the slide description text..."
                                        />
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <ExternalLink size={16} className="text-[#004fa2]" />
                                        Call to Action Buttons
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Primary CTA */}
                                        <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                            <div className="text-xs font-semibold text-blue-800 uppercase">Primary Button</div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Labl Text</label>
                                                <input
                                                    type="text"
                                                    name="cta1Text"
                                                    value={formData.cta1Text}
                                                    onChange={calculateInputChange}
                                                    className="w-full px-3 py-1.5 border border-blue-200 rounded text-sm focus:outline-none focus:border-blue-500"
                                                    placeholder="e.g. Apply Now"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Link URL</label>
                                                <input
                                                    type="text"
                                                    name="cta1Link"
                                                    value={formData.cta1Link}
                                                    onChange={calculateInputChange}
                                                    className="w-full px-3 py-1.5 border border-blue-200 rounded text-sm focus:outline-none focus:border-blue-500"
                                                    placeholder="e.g. /apply"
                                                />
                                            </div>
                                        </div>

                                        {/* Secondary CTA */}
                                        <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <div className="text-xs font-semibold text-gray-700 uppercase">Secondary Button</div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Label Text</label>
                                                <input
                                                    type="text"
                                                    name="cta2Text"
                                                    value={formData.cta2Text}
                                                    onChange={calculateInputChange}
                                                    className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500"
                                                    placeholder="e.g. Learn More"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Link URL</label>
                                                <input
                                                    type="text"
                                                    name="cta2Link"
                                                    value={formData.cta2Link}
                                                    onChange={calculateInputChange}
                                                    className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500"
                                                    placeholder="e.g. /about"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="isVisible"
                                            checked={formData.isVisible}
                                            onChange={calculateInputChange}
                                            className="w-4 h-4 text-[#004fa2] rounded border-gray-300 focus:ring-[#004fa2]"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Slide Visible on Homepage</span>
                                    </label>

                                    <div className="flex gap-3">
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
                                                    Save Slide
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default HeroSlidesManagementPage;
