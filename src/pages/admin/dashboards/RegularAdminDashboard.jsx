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
        <div className="space-y-6 pb-8">
            {/* Premium Welcome Header */}
            <div className="bg-gradient-to-br from-[#004fa2] via-[#0058b5] to-[#0066cc] rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full blur-3xl -ml-12 -mb-12 pointer-events-none"></div>
                <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-blue-200 text-sm font-medium mb-3 uppercase tracking-wider">
                                <Sparkles size={16} className="text-yellow-300" />
                                <span>Admin Dashboard</span>
                                <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-300 rounded-full text-xs">Content Manager</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                {greeting}, {user?.name?.split(' ')[0] || 'Admin'}
                            </h1>
                            <p className="text-blue-100 max-w-xl text-lg">
                                {formattedDate} • <span className="text-white font-semibold">{formattedTime}</span>
                            </p>
                            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                                <span className="flex items-center gap-2 text-blue-200">
                                    <Eye size={16} />
                                    <span className="font-bold text-white">{metrics.todayVisitors}</span> visitors today
                                </span>
                                <span className="text-blue-400">|</span>
                                <span className="flex items-center gap-2 text-blue-200">
                                    <Inbox size={16} />
                                    <span className="font-bold text-yellow-300">{metrics.pendingInquiries}</span> pending inquiries
                                </span>
                                <span className="text-blue-400">|</span>
                                <span className="flex items-center gap-2 text-blue-200">
                                    <FileText size={16} />
                                    <span className="font-bold text-green-300">{metrics.todayEnrollments}</span> new enrollments
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleRefresh}
                                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
                            >
                                <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
                                Refresh
                            </button>
                            <Link
                                to="/admin/contact-inquiries"
                                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
                            >
                                <Inbox size={18} />
                                Inbox
                                {metrics.pendingInquiries > 0 && (
                                    <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center">
                                        {metrics.pendingInquiries}
                                    </span>
                                )}
                            </Link>
                            <Link
                                to="/admin/blog"
                                className="bg-white hover:bg-gray-100 text-[#004fa2] px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center gap-2"
                            >
                                <Plus size={18} />
                                New Post
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Statistics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
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
                        className="group bg-white rounded-xl p-3 md:p-4 border border-gray-200 shadow-sm hover:shadow-xl hover:scale-105 hover:border-[#004fa2] transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between"
                    >
                        <div className="flex items-center gap-2 mb-2 md:mb-3">
                            <stat.icon className={`${stat.iconColor} group-hover:scale-110 transition-transform duration-300 flex-shrink-0 w-5 h-5 md:w-6 md:h-6`} />
                            <p className="text-xl md:text-2xl font-extrabold text-gray-900 transition-all duration-300 truncate">
                                {stat.value.toLocaleString()}
                            </p>
                        </div>
                        <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide group-hover:text-[#004fa2] transition-colors duration-300 truncate">
                            {stat.label}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Main Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Content Overview Card */}
                <div className="bg-[#004fa2] rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                            <Layout className="text-white" size={28} />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className="flex items-center gap-1.5 text-xs font-bold text-green-300 bg-green-500/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                                <ArrowUpRight size={14} /> +12%
                            </span>
                            <span className="text-xs text-blue-200">vs last week</span>
                        </div>
                    </div>

                    <p className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-2">Content Items</p>
                    <h3 className="text-4xl font-black mb-1 tracking-tight">
                        {(metrics.totalJobs + metrics.blogPosts + metrics.galleryImages + metrics.projects).toLocaleString()}
                    </h3>

                    <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="grid grid-cols-2 gap-3 text-sm">
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
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <MessageSquare className="text-white" size={28} />
                        </div>
                        <div className="flex flex-col items-end">
                            {metrics.pendingInquiries > 0 && (
                                <span className="flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-100 px-3 py-1.5 rounded-full">
                                    <Bell size={12} /> {metrics.pendingInquiries} new
                                </span>
                            )}
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Communications</p>
                    <h3 className="text-4xl font-black text-gray-900 mb-1">
                        {(metrics.pendingInquiries + metrics.unreadMessages + metrics.partnershipRequests).toLocaleString()}
                    </h3>

                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                <span className="text-sm text-gray-600 font-medium">Inquiries</span>
                            </div>
                            <span className="text-sm font-bold text-indigo-600">{metrics.pendingInquiries}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-gray-600 font-medium">Messages</span>
                            </div>
                            <span className="text-sm font-bold text-blue-600">{metrics.unreadMessages}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                <span className="text-sm text-gray-600 font-medium">Partnerships</span>
                            </div>
                            <span className="text-sm font-bold text-teal-600">{metrics.partnershipRequests}</span>
                        </div>
                    </div>
                </div>

                {/* Enrollments Card */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <GraduationCap className="text-white" size={28} />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full">
                                <Clock size={12} /> {metrics.pendingEnrollments} pending
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Enrollments</p>
                    <h3 className="text-4xl font-black text-gray-900 mb-1">
                        {metrics.totalEnrollments.toLocaleString()}
                    </h3>

                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-500 font-medium">Completed</span>
                                <span className="text-xs font-bold text-green-600">{metrics.completedEnrollments}</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full" style={{ width: `${(metrics.completedEnrollments / metrics.totalEnrollments) * 100}%` }}></div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-500 font-medium">Active</span>
                                <span className="text-xs font-bold text-blue-600">{metrics.activeEnrollments}</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full" style={{ width: `${(metrics.activeEnrollments / metrics.totalEnrollments) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Today's Activity Card */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg">
                            <Activity className="text-white" size={28} />
                        </div>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-green-300 bg-green-500/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-green-400/30">
                            <Zap size={12} /> Live
                        </span>
                    </div>

                    <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Today's Snapshot</p>
                    <h3 className="text-4xl font-black mb-1 tracking-tight">{metrics.todayPageViews.toLocaleString()}</h3>
                    <p className="text-sm text-slate-400 mb-0">page views</p>

                    <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-800/50 p-3 rounded-lg text-center">
                            <span className="block text-slate-500 uppercase mb-1">Visitors</span>
                            <span className="text-lg font-bold text-white">{metrics.todayVisitors}</span>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg text-center">
                            <span className="block text-slate-500 uppercase mb-1">Inquiries</span>
                            <span className="text-lg font-bold text-yellow-400">{metrics.todayInquiries}</span>
                        </div>
                    </div>

                    {/* Mini activity chart */}
                    <div className="mt-3 flex items-end gap-1 h-8">
                        {[30, 45, 35, 60, 50, 75, 55, 80, 65, 70, 85, 90].map((h, i) => (
                            <div key={i} className="flex-1 bg-white/20 rounded-t hover:bg-white/40 transition-all duration-200" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Two Column Layout: Pending Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pending Actions — Takes 2 columns */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <h3 className="font-bold text-gray-900">Pending Actions</h3>
                            <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">
                                {pendingItems.length} items
                            </span>
                        </div>
                        <Link to="/admin/contact-inquiries" className="text-sm text-[#004fa2] hover:underline flex items-center gap-1 font-medium">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {pendingItems.map((item, i) => (
                            <div key={i} className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                                <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                    <item.icon className={item.color} size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.source}</p>
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
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Recent Activity</h3>
                        <span className="text-xs text-gray-400">Last 24 hours</span>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
                        {recentActivity.map((activity, i) => (
                            <div key={i} className="p-4 hover:bg-gray-50 transition">
                                <div className="flex items-start gap-3">
                                    <div className={`w-8 h-8 ${activity.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                                        <activity.icon className={activity.color} size={14} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{activity.message}</p>
                                        <p className="text-xs text-gray-500">{activity.detail}</p>
                                    </div>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <Zap size={18} className="text-amber-500" />
                    Quick Actions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {quickActions.map((action, i) => (
                        <Link
                            key={i}
                            to={action.path}
                            className="group p-4 rounded-xl border border-gray-200 hover:border-transparent hover:shadow-lg transition-all bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-white text-center"
                        >
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                                <action.icon className="text-white" size={20} />
                            </div>
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 block">{action.label}</span>
                            <span className="text-[10px] text-gray-400 mt-0.5 block">{action.description}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bottom Section: Key Areas Needing Attention */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pending Inquiries */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                            <Inbox size={18} className="text-indigo-600" />
                            Contact Inquiries
                        </h4>
                        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full">{metrics.pendingInquiries}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Unread messages from the contact form</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                                        {['K', 'A', 'E'][i]}
                                    </div>
                                ))}
                            </div>
                            <span className="text-xs text-gray-500">+{metrics.pendingInquiries - 3} more</span>
                        </div>
                        <Link to="/admin/contact-inquiries" className="text-sm text-[#004fa2] font-semibold hover:underline flex items-center gap-1">
                            View <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* Pending Enrollments */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                            <GraduationCap size={18} className="text-blue-600" />
                            Pending Enrollments
                        </h4>
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">{metrics.pendingEnrollments}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">New enrollment applications to review</p>
                    <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                            <span className="font-bold text-green-600">{metrics.completedEnrollments}</span> completed this year
                        </div>
                        <Link to="/admin/enrollments" className="text-sm text-[#004fa2] font-semibold hover:underline flex items-center gap-1">
                            View <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* Partnership Requests */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                            <Handshake size={18} className="text-teal-600" />
                            Partnership Requests
                        </h4>
                        <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2 py-1 rounded-full">{metrics.partnershipRequests}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Organizations interested in partnering</p>
                    <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                            <span className="font-bold text-teal-600">{metrics.newsletterSubs.toLocaleString()}</span> newsletter subscribers
                        </div>
                        <Link to="/admin/partnerships" className="text-sm text-[#004fa2] font-semibold hover:underline flex items-center gap-1">
                            View <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content Status Overview */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <BarChart3 size={18} className="text-[#004fa2]" />
                        Content Status Overview
                    </h3>
                    <span className="text-xs text-gray-400">All managed content areas</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[
                        { label: 'Hero Slides', icon: Image, status: 'live', count: 5, color: 'text-pink-600', bg: 'bg-pink-50' },
                        { label: 'Services', icon: Briefcase, status: 'live', count: 6, color: 'text-orange-600', bg: 'bg-orange-50' },
                        { label: 'Blog Drafts', icon: BookOpen, status: 'draft', count: metrics.draftPosts, color: 'text-purple-600', bg: 'bg-purple-50' },
                        { label: 'Testimonials', icon: MessageCircle, status: 'pending', count: metrics.pendingTestimonials, color: 'text-amber-600', bg: 'bg-amber-50' },
                        { label: 'FAQ Items', icon: HelpCircle, status: 'live', count: metrics.faqItems, color: 'text-cyan-600', bg: 'bg-cyan-50' },
                        { label: 'Impact Stories', icon: TrendingUp, status: 'live', count: metrics.successStories, color: 'text-green-600', bg: 'bg-green-50' },
                    ].map((item, i) => (
                        <div key={i} className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-9 h-9 ${item.bg} rounded-lg flex items-center justify-center`}>
                                    <item.icon className={item.color} size={18} />
                                </div>
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${item.status === 'live' ? 'bg-green-100 text-green-700' :
                                        item.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                                            'bg-blue-100 text-blue-700'
                                    }`}>
                                    {item.status}
                                </span>
                            </div>
                            <p className="text-2xl font-black text-gray-900">{item.count}</p>
                            <p className="text-xs text-gray-500 font-medium mt-1">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RegularAdminDashboard;
