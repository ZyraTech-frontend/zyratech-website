/**
 * Messages Management Page (Admin)
 * Professional admin interface for managing contact form submissions and inquiries
 */

import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import {
    MessageSquare,
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
    MoreVertical,
    Check,
    Inbox,
    StarOff,
    ArchiveRestore
} from 'lucide-react';

// Message status configuration
const STATUS_CONFIG = {
    'unread': {
        label: 'Unread',
        color: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
        icon: Mail,
        dotColor: 'bg-blue-500'
    },
    'read': {
        label: 'Read',
        color: 'bg-gray-100 text-gray-600 border border-gray-200',
        icon: MailOpen,
        dotColor: 'bg-gray-400'
    },
    'replied': {
        label: 'Replied',
        color: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
        icon: Reply,
        dotColor: 'bg-green-500'
    },
    'archived': {
        label: 'Archived',
        color: 'bg-gradient-to-r from-purple-500 to-violet-500 text-white',
        icon: Archive,
        dotColor: 'bg-purple-500'
    }
};

// Message category/type configuration
const CATEGORY_CONFIG = {
    'general': {
        label: 'General Inquiry',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: HelpCircle
    },
    'training': {
        label: 'Training',
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: GraduationCap
    },
    'partnership': {
        label: 'Partnership',
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        icon: Building
    },
    'careers': {
        label: 'Careers',
        color: 'bg-amber-100 text-amber-700 border-amber-200',
        icon: Briefcase
    },
    'support': {
        label: 'Support',
        color: 'bg-red-100 text-red-700 border-red-200',
        icon: MessageCircle
    },
    'feedback': {
        label: 'Feedback',
        color: 'bg-cyan-100 text-cyan-700 border-cyan-200',
        icon: Star
    }
};

// Priority configuration
const PRIORITY_CONFIG = {
    'high': { label: 'High', color: 'text-red-600 bg-red-50' },
    'medium': { label: 'Medium', color: 'text-amber-600 bg-amber-50' },
    'low': { label: 'Low', color: 'text-green-600 bg-green-50' }
};

// Mock messages data
const mockMessages = [
    {
        id: 'MSG-2024-001',
        sender: {
            name: 'Kwame Asante',
            email: 'kwame.asante@example.com',
            phone: '+233 24 123 4567',
            company: 'TechVision Ltd'
        },
        subject: 'Partnership Opportunity - Corporate Training',
        message: "Hello Zyra Tech Hub team,\n\nWe are interested in establishing a partnership for corporate training programs. Our company has about 50 employees who need upskilling in cloud computing and DevOps.\n\nCould you please provide more information about your corporate training packages and pricing?\n\nBest regards,\nKwame",
        category: 'partnership',
        priority: 'high',
        status: 'unread',
        starred: true,
        date: '2024-12-19T14:30:00Z',
        source: 'Contact Form'
    },
    {
        id: 'MSG-2024-002',
        sender: {
            name: 'Ama Mensah',
            email: 'ama.mensah@gmail.com',
            phone: '+233 20 987 6543',
            company: null
        },
        subject: 'Question about Web Development Bootcamp',
        message: "Hi,\n\nI'm interested in enrolling for the Full Stack Web Development course. I have a few questions:\n\n1. Do I need any prior programming experience?\n2. What is the class schedule like?\n3. Is there an installment payment option?\n\nThank you!",
        category: 'training',
        priority: 'medium',
        status: 'replied',
        starred: false,
        date: '2024-12-18T10:15:00Z',
        source: 'Website Chat'
    },
    {
        id: 'MSG-2024-003',
        sender: {
            name: 'Kofi Boateng',
            email: 'kofi.b@hotmail.com',
            phone: '+233 26 555 1234',
            company: null
        },
        subject: 'Application Status for Internship',
        message: "Good afternoon,\n\nI submitted my application for the Software Development Internship last week but haven't received any update. Could you please let me know the status of my application?\n\nApplication ID: INT-2024-089\n\nThanks,\nKofi",
        category: 'careers',
        priority: 'medium',
        status: 'read',
        starred: false,
        date: '2024-12-17T15:45:00Z',
        source: 'Contact Form'
    },
    {
        id: 'MSG-2024-004',
        sender: {
            name: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@university.edu.gh',
            phone: '+233 27 888 9999',
            company: 'University of Ghana'
        },
        subject: 'Academic Partnership Proposal',
        message: "Dear Zyra Tech Hub,\n\nI am reaching out on behalf of the Computer Science Department at the University of Ghana. We would like to explore potential collaboration opportunities for student internships and guest lectures.\n\nWould it be possible to schedule a meeting to discuss this further?\n\nBest regards,\nDr. Sarah Johnson\nHead of Department",
        category: 'partnership',
        priority: 'high',
        status: 'unread',
        starred: true,
        date: '2024-12-17T09:00:00Z',
        source: 'Email'
    },
    {
        id: 'MSG-2024-005',
        sender: {
            name: 'Emmanuel Osei',
            email: 'emmanuel.o@yahoo.com',
            phone: '+233 23 111 2222',
            company: null
        },
        subject: 'Great Experience with DevOps Course! ⭐',
        message: "Hello team,\n\nI just completed the DevOps Engineering course and wanted to share my appreciation. The instructors were knowledgeable, the hands-on labs were excellent, and I've already started applying what I learned at my workplace.\n\nKeep up the amazing work!\n\nBest,\nEmmanuel",
        category: 'feedback',
        priority: 'low',
        status: 'replied',
        starred: true,
        date: '2024-12-16T16:30:00Z',
        source: 'Contact Form'
    },
    {
        id: 'MSG-2024-006',
        sender: {
            name: 'Grace Addo',
            email: 'grace.addo@company.com',
            phone: '+233 55 333 4444',
            company: 'Finance Corp'
        },
        subject: 'Issue with Course Access',
        message: "Hi Support,\n\nI enrolled for the Data Science course yesterday and made payment, but I still cannot access the course materials on the portal. My enrollment ID is ENR-2024-156.\n\nPlease help resolve this urgently as the course starts tomorrow.\n\nRegards,\nGrace",
        category: 'support',
        priority: 'high',
        status: 'read',
        starred: false,
        date: '2024-12-16T11:20:00Z',
        source: 'Support Ticket'
    },
    {
        id: 'MSG-2024-007',
        sender: {
            name: 'Daniel Mensah',
            email: 'daniel.m@outlook.com',
            phone: '+233 50 666 7777',
            company: null
        },
        subject: 'Scholarship Information Request',
        message: "Good day,\n\nI am a recent graduate interested in your training programs but facing financial constraints. Do you offer any scholarship opportunities or payment plans for students?\n\nThank you for your time.",
        category: 'general',
        priority: 'medium',
        status: 'unread',
        starred: false,
        date: '2024-12-15T08:45:00Z',
        source: 'Contact Form'
    },
    {
        id: 'MSG-2024-008',
        sender: {
            name: 'Linda Amponsah',
            email: 'linda.amp@gmail.com',
            phone: '+233 20 777 8888',
            company: 'StartupXYZ'
        },
        subject: 'Bulk Enrollment for Team',
        message: "Hello,\n\nWe're a startup looking to enroll 5 team members in the Cloud Computing course. Is there a group discount available?\n\nAlso, can the schedule be adjusted to fit our work hours?\n\nThanks!",
        category: 'training',
        priority: 'medium',
        status: 'archived',
        starred: false,
        date: '2024-12-14T14:00:00Z',
        source: 'Contact Form'
    },
    {
        id: 'MSG-2024-009',
        sender: {
            name: 'Michael Owusu',
            email: 'michael.o@techfirm.com',
            phone: '+233 24 999 0000',
            company: 'TechFirm Ghana'
        },
        subject: 'Hiring from Your Graduates',
        message: "Dear Zyra Tech Hub,\n\nOur company is expanding and we're looking to hire junior developers. We've heard great things about your training programs.\n\nDo you have a job placement or graduate referral program we could tap into?\n\nBest regards,\nMichael Owusu\nHR Manager",
        category: 'partnership',
        priority: 'high',
        status: 'replied',
        starred: true,
        date: '2024-12-13T10:30:00Z',
        source: 'Email'
    },
    {
        id: 'MSG-2024-010',
        sender: {
            name: 'Abena Yeboah',
            email: 'abena.y@student.com',
            phone: '+233 26 444 5555',
            company: null
        },
        subject: 'Certificate Verification Request',
        message: "Good morning,\n\nI completed the Full Stack Web Development course in October 2024. My prospective employer is requesting verification of my certificate.\n\nCertificate Number: CERT-WD-2024-078\n\nPlease advise on the verification process.\n\nThank you,\nAbena",
        category: 'support',
        priority: 'low',
        status: 'read',
        starred: false,
        date: '2024-12-12T09:15:00Z',
        source: 'Contact Form'
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
    const config = STATUS_CONFIG[status] || STATUS_CONFIG['read'];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${config.color}`}>
            <Icon size={10} />
            {config.label}
        </span>
    );
};

const MessagesManagementPage = () => {
    const dispatch = useDispatch();
    const { isSuperAdmin } = usePermissions();

    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewingMessage, setViewingMessage] = useState(null);
    const [selectedMessages, setSelectedMessages] = useState([]);

    const itemsPerPage = 10;

    // Filter messages
    const filteredMessages = useMemo(() => {
        let result = [...mockMessages];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(m =>
                m.id.toLowerCase().includes(query) ||
                m.sender.name.toLowerCase().includes(query) ||
                m.sender.email.toLowerCase().includes(query) ||
                m.subject.toLowerCase().includes(query) ||
                m.message.toLowerCase().includes(query)
            );
        }

        // Status filter
        if (selectedStatus !== 'all') {
            if (selectedStatus === 'starred') {
                result = result.filter(m => m.starred);
            } else {
                result = result.filter(m => m.status === selectedStatus);
            }
        }

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(m => m.category === selectedCategory);
        }

        return result;
    }, [searchQuery, selectedStatus, selectedCategory]);

    // Pagination
    const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
    const paginatedMessages = filteredMessages.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => {
        return {
            total: mockMessages.length,
            unread: mockMessages.filter(m => m.status === 'unread').length,
            read: mockMessages.filter(m => m.status === 'read').length,
            replied: mockMessages.filter(m => m.status === 'replied').length,
            archived: mockMessages.filter(m => m.status === 'archived').length,
            starred: mockMessages.filter(m => m.starred).length,
            highPriority: mockMessages.filter(m => m.priority === 'high').length
        };
    }, []);

    // Handlers
    const handleView = (message) => {
        setViewingMessage(message);
    };

    const handleMarkAsRead = (message) => {
        console.log('Marking as read:', message.id);
    };

    const handleToggleStar = (message) => {
        console.log('Toggle star:', message.id);
    };

    const handleArchive = (message) => {
        dispatch(openConfirmDialog({
            title: 'Archive Message',
            message: `Are you sure you want to archive this message from "${message.sender.name}"?`,
            isDangerous: false,
            onConfirm: () => {
                console.log('Archiving message:', message.id);
            }
        }));
    };

    const handleDelete = (message) => {
        dispatch(openConfirmDialog({
            title: 'Delete Message',
            message: `Are you sure you want to permanently delete this message from "${message.sender.name}"? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: () => {
                console.log('Deleting message:', message.id);
            }
        }));
    };

    const handleReply = (message) => {
        window.location.href = `mailto:${message.sender.email}?subject=Re: ${message.subject}`;
    };

    const handleExport = () => {
        console.log('Exporting messages...');
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedStatus('all');
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
                                <MessageSquare className="text-white" size={22} />
                            </div>
                            Messages & Inquiries
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Manage contact form submissions and customer inquiries
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
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">All</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Total Messages</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('unread'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-cyan-50 rounded-lg flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                                <Mail className="text-cyan-600" size={18} />
                            </div>
                            {stats.unread > 0 && (
                                <span className="text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded-full animate-pulse">
                                    {stats.unread}
                                </span>
                            )}
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.unread}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Unread</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('read'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                                <MailOpen className="text-gray-600" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.read}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Read</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('replied'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                <Reply className="text-green-600" size={18} />
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Done</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.replied}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Replied</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('archived'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                <Archive className="text-purple-600" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.archived}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Archived</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group cursor-pointer"
                        onClick={() => { setSelectedStatus('starred'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                                <Star className="text-amber-500 fill-amber-500" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.starred}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Starred</p>
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
                                placeholder="Search by sender, subject, or message content..."
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
                                className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[130px]"
                            >
                                <option value="all">All Status</option>
                                <option value="unread">Unread</option>
                                <option value="read">Read</option>
                                <option value="replied">Replied</option>
                                <option value="archived">Archived</option>
                                <option value="starred">⭐ Starred</option>
                            </select>
                        </div>

                        {/* Category Filter */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                            className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[160px]"
                        >
                            <option value="all">All Categories</option>
                            {Object.entries(CATEGORY_CONFIG).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                            ))}
                        </select>

                        {/* Reset Filters */}
                        {(searchQuery || selectedStatus !== 'all' || selectedCategory !== 'all') && (
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

                {/* Messages List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {paginatedMessages.map((message) => {
                            const categoryConfig = CATEGORY_CONFIG[message.category];
                            const CategoryIcon = categoryConfig.icon;
                            const priorityConfig = PRIORITY_CONFIG[message.priority];
                            const isUnread = message.status === 'unread';

                            return (
                                <div
                                    key={message.id}
                                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${isUnread ? 'bg-blue-50/30' : ''}`}
                                    onClick={() => handleView(message)}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Star & Avatar */}
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleToggleStar(message); }}
                                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                            >
                                                <Star
                                                    size={18}
                                                    className={message.starred ? 'text-amber-500 fill-amber-500' : 'text-gray-300 hover:text-amber-400'}
                                                />
                                            </button>
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-sm font-bold shrink-0">
                                                {message.sender.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-4 mb-1">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <h3 className={`font-semibold text-gray-900 truncate ${isUnread ? 'font-bold' : ''}`}>
                                                        {message.sender.name}
                                                    </h3>
                                                    {message.sender.company && (
                                                        <span className="text-xs text-gray-400 hidden sm:inline">• {message.sender.company}</span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-gray-400 shrink-0">{formatDate(message.date)}</span>
                                            </div>

                                            <p className={`text-sm text-gray-800 truncate mb-2 ${isUnread ? 'font-medium' : ''}`}>
                                                {message.subject}
                                            </p>

                                            <p className="text-xs text-gray-500 truncate mb-2">
                                                {message.message.replace(/\n/g, ' ').slice(0, 100)}...
                                            </p>

                                            <div className="flex items-center flex-wrap gap-2">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ${categoryConfig.color}`}>
                                                    <CategoryIcon size={10} />
                                                    {categoryConfig.label}
                                                </span>
                                                <StatusBadge status={message.status} />
                                                {message.priority === 'high' && (
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${priorityConfig.color}`}>
                                                        🔴 {priorityConfig.label}
                                                    </span>
                                                )}
                                                <span className="text-[10px] text-gray-400">via {message.source}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1 shrink-0">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleReply(message); }}
                                                className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Reply"
                                            >
                                                <Reply size={16} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleArchive(message); }}
                                                className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                title="Archive"
                                            >
                                                <Archive size={16} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDelete(message); }}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {filteredMessages.length === 0 && (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="text-gray-400" size={28} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages found</h3>
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
                            <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredMessages.length)}</span> of{' '}
                            <span className="font-semibold text-gray-900">{filteredMessages.length}</span> messages
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

            {/* View Message Modal */}
            {viewingMessage && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-gradient-to-r from-[#004fa2] to-[#0066cc] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <MessageSquare className="text-white" size={22} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Message Details</h2>
                                    <p className="text-blue-100 text-xs">{viewingMessage.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleToggleStar(viewingMessage)}
                                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <Star size={18} className={viewingMessage.starred ? 'fill-amber-400 text-amber-400' : ''} />
                                </button>
                                <button
                                    onClick={() => setViewingMessage(null)}
                                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                            <div className="space-y-5">
                                {/* Subject */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{viewingMessage.subject}</h3>
                                    <div className="flex items-center flex-wrap gap-2 mt-2">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium border ${CATEGORY_CONFIG[viewingMessage.category].color}`}>
                                            {React.createElement(CATEGORY_CONFIG[viewingMessage.category].icon, { size: 12 })}
                                            {CATEGORY_CONFIG[viewingMessage.category].label}
                                        </span>
                                        <StatusBadge status={viewingMessage.status} />
                                        {viewingMessage.priority === 'high' && (
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${PRIORITY_CONFIG[viewingMessage.priority].color}`}>
                                                🔴 High Priority
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Sender Info */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-lg font-bold">
                                            {viewingMessage.sender.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{viewingMessage.sender.name}</p>
                                            {viewingMessage.sender.company && (
                                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Building size={12} />
                                                    {viewingMessage.sender.company}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Mail className="text-gray-400" size={14} />
                                            <a href={`mailto:${viewingMessage.sender.email}`} className="text-[#004fa2] hover:underline">
                                                {viewingMessage.sender.email}
                                            </a>
                                        </div>
                                        {viewingMessage.sender.phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="text-gray-400" size={14} />
                                                <span className="text-gray-600">{viewingMessage.sender.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div className="bg-white border border-gray-200 rounded-xl p-5">
                                    <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {formatFullDate(viewingMessage.date)}
                                        </span>
                                        <span>via {viewingMessage.source}</span>
                                    </div>
                                    <div className="prose prose-sm max-w-none">
                                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                            {viewingMessage.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleArchive(viewingMessage)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <Archive size={14} />
                                    Archive
                                </button>
                                <button
                                    onClick={() => handleDelete(viewingMessage)}
                                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewingMessage(null)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => handleReply(viewingMessage)}
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

export default MessagesManagementPage;
