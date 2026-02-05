/**
 * Contact Inquiries Management Page (Admin)
 * Professional admin interface for managing contact form submissions
 */

import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import {
    Contact,
    Search,
    Filter,
    Eye,
    Trash2,
    Download,
    ChevronLeft,
    ChevronRight,
    X,
    CheckCircle,
    Clock,
    AlertCircle,
    Mail,
    Phone,
    User,
    Calendar,
    Reply,
    Star,
    Archive,
    MailOpen,
    Tag,
    Building,
    GraduationCap,
    Briefcase,
    HelpCircle,
    MessageCircle,
    Send,
    Check,
    Inbox,
    MapPin,
    Globe,
    FileText,
    Copy,
    ExternalLink,
    UserPlus,
    Layers
} from 'lucide-react';

// Inquiry status configuration
const STATUS_CONFIG = {
    'new': {
        label: 'New',
        color: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
        icon: Mail,
        dotColor: 'bg-blue-500'
    },
    'in_progress': {
        label: 'In Progress',
        color: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
        icon: Clock,
        dotColor: 'bg-amber-500'
    },
    'resolved': {
        label: 'Resolved',
        color: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
        icon: CheckCircle,
        dotColor: 'bg-green-500'
    },
    'closed': {
        label: 'Closed',
        color: 'bg-gray-100 text-gray-600 border border-gray-200',
        icon: Archive,
        dotColor: 'bg-gray-400'
    },
    'spam': {
        label: 'Spam',
        color: 'bg-gradient-to-r from-red-500 to-rose-500 text-white',
        icon: AlertCircle,
        dotColor: 'bg-red-500'
    }
};

// Inquiry type/subject configuration
const TYPE_CONFIG = {
    'general': {
        label: 'General Inquiry',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: HelpCircle
    },
    'training': {
        label: 'Training Info',
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: GraduationCap
    },
    'partnership': {
        label: 'Partnership',
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        icon: Building
    },
    'careers': {
        label: 'Careers/Jobs',
        color: 'bg-amber-100 text-amber-700 border-amber-200',
        icon: Briefcase
    },
    'support': {
        label: 'Technical Support',
        color: 'bg-red-100 text-red-700 border-red-200',
        icon: MessageCircle
    },
    'quote': {
        label: 'Quote Request',
        color: 'bg-cyan-100 text-cyan-700 border-cyan-200',
        icon: FileText
    },
    'other': {
        label: 'Other',
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: Layers
    }
};

// Source configuration
const SOURCE_CONFIG = {
    'contact_form': { label: 'Contact Form', icon: FileText },
    'email': { label: 'Direct Email', icon: Mail },
    'phone': { label: 'Phone Call', icon: Phone },
    'social': { label: 'Social Media', icon: Globe },
    'referral': { label: 'Referral', icon: UserPlus }
};

// Mock contact inquiries data
const mockInquiries = [
    {
        id: 'INQ-2024-001',
        contact: {
            firstName: 'Kwame',
            lastName: 'Asante',
            email: 'kwame.asante@techvision.com.gh',
            phone: '+233 24 123 4567',
            company: 'TechVision Ltd',
            position: 'HR Manager'
        },
        type: 'training',
        subject: 'Corporate Training for 50 Employees',
        message: "Hello,\n\nWe are interested in enrolling 50 of our employees in your DevOps and Cloud Computing training programs.\n\nCould you please provide:\n1. Group pricing for corporate enrollments\n2. Flexible scheduling options\n3. On-site training possibilities\n\nWe're looking to start within the next 2 months.\n\nBest regards,\nKwame",
        status: 'new',
        priority: 'high',
        starred: true,
        source: 'contact_form',
        createdAt: '2024-12-19T14:30:00Z',
        lastUpdated: '2024-12-19T14:30:00Z',
        assignedTo: null,
        notes: []
    },
    {
        id: 'INQ-2024-002',
        contact: {
            firstName: 'Ama',
            lastName: 'Mensah',
            email: 'ama.mensah@gmail.com',
            phone: '+233 20 987 6543',
            company: null,
            position: null
        },
        type: 'general',
        subject: 'Question about Payment Plans',
        message: "Hi there,\n\nI'm interested in the Full Stack Web Development course but cannot afford to pay the full amount upfront.\n\nDo you offer any payment plans or installment options?\n\nThank you!",
        status: 'resolved',
        priority: 'medium',
        starred: false,
        source: 'contact_form',
        createdAt: '2024-12-18T10:15:00Z',
        lastUpdated: '2024-12-18T16:45:00Z',
        assignedTo: 'Sarah',
        notes: ['Sent payment plan options via email']
    },
    {
        id: 'INQ-2024-003',
        contact: {
            firstName: 'Dr. Emmanuel',
            lastName: 'Osei',
            email: 'emmanuel.osei@university.edu.gh',
            phone: '+233 27 888 9999',
            company: 'University of Ghana',
            position: 'Senior Lecturer'
        },
        type: 'partnership',
        subject: 'Academic Partnership Proposal',
        message: "Dear Zyra Tech Hub,\n\nI am reaching out on behalf of the Computer Science Department to explore partnership opportunities.\n\nWe would like to discuss:\n- Student internship programs\n- Guest lecture opportunities\n- Curriculum collaboration\n- Research partnerships\n\nPlease let me know a convenient time for a meeting.\n\nBest,\nDr. Osei",
        status: 'in_progress',
        priority: 'high',
        starred: true,
        source: 'email',
        createdAt: '2024-12-17T09:00:00Z',
        lastUpdated: '2024-12-18T11:30:00Z',
        assignedTo: 'Michael',
        notes: ['Initial call scheduled for Dec 20th', 'Preparing partnership proposal']
    },
    {
        id: 'INQ-2024-004',
        contact: {
            firstName: 'Kofi',
            lastName: 'Boateng',
            email: 'kofi.b@hotmail.com',
            phone: '+233 26 555 1234',
            company: null,
            position: 'Student'
        },
        type: 'careers',
        subject: 'Internship Application Status',
        message: "Good afternoon,\n\nI submitted my application for the Software Development Internship two weeks ago but haven't received any update.\n\nApplication Reference: INT-2024-089\n\nCould you please let me know the status?\n\nThanks,\nKofi",
        status: 'resolved',
        priority: 'low',
        starred: false,
        source: 'contact_form',
        createdAt: '2024-12-17T15:45:00Z',
        lastUpdated: '2024-12-17T18:20:00Z',
        assignedTo: 'HR Team',
        notes: ['Forwarded to internship coordinator', 'Application shortlisted']
    },
    {
        id: 'INQ-2024-005',
        contact: {
            firstName: 'Grace',
            lastName: 'Addo',
            email: 'grace.addo@financecorp.com',
            phone: '+233 55 333 4444',
            company: 'Finance Corp',
            position: 'IT Director'
        },
        type: 'quote',
        subject: 'Quote for Custom Training Program',
        message: "Hello,\n\nWe need a customized training program for our IT team covering:\n- Cloud Security\n- DevSecOps practices\n- Compliance & Governance\n\nTeam size: 25 people\nPreferred format: Hybrid (online + 2-day onsite workshop)\nTimeline: Q1 2025\n\nPlease provide a detailed quote.\n\nRegards,\nGrace Addo",
        status: 'in_progress',
        priority: 'high',
        starred: true,
        source: 'contact_form',
        createdAt: '2024-12-16T11:20:00Z',
        lastUpdated: '2024-12-18T09:15:00Z',
        assignedTo: 'Sales Team',
        notes: ['Quote being prepared', 'Follow-up call on Dec 19th']
    },
    {
        id: 'INQ-2024-006',
        contact: {
            firstName: 'Daniel',
            lastName: 'Mensah',
            email: 'spammer123@fake.com',
            phone: null,
            company: null,
            position: null
        },
        type: 'other',
        subject: 'FREE MONEY - CLICK HERE!!!',
        message: "Congratulations! You have won $1,000,000. Click the link below to claim your prize...",
        status: 'spam',
        priority: 'low',
        starred: false,
        source: 'contact_form',
        createdAt: '2024-12-16T03:45:00Z',
        lastUpdated: '2024-12-16T08:00:00Z',
        assignedTo: null,
        notes: ['Marked as spam', 'IP blocked']
    },
    {
        id: 'INQ-2024-007',
        contact: {
            firstName: 'Linda',
            lastName: 'Amponsah',
            email: 'linda.amp@startupxyz.com',
            phone: '+233 20 777 8888',
            company: 'StartupXYZ',
            position: 'CEO'
        },
        type: 'training',
        subject: 'Team Enrollment - Cloud Computing',
        message: "Hi,\n\nWe're a growing startup and need to upskill our development team.\n\nLooking to enroll 8 developers in:\n- Cloud Computing (AWS/Azure)\n- Docker & Kubernetes\n\nIs there a group discount available?\n\nThanks!",
        status: 'new',
        priority: 'medium',
        starred: false,
        source: 'contact_form',
        createdAt: '2024-12-15T14:00:00Z',
        lastUpdated: '2024-12-15T14:00:00Z',
        assignedTo: null,
        notes: []
    },
    {
        id: 'INQ-2024-008',
        contact: {
            firstName: 'Michael',
            lastName: 'Owusu',
            email: 'michael.o@techfirm.com',
            phone: '+233 24 999 0000',
            company: 'TechFirm Ghana',
            position: 'Recruitment Lead'
        },
        type: 'partnership',
        subject: 'Graduate Hiring Partner Program',
        message: "Dear Team,\n\nWe are expanding our development team and interested in your graduate placement program.\n\nWe're looking to hire:\n- 5 Junior Developers\n- 2 DevOps Engineers\n- 3 Data Analysts\n\nCan we discuss a hiring partnership?\n\nBest,\nMichael",
        status: 'resolved',
        priority: 'high',
        starred: true,
        source: 'email',
        createdAt: '2024-12-14T10:30:00Z',
        lastUpdated: '2024-12-16T14:00:00Z',
        assignedTo: 'Career Services',
        notes: ['Partnership agreement signed', 'First batch of candidates sent']
    },
    {
        id: 'INQ-2024-009',
        contact: {
            firstName: 'Abena',
            lastName: 'Yeboah',
            email: 'abena.y@student.com',
            phone: '+233 26 444 5555',
            company: null,
            position: 'Fresh Graduate'
        },
        type: 'support',
        subject: 'Cannot Access Course Materials',
        message: "Hello Support,\n\nI enrolled for the Data Science course and made payment yesterday, but I still can't access the course portal.\n\nEnrollment ID: ENR-2024-156\nPayment Ref: PAY-2024-789\n\nPlease help urgently.\n\nThanks,\nAbena",
        status: 'resolved',
        priority: 'high',
        starred: false,
        source: 'contact_form',
        createdAt: '2024-12-13T16:45:00Z',
        lastUpdated: '2024-12-13T18:30:00Z',
        assignedTo: 'Tech Support',
        notes: ['Account activated', 'Access confirmed with student']
    },
    {
        id: 'INQ-2024-010',
        contact: {
            firstName: 'Samuel',
            lastName: 'Adjei',
            email: 'samuel.a@outlook.com',
            phone: '+233 26 999 0000',
            company: null,
            position: null
        },
        type: 'general',
        subject: 'Visiting Your Office',
        message: "Hi,\n\nI would like to visit your office to learn more about your training programs.\n\nWhat are your office hours and location?\n\nThank you.",
        status: 'closed',
        priority: 'low',
        starred: false,
        source: 'phone',
        createdAt: '2024-12-12T09:15:00Z',
        lastUpdated: '2024-12-12T10:00:00Z',
        assignedTo: 'Reception',
        notes: ['Provided office address and hours', 'Visit scheduled for Dec 15th']
    }
];

// Format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
};

const formatFullDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Status badge component
const StatusBadge = ({ status }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG['new'];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${config.color}`}>
            <Icon size={10} />
            {config.label}
        </span>
    );
};

// Priority indicator
const PriorityDot = ({ priority }) => {
    const colors = {
        high: 'bg-red-500',
        medium: 'bg-amber-500',
        low: 'bg-green-500'
    };

    return (
        <span className={`w-2 h-2 rounded-full ${colors[priority]}`} title={`${priority} priority`} />
    );
};

const ContactInquiriesPage = () => {
    const dispatch = useDispatch();
    const { isSuperAdmin } = usePermissions();

    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewingInquiry, setViewingInquiry] = useState(null);
    const [selectedInquiries, setSelectedInquiries] = useState([]);

    const itemsPerPage = 10;

    // Filter inquiries
    const filteredInquiries = useMemo(() => {
        let result = [...mockInquiries];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(i =>
                i.id.toLowerCase().includes(query) ||
                `${i.contact.firstName} ${i.contact.lastName}`.toLowerCase().includes(query) ||
                i.contact.email.toLowerCase().includes(query) ||
                i.subject.toLowerCase().includes(query) ||
                i.message.toLowerCase().includes(query)
            );
        }

        // Status filter
        if (selectedStatus !== 'all') {
            if (selectedStatus === 'starred') {
                result = result.filter(i => i.starred);
            } else {
                result = result.filter(i => i.status === selectedStatus);
            }
        }

        // Type filter
        if (selectedType !== 'all') {
            result = result.filter(i => i.type === selectedType);
        }

        return result;
    }, [searchQuery, selectedStatus, selectedType]);

    // Pagination
    const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
    const paginatedInquiries = filteredInquiries.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => {
        return {
            total: mockInquiries.length,
            new: mockInquiries.filter(i => i.status === 'new').length,
            inProgress: mockInquiries.filter(i => i.status === 'in_progress').length,
            resolved: mockInquiries.filter(i => i.status === 'resolved').length,
            closed: mockInquiries.filter(i => i.status === 'closed').length,
            spam: mockInquiries.filter(i => i.status === 'spam').length,
            highPriority: mockInquiries.filter(i => i.priority === 'high' && i.status !== 'resolved' && i.status !== 'closed').length
        };
    }, []);

    // Handlers
    const handleView = (inquiry) => {
        setViewingInquiry(inquiry);
    };

    const handleToggleStar = (inquiry) => {
        console.log('Toggle star:', inquiry.id);
    };

    const handleUpdateStatus = (inquiry, newStatus) => {
        console.log('Update status:', inquiry.id, newStatus);
    };

    const handleReply = (inquiry) => {
        window.location.href = `mailto:${inquiry.contact.email}?subject=Re: ${inquiry.subject}`;
    };

    const handleDelete = (inquiry) => {
        dispatch(openConfirmDialog({
            title: 'Delete Inquiry',
            message: `Are you sure you want to permanently delete this inquiry from "${inquiry.contact.firstName} ${inquiry.contact.lastName}"? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: () => {
                console.log('Deleting inquiry:', inquiry.id);
            }
        }));
    };

    const handleMarkAsSpam = (inquiry) => {
        dispatch(openConfirmDialog({
            title: 'Mark as Spam',
            message: `Are you sure you want to mark this inquiry as spam?`,
            isDangerous: true,
            onConfirm: () => {
                console.log('Marking as spam:', inquiry.id);
            }
        }));
    };

    const handleExport = () => {
        console.log('Exporting inquiries...');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
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
                            <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                <Contact className="text-white" size={22} />
                            </div>
                            Contact Inquiries
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Manage and respond to contact form submissions
                        </p>
                    </div>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm font-medium text-sm"
                    >
                        <Download size={16} />
                        Export
                    </button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('all'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                <Inbox className="text-blue-600" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Total Inquiries</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('new'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-cyan-50 rounded-lg flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                                <Mail className="text-cyan-600" size={18} />
                            </div>
                            {stats.new > 0 && (
                                <span className="text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded-full animate-pulse">
                                    {stats.new}
                                </span>
                            )}
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
                        <p className="text-xs text-gray-500 mt-0.5">New</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('in_progress'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                                <Clock className="text-amber-600" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                        <p className="text-xs text-gray-500 mt-0.5">In Progress</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('resolved'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                <CheckCircle className="text-green-600" size={18} />
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Done</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Resolved</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('closed'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                                <Archive className="text-gray-600" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.closed}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Closed</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('spam'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                <AlertCircle className="text-red-600" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.spam}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Spam</p>
                    </div>

                    <div className="bg-gradient-to-br from-red-500 to-rose-500 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                                <AlertCircle className="text-white" size={18} />
                            </div>
                            <span className="text-xs font-medium text-white/90 bg-white/20 px-2 py-0.5 rounded-full">Urgent</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{stats.highPriority}</p>
                        <p className="text-xs text-red-100 mt-0.5">High Priority</p>
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
                                placeholder="Search by name, email, subject, or message..."
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
                                <option value="new">New</option>
                                <option value="in_progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                                <option value="spam">Spam</option>
                                <option value="starred">⭐ Starred</option>
                            </select>
                        </div>

                        {/* Type Filter */}
                        <select
                            value={selectedType}
                            onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                            className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[160px]"
                        >
                            <option value="all">All Types</option>
                            {Object.entries(TYPE_CONFIG).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
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

                {/* Inquiries Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-4 py-3 w-10"></th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedInquiries.map((inquiry) => {
                                    const typeConfig = TYPE_CONFIG[inquiry.type];
                                    const TypeIcon = typeConfig.icon;
                                    const sourceConfig = SOURCE_CONFIG[inquiry.source];
                                    const isNew = inquiry.status === 'new';

                                    return (
                                        <tr
                                            key={inquiry.id}
                                            className={`hover:bg-gray-50 transition-colors cursor-pointer ${isNew ? 'bg-blue-50/30' : ''}`}
                                            onClick={() => handleView(inquiry)}
                                        >
                                            <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex items-center gap-2">
                                                    <PriorityDot priority={inquiry.priority} />
                                                    <button
                                                        onClick={() => handleToggleStar(inquiry)}
                                                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                                                    >
                                                        <Star
                                                            size={14}
                                                            className={inquiry.starred ? 'text-amber-500 fill-amber-500' : 'text-gray-300 hover:text-amber-400'}
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-xs font-bold shrink-0">
                                                        {inquiry.contact.firstName[0]}{inquiry.contact.lastName[0]}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className={`font-semibold text-gray-900 text-sm truncate ${isNew ? 'font-bold' : ''}`}>
                                                            {inquiry.contact.firstName} {inquiry.contact.lastName}
                                                        </p>
                                                        <p className="text-xs text-gray-400 truncate">{inquiry.contact.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="max-w-xs">
                                                    <p className={`text-sm text-gray-800 truncate ${isNew ? 'font-medium' : ''}`}>
                                                        {inquiry.subject}
                                                    </p>
                                                    {inquiry.contact.company && (
                                                        <p className="text-xs text-gray-400 truncate flex items-center gap-1 mt-0.5">
                                                            <Building size={10} />
                                                            {inquiry.contact.company}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ${typeConfig.color}`}>
                                                    <TypeIcon size={10} />
                                                    {typeConfig.label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <StatusBadge status={inquiry.status} />
                                            </td>
                                            <td className="px-4 py-4">
                                                <div>
                                                    <p className="text-sm text-gray-600">{formatDate(inquiry.createdAt)}</p>
                                                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                                        {React.createElement(sourceConfig.icon, { size: 10 })}
                                                        {sourceConfig.label}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => handleView(inquiry)}
                                                        className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="View"
                                                    >
                                                        <Eye size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReply(inquiry)}
                                                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                        title="Reply"
                                                    >
                                                        <Reply size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(inquiry)}
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

                    {/* Empty State */}
                    {filteredInquiries.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Contact className="text-gray-400" size={28} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No inquiries found</h3>
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
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredInquiries.length)}</span> of{' '}
                            <span className="font-semibold text-gray-900">{filteredInquiries.length}</span> inquiries
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

            {/* View Inquiry Modal */}
            {viewingInquiry && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-gradient-to-r from-[#004fa2] to-[#0066cc] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Contact className="text-white" size={22} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Inquiry Details</h2>
                                    <p className="text-blue-100 text-xs font-mono">{viewingInquiry.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleToggleStar(viewingInquiry)}
                                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <Star size={18} className={viewingInquiry.starred ? 'fill-amber-400 text-amber-400' : ''} />
                                </button>
                                <button
                                    onClick={() => setViewingInquiry(null)}
                                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                            <div className="space-y-5">
                                {/* Status & Type Row */}
                                <div className="flex items-center flex-wrap gap-2">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border ${TYPE_CONFIG[viewingInquiry.type].color}`}>
                                        {React.createElement(TYPE_CONFIG[viewingInquiry.type].icon, { size: 12 })}
                                        {TYPE_CONFIG[viewingInquiry.type].label}
                                    </span>
                                    <StatusBadge status={viewingInquiry.status} />
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${viewingInquiry.priority === 'high' ? 'bg-red-100 text-red-700' :
                                            viewingInquiry.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                                                'bg-green-100 text-green-700'
                                        }`}>
                                        {viewingInquiry.priority.toUpperCase()} Priority
                                    </span>
                                </div>

                                {/* Subject */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{viewingInquiry.subject}</h3>
                                </div>

                                {/* Contact Info */}
                                <div className="bg-gray-50 rounded-xl p-5">
                                    <h4 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                                        <User size={14} />
                                        Contact Information
                                    </h4>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-lg font-bold">
                                            {viewingInquiry.contact.firstName[0]}{viewingInquiry.contact.lastName[0]}
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-gray-900">
                                                {viewingInquiry.contact.firstName} {viewingInquiry.contact.lastName}
                                            </p>
                                            {viewingInquiry.contact.position && (
                                                <p className="text-sm text-gray-500">{viewingInquiry.contact.position}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Mail className="text-gray-400" size={14} />
                                            <a href={`mailto:${viewingInquiry.contact.email}`} className="text-[#004fa2] hover:underline">
                                                {viewingInquiry.contact.email}
                                            </a>
                                            <button onClick={() => copyToClipboard(viewingInquiry.contact.email)} className="p-1 hover:bg-gray-200 rounded">
                                                <Copy size={12} className="text-gray-400" />
                                            </button>
                                        </div>
                                        {viewingInquiry.contact.phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="text-gray-400" size={14} />
                                                <span className="text-gray-600">{viewingInquiry.contact.phone}</span>
                                            </div>
                                        )}
                                        {viewingInquiry.contact.company && (
                                            <div className="flex items-center gap-2 col-span-2">
                                                <Building className="text-gray-400" size={14} />
                                                <span className="text-gray-600">{viewingInquiry.contact.company}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div className="bg-white border border-gray-200 rounded-xl p-5">
                                    <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {formatFullDate(viewingInquiry.createdAt)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            {React.createElement(SOURCE_CONFIG[viewingInquiry.source].icon, { size: 12 })}
                                            via {SOURCE_CONFIG[viewingInquiry.source].label}
                                        </span>
                                    </div>
                                    <div className="prose prose-sm max-w-none">
                                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                            {viewingInquiry.message}
                                        </p>
                                    </div>
                                </div>

                                {/* Notes */}
                                {viewingInquiry.notes.length > 0 && (
                                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                                        <h4 className="text-sm font-semibold text-amber-800 mb-2">Internal Notes</h4>
                                        <ul className="space-y-1">
                                            {viewingInquiry.notes.map((note, idx) => (
                                                <li key={idx} className="text-sm text-amber-700 flex items-start gap-2">
                                                    <span className="text-amber-400 mt-1">•</span>
                                                    {note}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Assigned To */}
                                {viewingInquiry.assignedTo && (
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <User size={14} />
                                        Assigned to: <span className="font-semibold text-gray-700">{viewingInquiry.assignedTo}</span>
                                    </div>
                                )}

                                {/* Update Status */}
                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="text-sm font-semibold text-gray-500 mb-2">Update Status</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(STATUS_CONFIG).filter(([key]) => key !== 'spam').map(([key, config]) => (
                                            <button
                                                key={key}
                                                onClick={() => handleUpdateStatus(viewingInquiry, key)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${viewingInquiry.status === key
                                                        ? config.color
                                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {config.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleMarkAsSpam(viewingInquiry)}
                                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <AlertCircle size={14} />
                                    Mark as Spam
                                </button>
                                <button
                                    onClick={() => handleDelete(viewingInquiry)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewingInquiry(null)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => handleReply(viewingInquiry)}
                                    className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <Reply size={14} />
                                    Reply via Email
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default ContactInquiriesPage;
