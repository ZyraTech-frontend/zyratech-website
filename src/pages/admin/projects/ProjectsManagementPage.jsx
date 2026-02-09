/**
 * Projects Management Page (Admin)
 * Professional admin interface for managing portfolio projects
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import { projectsData, getProjectsByStatus, getCategories, getStatuses } from '../../../data/projectsData';
import {
    FolderKanban,
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
    X,
    FileText,
    Calendar,
    Tag,
    ExternalLink,
    AlertCircle,
    CheckCircle,
    Clock,
    Play,
    Pause,
    Archive,
    TrendingUp,
    Users,
    Target,
    Zap,
    Globe,
    Link2,
    Image,
    Settings,
    BarChart3,
    Layers,
    Rocket,
    Award
} from 'lucide-react';

// Category colors and labels
const CATEGORY_CONFIG = {
    'Transportation': { label: 'Transportation', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Zap },
    'Software': { label: 'Software', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Settings },
    'Environment': { label: 'Environment', color: 'bg-green-100 text-green-700 border-green-200', icon: Globe },
    'Agriculture': { label: 'Agriculture', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Target },
    'Business Solutions': { label: 'Business Solutions', color: 'bg-cyan-100 text-cyan-700 border-cyan-200', icon: BarChart3 },
    'Education': { label: 'Education', color: 'bg-pink-100 text-pink-700 border-pink-200', icon: Award },
    'Healthcare': { label: 'Healthcare', color: 'bg-red-100 text-red-700 border-red-200', icon: Users },
    'FinTech': { label: 'FinTech', color: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: TrendingUp }
};

// Status configuration
const STATUS_CONFIG = {
    'Active': { label: 'Active', color: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white', icon: Play },
    'In Progress': { label: 'In Progress', color: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white', icon: Clock },
    'Completed': { label: 'Completed', color: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white', icon: CheckCircle },
    'Paused': { label: 'Paused', color: 'bg-gray-100 text-gray-600 border border-gray-200', icon: Pause },
    'Archived': { label: 'Archived', color: 'bg-gray-400 text-white', icon: Archive }
};



// Status badge component
const StatusBadge = ({ status }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG['Active'];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${config.color}`}>
            <Icon size={10} />
            {status}
        </span>
    );
};

// Progress bar component
const ProgressBar = ({ progress }) => {
    let colorClass = 'bg-blue-500';
    if (progress >= 90) colorClass = 'bg-green-500';
    else if (progress >= 70) colorClass = 'bg-blue-500';
    else if (progress >= 40) colorClass = 'bg-amber-500';
    else colorClass = 'bg-red-500';

    return (
        <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
                className={`h-1.5 rounded-full transition-all duration-500 ${colorClass}`}
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

const ProjectsManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuperAdmin } = usePermissions();

    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('grid');

    const itemsPerPage = 6;

    // Filter and search projects
    const filteredProjects = useMemo(() => {
        let result = [...projectsData];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(project =>
                project.title.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query) ||
                project.technologies?.some(t => t.toLowerCase().includes(query))
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(project => project.category === selectedCategory);
        }

        // Status filter
        if (selectedStatus !== 'all') {
            result = result.filter(project => project.status === selectedStatus);
        }

        return result;
    }, [searchQuery, selectedCategory, selectedStatus]);

    // Pagination
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => ({
        total: projectsData.length,
        active: projectsData.filter(p => p.status === 'Active').length,
        inProgress: projectsData.filter(p => p.status === 'In Progress').length,
        completed: projectsData.filter(p => p.status === 'Completed').length,
        featured: projectsData.filter(p => p.featured).length,
        totalTeam: projectsData.reduce((acc, p) => acc + (p.team || 0), 0),
        avgProgress: Math.round(projectsData.reduce((acc, p) => acc + (p.progress || 0), 0) / projectsData.length)
    }), []);

    // Get unique categories
    const uniqueCategories = useMemo(() => {
        return getCategories();
    }, []);

    // Get unique statuses
    const uniqueStatuses = useMemo(() => {
        return getStatuses();
    }, []);

    // Handlers
    const handleDelete = (project) => {
        dispatch(openConfirmDialog({
            title: 'Delete Project',
            message: `Are you sure you want to delete "${project.title}"? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: () => {
                // TODO: Implement actual delete via API
                console.log('Deleting project:', project.id);
            }
        }));
    };

    const handleView = (project) => {
        navigate(`/admin/projects/${project.id}`);
    };

    const handleEdit = (project) => {
        navigate(`/admin/projects/edit/${project.id}`);
    };

    const handleAddNew = () => {
        navigate('/admin/projects/new');
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
                                <FolderKanban className="text-white" size={22} />
                            </div>
                            Projects Management
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Manage portfolio projects and case studies
                        </p>
                    </div>
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d7a] hover:to-[#004fa2] transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                    >
                        <Plus size={20} strokeWidth={2.5} />
                        Add New Project
                    </button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                    {/* Total Projects */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-blue-500 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('all'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                <FolderKanban className="text-blue-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-xs text-gray-600 mt-1">Total</p>
                    </div>

                    {/* Active */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-green-500 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('Active'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                                <Play className="text-green-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
                        <p className="text-xs text-gray-600 mt-1">Active</p>
                    </div>

                    {/* In Progress */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-amber-500 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('In Progress'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-amber-100 rounded flex items-center justify-center">
                                <Clock className="text-amber-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.inProgress}</p>
                        <p className="text-xs text-gray-600 mt-1">In Progress</p>
                    </div>

                    {/* Completed */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-cyan-500 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('Completed'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-cyan-100 rounded flex items-center justify-center">
                                <CheckCircle className="text-cyan-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
                        <p className="text-xs text-gray-600 mt-1">Completed</p>
                    </div>

                    {/* Featured */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-purple-500 hover:shadow-md transition-all duration-200 group cursor-pointer">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                                <Rocket className="text-purple-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.featured}</p>
                        <p className="text-xs text-gray-600 mt-1">Featured</p>
                    </div>

                    {/* Team Members */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-pink-500 hover:shadow-md transition-all duration-200 group cursor-pointer">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center">
                                <Users className="text-pink-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalTeam}</p>
                        <p className="text-xs text-gray-600 mt-1">Team Members</p>
                    </div>

                    {/* Avg Progress */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-indigo-500 hover:shadow-md transition-all duration-200 group cursor-pointer">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-indigo-100 rounded flex items-center justify-center">
                                <TrendingUp className="text-indigo-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.avgProgress}%</p>
                        <p className="text-xs text-gray-600 mt-1">Avg Progress</p>
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
                                placeholder="Search projects by title, description, or technology..."
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
                            className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[140px]"
                        >
                            <option value="all">All Status</option>
                            {uniqueStatuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
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
                                    {selectedCategory}
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

                {/* Projects Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {paginatedProjects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                            >
                                {/* Project Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleView(project)}
                                            className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                                        >
                                            <Eye className="text-white" size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                                        >
                                            <Edit className="text-white" size={18} />
                                        </button>
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${CATEGORY_CONFIG[project.category]?.color || 'bg-gray-100'}`}>
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <div className="absolute top-3 right-3">
                                            <span className="flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded-full text-[10px] font-bold">
                                                <Rocket size={10} />
                                                Featured
                                            </span>
                                        </div>
                                    )}

                                    {/* Status */}
                                    <div className="absolute bottom-3 left-3">
                                        <StatusBadge status={project.status} />
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors line-clamp-1 text-lg">
                                        {project.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {project.technologies?.slice(0, 3).map((tech, idx) => (
                                            <span key={idx} className="text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies?.length > 3 && (
                                            <span className="text-[10px] text-gray-400">
                                                +{project.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Progress & Team */}
                                    <div className="mt-4 pt-3 border-t border-gray-100">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-xs text-gray-500">Progress</span>
                                            <span className="text-xs font-semibold text-gray-900">{project.progress}%</span>
                                        </div>
                                        <ProgressBar progress={project.progress} />

                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                <Users size={12} />
                                                <span>{project.team} members</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                <Calendar size={12} />
                                                <span>{project.startDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleView(project)}
                                            className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                            title="View Project"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                            title="Edit Project"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Project"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <a
                                        href={project.link}
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
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Project</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Progress</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Team</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedProjects.map((project) => (
                                    <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-semibold text-gray-900">{project.title}</p>
                                                        {project.featured && (
                                                            <Rocket size={12} className="text-amber-500" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">
                                                        {project.technologies?.slice(0, 3).join(', ')}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${CATEGORY_CONFIG[project.category]?.color}`}>
                                                {project.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={project.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-24">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-xs font-semibold text-gray-900">{project.progress}%</span>
                                                </div>
                                                <ProgressBar progress={project.progress} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                                <Users size={14} className="text-gray-400" />
                                                {project.team}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => handleView(project)}
                                                    className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View Project"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(project)}
                                                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Edit Project"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(project)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Project"
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
                {filteredProjects.length === 0 && (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FolderKanban className="text-gray-400" size={28} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
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
                            <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredProjects.length)}</span> of{' '}
                            <span className="font-semibold text-gray-900">{filteredProjects.length}</span> projects
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
        </AdminLayout>
    );
};

export default ProjectsManagementPage;
