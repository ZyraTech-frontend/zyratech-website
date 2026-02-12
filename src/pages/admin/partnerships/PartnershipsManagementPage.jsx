/**
 * Partnerships Management Page (Admin)
 * Premium professional admin interface for managing partner organizations and collaborations
 * Features: Grid/Table view toggle, advanced filters, quick actions, detailed modals
 */

import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { PARTNERSHIP_TYPES, PARTNERSHIP_STATUSES, getPartnershipTypes, getPartnershipStatuses } from '../../../data/partnershipsData';
// import { usePermissions } from '../../../hooks/usePermissions'; // Will be used for permission-based feature visibility
import {
    Handshake,
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
    Calendar,
    Mail,
    Phone,
    Globe,
    MapPin,
    Building,
    Building2,
    GraduationCap,
    Briefcase,
    Users,
    Plus,
    ExternalLink,
    Star,
    TrendingUp,
    FileText,
    Award,
    Target,
    Zap,
    Send,
    MoreVertical,
    Grid3x3,
    List,
    Check,
    XCircle,
    RefreshCw
} from 'lucide-react';


// Type icon mapping for visual display
const TYPE_ICONS = {
    'corporate': Building2,
    'academic': GraduationCap,
    'training': Award,
    'technology': Zap,
    'ngo': Users,
    'government': Building
};

// Status icon mapping for visual display
const STATUS_ICONS = {
    'active': CheckCircle,
    'pending': Clock,
    'negotiating': Target,
    'expired': AlertCircle,
    'paused': Clock
};

// Mock partnerships data
const mockPartnerships = [
    {
        id: 'PART-2024-001',
        organization: {
            name: 'TechVision Ltd',
            logo: null,
            website: 'https://techvision.com.gh',
            industry: 'Software Development'
        },
        contact: {
            name: 'Kwame Asante',
            email: 'kwame@techvision.com.gh',
            phone: '+233 24 123 4567',
            role: 'CEO'
        },
        type: 'corporate',
        status: 'active',
        featured: true,
        startDate: '2024-01-15',
        endDate: '2025-01-15',
        value: 'GHS 150,000',
        description: 'Corporate training partnership for DevOps and Cloud Computing programs.',
        benefits: ['Employee Training', 'Internship Pipeline', 'Technology Collaboration'],
        studentsPlaced: 12,
        projectsCompleted: 3
    },
    {
        id: 'PART-2024-002',
        organization: {
            name: 'University of Ghana',
            logo: null,
            website: 'https://ug.edu.gh',
            industry: 'Higher Education'
        },
        contact: {
            name: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@ug.edu.gh',
            phone: '+233 27 888 9999',
            role: 'Head of Computer Science'
        },
        type: 'academic',
        status: 'active',
        featured: true,
        startDate: '2023-09-01',
        endDate: '2026-08-31',
        value: 'In-Kind',
        description: 'Academic collaboration for student internships, guest lectures, and research.',
        benefits: ['Student Internships', 'Guest Lectures', 'Curriculum Input', 'Research Collaboration'],
        studentsPlaced: 28,
        projectsCompleted: 5
    },
    {
        id: 'PART-2024-003',
        organization: {
            name: 'Ghana Digital Innovation Hub',
            logo: null,
            website: 'https://gdiHub.gov.gh',
            industry: 'Government Agency'
        },
        contact: {
            name: 'Michael Owusu',
            email: 'michael.owusu@gdiHub.gov.gh',
            phone: '+233 50 666 7777',
            role: 'Director'
        },
        type: 'government',
        status: 'negotiating',
        featured: false,
        startDate: null,
        endDate: null,
        value: 'TBD',
        description: 'Proposed partnership for national digital skills development initiative.',
        benefits: ['Funding Support', 'National Programs', 'Policy Advocacy'],
        studentsPlaced: 0,
        projectsCompleted: 0
    },
    {
        id: 'PART-2024-004',
        organization: {
            name: 'AWS Academy',
            logo: null,
            website: 'https://aws.amazon.com/academy',
            industry: 'Cloud Computing'
        },
        contact: {
            name: 'Regional Team',
            email: 'academy-africa@amazon.com',
            phone: null,
            role: 'Partner Relations'
        },
        type: 'technology',
        status: 'active',
        featured: true,
        startDate: '2024-03-01',
        endDate: '2025-02-28',
        value: 'Certification Partnership',
        description: 'Official AWS Academy member institution for cloud certification training.',
        benefits: ['AWS Curriculum', 'Certification Vouchers', 'Lab Credits', 'Instructor Training'],
        studentsPlaced: 0,
        projectsCompleted: 0
    },
    {
        id: 'PART-2024-005',
        organization: {
            name: 'Youth Employment Agency',
            logo: null,
            website: 'https://yea.gov.gh',
            industry: 'Government Agency'
        },
        contact: {
            name: 'Grace Addo',
            email: 'grace.addo@yea.gov.gh',
            phone: '+233 55 333 4444',
            role: 'Program Manager'
        },
        type: 'ngo',
        status: 'active',
        featured: false,
        startDate: '2024-06-01',
        endDate: '2024-12-31',
        value: 'GHS 80,000',
        description: 'Scholarship program for underserved youth in tech training.',
        benefits: ['Scholarship Funding', 'Youth Outreach', 'Employment Support'],
        studentsPlaced: 45,
        projectsCompleted: 2
    },
    {
        id: 'PART-2024-006',
        organization: {
            name: 'FinanceHub Ghana',
            logo: null,
            website: 'https://financehub.com.gh',
            industry: 'Financial Services'
        },
        contact: {
            name: 'Linda Amponsah',
            email: 'linda@financehub.com.gh',
            phone: '+233 20 777 8888',
            role: 'HR Director'
        },
        type: 'corporate',
        status: 'pending',
        featured: false,
        startDate: null,
        endDate: null,
        value: 'GHS 75,000',
        description: 'Proposed corporate training partnership for fintech skills development.',
        benefits: ['Employee Training', 'Talent Pipeline'],
        studentsPlaced: 0,
        projectsCompleted: 0
    },
    {
        id: 'PART-2024-007',
        organization: {
            name: 'Ashesi University',
            logo: null,
            website: 'https://ashesi.edu.gh',
            industry: 'Higher Education'
        },
        contact: {
            name: 'Prof. Emmanuel Osei',
            email: 'emmanuel.osei@ashesi.edu.gh',
            phone: '+233 23 111 2222',
            role: 'Dean of Engineering'
        },
        type: 'academic',
        status: 'active',
        featured: true,
        startDate: '2024-02-01',
        endDate: '2027-01-31',
        value: 'In-Kind + Scholarship',
        description: 'Strategic partnership for talent development and industry-academia collaboration.',
        benefits: ['Student Exchange', 'Joint Programs', 'Research Projects', 'Scholarships'],
        studentsPlaced: 15,
        projectsCompleted: 2
    },
    {
        id: 'PART-2024-008',
        organization: {
            name: 'Microsoft Imagine Academy',
            logo: null,
            website: 'https://microsoft.com/learning',
            industry: 'Technology'
        },
        contact: {
            name: 'Partner Support',
            email: 'msia-africa@microsoft.com',
            phone: null,
            role: 'Partner Support'
        },
        type: 'technology',
        status: 'expired',
        featured: false,
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        value: 'Certification Partnership',
        description: 'Microsoft certification training partnership (needs renewal).',
        benefits: ['Azure Curriculum', 'Certification Prep'],
        studentsPlaced: 8,
        projectsCompleted: 1
    },
    {
        id: 'PART-2024-009',
        organization: {
            name: 'StartupGH Foundation',
            logo: null,
            website: 'https://startupgh.org',
            industry: 'Non-Profit'
        },
        contact: {
            name: 'Kofi Boateng',
            email: 'kofi@startupgh.org',
            phone: '+233 26 555 1234',
            role: 'Executive Director'
        },
        type: 'ngo',
        status: 'paused',
        featured: false,
        startDate: '2024-04-01',
        endDate: '2024-10-31',
        value: 'In-Kind',
        description: 'Startup mentorship and incubation collaboration (paused due to funding).',
        benefits: ['Mentorship Program', 'Startup Incubation', 'Networking Events'],
        studentsPlaced: 6,
        projectsCompleted: 1
    },
    {
        id: 'PART-2024-010',
        organization: {
            name: 'Vodafone Ghana Foundation',
            logo: null,
            website: 'https://vodafone.com.gh/foundation',
            industry: 'Telecommunications'
        },
        contact: {
            name: 'Abena Yeboah',
            email: 'abena.yeboah@vodafone.com.gh',
            phone: '+233 26 444 5555',
            role: 'CSR Manager'
        },
        type: 'corporate',
        status: 'active',
        featured: true,
        startDate: '2024-07-01',
        endDate: '2025-06-30',
        value: 'GHS 200,000',
        description: 'Digital skills scholarship program and connectivity support.',
        benefits: ['Scholarship Funding', 'Internet Sponsorship', 'Device Donations'],
        studentsPlaced: 30,
        projectsCompleted: 1
    }
];

// Format date
const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

// Status badge component
const StatusBadge = ({ status }) => {
    const config = PARTNERSHIP_STATUSES[status] || PARTNERSHIP_STATUSES['pending'];
    const Icon = STATUS_ICONS[status] || Clock;

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${config.colorClass}`}>
            <Icon size={10} />
            {config.label}
        </span>
    );
};

const PartnershipsManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { isSuperAdmin } = usePermissions(); // Will be used for permission-based feature visibility

    // State management
    const [partnerships, setPartnerships] = useState(mockPartnerships);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewingPartnership, setViewingPartnership] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

    const itemsPerPage = viewMode === 'table' ? 10 : 12;

    // Filter partnerships
    const filteredPartnerships = useMemo(() => {
        let result = [...partnerships];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.id.toLowerCase().includes(query) ||
                p.organization.name.toLowerCase().includes(query) ||
                p.contact.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        // Status filter
        if (selectedStatus !== 'all') {
            if (selectedStatus === 'featured') {
                result = result.filter(p => p.featured);
            } else {
                result = result.filter(p => p.status === selectedStatus);
            }
        }

        // Type filter
        if (selectedType !== 'all') {
            result = result.filter(p => p.type === selectedType);
        }

        return result;
    }, [partnerships, searchQuery, selectedStatus, selectedType]);

    // Pagination
    const totalPages = Math.ceil(filteredPartnerships.length / itemsPerPage);
    const paginatedPartnerships = filteredPartnerships.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => {
        const totalStudents = partnerships.reduce((acc, p) => acc + p.studentsPlaced, 0);
        const totalProjects = partnerships.reduce((acc, p) => acc + p.projectsCompleted, 0);

        return {
            total: partnerships.length,
            active: partnerships.filter(p => p.status === 'active').length,
            pending: partnerships.filter(p => p.status === 'pending').length,
            negotiating: partnerships.filter(p => p.status === 'negotiating').length,
            expired: partnerships.filter(p => p.status === 'expired').length,
            featured: partnerships.filter(p => p.featured).length,
            studentsPlaced: totalStudents,
            projectsCompleted: totalProjects
        };
    }, [partnerships]);

    // Handlers
    const handleView = (partnership) => {
        setViewingPartnership(partnership);
    };

    const handleEdit = (partnership) => {
        navigate(`/admin/partnerships/edit/${partnership.id}`);
    };

    const handleAddNew = () => {
        navigate('/admin/partnerships/new');
    };

    const handleDelete = (partnership) => {
        dispatch(openConfirmDialog({
            title: 'Delete Partnership',
            message: `Are you sure you want to delete the partnership with "${partnership.organization.name}"? This action cannot be undone.`,
            isDangerous: true,
            confirmLabel: 'Delete Partnership',
            onConfirm: () => {
                setPartnerships(prev => prev.filter(p => p.id !== partnership.id));
                // console.log('Deleted partnership:', partnership.id);
            }
        }));
    };

    const handleToggleFeatured = (partnership) => {
        setPartnerships(prev => prev.map(p => p.id === partnership.id ? { ...p, featured: !p.featured } : p));
    };

    // Commented out until backend integration is ready
    // const handleApprove = (partnership) => {
    //     dispatch(openConfirmDialog({
    //         title: 'Approve Partnership',
    //         message: `Approve partnership with "${partnership.organization.name}"?`,
    //         confirmLabel: 'Approve',
    //         confirmClass: 'bg-green-600 hover:bg-green-700',
    //         onConfirm: () => {
    //             console.log('Approving partnership:', partnership.id);
    //             // API call would go here
    //         }
    //     }));
    // };

    // const handleActivate = (partnership) => {
    //     console.log('Activating partnership:', partnership.id);
    //     // API call would go here
    // };

    // const handleArchive = (partnership) => {
    //     dispatch(openConfirmDialog({
    //         title: 'Archive Partnership',
    //         message: `Archive partnership with "${partnership.organization.name}"?`,
    //         onConfirm: () => {
    //             console.log('Archiving partnership:', partnership.id);
    //             // API call would go here
    //         }
    //     }));
    // };

    const handleExport = () => {
        console.log('Exporting partnerships...');
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedStatus('all');
        setSelectedType('all');
        setCurrentPage(1);
    };

    return (
        <AdminLayout>
            <div className="space-y-6 pb-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center shadow-md">
                                <Handshake className="text-white" size={22} />
                            </div>
                            Partnerships Management
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Manage partner organizations and collaboration agreements
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* View Toggle - Hidden on mobile to force Grid view */}
                        <div className="hidden md:flex items-center bg-gray-100 rounded-xl p-1">
                            <button
                                onClick={() => { setViewMode('grid'); setCurrentPage(1); }}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'grid'
                                    ? 'bg-white text-[#004fa2] shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Grid3x3 size={16} />
                                Grid
                            </button>
                            <button
                                onClick={() => { setViewMode('table'); setCurrentPage(1); }}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'table'
                                    ? 'bg-white text-[#004fa2] shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <List size={16} />
                                Table
                            </button>
                        </div>

                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm font-medium text-sm"
                        >
                            <Download size={16} />
                            <span className="hidden sm:inline">Export</span>
                        </button>
                        <button
                            onClick={handleAddNew}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d7a] hover:to-[#004fa2] transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
                        >
                            <Plus size={18} />
                            <span className="hidden sm:inline">Add Partnership</span>
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('all'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <Handshake className="text-blue-600" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Total Partners</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('active'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                <CheckCircle className="text-green-600" size={18} />
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Live</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Active</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('pending'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                                <Clock className="text-amber-600" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Pending</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('negotiating'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-cyan-50 rounded-lg flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                                <Target className="text-cyan-600" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.negotiating}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Negotiating</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('expired'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                <AlertCircle className="text-red-600" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.expired}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Expired</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('featured'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                                <Star className="text-amber-500 fill-amber-500" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.featured}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Featured</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                                <Users className="text-white" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">{stats.studentsPlaced}</p>
                        <p className="text-xs text-purple-100 mt-0.5">Students Placed</p>
                    </div>

                    <div className="bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                                <Briefcase className="text-white" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">{stats.projectsCompleted}</p>
                        <p className="text-xs text-blue-100 mt-0.5">Projects Done</p>
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
                                placeholder="Search by organization, contact, or description..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-400" size={18} />
                            <select
                                value={selectedStatus}
                                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                                className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[140px]"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="negotiating">Negotiating</option>
                                <option value="expired">Expired</option>
                                <option value="paused">Paused</option>
                                <option value="featured">⭐ Featured</option>
                            </select>
                        </div>

                        {/* Type Filter */}
                        <select
                            value={selectedType}
                            onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                            className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[150px]"
                        >
                            <option value="all">All Types</option>
                            {getPartnershipTypes().map((type) => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>

                        {/* Reset Filters */}
                        {(searchQuery || selectedStatus !== 'all' || selectedType !== 'all') && (
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

                {/* Partnerships Grid/Table */}
                {viewMode === 'grid' ? (
                    /* Grid View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {paginatedPartnerships.map((partnership) => {
                            const typeData = PARTNERSHIP_TYPES[partnership.type];
                            const TypeIcon = TYPE_ICONS[partnership.type] || Building2;

                            return (
                                <div
                                    key={partnership.id}
                                    className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300 group ${partnership.featured ? 'border-amber-200 ring-2 ring-amber-100' : 'border-gray-100'}`}
                                >
                                    {/* Card Header */}
                                    <div className={`p-4 ${partnership.featured ? 'bg-gradient-to-r from-amber-50 to-orange-50' : 'bg-gray-50'}`}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-lg font-bold shadow-md">
                                                    {partnership.organization.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors line-clamp-1">
                                                        {partnership.organization.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-500">{partnership.organization.industry}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleToggleFeatured(partnership)}
                                                className="p-1.5 hover:bg-white/50 rounded-lg transition-colors"
                                            >
                                                <Star
                                                    size={18}
                                                    className={partnership.featured ? 'text-amber-500 fill-amber-500' : 'text-gray-300 hover:text-amber-400'}
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-4 space-y-4">
                                        <div className="flex items-center flex-wrap gap-2">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ${typeData.colorClass}`}>
                                                <TypeIcon size={10} />
                                                {typeData.label}
                                            </span>
                                            <StatusBadge status={partnership.status} />
                                        </div>

                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {partnership.description}
                                        </p>

                                        {/* Benefits */}
                                        <div className="flex flex-wrap gap-1">
                                            {partnership.benefits.slice(0, 3).map((benefit, idx) => (
                                                <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px]">
                                                    {benefit}
                                                </span>
                                            ))}
                                            {partnership.benefits.length > 3 && (
                                                <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded text-[10px]">
                                                    +{partnership.benefits.length - 3} more
                                                </span>
                                            )}
                                        </div>

                                        {/* Stats Row */}
                                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                            <div className="flex items-center gap-4 text-xs">
                                                <div className="flex items-center gap-1 text-gray-500">
                                                    <Users size={12} />
                                                    <span className="font-semibold text-gray-700">{partnership.studentsPlaced}</span> placed
                                                </div>
                                                <div className="flex items-center gap-1 text-gray-500">
                                                    <Briefcase size={12} />
                                                    <span className="font-semibold text-gray-700">{partnership.projectsCompleted}</span> projects
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dates */}
                                        <div className="flex items-center justify-between text-xs text-gray-400">
                                            <span>{formatDate(partnership.startDate)} - {formatDate(partnership.endDate)}</span>
                                            <span className="font-semibold text-gray-600">{partnership.value}</span>
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                        <button
                                            onClick={() => handleView(partnership)}
                                            className="text-sm text-[#004fa2] hover:text-[#003d7a] font-medium flex items-center gap-1 transition-colors"
                                        >
                                            <Eye size={14} />
                                            View Details
                                        </button>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleEdit(partnership)}
                                                className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(partnership)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Table View */
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Organization</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Performance</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Duration</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Value</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {paginatedPartnerships.map((partnership) => {
                                        const typeData = PARTNERSHIP_TYPES[partnership.type];
                                        const TypeIcon = TYPE_ICONS[partnership.type] || Building2;

                                        return (
                                            <tr key={partnership.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-sm font-bold shadow-sm">
                                                            {partnership.organization.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <p className="font-semibold text-gray-900">{partnership.organization.name}</p>
                                                                {partnership.featured && (
                                                                    <Star size={14} className="text-amber-500 fill-amber-500" />
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-gray-500">{partnership.organization.industry}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${typeConfig.color}`}>
                                                        <TypeIcon size={12} />
                                                        {typeConfig.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={partnership.status} />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{partnership.contact.name}</p>
                                                        <p className="text-xs text-gray-500">{partnership.contact.role}</p>
                                                        <a href={`mailto:${partnership.contact.email}`} className="text-xs text-[#004fa2] hover:underline">
                                                            {partnership.contact.email}
                                                        </a>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1 text-xs">
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Users size={12} />
                                                            <span className="font-semibold text-gray-900">{partnership.studentsPlaced}</span>
                                                            <span>students</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Briefcase size={12} />
                                                            <span className="font-semibold text-gray-900">{partnership.projectsCompleted}</span>
                                                            <span>projects</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-xs">
                                                        <p className="text-gray-600">{formatDate(partnership.startDate)}</p>
                                                        <p className="text-gray-400">to {formatDate(partnership.endDate)}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-semibold text-gray-900">{partnership.value}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <button
                                                            onClick={() => handleView(partnership)}
                                                            className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="View Details"
                                                        >
                                                            <Eye size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleToggleFeatured(partnership)}
                                                            className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                                                            title={partnership.featured ? "Remove from Featured" : "Add to Featured"}
                                                        >
                                                            <Star size={16} className={partnership.featured ? 'fill-amber-500 text-amber-500' : ''} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(partnership)}
                                                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(partnership)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
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

                {/* Empty State */}
                {filteredPartnerships.length === 0 && (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Handshake className="text-gray-400" size={36} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No partnerships found</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            {searchQuery || selectedStatus !== 'all' || selectedType !== 'all'
                                ? "No partnerships match your current filters. Try adjusting your search criteria."
                                : "Start building relationships by adding your first partnership."}
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            {(searchQuery || selectedStatus !== 'all' || selectedType !== 'all') && (
                                <button
                                    onClick={resetFilters}
                                    className="px-5 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors font-medium flex items-center gap-2"
                                >
                                    <X size={16} />
                                    Clear Filters
                                </button>
                            )}
                            <button
                                onClick={handleAddNew}
                                className="px-5 py-2.5 text-sm bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white hover:from-[#003d7a] hover:to-[#004fa2] rounded-xl transition-all font-medium flex items-center gap-2"
                            >
                                <Plus size={16} />
                                Add First Partnership
                            </button>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredPartnerships.length)}</span> of{' '}
                            <span className="font-semibold text-gray-900">{filteredPartnerships.length}</span> partnerships
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

            {/* View Partnership Modal */}
            {viewingPartnership && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-gradient-to-r from-[#004fa2] to-[#0066cc] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white text-lg font-bold">
                                    {viewingPartnership.organization.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">{viewingPartnership.organization.name}</h2>
                                    <p className="text-blue-100 text-xs">{viewingPartnership.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleToggleFeatured(viewingPartnership)}
                                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <Star size={18} className={viewingPartnership.featured ? 'fill-amber-400 text-amber-400' : ''} />
                                </button>
                                <button
                                    onClick={() => setViewingPartnership(null)}
                                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                            <div className="space-y-5">
                                {/* Status & Type */}
                                <div className="flex items-center flex-wrap gap-2">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border ${PARTNERSHIP_TYPES[viewingPartnership.type].colorClass}`}>
                                        {React.createElement(TYPE_ICONS[viewingPartnership.type] || Building2, { size: 12 })}
                                        {PARTNERSHIP_TYPES[viewingPartnership.type].label}
                                    </span>
                                    <StatusBadge status={viewingPartnership.status} />
                                    {viewingPartnership.featured && (
                                        <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded text-xs font-bold">
                                            ⭐ Featured Partner
                                        </span>
                                    )}
                                </div>

                                {/* Organization Info */}
                                <div className="bg-gray-50 rounded-xl p-5">
                                    <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                                        <Building2 size={14} />
                                        Organization Details
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-400">Industry</p>
                                            <p className="font-semibold text-gray-900">{viewingPartnership.organization.industry}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Website</p>
                                            <a
                                                href={viewingPartnership.organization.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-semibold text-[#004fa2] hover:underline flex items-center gap-1"
                                            >
                                                Visit Website <ExternalLink size={12} />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Person */}
                                <div className="bg-gray-50 rounded-xl p-5">
                                    <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                                        <Users size={14} />
                                        Contact Person
                                    </h3>
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white font-bold">
                                            {viewingPartnership.contact.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{viewingPartnership.contact.name}</p>
                                            <p className="text-sm text-gray-500">{viewingPartnership.contact.role}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Mail className="text-gray-400" size={14} />
                                            <a href={`mailto:${viewingPartnership.contact.email}`} className="text-[#004fa2] hover:underline">
                                                {viewingPartnership.contact.email}
                                            </a>
                                        </div>
                                        {viewingPartnership.contact.phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="text-gray-400" size={14} />
                                                <span className="text-gray-600">{viewingPartnership.contact.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Partnership Description</h3>
                                    <p className="text-gray-700">{viewingPartnership.description}</p>
                                </div>

                                {/* Benefits */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Partnership Benefits</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {viewingPartnership.benefits.map((benefit, idx) => (
                                            <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                                                {benefit}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Stats & Dates */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <p className="text-2xl font-bold text-[#004fa2]">{viewingPartnership.studentsPlaced}</p>
                                        <p className="text-xs text-gray-500">Students Placed</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <p className="text-2xl font-bold text-[#004fa2]">{viewingPartnership.projectsCompleted}</p>
                                        <p className="text-xs text-gray-500">Projects Completed</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <p className="text-sm font-bold text-gray-900">{formatDate(viewingPartnership.startDate)}</p>
                                        <p className="text-xs text-gray-500">Start Date</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <p className="text-sm font-bold text-gray-900">{formatDate(viewingPartnership.endDate)}</p>
                                        <p className="text-xs text-gray-500">End Date</p>
                                    </div>
                                </div>

                                {/* Value */}
                                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                                    <p className="text-xs font-medium text-green-700 mb-1">Partnership Value</p>
                                    <p className="text-xl font-bold text-green-800">{viewingPartnership.value}</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                            <button
                                onClick={() => setViewingPartnership(null)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                            >
                                Close
                            </button>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => window.open(`mailto:${viewingPartnership.contact.email}`, '_blank')}
                                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <Mail size={14} />
                                    Contact
                                </button>
                                <button
                                    onClick={() => {
                                        setViewingPartnership(null);
                                        handleEdit(viewingPartnership);
                                    }}
                                    className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <Edit size={14} />
                                    Edit Partnership
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Partnership Modal */}
            {/* Modal removed - now using dedicated form page at /admin/partnerships/new and /admin/partnerships/edit/:id */}
        </AdminLayout>
    );
};

export default PartnershipsManagementPage;
