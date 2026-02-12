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
        <div className="space-y-6 pb-8">
            {/* Premium Welcome Header */}
            <div className="bg-[#004fa2] rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>
                <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-blue-200 text-sm font-medium mb-3 uppercase tracking-wider">
                                <Star size={16} className="fill-yellow-300 text-yellow-300" />
                                <span>Super Admin Dashboard</span>
                                <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-300 rounded-full text-xs">All Systems Operational</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                Welcome back, {user?.name?.split(' ')[0] || 'Super'}
                            </h1>
                            <p className="text-blue-100 max-w-xl text-lg">
                                {formattedDate} • <span className="text-white">{formattedTime}</span>
                            </p>
                            <div className="mt-4 flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-2 text-green-300">
                                    <TrendingUp size={16} />
                                    Revenue up <span className="font-bold">+{metrics.revenueGrowth}%</span> this month
                                </span>
                                <span className="text-blue-300">|</span>
                                <span className="flex items-center gap-2 text-blue-200">
                                    <Activity size={16} />
                                    {metrics.activeSessions.toLocaleString()} active sessions
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
                            <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2">
                                <Download size={18} />
                                Export Reports
                            </button>
                            <Link
                                to="/admin/analytics"
                                className="bg-white hover:bg-gray-100 text-[#004fa2] px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center gap-2"
                            >
                                <BarChart3 size={18} />
                                View Analytics
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alerts Section (if any) */}
            {alerts.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="text-red-600" size={20} />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-red-800">Security Alert</h4>
                        <p className="text-red-600 text-sm">{alerts[0].message}</p>
                    </div>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition">
                        View Details
                    </button>
                </div>
            )}

            {/* Summary Statistics Row - Enhanced & Interactive */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
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
                        className="group bg-white rounded-xl p-3 md:p-4 border border-gray-200 shadow-sm hover:shadow-xl hover:scale-105 hover:border-[#004fa2] transition-all duration-300 relative overflow-hidden cursor-pointer flex flex-col justify-between"
                    >
                        {/* Horizontal layout: Icon and Number side by side */}
                        <div className="flex items-center gap-2 mb-2 md:mb-3">
                            {/* Icon - No background */}
                            <stat.icon className={`${stat.iconColor} group-hover:scale-110 transition-transform duration-300 flex-shrink-0 w-5 h-5 md:w-6 md:h-6`} />

                            {/* Value */}
                            <p className="text-xl md:text-2xl font-extrabold text-gray-900 transition-all duration-300 truncate">
                                {stat.value.toLocaleString()}
                            </p>
                        </div>

                        {/* Label */}
                        <p className="text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wide group-hover:text-[#004fa2] transition-colors duration-300 truncate">
                            {stat.label}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Main Metrics Cards - Modern Clean Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Revenue Card - Company Blue */}
                <div className="bg-[#004fa2] rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                            <DollarSign className="text-white" size={28} />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className="flex items-center gap-1.5 text-xs font-bold text-green-300 bg-green-500/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                                <TrendingUp size={14} /> +{metrics.revenueGrowth}%
                            </span>
                            <span className="text-xs text-blue-200">vs last month</span>
                        </div>
                    </div>

                    <p className="text-blue-200 text-sm font-semibold uppercase tracking-wider mb-2">Total Revenue</p>
                    <h3 className="text-4xl font-black mb-1 tracking-tight">GHS {metrics.totalRevenue.toLocaleString()}</h3>

                    <div className="mt-4 pt-4 border-t border-white/20">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-blue-200">This month</span>
                            <span className="font-bold text-white">GHS {metrics.monthlyRevenue.toLocaleString()}</span>
                        </div>
                        {/* Mini sparkline */}
                        <div className="mt-3 flex items-end gap-1 h-8">
                            {[40, 45, 50, 48, 55, 60, 68, 75, 72, 80, 85, 95].map((h, i) => (
                                <div key={i} className="flex-1 bg-white/30 rounded-t hover:bg-white/50 transition-all duration-200" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Enrollments Card - Clean White */}
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
                        {(metrics.activeEnrollments + metrics.completedEnrollments).toLocaleString()}
                    </h3>

                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-500 font-medium">Completed</span>
                                <span className="text-xs font-bold text-green-600">{metrics.completedEnrollments}</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full" style={{ width: `${(metrics.completedEnrollments / (metrics.completedEnrollments + metrics.activeEnrollments)) * 100}%` }}></div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-500 font-medium">Active</span>
                                <span className="text-xs font-bold text-blue-600">{metrics.activeEnrollments}</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full" style={{ width: `${(metrics.activeEnrollments / (metrics.completedEnrollments + metrics.activeEnrollments)) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects Card - Clean White */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <FolderKanban className="text-white" size={28} />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-100 px-3 py-1.5 rounded-full">
                                <Bell size={12} /> {metrics.pendingRequests} requests
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Projects</p>
                    <h3 className="text-4xl font-black text-gray-900 mb-1">
                        {(metrics.activeProjects + metrics.completedProjects).toLocaleString()}
                    </h3>

                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                <span className="text-sm text-gray-600 font-medium">Active</span>
                            </div>
                            <span className="text-sm font-bold text-cyan-600">{metrics.activeProjects}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-gray-600 font-medium">Completed</span>
                            </div>
                            <span className="text-sm font-bold text-green-600">{metrics.completedProjects}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <span className="text-sm text-gray-600 font-medium">Pending</span>
                            </div>
                            <span className="text-sm font-bold text-orange-600">{metrics.pendingRequests}</span>
                        </div>
                    </div>
                </div>

                {/* System Health Card - Clean Dark */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg">
                            <Server className="text-white" size={28} />
                        </div>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-green-300 bg-green-500/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-green-400/30">
                            <Zap size={12} /> Healthy
                        </span>
                    </div>

                    <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Server Load</p>
                    <h3 className="text-4xl font-black mb-1 tracking-tight">{metrics.serverLoad}%</h3>

                    <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-400">Capacity Usage</span>
                            <span className="text-xs font-bold text-green-400">{100 - metrics.serverLoad}% free</span>
                        </div>
                        <div className="w-full bg-slate-700/50 h-3 rounded-full overflow-hidden backdrop-blur-sm">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-600"
                                style={{ width: `${metrics.serverLoad}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                        <div>
                            <p className="text-slate-500 mb-1">Uptime</p>
                            <p className="font-bold text-green-400">{metrics.uptime}%</p>
                        </div>
                        <div>
                            <p className="text-slate-500 mb-1">Latency</p>
                            <p className="font-bold text-blue-400">{metrics.apiLatency}ms</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Two Column Layout: Revenue Trends & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Trends - Takes 2 columns */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Revenue Overview</h2>
                            <p className="text-sm text-gray-500">Monthly revenue trends</p>
                        </div>
                        <select className="text-sm border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2">
                            <option>Last 12 Months</option>
                            <option>Last 6 Months</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    {/* Chart Visualization */}
                    <div className="h-64 flex items-end gap-2 justify-between px-2">
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
                            <div key={i} className="w-full flex flex-col items-center gap-2">
                                <div className="w-full bg-blue-50 rounded-t-lg relative group h-52 flex items-end">
                                    <div
                                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg opacity-80 group-hover:opacity-100 transition-all duration-300 relative"
                                        style={{ height: `${m.value}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            GHS {Math.round(m.value * 1320)}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500">{m.month}</span>
                            </div>
                        ))}
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
                                    <div className={`w-8 h-8 ${activity.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
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
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Zap size={18} className="text-amber-500" />
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {quickActions.map((action, i) => (
                            <Link
                                key={i}
                                to={action.path}
                                className="group p-4 rounded-xl border border-gray-200 hover:border-transparent hover:shadow-lg transition-all bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-white"
                            >
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <action.icon className="text-white" size={20} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Platform Health Panel */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-base flex items-center gap-2">
                            <Activity size={18} className="text-green-400" />
                            Platform Health
                        </h3>
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle size={12} /> Operational
                        </span>
                    </div>

                    <div className="space-y-5">
                        {/* Database */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-400 flex items-center gap-2">
                                    <Database size={14} /> Database Cluster
                                </span>
                                <span className="text-green-400 font-mono">{metrics.uptime}% Uptime</span>
                            </div>
                            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full rounded-full" style={{ width: `${metrics.uptime}%` }}></div>
                            </div>
                        </div>

                        {/* Storage */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-400 flex items-center gap-2">
                                    <Server size={14} /> Storage Usage
                                </span>
                                <span className="text-blue-300 font-mono">{metrics.storageUsed}GB / {metrics.storageTotal}GB</span>
                            </div>
                            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(metrics.storageUsed / metrics.storageTotal) * 100}%` }}></div>
                            </div>
                        </div>

                        {/* API Latency */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-400 flex items-center gap-2">
                                    <Zap size={14} /> API Latency
                                </span>
                                <span className="text-orange-300 font-mono">{metrics.apiLatency}ms</span>
                            </div>
                            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-orange-500 h-full rounded-full" style={{ width: `${(metrics.apiLatency / 1000) * 100}%` }}></div>
                            </div>
                        </div>

                        {/* Bottom Stats */}
                        <div className="pt-4 border-t border-slate-700 grid grid-cols-3 gap-4">
                            <div className="bg-slate-800/50 p-3 rounded-lg text-center">
                                <span className="block text-slate-500 text-xs uppercase">Error Rate</span>
                                <span className="text-xl font-bold text-white">{metrics.errorRate}%</span>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-lg text-center">
                                <span className="block text-slate-500 text-xs uppercase">Sessions</span>
                                <span className="text-xl font-bold text-white">{metrics.activeSessions.toLocaleString()}</span>
                            </div>
                            <div className="bg-slate-800/50 p-3 rounded-lg text-center">
                                <span className="block text-slate-500 text-xs uppercase">Alerts</span>
                                <span className="text-xl font-bold text-green-400">{metrics.securityAlerts}</span>
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
