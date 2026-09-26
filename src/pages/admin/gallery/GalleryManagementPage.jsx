/**
 * Gallery Management Page (Admin)
 * Production-ready admin interface for managing media gallery albums and images
 * Features: Album CRUD, image uploads with progress, search, filtering, pagination
 * Updated: Drag & drop photo upload, category selector, live gallery design matching
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import galleryService from '../../../services/galleryService';
import {
    Image,
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    Upload,
    Grid,
    List,
    ChevronLeft,
    ChevronRight,
    X,
    FileImage,
    FolderOpen,
    Calendar,
    ExternalLink,
    AlertCircle,
    CheckCircle,
    ImagePlus,
    Loader,
    RotateCw,
    Tag
} from 'lucide-react';

// Category badge component
const CategoryBadge = ({ category }) => {
    const categoryStyles = {
        events: 'bg-blue-100 text-blue-800 border border-blue-200',
        training: 'bg-purple-100 text-purple-800 border border-purple-200',
        community: 'bg-green-100 text-green-800 border border-green-200'
    };

    const categoryLabels = {
        events: 'Events',
        training: 'Training',
        community: 'Community'
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${categoryStyles[category] || categoryStyles.events}`}>
            {categoryLabels[category] || category}
        </span>
    );
};

// Photo count badge component
const PhotoCountBadge = ({ count }) => (
    <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full flex items-center gap-1 text-[10px] font-bold backdrop-blur-sm">
        <FileImage size={12} /> {count} photo{count !== 1 ? 's' : ''}
    </div>
);

// Loading skeleton component
const AlbumSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col p-2 animate-pulse">
        <div className="relative aspect-video rounded-lg overflow-hidden mb-2 bg-gray-200" />
        <div className="px-1 flex flex-col flex-1">
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-3 bg-gray-200 rounded w-3/4" />
        </div>
    </div>
);

const GalleryManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuperAdmin } = usePermissions();

    // State management
    const [albums, setAlbums] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('grid');
    const [showAlbumModal, setShowAlbumModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [editingAlbum, setEditingAlbum] = useState(null);
    const [viewingAlbum, setViewingAlbum] = useState(null);
    const [viewingAlbumImages, setViewingAlbumImages] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [uploadQueue, setUploadQueue] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [albumFormData, setAlbumFormData] = useState({ 
        title: '', 
        description: '', 
        cover: '', 
        coverFile: null,
        coverPreview: null,
        category: 'events'
    });
    const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, pages: 1 });
    const [isLoadingImages, setIsLoadingImages] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const fileInputRef = useRef(null);
    const coverImageInputRef = useRef(null);
    const dragRef = useRef(null);
    const itemsPerPage = 12;

    // Load albums on component mount
    useEffect(() => {
        loadAlbums();
    }, []);

    // Load album images when viewing album
    useEffect(() => {
        if (viewingAlbum) {
            loadAlbumImages(viewingAlbum.id);
        }
    }, [viewingAlbum]);

    // Load albums from API
    const loadAlbums = async (page = 1) => {
        try {
            setIsLoading(true);
            const response = await galleryService.getAllAlbums(page, itemsPerPage);
            setAlbums(response.albums || []);
            setPagination(response.pagination || { page, limit: itemsPerPage, total: 0, pages: 1 });
            setCurrentPage(page);
        } catch (error) {
            console.error('Error loading albums:', error);
            dispatch(addNotification({
                type: 'error',
                message: 'Failed to load albums. Please try again.'
            }));
            setAlbums([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Load images for viewing album
    const loadAlbumImages = async (albumId) => {
        try {
            setIsLoadingImages(true);
            const response = await galleryService.getAlbumImages(albumId, 1, 200);
            setViewingAlbumImages(response.images || []);
            setSelectedImageIndex(0);
        } catch (error) {
            console.error('Error loading album images:', error);
            dispatch(addNotification({
                type: 'error',
                message: 'Failed to load album images.'
            }));
            setViewingAlbumImages([]);
        } finally {
            setIsLoadingImages(false);
        }
    };

    // Handle file selection for upload
    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files).map(f => ({
                file: f,
                name: f.name,
                size: (f.size / (1024 * 1024)).toFixed(2),
                progress: 0,
                id: Math.random().toString(36).substr(2, 9)
            }));
            setUploadQueue(prev => [...prev, ...newFiles]);
        }
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const removeQueuedFile = (fileId) => {
        setUploadQueue(prev => prev.filter(f => f.id !== fileId));
    };

    // Filtered albums based on search
    const filteredAlbums = useMemo(() => {
        if (!searchQuery) return albums;
        
        const query = searchQuery.toLowerCase();
        return albums.filter(album =>
            album.title.toLowerCase().includes(query) ||
            album.description.toLowerCase().includes(query)
        );
    }, [albums, searchQuery]);

    // Statistics
    const stats = useMemo(() => ({
        total: pagination.total || albums.length,
        totalImages: albums.reduce((acc, album) => acc + (album.imageCount || 0), 0)
    }), [albums, pagination]);

    // Helper to open edit album modal
    const openEditAlbumModal = (album) => {
        setEditingAlbum(album);
        setAlbumFormData({
            title: album.title,
            description: album.description,
            cover: album.cover || '',
            coverFile: null,
            coverPreview: album.cover || null,
            category: album.category || 'events'
        });
        setShowAlbumModal(true);
    };

    // Helper to reset form
    const resetAlbumForm = () => {
        setEditingAlbum(null);
        setAlbumFormData({ 
            title: '', 
            description: '', 
            cover: '', 
            coverFile: null,
            coverPreview: null,
            category: 'events'
        });
        setShowAlbumModal(false);
    };

    // Handle drag and drop for cover image
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDropCover = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processCoverImage(e.dataTransfer.files[0]);
        }
    };

    // Process cover image (drag & drop or click)
    const processCoverImage = (file) => {
        if (!file.type.startsWith('image/')) {
            dispatch(addNotification({
                type: 'error',
                message: 'Please upload an image file'
            }));
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setAlbumFormData(prev => ({
                ...prev,
                coverFile: file,
                coverPreview: event.target?.result,
                cover: '' // Clear URL field
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleCoverImageSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            processCoverImage(file);
        }
    };

    const removeCoverImage = () => {
        setAlbumFormData(prev => ({
            ...prev,
            coverFile: null,
            coverPreview: null,
            cover: ''
        }));
        if (coverImageInputRef.current) {
            coverImageInputRef.current.value = '';
        }
    };

    // Handle album cover image upload (seamless file picker)
    const handleCoverImageSelectOld = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create preview URL
            const reader = new FileReader();
            reader.onload = (event) => {
                setAlbumFormData(prev => ({
                    ...prev,
                    cover: event.target?.result // Store as base64 or URL for preview
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle create/update album
    const handleSaveAlbum = async () => {
        if (!albumFormData.title.trim()) {
            dispatch(addNotification({
                type: 'error',
                message: 'Album title is required'
            }));
            return;
        }

        try {
            setIsLoading(true);
            if (editingAlbum) {
                // Update existing album
                const updated = await galleryService.updateAlbum(editingAlbum.id, albumFormData);
                setAlbums(albums.map(a => a.id === editingAlbum.id ? updated : a));
                dispatch(addNotification({
                    type: 'success',
                    message: 'Album updated successfully'
                }));
            } else {
                // Create new album
                const created = await galleryService.createAlbum(albumFormData);
                setAlbums([created, ...albums]);
                dispatch(addNotification({
                    type: 'success',
                    message: 'Album created successfully'
                }));
            }
            resetAlbumForm();
        } catch (error) {
            console.error('Error saving album:', error);
            dispatch(addNotification({
                type: 'error',
                message: editingAlbum ? 'Failed to update album' : 'Failed to create album'
            }));
        } finally {
            setIsLoading(false);
        }
    };

    // Handle delete album
    const handleDeleteAlbum = (album) => {
        dispatch(openConfirmDialog({
            title: 'Delete Album',
            message: `Are you sure you want to delete "${album.title}"? This will also delete all ${album.imageCount || 0} images in this album. This action cannot be undone.`,
            isDangerous: true,
            onConfirm: async () => {
                try {
                    await galleryService.deleteAlbum(album.id);
                    setAlbums(albums.filter(a => a.id !== album.id));
                    if (viewingAlbum?.id === album.id) {
                        setViewingAlbum(null);
                    }
                    dispatch(addNotification({
                        type: 'success',
                        message: 'Album deleted successfully'
                    }));
                } catch (error) {
                    console.error('Error deleting album:', error);
                    dispatch(addNotification({
                        type: 'error',
                        message: 'Failed to delete album'
                    }));
                }
            }
        }));
    };

    // Handle upload images
    const handleUploadImages = async () => {
        if (!viewingAlbum) {
            dispatch(addNotification({
                type: 'error',
                message: 'Please select an album first'
            }));
            return;
        }

        if (uploadQueue.length === 0) {
            dispatch(addNotification({
                type: 'error',
                message: 'Please select images to upload'
            }));
            return;
        }

        try {
            setIsUploading(true);
            const files = uploadQueue.map(item => item.file);
            
            await galleryService.uploadMultipleImagesToAlbum(
                viewingAlbum.id,
                files,
                (progress) => {
                    setUploadProgress(progress);
                }
            );

            dispatch(addNotification({
                type: 'success',
                message: `Successfully uploaded ${uploadQueue.length} image(s)`
            }));
            
            setUploadQueue([]);
            setShowUploadModal(false);
            setUploadProgress(0);
            
            // Reload album images
            await loadAlbumImages(viewingAlbum.id);
        } catch (error) {
            console.error('Error uploading images:', error);
            dispatch(addNotification({
                type: 'error',
                message: 'Failed to upload images. Please try again.'
            }));
        } finally {
            setIsUploading(false);
        }
    };

    // Handle delete image
    const handleDeleteImage = (image) => {
        dispatch(openConfirmDialog({
            title: 'Delete Image',
            message: `Are you sure you want to delete this image? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: async () => {
                try {
                    await galleryService.deleteImage(image.id);
                    setViewingAlbumImages(viewingAlbumImages.filter(img => img.id !== image.id));
                    dispatch(addNotification({
                        type: 'success',
                        message: 'Image deleted successfully'
                    }));
                } catch (error) {
                    console.error('Error deleting image:', error);
                    dispatch(addNotification({
                        type: 'error',
                        message: 'Failed to delete image'
                    }));
                }
            }
        }));
    };

    const handleViewAlbum = (album) => {
        setViewingAlbum(album);
    };

    const handleAddNew = () => {
        resetAlbumForm();
        setShowAlbumModal(true);
    };

    const handleSearch = (value) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setSearchQuery('');
        setCurrentPage(1);
    };

    return (
        <AdminLayout>
            <div className="space-y-3 md:space-y-6 pb-8">
                {/* Page Header & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                            <Image size={18} className="text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-[11px] md:text-base font-bold text-gray-900 leading-tight">Gallery Management</h1>
                            <p className="text-[10px] text-gray-500">Manage albums and media</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <button
                            onClick={() => setShowUploadModal(true)}
                            disabled={!viewingAlbum}
                            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs font-semibold"
                        >
                            <Upload size={14} /> Upload
                        </button>
                        <button
                            onClick={handleAddNew}
                            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#004fa2] text-white rounded-lg hover:bg-blue-800 transition-all shadow-sm text-xs font-semibold"
                        >
                            <Plus size={14} /> Album
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    {[
                        { title: 'Total Albums', count: stats.total, icon: FolderOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { title: 'Total Photos', count: stats.totalImages, icon: FileImage, color: 'text-purple-600', bg: 'bg-purple-50' },
                        { title: 'Selected', count: viewingAlbum?.imageCount || 0, icon: Image, color: 'text-cyan-600', bg: 'bg-cyan-50' },
                        { title: 'Status', count: 'Ready', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-xl p-2.5 flex items-center justify-start gap-2.5 shadow-sm">
                            <div className={`w-7 h-7 rounded-md shrink-0 flex items-center justify-center ${stat.bg}`}>
                                <stat.icon className={stat.color} size={14} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide truncate">{stat.title}</p>
                                <p className="text-sm font-bold text-gray-900 leading-none">{stat.count}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters and Search */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-2 mb-4">
                    <div className="col-span-2 md:col-span-9 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search albums by title or description..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all"
                        />
                    </div>

                    <div className="col-span-2 md:col-span-3 flex items-center justify-end gap-1">
                        <div className="flex bg-white border border-gray-100 rounded-xl p-0.5 shadow-sm h-[34px]">
                            <button 
                                onClick={() => setViewMode('grid')} 
                                className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${viewMode === 'grid' ? 'bg-[#004fa2] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <Grid size={14} />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')} 
                                className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${viewMode === 'list' ? 'bg-[#004fa2] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <List size={14} />
                            </button>
                        </div>
                        {searchQuery && (
                            <button 
                                onClick={resetFilters} 
                                className="bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 h-[34px] w-[34px] rounded-xl transition-colors shadow-sm flex items-center justify-center shrink-0"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Albums Grid/List */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {[...Array(itemsPerPage)].map((_, i) => (
                            <AlbumSkeleton key={i} />
                        ))}
                    </div>
                ) : filteredAlbums.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Image className="text-gray-400" size={28} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No albums found</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            {searchQuery ? 'Try adjusting your search criteria' : 'Create your first album to get started'}
                        </p>
                        <button
                            onClick={() => {
                                if (searchQuery) resetFilters();
                                else handleAddNew();
                            }}
                            className="px-4 py-2 text-sm text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors font-medium"
                        >
                            {searchQuery ? 'Reset Search' : 'Create Album'}
                        </button>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {filteredAlbums.map((album) => (
                            <div key={album.id} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:border-[#004fa2] hover:shadow-md transition-all group p-2">
                                <div className="relative aspect-video rounded-lg overflow-hidden mb-2 bg-gray-100">
                                    {album.cover ? (
                                        <img 
                                            decoding="async" 
                                            src={album.cover} 
                                            alt={album.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                            loading="lazy" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <FolderOpen size={32} />
                                        </div>
                                    )}
                                    {/* Category Badge */}
                                    <div className="absolute top-2 left-2">
                                        <CategoryBadge category={album.category || 'events'} />
                                    </div>
                                    {/* Photo Count Badge */}
                                    <PhotoCountBadge count={album.imageCount || 0} />
                                </div>
                                <div className="px-1 flex flex-col flex-1">
                                    <h3 className="text-xs font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-[#004fa2] transition-colors">{album.title}</h3>
                                    <p className="text-[9px] text-gray-500 line-clamp-2 mb-2">{album.description}</p>
                                    <div className="mt-auto flex items-center justify-between text-[9px] text-gray-400 font-medium">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={10} /> {new Date(album.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center justify-between pt-2 border-t border-gray-50 px-1">
                                    <div className="flex items-center gap-1">
                                        <button 
                                            onClick={() => handleViewAlbum(album)} 
                                            className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-[#004fa2]"
                                            title="View Album"
                                        >
                                            <Eye size={12}/>
                                        </button>
                                        {isSuperAdmin && (
                                            <>
                                                <button 
                                                    onClick={() => openEditAlbumModal(album)} 
                                                    className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-green-600"
                                                    title="Edit Album"
                                                >
                                                    <Edit size={12}/>
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteAlbum(album)} 
                                                    className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-600"
                                                    title="Delete Album"
                                                >
                                                    <Trash2 size={12}/>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* List View */
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full min-w-[800px]">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Album</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Images</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredAlbums.map((album) => (
                                    <tr key={album.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                    {album.cover ? (
                                                        <img 
                                                            decoding="async"
                                                            src={album.cover}
                                                            alt={album.title}
                                                            className="w-full h-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <FolderOpen size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{album.title}</p>
                                                    <p className="text-xs text-gray-500">{album.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600 line-clamp-2">{album.description}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                                <FileImage size={14} className="text-gray-400" />
                                                {album.imageCount || 0}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                                <Calendar size={14} className="text-gray-400" />
                                                {new Date(album.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => handleViewAlbum(album)}
                                                    className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View Album"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                {isSuperAdmin && (
                                                    <>
                                                        <button
                                                            onClick={() => openEditAlbumModal(album)}
                                                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                            title="Edit Album"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteAlbum(album)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete Album"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">
                            Page <span className="font-semibold text-gray-900">{currentPage}</span> of{' '}
                            <span className="font-semibold text-gray-900">{pagination.pages}</span>
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => loadAlbums(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                                    const page = Math.max(1, currentPage - 2) + i;
                                    if (page > pagination.pages) return null;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => loadAlbums(page)}
                                            className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-all ${currentPage === page
                                                ? 'bg-[#004fa2] text-white shadow-md'
                                                : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                onClick={() => loadAlbums(Math.min(pagination.pages, currentPage + 1))}
                                disabled={currentPage === pagination.pages}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* View Album Modal with Images */}
            {viewingAlbum && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#004fa2] to-[#0066cc]">
                            <div className="flex items-center gap-3">
                                <div className="w-8 md:w-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <FolderOpen className="text-white" size={22} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">{viewingAlbum.title}</h2>
                                    <p className="text-blue-100 text-xs">
                                        {viewingAlbumImages.length} photos
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingAlbum(null)}
                                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 md:p-6 overflow-y-auto flex-1">
                            {isLoadingImages ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader className="text-[#004fa2] animate-spin" size={32} />
                                </div>
                            ) : viewingAlbumImages.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Image className="text-gray-400" size={32} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No images yet</h3>
                                    <p className="text-sm text-gray-500 mb-4">Upload images to this album</p>
                                    <button
                                        onClick={() => setShowUploadModal(true)}
                                        className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-blue-800 transition-colors font-medium text-sm"
                                    >
                                        <Upload size={14} className="inline mr-1" /> Upload Images
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {viewingAlbumImages.map((image, idx) => (
                                        <div key={image.id} className="relative group">
                                            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                                                <img 
                                                    decoding="async"
                                                    src={image.url} 
                                                    alt={image.caption || `Image ${idx + 1}`} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                            </div>
                                            {isSuperAdmin && (
                                                <button
                                                    onClick={() => handleDeleteImage(image)}
                                                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Delete Image"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                            {image.caption && (
                                                <p className="text-xs text-gray-600 mt-1 line-clamp-1">{image.caption}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                            <div className="text-sm text-gray-600">
                                <span className="font-semibold">{viewingAlbumImages.length}</span> images
                            </div>
                            <div className="flex items-center gap-2">
                                {isSuperAdmin && (
                                    <>
                                        <button
                                            onClick={() => {
                                                setViewingAlbum(null);
                                                openEditAlbumModal(viewingAlbum);
                                            }}
                                            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex items-center gap-1.5"
                                        >
                                            <Edit size={14} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => setShowUploadModal(true)}
                                            className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-blue-800 transition-colors font-medium text-sm flex items-center gap-1.5"
                                        >
                                            <Upload size={14} />
                                            Upload Images
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => setViewingAlbum(null)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Create/Edit Album Modal */}
            {showAlbumModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 md:w-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                    {editingAlbum ? <Edit className="text-white" size={20} /> : <Plus className="text-white" size={20} />}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        {editingAlbum ? 'Edit Album' : 'Create Album'}
                                    </h2>
                                    <p className="text-gray-500 text-xs">
                                        {editingAlbum ? 'Update album information' : 'Create a new album to organize your media'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={resetAlbumForm}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                            {/* Album Title */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Album Title *</label>
                                <input
                                    type="text"
                                    value={albumFormData.title}
                                    onChange={(e) => setAlbumFormData({...albumFormData, title: e.target.value})}
                                    placeholder="Enter album title"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={albumFormData.description}
                                    onChange={(e) => setAlbumFormData({...albumFormData, description: e.target.value})}
                                    placeholder="Enter album description (optional)"
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all resize-none"
                                />
                            </div>

                            {/* Category Selector */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <Tag size={16} /> Album Category *
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: 'events', label: 'Events', desc: 'Event photos' },
                                        { value: 'training', label: 'Training', desc: 'Training programs' },
                                        { value: 'community', label: 'Community', desc: 'Community moments' }
                                    ].map((cat) => (
                                        <button
                                            key={cat.value}
                                            type="button"
                                            onClick={() => setAlbumFormData({...albumFormData, category: cat.value})}
                                            className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center justify-center text-center ${
                                                albumFormData.category === cat.value
                                                    ? 'border-[#004fa2] bg-blue-50'
                                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="font-semibold text-sm text-gray-900">{cat.label}</div>
                                            <div className="text-xs text-gray-500">{cat.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Drag & Drop Cover Image */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <ImagePlus size={16} /> Cover Photo
                                </label>
                                <input
                                    ref={coverImageInputRef}
                                    type="file"
                                    className="hidden"
                                    accept="image/jpeg, image/png, image/webp, image/gif"
                                    onChange={handleCoverImageSelect}
                                />
                                
                                {!albumFormData.coverPreview ? (
                                    <div 
                                        ref={dragRef}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDropCover}
                                        onClick={() => coverImageInputRef.current?.click()}
                                        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                                            dragActive
                                                ? 'border-[#004fa2] bg-blue-50'
                                                : 'border-gray-300 bg-gray-50 hover:border-[#004fa2] hover:bg-blue-50'
                                        }`}
                                    >
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <ImagePlus className="text-[#004fa2]" size={24} />
                                        </div>
                                        <p className="text-gray-900 font-medium mb-1">Drag & drop a photo here</p>
                                        <p className="text-sm text-gray-500">or click to browse from your device</p>
                                        <p className="text-xs text-gray-400 mt-3">JPG, PNG, WEBP, GIF • Max 10MB</p>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                                            <img 
                                                src={albumFormData.coverPreview} 
                                                alt="Cover preview" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeCoverImage}
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
                                        >
                                            <X size={14} /> Change Photo
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
                            <button
                                onClick={resetAlbumForm}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveAlbum}
                                disabled={isLoading}
                                className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm flex items-center gap-2"
                            >
                                {isLoading ? <Loader className="animate-spin" size={14} /> : null}
                                {editingAlbum ? 'Update' : 'Create'} Album
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Images Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 md:w-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                    <Upload className="text-white" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">Upload Photos</h2>
                                    <p className="text-gray-500 text-xs">Add photos to: <span className="font-semibold">{viewingAlbum?.title}</span></p>
                                </div>
                            </div>
                            <button
                                onClick={() => { setShowUploadModal(false); setUploadQueue([]); }}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                multiple
                                accept="image/jpeg, image/png, image/webp, image/gif"
                                onChange={handleFileSelect}
                            />
                            
                            <div 
                                onClick={triggerFileSelect}
                                className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#004fa2] hover:bg-blue-50 transition-colors cursor-pointer group"
                            >
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <ImagePlus className="text-[#004fa2]" size={28} />
                                </div>
                                <p className="text-gray-700 font-medium mb-1">Drag & drop photos here</p>
                                <p className="text-sm text-gray-500 mb-4">or click to browse your device</p>
                                <button type="button" className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium shadow-sm">
                                    Browse Photos
                                </button>
                                <p className="text-xs text-gray-400 mt-4">
                                    JPG, PNG, WEBP, GIF • Max 10MB each
                                </p>
                            </div>

                            {/* Upload Progress */}
                            {isUploading && (
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <p className="font-semibold text-gray-900">Uploading photos...</p>
                                        <p className="text-gray-500">{uploadProgress}%</p>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-[#004fa2] h-2 rounded-full transition-all duration-300" 
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {uploadQueue.length > 0 && !isUploading && (
                                <div className="mt-4 px-1">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">Selected Photos ({uploadQueue.length})</p>
                                    <div className="max-h-[160px] overflow-y-auto space-y-2 pr-2">
                                        {uploadQueue.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                                                <div className="flex items-center gap-2.5 overflow-hidden">
                                                    <FileImage size={14} className="text-[#004fa2] shrink-0" />
                                                    <span className="text-xs font-medium text-gray-700 truncate">{item.name}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] text-gray-500 font-semibold">{item.size}MB</span>
                                                    <button 
                                                        onClick={() => removeQueuedFile(item.id)} 
                                                        className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
                            <button
                                onClick={() => { setShowUploadModal(false); setUploadQueue([]); }}
                                disabled={isUploading}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            {uploadQueue.length > 0 && (
                                <button
                                    onClick={handleUploadImages}
                                    disabled={isUploading}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm flex items-center gap-2"
                                >
                                    {isUploading ? <Loader className="animate-spin" size={14} /> : <Upload size={14} />}
                                    {isUploading ? 'Uploading...' : `Upload ${uploadQueue.length} Photo${uploadQueue.length !== 1 ? 's' : ''}`}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default GalleryManagementPage;
