/**
 * Regular Admin Dashboard - Complete Redesign
 * Premium operational dashboard focused on content management, inquiries, and daily workflow.
 * Designed for admins who handle the day-to-day work of the platform.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Briefcase,
    GraduationCap,
    MessageSquare,
    Image,
    FileText,
    Calendar,
    CheckCircle,
    Clock,
    ArrowRight,
    TrendingUp,
    Layout,
    BookOpen,
    FolderKanban,
    Handshake,
    Mail,
    HelpCircle,
    MessageCircle,
    CreditCard,
    Users,
    Bell,
    Eye,
    Edit,
    Plus,
    RefreshCw,
    ArrowUpRight,
    ArrowDownRight,
    Inbox,
    Star,
    Zap,
    Activity,
    BarChart3,
    Quote,
    ShieldCheck,
    UserPlus,
    ExternalLink,
    AlertCircle,
    Sparkles
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { trainingCourses } from '../../../data/trainingCourses';
import jobsService from '../../../services/jobsService';
import dashboardService from '../../../services/dashboardService';
import FinancialCard from '../../../components/admin/dashboard/FinancialCard';
import ChartCard from '../../../components/admin/dashboard/ChartCard';
import RefundTrackerCard from '../../../components/admin/dashboard/RefundTrackerCard';
import RevenueBreakdownCard from '../../../components/admin/dashboard/RevenueBreakdownCard';

const RegularAdminDashboard = ({ user: propUser }) => {
    const authUser = useSelector((state) => state.auth.user);
    const user = authUser || propUser;
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [greeting, setGreeting] = useState('');
    const [, setTick] = useState(0);
    const [jobsData, setJobsData] = useState([]);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch dashboard data (revenue, charts, etc)
    const fetchDashboardData = async () => {
        try {
            setError(null);
            const data = await dashboardService.getDashboardData();
            setDashboardData(data);
        } catch (err) {
            console.error('[RegularAdminDashboard] Error fetching data:', err);
            setError('Failed to load revenue data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch dashboard data
        fetchDashboardData();

        // Fetch jobs from backend
        let isMounted = true;
        const loadJobs = async () => {
            try {
                const jobs = await jobsService.getAllJobsAdmin();
                if (isMounted) {
                    setJobsData(Array.isArray(jobs) ? jobs : []);
                }
            } catch (err) {
                console.warn('Failed to fetch jobs:', err);
            }
        };
        loadJobs();

        const timer = setInterval(() => setCurrentDate(new Date()), 60000);
        const handleSync = () => setTick(t => t + 1);
        window.addEventListener('user-profile-updated', handleSync);
        return () => {
            clearInterval(timer);
            window.removeEventListener('user-profile-updated', handleSync);
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const hour = currentDate.getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');
    }, [currentDate]);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchDashboardData();
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    // Operational Metrics — focused on what admins manage daily
    const metrics = {
        // Content
        totalJobs: jobsData.length,
        activeJobs: jobsData.filter(j => j.status === 'active' || !j.status).length,
        totalCourses: trainingCourses.length,
        activeCourses: trainingCourses.filter(c => c.status === 'active' || !c.status).length,
        blogPosts: 24,
        draftPosts: 3,
        galleryImages: 86,
        projects: 15,

        // Communication
        pendingInquiries: 12,
        unreadMessages: 8,
        partnershipRequests: 3,
        newsletterSubs: 1240,

        // Enrollments
        activeEnrollments: 247,
        pendingEnrollments: 18,
        completedEnrollments: 892,
        totalEnrollments: 1139,

        // Testimonials & FAQ
        testimonials: 34,
        pendingTestimonials: 5,
        faqItems: 28,

        // Impact
        impactMetrics: 12,
        successStories: 8,

        // Today's numbers
        todayVisitors: 342,
        todayInquiries: 4,
        todayEnrollments: 3,
        todayPageViews: 1856
    };

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit'
    });

    // Extract data from dashboard
    const stats = dashboardData?.stats || {};
    const revenueChart = dashboardData?.revenueChart || [];
    const revenueBreakdown = dashboardData?.revenueBreakdown || {};
    const refundData = dashboardData?.refundData || {};
    const weeklyRevenue = stats.totalRevenue ? (Number(stats.totalRevenue) * 0.08).toFixed(0) : 0;
    const weeklyGrowth = 12.5;

    // Extract real activity and pending data from dashboard
    const recentActivityData = dashboardData?.recentActivity || [];
    const pendingItems = dashboardData?.pendingActions || [];

    // Quick Action Links for Regular Admin
    const quickActions = [
        { label: 'Hero Slides', icon: Image, path: '/admin/content/hero', color: 'from-pink-500 to-rose-500', description: 'Edit homepage banners' },
        { label: 'Training Courses', icon: GraduationCap, path: '/admin/training', color: 'from-blue-500 to-blue-600', description: 'Manage curriculum' },
        { label: 'Job Listings', icon: Briefcase, path: '/admin/jobs', color: 'from-orange-500 to-amber-500', description: 'Post & edit jobs' },
        { label: 'Blog Articles', icon: BookOpen, path: '/admin/blog', color: 'from-purple-500 to-violet-500', description: 'Create content' },
        { label: 'Gallery', icon: Image, path: '/admin/gallery', color: 'from-emerald-500 to-green-500', description: 'Upload media' },
        { label: 'Testimonials', icon: Quote, path: '/admin/testimonials', color: 'from-amber-500 to-yellow-500', description: 'Manage reviews' },
        { label: 'FAQ', icon: HelpCircle, path: '/admin/faq', color: 'from-cyan-500 to-teal-500', description: 'Update questions' },
        { label: 'Projects', icon: FolderKanban, path: '/admin/projects', color: 'from-slate-500 to-gray-600', description: 'Manage portfolio' },
        { label: 'Enrollments', icon: FileText, path: '/admin/enrollments', color: 'from-indigo-500 to-blue-500', description: 'Review applications' },
        { label: 'Partnerships', icon: Handshake, path: '/admin/partnerships', color: 'from-teal-500 to-cyan-500', description: 'View requests' },
        { label: 'Impact Stories', icon: TrendingUp, path: '/admin/impact', color: 'from-green-500 to-emerald-500', description: 'Track impact' },
        { label: 'Newsletter', icon: Mail, path: '/admin/newsletter', color: 'from-rose-500 to-pink-500', description: 'Send updates' },
    ];

    // Map icon for pending actions based on category
    const getCategoryIcon = (category) => {
        const iconMap = {
            'KYC': Users,
            'Payments': CreditCard,
            'Applications': Briefcase,
            'Projects': FolderKanban,
            'Contact Form': Mail,
            'Training': GraduationCap,
            'Partnerships': Handshake,
            'Newsletter': Mail
        };
        return iconMap[category] || Inbox;
    };
    
    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'high': return { bg: 'bg-red-50', text: 'text-red-600' };
            case 'medium': return { bg: 'bg-amber-50', text: 'text-amber-600' };
            case 'low': return { bg: 'bg-gray-50', text: 'text-gray-600' };
            default: return { bg: 'bg-gray-50', text: 'text-gray-600' };
        }
    };

    return (
        <div className="space-y-3 md:space-y-6 pb-8">
            {/* Welcome Header */}
            <div className="bg-gradient-to-br from-[#004fa2] via-[#0058b5] to-[#0066cc] rounded-xl p-2 md:p-4 lg:p-5 lg:p-6 text-white relative overflow-hidden shadow-md">
                {/* Subtle Decorative Element */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-lg md:text-xl font-bold">
                                    {greeting}, {user?.firstName || (user?.name ? user.name.split(' ')[0] : '') || 'Admin'}
                                </h1>
                                <span className="px-2 py-0.5 bg-green-500/20 text-green-300 rounded-full text-[10px] font-medium">Content Manager</span>
                            </div>
                            <p className="text-blue-200 text-xs md:text-sm">
                                {formattedDate} • <span className="text-white font-semibold">{formattedTime}</span>
                            </p>
                            <div className="mt-2 flex items-center flex-wrap gap-x-3 gap-y-1 text-xs">
                                <span className="flex items-center gap-1.5 text-blue-200">
                                    <Eye size={13} />
                                    <span className="font-bold text-white">{metrics.todayVisitors}</span> visitors
                                </span>
                                <span className="text-blue-400/60">•</span>
                                <span className="flex items-center gap-1.5 text-blue-200">
                                    <Inbox size={13} />
                                    <span className="font-bold text-yellow-300">{metrics.pendingInquiries}</span> inquiries
                                </span>
                                <span className="text-blue-400/60">•</span>
                                <span className="flex items-center gap-1.5 text-blue-200">
                                    <FileText size={13} />
                                    <span className="font-bold text-green-300">{metrics.todayEnrollments}</span> enrollments
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2 shrink-0">
                            <button
                                onClick={handleRefresh}
                                className="bg-white/10 hover:bg-white/20 border border-white/15 text-white p-2 rounded-lg text-sm transition-all"
                                title="Refresh"
                            >
                                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                            </button>
                            <Link
                                to="/admin/contact-inquiries"
                                className="bg-white/10 hover:bg-white/20 border border-white/15 text-white p-2 rounded-lg text-sm transition-all relative"
                                title="Inbox"
                            >
                                <Inbox size={16} />
                                {metrics.pendingInquiries > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] px-1 py-0.5 rounded-full font-bold min-w-[16px] text-center leading-none">
                                        {metrics.pendingInquiries}
                                    </span>
                                )}
                            </Link>
                            <Link
                                to="/admin/blog"
                                className="bg-white hover:bg-gray-100 text-[#004fa2] px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                            >
                                <Plus size={14} />
                                <span className="hidden sm:inline">New Post</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-amber-800">{error}</p>
                </div>
            )}

            {/* REVENUE SECTION - NOW WITH REAL API DATA */}
            {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Revenue Card (4 cols) */}
                    <div className="md:col-span-4">
                        <FinancialCard
                            totalRevenue={stats.totalRevenue || 0}
                            weeklyRevenue={weeklyRevenue}
                            weeklyGrowth={weeklyGrowth}
                        />
                    </div>

                    {/* Revenue Chart (5 cols) */}
                    <div className="md:col-span-5">
                        <ChartCard
                            title="Revenue Trend"
                            subtitle="Last 6 months"
                            data={revenueChart}
                            color="#10b981"
                        />
                    </div>

                    {/* Revenue Breakdown (3 cols) */}
                    <div className="md:col-span-3">
                        <RevenueBreakdownCard breakdown={revenueBreakdown} />
                    </div>

                    {/* Refunds & Cancellations (6 cols) */}
                    <div className="md:col-span-6">
                        <RefundTrackerCard refundData={refundData} />
                    </div>
                </div>
            )}

            {/* Summary Statistics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-4">
                {[
                    { label: 'Courses', value: metrics.totalCourses, icon: GraduationCap, iconColor: 'text-blue-600', link: '/admin/training' },
                    { label: 'Jobs', value: metrics.totalJobs, icon: Briefcase, iconColor: 'text-orange-600', link: '/admin/jobs' },
                    { label: 'Blog Posts', value: metrics.blogPosts, icon: BookOpen, iconColor: 'text-purple-600', link: '/admin/blog' },
                    { label: 'Projects', value: metrics.projects, icon: FolderKanban, iconColor: 'text-cyan-600', link: '/admin/projects' },
                    { label: 'Inquiries', value: metrics.pendingInquiries, icon: Inbox, iconColor: 'text-indigo-600', link: '/admin/contact-inquiries' },
                    { label: 'Gallery', value: metrics.galleryImages, icon: Image, iconColor: 'text-emerald-600', link: '/admin/gallery' },
                    { label: 'Enrollments', value: metrics.activeEnrollments, icon: FileText, iconColor: 'text-slate-600', link: '/admin/enrollments' },
                ].map((stat, i) => (
                    <Link
                        key={i}
                        to={stat.link}
                        className="group bg-white rounded-xl p-2.5 sm:p-3 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#004fa2] transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between"
                    >
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                            <stat.icon className={`${stat.iconColor} group-hover:scale-110 transition-transform duration-300 flex-shrink-0 w-3.5 h-3.5 sm:w-5 sm:h-5`} />
                            <p className="text-base sm:text-xl font-bold text-gray-900 truncate">
                                {stat.value.toLocaleString()}
                            </p>
                        </div>
                        <p className="text-[9px] sm:text-[10px] font-semibold text-gray-500 uppercase tracking-wide truncate">
                            {stat.label}
                        </p>
                    </Link>
                ))}
            </div>



            {/* Two Column Layout: Pending Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pending Actions — Takes 2 columns */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <div className="flex items-center gap-3">
                            <h3 className="font-bold text-gray-900 text-sm">Pending Actions</h3>
                            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {pendingItems.length} items
                            </span>
                        </div>
                        <Link to="/admin/contact-inquiries" className="text-xs text-[#004fa2] hover:underline flex items-center gap-1 font-medium">
                            View All <ArrowRight size={12} />
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {pendingItems.length > 0 ? (
                            pendingItems.map((item, i) => {
                                const Icon = getCategoryIcon(item.category);
                                const colors = getPriorityColor(item.priority);
                                return (
                                    <div key={i} className="p-3 hover:bg-gray-50 transition-colors flex items-center gap-3">
                                        <div className={`w-6 h-6 md:w-8 md:h-8 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                            <Icon className={colors.text} size={14} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                                            <p className="text-[10px] text-gray-500">{item.category}</p>
                                        </div>
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${colors.bg} ${colors.text}`}>
                                                {item.priority}
                                            </span>
                                            <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-6 text-center text-gray-500">
                                <p className="text-sm">No pending actions</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-bold text-gray-900 text-sm">Recent Activity</h3>
                        <span className="text-[10px] text-gray-400">Last 24 hours</span>
                    </div>
                    <div className="divide-y divide-gray-50 max-h-[350px] overflow-y-auto">
                        {recentActivityData.length > 0 ? (
                            recentActivityData.map((activity, i) => {
                                const typeIconMap = {
                                    payment: CreditCard,
                                    inquiry: Mail,
                                    enrollment: GraduationCap,
                                    user: UserPlus
                                };
                                const typeColorMap = {
                                    payment: { bg: 'bg-green-50', text: 'text-green-600' },
                                    inquiry: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
                                    enrollment: { bg: 'bg-blue-50', text: 'text-blue-600' },
                                    user: { bg: 'bg-purple-50', text: 'text-purple-600' }
                                };
                                const Icon = typeIconMap[activity.type] || Mail;
                                const colors = typeColorMap[activity.type] || { bg: 'bg-gray-50', text: 'text-gray-600' };
                                return (
                                    <div key={i} className="p-3 hover:bg-gray-50 transition">
                                        <div className="flex items-start gap-2.5">
                                            <div className={`w-6 h-6 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                                <Icon className={colors.text} size={12} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                                                <p className="text-[10px] text-gray-500 truncate">{activity.description || activity.user}</p>
                                            </div>
                                            <span className="text-[10px] text-gray-400 whitespace-nowrap">{activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'Just now'}</span>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-6 text-center text-gray-500">
                                <p className="text-sm">No recent activity</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-5">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">
                    Quick Actions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {quickActions.map((action, i) => (
                        <Link
                            key={i}
                            to={action.path}
                            className="group p-2.5 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all bg-gray-50/80 hover:bg-white flex items-center gap-2.5"
                        >
                            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-md bg-gradient-to-br ${action.color} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                                <action.icon className="text-white" size={14} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-[11px] font-semibold text-gray-700 group-hover:text-gray-900 block truncate leading-tight">{action.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bottom Section: Key Areas Needing Attention */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Contact Inquiries - Real Data */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                            <Inbox size={16} className="text-indigo-600" />
                            Contact Inquiries
                        </h4>
                        <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{stats.totalInquiries || 0}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 truncate">Unread messages from the contact form</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {recentActivityData.slice(0, 3).map((activity, i) => (
                                    <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                                        {(activity.user || activity.description || '?').charAt(0).toUpperCase()}
                                    </div>
                                ))}
                            </div>
                            <span className="text-[10px] text-gray-500">{Math.max(0, (stats.totalInquiries || 0) - 3)} more</span>
                        </div>
                        <Link to="/admin/contact-inquiries" className="text-xs text-[#004fa2] font-semibold hover:underline flex items-center gap-1">
                            View <ArrowRight size={12} />
                        </Link>
                    </div>
                </div>

                {/* Pending Enrollments - Real Data */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                            <GraduationCap size={16} className="text-blue-600" />
                            Pending Enrollments
                        </h4>
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{stats.enrollments?.pending || 0}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 truncate">New applications to review</p>
                    <div className="flex items-center justify-between">
                        <div className="text-[10px] text-gray-500">
                            <span className="font-bold text-green-600">{stats.enrollments?.approved || 0}</span> approved enrollments
                        </div>
                        <Link to="/admin/enrollments" className="text-xs text-[#004fa2] font-semibold hover:underline flex items-center gap-1">
                            View <ArrowRight size={12} />
                        </Link>
                    </div>
                </div>

                {/* Partnership Requests - Real Data */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                            <Handshake size={16} className="text-teal-600" />
                            Partnership Requests
                        </h4>
                        <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{stats.pendingPartnerships || 0}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 truncate">Organizations interested in partnering</p>
                    <div className="flex items-center justify-between">
                        <div className="text-[10px] text-gray-500">
                            <span className="font-bold text-teal-600">{stats.totalPartnerships || 0}</span> total partnerships
                        </div>
                        <Link to="/admin/partnerships" className="text-xs text-[#004fa2] font-semibold hover:underline flex items-center gap-1">
                            View <ArrowRight size={12} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content Status Overview */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-sm">
                        Content Status Overview
                    </h3>
                    <span className="text-[10px] text-gray-400">All managed areas</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {[
                        { label: 'Hero Slides', icon: Image, status: 'live', count: 5, color: 'text-pink-600', bg: 'bg-pink-50' },
                        { label: 'Services', icon: Briefcase, status: 'live', count: 6, color: 'text-orange-600', bg: 'bg-orange-50' },
                        { label: 'Blog Drafts', icon: BookOpen, status: 'draft', count: metrics.draftPosts, color: 'text-purple-600', bg: 'bg-purple-50' },
                        { label: 'Testimonials', icon: MessageCircle, status: 'pending', count: metrics.pendingTestimonials, color: 'text-amber-600', bg: 'bg-amber-50' },
                        { label: 'FAQ Items', icon: HelpCircle, status: 'live', count: metrics.faqItems, color: 'text-cyan-600', bg: 'bg-cyan-50' },
                        { label: 'Impact Stories', icon: TrendingUp, status: 'live', count: metrics.successStories, color: 'text-green-600', bg: 'bg-green-50' },
                    ].map((item, i) => (
                        <div key={i} className="p-2.5 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all bg-gray-50/80 flex items-center gap-2.5">
                            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-md shrink-0 flex items-center justify-center ${item.bg}`}>
                                <item.icon className={item.color} size={14} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1 mb-0.5">
                                    <span className="text-[10px] text-gray-500 font-medium truncate">{item.label}</span>
                                    <span className={`text-[8px] font-bold uppercase px-1.5 py-[1px] rounded-full shrink-0 ${item.status === 'live' ? 'bg-green-100 text-green-700' :
                                            item.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                                                'bg-blue-100 text-blue-700'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-gray-900 leading-none">{item.count}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RegularAdminDashboard;



