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
import jobsService from '../../../services/jobsService';
import {
    Briefcase,
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    EyeOff,
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
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [applicationCounts, setApplicationCounts] = useState({}); // NEW: Store app counts per job
    const [loading, setLoading] = useState(true);
    const [appsLoading, setAppsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [appCurrentPage, setAppCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' or 'applications'
    const [showModal, setShowModal] = useState(false);

    // Fetch jobs from backend API
    useEffect(() => {
      let isMounted = true;
      const loadJobs = async () => {
        try {
          setError(null);
          const jobsData = await jobsService.getAllJobsAdmin();
          if (isMounted) {
            setJobs(Array.isArray(jobsData) ? jobsData : []);
          }
        } catch (err) {
          console.error('Failed to fetch jobs:', err);
          if (isMounted) {
            setError('Failed to load jobs');
            setJobs([]);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };

      loadJobs();
      return () => { isMounted = false; };
    }, []);

    // Fetch application counts for all jobs on initial load
    useEffect(() => {
      let isMounted = true;
      const loadApplicationCounts = async () => {
        if (jobs.length === 0) return;
        
        try {
          const counts = {};
          
          // Fetch applications count for each job
          for (const job of jobs) {
            try {
              const jobApps = await jobsService.getJobApplications(job.id);
              counts[job.id] = Array.isArray(jobApps) ? jobApps.length : 0;
            } catch (err) {
              console.error(`Failed to fetch applications count for job ${job.id}:`, err);
              counts[job.id] = 0;
            }
          }
          
          if (isMounted) {
            setApplicationCounts(counts);
            console.log('✅ Application counts loaded:', counts);
          }
        } catch (err) {
          console.error('Failed to fetch application counts:', err);
        }
      };

      loadApplicationCounts();
      return () => { isMounted = false; };
    }, [jobs]);

    // Fetch applications from backend API
    useEffect(() => {
      let isMounted = true;
      const loadApplications = async () => {
        if (activeTab !== 'applications' || jobs.length === 0) return;
        
        try {
          setAppsLoading(true);
          const allApplications = [];
          
          // Fetch applications for all jobs
          for (const job of jobs) {
            try {
              const jobApps = await jobsService.getJobApplications(job.id);
              if (Array.isArray(jobApps)) {
                // Map backend data to match table expectations
                const mappedApps = jobApps.map(app => ({
                  id: app.id,
                  jobId: job.id,
                  name: `${app.firstName} ${app.lastName}`,
                  email: app.email,
                  status: app.status || 'pending',
                  appliedAt: app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A',
                  phone: app.phoneNumber,
                  ...app // Include all original fields for details view
                }));
                allApplications.push(...mappedApps);
              }
            } catch (err) {
              console.error(`Failed to fetch applications for job ${job.id}:`, err);
            }
          }
          
          if (isMounted) {
            // Sort by appliedAt (newest first)
            allApplications.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));
            setApplications(allApplications);
          }
        } catch (err) {
          console.error('Failed to fetch applications:', err);
          if (isMounted) {
            setApplications([]);
          }
        } finally {
          if (isMounted) {
            setAppsLoading(false);
          }
        }
      };

      loadApplications();
      return () => { isMounted = false; };
    }, [activeTab, jobs]);

    // Redirect to form when modal is opened
    useEffect(() => {
        if (showModal) {
            navigate('/admin/jobs/new');
            setShowModal(false);
        }
    }, [showModal, navigate]);

    const itemsPerPage = 6;

    // Mock applications data - REPLACED WITH REAL DATA ABOVE
    // const mockApplications = useMemo(() => [...], []);

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

    // Application Pagination
    const appsPerPage = 4;
    const totalAppPages = Math.ceil(applications.length / appsPerPage);
    const paginatedApps = applications.slice(
        (appCurrentPage - 1) * appsPerPage,
        appCurrentPage * appsPerPage
    );

    // Statistics
    const stats = useMemo(() => ({
        total: jobs.length,
        fullTime: jobs.filter(j => j.type === 'Full-time').length,
        internship: jobs.filter(j => j.type === 'Internship').length,
        nationalService: jobs.filter(j => j.type === 'National Service').length,
        totalApplications: applications.length,
        pendingApplications: applications.filter(a => a.status === 'pending').length
    }), [jobs, applications]);

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
            onConfirm: async () => {
                try {
                    await jobsService.deleteJob(job.id);
                    setJobs(prev => prev.filter(j => j.id !== job.id));
                    dispatch(addNotification({
                        type: 'success',
                        message: `Job "${job.title}" and associated applications deleted`
                    }));
                } catch (error) {
                    console.error('Failed to delete job:', error);
                    dispatch(addNotification({
                        type: 'error',
                        message: 'Failed to delete job. Please try again.'
                    }));
                }
            }
        }));
    };

    const handlePublish = async (job) => {
        const isPublishing = job.status !== 'active';
        const newStatus = isPublishing ? 'active' : 'draft';
        
        try {
            await jobsService.updateJob(job.id, { ...job, status: newStatus });
            setJobs(prev => prev.map(j => j.id === job.id ? { ...j, status: newStatus } : j));
            dispatch(addNotification({
                type: 'success',
                message: `Job "${job.title}" ${isPublishing ? 'published' : 'unpublished'} successfully`
            }));
        } catch (error) {
            console.error('Failed to publish/unpublish job:', error);
            dispatch(addNotification({
                type: 'error',
                message: 'Failed to update job status. Please try again.'
            }));
        }
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
            <div className="space-y-3 md:space-y-6 pb-8">
                {/* Page Header */}
                {/* Page Header & Navigation */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                            <Briefcase size={18} className="text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-[11px] md:text-base font-bold text-gray-900 leading-tight">Jobs Management</h1>
                            <p className="text-[10px] text-gray-500">Manage listings and review applications</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                        <div className="bg-gray-50 rounded-lg p-1 border border-gray-100 inline-flex flex-1 md:flex-none">
                            <button
                                onClick={() => setActiveTab('jobs')}
                                className={`flex-1 md:flex-none px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                                    activeTab === 'jobs' ? 'bg-white shadow-sm text-blue-700 font-bold' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <Briefcase size={14} /> Jobs
                                <span className={`ml-1 px-1.5 py-0.5 rounded text-[9px] ${activeTab === 'jobs' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200'}`}>{stats.total}</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('applications')}
                                className={`flex-1 md:flex-none px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                                    activeTab === 'applications' ? 'bg-white shadow-sm text-blue-700 font-bold' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <FileText size={14} /> Applications
                                <span className={`ml-1 px-1.5 py-0.5 rounded text-[9px] ${activeTab === 'applications' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200'}`}>{stats.totalApplications}</span>
                                {stats.pendingApplications > 0 && <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></span>}
                            </button>
                        </div>
                        
                        <button
                            onClick={handleAddNew}
                            className="bg-[#004fa2] hover:bg-blue-800 text-white font-semibold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1 transition-all shadow-sm shrink-0"
                        >
                            <Plus size={16} />
                            <span className="text-xs hidden sm:inline">Post Job</span>
                        </button>
                    </div>
                </div>

                {activeTab === 'jobs' ? (
                    <>
                        {/* Statistics Cards */}
                        {/* Statistics Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                            {[
                                { title: 'Total', count: stats.total, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50', onClick: () => { setSelectedType('all'); setCurrentPage(1); } },
                                { title: 'Full Time', count: stats.fullTime, icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50', onClick: () => { setSelectedType('Full-time'); setCurrentPage(1); } },
                                { title: 'Interns', count: stats.internship, icon: UserPlus, color: 'text-amber-600', bg: 'bg-amber-50', onClick: () => { setSelectedType('Internship'); setCurrentPage(1); } },
                                { title: 'NSS', count: stats.nationalService, icon: Award, color: 'text-cyan-600', bg: 'bg-cyan-50', onClick: () => { setSelectedType('National Service'); setCurrentPage(1); } },
                                { title: 'Apps', count: stats.totalApplications, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50', onClick: () => setActiveTab('applications') },
                                { title: 'Pending', count: stats.pendingApplications, icon: AlertCircle, color: 'text-pink-600', bg: 'bg-pink-50', onClick: () => setActiveTab('applications') }
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
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                            <div className="col-span-2 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search jobs..."
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                    className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all"
                                />
                            </div>

                            <div className="relative">
                                <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select
                                    value={selectedType}
                                    onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                                    className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                                >
                                    <option value="all">All Types</option>
                                    {uniqueTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative flex gap-1">
                                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <select
                                    value={selectedLocation}
                                    onChange={(e) => { setSelectedLocation(e.target.value); setCurrentPage(1); }}
                                    className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                                >
                                    <option value="all">All Locations</option>
                                    {uniqueLocations.map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                                
                                {(searchQuery || selectedType !== 'all' || selectedLocation !== 'all') && (
                                    <button onClick={resetFilters} className="bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 px-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-center">
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Job Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {paginatedJobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:border-[#004fa2] transition-colors group p-3"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`px-1.5 py-[1px] rounded text-[9px] font-bold uppercase ${JOB_TYPE_CONFIG[job.type]?.color || 'bg-gray-100 text-gray-700'}`}>
                                            {job.type}
                                        </span>
                                        <StatusBadge status={job.status || 'active'} />
                                    </div>
                                    
                                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors line-clamp-1 mb-0.5">
                                        {job.title}
                                    </h3>
                                    
                                    <p className="text-[10px] text-gray-500 line-clamp-2 mb-2 min-h-[30px] leading-relaxed">
                                        {job.description}
                                    </p>
                                    
                                    <div className="mt-auto space-y-1.5 pt-2 border-t border-gray-50">
                                        <div className="flex items-center justify-between text-[10px] text-gray-500">
                                            <div className="flex items-center gap-1 min-w-0 pr-2">
                                                <MapPin size={10} className="text-gray-400 shrink-0" />
                                                <span className="truncate">{job.locations?.join(', ')}</span>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded" title="Applications">
                                                    <Users size={10} className="text-purple-600"/>
                                                    {applicationCounts[job.id] ?? 0}
                                                </span>
                                                <span className="flex items-center gap-0.5"><FileText size={10} className="text-gray-400"/> {job.responsibilities?.length || 0}</span>
                                                <span className="flex items-center gap-0.5"><CheckCircle size={10} className="text-gray-400"/> {job.qualifications?.length || 0}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Action Bar */}
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-1">
                                                <button onClick={() => handlePublish(job)} className={`p-1.5 hover:bg-gray-100 rounded transition-colors ${job.status === 'active' ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-amber-600'}`} title={job.status === 'active' ? 'Unpublish' : 'Publish'}>{job.status === 'active' ? <Eye size={12}/> : <EyeOff size={12}/>}</button>
                                                <button onClick={() => handleView(job)} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-[#004fa2] transition-colors" title="View"><Eye size={12}/></button>
                                                <button onClick={() => handleEdit(job)} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-green-600 transition-colors" title="Edit"><Edit size={12}/></button>
                                                <button onClick={() => handleDelete(job)} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 size={12}/></button>
                                            </div>
                                            <a href={`/jobs/${job.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[9px] font-bold text-[#004fa2] hover:underline uppercase bg-blue-50 px-2 py-1 rounded">
                                                Preview <ExternalLink size={10} />
                                            </a>
                                        </div>
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
                        {/* Loading State */}
                        {appsLoading && (
                            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                                    <Briefcase className="text-blue-600 animate-spin" size={24} />
                                </div>
                                <p className="text-gray-600 font-medium">Loading applications...</p>
                            </div>
                        )}

                        {/* Applications Table */}
                        {!appsLoading && (
                            <>
                                <div className="bg-transparent md:bg-white md:rounded-xl md:shadow-sm md:border border-gray-100 overflow-hidden">
                                    <div className="hidden md:block px-6 py-4 border-b border-gray-100">
                                        <h3 className="text-sm font-semibold text-gray-900">Recent Applications</h3>
                                        <p className="text-[10px] text-gray-500">Review and manage job applications</p>
                                    </div>
                                    <div className="overflow-x-visible md:overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead className="hidden md:table-header-group bg-gray-50 border-b border-gray-100">
                                                <tr>
                                                    <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-[35%]">Applicant</th>
                                                    <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-[30%]">Job Position</th>
                                                    <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Applied Date</th>
                                                    <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                                    <th className="px-4 py-3 text-right text-[10px] font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="flex flex-col md:table-row-group divide-y-0 md:divide-y divide-gray-100">
                                                {paginatedApps.length > 0 ? (
                                                    paginatedApps.map((application) => {
                                                        const job = jobs.find(j => j.id === application.jobId);
                                                        return (
                                                            <tr key={application.id} className="flex flex-wrap items-center md:table-row bg-white rounded-xl shadow-sm border border-gray-100 md:border-none md:shadow-none mb-3 md:mb-0 hover:bg-gray-50/80 transition-colors group p-3 md:p-0 gap-x-3 gap-y-1">
                                                                
                                                                {/* Applicant Info */}
                                                                <td className="w-full md:w-auto md:table-cell md:px-4 md:py-3 mb-1 md:mb-0">
                                                                    <div className="flex items-center gap-2.5">
                                                                        <div className="w-6 h-6 md:w-8 md:h-8 md:w-7 md:h-7 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-full flex items-center justify-center text-white font-bold text-[10px] shrink-0">
                                                                            {application.name.split(' ').map(n => n[0]).join('')}
                                                                        </div>
                                                                        <div className="min-w-0">
                                                                            <p className="font-bold text-sm md:text-sm text-gray-900 truncate leading-tight">{application.name}</p>
                                                                            <p className="text-[10px] text-gray-500 truncate">{application.email}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                {/* Job Position */}
                                                                <td className="w-full md:w-auto md:table-cell md:px-4 md:py-3 mt-1 md:mt-0">
                                                                    <p className="font-medium text-xs md:text-[11px] text-gray-900 line-clamp-1">{job?.title || 'Unknown'}</p>
                                                                    <span className={`inline-block mt-0.5 px-1.5 py-[1px] rounded text-[9px] font-bold uppercase ${JOB_TYPE_CONFIG[job?.type]?.color || 'bg-gray-100'}`}>
                                                                        {job?.type}
                                                                    </span>
                                                                </td>

                                                                {/* Date */}
                                                                <td className="w-auto md:table-cell md:px-4 md:py-3">
                                                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 whitespace-nowrap">
                                                                        <Calendar size={10} className="text-gray-400" />
                                                                        {application.appliedAt}
                                                                    </div>
                                                                </td>

                                                                {/* Status */}
                                                                <td className="w-auto md:table-cell md:px-4 md:py-3 border-l border-gray-200 pl-3 md:border-l-0 md:pl-0">
                                                                    <span className={`px-2 py-[2px] rounded text-[9px] font-bold uppercase border ${getApplicationStatusColor(application.status)}`}>
                                                                        {application.status}
                                                                    </span>
                                                                </td>

                                                                {/* Actions */}
                                                                <td className="w-full md:w-auto md:table-cell md:px-4 md:py-3 mt-2 md:mt-0 pt-2 border-t border-gray-100 md:border-none">
                                                                    <div className="flex items-center justify-end gap-1">
                                                                        <button
                                                                            onClick={() => handleViewApplication(application.id)}
                                                                            className="p-1.5 flex items-center justify-center hover:bg-gray-100 rounded text-gray-500 hover:text-[#004fa2] md:shadow-sm md:border border-transparent md:hover:border-gray-200 transition-colors"
                                                                            title="View Application"
                                                                        >
                                                                            <Eye size={14} className="md:w-3.5 md:h-3.5" />
                                                                        </button>
                                                                        <button
                                                                            className="p-1.5 flex items-center justify-center hover:bg-gray-100 rounded text-gray-500 hover:text-green-600 md:shadow-sm md:border border-transparent md:hover:border-gray-200 transition-colors"
                                                                            title="Send Email"
                                                                        >
                                                                            <Mail size={14} className="md:w-3.5 md:h-3.5" />
                                                                        </button>
                                                                        <button
                                                                            className="p-1.5 flex items-center justify-center hover:bg-gray-100 rounded text-gray-500 hover:text-purple-600 md:shadow-sm md:border border-transparent md:hover:border-gray-200 transition-colors"
                                                                            title="Schedule Interview"
                                                                        >
                                                                            <Calendar size={14} className="md:w-3.5 md:h-3.5" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="px-4 py-12 text-center">
                                                            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                                                                <FileText className="text-gray-400" size={24} />
                                                            </div>
                                                            <p className="text-gray-600 font-medium">No applications yet</p>
                                                            <p className="text-gray-500 text-sm">Applicants will appear here</p>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Pagination for Applications */}
                                {totalAppPages > 1 && (
                                    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100 mt-4">
                                        <p className="text-sm text-gray-500">
                                            Showing <span className="font-semibold text-gray-900">{(appCurrentPage - 1) * appsPerPage + 1}</span> to{' '}
                                            <span className="font-semibold text-gray-900">{Math.min(appCurrentPage * appsPerPage, applications.length)}</span> of{' '}
                                            <span className="font-semibold text-gray-900">{applications.length}</span> apps
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setAppCurrentPage(p => Math.max(1, p - 1))}
                                                disabled={appCurrentPage === 1}
                                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <ChevronLeft size={18} />
                                            </button>
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: totalAppPages }, (_, i) => i + 1).map(page => (
                                                    <button
                                                        key={page}
                                                        onClick={() => setAppCurrentPage(page)}
                                                        className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-all ${appCurrentPage === page
                                                            ? 'bg-[#004fa2] text-white shadow-md'
                                                            : 'text-gray-600 hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => setAppCurrentPage(p => Math.min(totalAppPages, p + 1))}
                                                disabled={appCurrentPage === totalAppPages}
                                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Add/Edit Job Modal - Now navigates to form page */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
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
