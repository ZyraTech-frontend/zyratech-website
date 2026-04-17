/**
 * Newsletter Management Page (Admin)
 * View and manage newsletter subscribers
 */

import React, { useState, useMemo } from 'react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import {
    Mail,
    Search,
    Filter,
    Trash2,
    Download,
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    Clock,
    XCircle,
    Calendar,
    Users,
    TrendingUp,
    MailCheck,
    MailX,
    UserPlus,
    RefreshCw
} from 'lucide-react';

// Mock subscribers data
const mockSubscribers = [
    {
        id: 'SUB-001',
        email: 'kwame.mensah@gmail.com',
        subscribedAt: '2026-02-10T14:30:00',
        status: 'active',
        source: 'Homepage'
    },
    {
        id: 'SUB-002',
        email: 'ama.osei@yahoo.com',
        subscribedAt: '2026-02-09T09:15:00',
        status: 'active',
        source: 'Blog'
    },
    {
        id: 'SUB-003',
        email: 'kofi.asante@outlook.com',
        subscribedAt: '2026-02-08T16:45:00',
        status: 'active',
        source: 'Training Page'
    },
    {
        id: 'SUB-004',
        email: 'akua.boateng@gmail.com',
        subscribedAt: '2026-02-07T11:20:00',
        status: 'unsubscribed',
        source: 'Partnership Page'
    },
    {
        id: 'SUB-005',
        email: 'yaw.darko@gmail.com',
        subscribedAt: '2026-02-06T08:00:00',
        status: 'active',
        source: 'About Page'
    },
    {
        id: 'SUB-006',
        email: 'efua.mensah@gmail.com',
        subscribedAt: '2026-02-05T13:30:00',
        status: 'active',
        source: 'Jobs Page'
    },
    {
        id: 'SUB-007',
        email: 'kweku.appiah@yahoo.com',
        subscribedAt: '2026-02-04T10:15:00',
        status: 'bounced',
        source: 'Projects Page'
    },
    {
        id: 'SUB-008',
        email: 'abena.owusu@gmail.com',
        subscribedAt: '2026-02-03T15:45:00',
        status: 'active',
        source: 'Homepage'
    }
];

// Status configuration
const STATUS_CONFIG = {
    'active': {
        label: 'Active',
        color: 'bg-green-100 text-green-700',
        icon: MailCheck
    },
    'unsubscribed': {
        label: 'Unsubscribed',
        color: 'bg-gray-100 text-gray-600',
        icon: MailX
    },
    'bounced': {
        label: 'Bounced',
        color: 'bg-red-100 text-red-700',
        icon: XCircle
    }
};

const NewsletterManagementPage = () => {
    const [subscribers] = useState(mockSubscribers);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter subscribers
    const filteredSubscribers = useMemo(() => {
        return subscribers.filter(sub => {
            const matchesSearch = sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  sub.source.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [subscribers, searchTerm, statusFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
    const paginatedSubscribers = filteredSubscribers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Stats
    const stats = useMemo(() => ({
        total: subscribers.length,
        active: subscribers.filter(s => s.status === 'active').length,
        unsubscribed: subscribers.filter(s => s.status === 'unsubscribed').length,
        thisWeek: subscribers.filter(s => {
            const subDate = new Date(s.subscribedAt);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return subDate >= weekAgo;
        }).length
    }), [subscribers]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleExport = () => {
        const activeSubscribers = subscribers.filter(s => s.status === 'active');
        const csvContent = [
            'Email,Subscribed Date,Source',
            ...activeSubscribers.map(s => `${s.email},${s.subscribedAt},${s.source}`)
        ].join('n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'newsletter-subscribers.csv';
        a.click();
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm gap-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-[#004fa2] to-[#0066cc] p-2 rounded-lg shrink-0 shadow-sm">
                            <Mail size={18} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-[11px] md:text-base font-bold text-gray-900 leading-tight">Newsletter Subscribers</h1>
                            <p className="text-[10px] text-gray-500 mt-0.5">Manage your newsletter mailing list</p>
                        </div>
                    </div>
                    <button
                        onClick={handleExport}
                        className="w-full md:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#004fa2] text-white rounded-lg hover:bg-blue-800 transition-all font-semibold text-[11px] shadow-sm"
                    >
                        <Download size={14} />
                        Export Active
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                        { title: 'Total Subscribers', count: stats.total, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { title: 'Active', count: stats.active, icon: MailCheck, color: 'text-green-600', bg: 'bg-green-50' },
                        { title: 'This Week', count: stats.thisWeek, icon: UserPlus, color: 'text-purple-600', bg: 'bg-purple-50' },
                        { title: 'Active Rate', count: `${stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}%`, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-xl p-2.5 flex items-start gap-2 shadow-sm transition-colors text-left group">
                            <div className={`w-7 h-7 rounded-md shrink-0 flex items-center justify-center ${stat.bg}`}>
                                <stat.icon className={stat.color} size={14} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[9px] text-gray-500 font-medium uppercase tracking-wide truncate">{stat.title}</p>
                                <p className="text-sm font-bold text-gray-900 leading-none mt-0.5">{stat.count}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search by email or source..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-8 pr-3 py-1.5 text-[11px] bg-white border border-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004fa2] focus:border-[#004fa2] transition-colors"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 hide-scrollbar shrink-0">
                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                            className="shrink-0 px-2.5 py-1.5 text-[11px] bg-white border border-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004fa2] transition-colors appearance-none min-w-[120px] cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="unsubscribed">Unsubscribed</option>
                            <option value="bounced">Bounced</option>
                        </select>
                    </div>
                </div>

                {/* Subscribers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {paginatedSubscribers.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-100">
                            No subscribers found
                        </div>
                    ) : (
                        paginatedSubscribers.map((subscriber) => {
                            const statusConfig = STATUS_CONFIG[subscriber.status];
                            const StatusIcon = statusConfig.icon;
                            
                            return (
                                <div key={subscriber.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:border-[#004fa2] transition-colors group flex flex-col gap-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-50/50 flex items-center justify-center shrink-0">
                                                <Mail size={14} className="text-blue-500" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-[11px] text-gray-900 truncate" title={subscriber.email}>
                                                    {subscriber.email}
                                                </h3>
                                                <p className="text-[9px] text-gray-500 truncate">{subscriber.source}</p>
                                            </div>
                                        </div>
                                        <span className={`inline-flex items-center px-1.5 py-[1px] rounded text-[9px] font-bold shrink-0 ${statusConfig.color}`}>
                                            {statusConfig.label}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-50">
                                        <div className="flex items-center gap-1.5 text-[9px] text-gray-400">
                                            <Calendar size={10} />
                                            {formatDate(subscriber.subscribedAt)}
                                        </div>
                                        <button
                                            className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-600 transition-colors"
                                            title="Remove subscriber"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Pagination Footer */}
                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm mt-4">
                    <p className="text-[11px] text-gray-500 font-medium">
                        Showing {filteredSubscribers.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredSubscribers.length)} of {filteredSubscribers.length} subscribers
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={14} />
                        </button>
                        <span className="px-2 py-1 text-[11px] font-bold text-gray-700">
                            {currentPage} / {Math.max(1, totalPages)}
                        </span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <div className="flex gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <RefreshCw className="text-blue-600" size={16} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900">Email Integration Coming Soon</h3>
                            <p className="text-sm text-blue-700 mt-1">
                                Once the backend is connected, you'll be able to send newsletters directly to your subscribers, 
                                set up automated campaigns, and track open rates. Currently showing mock data for preview.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default NewsletterManagementPage;
