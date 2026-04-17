/**
 * FAQ Management Page (Admin)
 * Professional admin interface for managing frequently asked questions
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import faqService from '../../../services/faqService';
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
import LoadingSpinner from '../../../components/admin/shared/LoadingSpinner';

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
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('category'); // category, list
    const [expandedCategories, setExpandedCategories] = useState({});
    const [expandedFaqs, setExpandedFaqs] = useState({});

    const itemsPerPage = 10;

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            setLoading(true);
            const response = await faqService.getAllFaqs();
            setFaqs(response.data);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        } finally {
            setLoading(false);
        }
    };

    // Get unique categories
    const uniqueCategories = useMemo(() => {
        return [...new Set(faqs.map(f => f.category))];
    }, [faqs]);

    // Filter and search FAQs
    const filteredFaqs = useMemo(() => {
        let result = [...faqs];

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
    }, [faqs, searchQuery, selectedCategory, selectedStatus]);

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
        total: faqs.length,
        categories: uniqueCategories.length,
        published: faqs.filter(f => f.status === 'published').length,
        drafts: faqs.filter(f => f.status === 'draft').length,
        totalViews: faqs.reduce((acc, f) => acc + (f.views || 0), 0),
        totalHelpful: faqs.reduce((acc, f) => acc + (f.helpful || 0), 0)
    }), [faqs, uniqueCategories]);

    // Handlers
    const toggleCategory = (category) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: prev[category] === undefined ? false : !prev[category]
        }));
    };

    const toggleFaq = (faqId) => {
        setExpandedFaqs(prev => ({
            ...prev,
            [faqId]: !prev[faqId]
        }));
    };

    const handleAddNew = () => {
        navigate('/admin/faq/new');
    };

    const handleEdit = (faq) => {
        navigate(`/admin/faq/edit/${faq.id}`);
    };

    const handleDelete = (faq) => {
        dispatch(openConfirmDialog({
            title: 'Delete FAQ',
            message: `Are you sure you want to delete "${faq.question}"? This action cannot be undone.`,
            confirmLabel: 'Delete',
            isDestructive: true,
            onConfirm: async () => {
                try {
                    await faqService.deleteFaq(faq.id);
                    setFaqs(prev => prev.filter(f => f.id !== faq.id));
                } catch (error) {
                    console.error('Error deleting FAQ:', error);
                }
            }
        }));
    };

    const handleDuplicate = async (faq) => {
        try {
            const { id, createdAt, ...faqData } = faq;
            const newFaqData = {
                ...faqData,
                question: `${faq.question} (Copy)`,
                status: 'draft',
                views: 0,
                helpful: 0
            };
            const response = await faqService.createFaq(newFaqData);
            setFaqs(prev => [...prev, response.data]);
        } catch (error) {
            console.error('Error duplicating FAQ:', error);
        }
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedStatus('all');
        setCurrentPage(1);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <AdminLayout>
            <div className="space-y-3 md:space-y-6 pb-8">
                {/* Page Header & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                            <HelpCircle size={18} className="text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-[11px] md:text-base font-bold text-gray-900 leading-tight">FAQ Management</h1>
                            <p className="text-[10px] text-gray-500">Manage frequently asked questions by category</p>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleAddNew}
                        className="w-full md:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#004fa2] text-white rounded-lg hover:bg-blue-800 transition-all shadow-sm text-xs font-semibold"
                    >
                        <Plus size={14} /> Add FAQ
                    </button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-4">
                    {[
                        { title: 'Total', count: stats.total, icon: HelpCircle, color: 'text-blue-600', bg: 'bg-blue-50', onClick: () => { setSelectedStatus('all'); setCurrentPage(1); } },
                        { title: 'Categories', count: stats.categories, icon: Layers, color: 'text-purple-600', bg: 'bg-purple-50', onClick: () => {} },
                        { title: 'Published', count: stats.published, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', onClick: () => { setSelectedStatus('published'); setCurrentPage(1); } },
                        { title: 'Drafts', count: stats.drafts, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50', onClick: () => { setSelectedStatus('draft'); setCurrentPage(1); } },
                        { title: 'Views', count: `${(stats.totalViews / 1000).toFixed(1)}k`, icon: Eye, color: 'text-cyan-600', bg: 'bg-cyan-50', onClick: () => {} },
                        { title: 'Helpful', count: `${(stats.totalHelpful / 1000).toFixed(1)}k`, icon: Sparkles, color: 'text-pink-600', bg: 'bg-pink-50', onClick: () => {} }
                    ].map((stat, i) => (
                        <div key={i} onClick={stat.onClick} className={`bg-white border border-gray-100 rounded-xl p-2 md:p-2.5 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-1 md:gap-2 shadow-sm hover:border-[#004fa2] transition-colors text-center md:text-left ${stat.onClick ? 'cursor-pointer' : ''} group`}>
                            <div className={`w-6 h-6 md:w-7 md:h-7 rounded-md shrink-0 flex items-center justify-center ${stat.bg}`}>
                                <stat.icon className={stat.color} size={14} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[9px] md:text-[10px] text-gray-500 font-medium uppercase tracking-wide truncate group-hover:text-[#004fa2] transition-colors">{stat.title}</p>
                                <p className="text-xs md:text-sm font-bold text-gray-900 leading-none mt-0.5 md:mt-0">{stat.count}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters and Search */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-2 mb-4">
                    <div className="col-span-2 md:col-span-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search FAQs..."
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
                            {uniqueCategories.map((cat, idx) => (
                                <option key={`cat-${cat}-${idx}`} value={cat}>{cat}</option>
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

                    <div className="col-span-2 md:col-span-2 flex items-center justify-end gap-1">
                        <div className="flex bg-white border border-gray-100 rounded-xl p-0.5 shadow-sm h-[34px]">
                            <button onClick={() => setViewMode('category')} className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${viewMode === 'category' ? 'bg-[#004fa2] text-white' : 'text-gray-400 hover:text-gray-600'}`}>
                                <Layers size={14} />
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

                {/* Category View */}
                {viewMode === 'category' ? (
                    <div className="space-y-3">
                        {Object.entries(groupedFaqs).map(([category, faqs]) => {
                            const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG['General'];
                            const Icon = config.icon;
                            const isExpanded = expandedCategories[category] !== false; // Default expanded

                            return (
                                <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    {/* Category Header */}
                                    <button
                                        onClick={() => toggleCategory(category)}
                                        className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <div className={`w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br ${config.bgGradient} rounded flex items-center justify-center`}>
                                                <Icon className="text-white" size={16} />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="text-xs font-bold text-gray-900 leading-tight">{category}</h3>
                                                <p className="text-[10px] text-gray-500">{faqs.length} questions</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate('/admin/faq/new');
                                                }}
                                                className="p-1.5 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded bg-white border border-gray-100 transition-colors cursor-pointer shadow-sm"
                                                title="Add FAQ to this category"
                                            >
                                                <Plus size={12} />
                                            </div>
                                            {isExpanded ? (
                                                <ChevronUp className="text-gray-400" size={16} />
                                            ) : (
                                                <ChevronDown className="text-gray-400" size={16} />
                                            )}
                                        </div>
                                    </button>

                                    {/* FAQs List */}
                                    {isExpanded && (
                                        <div className="border-t border-gray-100">
                                            {faqs.map((faq, index) => (
                                                <div
                                                    key={faq.id}
                                                    className={`border-b border-gray-50 last:border-b-0 ${faq.status === 'draft' ? 'bg-amber-50/20' : ''}`}
                                                >
                                                    {/* FAQ Question Row */}
                                                    <div className="px-3 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                        <div className="flex items-start gap-2 flex-1 min-w-0">
                                                            <div className="w-5 h-5 bg-gray-100 rounded text-[9px] font-bold text-gray-500 flex items-center justify-center shrink-0 mt-0.5">
                                                                {index + 1}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <button
                                                                    onClick={() => toggleFaq(faq.id)}
                                                                    className="text-left w-full"
                                                                >
                                                                    <p className="text-xs font-bold text-gray-900 hover:text-[#004fa2] transition-colors leading-snug">
                                                                        {faq.question}
                                                                    </p>
                                                                </button>
                                                                {expandedFaqs[faq.id] && (
                                                                    <div className="text-[10px] text-gray-600 mt-1.5 leading-relaxed bg-gray-50 p-2 rounded border border-gray-100 pr-8 relative">
                                                                        {faq.answer}
                                                                        <button onClick={() => toggleFaq(faq.id)} className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600">
                                                                            <ChevronUp size={12} />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto pt-1 sm:pt-0">
                                                            <StatusBadge status={faq.status} />
                                                            <div className="flex items-center gap-0.5 text-[9px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                                                <Eye size={10} /> {faq.views}
                                                            </div>
                                                            <div className="flex items-center gap-0.5 border-l border-gray-200 pl-1.5 ml-1">
                                                                <button
                                                                    onClick={() => toggleFaq(faq.id)}
                                                                    className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors"
                                                                    title={expandedFaqs[faq.id] ? "Collapse" : "Expand"}
                                                                >
                                                                    {expandedFaqs[faq.id] ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                                                </button>
                                                                <button onClick={() => handleEdit(faq)} className="p-1 hover:bg-green-50 rounded text-gray-400 hover:text-green-600 transition-colors">
                                                                    <Edit size={12} />
                                                                </button>
                                                                <button onClick={() => handleDuplicate(faq)} className="p-1 hover:bg-purple-50 rounded text-gray-400 hover:text-purple-600 transition-colors">
                                                                    <Copy size={12} />
                                                                </button>
                                                                <button onClick={() => handleDelete(faq)} className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-600 transition-colors">
                                                                    <Trash2 size={12} />
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {paginatedFaqs.map((faq, index) => (
                            <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:border-[#004fa2] transition-colors p-3 group">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <span className={`px-1.5 py-[1px] rounded text-[8px] font-bold uppercase ${CATEGORY_CONFIG[faq.category]?.color || 'bg-gray-100 text-gray-700'}`}>
                                        {faq.category}
                                    </span>
                                    <StatusBadge status={faq.status} />
                                </div>
                                <h3 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#004fa2] transition-colors">{faq.question}</h3>
                                <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 leading-relaxed flex-1">{faq.answer}</p>
                                
                                <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between">
                                    <div className="flex gap-2 text-[9px] font-bold text-gray-400">
                                        <span className="flex items-center gap-0.5"><Eye size={10} /> {faq.views} views</span>
                                        <span className="flex items-center gap-0.5"><Sparkles size={10} /> {faq.helpful} helpful</span>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <button onClick={() => handleEdit(faq)} className="p-1 hover:bg-green-50 rounded text-gray-400 hover:text-green-600 transition-colors"><Edit size={12} /></button>
                                        <button onClick={() => handleDuplicate(faq)} className="p-1 hover:bg-purple-50 rounded text-gray-400 hover:text-purple-600 transition-colors"><Copy size={12} /></button>
                                        <button onClick={() => handleDelete(faq)} className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={12} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100 gap-3">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                            Showing <span className="text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="text-gray-900">{Math.min(currentPage * itemsPerPage, filteredFaqs.length)}</span> of{' '}
                            <span className="text-gray-900">{filteredFaqs.length}</span>
                        </p>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-1 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded transition-colors disabled:opacity-40"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`min-w-[24px] h-6 flex items-center justify-center rounded text-[10px] font-bold transition-all ${currentPage === page
                                            ? 'bg-[#004fa2] text-white shadow-sm'
                                            : 'text-gray-500 hover:bg-gray-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-1 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded transition-colors disabled:opacity-40"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </AdminLayout>
    );
};

export default FaqManagementPage;
