/**
 * Projects Management Page (Admin)
 * Professional admin interface for managing portfolio projects
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import { projectsData as initialProjects, getProjectsByStatus, getCategories, getStatuses } from '../../../data/projectsData';
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
    // State management
    const [projects, setProjects] = useState(initialProjects);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('grid');

    const itemsPerPage = 6;

    // Filter and search projects
    const filteredProjects = useMemo(() => {
        let result = [...projects];

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
    }, [projects, searchQuery, selectedCategory, selectedStatus]);

    // Pagination
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => ({
        total: projects.length,
        active: projects.filter(p => p.status === 'Active').length,
        inProgress: projects.filter(p => p.status === 'In Progress').length,
        completed: projects.filter(p => p.status === 'Completed').length,
        featured: projects.filter(p => p.featured).length,
        totalTeam: projects.reduce((acc, p) => acc + (p.team || 0), 0),
        avgProgress: projects.length > 0 ? Math.round(projects.reduce((acc, p) => acc + (p.progress || 0), 0) / projects.length) : 0
    }), [projects]);

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
                setProjects(prev => prev.filter(p => p.id !== project.id));
                dispatch(addNotification({
                    type: 'success',
                    message: `Project "${project.title}" deleted successfully`
                }));
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
            <div className="space-y-3 md:space-y-6 pb-8">
                {/* Page Header */}
                {/* Page Header & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                            <FolderKanban size={18} className="text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-[11px] md:text-base font-bold text-gray-900 leading-tight">Projects Management</h1>
                            <p className="text-[10px] text-gray-500">Manage portfolio projects and case studies</p>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleAddNew}
                        className="w-full md:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#004fa2] text-white rounded-lg hover:bg-blue-800 transition-all shadow-sm text-xs font-semibold"
                    >
                        <Plus size={14} /> Add Project
                    </button>
                </div>

                {/* Statistics Cards */}
                {/* Statistics Cards */}
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3 mb-4">
                    {[
                        { title: 'Total', count: stats.total, icon: FolderKanban, color: 'text-blue-600', bg: 'bg-blue-50', onClick: () => { setSelectedStatus('all'); setCurrentPage(1); } },
                        { title: 'Active', count: stats.active, icon: Play, color: 'text-green-600', bg: 'bg-green-50', onClick: () => { setSelectedStatus('Active'); setCurrentPage(1); } },
                        { title: 'Progress', count: stats.inProgress, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', onClick: () => { setSelectedStatus('In Progress'); setCurrentPage(1); } },
                        { title: 'Done', count: stats.completed, icon: CheckCircle, color: 'text-cyan-600', bg: 'bg-cyan-50', onClick: () => { setSelectedStatus('Completed'); setCurrentPage(1); } },
                        { title: 'Featured', count: stats.featured, icon: Rocket, color: 'text-purple-600', bg: 'bg-purple-50', onClick: () => {} },
                        { title: 'Team', count: stats.totalTeam, icon: Users, color: 'text-pink-600', bg: 'bg-pink-50', onClick: () => {} },
                        { title: 'Avg', count: `${stats.avgProgress}%`, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50', onClick: () => {} }
                    ].map((stat, i) => (
                        <div key={i} onClick={stat.onClick} className="bg-white border border-gray-100 rounded-xl p-2 md:p-2.5 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-1 md:gap-2 shadow-sm hover:border-[#004fa2] transition-colors cursor-pointer text-center md:text-left group">
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
                    <div className="col-span-2 md:col-span-5 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search projects..."
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
                            {uniqueCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
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
                            {uniqueStatuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
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

                {/* Projects Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {paginatedProjects.map((project) => (
                            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:border-[#004fa2] transition-colors group p-2">
                                <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2 shrink-0">
                                    <img decoding="async" src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <div className="absolute top-1 left-1 flex flex-col gap-1 items-start">
                                        <span className={`px-1.5 py-[1px] rounded text-[8px] font-bold uppercase backdrop-blur-sm shadow-sm ${CATEGORY_CONFIG[project.category]?.color || 'bg-white/90 text-gray-800'}`}>
                                            {project.category}
                                        </span>
                                        {project.featured && (
                                            <span className="flex items-center gap-0.5 bg-amber-500/90 text-white w-fit px-1.5 py-[1px] rounded text-[8px] font-bold backdrop-blur-sm shadow-sm">
                                                <Rocket size={8} /> Featured
                                            </span>
                                        )}
                                    </div>
                                    <div className="absolute bottom-1 right-1">
                                        <StatusBadge status={project.status} />
                                    </div>
                                </div>
                                
                                <div className="px-1 flex flex-col flex-1">
                                    <h3 className="text-xs font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors line-clamp-1">{project.title}</h3>
                                    <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 h-[30px] leading-snug">{project.description}</p>
                                    
                                    <div className="flex flex-wrap gap-1 mt-2 h-[18px] overflow-hidden">
                                        {project.technologies?.slice(0, 3).map((tech, idx) => (
                                            <span key={idx} className="text-[8px] bg-gray-100 text-gray-600 px-1.5 py-[1px] rounded uppercase font-semibold">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-3 pt-2 border-t border-gray-50 flex flex-col text-[9px] text-gray-500 gap-1.5 pb-1">
                                        <div className="flex items-center justify-between font-semibold">
                                            <span className="text-gray-400">Progress</span>
                                            <span className={project.progress > 80 ? 'text-green-600' : 'text-blue-600'}>{project.progress}%</span>
                                        </div>
                                        <ProgressBar progress={project.progress} />
                                        
                                        <div className="flex items-center justify-between mt-1 pt-1">
                                            <span className="flex items-center gap-0.5"><Users size={10}/> {project.team} members</span>
                                            <span className="flex items-center gap-0.5"><Calendar size={10}/> {new Date(project.startDate).toLocaleDateString(undefined, {month:'short', year:'2-digit'})}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50 px-1">
                                    <div className="flex items-center gap-1">
                                        <button onClick={() => handleView(project)} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-[#004fa2]"><Eye size={12}/></button>
                                        <button onClick={() => handleEdit(project)} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-green-600"><Edit size={12}/></button>
                                        <button onClick={() => handleDelete(project)} className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-600"><Trash2 size={12}/></button>
                                    </div>
                                    <a href={project.link || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[9px] font-bold text-[#004fa2] hover:underline uppercase bg-blue-50 px-1.5 py-0.5 rounded">
                                        Preview <ExternalLink size={10} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* List View */
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
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
                                                    <img decoding="async"
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
