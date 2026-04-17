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
            <div className="space-y-3 md:space-y-6 pb-8">
                {/* Page Header & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg shrink-0 text-blue-600">
                            <Contact size={18} />
                        </div>
                        <div>
                            <h1 className="text-[11px] md:text-base font-bold text-gray-900 leading-tight">Contact Inquiries</h1>
                            <p className="text-[10px] text-gray-500">Manage and respond to contact form submissions</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center w-full md:w-auto">
                        <button onClick={handleExport} className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-all shadow-sm text-[11px] font-semibold">
                            <Download size={14} /> Export
                        </button>
                    </div>
                </div>

                {/* Quick Status Bar */}
                <div className="flex flex-wrap text-[11px] gap-2 mb-4">
                    {[
                        { label: 'All', id: 'all', count: stats.total, active: selectedStatus === 'all' },
                        { label: 'New', id: 'new', count: stats.new, active: selectedStatus === 'new', highlight: true },
                        { label: 'In Progress', id: 'in_progress', count: stats.inProgress, active: selectedStatus === 'in_progress' },
                        { label: 'Resolved', id: 'resolved', count: stats.resolved, active: selectedStatus === 'resolved' },
                        { label: 'Closed', id: 'closed', count: stats.closed, active: selectedStatus === 'closed' },
                        { label: 'Spam', id: 'spam', count: stats.spam, active: selectedStatus === 'spam' },
                        { label: 'Starred', id: 'starred', count: mockInquiries.filter(i => i.starred).length, active: selectedStatus === 'starred', isStar: true }
                    ].map(st => (
                        <button
                            key={st.id}
                            onClick={() => { setSelectedStatus(st.id); setCurrentPage(1); }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${st.active ? 'bg-[#004fa2] text-white border-[#004fa2]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                        >
                            {st.isStar && <Star size={10} className={st.active ? "text-white" : "text-amber-500 fill-amber-500"} />}
                            {st.label} 
                            <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${
                                st.highlight && !st.active ? 'bg-red-500 text-white animate-pulse' : 
                                st.active ? 'bg-white/20' : 'bg-gray-100'
                            }`}>{st.count}</span>
                        </button>
                    ))}
                    
                    <div className="flex items-center gap-3 ml-auto px-2 opacity-80 text-[10px] font-bold uppercase tracking-wider text-gray-500 hidden sm:flex">
                        <span className="flex items-center gap-1 text-red-500 bg-red-50 px-1.5 rounded-md"><AlertCircle size={10}/> {stats.highPriority} Urgent</span>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-2 mb-4">
                    <div className="col-span-2 md:col-span-6 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search by name, email, subject, or message..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all"
                        />
                    </div>
                    
                    <div className="col-span-1 md:col-span-3 relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                            className="w-full px-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
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

                    <div className="col-span-1 md:col-span-3 relative flex gap-2">
                        <select
                            value={selectedType}
                            onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                            className="w-full px-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                        >
                            <option value="all">All Categories</option>
                            {Object.entries(TYPE_CONFIG).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                            ))}
                        </select>
                        {(searchQuery || selectedStatus !== 'all' || selectedType !== 'all') && (
                            <button onClick={resetFilters} className="bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 h-[34px] px-3 rounded-xl transition-colors shadow-sm flex items-center justify-center shrink-0">
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Inquiries List Grid */}
                <div className="flex flex-col gap-2">
                    {paginatedInquiries.map((inquiry) => {
                        const typeConfig = TYPE_CONFIG[inquiry.type];
                        const TypeIcon = typeConfig.icon;
                        const sourceConfig = SOURCE_CONFIG[inquiry.source];
                        const isNew = inquiry.status === 'new';
                        const isHighPriority = inquiry.priority === 'high';

                        return (
                            <div key={inquiry.id} onClick={() => handleView(inquiry)} className={`bg-white rounded-xl shadow-sm border ${isNew ? 'border-[#004fa2]/30 bg-blue-50/10' : 'border-gray-100'} flex flex-col xl:flex-row p-3 gap-3 hover:border-[#004fa2] transition-colors cursor-pointer relative overflow-hidden group`}>
                                {/* Left Indicator */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${isNew ? 'bg-blue-500' : (STATUS_CONFIG[inquiry.status]?.dotColor || 'bg-gray-300')}`}></div>
                                
                                {/* Identity Layout */}
                                <div className="flex items-start gap-3 w-full xl:w-4/12">
                                    <div className="flex flex-col items-center gap-1.5 shrink-0 mt-0.5">
                                        <button onClick={(e) => { e.stopPropagation(); handleToggleStar(inquiry); }} className="p-0.5 hover:bg-gray-100 rounded transition-colors">
                                            <Star size={12} className={inquiry.starred ? 'text-amber-500 fill-amber-500' : 'text-gray-300 hover:text-amber-400'} />
                                        </button>
                                        <PriorityDot priority={inquiry.priority} />
                                    </div>
                                    <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-[10px] font-bold shadow-sm shrink-0">
                                        {inquiry.contact.firstName[0]}{inquiry.contact.lastName[0]}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-1 mb-0.5">
                                            <h3 className={`text-xs text-gray-900 truncate ${isNew ? 'font-bold' : 'font-semibold'}`}>
                                                {inquiry.contact.firstName} {inquiry.contact.lastName}
                                            </h3>
                                        </div>
                                        <p className="text-[10px] text-gray-500 truncate mb-1.5 flex items-center gap-1">
                                            <Mail size={8}/> {inquiry.contact.email}
                                        </p>
                                        <div className="flex items-center flex-wrap gap-1.5 mt-auto">
                                            <StatusBadge status={inquiry.status} />
                                            {isHighPriority && <span className="text-[9px] bg-red-100 text-red-600 px-1 rounded font-bold uppercase tracking-wide">Urgent</span>}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Content Layout */}
                                <div className="hidden xl:block w-px bg-gray-100 my-1 mx-2"></div>
                                <div className="flex-1 flex flex-col justify-center min-w-0">
                                    <h4 className={`text-[11px] truncate pr-4 ${isNew ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                                        {inquiry.subject}
                                    </h4>
                                    <p className="text-[10px] text-gray-500 line-clamp-1 pr-4 mt-0.5 mb-1.5">{inquiry.message.replace(/\n/g, ' ')}</p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold border ${typeConfig.color}`}>
                                            <TypeIcon size={8} /> {typeConfig.label}
                                        </span>
                                        <span className="flex items-center gap-1 text-[9px] font-mono text-gray-500 bg-gray-50 px-1.5 rounded"><Calendar size={8}/> {formatDate(inquiry.createdAt)}</span>
                                        <span className="flex items-center gap-1 text-[9px] font-mono text-gray-500 bg-gray-50 px-1.5 rounded">{React.createElement(sourceConfig.icon, { size: 8 })} via {sourceConfig.label}</span>
                                    </div>
                                </div>

                                {/* Actions Container */}
                                <div className="flex items-center justify-end gap-1 shrink-0 border-t xl:border-t-0 xl:border-l xl:pl-3 pt-2 xl:pt-0 border-gray-50 ml-auto xl:w-min">
                                    <button onClick={(e) => { e.stopPropagation(); handleView(inquiry); }} className="p-1.5 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"><Eye size={14} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); handleReply(inquiry); }} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"><Reply size={14} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(inquiry); }} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredInquiries.length === 0 && (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Contact className="text-gray-400" size={36} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No inquiries found</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            {searchQuery || selectedStatus !== 'all' || selectedType !== 'all'
                                ? "No inquiries match your current filters. Try adjusting your search criteria."
                                : "You have no new messages."}
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
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {filteredInquiries.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100 gap-3 mt-4">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                            Showing <span className="text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="text-gray-900">{Math.min(currentPage * itemsPerPage, filteredInquiries.length)}</span> of{' '}
                            <span className="text-gray-900">{filteredInquiries.length}</span>
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

            {/* View Inquiry Modal */}
            {viewingInquiry && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] md:max-h-[85vh] flex flex-col overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-4 py-3 bg-gradient-to-r from-[#004fa2] to-[#0066cc] flex items-center justify-between">
                            <div className="flex items-center gap-2 md:gap-3 min-w-0">
                                <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Contact className="text-white" size={18} />
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-[11px] md:text-base font-bold text-white truncate">Inquiry Details</h2>
                                    <p className="text-blue-100 text-[10px] font-mono truncate">{viewingInquiry.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 md:gap-2 shrink-0">
                                <button
                                    onClick={() => handleToggleStar(viewingInquiry)}
                                    className="p-1.5 md:p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <Star size={16} className={viewingInquiry.starred ? 'fill-amber-400 text-amber-400' : ''} />
                                </button>
                                <button
                                    onClick={() => setViewingInquiry(null)}
                                    className="p-1.5 md:p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-2 md:p-4 lg:p-5 lg:p-6 overflow-y-auto max-h-[calc(90vh-140px)] md:max-h-[calc(85vh-140px)] custom-scrollbar">
                            <div className="space-y-4 md:space-y-5">
                                {/* Status & Type Row */}
                                <div className="flex items-center flex-wrap gap-2">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${TYPE_CONFIG[viewingInquiry.type].color}`}>
                                        {React.createElement(TYPE_CONFIG[viewingInquiry.type].icon, { size: 10 })}
                                        {TYPE_CONFIG[viewingInquiry.type].label}
                                    </span>
                                    <StatusBadge status={viewingInquiry.status} />
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${viewingInquiry.priority === 'high' ? 'bg-red-100 text-red-700' :
                                        viewingInquiry.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                                            'bg-green-100 text-green-700'
                                        }`}>
                                        {viewingInquiry.priority} PRIORITY
                                    </span>
                                </div>

                                {/* Subject */}
                                <div>
                                    <h3 className="text-[11px] md:text-base font-bold text-gray-900">{viewingInquiry.subject}</h3>
                                </div>

                                {/* Contact Info */}
                                <div className="bg-gray-50 rounded-xl p-2 md:p-4">
                                    <h4 className="text-[11px] font-bold text-gray-500 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                                        <User size={12} />
                                        Contact Information
                                    </h4>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-xs font-bold shrink-0">
                                            {viewingInquiry.contact.firstName[0]}{viewingInquiry.contact.lastName[0]}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs md:text-sm font-bold text-gray-900 truncate">
                                                {viewingInquiry.contact.firstName} {viewingInquiry.contact.lastName}
                                            </p>
                                            {viewingInquiry.contact.position && (
                                                <p className="text-[10px] text-gray-500 truncate">{viewingInquiry.contact.position}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                                        <div className="flex items-center gap-1.5 truncate">
                                            <Mail className="text-gray-400 shrink-0" size={12} />
                                            <a href={`mailto:${viewingInquiry.contact.email}`} className="text-[#004fa2] hover:underline truncate">
                                                {viewingInquiry.contact.email}
                                            </a>
                                            <button onClick={() => copyToClipboard(viewingInquiry.contact.email)} className="p-1 hover:bg-gray-200 rounded shrink-0">
                                                <Copy size={10} className="text-gray-400" />
                                            </button>
                                        </div>
                                        {viewingInquiry.contact.phone && (
                                            <div className="flex items-center gap-1.5 truncate">
                                                <Phone className="text-gray-400 shrink-0" size={12} />
                                                <span className="text-gray-600 truncate">{viewingInquiry.contact.phone}</span>
                                            </div>
                                        )}
                                        {viewingInquiry.contact.company && (
                                            <div className="flex items-center gap-1.5 col-span-1 sm:col-span-2 truncate">
                                                <Building className="text-gray-400 shrink-0" size={12} />
                                                <span className="text-gray-600 truncate">{viewingInquiry.contact.company}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div className="bg-white border border-gray-100 rounded-xl p-2 md:p-4 shadow-sm">
                                    <div className="flex flex-wrap items-center justify-between mb-3 text-[10px] text-gray-400 gap-2">
                                        <span className="flex items-center gap-1 font-mono bg-gray-50 px-1.5 py-0.5 rounded">
                                            <Calendar size={10} />
                                            {formatFullDate(viewingInquiry.createdAt)}
                                        </span>
                                        <span className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded">
                                            {React.createElement(SOURCE_CONFIG[viewingInquiry.source].icon, { size: 10 })}
                                            via {SOURCE_CONFIG[viewingInquiry.source].label}
                                        </span>
                                    </div>
                                    <div className="prose prose-sm max-w-none">
                                        <p className="text-[11px] text-gray-700 whitespace-pre-wrap leading-relaxed font-medium">
                                            {viewingInquiry.message}
                                        </p>
                                    </div>
                                </div>

                                {/* Notes */}
                                {viewingInquiry.notes.length > 0 && (
                                    <div className="bg-amber-50 rounded-xl p-2 md:p-4 border border-amber-100">
                                        <h4 className="text-[11px] font-bold text-amber-800 mb-1.5 uppercase tracking-wider">Internal Notes</h4>
                                        <ul className="space-y-1">
                                            {viewingInquiry.notes.map((note, idx) => (
                                                <li key={idx} className="text-[10px] text-amber-700 flex items-start gap-1.5">
                                                    <span className="text-amber-400 mt-0.5">•</span>
                                                    {note}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Assigned To */}
                                {viewingInquiry.assignedTo && (
                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 bg-gray-50 p-2 rounded-lg">
                                        <User size={12} />
                                        Assigned to: <span className="font-bold text-gray-700">{viewingInquiry.assignedTo}</span>
                                    </div>
                                )}

                                {/* Update Status */}
                                <div className="border-t border-gray-100 pt-3">
                                    <h4 className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">Update Status</h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {Object.entries(STATUS_CONFIG).filter(([key]) => key !== 'spam').map(([key, config]) => (
                                            <button
                                                key={key}
                                                onClick={() => handleUpdateStatus(viewingInquiry, key)}
                                                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${viewingInquiry.status === key
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
                        <div className="px-4 py-3 border-t border-gray-100 flex flex-wrap items-center justify-between bg-gray-50 gap-2">
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => handleMarkAsSpam(viewingInquiry)}
                                    className="px-2.5 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-semibold text-[10px] flex items-center gap-1"
                                >
                                    <AlertCircle size={12} />
                                    Spam
                                </button>
                                <button
                                    onClick={() => handleDelete(viewingInquiry)}
                                    className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-semibold text-[10px] flex items-center gap-1"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>
                            <div className="flex items-center gap-1.5 ml-auto">
                                <button
                                    onClick={() => setViewingInquiry(null)}
                                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-semibold text-[10px]"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => handleReply(viewingInquiry)}
                                    className="px-3 py-1.5 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-semibold text-[10px] flex items-center gap-1"
                                >
                                    <Reply size={12} />
                                    Reply
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
