/**
 * FAQ Management Page (Admin)
 * Professional admin interface for managing frequently asked questions
 */

import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import {
    HelpCircle,
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    Grid,
    List,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    X,
    MessageCircle,
    Phone,
    Mail,
    Tag,
    ExternalLink,
    AlertCircle,
    CheckCircle,
    Layers,
    FolderOpen,
    FileText,
    GripVertical,
    Copy,
    ToggleLeft,
    ToggleRight,
    Sparkles,
    Users,
    Settings,
    Briefcase
} from 'lucide-react';

// Category configuration
const CATEGORY_CONFIG = {
    'Internship Program': {
        label: 'Internship Program',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: Users,
        bgGradient: 'from-blue-500 to-indigo-600'
    },
    'Services & Support': {
        label: 'Services & Support',
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: Settings,
        bgGradient: 'from-green-500 to-emerald-600'
    },
    'Partnerships': {
        label: 'Partnerships',
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        icon: MessageCircle,
        bgGradient: 'from-purple-500 to-violet-600'
    },
    'Donations & Support': {
        label: 'Donations & Support',
        color: 'bg-amber-100 text-amber-700 border-amber-200',
        icon: Mail,
        bgGradient: 'from-amber-500 to-orange-600'
    },
    'Training': {
        label: 'Training',
        color: 'bg-cyan-100 text-cyan-700 border-cyan-200',
        icon: Sparkles,
        bgGradient: 'from-cyan-500 to-blue-600'
    },
    'General': {
        label: 'General',
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: HelpCircle,
        bgGradient: 'from-gray-500 to-slate-600'
    }
};

// Mock FAQ data (based on FaqCategories structure)
const mockFaqData = [
    {
        id: 1,
        category: 'Internship Program',
        question: 'Who can apply for Zyra Tech Hub\'s internship program?',
        answer: 'University students, graduates, and anyone eager to gain real-world tech experience.',
        status: 'published',
        order: 1,
        views: 245,
        helpful: 89,
        createdAt: '2024-12-01'
    },
    {
        id: 2,
        category: 'Internship Program',
        question: 'How much does the internship cost?',
        answer: 'GHS 350, covering mentorship, training, and certification.',
        status: 'published',
        order: 2,
        views: 312,
        helpful: 156,
        createdAt: '2024-12-01'
    },
    {
        id: 3,
        category: 'Internship Program',
        question: 'Do you partner with schools outside Koforidua?',
        answer: 'Currently we focus on Koforidua but will expand regionally and internationally.',
        status: 'published',
        order: 3,
        views: 178,
        helpful: 67,
        createdAt: '2024-12-02'
    },
    {
        id: 4,
        category: 'Internship Program',
        question: 'Can institutions request IT or web services?',
        answer: 'Yes, we provide professional IT, web, and networking services for schools and organizations.',
        status: 'published',
        order: 4,
        views: 134,
        helpful: 45,
        createdAt: '2024-12-02'
    },
    {
        id: 5,
        category: 'Internship Program',
        question: 'How can individuals or companies support your programs?',
        answer: 'Through sponsorships, partnerships, or donations of funds and equipment.',
        status: 'published',
        order: 5,
        views: 98,
        helpful: 34,
        createdAt: '2024-12-03'
    },
    {
        id: 6,
        category: 'Services & Support',
        question: 'What IT and digital services do you offer?',
        answer: 'We provide Education Technology (EdTech), IT & Networking, Web & Software Development, and Consulting & Support services for schools and businesses.',
        status: 'published',
        order: 1,
        views: 267,
        helpful: 112,
        createdAt: '2024-12-05'
    },
    {
        id: 7,
        category: 'Services & Support',
        question: 'What specific IT services are available?',
        answer: 'LAN/WAN installation, WiFi setup, server deployment, school websites, management systems, and IT consulting.',
        status: 'published',
        order: 2,
        views: 189,
        helpful: 78,
        createdAt: '2024-12-05'
    },
    {
        id: 8,
        category: 'Services & Support',
        question: 'Do you offer long-term support contracts?',
        answer: 'Yes, we provide long-term maintenance contracts and ongoing system support for schools and businesses.',
        status: 'published',
        order: 3,
        views: 145,
        helpful: 56,
        createdAt: '2024-12-06'
    },
    {
        id: 9,
        category: 'Services & Support',
        question: 'How can I request a quote for services?',
        answer: 'Contact us directly through our website or email info@zyratechhub.com with your project details.',
        status: 'published',
        order: 4,
        views: 203,
        helpful: 89,
        createdAt: '2024-12-06'
    },
    {
        id: 10,
        category: 'Partnerships',
        question: 'What types of partnerships do you offer?',
        answer: 'Educational partnerships (introduce digital learning programs), Corporate partnerships (sponsor or host interns), NGO & Government partnerships (support youth capacity-building), and Technology partnerships (co-develop tools and solutions).',
        status: 'published',
        order: 1,
        views: 156,
        helpful: 67,
        createdAt: '2024-12-08'
    },
    {
        id: 11,
        category: 'Partnerships',
        question: 'How can our organization partner with Zyra Tech Hub?',
        answer: 'Contact us through our partnership page or email info@zyratechhub.com to discuss collaboration opportunities.',
        status: 'published',
        order: 2,
        views: 134,
        helpful: 45,
        createdAt: '2024-12-08'
    },
    {
        id: 12,
        category: 'Partnerships',
        question: 'Can my company sponsor a student?',
        answer: 'Yes, we welcome corporate sponsorships to help students access our tech programs and create meaningful impact.',
        status: 'published',
        order: 3,
        views: 112,
        helpful: 38,
        createdAt: '2024-12-09'
    },
    {
        id: 13,
        category: 'Partnerships',
        question: 'What are the benefits of partnership?',
        answer: 'Partners gain access to skilled interns, enhanced CSR impact, technology solutions, and opportunities to shape the next generation of tech talent.',
        status: 'draft',
        order: 4,
        views: 89,
        helpful: 23,
        createdAt: '2024-12-09'
    },
    {
        id: 14,
        category: 'Donations & Support',
        question: 'How can I support Zyra Tech Hub?',
        answer: 'You can fund students to access tech programs, donate equipment (laptops, kits, accessories), or sponsor school-based technology programs.',
        status: 'published',
        order: 1,
        views: 178,
        helpful: 67,
        createdAt: '2024-12-10'
    },
    {
        id: 15,
        category: 'Donations & Support',
        question: 'What equipment donations do you accept?',
        answer: 'We accept laptops, robotics kits, networking equipment, and other technology resources for training programs.',
        status: 'published',
        order: 2,
        views: 145,
        helpful: 56,
        createdAt: '2024-12-10'
    },
    {
        id: 16,
        category: 'Donations & Support',
        question: 'Do you provide donation receipts?',
        answer: 'Yes, we provide official receipts for all donations for tax and record-keeping purposes.',
        status: 'published',
        order: 3,
        views: 98,
        helpful: 34,
        createdAt: '2024-12-11'
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

const FaqManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuperAdmin } = usePermissions();

    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('category'); // category, list
    const [showModal, setShowModal] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);
    const [viewingFaq, setViewingFaq] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [expandedFaqs, setExpandedFaqs] = useState({});

    const itemsPerPage = 10;

    // Get unique categories
    const uniqueCategories = useMemo(() => {
        return [...new Set(mockFaqData.map(f => f.category))];
    }, []);

    // Filter and search FAQs
    const filteredFaqs = useMemo(() => {
        let result = [...mockFaqData];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(faq =>
                faq.question.toLowerCase().includes(query) ||
                faq.answer.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(faq => faq.category === selectedCategory);
        }

        // Status filter
        if (selectedStatus !== 'all') {
            result = result.filter(faq => faq.status === selectedStatus);
        }

        return result;
    }, [searchQuery, selectedCategory, selectedStatus]);

    // Group FAQs by category
    const groupedFaqs = useMemo(() => {
        const groups = {};
        filteredFaqs.forEach(faq => {
            if (!groups[faq.category]) {
                groups[faq.category] = [];
            }
            groups[faq.category].push(faq);
        });
        // Sort by order within each category
        Object.keys(groups).forEach(cat => {
            groups[cat].sort((a, b) => a.order - b.order);
        });
        return groups;
    }, [filteredFaqs]);

    // Pagination for list view
    const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);
    const paginatedFaqs = filteredFaqs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => ({
        total: mockFaqData.length,
        categories: uniqueCategories.length,
        published: mockFaqData.filter(f => f.status === 'published').length,
        drafts: mockFaqData.filter(f => f.status === 'draft').length,
        totalViews: mockFaqData.reduce((acc, f) => acc + (f.views || 0), 0),
        totalHelpful: mockFaqData.reduce((acc, f) => acc + (f.helpful || 0), 0)
    }), [uniqueCategories]);

    // Toggle category expansion
    const toggleCategory = (category) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    // Toggle FAQ expansion
    const toggleFaq = (faqId) => {
        setExpandedFaqs(prev => ({
            ...prev,
            [faqId]: !prev[faqId]
        }));
    };

    // Handlers
    const handleDelete = (faq) => {
        dispatch(openConfirmDialog({
            title: 'Delete FAQ',
            message: `Are you sure you want to delete this FAQ? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: () => {
                console.log('Deleting FAQ:', faq.id);
            }
        }));
    };

    const handleView = (faq) => {
        setViewingFaq(faq);
    };

    const handleEdit = (faq) => {
        navigate(`/admin/faq/edit/${faq.id}`);
    };

    const handleAddNew = () => {
        navigate('/admin/faq/new');
    };

    const handleDuplicate = (faq) => {
        setEditingFaq({
            ...faq,
            id: null,
            question: `${faq.question} (Copy)`,
            status: 'draft'
        });
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
                                <HelpCircle className="text-white" size={22} />
                            </div>
                            FAQ Management
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Manage frequently asked questions by category
                        </p>
                    </div>
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d7a] hover:to-[#004fa2] transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                    >
                        <Plus size={20} strokeWidth={2.5} />
                        Add New FAQ
                    </button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {/* Total FAQs */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-blue-500 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('all'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                <HelpCircle className="text-blue-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-xs text-gray-600 mt-1">Total FAQs</p>
                    </div>

                    {/* Categories */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-purple-500 hover:shadow-md transition-all duration-200 group cursor-pointer">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                                <Layers className="text-purple-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.categories}</p>
                        <p className="text-xs text-gray-600 mt-1">Categories</p>
                    </div>

                    {/* Published */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-green-500 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('published'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                                <CheckCircle className="text-green-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.published}</p>
                        <p className="text-xs text-gray-600 mt-1">Published</p>
                    </div>

                    {/* Drafts */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-amber-500 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('draft'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-amber-100 rounded flex items-center justify-center">
                                <FileText className="text-amber-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.drafts}</p>
                        <p className="text-xs text-gray-600 mt-1">Drafts</p>
                    </div>

                    {/* Total Views */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-cyan-500 hover:shadow-md transition-all duration-200 group cursor-pointer">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-cyan-100 rounded flex items-center justify-center">
                                <Eye className="text-cyan-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{(stats.totalViews / 1000).toFixed(1)}k</p>
                        <p className="text-xs text-gray-600 mt-1">Total Views</p>
                    </div>

                    {/* Total Helpful */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-pink-500 hover:shadow-md transition-all duration-200 group cursor-pointer">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center">
                                <Sparkles className="text-pink-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{(stats.totalHelpful / 1000).toFixed(1)}k</p>
                        <p className="text-xs text-gray-600 mt-1">Helpful Votes</p>
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
                                placeholder="Search FAQs by question or answer..."
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
                                className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[170px]"
                            >
                                <option value="all">All Categories</option>
                                {uniqueCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
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
                                onClick={() => setViewMode('category')}
                                className={`p-2 rounded-md transition-all flex items-center gap-1.5 px-3 ${viewMode === 'category'
                                        ? 'bg-white text-[#004fa2] shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Layers size={16} />
                                <span className="text-xs font-medium">Categories</span>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all flex items-center gap-1.5 px-3 ${viewMode === 'list'
                                        ? 'bg-white text-[#004fa2] shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <List size={16} />
                                <span className="text-xs font-medium">List</span>
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
                </div>

                {/* Category View */}
                {viewMode === 'category' ? (
                    <div className="space-y-4">
                        {Object.entries(groupedFaqs).map(([category, faqs]) => {
                            const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG['General'];
                            const Icon = config.icon;
                            const isExpanded = expandedCategories[category] !== false; // Default expanded

                            return (
                                <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    {/* Category Header */}
                                    <button
                                        onClick={() => toggleCategory(category)}
                                        className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 bg-gradient-to-br ${config.bgGradient} rounded-lg flex items-center justify-center`}>
                                                <Icon className="text-white" size={20} />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-bold text-gray-900">{category}</h3>
                                                <p className="text-xs text-gray-500">{faqs.length} questions</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate('/admin/faq/new');
                                                }}
                                                className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                                title="Add FAQ to this category"
                                            >
                                                <Plus size={18} />
                                            </div>
                                            {isExpanded ? (
                                                <ChevronUp className="text-gray-400" size={20} />
                                            ) : (
                                                <ChevronDown className="text-gray-400" size={20} />
                                            )}
                                        </div>
                                    </button>

                                    {/* FAQs List */}
                                    {isExpanded && (
                                        <div className="border-t border-gray-100">
                                            {faqs.map((faq, index) => (
                                                <div
                                                    key={faq.id}
                                                    className={`border-b border-gray-50 last:border-b-0 ${faq.status === 'draft' ? 'bg-amber-50/30' : ''}`}
                                                >
                                                    {/* FAQ Question Row */}
                                                    <div className="px-5 py-3 flex items-start justify-between gap-4">
                                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                                            <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-medium text-gray-500 shrink-0 mt-0.5">
                                                                {index + 1}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <button
                                                                    onClick={() => toggleFaq(faq.id)}
                                                                    className="text-left w-full"
                                                                >
                                                                    <p className="font-medium text-gray-900 hover:text-[#004fa2] transition-colors">
                                                                        {faq.question}
                                                                    </p>
                                                                </button>
                                                                {expandedFaqs[faq.id] && (
                                                                    <p className="text-sm text-gray-600 mt-2 leading-relaxed bg-gray-50 p-3 rounded-lg">
                                                                        {faq.answer}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 shrink-0">
                                                            <StatusBadge status={faq.status} />
                                                            <div className="flex items-center gap-0.5 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                                                <Eye size={12} />
                                                                <span>{faq.views}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1 border-l border-gray-200 pl-2">
                                                                <button
                                                                    onClick={() => toggleFaq(faq.id)}
                                                                    className="p-1.5 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded transition-colors"
                                                                    title={expandedFaqs[faq.id] ? "Collapse" : "Expand"}
                                                                >
                                                                    {expandedFaqs[faq.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                                                </button>
                                                                <button
                                                                    onClick={() => handleEdit(faq)}
                                                                    className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                                                                    title="Edit"
                                                                >
                                                                    <Edit size={14} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDuplicate(faq)}
                                                                    className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                                                                    title="Duplicate"
                                                                >
                                                                    <Copy size={14} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(faq)}
                                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                                    title="Delete"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* List View */
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-12">#</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Question</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Views</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedFaqs.map((faq, index) => (
                                    <tr key={faq.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900 line-clamp-1">{faq.question}</p>
                                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{faq.answer}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${CATEGORY_CONFIG[faq.category]?.color || 'bg-gray-100'}`}>
                                                {faq.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={faq.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                                <Eye size={14} className="text-gray-400" />
                                                {faq.views}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => handleView(faq)}
                                                    className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(faq)}
                                                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(faq)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Empty State */}
                {filteredFaqs.length === 0 && (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <HelpCircle className="text-gray-400" size={28} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No FAQs found</h3>
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

                {/* Pagination (List View) */}
                {viewMode === 'list' && totalPages > 1 && (
                    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredFaqs.length)}</span> of{' '}
                            <span className="font-semibold text-gray-900">{filteredFaqs.length}</span> FAQs
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

            {/* View FAQ Modal */}
            {viewingFaq && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-gradient-to-r from-[#004fa2] to-[#0066cc] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <HelpCircle className="text-white" size={22} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">FAQ Details</h2>
                                    <p className="text-blue-100 text-xs">{viewingFaq.category}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingFaq(null)}
                                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                            <div className="space-y-5">
                                {/* Question */}
                                <div>
                                    <p className="text-xs font-medium text-gray-500 mb-2">Question</p>
                                    <p className="text-lg font-semibold text-gray-900">{viewingFaq.question}</p>
                                </div>

                                {/* Answer */}
                                <div>
                                    <p className="text-xs font-medium text-gray-500 mb-2">Answer</p>
                                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">{viewingFaq.answer}</p>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <Eye className="mx-auto text-gray-400 mb-2" size={20} />
                                        <p className="text-lg font-bold text-gray-900">{viewingFaq.views}</p>
                                        <p className="text-xs text-gray-500">Views</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <Sparkles className="mx-auto text-gray-400 mb-2" size={20} />
                                        <p className="text-lg font-bold text-gray-900">{viewingFaq.helpful}</p>
                                        <p className="text-xs text-gray-500">Helpful</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <Layers className="mx-auto text-gray-400 mb-2" size={20} />
                                        <p className="text-lg font-bold text-gray-900">#{viewingFaq.order}</p>
                                        <p className="text-xs text-gray-500">Order</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <CheckCircle className="mx-auto text-gray-400 mb-2" size={20} />
                                        <StatusBadge status={viewingFaq.status} />
                                        <p className="text-xs text-gray-500 mt-1">Status</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                            <button
                                onClick={() => setViewingFaq(null)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                            >
                                Close
                            </button>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        setViewingFaq(null);
                                        handleEdit(viewingFaq);
                                    }}
                                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <Edit size={14} />
                                    Edit FAQ
                                </button>
                                <a
                                    href="/faq"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <ExternalLink size={14} />
                                    View Public FAQ
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit FAQ Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                    {editingFaq?.id ? <Edit className="text-white" size={20} /> : <Plus className="text-white" size={20} />}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        {editingFaq?.id ? 'Edit FAQ' : 'Add New FAQ'}
                                    </h2>
                                    <p className="text-gray-500 text-xs">
                                        {editingFaq?.id ? 'Update FAQ information' : 'Create a new frequently asked question'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => { setShowModal(false); setEditingFaq(null); }}
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
                                    The FAQ editor form will be available once the backend API is ready.
                                    Currently, FAQs are managed via the <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">FaqCategories.jsx</code> data file.
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
                            <button
                                onClick={() => { setShowModal(false); setEditingFaq(null); }}
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

export default FaqManagementPage;
