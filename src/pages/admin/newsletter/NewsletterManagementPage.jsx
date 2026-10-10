/**
 * Newsletter Management Page (Admin)
 * View and manage newsletter subscribers and send campaigns
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    RefreshCw,
    Loader2,
    Send,
    X,
    AlertCircle
} from 'lucide-react';
import newsletterService from '../../../services/newsletterService';
import { ALL_TEMPLATES } from '../../../components/admin/newsletter/NewsletterTemplates';

// Status configuration
const STATUS_CONFIG = {
    'subscribed': {
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
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Newsletter sending state
    const [showSendModal, setShowSendModal] = useState(false);
    const [templateStep, setTemplateStep] = useState(true); // Show template selection first
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [newsletterForm, setNewsletterForm] = useState({
        subject: '',
        content: '',
        recipientGroup: 'all'
    });
    const [sending, setSending] = useState(false);
    const [sendMessage, setSendMessage] = useState(null);

    // Fetch subscribers from API
    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log('[Admin Newsletter] Fetching subscribers...', { 
                    page: currentPage, 
                    limit: itemsPerPage,
                    status: statusFilter !== 'all' ? statusFilter : undefined,
                    search: searchTerm || undefined
                });
                
                const response = await newsletterService.getSubscribers(
                    currentPage, 
                    itemsPerPage,
                    statusFilter !== 'all' ? statusFilter : null,
                    searchTerm || null
                );
                console.log('[Admin Newsletter] Response:', response);
                
                // Extract the array from backend response
                // Backend returns: {success: true, data: {data: [...], pagination: {...}}, message: "..."}
                // Double-nested: response.data.data is the actual array
                let data = [];
                if (Array.isArray(response)) {
                    data = response;
                } else if (response?.data?.data && Array.isArray(response.data.data)) {
                    // ✅ Correct path: response.data.data (double-nested)
                    data = response.data.data;
                } else if (response?.data?.subscribers && Array.isArray(response.data.subscribers)) {
                    data = response.data.subscribers;
                } else if (response?.subscribers && Array.isArray(response.subscribers)) {
                    data = response.subscribers;
                } else if (Array.isArray(response?.data)) {
                    data = response.data;
                }
                    
                console.log('[Admin Newsletter] Processed data:', data);
                setSubscribers(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('[Admin Newsletter] Error:', err);
                setError(err.response?.status === 404 
                    ? 'Newsletter API endpoint not available. Please check with backend team.'
                    : err.message || 'Failed to load subscribers. Please try again.');
                setSubscribers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscribers();
    }, [currentPage, itemsPerPage, statusFilter, searchTerm]);

    // Remove local filtering since backend now handles it
    const filteredSubscribers = useMemo(() => {
        return subscribers;  // Backend already filtered and paginated
    }, [subscribers]);

    // Pagination info from backend (if available) or calculate from local data
    const totalPages = (Array.isArray(subscribers) ? Math.ceil(subscribers.length / itemsPerPage) : 1) || 1;
    const paginatedSubscribers = Array.isArray(subscribers) ? subscribers : [];  // Already paginated from backend

    // Stats
    const stats = useMemo(() => ({
        total: Array.isArray(subscribers) ? subscribers.length : 0,
        active: Array.isArray(subscribers) ? subscribers.filter(s => s.status === 'subscribed').length : 0,
        unsubscribed: Array.isArray(subscribers) ? subscribers.filter(s => s.status === 'unsubscribed').length : 0,
        thisWeek: Array.isArray(subscribers) ? subscribers.filter(s => {
            const subDate = new Date(s.createdAt || s.subscribedAt);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return subDate >= weekAgo;
        }).length : 0
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
        if (!Array.isArray(subscribers)) {
            console.warn('[Admin Newsletter] Cannot export: subscribers is not an array');
            return;
        }
        const activeSubscribers = subscribers.filter(s => s.status === 'subscribed');
        const csvContent = [
            'Email,Name,Subscribed Date',
            ...activeSubscribers.map(s => `${s.email},"${s.name || ''}",${s.createdAt || s.subscribedAt}`)
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'newsletter-subscribers.csv';
        a.click();
    };

    const handleSendNewsletter = async (e) => {
        e.preventDefault();
        
        if (!newsletterForm.subject.trim()) {
            setSendMessage({ type: 'error', text: 'Please enter a subject line' });
            return;
        }
        
        if (!newsletterForm.content.trim()) {
            setSendMessage({ type: 'error', text: 'Please enter newsletter content' });
            return;
        }

        try {
            setSending(true);
            setSendMessage(null);
            
            console.log('[Admin Newsletter] Sending newsletter:', newsletterForm);
            const response = await newsletterService.sendNewsletter(
                newsletterForm.subject,
                newsletterForm.content,
                newsletterForm.recipientGroup
            );
            
            console.log('[Admin Newsletter] Send response:', response);
            setSendMessage({ 
                type: 'success', 
                text: `Newsletter sent successfully to ${response.sentCount || 'subscribers'} recipient(s)` 
            });
            
            // Reset form
            setNewsletterForm({ subject: '', content: '', recipientGroup: 'all' });
            setTimeout(() => setShowSendModal(false), 2000);
        } catch (err) {
            console.error('[Admin Newsletter] Send error:', err);
            setSendMessage({ 
                type: 'error', 
                text: err.response?.data?.error?.message || err.message || 'Failed to send newsletter' 
            });
        } finally {
            setSending(false);
        }
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
                    <button
                        onClick={() => setShowSendModal(true)}
                        className="w-full md:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold text-[11px] shadow-sm"
                    >
                        <Send size={14} />
                        Send Newsletter
                    </button>
                    <Link
                        to="/admin/newsletter/templates"
                        className="w-full md:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-semibold text-[11px] shadow-sm"
                    >
                        <Mail size={14} />
                        Email Templates
                    </Link>
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

                {/* Loading State */}
                {loading ? (
                    <div className="col-span-full py-12 text-center bg-white rounded-xl border border-gray-100">
                        <Loader2 className="w-8 h-8 animate-spin text-[#004fa2] mx-auto mb-3" />
                        <p className="text-gray-600">Loading subscribers...</p>
                    </div>
                ) : error ? (
                    <div className="col-span-full py-12 text-center bg-red-50 rounded-xl border border-red-200">
                        <XCircle className="w-8 h-8 text-red-600 mx-auto mb-3" />
                        <p className="text-red-700 font-semibold">{error}</p>
                        <p className="text-red-600 text-sm mt-2">
                            Backend endpoint: GET /api/admin/newsletter/
                        </p>
                    </div>
                ) : subscribers.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-100">
                        No subscribers found
                    </div>
                ) : (
                    paginatedSubscribers.map((subscriber) => {
                        const statusConfig = STATUS_CONFIG[subscriber.status];
                        const StatusIcon = statusConfig?.icon;
                        
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
                                            <p className="text-[9px] text-gray-500 truncate">{subscriber.name || 'No name'}</p>
                                        </div>
                                    </div>
                                    <span className={`inline-flex items-center px-1.5 py-[1px] rounded text-[9px] font-bold shrink-0 ${statusConfig?.color || 'bg-gray-100 text-gray-600'}`}>
                                        {statusConfig?.label || subscriber.status}
                                    </span>
                                </div>
                                
                                <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-50">
                                    <div className="flex items-center gap-1.5 text-[9px] text-gray-400">
                                        <Calendar size={10} />
                                        {formatDate(subscriber.createdAt || subscriber.subscribedAt)}
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
                            <Mail className="text-blue-600" size={16} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900">Send Campaigns</h3>
                            <p className="text-sm text-blue-700 mt-1">
                                Use the "Send Newsletter" button above to compose and send campaigns to your subscribers. 
                                HTML content is supported for rich formatting.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Send Newsletter Modal */}
                {showSendModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                                        <Send className="text-green-600" size={16} />
                                    </div>
                                    <h2 className="font-bold text-gray-900">Send Newsletter Campaign</h2>
                                </div>
                                <button
                                    onClick={() => { setShowSendModal(false); setSendMessage(null); }}
                                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                                >
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSendNewsletter} className="p-6 space-y-4">
                                {/* Messages */}
                                {sendMessage && (
                                    <div className={`p-3 rounded-lg flex items-start gap-2 text-sm ${
                                        sendMessage.type === 'error' 
                                            ? 'bg-red-50 border border-red-200 text-red-700' 
                                            : 'bg-green-50 border border-green-200 text-green-700'
                                    }`}>
                                        {sendMessage.type === 'error' ? (
                                            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                                        ) : (
                                            <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                                        )}
                                        <p>{sendMessage.text}</p>
                                    </div>
                                )}

                                {/* Subject */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Subject Line
                                    </label>
                                    <input
                                        type="text"
                                        value={newsletterForm.subject}
                                        onChange={(e) => setNewsletterForm({...newsletterForm, subject: e.target.value})}
                                        placeholder="e.g., August Newsletter - New Courses Available"
                                        className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 text-sm"
                                        disabled={sending}
                                    />
                                </div>

                                {/* Recipient Group */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Send To
                                    </label>
                                    <select
                                        value={newsletterForm.recipientGroup}
                                        onChange={(e) => setNewsletterForm({...newsletterForm, recipientGroup: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 text-sm"
                                        disabled={sending}
                                    >
                                        <option value="all">All Subscribers</option>
                                        <option value="subscribed">Active Subscribers Only</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {newsletterForm.recipientGroup === 'all' 
                                            ? `Sending to ~${stats.total} subscribers`
                                            : `Sending to ${stats.active} active subscribers`
                                        }
                                    </p>
                                </div>

                                {/* Content */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Content
                                    </label>
                                    <textarea
                                        value={newsletterForm.content}
                                        onChange={(e) => setNewsletterForm({...newsletterForm, content: e.target.value})}
                                        placeholder="Write your newsletter content here... HTML is supported"
                                        rows={8}
                                        className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 text-sm font-mono resize-none"
                                        disabled={sending}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        {newsletterForm.content.length} characters
                                    </p>
                                </div>

                                {/* Preview */}
                                {newsletterForm.content && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Preview
                                        </label>
                                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg text-sm prose prose-sm max-w-none">
                                            <div dangerouslySetInnerHTML={{__html: newsletterForm.content}} />
                                        </div>
                                    </div>
                                )}

                                {/* Footer */}
                                <div className="flex gap-2 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => { setShowSendModal(false); setSendMessage(null); }}
                                        disabled={sending}
                                        className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold text-sm disabled:opacity-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={sending || !newsletterForm.subject || !newsletterForm.content}
                                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {sending ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                Send Now
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default NewsletterManagementPage;
