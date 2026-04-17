/**
 * Impact Management Page (Admin)
 * Professional admin interface for managing impact metrics, success stories, and achievements
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import {
    TrendingUp,
    Search,
    Filter,
    Eye,
    Edit,
    Trash2,
    Download,
    ChevronLeft,
    ChevronRight,
    X,
    CheckCircle,
    Clock,
    AlertCircle,
    Plus,
    Users,
    GraduationCap,
    Briefcase,
    Award,
    Target,
    Star,
    BarChart3,
    PieChart,
    LineChart,
    Calendar,
    Globe,
    Building,
    Heart,
    Zap,
    Trophy,
    BookOpen,
    DollarSign,
    UserCheck,
    MapPin,
    ArrowUpRight,
    ArrowDownRight,
    Percent,
    Hash,
    Quote,
    Image,
    ToggleLeft,
    ToggleRight,
    Sparkles,
    RefreshCw
} from 'lucide-react';

// Impact metric categories
const CATEGORY_CONFIG = {
    'students': {
        label: 'Students & Graduates',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: GraduationCap,
        gradient: 'from-blue-500 to-cyan-500'
    },
    'employment': {
        label: 'Employment',
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: Briefcase,
        gradient: 'from-green-500 to-emerald-500'
    },
    'partnerships': {
        label: 'Partnerships',
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        icon: Building,
        gradient: 'from-purple-500 to-violet-500'
    },
    'community': {
        label: 'Community',
        color: 'bg-amber-100 text-amber-700 border-amber-200',
        icon: Heart,
        gradient: 'from-amber-500 to-orange-500'
    },
    'awards': {
        label: 'Awards & Recognition',
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: Trophy,
        gradient: 'from-yellow-500 to-amber-500'
    },
    'courses': {
        label: 'Courses & Programs',
        color: 'bg-cyan-100 text-cyan-700 border-cyan-200',
        icon: BookOpen,
        gradient: 'from-cyan-500 to-blue-500'
    },
    'financial': {
        label: 'Financial Impact',
        color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        icon: DollarSign,
        gradient: 'from-emerald-500 to-green-500'
    }
};

// Metric type configuration
const METRIC_TYPE_CONFIG = {
    'number': { label: 'Number', icon: Hash },
    'percentage': { label: 'Percentage', icon: Percent },
    'currency': { label: 'Currency', icon: DollarSign },
    'rating': { label: 'Rating', icon: Star }
};

import contentService from '../../../services/contentService';
import Loader from '../../../components/admin/shared/LoadingSpinner';

// ... (keep conversions and icons configs)

// Format number with commas
const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getPercentChange = (current, previous) => {
    if (!previous) return 0;
    return (((current - previous) / previous) * 100).toFixed(1);
};

// ... (keep other utility functions)

const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
};

const ImpactManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuperAdmin } = usePermissions();

    // State management
    const [activeTab, setActiveTab] = useState('metrics');
    const [metrics, setMetrics] = useState([]);
    const [successStories, setSuccessStories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewingStory, setViewingStory] = useState(null);

    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [metricsRes, storiesRes] = await Promise.all([
                    contentService.getImpactMetrics(),
                    contentService.getImpactStories()
                ]);
                setMetrics(metricsRes.data);
                setSuccessStories(storiesRes.data);
            } catch (error) {
                console.error("Failed to fetch impact data:", error);
                dispatch(openConfirmDialog({
                    title: "Error",
                    message: "Failed to load impact data.",
                    hideCancelButton: true
                }));
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    // Filter metrics
    const filteredMetrics = useMemo(() => {
        let result = [...metrics];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(m =>
                m.title.toLowerCase().includes(query) ||
                m.description.toLowerCase().includes(query)
            );
        }

        if (selectedCategory !== 'all') {
            if (selectedCategory === 'featured') {
                result = result.filter(m => m.featured);
            } else if (selectedCategory === 'active') {
                result = result.filter(m => m.active);
            } else if (selectedCategory === 'inactive') {
                result = result.filter(m => !m.active);
            } else {
                result = result.filter(m => m.category === selectedCategory);
            }
        }

        return result.sort((a, b) => a.displayOrder - b.displayOrder);
    }, [metrics, searchQuery, selectedCategory]);

    // Filter success stories
    const filteredStories = useMemo(() => {
        let result = [...successStories];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(s =>
                s.name.toLowerCase().includes(query) ||
                s.title.toLowerCase().includes(query) ||
                s.company.toLowerCase().includes(query) ||
                s.quote.toLowerCase().includes(query)
            );
        }

        if (selectedCategory === 'featured') {
            result = result.filter(s => s.featured);
        } else if (selectedCategory === 'active') {
            result = result.filter(s => s.active);
        } else if (selectedCategory === 'inactive') {
            result = result.filter(s => !s.active);
        }

        return result;
    }, [successStories, searchQuery, selectedCategory]);

    // Pagination
    const currentItems = activeTab === 'metrics' ? filteredMetrics : filteredStories;
    const totalPages = Math.ceil(currentItems.length / itemsPerPage);
    const paginatedItems = currentItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => {
        return {
            totalMetrics: metrics.length,
            activeMetrics: metrics.filter(m => m.active).length,
            featuredMetrics: metrics.filter(m => m.featured).length,
            totalStories: successStories.length,
            activeStories: successStories.filter(s => s.active).length,
            featuredStories: successStories.filter(s => s.featured).length
        };
    }, [metrics, successStories]);

    // Handlers
    const handleEditMetric = (metric) => {
        navigate(`/admin/impact/metrics/${metric.id}`);
    };

    const handleEditStory = (story) => {
        navigate(`/admin/impact/stories/${story.id}`);
    };

    const handleDelete = (item, type) => {
        dispatch(openConfirmDialog({
            title: `Delete ${type === 'metric' ? 'Metric' : 'Success Story'}`,
            message: `Are you sure you want to delete "${item.title || item.name}"? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: () => {
                console.log('Deleting:', item.id);
            }
        }));
    };

    const handleToggleActive = (item) => {
        console.log('Toggle active:', item.id);
    };

    const handleToggleFeatured = (item) => {
        console.log('Toggle featured:', item.id);
    };

    const handleExport = () => {
        console.log('Exporting impact data...');
    };

    const handleRefreshStats = () => {
        console.log('Refreshing statistics...');
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setCurrentPage(1);
    };

    if (loading) {
        return (
            <AdminLayout>
                <Loader text="Loading impact data..." />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-3 md:space-y-6 pb-8">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm gap-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-[#004fa2] to-[#0066cc] p-2 rounded-lg shrink-0 shadow-sm">
                            <TrendingUp size={18} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-[11px] md:text-base font-bold text-gray-900 leading-tight">Impact Management</h1>
                            <p className="text-[10px] text-gray-500 mt-0.5">Manage impact metrics and success stories</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        <button
                            onClick={handleRefreshStats}
                            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-semibold text-[11px] shadow-sm"
                        >
                            <RefreshCw size={12} />
                            Refresh
                        </button>
                        <button
                            onClick={handleExport}
                            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-semibold text-[11px] shadow-sm"
                        >
                            <Download size={12} />
                            Export
                        </button>
                        <button
                            onClick={() => navigate(activeTab === 'metrics' ? '/admin/impact/metrics/new' : '/admin/impact/stories/new')}
                            className="w-full md:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#004fa2] text-white rounded-lg hover:bg-blue-800 transition-all font-semibold text-[11px] shadow-sm"
                        >
                            <Plus size={14} />
                            {activeTab === 'metrics' ? 'Add Metric' : 'Add Story'}
                        </button>
                    </div>
                </div>

                {/* Key Impact Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    {metrics.filter(m => m.featured && m.active).slice(0, 6).map((metric, idx) => {
                        const categoryConfig = CATEGORY_CONFIG[metric.category];
                        const CategoryIcon = categoryConfig.icon;
                        const percentChange = getPercentChange(metric.value, metric.previousValue);
                        const isPositive = metric.trend === 'up';

                        return (
                            <div
                                key={metric.id}
                                className={`bg-gradient-to-br ${categoryConfig.gradient} rounded-xl p-2.5 md:p-3 shadow-sm transition-all duration-200 text-white flex flex-col justify-between`}
                            >
                                <div className="flex items-start justify-between gap-1 mb-2">
                                    <div className="w-6 h-6 md:w-7 md:h-7 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                                        <CategoryIcon className="text-white" size={14} />
                                    </div>
                                    <div className={`flex items-center justify-center px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 bg-white/20 ${isPositive ? 'text-green-100' : 'text-red-100'}`}>
                                        {isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                                        {percentChange}%
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] text-white/80 uppercase tracking-wider font-semibold truncate mb-0.5" title={metric.title}>
                                        {metric.title}
                                    </p>
                                    <p className="text-[11px] md:text-base font-bold leading-none truncate">
                                        {metric.prefix || ''}{formatNumber(metric.value)}{metric.suffix || ''}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Controls (Tabs + Search/Filter) */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                    {/* Tabs */}
                    <div className="flex items-center w-full md:w-auto p-1 bg-gray-50 rounded-lg shrink-0">
                        <button
                            onClick={() => { setActiveTab('metrics'); setCurrentPage(1); resetFilters(); }}
                            className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold transition-all ${activeTab === 'metrics'
                                ? 'bg-white text-[#004fa2] shadow-sm ring-1 ring-black/5'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <BarChart3 size={12} />
                            Metrics
                            <span className={`px-1.5 py-0.5 rounded text-[9px] ${activeTab === 'metrics' ? 'bg-blue-50 text-blue-600' : 'bg-gray-200 text-gray-500'}`}>
                                {stats.totalMetrics}
                            </span>
                        </button>
                        <button
                            onClick={() => { setActiveTab('stories'); setCurrentPage(1); resetFilters(); }}
                            className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold transition-all ${activeTab === 'stories'
                                ? 'bg-white text-[#004fa2] shadow-sm ring-1 ring-black/5'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <Quote size={12} />
                            Stories
                            <span className={`px-1.5 py-0.5 rounded text-[9px] ${activeTab === 'stories' ? 'bg-blue-50 text-blue-600' : 'bg-gray-200 text-gray-500'}`}>
                                {stats.totalStories}
                            </span>
                        </button>
                    </div>

                    {/* Filters & Search */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-[220px]">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input
                                type="text"
                                placeholder={activeTab === 'metrics' ? 'Search metrics...' : 'Search stories...'}
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-8 pr-3 py-1.5 text-[11px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004fa2] focus:border-[#004fa2] transition-colors"
                            />
                        </div>

                        <select
                            value={selectedCategory}
                            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                            className="shrink-0 px-2.5 py-1.5 text-[11px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004fa2] transition-colors appearance-none min-w-[120px] cursor-pointer"
                        >
                            <option value="all">All Items</option>
                            <option value="featured">⭐ Featured</option>
                            <option value="active">✓ Active</option>
                            <option value="inactive">✗ Inactive</option>
                            {activeTab === 'metrics' && (
                                <optgroup label="Categories">
                                    {Object.entries(CATEGORY_CONFIG).map(([key, val]) => (
                                        <option key={key} value={key}>{val.label}</option>
                                    ))}
                                </optgroup>
                            )}
                        </select>

                        {(searchQuery || selectedCategory !== 'all') && (
                            <button
                                onClick={resetFilters}
                                className="shrink-0 p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-transparent"
                                title="Reset Filters"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Metrics Tab Content */}
                {activeTab === 'metrics' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
                        {paginatedItems.map((metric) => {
                            const categoryConfig = CATEGORY_CONFIG[metric.category];
                            const CategoryIcon = categoryConfig.icon;
                            const TypeIcon = METRIC_TYPE_CONFIG[metric.type].icon;
                            const percentChange = getPercentChange(metric.value, metric.previousValue);
                            const isPositive = metric.trend === 'up';

                            return (
                                <div key={metric.id} className={`bg-white rounded-xl shadow-sm border p-3 hover:border-[#004fa2] transition-colors group flex flex-col gap-3 ${metric.featured ? 'border-amber-200 ring-1 ring-amber-100' : 'border-gray-100'}`}>
                                    {/* Card Header */}
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-br ${categoryConfig.gradient} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                                                <CategoryIcon size={14} />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-1">
                                                    <h3 className="text-[11px] font-bold text-gray-900 truncate group-hover:text-[#004fa2] transition-colors">{metric.title}</h3>
                                                    {metric.featured && <Star className="text-amber-500 fill-amber-500 shrink-0" size={10} />}
                                                </div>
                                                <span className={`inline-flex items-center mt-0.5 px-1.5 py-[1px] rounded text-[8px] font-bold uppercase tracking-wider border ${categoryConfig.color}`}>
                                                    {categoryConfig.label}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleToggleActive(metric)}
                                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 transition-colors ${metric.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                            title={metric.active ? "Set Inactive" : "Set Active"}
                                        >
                                            {metric.active ? 'Active' : 'Inactive'}
                                        </button>
                                    </div>

                                    {/* Description */}
                                    <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
                                        {metric.description}
                                    </p>

                                    {/* Value & Trend */}
                                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2 mt-auto border border-gray-100">
                                        <div className="flex items-center gap-1.5 text-[#004fa2]">
                                            <TypeIcon size={12} />
                                            <span className="font-bold text-[13px] tracking-tight">
                                                {metric.prefix || ''}{formatNumber(metric.value)}{metric.suffix || ''}
                                            </span>
                                        </div>
                                        <div className={`flex items-center gap-0.5 text-[10px] font-bold ${isPositive ? 'text-green-600 bg-green-50 px-1.5 py-0.5 rounded' : 'text-red-600 bg-red-50 px-1.5 py-0.5 rounded'}`}>
                                            {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                            {percentChange}%
                                        </div>
                                    </div>

                                    {/* Footer / Actions */}
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                                        <button
                                            onClick={() => handleToggleFeatured(metric)}
                                            className="p-1 hover:bg-amber-50 rounded text-gray-400 hover:text-amber-500 transition-colors"
                                            title={metric.featured ? "Remove Featured" : "Set Featured"}
                                        >
                                            <Star size={12} className={metric.featured ? 'text-amber-500 fill-amber-500' : ''} />
                                        </button>
                                        <div className="flex items-center gap-0.5">
                                            <button
                                                onClick={() => handleEditMetric(metric)}
                                                className="p-1 hover:bg-green-50 rounded text-gray-400 hover:text-green-600 transition-colors"
                                                title="Edit Metric"
                                            >
                                                <Edit size={12} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(metric, 'metric')}
                                                className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-600 transition-colors"
                                                title="Delete Metric"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Success Stories Tab Content */}
                {activeTab === 'stories' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                        {paginatedItems.map((story) => (
                            <div
                                key={story.id}
                                className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:border-[#004fa2] transition-colors group flex flex-col ${story.featured ? 'border-amber-200 ring-1 ring-amber-100' : 'border-gray-100'
                                    }`}
                            >
                                {/* Story Header */}
                                <div className={`p-3 border-b border-gray-50 flex items-start justify-between gap-2 ${story.featured ? 'bg-gradient-to-r from-amber-50 to-orange-50' : 'bg-gray-50'}`}>
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-sm">
                                            {story.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-1">
                                                <h3 className="font-bold text-[11px] text-gray-900 group-hover:text-[#004fa2] transition-colors truncate">
                                                    {story.name}
                                                </h3>
                                                {story.featured && <Star className="text-amber-500 fill-amber-500 shrink-0" size={10} />}
                                            </div>
                                            <p className="text-[9px] text-gray-500 truncate">{story.role}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleToggleActive(story)}
                                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 transition-colors ${story.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                        title={story.active ? "Set Inactive" : "Set Active"}
                                    >
                                        {story.active ? 'Active' : 'Inactive'}
                                    </button>
                                </div>

                                {/* Story Body */}
                                <div className="p-3 flex flex-col gap-2 flex-1">
                                    <h4 className="font-semibold text-gray-800 text-[11px] line-clamp-2 leading-snug">
                                        "{story.title}"
                                    </h4>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                                            <Building size={11} className="shrink-0" />
                                            <span className="truncate">{story.company}</span>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                                            <GraduationCap size={11} className="shrink-0" />
                                            <span className="truncate">{story.course} ({story.graduationYear})</span>
                                        </div>
                                    </div>

                                    <div className="relative mt-2 flex-1">
                                        <Quote className="absolute -top-1 -left-1 text-gray-100" size={16} />
                                        <p className="text-[10px] text-gray-600 italic line-clamp-3 leading-relaxed pl-3 relative z-10 border-l border-[#004fa2]/30">
                                            {story.quote}
                                        </p>
                                    </div>
                                    
                                    {/* Date */}
                                    <div className="text-[9px] text-gray-400 mt-2 text-right">
                                        Published: {formatDate(story.datePublished)}
                                    </div>
                                </div>

                                {/* Story Footer */}
                                <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                    <button
                                        onClick={() => setViewingStory(story)}
                                        className="text-[10px] text-[#004fa2] hover:text-[#003d7a] font-bold flex items-center gap-1 transition-colors"
                                    >
                                        <Eye size={12} />
                                        View Details
                                    </button>
                                    <div className="flex items-center gap-0.5">
                                        <button
                                            onClick={() => handleToggleFeatured(story)}
                                            className="p-1 hover:bg-amber-50 rounded text-gray-400 hover:text-amber-500 transition-colors"
                                            title={story.featured ? "Remove Featured" : "Set Featured"}
                                        >
                                            <Star size={12} className={story.featured ? 'text-amber-500 fill-amber-500' : ''} />
                                        </button>
                                        <button
                                            onClick={() => handleEditStory(story)}
                                            className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                                            title="Edit"
                                        >
                                            <Edit size={12} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(story, 'story')}
                                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {currentItems.length === 0 && (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            {activeTab === 'metrics' ? <BarChart3 className="text-gray-400" size={28} /> : <Quote className="text-gray-400" size={28} />}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No {activeTab === 'metrics' ? 'metrics' : 'success stories'} found
                        </h3>
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
                            <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, currentItems.length)}</span> of{' '}
                            <span className="font-semibold text-gray-900">{currentItems.length}</span> items
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

            {/* View Success Story Modal */}
            {viewingStory && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-gradient-to-r from-[#004fa2] to-[#0066cc] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-lg font-bold">
                                    {viewingStory.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">{viewingStory.name}</h2>
                                    <p className="text-blue-100 text-sm">{viewingStory.role} at {viewingStory.company}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingStory(null)}
                                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                            <div className="space-y-5">
                                {/* Status Badges */}
                                <div className="flex items-center flex-wrap gap-2">
                                    {viewingStory.featured && (
                                        <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded text-xs font-bold flex items-center gap-1">
                                            <Star size={12} className="fill-amber-500" />
                                            Featured Story
                                        </span>
                                    )}
                                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${viewingStory.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {viewingStory.active ? 'Active' : 'Inactive'}
                                    </span>
                                    <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">
                                        Class of {viewingStory.graduationYear}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900">
                                    {viewingStory.title}
                                </h3>

                                {/* Course Info */}
                                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                                    <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-[#004fa2] rounded-xl flex items-center justify-center">
                                        <GraduationCap className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Program Completed</p>
                                        <p className="font-semibold text-gray-900">{viewingStory.course}</p>
                                    </div>
                                </div>

                                {/* Quote */}
                                <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-[#004fa2]">
                                    <Quote className="text-[#004fa2] mb-3" size={24} />
                                    <p className="text-gray-700 text-lg italic leading-relaxed">
                                        "{viewingStory.quote}"
                                    </p>
                                    <p className="mt-4 text-sm font-semibold text-gray-600">
                                        — {viewingStory.name}
                                    </p>
                                </div>

                                {/* Meta Info */}
                                <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        Published: {formatDate(viewingStory.datePublished)}
                                    </span>
                                    <span className="font-mono text-xs text-gray-400">{viewingStory.id}</span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                            <button
                                onClick={() => setViewingStory(null)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    setViewingStory(null);
                                    handleEditStory(viewingStory);
                                }}
                                className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-medium text-sm flex items-center gap-1.5"
                            >
                                <Edit size={14} />
                                Edit Story
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ImpactManagementPage;
