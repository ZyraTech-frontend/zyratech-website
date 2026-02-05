/**
 * Impact Management Page (Admin)
 * Professional admin interface for managing impact metrics, success stories, and achievements
 */

import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
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

// Mock impact metrics data
const mockMetrics = [
    {
        id: 'MET-001',
        title: 'Total Students Trained',
        value: 2500,
        previousValue: 2100,
        type: 'number',
        category: 'students',
        description: 'Total number of students who have completed training programs',
        suffix: '+',
        featured: true,
        active: true,
        displayOrder: 1,
        lastUpdated: '2024-12-19T10:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-002',
        title: 'Employment Rate',
        value: 87,
        previousValue: 82,
        type: 'percentage',
        category: 'employment',
        description: 'Percentage of graduates employed within 6 months of completion',
        suffix: '%',
        featured: true,
        active: true,
        displayOrder: 2,
        lastUpdated: '2024-12-18T14:30:00Z',
        trend: 'up'
    },
    {
        id: 'MET-003',
        title: 'Partner Companies',
        value: 45,
        previousValue: 38,
        type: 'number',
        category: 'partnerships',
        description: 'Number of corporate and institutional partners',
        suffix: '+',
        featured: true,
        active: true,
        displayOrder: 3,
        lastUpdated: '2024-12-17T09:15:00Z',
        trend: 'up'
    },
    {
        id: 'MET-004',
        title: 'Courses Offered',
        value: 25,
        previousValue: 20,
        type: 'number',
        category: 'courses',
        description: 'Total number of training courses and programs available',
        suffix: '',
        featured: false,
        active: true,
        displayOrder: 4,
        lastUpdated: '2024-12-16T11:45:00Z',
        trend: 'up'
    },
    {
        id: 'MET-005',
        title: 'Student Satisfaction',
        value: 4.8,
        previousValue: 4.6,
        type: 'rating',
        category: 'students',
        description: 'Average student satisfaction rating out of 5.0',
        suffix: '/5.0',
        featured: true,
        active: true,
        displayOrder: 5,
        lastUpdated: '2024-12-19T08:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-006',
        title: 'Community Events',
        value: 120,
        previousValue: 95,
        type: 'number',
        category: 'community',
        description: 'Number of community events and workshops hosted',
        suffix: '+',
        featured: false,
        active: true,
        displayOrder: 6,
        lastUpdated: '2024-12-15T16:20:00Z',
        trend: 'up'
    },
    {
        id: 'MET-007',
        title: 'Industry Awards',
        value: 12,
        previousValue: 10,
        type: 'number',
        category: 'awards',
        description: 'Number of industry awards and recognitions received',
        suffix: '',
        featured: false,
        active: true,
        displayOrder: 7,
        lastUpdated: '2024-12-10T13:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-008',
        title: 'Scholarships Awarded',
        value: 350000,
        previousValue: 280000,
        type: 'currency',
        category: 'financial',
        description: 'Total value of scholarships awarded to students (GHS)',
        suffix: '',
        prefix: 'GHS ',
        featured: true,
        active: true,
        displayOrder: 8,
        lastUpdated: '2024-12-18T10:30:00Z',
        trend: 'up'
    },
    {
        id: 'MET-009',
        title: 'Countries Represented',
        value: 8,
        previousValue: 6,
        type: 'number',
        category: 'community',
        description: 'Number of countries our students come from',
        suffix: '',
        featured: false,
        active: true,
        displayOrder: 9,
        lastUpdated: '2024-12-14T09:00:00Z',
        trend: 'up'
    },
    {
        id: 'MET-010',
        title: 'Career Transitions',
        value: 65,
        previousValue: 70,
        type: 'percentage',
        category: 'employment',
        description: 'Percentage of students who successfully changed careers',
        suffix: '%',
        featured: false,
        active: false,
        displayOrder: 10,
        lastUpdated: '2024-12-12T15:45:00Z',
        trend: 'down'
    }
];

// Mock success stories data
const mockSuccessStories = [
    {
        id: 'STORY-001',
        name: 'Kwame Asante',
        title: 'From Unemployed to Lead Developer',
        role: 'Senior Software Developer',
        company: 'TechVision Ltd',
        course: 'Full Stack Web Development',
        image: null,
        quote: 'Zyra Tech Hub transformed my career completely. Within 6 months of completing the program, I landed my dream job.',
        featured: true,
        active: true,
        datePublished: '2024-11-15',
        graduationYear: 2024
    },
    {
        id: 'STORY-002',
        name: 'Ama Mensah',
        title: 'Becoming Ghana\'s First Female Cloud Architect',
        role: 'Cloud Solutions Architect',
        company: 'AWS Ghana',
        course: 'Cloud Computing & DevOps',
        image: null,
        quote: 'The AWS certification training prepared me for a role I never thought possible. I am now leading cloud migrations for major companies.',
        featured: true,
        active: true,
        datePublished: '2024-10-20',
        graduationYear: 2023
    },
    {
        id: 'STORY-003',
        name: 'Kofi Boateng',
        title: 'Building AI Solutions for African Healthcare',
        role: 'AI/ML Engineer',
        company: 'HealthTech Africa',
        course: 'Data Science & AI',
        image: null,
        quote: 'The data science program gave me the skills to build AI solutions that are now helping diagnose diseases in rural Ghana.',
        featured: true,
        active: true,
        datePublished: '2024-09-05',
        graduationYear: 2023
    },
    {
        id: 'STORY-004',
        name: 'Grace Addo',
        title: 'From Accountant to Data Analyst',
        role: 'Senior Data Analyst',
        company: 'Finance Corp',
        course: 'Data Analytics',
        image: null,
        quote: 'I made a complete career switch at 35. Zyra Tech Hub\'s flexible schedule made it possible to study while working.',
        featured: false,
        active: true,
        datePublished: '2024-08-12',
        graduationYear: 2024
    },
    {
        id: 'STORY-005',
        name: 'Emmanuel Osei',
        title: 'Launching a Successful Tech Startup',
        role: 'CEO & Founder',
        company: 'StartupXYZ',
        course: 'Full Stack + Business',
        image: null,
        quote: 'The entrepreneurship modules combined with technical training helped me launch my own company with 10 employees.',
        featured: false,
        active: false,
        datePublished: '2024-07-01',
        graduationYear: 2022
    }
];

// Format number with commas
const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

// Calculate percentage change
const getPercentChange = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
};

const ImpactManagementPage = () => {
    const dispatch = useDispatch();
    const { isSuperAdmin } = usePermissions();

    // State management
    const [activeTab, setActiveTab] = useState('metrics');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [viewingStory, setViewingStory] = useState(null);

    const itemsPerPage = 10;

    // Filter metrics
    const filteredMetrics = useMemo(() => {
        let result = [...mockMetrics];

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
    }, [searchQuery, selectedCategory]);

    // Filter success stories
    const filteredStories = useMemo(() => {
        let result = [...mockSuccessStories];

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
    }, [searchQuery, selectedCategory]);

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
            totalMetrics: mockMetrics.length,
            activeMetrics: mockMetrics.filter(m => m.active).length,
            featuredMetrics: mockMetrics.filter(m => m.featured).length,
            totalStories: mockSuccessStories.length,
            activeStories: mockSuccessStories.filter(s => s.active).length,
            featuredStories: mockSuccessStories.filter(s => s.featured).length
        };
    }, []);

    // Handlers
    const handleEdit = (item) => {
        setEditingItem(item);
        setShowModal(true);
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

    return (
        <AdminLayout>
            <div className="space-y-6 pb-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                <TrendingUp className="text-white" size={22} />
                            </div>
                            Impact Management
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Manage impact metrics and success stories
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleRefreshStats}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm font-medium text-sm"
                        >
                            <RefreshCw size={16} />
                            Refresh
                        </button>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm font-medium text-sm"
                        >
                            <Download size={16} />
                            Export
                        </button>
                        <button
                            onClick={() => { setEditingItem(null); setShowModal(true); }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d7a] hover:to-[#004fa2] transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
                        >
                            <Plus size={18} />
                            {activeTab === 'metrics' ? 'Add Metric' : 'Add Story'}
                        </button>
                    </div>
                </div>

                {/* Key Impact Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {mockMetrics.filter(m => m.featured && m.active).slice(0, 6).map((metric, idx) => {
                        const categoryConfig = CATEGORY_CONFIG[metric.category];
                        const CategoryIcon = categoryConfig.icon;
                        const percentChange = getPercentChange(metric.value, metric.previousValue);
                        const isPositive = metric.trend === 'up';

                        return (
                            <div
                                key={metric.id}
                                className={`bg-gradient-to-br ${categoryConfig.gradient} rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 text-white`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                                        <CategoryIcon className="text-white" size={18} />
                                    </div>
                                    <div className={`flex items-center gap-0.5 text-xs font-bold ${isPositive ? 'text-green-200' : 'text-red-200'}`}>
                                        {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                        {percentChange}%
                                    </div>
                                </div>
                                <p className="text-2xl font-bold">
                                    {metric.prefix || ''}{formatNumber(metric.value)}{metric.suffix || ''}
                                </p>
                                <p className="text-xs text-white/80 mt-0.5 line-clamp-1">{metric.title}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 inline-flex">
                    <button
                        onClick={() => { setActiveTab('metrics'); setCurrentPage(1); resetFilters(); }}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'metrics'
                                ? 'bg-[#004fa2] text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <BarChart3 size={16} />
                        Impact Metrics
                        <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'metrics' ? 'bg-white/20' : 'bg-gray-100'
                            }`}>
                            {stats.totalMetrics}
                        </span>
                    </button>
                    <button
                        onClick={() => { setActiveTab('stories'); setCurrentPage(1); resetFilters(); }}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'stories'
                                ? 'bg-[#004fa2] text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Quote size={16} />
                        Success Stories
                        <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'stories' ? 'bg-white/20' : 'bg-gray-100'
                            }`}>
                            {stats.totalStories}
                        </span>
                    </button>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder={activeTab === 'metrics' ? 'Search metrics...' : 'Search success stories...'}
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
                                className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[160px]"
                            >
                                <option value="all">All Items</option>
                                <option value="featured">⭐ Featured</option>
                                <option value="active">✓ Active</option>
                                <option value="inactive">✗ Inactive</option>
                                {activeTab === 'metrics' && (
                                    <>
                                        <optgroup label="Categories">
                                            {Object.entries(CATEGORY_CONFIG).map(([key, val]) => (
                                                <option key={key} value={key}>{val.label}</option>
                                            ))}
                                        </optgroup>
                                    </>
                                )}
                            </select>
                        </div>

                        {/* Reset Filters */}
                        {(searchQuery || selectedCategory !== 'all') && (
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <X size={16} />
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                {/* Metrics Tab Content */}
                {activeTab === 'metrics' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Metric</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Value</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trend</th>
                                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Featured</th>
                                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {paginatedItems.map((metric) => {
                                        const categoryConfig = CATEGORY_CONFIG[metric.category];
                                        const CategoryIcon = categoryConfig.icon;
                                        const TypeIcon = METRIC_TYPE_CONFIG[metric.type].icon;
                                        const percentChange = getPercentChange(metric.value, metric.previousValue);
                                        const isPositive = metric.trend === 'up';

                                        return (
                                            <tr key={metric.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryConfig.gradient} flex items-center justify-center text-white shrink-0`}>
                                                            <CategoryIcon size={18} />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900 text-sm">{metric.title}</p>
                                                            <p className="text-xs text-gray-400 line-clamp-1 max-w-xs">{metric.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ${categoryConfig.color}`}>
                                                        {categoryConfig.label}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <TypeIcon size={14} className="text-gray-400" />
                                                        <span className="font-bold text-gray-900">
                                                            {metric.prefix || ''}{formatNumber(metric.value)}{metric.suffix || ''}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className={`flex items-center gap-1 text-xs font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                                        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                                        {percentChange}%
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <button
                                                        onClick={() => handleToggleFeatured(metric)}
                                                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                                    >
                                                        <Star
                                                            size={16}
                                                            className={metric.featured ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}
                                                        />
                                                    </button>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <button
                                                        onClick={() => handleToggleActive(metric)}
                                                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold ${metric.active
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-gray-100 text-gray-500'
                                                            }`}
                                                    >
                                                        {metric.active ? <CheckCircle size={10} /> : <AlertCircle size={10} />}
                                                        {metric.active ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <button
                                                            onClick={() => handleEdit(metric)}
                                                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(metric, 'metric')}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Success Stories Tab Content */}
                {activeTab === 'stories' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {paginatedItems.map((story) => (
                            <div
                                key={story.id}
                                className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300 group ${story.featured ? 'border-amber-200 ring-2 ring-amber-100' : 'border-gray-100'
                                    }`}
                            >
                                {/* Story Header */}
                                <div className={`p-4 ${story.featured ? 'bg-gradient-to-r from-amber-50 to-orange-50' : 'bg-gray-50'}`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-lg font-bold shrink-0">
                                                {story.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors">
                                                    {story.name}
                                                </h3>
                                                <p className="text-xs text-gray-500">{story.role}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleToggleFeatured(story)}
                                            className="p-1.5 hover:bg-white/50 rounded-lg transition-colors"
                                        >
                                            <Star
                                                size={16}
                                                className={story.featured ? 'text-amber-500 fill-amber-500' : 'text-gray-300 hover:text-amber-400'}
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/* Story Body */}
                                <div className="p-4 space-y-3">
                                    <h4 className="font-semibold text-gray-800 text-sm line-clamp-2">
                                        "{story.title}"
                                    </h4>

                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Building size={12} />
                                        <span>{story.company}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <GraduationCap size={12} />
                                        <span>{story.course} • Class of {story.graduationYear}</span>
                                    </div>

                                    <blockquote className="text-sm text-gray-600 italic line-clamp-3 border-l-2 border-[#004fa2] pl-3">
                                        "{story.quote}"
                                    </blockquote>

                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-[10px] text-gray-400">
                                            Published: {formatDate(story.datePublished)}
                                        </span>
                                        <button
                                            onClick={() => handleToggleActive(story)}
                                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${story.active
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-500'
                                                }`}
                                        >
                                            {story.active ? 'Active' : 'Inactive'}
                                        </button>
                                    </div>
                                </div>

                                {/* Story Footer */}
                                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                    <button
                                        onClick={() => setViewingStory(story)}
                                        className="text-sm text-[#004fa2] hover:text-[#003d7a] font-medium flex items-center gap-1"
                                    >
                                        <Eye size={14} />
                                        View Full Story
                                    </button>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleEdit(story)}
                                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(story, 'story')}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={14} />
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
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
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
                                    <div className="w-10 h-10 bg-[#004fa2] rounded-xl flex items-center justify-center">
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
                                    handleEdit(viewingStory);
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

            {/* Add/Edit Modal */}
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
                                        {editingItem ? `Edit ${activeTab === 'metrics' ? 'Metric' : 'Story'}` : `Add ${activeTab === 'metrics' ? 'Metric' : 'Story'}`}
                                    </h2>
                                    <p className="text-gray-500 text-xs">
                                        {editingItem ? 'Update the details' : 'Create a new entry'}
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
                                    The {activeTab === 'metrics' ? 'metric' : 'success story'} editor form will be available once the backend API is ready.
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
        </AdminLayout>
    );
};

export default ImpactManagementPage;
