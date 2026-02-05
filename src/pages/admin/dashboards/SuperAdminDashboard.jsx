/**
 * Super Admin Dashboard
 * Exclusive high-level overview with financial metrics, system health, and strategic insights.
 */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Users,
    GraduationCap,
    TrendingUp,
    DollarSign,
    Eye,
    Calendar,
    MessageSquare,
    Activity,
    ArrowRight,
    Bell,
    Server,
    Shield,
    Database,
    Download
} from 'lucide-react';
import { fetchSettings } from '../../../store/slices/settingsSlice';
import { trainingCourses } from '../../../data/trainingCourses';
import { jobsData } from '../../../data/jobsData';

const SuperAdminDashboard = ({ user }) => {
    const dispatch = useDispatch();
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        dispatch(fetchSettings());
        const timer = setInterval(() => setCurrentDate(new Date()), 60000);
        return () => clearInterval(timer);
    }, [dispatch]);

    // Financial & High-Level Metrics
    const metrics = {
        revenue: 125840,
        growth: 8.2,
        activeUsers: 1458,
        serverLoad: 42,
        securityAlerts: 0,
        enrollments: 247
    };

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="space-y-8 pb-8">
            {/* Premium Welcome Header */}
            <div className="bg-[#0f172a] rounded-2xl p-8 text-white relative overflow-hidden shadow-xl border border-gray-800">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-blue-300 text-sm font-medium mb-2 uppercase tracking-wider">
                            <Shield size={14} /> Super Admin Control Center
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Welcome back, {user?.name?.split(' ')[0] || 'Boss'}
                        </h1>
                        <p className="text-slate-400 max-w-xl text-lg">
                            System performance is optimal. Revenue is up <span className="text-green-400 font-bold">+{metrics.growth}%</span> this month.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2">
                            <Download size={18} />
                            Export Reports
                        </button>
                        <button className="bg-[#004fa2] hover:bg-[#003d7a] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-900/50 flex items-center gap-2">
                            <Activity size={18} />
                            System Health
                        </button>
                    </div>
                </div>
            </div>

            {/* Financial & Critical Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Revenue Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                            <DollarSign className="text-purple-600" size={24} />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            <TrendingUp size={12} /> +{metrics.growth}%
                        </span>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Revenue</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">GHS {metrics.revenue.toLocaleString()}</h3>
                    </div>
                </div>

                {/* Server Load Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                            <Server className="text-blue-600" size={24} />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                            Stable
                        </span>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Server Load</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{metrics.serverLoad}%</h3>
                    </div>
                </div>

                {/* Active Users Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center">
                            <Users className="text-cyan-600" size={24} />
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Active Users</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{metrics.activeUsers.toLocaleString()}</h3>
                    </div>
                </div>

                {/* Enrollments Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                            <GraduationCap className="text-orange-600" size={24} />
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Enrollments</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-1">{metrics.enrollments}</h3>
                    </div>
                </div>
            </div>

            {/* System Health Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Revenue Trends</h2>
                        <select className="text-sm border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500">
                            <option>Last 30 Days</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    {/* Placeholder for complex chart - represented by visually appealing bars */}
                    <div className="h-64 flex items-end gap-2 justify-between px-2">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                            <div key={i} className="w-full bg-blue-50 rounded-t-lg relative group h-full flex items-end">
                                <div
                                    className="w-full bg-blue-500 rounded-t-sm opacity-80 group-hover:opacity-100 transition-all duration-300"
                                    style={{ height: `${h}%` }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Technical Health */}
                <div className="bg-[#1e293b] rounded-2xl border border-gray-700 shadow-lg p-6 text-white text-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-base flex items-center gap-2">
                            <Activity size={18} className="text-green-400" /> Platform Health
                        </h3>
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Operational</span>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-400">Database Cluster</span>
                                <span className="text-green-400 font-mono">99.9% Uptime</span>
                            </div>
                            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full w-[99%]"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-400">Storage Usage (S3)</span>
                                <span className="text-blue-300 font-mono">450GB / 1TB</span>
                            </div>
                            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full w-[45%]"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-400">API Latency</span>
                                <span className="text-orange-300 font-mono">124ms</span>
                            </div>
                            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-orange-500 h-full w-[12%]"></div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-700 grid grid-cols-2 gap-4">
                            <div className="bg-slate-800 p-3 rounded-lg text-center">
                                <span className="block text-slate-500 text-xs uppercase">Error Rate</span>
                                <span className="text-xl font-bold text-white">0.02%</span>
                            </div>
                            <div className="bg-slate-800 p-3 rounded-lg text-center">
                                <span className="block text-slate-500 text-xs uppercase">Active Sessions</span>
                                <span className="text-xl font-bold text-white">1,240</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
