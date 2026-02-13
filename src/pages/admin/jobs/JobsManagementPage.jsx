/**
 * Jobs Management Page (Admin)
 * Professional admin interface for managing job listings and applications
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import { jobsData as initialJobs } from '../../../data/jobsData';
import {
    Briefcase,
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    MapPin,
    Clock,
    Users,
    Building2,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    X,
    FileText,
    Target,
    TrendingUp,
    Calendar,
    Award,
    ExternalLink,
    CheckCircle,
    XCircle,
    AlertCircle,
    UserCheck,
    UserPlus,
    DollarSign,
    Zap,
    Globe,
    Star,
    Mail,
    Send
} from 'lucide-react';

// Job type colors and labels
const JOB_TYPE_CONFIG = {
    'Full-time': { label: 'Full-time', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: Briefcase },
    'Part-time': { label: 'Part-time', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Clock },
    'Contract': { label: 'Contract', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: FileText },
    'Internship': { label: 'Internship', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: UserPlus },
    'National Service': { label: 'National Service', color: 'bg-cyan-100 text-cyan-700 border-cyan-200', icon: Award },
    'Remote': { label: 'Remote', color: 'bg-pink-100 text-pink-700 border-pink-200', icon: Globe }
};

// Status badge component
const StatusBadge = ({ status }) => {
    const statusStyles = {
        active: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
        draft: 'bg-gray-100 text-gray-600 border border-gray-200',
        closed: 'bg-gradient-to-r from-red-500 to-rose-500 text-white',
        paused: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${statusStyles[status] || statusStyles.draft}`}>
            {status || 'Active'}
        </span>
    );
};

const JobsManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuperAdmin } = usePermissions();

    // State management
    // State management
    const [jobs, setJobs] = useState(initialJobs);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' or 'applications'
    const [showModal, setShowModal] = useState(false);

    // Redirect to form when modal is opened
    useEffect(() => {
        if (showModal) {
            navigate('/admin/jobs/new');
            setShowModal(false);
        }
    }, [showModal, navigate]);

    const itemsPerPage = 6;

    // Mock applications data
    const mockApplications = useMemo(() => [
        { id: '1', jobId: 1, name: 'Kwame Asante', email: 'kwame@email.com', status: 'pending', appliedAt: '2026-02-05', phone: '+233 24 123 4567' },
        { id: '2', jobId: 2, name: 'Ama Serwaa', email: 'ama@email.com', status: 'reviewed', appliedAt: '2026-02-03', phone: '+233 20 234 5678' },
        { id: '3', jobId: 3, name: 'Kofi Mensah', email: 'kofi@email.com', status: 'interviewed', appliedAt: '2026-02-07', phone: '+233 27 345 6789' },
        { id: '4', jobId: 1, name: 'Akua Frimpong', email: 'akua@email.com', status: 'rejected', appliedAt: '2026-02-01', phone: '+233 24 456 7890' },
        { id: '5', jobId: 2, name: 'Yaw Boateng', email: 'yaw@email.com', status: 'pending', appliedAt: '2026-02-08', phone: '+233 55 567 8901' },
    ], []);

    // Filter and search jobs
    const filteredJobs = useMemo(() => {
        let result = [...jobs];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(job =>
                job.title.toLowerCase().includes(query) ||
                job.description.toLowerCase().includes(query) ||
                job.locations?.some(loc => loc.toLowerCase().includes(query))
            );
        }

        // Type filter
        if (selectedType !== 'all') {
            result = result.filter(job => job.type === selectedType);
        }

        // Location filter
        if (selectedLocation !== 'all') {
            result = result.filter(job => job.locations?.includes(selectedLocation));
        }

        return result;
    }, [jobs, searchQuery, selectedType, selectedLocation]);

    // Pagination
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const paginatedJobs = filteredJobs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => ({
        total: jobs.length,
        fullTime: jobs.filter(j => j.type === 'Full-time').length,
        internship: jobs.filter(j => j.type === 'Internship').length,
        nationalService: jobs.filter(j => j.type === 'National Service').length,
        totalApplications: mockApplications.length,
        pendingApplications: mockApplications.filter(a => a.status === 'pending').length
    }), [jobs, mockApplications]);

    // Unique locations for filter
    const uniqueLocations = useMemo(() => {
        const locations = new Set();
        jobs.forEach(job => {
            job.locations?.forEach(loc => locations.add(loc));
        });
        return Array.from(locations);
    }, [jobs]);

    // Unique job types
    const uniqueTypes = useMemo(() => {
        return [...new Set(jobs.map(j => j.type))];
    }, [jobs]);

    // Handlers
    const handleDelete = (job) => {
        dispatch(openConfirmDialog({
            title: 'Delete Job Listing',
            message: `Are you sure you want to delete "${job.title}"? This will also delete all associated applications. This action cannot be undone.`,
            isDangerous: true,
            onConfirm: () => {
                setJobs(prev => prev.filter(j => j.id !== job.id));
                dispatch(addNotification({
                    type: 'success',
                    message: `Job "${job.title}" and associated applications deleted`
                }));
            }
        }));
    };

    const handleView = (job) => {
        navigate(`/admin/jobs/${job.id}`);
    };

    const handleViewApplication = (applicationId) => {
        navigate(`/admin/jobs/applications/${applicationId}`);
    };

    const handleEdit = (job) => {
        navigate(`/admin/jobs/edit/${job.id}`);
    };

    const handleAddNew = () => {
        navigate('/admin/jobs/new');
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedType('all');
        setSelectedLocation('all');
        setCurrentPage(1);
    };

    const getApplicationStatusColor = (status) => {
        const colors = {
            pending: 'bg-amber-100 text-amber-700 border-amber-200',
            reviewed: 'bg-blue-100 text-blue-700 border-blue-200',
            interviewed: 'bg-purple-100 text-purple-700 border-purple-200',
            hired: 'bg-green-100 text-green-700 border-green-200',
            rejected: 'bg-red-100 text-red-700 border-red-200'
        };
        return colors[status] || colors.pending;
    };

    return (
        <AdminLayout>
            <div className="space-y-6 pb-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                <Briefcase className="text-white" size={22} />
                            </div>
                            Jobs Management
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Manage job listings and review applications
                        </p>
                    </div>
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d7a] hover:to-[#004fa2] transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                    >
                        <Plus size={20} strokeWidth={2.5} />
                        Post New Job
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-xl p-1.5 shadow-sm border border-gray-100 inline-flex gap-1">
                    <button
                        onClick={() => setActiveTab('jobs')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeTab === 'jobs'
                            ? 'bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Briefcase size={16} />
                        Job Listings
                        <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'jobs' ? 'bg-white/20' : 'bg-gray-200'
                            }`}>
                            {stats.total}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${activeTab === 'applications'
                            ? 'bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <FileText size={16} />
                        Applications
                        <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'applications' ? 'bg-white/20' : 'bg-gray-200'
                            }`}>
                            {stats.totalApplications}
                        </span>
                        {stats.pendingApplications > 0 && (
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        )}
                    </button>
                </div>

                {activeTab === 'jobs' ? (
                    <>
                        {/* Statistics Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                                onClick={() => { setSelectedType('all'); setCurrentPage(1); }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                        <Briefcase className="text-blue-600" size={18} />
                                    </div>
                                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">All</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                <p className="text-xs text-gray-500 mt-0.5">Total Jobs</p>
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                                onClick={() => { setSelectedType('Full-time'); setCurrentPage(1); }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                                        <Building2 className="text-emerald-600" size={18} />
                                    </div>
                                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Full-time</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stats.fullTime}</p>
                                <p className="text-xs text-gray-500 mt-0.5">Full-time</p>
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                                onClick={() => { setSelectedType('Internship'); setCurrentPage(1); }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                                        <UserPlus className="text-amber-600" size={18} />
                                    </div>
                                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Internship</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stats.internship}</p>
                                <p className="text-xs text-gray-500 mt-0.5">Internships</p>
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                                onClick={() => { setSelectedType('National Service'); setCurrentPage(1); }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-9 h-9 bg-cyan-50 rounded-lg flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                                        <Award className="text-cyan-600" size={18} />
                                    </div>
                                    <span className="text-xs font-medium text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">NSS</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stats.nationalService}</p>
                                <p className="text-xs text-gray-500 mt-0.5">National Service</p>
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                                onClick={() => setActiveTab('applications')}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                        <FileText className="text-purple-600" size={18} />
                                    </div>
                                    <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">Apps</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
                                <p className="text-xs text-gray-500 mt-0.5">Applications</p>
                            </div>

                            <div className="bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                                        <AlertCircle className="text-white" size={18} />
                                    </div>
                                    <span className="text-xs font-medium text-white/90 bg-white/20 px-2 py-0.5 rounded-full">Pending</span>
                                </div>
                                <p className="text-2xl font-bold text-white">{stats.pendingApplications}</p>
                                <p className="text-xs text-blue-100 mt-0.5">Need Review</p>
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
                                        placeholder="Search jobs by title, description, or location..."
                                        value={searchQuery}
                                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all"
                                    />
                                </div>

                                {/* Type Filter */}
                                <div className="flex items-center gap-2">
                                    <Filter className="text-gray-400" size={18} />
                                    <select
                                        value={selectedType}
                                        onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                                        className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[140px]"
                                    >
                                        <option value="all">All Types</option>
                                        {uniqueTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Location Filter */}
                                <select
                                    value={selectedLocation}
                                    onChange={(e) => { setSelectedLocation(e.target.value); setCurrentPage(1); }}
                                    className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[140px]"
                                >
                                    <option value="all">All Locations</option>
                                    {uniqueLocations.map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>

                                {/* Reset Filters */}
                                {(searchQuery || selectedType !== 'all' || selectedLocation !== 'all') && (
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
                            {(selectedType !== 'all' || selectedLocation !== 'all') && (
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                                    <span className="text-xs text-gray-500">Active filters:</span>
                                    {selectedType !== 'all' && (
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${JOB_TYPE_CONFIG[selectedType]?.color || 'bg-gray-100 text-gray-700'}`}>
                                            {selectedType}
                                            <button onClick={() => setSelectedType('all')} className="ml-1.5 hover:opacity-70">×</button>
                                        </span>
                                    )}
                                    {selectedLocation !== 'all' && (
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-gray-100 text-gray-700 border-gray-200">
                                            <MapPin size={10} className="inline mr-1" />
                                            {selectedLocation}
                                            <button onClick={() => setSelectedLocation('all')} className="ml-1.5 hover:opacity-70">×</button>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Job Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {paginatedJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                                >
                                    {/* Card Header */}
                                    <div className="relative p-5 pb-3">
                                        <div className="flex items-start justify-between mb-3">
                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${JOB_TYPE_CONFIG[job.type]?.color || 'bg-gray-100 text-gray-700'}`}>
                                                {job.type}
                                            </span>
                                            <StatusBadge status={job.status || 'active'} />
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors line-clamp-2 min-h-[56px]">
                                            {job.title}
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                            {job.description}
                                        </p>
                                    </div>

                                    {/* Job Meta */}
                                    <div className="px-5 py-4 bg-gray-50/50 border-t border-gray-100">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <MapPin size={14} className="text-gray-400" />
                                                <span className="line-clamp-1">{job.locations?.join(', ')}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                    <FileText size={13} className="text-gray-400" />
                                                    <span>{job.responsibilities?.length || 0} responsibilities</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                    <CheckCircle size={13} className="text-gray-400" />
                                                    <span>{job.qualifications?.length || 0} qualifications</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Perks preview */}
                                        {job.perks && job.perks.length > 0 && (
                                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                                                <Zap size={12} className="text-amber-500" />
                                                <span className="text-[11px] text-gray-500 line-clamp-1">
                                                    {job.perks.slice(0, 2).join(' • ')}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleView(job)}
                                                className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(job)}
                                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Edit Job"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(job)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete Job"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <a
                                            href={`/jobs/${job.id}`}
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

                        {/* Empty State */}
                        {filteredJobs.length === 0 && (
                            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Briefcase className="text-gray-400" size={28} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
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
                                    <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredJobs.length)}</span> of{' '}
                                    <span className="font-semibold text-gray-900">{filteredJobs.length}</span> jobs
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
                    </>
                ) : (
                    /* Applications Tab */
                    <div className="space-y-5">
                        {/* Applications Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
                                <p className="text-sm text-gray-500">Review and manage job applications</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applicant</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Job Position</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applied Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {mockApplications.map((application) => {
                                            const job = jobs.find(j => j.id === application.jobId);
                                            return (
                                                <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                                {application.name.split(' ').map(n => n[0]).join('')}
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-gray-900">{application.name}</p>
                                                                <p className="text-sm text-gray-500">{application.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="font-medium text-gray-900">{job?.title || 'Unknown'}</p>
                                                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${JOB_TYPE_CONFIG[job?.type]?.color || 'bg-gray-100'}`}>
                                                            {job?.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <Calendar size={14} className="text-gray-400" />
                                                            {application.appliedAt}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${getApplicationStatusColor(application.status)}`}>
                                                            {application.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <button
                                                                onClick={() => handleViewApplication(application.id)}
                                                                className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                                title="View Application"
                                                            >
                                                                <Eye size={16} />
                                                            </button>
                                                            <button
                                                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                                title="Send Email"
                                                            >
                                                                <Mail size={16} />
                                                            </button>
                                                            <button
                                                                className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                                title="Schedule Interview"
                                                            >
                                                                <Calendar size={16} />
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
                    </div>
                )}
            </div>

            {/* Add/Edit Job Modal - Now navigates to form page */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                    <Plus className="text-white" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Opening Job Editor
                                    </h2>
                                    <p className="text-gray-500 text-xs">
                                        Redirecting to form...
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                                    <Briefcase className="text-blue-600 animate-pulse" size={32} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Opening Job Form</h3>
                                <p className="text-sm text-gray-500 max-w-md mx-auto">
                                    You will be redirected to the job form page.
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
                            <button
                                onClick={() => setShowModal(false)}
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

export default JobsManagementPage;
