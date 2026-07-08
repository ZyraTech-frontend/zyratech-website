/**
 * Gallery Management Page (Admin)
 * Professional admin interface for managing media gallery items
 */

import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
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
        thumbnail: "/images/image1.webp",
        category: "projects",
        images: [
            "/images/image1.webp",
            "/images/image2.webp",
            "/images/image3.webp",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.webp"
        ],
        keywords: ["iot", "safety", "smart", "development", "transportation"],
        status: "published",
        createdAt: "2024-12-15"
    },
    {
        id: 2,
        title: "EcoWatch Environmental Monitoring Platform",
        type: "package",
        thumbnail: "/images/image2.webp",
        category: "projects",
        images: [
            "/images/image2.webp",
            "/images/image3.webp",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.webp",
            "/images/image1.webp"
        ],
        keywords: ["environment", "monitoring", "platform", "sensors", "data"],
        status: "published",
        createdAt: "2024-12-14"
    },
    {
        id: 3,
        title: "AgriZ Planter Precision Farming Solution",
        type: "package",
        thumbnail: "/images/image3.webp",
        category: "projects",
        images: [
            "/images/image3.webp",
            "/images/image1.webp",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.webp",
            "/images/image2.webp"
        ],
        keywords: ["agriculture", "precision", "farming", "technology", "innovation"],
        status: "published",
        createdAt: "2024-12-13"
    },
    {
        id: 4,
        title: "Software Development Training Workshop",
        type: "package",
        thumbnail: "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.webp",
        category: "training",
        images: [
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.webp",
            "/images/image1.webp",
            "/images/image2.webp",
            "/images/image3.webp"
        ],
        keywords: ["training", "software", "development", "workshop", "skills"],
        status: "published",
        createdAt: "2024-12-12"
    },
    {
        id: 5,
        title: "Mobile App Development Bootcamp",
        type: "package",
        thumbnail: "/images/image1.webp",
        category: "training",
        images: [
            "/images/image1.webp",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.webp",
            "/images/image2.webp",
            "/images/image3.webp"
        ],
        keywords: ["mobile", "app", "development", "bootcamp", "programming"],
        status: "draft",
        createdAt: "2024-12-11"
    },
    {
        id: 6,
        title: "Web Development Certification Program",
        type: "package",
        thumbnail: "/images/image2.webp",
        category: "training",
        images: [
            "/images/image2.webp",
            "/images/image3.webp",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.webp",
            "/images/image1.webp"
        ],
        keywords: ["web", "development", "certification", "fullstack", "javascript"],
        status: "published",
        createdAt: "2024-12-10"
    },
    {
        id: 7,
        title: "Team Building and Collaboration Session",
        type: "package",
        thumbnail: "/images/Dalene.webp",
        category: "community",
        images: [
            "/images/Dalene.webp",
            "/images/image1.webp",
            "/images/image2.webp",
            "/images/image3.webp"
        ],
        keywords: ["team", "building", "collaboration", "community", "engagement"],
        status: "published",
        createdAt: "2024-12-09"
    },
    {
        id: 8,
        title: "Innovation Showcase 2024",
        type: "package",
        thumbnail: "/images/image1.webp",
        category: "events",
        images: [
            "/images/image1.webp",
            "/images/Gemini_Generated_Image_7f3aff7f3aff7f3a.webp",
            "/images/image2.webp",
            "/images/image3.webp"
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
    const navigate = useNavigate();
    const { isSuperAdmin } = usePermissions();

    // State management
    const [galleryItems, setGalleryItems] = useState(mockGalleryItems);
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
    const [uploadQueue, setUploadQueue] = useState([]);

    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files).map(f => ({
                file: f,
                name: f.name,
                size: (f.size / (1024 * 1024)).toFixed(2) + ' MB'
            }));
            setUploadQueue(prev => [...prev, ...newFiles]);
        }
    };
    
    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };
    
    const removeQueuedFile = (idx) => {
        setUploadQueue(prev => prev.filter((_, i) => i !== idx));
    };

    const handleMockUpload = () => {
        if (uploadQueue.length === 0) return;
        dispatch(addNotification({
            type: 'success',
            message: `Successfully uploaded ${uploadQueue.length} files.`
        }));
        setUploadQueue([]);
        setShowUploadModal(false);
    };

    const itemsPerPage = 8;

    // Filter and search gallery items
    const filteredItems = useMemo(() => {
        let result = [...galleryItems];

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
    }, [galleryItems, searchQuery, selectedCategory, selectedStatus]);

    // Pagination
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => ({
        total: galleryItems.length,
        totalImages: galleryItems.reduce((acc, item) => acc + (item.images?.length || 0), 0),
        projects: galleryItems.filter(i => i.category === 'projects').length,
        training: galleryItems.filter(i => i.category === 'training').length,
        events: galleryItems.filter(i => i.category === 'events').length,
        community: galleryItems.filter(i => i.category === 'community').length,
        published: galleryItems.filter(i => i.status === 'published').length,
        drafts: galleryItems.filter(i => i.status === 'draft').length
    }), [galleryItems]);

    // Handlers
    const handleDelete = (item) => {
        dispatch(openConfirmDialog({
            title: 'Delete Gallery Item',
            message: `Are you sure you want to delete "${item.title}"? This will also delete all ${item.images?.length || 0} associated images. This action cannot be undone.`,
            isDangerous: true,
            onConfirm: () => {
                setGalleryItems(prev => prev.filter(i => i.id !== item.id));
                dispatch(addNotification({
                    type: 'success',
                    message: `Gallery item "${item.title}" deleted successfully`
                }));
            }
        }));
    };

    const handleView = (item) => {
        setViewingItem(item);
        setSelectedImageIndex(0);
    };

    const handleEdit = (item) => {
        navigate(`/admin/gallery/edit/${item.id}`);
    };

    const handleAddNew = () => {
        navigate('/admin/gallery/new');
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedStatus('all');
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
                            <p className="text-[10px] text-gray-500">Manage photos and media packages</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-all text-xs font-semibold"
                        >
                            <Upload size={14} /> Images
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
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-4">
                    {[
                        { title: 'Albums', count: stats.total, icon: FolderOpen, color: 'text-blue-600', bg: 'bg-blue-50', onClick: () => { setSelectedCategory('all'); setCurrentPage(1); } },
                        { title: 'Photos', count: stats.totalImages, icon: FileImage, color: 'text-purple-600', bg: 'bg-purple-50', onClick: () => { setSelectedCategory('all'); setCurrentPage(1); } },
                        { title: 'Projects', count: stats.projects, icon: Layers, color: 'text-cyan-600', bg: 'bg-cyan-50', onClick: () => { setSelectedCategory('projects'); setCurrentPage(1); } },
                        { title: 'Training', count: stats.training, icon: Sparkles, color: 'text-green-600', bg: 'bg-green-50', onClick: () => { setSelectedCategory('training'); setCurrentPage(1); } },
                        { title: 'Events', count: stats.events, icon: Calendar, color: 'text-pink-600', bg: 'bg-pink-50', onClick: () => { setSelectedCategory('events'); setCurrentPage(1); } },
                        { title: 'Live', count: stats.published, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', onClick: () => { setSelectedCategory('all'); setSelectedStatus('published'); setCurrentPage(1); } }
                    ].map((stat, i) => (
                        <div key={i} onClick={stat.onClick} className="bg-white border border-gray-100 rounded-xl p-2.5 flex items-center justify-start gap-2.5 shadow-sm hover:border-[#004fa2] transition-colors cursor-pointer">
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
                    <div className="col-span-2 md:col-span-5 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search albums..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-3 relative">
                        <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                        >
                            <option value="all">All Categories</option>
                            {Object.entries(CATEGORY_CONFIG).map(([key, { label }]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-1 md:col-span-3 relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                            className="w-full px-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                        >
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>

                    <div className="col-span-2 md:col-span-1 flex items-center justify-end gap-1">
                        <div className="flex bg-white border border-gray-100 rounded-xl p-0.5 shadow-sm h-[34px]">
                            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${viewMode === 'grid' ? 'bg-[#004fa2] text-white' : 'text-gray-400 hover:text-gray-600'}`}>
                                <Grid size={14} />
                            </button>
                            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${viewMode === 'list' ? 'bg-[#004fa2] text-white' : 'text-gray-400 hover:text-gray-600'}`}>
                                <List size={14} />
                            </button>
                        </div>
                        {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
                            <button onClick={resetFilters} className="bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 h-[34px] w-[34px] rounded-xl transition-colors shadow-sm flex items-center justify-center shrink-0">
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Gallery Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {paginatedItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:border-[#004fa2] transition-colors group p-2">
                                <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                                    <img decoding="async" src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                                    <div className="absolute top-1 right-1 bg-black/60 text-white px-1.5 py-0.5 rounded flex items-center gap-1 text-[9px] font-bold backdrop-blur-sm">
                                        <FileImage size={10} /> {item.images?.length || 0}
                                    </div>
                                    <div className="absolute bottom-1 left-1 flex gap-1">
                                        <span className={`px-1.5 py-[1px] rounded text-[9px] font-bold uppercase backdrop-blur-sm ${CATEGORY_CONFIG[item.category]?.color || 'bg-white/90 text-gray-800'}`}>
                                            {CATEGORY_CONFIG[item.category]?.label}
                                        </span>
                                    </div>
                                </div>
                                <div className="px-1 flex flex-col flex-1">
                                    <h3 className="text-xs font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-[#004fa2] transition-colors">{item.title}</h3>
                                    <div className="flex flex-wrap gap-1 mb-2 h-[18px] overflow-hidden">
                                        {item.keywords?.slice(0, 3).map((k, i) => (
                                            <span key={i} className="text-[8px] bg-gray-100 text-gray-500 px-1.5 py-[1px] rounded uppercase font-semibold tracking-wider">{k}</span>
                                        ))}
                                    </div>
                                    <div className="mt-auto flex items-center justify-between text-[9px] text-gray-400 font-medium">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={10} /> {item.createdAt}
                                        </div>
                                        <span className={item.status === 'published' ? 'text-green-600 uppercase font-bold' : 'text-gray-500 uppercase font-bold'}>{item.status}</span>
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center justify-between pt-2 border-t border-gray-50 px-1">
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => handleView(item)} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-[#004fa2]"><Eye size={12}/></button>
                                        <button onClick={() => handleEdit(item)} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-green-600"><Edit size={12}/></button>
                                        <button onClick={() => handleDelete(item)} className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-600"><Trash2 size={12}/></button>
                                    </div>
                                    <a href="/gallery" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[9px] font-bold text-[#004fa2] hover:underline uppercase bg-blue-50 px-1.5 py-0.5 rounded">
                                        Preview <ExternalLink size={10} />
                                    </a>
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
                                                    <img decoding="async"
                                                        src={item.thumbnail}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
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
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#004fa2] to-[#0066cc]">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-white/20 rounded-xl flex items-center justify-center">
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
                        <div className="p-2 md:p-4 lg:p-5 lg:p-6 overflow-y-auto flex-1">
                            {/* Main Image */}
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 mb-4">
                                <img decoding="async"
                                    src={viewingItem.images?.[selectedImageIndex]}
                                    alt={`${viewingItem.title} - Image ${selectedImageIndex + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                {/* Navigation */}
                                {viewingItem.images?.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : viewingItem.images.length - 1)}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={() => setSelectedImageIndex(prev => prev < viewingItem.images.length - 1 ? prev + 1 : 0)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
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
                                            <img decoding="async" src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
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
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
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
                        <div className="p-6 overflow-y-auto flex-1">
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
                                <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
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
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                multiple
                                accept="image/jpeg, image/png, image/webp"
                                onChange={handleFileSelect}
                            />
                            
                            <div 
                                onClick={triggerFileSelect}
                                className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#004fa2] hover:bg-blue-50 transition-colors cursor-pointer group"
                            >
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <ImagePlus className="text-[#004fa2]" size={28} />
                                </div>
                                <p className="text-gray-700 font-medium mb-1">Drag and drop files here</p>
                                <p className="text-sm text-gray-500 mb-4">or click anywhere to browse</p>
                                <button type="button" className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors text-sm font-medium shadow-sm">
                                    Choose Files
                                </button>
                                <p className="text-xs text-gray-400 mt-4">
                                    Supports: JPG, PNG, WEBP (Max 10MB each)
                                </p>
                            </div>

                            {uploadQueue.length > 0 && (
                                <div className="mt-4 px-1">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">Selected Files ({uploadQueue.length})</p>
                                    <div className="max-h-[160px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                        {uploadQueue.map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between bg-gray-50 p-2.5 rounded-lg border border-gray-100 group">
                                                <div className="flex items-center gap-2.5 overflow-hidden">
                                                    <FileImage size={14} className="text-[#004fa2] shrink-0" />
                                                    <span className="text-xs font-medium text-gray-700 truncate">{item.name}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] text-gray-500 font-semibold">{item.size}</span>
                                                    <button onClick={() => removeQueuedFile(idx)} className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-red-500 transition-colors">
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
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                            >
                                Cancel
                            </button>
                            {uploadQueue.length > 0 && (
                                <button
                                    onClick={handleMockUpload}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center gap-2"
                                >
                                    <Upload size={14} /> Upload {uploadQueue.length} files
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
