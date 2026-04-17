/**
 * Super Admin Dashboard - Complete Redesign
 * Premium high-level overview with financial metrics, system health, and strategic insights.
 * Exclusive to Super Admin role with full system visibility.
 */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Users,
    GraduationCap,
    TrendingUp,
    DollarSign,
    Calendar,
    MessageSquare,
    Activity,
    ArrowRight,
    Bell,
    Server,
    Shield,
    Database,
    Download,
    Briefcase,
    FolderKanban,
    CreditCard,
    Handshake,
    Settings,
    ClipboardList,
    FileBarChart,
    AlertTriangle,
    CheckCircle,
    Clock,
    Eye,
    Mail,
    Image,
    Star,
    Zap,
    RefreshCw,
    ExternalLink,
    BarChart3
} from 'lucide-react';
import { fetchSettings } from '../../../store/slices/settingsSlice';
import { trainingCourses } from '../../../data/trainingCourses';
import { jobsData } from '../../../data/jobsData';

const SuperAdminDashboard = ({ user }) => {
    const dispatch = useDispatch();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        dispatch(fetchSettings());
        const timer = setInterval(() => setCurrentDate(new Date()), 60000);
        return () => clearInterval(timer);
    }, [dispatch]);

    // Simulated refresh function
    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    // Comprehensive Metrics
    const metrics = {
        // Financial
        totalRevenue: 125840,
        monthlyRevenue: 28450,
        revenueGrowth: 8.2,
        pendingPayments: 12,
        completedPayments: 156,

        // Users
        totalUsers: 1458,
        activeAdmins: 5,
        newSignups: 23,

        // Training
        totalCourses: trainingCourses.length,
        activeEnrollments: 247,
        pendingEnrollments: 18,
        completedEnrollments: 892,

        // Jobs
        activeJobs: jobsData.length,
        applications: 34,
        positionsFilled: 8,

        // Projects
        activeProjects: 15,
        completedProjects: 42,
        pendingRequests: 7,

        // Communication
        unreadMessages: 8,
        contactForms: 12,
        partnershipRequests: 3,

        // System
        serverLoad: 42,
        uptime: 99.9,
        storageUsed: 450,
        storageTotal: 1000,
        apiLatency: 124,
        errorRate: 0.02,
        activeSessions: 1240,
        securityAlerts: 0
    };

    // Recent Activity Feed
    const recentActivity = [
        { type: 'payment', message: 'New payment received - Data Science Course', amount: 'GHS 2,500', time: '5 mins ago', icon: CreditCard, color: 'text-green-500', bg: 'bg-green-50' },
        { type: 'enrollment', message: 'New enrollment - Web Development Bootcamp', user: 'Kwame Asante', time: '12 mins ago', icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-50' },
        { type: 'user', message: 'New user registration', user: 'ama.mensah@email.com', time: '25 mins ago', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
        { type: 'project', message: 'Project request submitted', user: 'TechStart Ghana', time: '1 hour ago', icon: FolderKanban, color: 'text-orange-500', bg: 'bg-orange-50' },
        { type: 'partnership', message: 'Partnership application received', user: 'InnovateTech Ltd', time: '2 hours ago', icon: Handshake, color: 'text-cyan-500', bg: 'bg-cyan-50' },
        { type: 'message', message: 'New contact form submission', user: 'Training Inquiry', time: '3 hours ago', icon: Mail, color: 'text-indigo-500', bg: 'bg-indigo-50' }
    ];

    // Quick Action Links for Super Admin
    const quickActions = [
        { label: 'User Management', icon: Users, path: '/admin/users', color: 'from-purple-500 to-purple-600' },
        { label: 'System Settings', icon: Settings, path: '/admin/settings', color: 'from-gray-600 to-gray-700' },
        { label: 'Activity Logs', icon: ClipboardList, path: '/admin/activity-logs', color: 'from-amber-500 to-amber-600' },
        { label: 'Reports', icon: FileBarChart, path: '/admin/reports', color: 'from-teal-500 to-teal-600' },
        { label: 'Analytics', icon: BarChart3, path: '/admin/analytics', color: 'from-blue-500 to-blue-600' },
        { label: 'Payments', icon: CreditCard, path: '/admin/payments', color: 'from-green-500 to-green-600' }
    ];

    // Alerts (if any)
    const alerts = metrics.securityAlerts > 0 ? [
        { type: 'security', message: `${metrics.securityAlerts} security alert(s) detected`, severity: 'high' }
    ] : [];

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit'
    });

    return (
        <div className="space-y-3 md:space-y-6 pb-8">
            {/* Premium Welcome Header */}
            <div className="bg-gradient-to-br from-[#004fa2] via-[#0058b5] to-[#0066cc] rounded-xl p-2 md:p-4 lg:p-5 lg:p-6 text-white relative overflow-hidden shadow-md">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>
                <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 md:gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Star size={14} className="fill-yellow-300 text-yellow-300" />
                                <span className="text-blue-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Super Admin Dashboard</span>
                                <span className="ml-2 px-1.5 py-0.5 bg-green-500/20 text-green-300 rounded-full text-[9px] sm:text-[10px] font-bold">ALL SYSTEMS OPERATIONAL</span>
                            </div>
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">
                                Welcome back, {user?.name?.split(' ')[0] || 'Super'}
                            </h1>
                            <p className="text-blue-200 text-xs md:text-sm">
                                {formattedDate} • <span className="text-white font-semibold">{formattedTime}</span>
                            </p>
                            <div className="mt-3 flex items-center flex-wrap gap-x-3 gap-y-1 text-xs">
                                <span className="flex items-center gap-1.5 text-green-300 font-medium">
                                    <TrendingUp size={13} />
                                    Revenue <span className="font-bold">+{metrics.revenueGrowth}%</span>
                                </span>
                                <span className="text-blue-400/60 hidden sm:inline">•</span>
                                <span className="flex items-center gap-1.5 text-blue-200">
                                    <Activity size={13} />
                                    <span className="font-bold text-white">{metrics.activeSessions.toLocaleString()}</span> active sessions
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleRefresh}
                                className="bg-white/10 hover:bg-white/20 border border-white/15 text-white p-2 md:px-3 md:py-2 rounded-lg text-sm transition-all flex items-center gap-1.5"
                                title="Refresh"
                            >
                                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                                <span className="hidden md:inline font-bold text-xs">Refresh</span>
                            </button>
                            <Link to="/admin/reports" className="hidden md:flex bg-white/10 hover:bg-white/20 border border-white/15 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all items-center gap-1.5">
                                <Download size={16} />
                                Export
                            </Link>
                            <Link
                                to="/admin/analytics"
                                className="bg-white hover:bg-gray-100 text-[#004fa2] px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                            >
                                <BarChart3 size={16} />
                                <span className="hidden sm:inline">Analytics</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alerts Section (if any) */}
            {alerts.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="text-red-600" size={20} />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-red-800">Security Alert</h4>
                        <p className="text-red-600 text-sm">{alerts[0].message}</p>
                    </div>
                    <Link to="/admin/activity-logs" className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition">
                        View Details
                    </Link>
                </div>
            )}

            {/* Summary Statistics Row - Enhanced & Interactive */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-4">
                {[
                    { label: 'Courses', value: metrics.totalCourses, icon: GraduationCap, iconColor: 'text-blue-600', link: '/admin/training' },
                    { label: 'Jobs', value: metrics.activeJobs, icon: Briefcase, iconColor: 'text-orange-600', link: '/admin/jobs' },
                    { label: 'Enrollments', value: metrics.activeEnrollments, icon: Users, iconColor: 'text-purple-600', link: '/admin/enrollments' },
                    { label: 'Projects', value: metrics.activeProjects, icon: FolderKanban, iconColor: 'text-cyan-600', link: '/admin/projects' },
                    { label: 'Payments', value: metrics.completedPayments, icon: CreditCard, iconColor: 'text-green-600', link: '/admin/payments' },
                    { label: 'Messages', value: metrics.unreadMessages, icon: MessageSquare, iconColor: 'text-indigo-600', link: '/admin/messages' },
                    { label: 'Partners', value: metrics.partnershipRequests, icon: Handshake, iconColor: 'text-teal-600', link: '/admin/partnerships' },
                    { label: 'Users', value: metrics.totalUsers, icon: Users, iconColor: 'text-slate-600', link: '/admin/users' }
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

            {/* Main Metrics Cards - Ultra High Density Design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                {/* Total Revenue Card */}
                <div className="relative bg-gradient-to-br from-[#004fa2] via-[#0058b5] to-[#003d7a] rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none transition-transform group-hover:scale-110 duration-700"></div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-3">
                            <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
                                <DollarSign className="text-white drop-shadow-md" size={18} strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="flex items-center gap-1 text-[10px] font-bold text-green-300 bg-green-500/20 border border-green-400/30 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm opacity-90">
                                    <TrendingUp size={10} strokeWidth={3} /> +{metrics.revenueGrowth}%
                                </span>
                            </div>
                        </div>

                        <p className="text-blue-100/80 text-[10px] font-bold uppercase tracking-wider mb-0.5 shadow-sm">Total Revenue</p>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white drop-shadow-sm leading-none mb-3">
                            <span className="text-lg md:text-xl text-blue-200 font-bold mr-1">GHS</span>
                            {metrics.totalRevenue.toLocaleString()}
                        </h3>

                        <div className="mt-3 pt-3 border-t border-white/10">
                            <div className="flex items-center justify-between text-xs mb-2">
                                <span className="text-blue-200/80 text-[10px] font-medium uppercase tracking-wider">This month</span>
                                <span className="font-bold text-white text-xs tracking-wide">GHS {metrics.monthlyRevenue.toLocaleString()}</span>
                            </div>
                            {/* Premium Sparkline */}
                            <div className="flex items-end gap-0.5 h-6 w-full opacity-80 group-hover:opacity-100 transition-opacity">
                                {[40, 45, 50, 48, 55, 60, 68, 75, 72, 80, 85, 95].map((h, i) => (
                                    <div key={i} className="flex-1 bg-gradient-to-t from-white/20 to-white/40 rounded-t-sm hover:from-white/40 hover:to-white/70 transition-all duration-300 cursor-pointer" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enrollments Card */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col group">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 transition-colors duration-500">
                            <GraduationCap className="text-blue-600 group-hover:text-white transition-colors duration-500 drop-shadow-sm" size={18} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="flex items-center gap-1 text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100/50">
                                <Clock size={10} strokeWidth={2.5} /> {metrics.pendingEnrollments} pending
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Total Enrollments</p>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-none tracking-tight mb-3">
                        {(metrics.activeEnrollments + metrics.completedEnrollments).toLocaleString()}
                    </h3>

                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center gap-3">
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Completed</span>
                                <span className="text-[10px] font-black text-green-600">{metrics.completedEnrollments}</span>
                            </div>
                            <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-green-400 to-green-500 h-full rounded-full shadow-[0_0_8px_rgba(34,197,94,0.4)]" style={{ width: `${(metrics.completedEnrollments / (metrics.completedEnrollments + metrics.activeEnrollments)) * 100}%` }}></div>
                            </div>
                        </div>
                        <div className="w-px h-6 bg-gray-100"></div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Active</span>
                                <span className="text-[10px] font-black text-blue-600">{metrics.activeEnrollments}</span>
                            </div>
                            <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-full rounded-full shadow-[0_0_8px_rgba(59,130,246,0.4)]" style={{ width: `${(metrics.activeEnrollments / (metrics.completedEnrollments + metrics.activeEnrollments)) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects Card */}
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-cyan-200 transition-all duration-300 flex flex-col group">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-lg flex items-center justify-center border border-cyan-100 group-hover:bg-cyan-600 transition-colors duration-500">
                            <FolderKanban className="text-cyan-600 group-hover:text-white transition-colors duration-500 drop-shadow-sm" size={18} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="flex items-center gap-1 text-[9px] font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100/50">
                                <Bell size={10} strokeWidth={2.5} /> {metrics.pendingRequests} requests
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Total Projects</p>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-none tracking-tight mb-3">
                        {(metrics.activeProjects + metrics.completedProjects).toLocaleString()}
                    </h3>

                    <div className="mt-auto pt-3 border-t border-gray-100 space-y-1.5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_5px_rgba(6,182,212,0.5)]"></div>
                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Active</span>
                            </div>
                            <span className="text-[10px] font-black text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded">{metrics.activeProjects}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1 h-1 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Completed</span>
                            </div>
                            <span className="text-[10px] font-black text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{metrics.completedProjects}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1 h-1 bg-orange-400 rounded-full shadow-[0_0_5px_rgba(251,146,60,0.5)]"></div>
                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Pending</span>
                            </div>
                            <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">{metrics.pendingRequests}</span>
                        </div>
                    </div>
                </div>

                {/* Server Load Card */}
                <div className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-xl p-4 text-white shadow-lg border border-slate-700/50 overflow-hidden group">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] opacity-20 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-3">
                            <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-slate-800/80 rounded-lg flex items-center justify-center backdrop-blur-md border border-slate-600/50 shadow-inner group-hover:border-green-500/30 transition-colors">
                                <Server className="text-slate-300 group-hover:text-green-400 transition-colors drop-shadow-md" size={18} strokeWidth={2} />
                            </div>
                            <span className="flex items-center gap-1 text-[9px] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-md backdrop-blur-sm border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                                <Zap size={10} strokeWidth={2.5} className="text-green-400" /> Healthy
                            </span>
                        </div>

                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Server Load</p>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white drop-shadow-md leading-none mb-3">{metrics.serverLoad}%</h3>

                        <div className="mt-auto">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Capacity Usage</span>
                                <span className="text-[10px] font-black text-green-400">{100 - metrics.serverLoad}% free</span>
                            </div>
                            <div className="w-full bg-slate-800/80 h-1 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/50">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_10px_rgb(34,197,94)]"
                                    style={{ width: `${metrics.serverLoad}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-700/50 grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Uptime</p>
                                <p className="text-xs font-black text-emerald-400 drop-shadow-sm">{metrics.uptime}%</p>
                            </div>
                            <div>
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Latency</p>
                                <p className="text-xs font-black text-blue-400 drop-shadow-sm">{metrics.apiLatency}ms</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Two Column Layout: Revenue Trends & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Trends - Takes 2 columns */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-5 md:p-7">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Revenue Overview</h2>
                            <p className="text-[11px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Monthly trend collection</p>
                        </div>
                        <select className="text-sm border-gray-200 rounded-xl shadow-sm focus:border-[#004fa2] focus:ring-[#004fa2] px-4 py-2.5 font-bold text-gray-700 bg-gray-50 hover:bg-white transition-colors cursor-pointer outline-none">
                            <option>Last 12 Months</option>
                            <option>Last 6 Months</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    {/* Chart Visualization */}
                    <div className="overflow-x-auto pb-2">
                        <div className="h-64 flex items-end gap-3 justify-between px-2 min-w-[600px] relative">
                            {/* Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40 py-6">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-full border-b border-dashed border-gray-200 relative"></div>
                                ))}
                            </div>
                            {/* Bars */}
                            {[
                                { month: 'Jan', value: 40 },
                                { month: 'Feb', value: 65 },
                                { month: 'Mar', value: 45 },
                                { month: 'Apr', value: 80 },
                                { month: 'May', value: 55 },
                                { month: 'Jun', value: 90 },
                                { month: 'Jul', value: 70 },
                                { month: 'Aug', value: 85 },
                                { month: 'Sep', value: 60 },
                                { month: 'Oct', value: 75 },
                                { month: 'Nov', value: 50 },
                                { month: 'Dec', value: 95 }
                            ].map((m, i) => (
                                <div key={i} className="w-full flex flex-col items-center gap-3 relative z-10 group">
                                    <div className="w-full bg-blue-50/50 rounded-t-md relative h-52 flex items-end overflow-visible">
                                        <div
                                            className="w-full bg-gradient-to-t from-[#004fa2] to-[#0066cc] rounded-t-md opacity-85 group-hover:opacity-100 transition-all duration-300 relative shadow-sm group-hover:shadow-[0_0_15px_rgba(0,79,162,0.3)] group-hover:-translate-y-1"
                                            style={{ height: `${m.value}%` }}
                                        >
                                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-gray-700 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                                                GHS {Math.round(m.value * 1320).toLocaleString()}
                                                <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-gray-900"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{m.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Recent Activity</h3>
                        <Link to="/admin/activity-logs" className="text-sm text-[#004fa2] hover:underline flex items-center gap-1">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                        {recentActivity.map((activity, i) => (
                            <div key={i} className="p-4 hover:bg-gray-50 transition">
                                <div className="flex items-start gap-3">
                                    <div className={`w-6 h-6 md:w-8 md:h-8 ${activity.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                                        <activity.icon className={activity.color} size={16} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{activity.message}</p>
                                        <p className="text-xs text-gray-500">{activity.user || activity.amount}</p>
                                    </div>
                                    <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions & Platform Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-5">
                    <h3 className="font-bold text-gray-900 mb-4 text-sm flex items-center gap-1.5">
                        <Zap size={16} className="text-amber-500" />
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
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

                {/* Platform Health Panel - Datacenter Vibe */}
                <div className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-2xl border border-slate-700/60 shadow-[0_8px_30px_rgba(15,23,42,0.4)] p-6 md:p-7 text-white overflow-hidden group hover:border-slate-600/80 transition-all duration-500 flex flex-col">
                    <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"></div>
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 rounded-full blur-3xl pointer-events-none transition-transform group-hover:scale-150 duration-1000"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold text-lg flex items-center gap-2.5 tracking-tight">
                                <Activity size={20} className="text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" strokeWidth={2.5} />
                                Platform Health
                            </h3>
                            <span className="bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                                <CheckCircle size={14} /> Operational
                            </span>
                        </div>

                        <div className="space-y-6 flex-1">
                            {/* Database */}
                            <div>
                                <div className="flex justify-between mb-2 items-end">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                        <Database size={14} className="text-slate-500" /> Database Cluster
                                    </span>
                                    <span className="text-green-400 font-black text-sm drop-shadow-sm">{metrics.uptime}% Uptime</span>
                                </div>
                                <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden border border-slate-700/50">
                                    <div className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]" style={{ width: `${metrics.uptime}%` }}></div>
                                </div>
                            </div>

                            {/* Storage */}
                            <div>
                                <div className="flex justify-between mb-2 items-end">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                        <Server size={14} className="text-slate-500" /> Storage Usage
                                    </span>
                                    <span className="text-blue-400 font-black text-sm drop-shadow-sm">{metrics.storageUsed}GB / {metrics.storageTotal}GB</span>
                                </div>
                                <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden border border-slate-700/50">
                                    <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]" style={{ width: `${(metrics.storageUsed / metrics.storageTotal) * 100}%` }}></div>
                                </div>
                            </div>

                            {/* API Latency */}
                            <div>
                                <div className="flex justify-between mb-2 items-end">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                        <Zap size={14} className="text-slate-500" /> API Latency
                                    </span>
                                    <span className="text-amber-400 font-black text-sm drop-shadow-sm">{metrics.apiLatency}ms</span>
                                </div>
                                <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden border border-slate-700/50">
                                    <div className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full shadow-[0_0_10px_rgba(251,191,36,0.6)]" style={{ width: `${(metrics.apiLatency / 1000) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Stats */}
                        <div className="pt-6 mt-auto border-t border-slate-700/60 grid grid-cols-3 gap-2 md:gap-4">
                            <div className="bg-slate-800/40 border border-slate-700/50 p-2 md:p-4 rounded-xl text-center hover:bg-slate-800/60 transition-colors">
                                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Error Rate</span>
                                <span className="text-lg md:text-xl font-black text-white drop-shadow-sm">{metrics.errorRate}%</span>
                            </div>
                            <div className="bg-slate-800/40 border border-slate-700/50 p-2 md:p-4 rounded-xl text-center hover:bg-slate-800/60 transition-colors">
                                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Sessions</span>
                                <span className="text-lg md:text-xl font-black text-white drop-shadow-sm">{metrics.activeSessions.toLocaleString()}</span>
                            </div>
                            <div className="bg-slate-800/40 border border-slate-700/50 p-2 md:p-4 rounded-xl text-center hover:bg-slate-800/60 transition-colors">
                                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Alerts</span>
                                <span className="text-lg md:text-xl font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">{metrics.securityAlerts}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Pending Items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pending Payments */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                            <CreditCard size={18} className="text-green-600" />
                            Pending Payments
                        </h4>
                        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">{metrics.pendingPayments}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Payments awaiting confirmation or processing</p>
                    <Link to="/admin/payments" className="text-sm text-[#004fa2] font-semibold hover:underline flex items-center gap-1">
                        View Payments <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Pending Enrollments */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                            <GraduationCap size={18} className="text-blue-600" />
                            Pending Enrollments
                        </h4>
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">{metrics.pendingEnrollments}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">New enrollment applications to review</p>
                    <Link to="/admin/enrollments" className="text-sm text-[#004fa2] font-semibold hover:underline flex items-center gap-1">
                        View Enrollments <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Partnership Requests */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                            <Handshake size={18} className="text-teal-600" />
                            Partnership Requests
                        </h4>
                        <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2 py-1 rounded-full">{metrics.partnershipRequests}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Organizations interested in partnering</p>
                    <Link to="/admin/partnerships" className="text-sm text-[#004fa2] font-semibold hover:underline flex items-center gap-1">
                        View Requests <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
