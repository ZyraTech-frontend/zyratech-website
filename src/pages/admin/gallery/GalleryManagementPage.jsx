/**
 * Gallery Management Page (Admin)
 * Professional admin interface for managing media gallery items
 */

import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
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
    Video,
    FolderOpen,
    Calendar,
    Tag,
    ExternalLink,
    AlertCircle,
    CheckCircle,
    ImagePlus,
    Layers,
    Sparkles,
    Download,
    Copy,
    Link2,
    MoreVertical
} from 'lucide-react';

// Category colors and labels
const CATEGORY_CONFIG = {
    projects: { label: 'Projects', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: FolderOpen },
    training: { label: 'Training', color: 'bg-green-100 text-green-700 border-green-200', icon: Sparkles },
    events: { label: 'Events', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Calendar },
    community: { label: 'Community', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Layers }
};

// Mock gallery data (matches the data from MediaGrid)
const mockGalleryItems = [
    {
        id: 1,
        title: "SafeDrive IoT System Development",
        type: "package",
        thumbnail: "/images/image1.png",
        category: "projects",
        images: [
            "/images/image1.png",
            "/images/image2.png",
            "/images/image3.png",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png"
        ],
        keywords: ["iot", "safety", "smart", "development", "transportation"],
        status: "published",
        createdAt: "2024-12-15"
    },
    {
        id: 2,
        title: "EcoWatch Environmental Monitoring Platform",
        type: "package",
        thumbnail: "/images/image2.png",
        category: "projects",
        images: [
            "/images/image2.png",
            "/images/image3.png",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
            "/images/image1.png"
        ],
        keywords: ["environment", "monitoring", "platform", "sensors", "data"],
        status: "published",
        createdAt: "2024-12-14"
    },
    {
        id: 3,
        title: "AgriZ Planter Precision Farming Solution",
        type: "package",
        thumbnail: "/images/image3.png",
        category: "projects",
        images: [
            "/images/image3.png",
            "/images/image1.png",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
            "/images/image2.png"
        ],
        keywords: ["agriculture", "precision", "farming", "technology", "innovation"],
        status: "published",
        createdAt: "2024-12-13"
    },
    {
        id: 4,
        title: "Software Development Training Workshop",
        type: "package",
        thumbnail: "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
        category: "training",
        images: [
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
            "/images/image1.png",
            "/images/image2.png",
            "/images/image3.png"
        ],
        keywords: ["training", "software", "development", "workshop", "skills"],
        status: "published",
        createdAt: "2024-12-12"
    },
    {
        id: 5,
        title: "Mobile App Development Bootcamp",
        type: "package",
        thumbnail: "/images/image1.png",
        category: "training",
        images: [
            "/images/image1.png",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
            "/images/image2.png",
            "/images/image3.png"
        ],
        keywords: ["mobile", "app", "development", "bootcamp", "programming"],
        status: "draft",
        createdAt: "2024-12-11"
    },
    {
        id: 6,
        title: "Web Development Certification Program",
        type: "package",
        thumbnail: "/images/image2.png",
        category: "training",
        images: [
            "/images/image2.png",
            "/images/image3.png",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
            "/images/image1.png"
        ],
        keywords: ["web", "development", "certification", "fullstack", "javascript"],
        status: "published",
        createdAt: "2024-12-10"
    },
    {
        id: 7,
        title: "Team Building and Collaboration Session",
        type: "package",
        thumbnail: "/images/Dalene.png",
        category: "community",
        images: [
            "/images/Dalene.png",
            "/images/image1.png",
            "/images/image2.png",
            "/images/image3.png"
        ],
        keywords: ["team", "building", "collaboration", "community", "engagement"],
        status: "published",
        createdAt: "2024-12-09"
    },
    {
        id: 8,
        title: "Innovation Showcase 2024",
        type: "package",
        thumbnail: "/images/image1.png",
        category: "events",
        images: [
            "/images/image1.png",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.png",
            "/images/image2.png",
            "/images/image3.png"
        ],
        keywords: ["innovation", "showcase", "2024", "technology", "exhibition"],
        status: "published",
        createdAt: "2024-12-08"
    }
];

// Status badge component
const StatusBadge = ({ status }) => {
    const statusStyles = {
        published: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
        draft: 'bg-gray-100 text-gray-600 border border-gray-200',
        archived: 'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${statusStyles[status] || statusStyles.draft}`}>
            {status}
        </span>
    );
};

const GalleryManagementPage = () => {
    const dispatch = useDispatch();
    const { isSuperAdmin } = usePermissions();

    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('grid');
    const [showModal, setShowModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [viewingItem, setViewingItem] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const itemsPerPage = 8;

    // Filter and search gallery items
    const filteredItems = useMemo(() => {
        let result = [...mockGalleryItems];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.keywords?.some(k => k.toLowerCase().includes(query))
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(item => item.category === selectedCategory);
        }

        // Status filter
        if (selectedStatus !== 'all') {
            result = result.filter(item => item.status === selectedStatus);
        }

        return result;
    }, [searchQuery, selectedCategory, selectedStatus]);

    // Pagination
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => ({
        total: mockGalleryItems.length,
        totalImages: mockGalleryItems.reduce((acc, item) => acc + (item.images?.length || 0), 0),
        projects: mockGalleryItems.filter(i => i.category === 'projects').length,
        training: mockGalleryItems.filter(i => i.category === 'training').length,
        events: mockGalleryItems.filter(i => i.category === 'events').length,
        community: mockGalleryItems.filter(i => i.category === 'community').length,
        published: mockGalleryItems.filter(i => i.status === 'published').length,
        drafts: mockGalleryItems.filter(i => i.status === 'draft').length
    }), []);

    // Handlers
    const handleDelete = (item) => {
        dispatch(openConfirmDialog({
            title: 'Delete Gallery Item',
            message: `Are you sure you want to delete "${item.title}"? This will also delete all ${item.images?.length || 0} associated images. This action cannot be undone.`,
            isDangerous: true,
            onConfirm: () => {
                // TODO: Implement actual delete via API
                console.log('Deleting gallery item:', item.id);
            }
        }));
    };

    const handleView = (item) => {
        setViewingItem(item);
        setSelectedImageIndex(0);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setShowModal(true);
    };

    const handleAddNew = () => {
        setEditingItem(null);
        setShowModal(true);
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedStatus('all');
        setCurrentPage(1);
    };

    return (
        <AdminLayout>
            <div className="space-y-6 pb-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                <Image className="text-white" size={22} />
                            </div>
                            Gallery Management
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Manage photos, media packages, and visual content
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium shadow-sm"
                        >
                            <Upload size={18} />
                            Upload Images
                        </button>
                        <button
                            onClick={handleAddNew}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d7a] hover:to-[#004fa2] transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                        >
                            <Plus size={20} strokeWidth={2.5} />
                            Create Album
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedCategory('all'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <FolderOpen className="text-blue-600" size={18} />
                            </div>
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">All</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Total Albums</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedCategory('all'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                <FileImage className="text-purple-600" size={18} />
                            </div>
                            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">Images</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalImages}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Total Photos</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedCategory('projects'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <Layers className="text-blue-600" size={18} />
                            </div>
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Projects</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.projects}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Project Albums</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedCategory('training'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                <Sparkles className="text-green-600" size={18} />
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Training</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.training}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Training Albums</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedCategory('events'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                <Calendar className="text-purple-600" size={18} />
                            </div>
                            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">Events</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.events}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Event Albums</p>
                    </div>

                    <div className="bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                                <CheckCircle className="text-white" size={18} />
                            </div>
                            <span className="text-xs font-medium text-white/90 bg-white/20 px-2 py-0.5 rounded-full">Live</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{stats.published}</p>
                        <p className="text-xs text-blue-100 mt-0.5">Published</p>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search albums by title or keywords..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-400" size={18} />
                            <select
                                value={selectedCategory}
                                onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                                className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[140px]"
                            >
                                <option value="all">All Categories</option>
                                {Object.entries(CATEGORY_CONFIG).map(([key, { label }]) => (
                                    <option key={key} value={key}>{label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                            className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[130px]"
                        >
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>

                        {/* View Mode Toggle */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'grid'
                                    ? 'bg-white text-[#004fa2] shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'list'
                                    ? 'bg-white text-[#004fa2] shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <List size={18} />
                            </button>
                        </div>

                        {/* Reset Filters */}
                        {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <X size={16} />
                                Reset
                            </button>
                        )}
                    </div>

                    {/* Active filter badges */}
                    {(selectedCategory !== 'all' || selectedStatus !== 'all') && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                            <span className="text-xs text-gray-500">Active filters:</span>
                            {selectedCategory !== 'all' && (
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${CATEGORY_CONFIG[selectedCategory]?.color || 'bg-gray-100 text-gray-700'}`}>
                                    {CATEGORY_CONFIG[selectedCategory]?.label}
                                    <button onClick={() => setSelectedCategory('all')} className="ml-1.5 hover:opacity-70">×</button>
                                </span>
                            )}
                            {selectedStatus !== 'all' && (
                                <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-gray-100 text-gray-700 border-gray-200">
                                    {selectedStatus}
                                    <button onClick={() => setSelectedStatus('all')} className="ml-1.5 hover:opacity-70">×</button>
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Gallery Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {paginatedItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleView(item)}
                                            className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                                        >
                                            <Eye className="text-white" size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                                        >
                                            <Edit className="text-white" size={18} />
                                        </button>
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute top-2 left-2">
                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-semibold border ${CATEGORY_CONFIG[item.category]?.color || 'bg-gray-100'}`}>
                                            {CATEGORY_CONFIG[item.category]?.label}
                                        </span>
                                    </div>

                                    {/* Image Count */}
                                    <div className="absolute top-2 right-2">
                                        <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                                            <FileImage size={12} />
                                            {item.images?.length || 0}
                                        </span>
                                    </div>

                                    {/* Status */}
                                    <div className="absolute bottom-2 left-2">
                                        <StatusBadge status={item.status} />
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 group-hover:text-[#004fa2] transition-colors line-clamp-2 min-h-[44px]">
                                        {item.title}
                                    </h3>

                                    {/* Keywords */}
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {item.keywords?.slice(0, 3).map((keyword, idx) => (
                                            <span key={idx} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                                {keyword}
                                            </span>
                                        ))}
                                        {item.keywords?.length > 3 && (
                                            <span className="text-[10px] text-gray-400">
                                                +{item.keywords.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Date */}
                                    <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500">
                                        <Calendar size={12} />
                                        {item.createdAt}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleView(item)}
                                            className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                            title="View Album"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        {isSuperAdmin && (
                                            <>
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Edit Album"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Album"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <a
                                        href="/gallery"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-xs text-[#004fa2] hover:underline font-medium"
                                    >
                                        Preview
                                        <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* List View */
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Album</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Images</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                    <img
                                                        src={item.thumbnail}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 line-clamp-1">{item.title}</p>
                                                    <p className="text-xs text-gray-500 line-clamp-1">
                                                        {item.keywords?.slice(0, 3).join(', ')}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${CATEGORY_CONFIG[item.category]?.color}`}>
                                                {CATEGORY_CONFIG[item.category]?.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                                <FileImage size={14} className="text-gray-400" />
                                                {item.images?.length || 0}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={item.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                                <Calendar size={14} className="text-gray-400" />
                                                {item.createdAt}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => handleView(item)}
                                                    className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View Album"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                {isSuperAdmin && (
                                                    <>
                                                        <button
                                                            onClick={() => handleEdit(item)}
                                                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                            title="Edit Album"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item)}
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

                {/* Empty State */}
                {filteredItems.length === 0 && (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Image className="text-gray-400" size={28} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No albums found</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Try adjusting your search or filter criteria
                        </p>
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 text-sm text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors font-medium"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredItems.length)}</span> of{' '}
                            <span className="font-semibold text-gray-900">{filteredItems.length}</span> albums
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-all ${currentPage === page
                                            ? 'bg-[#004fa2] text-white shadow-md'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* View Album Modal */}
            {viewingItem && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#004fa2] to-[#0066cc]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Image className="text-white" size={22} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">{viewingItem.title}</h2>
                                    <p className="text-blue-100 text-xs">
                                        {viewingItem.images?.length} photos • {CATEGORY_CONFIG[viewingItem.category]?.label}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingItem(null)}
                                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                            {/* Main Image */}
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 mb-4">
                                <img
                                    src={viewingItem.images?.[selectedImageIndex]}
                                    alt={`${viewingItem.title} - Image ${selectedImageIndex + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                {/* Navigation */}
                                {viewingItem.images?.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : viewingItem.images.length - 1)}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={() => setSelectedImageIndex(prev => prev < viewingItem.images.length - 1 ? prev + 1 : 0)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                                            {selectedImageIndex + 1} / {viewingItem.images.length}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {viewingItem.images?.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {viewingItem.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImageIndex(idx)}
                                            className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all ${selectedImageIndex === idx
                                                ? 'ring-2 ring-[#004fa2] opacity-100'
                                                : 'opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Keywords */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <p className="text-xs font-medium text-gray-500 mb-2">Keywords</p>
                                <div className="flex flex-wrap gap-2">
                                    {viewingItem.keywords?.map((keyword, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                            <button
                                onClick={() => setViewingItem(null)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                            >
                                Close
                            </button>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        setViewingItem(null);
                                        handleEdit(viewingItem);
                                    }}
                                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <Edit size={14} />
                                    Edit Album
                                </button>
                                <a
                                    href="/gallery"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <ExternalLink size={14} />
                                    View Public Gallery
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Album Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                    {editingItem ? <Edit className="text-white" size={20} /> : <Plus className="text-white" size={20} />}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        {editingItem ? 'Edit Album' : 'Create New Album'}
                                    </h2>
                                    <p className="text-gray-500 text-xs">
                                        {editingItem ? 'Update album information' : 'Create a new media album'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => { setShowModal(false); setEditingItem(null); }}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle className="text-amber-500" size={32} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
                                <p className="text-sm text-gray-500 max-w-md mx-auto">
                                    The album editor form will be available once the backend API is ready.
                                    Currently, gallery items are managed via the <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">MediaGrid.jsx</code> data file.
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
                            <button
                                onClick={() => { setShowModal(false); setEditingItem(null); }}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                    <Upload className="text-white" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">Upload Images</h2>
                                    <p className="text-gray-500 text-xs">Add new images to your gallery</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#004fa2] transition-colors cursor-pointer">
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ImagePlus className="text-[#004fa2]" size={28} />
                                </div>
                                <p className="text-gray-700 font-medium mb-1">Drag and drop files here</p>
                                <p className="text-sm text-gray-500 mb-4">or click to browse</p>
                                <button className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors text-sm font-medium">
                                    Choose Files
                                </button>
                                <p className="text-xs text-gray-400 mt-4">
                                    Supports: JPG, PNG, GIF, WEBP (Max 10MB each)
                                </p>
                            </div>

                            <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                                    <div>
                                        <p className="text-sm font-medium text-amber-800">Backend Required</p>
                                        <p className="text-xs text-amber-600">
                                            File upload functionality requires backend API integration.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default GalleryManagementPage;
