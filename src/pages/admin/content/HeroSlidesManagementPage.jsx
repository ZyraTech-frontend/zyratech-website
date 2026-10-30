
/**
 * Hero Slides Management Page
 * Admin interface to manage homepage hero carousel slides
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Eye,
    EyeOff,
    Image as ImageIcon,
    ExternalLink,
    Loader
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import heroService from '../../../services/heroService';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';

const HeroSlidesManagementPage = () => {
    const navigate = useNavigate();
    const { userPermissions, userRole } = useAuth();
    const dispatch = useDispatch();
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    // Permission check helper
    // Permission checks
    const canCreateContent = userPermissions?.includes('content') ?? false;
    const handlePermissionDenied = () => {
        dispatch(addNotification({
            type: 'error',
            title: 'Permission Required',
            message: 'You do not have permission to manage hero slides.',
            description: 'Contact Super Admin at admin@zyratechhub.com',
            duration: 6000
        }));
    };
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch slides on mount
    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            setLoading(true);
            const response = await heroService.getAllSlides();
            // heroService returns { data: [...] }, so extract it
            setSlides(response.data || []);
        } catch (error) {
            console.error('Error fetching slides:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        if (!canCreateContent) {
            handlePermissionDenied();
            return;
        }
        dispatch(openConfirmDialog({
            title: 'Delete Hero Slide',
            message: 'Are you sure you want to delete this slide? This action cannot be undone.',
            isDangerous: true,
            onConfirm: async () => {
                try {
                    await heroService.deleteSlide(id);
                    setSlides(slides.filter(s => s.id !== id));
                    dispatch(addNotification({ type: 'success', message: 'Slide deleted successfully.' }));
                } catch (error) {
                    console.error('Error deleting slide:', error);
                    dispatch(addNotification({ type: 'error', message: 'Failed to delete slide.' }));
                }
            }
        }));
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

    const handleAddClick = () => {
        if (!canCreateContent) {
            handlePermissionDenied();
            return;
        }
        navigate('/admin/content/hero/add');
    };

    const handleEditClick = (slide) => {
        if (!canCreateContent) {
            handlePermissionDenied();
            return;
        }
        navigate(`/admin/content/hero/edit/${slide.id}`);
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
                        onClick={handleAddClick}
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
                            onClick={handleAddClick}
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
                                className={`bg-white rounded-xl border ${slide.isVisible ? 'border-blue-100' : 'border-gray-200 bg-gray-50'} p-4 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Slide Preview Image */}
                                    <div className="w-full md:w-64 h-40 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative group">
                                        <img decoding="async"
                                            src={slide.backgroundImage}
                                            alt={slide.title}
                                            className={`w-full h-full object-cover transition-opacity ${slide.isVisible ? '' : 'opacity-60 grayscale'}`}
                                            loading="lazy"
                                            onError={(e) => { e.target.src = '/placeholder-image.webp' }}
                                        />
                                        {!slide.isVisible && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                                <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Hidden</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Slide Details */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                        <div className="min-w-0">
                                            <div className="flex justify-between items-start mb-2 gap-4">
                                                <div className="min-w-0 flex-1">
                                                    <span className="text-xs font-semibold text-[#004fa2] uppercase tracking-wide mb-1 block truncate">
                                                        {slide.pillar}
                                                    </span>
                                                    <h3 className={`text-lg font-bold truncate ${slide.isVisible ? 'text-gray-900' : 'text-gray-500'}`}>
                                                        {slide.title}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center gap-1 flex-shrink-0">
                                                    <button
                                                        onClick={() => handleToggleVisibility(slide)}
                                                        className={`p-2 rounded-lg transition-colors ${slide.isVisible ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                                                        title={slide.isVisible ? "Hide Slide" : "Show Slide"}
                                                    >
                                                        {slide.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditClick(slide)}
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

                                            <div className="flex flex-wrap gap-2 min-w-0">
                                                {slide.cta1Text && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-blue-200 bg-blue-50 text-blue-700 text-xs min-w-0">
                                                        <ExternalLink size={10} className="flex-shrink-0" />
                                                        <span className="truncate">{slide.cta1Text} ({slide.cta1Link})</span>
                                                    </span>
                                                )}
                                                {slide.cta2Text && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-gray-200 bg-gray-50 text-gray-600 text-xs min-w-0">
                                                        <ExternalLink size={10} className="flex-shrink-0" />
                                                        <span className="truncate">{slide.cta2Text} ({slide.cta2Link})</span>
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
            </div>
        </AdminLayout>
    );
};

export default HeroSlidesManagementPage;



