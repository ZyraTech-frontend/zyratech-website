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
import { trainingCourses } from '../../../data/trainingCourses';
import { jobsData } from '../../../data/jobsData';

const RegularAdminDashboard = ({ user }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const hour = currentDate.getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');
    }, [currentDate]);

    const handleRefresh = () => {
        setIsRefreshing(true);
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

    // Recent Activity Feed
    const recentActivity = [
        { type: 'inquiry', message: 'New contact form submission', detail: 'Training program inquiry', time: '5 mins ago', icon: Mail, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { type: 'enrollment', message: 'Enrollment application received', detail: 'Web Development Bootcamp', time: '18 mins ago', icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-50' },
        { type: 'testimonial', message: 'New testimonial submitted', detail: 'Awaiting approval', time: '45 mins ago', icon: MessageCircle, color: 'text-amber-500', bg: 'bg-amber-50' },
        { type: 'partnership', message: 'Partnership request received', detail: 'InnovateTech Ltd', time: '1 hour ago', icon: Handshake, color: 'text-teal-500', bg: 'bg-teal-50' },
        { type: 'blog', message: 'Blog post draft saved', detail: '"AI in Education: 2025 Trends"', time: '2 hours ago', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-50' },
        { type: 'job', message: 'Job listing updated', detail: 'Senior Developer position', time: '3 hours ago', icon: Briefcase, color: 'text-orange-500', bg: 'bg-orange-50' },
        { type: 'gallery', message: 'New images uploaded', detail: '4 images added to gallery', time: '4 hours ago', icon: Image, color: 'text-pink-500', bg: 'bg-pink-50' },
        { type: 'newsletter', message: 'Newsletter draft created', detail: 'Monthly update - February', time: '5 hours ago', icon: Mail, color: 'text-cyan-500', bg: 'bg-cyan-50' }
    ];

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

    // Pending items that need attention
    const pendingItems = [
        { title: 'New Job Application: Senior Developer', source: 'Applications', time: '10 mins ago', priority: 'high', icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-50' },
        { title: 'Course Inquiry: Data Science Program', source: 'Contact Form', time: '25 mins ago', priority: 'medium', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Testimonial Awaiting Approval', source: 'Testimonials', time: '1 hour ago', priority: 'low', icon: MessageCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
        { title: 'Blog Post Draft: Review Required', source: 'Content', time: '2 hours ago', priority: 'medium', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
        { title: 'Partnership Application: TechStart Ghana', source: 'Partnerships', time: '3 hours ago', priority: 'medium', icon: Handshake, color: 'text-teal-600', bg: 'bg-teal-50' },
        { title: 'Gallery images need alt text', source: 'Gallery', time: 'Yesterday', priority: 'low', icon: Image, color: 'text-pink-600', bg: 'bg-pink-50' },
    ];

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
                                    {greeting}, {user?.name?.split(' ')[0] || 'Admin'}
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

            {/* Summary Statistics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-4">
                {[
                    { label: 'Courses', value: metrics.totalCourses, icon: GraduationCap, iconColor: 'text-blue-600', link: '/admin/training' },
                    { label: 'Jobs', value: metrics.totalJobs, icon: Briefcase, iconColor: 'text-orange-600', link: '/admin/jobs' },
                    { label: 'Blog Posts', value: metrics.blogPosts, icon: BookOpen, iconColor: 'text-purple-600', link: '/admin/blog' },
                    { label: 'Projects', value: metrics.projects, icon: FolderKanban, iconColor: 'text-cyan-600', link: '/admin/projects' },
                    { label: 'Inquiries', value: metrics.pendingInquiries, icon: Inbox, iconColor: 'text-indigo-600', link: '/admin/contact-inquiries' },
                    { label: 'Messages', value: metrics.unreadMessages, icon: MessageSquare, iconColor: 'text-rose-600', link: '/admin/messages' },
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

            {/* Main Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {/* Content Overview Card */}
                <div className="bg-[#004fa2] rounded-xl p-3 text-white shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded flex items-center justify-center backdrop-blur-sm shadow-sm">
                            <Layout className="text-white" size={16} />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="flex items-center gap-0.5 text-[9px] font-bold text-green-300 bg-green-500/30 px-1.5 py-0.5 rounded-full">
                                <ArrowUpRight size={10} /> +12%
                            </span>
                        </div>
                    </div>

                    <p className="text-blue-200 text-[10px] font-semibold uppercase tracking-wide mb-0.5">Content Items</p>
                    <h3 className="text-xl font-bold mb-0.5 tracking-tight">
                        {(metrics.totalJobs + metrics.blogPosts + metrics.galleryImages + metrics.projects).toLocaleString()}
                    </h3>

                    <div className="mt-2 pt-2 border-t border-white/20">
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px]">
                            <div className="flex items-center justify-between">
                                <span className="text-blue-200">Jobs</span>
                                <span className="font-bold text-white">{metrics.totalJobs}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-blue-200">Blog</span>
                                <span className="font-bold text-white">{metrics.blogPosts}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-blue-200">Gallery</span>
                                <span className="font-bold text-white">{metrics.galleryImages}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-blue-200">Projects</span>
                                <span className="font-bold text-white">{metrics.projects}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inquiries & Messages Card */}
                <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded flex items-center justify-center shadow-sm">
                            <MessageSquare className="text-white" size={16} />
                        </div>
                        <div className="flex flex-col items-end">
                            {metrics.pendingInquiries > 0 && (
                                <span className="flex items-center gap-0.5 text-[9px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded-full">
                                    <Bell size={10} /> {metrics.pendingInquiries} new
                                </span>
                            )}
                        </div>
                    </div>

                    <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-wide mb-0.5">Communications</p>
                    <h3 className="text-xl font-bold text-gray-900 mb-0.5">
                        {(metrics.pendingInquiries + metrics.unreadMessages + metrics.partnershipRequests).toLocaleString()}
                    </h3>

                    <div className="mt-2 pt-2 border-t border-gray-100 space-y-1.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                                <span className="text-[10px] text-gray-600 font-medium">Inquiries</span>
                            </div>
                            <span className="text-[10px] font-bold text-indigo-600">{metrics.pendingInquiries}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                <span className="text-[10px] text-gray-600 font-medium">Messages</span>
                            </div>
                            <span className="text-[10px] font-bold text-blue-600">{metrics.unreadMessages}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                                <span className="text-[10px] text-gray-600 font-medium">Partnerships</span>
                            </div>
                            <span className="text-[10px] font-bold text-teal-600">{metrics.partnershipRequests}</span>
                        </div>
                    </div>
                </div>

                {/* Enrollments Card */}
                <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center shadow-sm">
                            <GraduationCap className="text-white" size={16} />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="flex items-center gap-0.5 text-[9px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded-full">
                                <Clock size={10} /> {metrics.pendingEnrollments} pending
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-wide mb-0.5">Total Enrollments</p>
                    <h3 className="text-xl font-bold text-gray-900 mb-0.5">
                        {metrics.totalEnrollments.toLocaleString()}
                    </h3>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[9px] text-gray-500 font-medium">Completed</span>
                                <span className="text-[9px] font-bold text-green-600">{metrics.completedEnrollments}</span>
                            </div>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full" style={{ width: `${(metrics.completedEnrollments / metrics.totalEnrollments) * 100}%` }}></div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[9px] text-gray-500 font-medium">Active</span>
                                <span className="text-[9px] font-bold text-blue-600">{metrics.activeEnrollments}</span>
                            </div>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full" style={{ width: `${(metrics.activeEnrollments / metrics.totalEnrollments) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Today's Activity Card */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-3 text-white shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-white/10 rounded flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-sm">
                                <Activity className="text-white" size={16} />
                            </div>
                            <span className="flex items-center gap-0.5 text-[9px] font-bold text-green-300 bg-green-500/20 px-1.5 py-0.5 rounded-full backdrop-blur-sm border border-green-400/30">
                                <Zap size={10} /> Live
                            </span>
                        </div>

                        <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide mb-0.5">Today's Snapshot</p>
                        <h3 className="text-xl font-bold mb-0 leading-none">{metrics.todayPageViews.toLocaleString()}</h3>
                        <p className="text-[9px] text-slate-400 mb-2">page views</p>
                    </div>

                    <div className="mt-auto pt-2 border-t border-white/10 grid grid-cols-2 gap-1.5 text-[10px]">
                        <div className="bg-slate-800/50 p-2 rounded text-center">
                            <span className="block text-slate-500 uppercase mb-0.5 text-[8px]">Visitors</span>
                            <span className="text-sm font-bold text-white">{metrics.todayVisitors}</span>
                        </div>
                        <div className="bg-slate-800/50 p-2 rounded text-center">
                            <span className="block text-slate-500 uppercase mb-0.5 text-[8px]">Inquiries</span>
                            <span className="text-sm font-bold text-yellow-400">{metrics.todayInquiries}</span>
                        </div>
                    </div>
                </div>
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
                        {pendingItems.map((item, i) => (
                            <div key={i} className="p-3 hover:bg-gray-50 transition-colors flex items-center gap-3">
                                <div className={`w-6 h-6 md:w-8 md:h-8 ${item.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                    <item.icon className={item.color} size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                                    <p className="text-[10px] text-gray-500">{item.source}</p>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.priority === 'high' ? 'bg-red-100 text-red-700' :
                                            item.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                                                'bg-gray-100 text-gray-600'
                                        }`}>
                                        {item.priority}
                                    </span>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-bold text-gray-900 text-sm">Recent Activity</h3>
                        <span className="text-[10px] text-gray-400">Last 24 hours</span>
                    </div>
                    <div className="divide-y divide-gray-50 max-h-[350px] overflow-y-auto">
                        {recentActivity.map((activity, i) => (
                            <div key={i} className="p-3 hover:bg-gray-50 transition">
                                <div className="flex items-start gap-2.5">
                                    <div className={`w-6 h-6 ${activity.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                        <activity.icon className={activity.color} size={12} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{activity.message}</p>
                                        <p className="text-[10px] text-gray-500 truncate">{activity.detail}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{activity.time}</span>
                                </div>
                            </div>
                        ))}
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
                {/* Pending Inquiries */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                            <Inbox size={16} className="text-indigo-600" />
                            Contact Inquiries
                        </h4>
                        <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{metrics.pendingInquiries}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 truncate">Unread messages from the contact form</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                                        {['K', 'A', 'E'][i]}
                                    </div>
                                ))}
                            </div>
                            <span className="text-[10px] text-gray-500">+{metrics.pendingInquiries - 3} more</span>
                        </div>
                        <Link to="/admin/contact-inquiries" className="text-xs text-[#004fa2] font-semibold hover:underline flex items-center gap-1">
                            View <ArrowRight size={12} />
                        </Link>
                    </div>
                </div>

                {/* Pending Enrollments */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                            <GraduationCap size={16} className="text-blue-600" />
                            Pending Enrollments
                        </h4>
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{metrics.pendingEnrollments}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 truncate">New applications to review</p>
                    <div className="flex items-center justify-between">
                        <div className="text-[10px] text-gray-500">
                            <span className="font-bold text-green-600">{metrics.completedEnrollments}</span> completed this year
                        </div>
                        <Link to="/admin/enrollments" className="text-xs text-[#004fa2] font-semibold hover:underline flex items-center gap-1">
                            View <ArrowRight size={12} />
                        </Link>
                    </div>
                </div>

                {/* Partnership Requests */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                            <Handshake size={16} className="text-teal-600" />
                            Partnership Requests
                        </h4>
                        <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{metrics.partnershipRequests}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 truncate">Organizations interested in partnering</p>
                    <div className="flex items-center justify-between">
                        <div className="text-[10px] text-gray-500">
                            <span className="font-bold text-teal-600">{metrics.newsletterSubs.toLocaleString()}</span> newsletter subscribers
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
