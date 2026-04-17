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
            name: 'Robert Kojo',
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
            name: 'Sarah Owusu',
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
            <div className="space-y-3 md:space-y-6 pb-8">
                {/* Page Header & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                            <MessageSquare size={18} className="text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-[11px] md:text-base font-bold text-gray-900 leading-tight">Messages & Inquiries</h1>
                            <p className="text-[10px] text-gray-500">Manage contact form submissions and customer inquiries</p>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleExport}
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-all shadow-sm text-xs font-semibold w-full md:w-auto"
                    >
                        <Download size={14} /> Export
                    </button>
                </div>

                {/* Quick Status Bar */}
                <div className="flex flex-wrap text-[11px] gap-2 mb-4">
                    {[
                        { label: 'All', id: 'all', count: stats.total, active: selectedStatus === 'all' },
                        { label: 'Unread', id: 'unread', count: stats.unread, active: selectedStatus === 'unread' },
                        { label: 'Read', id: 'read', count: stats.read, active: selectedStatus === 'read' },
                        { label: 'Replied', id: 'replied', count: stats.replied, active: selectedStatus === 'replied' },
                        { label: 'Archived', id: 'archived', count: stats.archived, active: selectedStatus === 'archived' },
                        { label: 'Starred', id: 'starred', count: stats.starred, active: selectedStatus === 'starred', isStar: true }
                    ].map(st => (
                        <button
                            key={st.id}
                            onClick={() => { setSelectedStatus(st.id); setCurrentPage(1); }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${st.active ? 'bg-[#004fa2] text-white border-[#004fa2]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                        >
                            {st.isStar && <Star size={10} className={st.active ? "text-white" : "text-amber-500 fill-amber-500"} />}
                            {st.label} <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${st.active ? 'bg-white/20' : 'bg-gray-100'}`}>{st.count}</span>
                        </button>
                    ))}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-gradient-to-r from-red-50 to-rose-50 border-red-100 text-red-800 font-bold ml-auto cursor-default opacity-90">
                         <AlertCircle size={12}/> Urgent: {stats.highPriority}
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-2 mb-4">
                    <div className="col-span-2 md:col-span-6 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search by sender, subject, or message content..."
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
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                            <option value="archived">Archived</option>
                            <option value="starred">⭐ Starred</option>
                        </select>
                    </div>

                    <div className="col-span-1 md:col-span-3 relative flex gap-2">
                        <select
                            value={selectedCategory}
                            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                            className="w-full px-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                        >
                            <option value="all">All Categories</option>
                            {Object.entries(CATEGORY_CONFIG).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                            ))}
                        </select>

                        {(searchQuery || selectedStatus !== 'all' || selectedCategory !== 'all') && (
                            <button onClick={resetFilters} className="bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 h-[34px] px-3 rounded-xl transition-colors shadow-sm flex items-center justify-center shrink-0">
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Messages List Grid */}
                <div className="flex flex-col gap-2">
                    {paginatedMessages.map((message) => {
                        const categoryConfig = CATEGORY_CONFIG[message.category];
                        const CategoryIcon = categoryConfig.icon;
                        const priorityConfig = PRIORITY_CONFIG[message.priority];
                        const isUnread = message.status === 'unread';

                        return (
                            <div key={message.id} onClick={() => handleView(message)} className={`bg-white rounded-xl shadow-sm border ${isUnread ? 'border-blue-200 bg-blue-50/20' : 'border-gray-100'} flex flex-col xl:flex-row p-3 gap-3 hover:border-[#004fa2] transition-colors cursor-pointer group relative overflow-hidden`}>
                                {/* Left Indicator */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${STATUS_CONFIG[message.status]?.dotColor || 'bg-gray-300'}`}></div>

                                {/* Sender & Subject Layout */}
                                <div className="flex items-start gap-3 w-full xl:w-2/3">
                                    <div className="flex flex-col items-center gap-1.5 shrink-0">
                                        <button onClick={(e) => { e.stopPropagation(); handleToggleStar(message); }} className="hover:scale-110 transition-transform">
                                            <Star size={14} className={message.starred ? 'text-amber-500 fill-amber-500' : 'text-gray-300'} />
                                        </button>
                                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                                            {message.sender.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                                        </div>
                                    </div>
                                    
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-0.5">
                                            <div className="flex items-center gap-1.5 truncate">
                                                <h3 className={`text-xs truncate ${isUnread ? 'font-black text-gray-900' : 'font-bold text-gray-800'}`}>
                                                    {message.sender.name}
                                                </h3>
                                                {message.sender.company && <span className="text-[9px] text-gray-400 bg-gray-50 px-1.5 rounded md:inline hidden truncate max-w-[120px]">{message.sender.company}</span>}
                                            </div>
                                            <span className="text-[9px] text-gray-400 font-mono tracking-wide shrink-0">
                                                {formatDate(message.date)}
                                            </span>
                                        </div>
                                        
                                        <p className={`text-[11px] mb-1 truncate ${isUnread ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                                            {message.subject}
                                        </p>
                                        
                                        <p className="text-[10px] text-gray-500 line-clamp-1 mb-1.5 pr-4">
                                            {message.message.replace(/\n/g, ' ')}
                                        </p>

                                        <div className="flex items-center flex-wrap gap-1.5">
                                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold border ${categoryConfig.color}`}>
                                                <CategoryIcon size={8} /> {categoryConfig.label}
                                            </span>
                                            <StatusBadge status={message.status} />
                                            {message.priority === 'high' && (
                                                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold ${priorityConfig.color} border border-red-100`}>
                                                    🔴 Urgent
                                                </span>
                                            )}
                                            <span className="text-[9px] text-gray-400 hidden sm:inline ml-1 font-mono">via {message.source}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Container */}
                                <div className="flex items-center justify-end gap-1 shrink-0 border-t xl:border-t-0 xl:border-l xl:pl-3 pt-2 xl:pt-0 border-gray-50 ml-auto xl:w-min">
                                    <button onClick={(e) => { e.stopPropagation(); handleReply(message); }} className="p-1.5 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"><Reply size={14} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); handleArchive(message); }} className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"><Archive size={14} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(message); }} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                                </div>
                            </div>
                        );
                    })}

                    {filteredMessages.length === 0 && (
                        <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm">
                            <MessageSquare className="mx-auto text-gray-300 mb-2" size={24} />
                            <h3 className="text-sm font-bold text-gray-900 mb-1">No messages found</h3>
                            <button onClick={resetFilters} className="text-[11px] text-[#004fa2] hover:underline font-semibold mt-2">Clear filters</button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100 gap-3 mt-4">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                            Showing <span className="text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="text-gray-900">{Math.min(currentPage * itemsPerPage, filteredMessages.length)}</span> of{' '}
                            <span className="text-gray-900">{filteredMessages.length}</span>
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

            {/* View Message Modal */}
            {viewingMessage && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] md:max-h-[85vh] flex flex-col overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-4 py-3 bg-gradient-to-r from-[#004fa2] to-[#0066cc] flex items-center justify-between">
                            <div className="flex items-center gap-2 md:gap-3 min-w-0">
                                <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                                    <MessageSquare className="text-white" size={18} />
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-[11px] md:text-base font-bold text-white truncate">Message Details</h2>
                                    <p className="text-blue-100 text-[10px] font-mono truncate">{viewingMessage.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 md:gap-2 shrink-0">
                                <button
                                    onClick={() => handleToggleStar(viewingMessage)}
                                    className="p-1.5 md:p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <Star size={16} className={viewingMessage.starred ? 'fill-amber-400 text-amber-400' : ''} />
                                </button>
                                <button
                                    onClick={() => setViewingMessage(null)}
                                    className="p-1.5 md:p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-2 md:p-4 lg:p-5 lg:p-6 overflow-y-auto max-h-[calc(90vh-140px)] md:max-h-[calc(85vh-140px)] custom-scrollbar">
                            <div className="space-y-4">
                                {/* Subject */}
                                <div>
                                    <h3 className="text-base md:text-lg font-bold text-gray-900 leading-snug">{viewingMessage.subject}</h3>
                                    <div className="flex items-center flex-wrap gap-2 mt-2">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${CATEGORY_CONFIG[viewingMessage.category].color}`}>
                                            {React.createElement(CATEGORY_CONFIG[viewingMessage.category].icon, { size: 10 })}
                                            {CATEGORY_CONFIG[viewingMessage.category].label}
                                        </span>
                                        <StatusBadge status={viewingMessage.status} />
                                        {viewingMessage.priority === 'high' && (
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${PRIORITY_CONFIG[viewingMessage.priority].color} border border-red-100`}>
                                                🔴 High Priority
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Sender Info */}
                                <div className="bg-gray-50 rounded-xl p-2 md:p-4 flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 md:w-8 md:h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-[11px] md:text-base font-bold shrink-0">
                                            {viewingMessage.sender.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-bold text-gray-900 text-[11px] md:text-base truncate">{viewingMessage.sender.name}</p>
                                            {viewingMessage.sender.company && (
                                                <p className="text-[11px] text-gray-500 flex items-center gap-1 truncate">
                                                    <Building size={10} className="shrink-0" />
                                                    {viewingMessage.sender.company}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                                        <div className="flex items-center gap-1.5 truncate">
                                            <Mail className="text-gray-400 shrink-0" size={12} />
                                            <a href={`mailto:${viewingMessage.sender.email}`} className="text-[#004fa2] hover:underline truncate">
                                                {viewingMessage.sender.email}
                                            </a>
                                        </div>
                                        {viewingMessage.sender.phone && (
                                            <div className="flex items-center gap-1.5 truncate">
                                                <Phone className="text-gray-400 shrink-0" size={12} />
                                                <a href={`tel:${viewingMessage.sender.phone}`} className="text-gray-600 hover:text-gray-900 truncate">
                                                    {viewingMessage.sender.phone}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div className="bg-white border border-gray-200 rounded-xl p-2 md:p-4 lg:p-5 flex flex-col">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3 pb-2 border-b border-gray-50 text-[10px] text-gray-400 shrink-0">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={10} />
                                            {formatFullDate(viewingMessage.date)}
                                        </span>
                                        <span className="font-mono">via {viewingMessage.source}</span>
                                    </div>
                                    <div className="prose prose-sm max-w-none text-[11px] md:text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                                        {viewingMessage.message}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-4 py-3 border-t border-gray-100 flex flex-wrap-reverse sm:flex-nowrap items-center justify-between bg-gray-50 gap-2 shrink-0">
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <button
                                    onClick={() => handleArchive(viewingMessage)}
                                    className="flex-1 sm:flex-none px-3 py-2 text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg transition-colors font-medium text-[11px] flex items-center justify-center gap-1.5 shadow-sm"
                                >
                                    <Archive size={12} /> Archive
                                </button>
                                <button
                                    onClick={() => handleDelete(viewingMessage)}
                                    className="flex-1 sm:flex-none px-3 py-2 text-red-600 bg-white border border-red-100 hover:bg-red-50 rounded-lg transition-colors font-medium text-[11px] flex items-center justify-center gap-1.5 shadow-sm"
                                >
                                    <Trash2 size={12} /> Delete
                                </button>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                <button
                                    onClick={() => setViewingMessage(null)}
                                    className="flex-1 sm:flex-none px-3 py-2 text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg transition-colors font-medium text-[11px] shadow-sm justify-center flex"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => handleReply(viewingMessage)}
                                    className="flex-1 sm:flex-none px-3 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-sm"
                                >
                                    <Reply size={12} /> Reply
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
