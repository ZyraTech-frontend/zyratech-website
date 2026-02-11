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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Mail className="text-blue-600" size={28} />
                            Newsletter Subscribers
                        </h1>
                        <p className="text-gray-600 mt-1">Manage your newsletter mailing list</p>
                    </div>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Download size={18} />
                        Export Active Subscribers
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <Users className="text-blue-600" size={20} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                <p className="text-xs text-gray-500">Total Subscribers</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <MailCheck className="text-green-600" size={20} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                                <p className="text-xs text-gray-500">Active</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                <UserPlus className="text-purple-600" size={20} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{stats.thisWeek}</p>
                                <p className="text-xs text-gray-500">This Week</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                <TrendingUp className="text-orange-600" size={20} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}%
                                </p>
                                <p className="text-xs text-gray-500">Active Rate</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by email or source..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <Filter size={18} className="text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="unsubscribed">Unsubscribed</option>
                                <option value="bounced">Bounced</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Subscribers Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Source
                                    </th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Subscribed
                                    </th>
                                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedSubscribers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                            No subscribers found
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedSubscribers.map((subscriber) => {
                                        const statusConfig = STATUS_CONFIG[subscriber.status];
                                        const StatusIcon = statusConfig.icon;
                                        
                                        return (
                                            <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                            <Mail className="text-blue-600" size={14} />
                                                        </div>
                                                        <span className="font-medium text-gray-900">
                                                            {subscriber.email}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    {subscriber.source}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                                                        <StatusIcon size={12} />
                                                        {statusConfig.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 text-sm">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar size={14} className="text-gray-400" />
                                                        {formatDate(subscriber.subscribedAt)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Remove subscriber"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredSubscribers.length)} of {filteredSubscribers.length} subscribers
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <span className="px-3 py-1 text-sm font-medium">
                                    {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
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
