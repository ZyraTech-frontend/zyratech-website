/**
 * Business Analytics - Matching SuperAdminDashboard Design
 * Comprehensive analytics with premium, high-density professional UI
 */

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  GraduationCap,
  Briefcase,
  FolderKanban,
  Users,
  Target,
  Download,
  BarChart3,
  Star,
  CheckCircle,
  Clock,
  AlertTriangle,
  Globe,
  Activity,
  CreditCard,
  Handshake,
  UserPlus,
  RefreshCw,
  Server,
  Zap
} from 'lucide-react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { trainingCourses } from '../../data/trainingCourses';
import jobsService from '../../services/jobsService';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [jobsCount, setJobsCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const loadJobs = async () => {
      try {
        const jobs = await jobsService.getAllJobsAdmin();
        if (isMounted) {
          setJobsCount(Array.isArray(jobs) ? jobs.length : 0);
        }
      } catch (err) {
        console.warn('Failed to fetch jobs:', err);
      }
    };
    loadJobs();
    return () => { isMounted = false; };
  }, []);

  // Core Business Metrics
  const metrics = {
    revenue: { total: 125840, growth: 18.5, monthly: 28450 },
    customers: { total: 1139, growth: 12.3, new: 47 },
    conversion: { rate: 24.8, change: 3.2 },
    avgValue: { amount: 850, change: -2.1 }
  };

  // User Analytics
  const users = {
    total: 1458,
    newSignups: 47,
    activeUsers: 892,
    signupGrowth: 15.2,
    byRole: [
      { role: 'Students', count: 892, percentage: 61.2 },
      { role: 'Job Seekers', count: 324, percentage: 22.2 },
      { role: 'Project Clients', count: 187, percentage: 12.8 },
      { role: 'Admins', count: 55, percentage: 3.8 }
    ]
  };

  // Payment Analytics
  const payments = {
    totalTransactions: 1245,
    successRate: 94.2,
    successfulPayments: 1173,
    pendingPayments: 18
  };

  // Training Analytics
  const training = {
    courses: trainingCourses.length,
    enrollments: 892,
    active: 247,
    completed: 645,
    completion: 72.3,
    revenue: 65240,
    topCourses: trainingCourses
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, 5)
      .map(c => ({
        name: c.title,
        enrollments: c.reviews,
        rating: c.rating,
        completion: 65 + Math.floor(Math.random() * 20)
      }))
  };

  // Jobs Analytics
  const jobs = {
    active: jobsCount,
    applications: 1456,
    placements: 87,
    revenue: 13220,
    avgHireTime: 18
  };

  // Projects Analytics
  const projects = {
    total: 157,
    active: 15,
    completed: 42,
    pending: 7,
    conversion: 36.3,
    revenue: 47380,
    avgValue: 1128
  };

  // Partnerships
  const partnerships = {
    total: 23,
    active: 18,
    pending: 5
  };

  // Geographic Distribution
  const geography = [
    { country: 'Ghana', flag: '🇬🇭', users: 892, percentage: 61.2 },
    { country: 'Nigeria', flag: '🇳🇬', users: 289, percentage: 19.8 },
    { country: 'USA', flag: '🇺🇸', users: 145, percentage: 9.9 },
    { country: 'UK', flag: '🇬🇧', users: 87, percentage: 6.0 },
    { country: 'Others', flag: '🌍', users: 45, percentage: 3.1 }
  ];

  // System Health
  const systemHealth = {
    serverUptime: 99.8,
    avgResponseTime: 120,
    databaseHealth: 98.5,
    apiCalls: 45234
  };

  // Conversion Funnel
  const funnel = [
    { stage: 'Website Visitors', count: 12458, percentage: 100 },
    { stage: 'Inquiries', count: 3245, percentage: 26.0 },
    { stage: 'Consultations', count: 1879, percentage: 15.1 },
    { stage: 'Customers', count: 1139, percentage: 9.1 }
  ];

  // Revenue Trends
  const revenueTrend = [
    { month: 'Jan', training: 4200, projects: 2800, jobs: 900 },
    { month: 'Feb', training: 4850, projects: 3200, jobs: 950 },
    { month: 'Mar', training: 5100, projects: 3600, jobs: 1100 },
    { month: 'Apr', training: 5600, projects: 3900, jobs: 1050 },
    { month: 'May', training: 5400, projects: 4100, jobs: 1200 },
    { month: 'Jun', training: 5900, projects: 4500, jobs: 1300 },
    { month: 'Jul', training: 6200, projects: 4200, jobs: 1150 },
    { month: 'Aug', training: 5800, projects: 4600, jobs: 1250 },
    { month: 'Sep', training: 6400, projects: 4800, jobs: 1100 },
    { month: 'Oct', training: 6100, projects: 4300, jobs: 1200 },
    { month: 'Nov', training: 6700, projects: 5100, jobs: 1400 },
    { month: 'Dec', training: 6900, projects: 5380, jobs: 1220 }
  ];

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-3 md:space-y-6 pb-8">
        {/* Premium Header */}
        <div className="bg-gradient-to-br from-[#004fa2] via-[#0058b5] to-[#0066cc] rounded-xl md:rounded-2xl p-2 md:p-4 lg:p-5 text-white relative overflow-hidden shadow-md md:shadow-lg border border-blue-400/20">
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 md:-mr-24 md:-mt-24 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full blur-3xl -ml-12 -mb-12 md:-ml-16 md:-mb-16 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                <BarChart3 size={12} className="text-blue-200" />
                <span className="text-blue-200 text-[10px] md:text-xs font-bold uppercase tracking-wider">Business Analytics</span>
                <span className="ml-2 px-1.5 py-0.5 bg-green-500/20 text-green-300 rounded-full text-[9px] md:text-[10px] font-bold border border-green-500/30">LIVE METRICS</span>
              </div>
              <h1 className="text-base md:text-2xl font-bold mb-1 tracking-tight">
                Comprehensive Insights
              </h1>
              <p className="text-blue-200 text-[11px] md:text-sm max-w-xl">
                Real-time operational metrics, financial performance, and system health status.
              </p>
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto mt-1 md:mt-0">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="flex-1 md:flex-none text-[11px] md:text-sm border border-blue-400/30 bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 py-1.5 md:px-4 md:py-2 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer font-medium backdrop-blur-sm transition-colors [&>option]:text-gray-900 appearance-none"
                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="12months">Last 12 Months</option>
              </select>
              <button className="px-3 py-1.5 md:px-4 md:py-2 bg-white text-[#004fa2] rounded-lg text-[11px] md:text-sm font-bold shadow-sm hover:shadow-md hover:bg-blue-50 transition-all flex items-center justify-center gap-1.5 flex-1 md:flex-none border border-transparent">
                <Download size={14} />
                <span className="inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Critical Alerts - Ultra High Density */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          <div className="bg-white rounded-xl p-2 md:p-4 border border-orange-200 shadow-sm transition-all flex flex-col group relative overflow-hidden">
             <div className="absolute -right-4 -top-4 w-12 h-12 md:w-16 md:h-16 bg-orange-50 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
             <div className="flex items-center gap-2 mb-1.5 relative z-10">
                <div className="w-5 h-5 md:w-8 md:h-8 rounded-md bg-orange-100 flex items-center justify-center text-orange-600">
                    <AlertTriangle size={12} />
                </div>
                <p className="text-[10px] md:text-xs text-orange-800 font-bold uppercase tracking-wider">Approvals</p>
             </div>
             <span className="text-xs md:text-xl font-bold text-gray-900 relative z-10 leading-none mb-1 md:mb-0">{payments.pendingPayments + projects.pending}</span>
             <p className="text-[10px] md:text-[11px] text-gray-500 mt-0.5 relative z-10 truncate">{payments.pendingPayments} payments · {projects.pending} projects</p>
          </div>

          <div className="bg-white rounded-xl p-2 md:p-4 border border-blue-200 shadow-sm transition-all flex flex-col group relative overflow-hidden">
             <div className="absolute -right-4 -top-4 w-12 h-12 md:w-16 md:h-16 bg-blue-50 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
             <div className="flex items-center gap-2 mb-1.5 relative z-10">
                <div className="w-5 h-5 md:w-8 md:h-8 rounded-md bg-blue-100 flex items-center justify-center text-blue-600">
                    <UserPlus size={12} />
                </div>
                <p className="text-[10px] md:text-xs text-blue-800 font-bold uppercase tracking-wider">New Users</p>
             </div>
             <span className="text-xs md:text-xl font-bold text-gray-900 relative z-10 leading-none mb-1 md:mb-0">+{users.newSignups}</span>
             <p className="text-[10px] md:text-[11px] text-gray-500 mt-0.5 relative z-10 truncate">Last 24 hours</p>
          </div>

          <div className="bg-white rounded-xl p-2 md:p-4 border border-green-200 shadow-sm transition-all flex flex-col group relative overflow-hidden">
             <div className="absolute -right-4 -top-4 w-12 h-12 md:w-16 md:h-16 bg-green-50 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
             <div className="flex items-center gap-2 mb-1.5 relative z-10">
                <div className="w-5 h-5 md:w-8 md:h-8 rounded-md bg-green-100 flex items-center justify-center text-green-600">
                    <Activity size={12} />
                </div>
                <p className="text-[10px] md:text-xs text-green-800 font-bold uppercase tracking-wider">System</p>
             </div>
             <span className="text-xs md:text-xl font-bold text-gray-900 relative z-10 leading-none mb-1 md:mb-0">{systemHealth.serverUptime}%</span>
             <p className="text-[10px] md:text-[11px] text-green-600 font-medium mt-0.5 flex items-center gap-1 relative z-10 truncate"><CheckCircle size={10} /> Operational</p>
          </div>
          
          <div className="bg-white rounded-xl p-2 md:p-4 border border-purple-200 shadow-sm transition-all flex flex-col group relative overflow-hidden">
             <div className="absolute -right-4 -top-4 w-12 h-12 md:w-16 md:h-16 bg-purple-50 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
             <div className="flex items-center gap-2 mb-1.5 relative z-10">
                <div className="w-5 h-5 md:w-8 md:h-8 rounded-md bg-purple-100 flex items-center justify-center text-purple-600">
                    <TrendingUp size={12} />
                </div>
                <p className="text-[10px] md:text-xs text-purple-800 font-bold uppercase tracking-wider">Conversion</p>
             </div>
             <span className="text-xs md:text-xl font-bold text-gray-900 relative z-10 leading-none mb-1 md:mb-0">{metrics.conversion.rate}%</span>
             <p className="text-[10px] md:text-[11px] text-green-600 font-medium mt-0.5 flex items-center gap-1 relative z-10 truncate"><TrendingUp size={10} /> +{metrics.conversion.change}%</p>
          </div>
        </div>

        {/* Primary Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {/* Revenue Component */}
          <div className="bg-gradient-to-br from-[#004fa2] via-[#0058b5] to-[#003d7a] rounded-xl md:rounded-2xl p-2 md:p-5 text-white shadow-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
            <div className="flex justify-between items-start mb-1.5 md:mb-4 relative z-10">
              <div className="w-6 h-6 md:w-10 md:h-10 bg-white/10 rounded-lg md:rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <DollarSign className="text-white w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="flex items-center gap-1 text-[10px] md:text-[11px] font-bold text-green-300 bg-green-500/20 px-1.5 py-0.5 md:px-2 md:py-1 rounded md:rounded-lg border border-green-400/30">
                <TrendingUp size={10} /> +{metrics.revenue.growth}%
              </span>
            </div>
            <p className="text-blue-200 text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-0.5 relative z-10">Total Revenue</p>
            <h3 className="text-[13px] md:text-xl font-bold tracking-tight relative z-10 mb-1.5 md:mb-4">
              <span className="text-[10px] md:text-sm text-blue-200 mr-1 font-semibold">GHS</span>{metrics.revenue.total.toLocaleString()}
            </h3>
            <div className="pt-2 md:pt-3 border-t border-white/10 flex items-center justify-between text-[10px] md:text-xs relative z-10">
              <span className="text-blue-200/80 font-medium tracking-wide">Monthly Avg</span>
              <span className="font-semibold text-white tracking-wide">GHS {metrics.revenue.monthly.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl p-2 md:p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all group flex flex-col">
            <div className="flex justify-between items-start mb-1.5 md:mb-4">
              <div className="w-6 h-6 md:w-10 md:h-10 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg md:rounded-xl flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 transition-colors duration-500">
                <Users className="text-indigo-600 w-4 h-4 md:w-5 md:h-5 group-hover:text-white transition-colors" />
              </div>
              <span className="flex items-center gap-1 text-[10px] md:text-[11px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 md:px-2 md:py-1 rounded md:rounded-lg border border-indigo-200/50">
                <TrendingUp size={10} /> +{users.signupGrowth}%
              </span>
            </div>
            <p className="text-gray-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-0.5">Total Users</p>
            <h3 className="text-[13px] md:text-xl font-bold text-gray-900 tracking-tight mb-1.5 md:mb-4">{users.total.toLocaleString()}</h3>
            <div className="mt-auto pt-2 md:pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] md:text-xs">
               <span className="text-gray-500 font-medium">Active Now</span>
               <span className="font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{users.activeUsers}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl p-2 md:p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all group flex flex-col">
            <div className="flex justify-between items-start mb-1.5 md:mb-4">
              <div className="w-6 h-6 md:w-10 md:h-10 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg md:rounded-xl flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 transition-colors duration-500">
                <CreditCard className="text-emerald-600 w-4 h-4 md:w-5 md:h-5 group-hover:text-white transition-colors" />
              </div>
              <span className="flex items-center gap-1 text-[10px] md:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 md:px-2 md:py-1 rounded md:rounded-lg border border-emerald-200/50">
                <CheckCircle size={10} /> {payments.successRate}%
              </span>
            </div>
            <p className="text-gray-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-0.5">Payments</p>
            <h3 className="text-[13px] md:text-xl font-bold text-gray-900 tracking-tight mb-1.5 md:mb-4">{payments.successfulPayments}</h3>
            <div className="mt-auto pt-2 md:pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] md:text-xs">
               <span className="text-gray-500 font-medium">Transactions</span>
               <span className="font-semibold text-gray-900 bg-gray-50 px-1.5 py-0.5 rounded">{payments.totalTransactions}</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-xl md:rounded-2xl p-2 md:p-5 text-white shadow-md border border-slate-700/60 relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl -mr-8 -mb-8 pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="flex justify-between items-start mb-1.5 md:mb-4 relative z-10">
              <div className="w-6 h-6 md:w-10 md:h-10 bg-slate-800 rounded-lg md:rounded-xl flex items-center justify-center border border-slate-600">
                <Server className="text-slate-300 w-4 h-4 md:w-5 md:h-5" />
              </div>
              <span className="flex items-center gap-1 text-[10px] md:text-[11px] font-bold text-green-400 bg-green-500/10 px-1.5 py-0.5 md:px-2 md:py-1 rounded md:rounded-lg border border-green-500/20">
                <Zap size={10} className="text-green-400" /> Healthy
              </span>
            </div>
            <p className="text-slate-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-0.5 relative z-10">System Uptime</p>
            <h3 className="text-[13px] md:text-xl font-bold tracking-tight text-white mb-1.5 md:mb-4 relative z-10">
              {systemHealth.serverUptime}%
            </h3>
            <div className="pt-2 md:pt-3 border-t border-slate-700/60 flex items-center justify-between text-[10px] md:text-xs relative z-10">
               <span className="text-slate-400 font-medium">Avg Latency</span>
               <span className="font-semibold text-amber-400">{systemHealth.avgResponseTime}ms</span>
            </div>
          </div>
        </div>

        {/* Dynamic Column Layout: Service Analytics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          <div className="bg-white rounded-xl md:rounded-2xl p-2 md:p-5 border border-gray-200 shadow-sm transition-all duration-300">
            <div className="flex justify-between items-start mb-2.5 md:mb-3">
              <div className="w-6 h-6 md:w-10 md:h-10 bg-blue-50 rounded-lg md:rounded-xl flex items-center justify-center text-blue-600 transition-transform hover:scale-110 duration-300">
                <GraduationCap size={16} />
              </div>
              <span className="text-[10px] md:text-[11px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 md:px-2 md:py-1 rounded md:rounded-lg border border-green-200">
                {training.completion}% compl
              </span>
            </div>

            <p className="text-gray-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-0.5">Training</p>
            <h3 className="text-[13px] md:text-xl font-bold text-gray-900 tracking-tight mb-1.5 md:mb-4">{training.enrollments}</h3>

            <div className="space-y-1 md:space-y-2 pt-2 md:pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-[10px] md:text-xs">
                <span className="text-gray-500 font-medium">Active</span>
                <span className="font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{training.active}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] md:text-xs">
                <span className="text-gray-500 font-medium">Completed</span>
                <span className="font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{training.completed}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] md:text-xs">
                <span className="text-gray-500 font-medium">Courses</span>
                <span className="font-semibold text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">{training.courses}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl p-2 md:p-5 border border-gray-200 shadow-sm transition-all duration-300">
            <div className="flex justify-between items-start mb-2.5 md:mb-3">
              <div className="w-6 h-6 md:w-10 md:h-10 bg-orange-50 rounded-lg md:rounded-xl flex items-center justify-center text-orange-600 transition-transform hover:scale-110 duration-300">
                <Briefcase size={16} />
              </div>
              <span className="text-[10px] md:text-[11px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 md:px-2 md:py-1 rounded md:rounded-lg border border-blue-200">
                {jobs.placements} Hired
              </span>
            </div>

            <p className="text-gray-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-0.5">Jobs</p>
            <h3 className="text-[13px] md:text-xl font-bold text-gray-900 tracking-tight mb-1.5 md:mb-4">{jobs.active}</h3>

            <div className="space-y-1 md:space-y-2 pt-2 md:pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-[10px] md:text-xs">
                <span className="text-gray-500 font-medium truncate">Apps</span>
                <span className="font-semibold text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">{jobs.applications.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] md:text-xs">
                <span className="text-gray-500 font-medium">Hires</span>
                <span className="font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{jobs.placements}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] md:text-xs">
                <span className="text-gray-500 font-medium">Time</span>
                <span className="font-semibold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">{jobs.avgHireTime}d</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl p-2 md:p-5 border border-gray-200 shadow-sm transition-all duration-300">
            <div className="flex justify-between items-start mb-2.5 md:mb-3">
              <div className="w-6 h-6 md:w-10 md:h-10 bg-cyan-50 rounded-lg md:rounded-xl flex items-center justify-center text-cyan-600 transition-transform hover:scale-110 duration-300">
                <FolderKanban size={16} />
              </div>
              <span className="text-[10px] md:text-[11px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 md:px-2 md:py-1 rounded md:rounded-lg border border-green-200">
                {projects.conversion}% Conv
              </span>
            </div>

            <p className="text-gray-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-0.5">Projects</p>
            <h3 className="text-[13px] md:text-xl font-bold text-gray-900 tracking-tight mb-1.5 md:mb-4">{projects.total}</h3>

            <div className="space-y-1 md:space-y-2 pt-2 md:pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-[10px] md:text-xs">
                <span className="text-gray-500 font-medium">Active</span>
                <span className="font-semibold text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded">{projects.active}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] md:text-xs">
                <span className="text-gray-500 font-medium">Completed</span>
                <span className="font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{projects.completed}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] md:text-xs">
                <span className="text-gray-500 font-medium truncate w-12 md:w-auto">Value</span>
                <span className="font-semibold text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded text-[9px] md:text-[11px]">GHS {projects.avgValue}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl p-2 md:p-5 border border-gray-200 shadow-sm transition-all duration-300">
            <div className="flex justify-between items-start mb-2.5 md:mb-3">
              <div className="w-6 h-6 md:w-10 md:h-10 bg-purple-50 rounded-lg md:rounded-xl flex items-center justify-center text-purple-600 transition-transform hover:scale-110 duration-300">
                <Handshake size={16} />
              </div>
              <span className="text-[10px] md:text-[11px] font-bold text-orange-700 bg-orange-100 px-1.5 py-0.5 md:px-2 md:py-1 rounded md:rounded-lg border border-orange-200">
                {partnerships.pending} Pend
              </span>
            </div>

            <p className="text-gray-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-0.5">Partners</p>
            <h3 className="text-[13px] md:text-xl font-bold text-gray-900 tracking-tight mb-1.5 md:mb-4">{partnerships.total}</h3>

            <div className="space-y-1 md:space-y-2 pt-2 md:pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-[10px] md:text-xs">
                <span className="text-gray-500 font-medium">Network</span>
                <span className="font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">{partnerships.active}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] md:text-xs">
                <span className="text-gray-500 font-medium truncate w-14 md:w-auto">Requests</span>
                <span className="font-semibold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">{partnerships.pending}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Revenue Distribution & Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
          {/* Revenue Distribution */}
          <div className="bg-white rounded-xl md:rounded-2xl p-2 md:p-4 lg:p-5 border border-gray-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h2 className="text-[11px] md:text-lg font-bold text-gray-900 tracking-tight">Revenue Stream</h2>
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-gray-500">By Service Category</span>
              </div>
            </div>

            <div className="space-y-3 md:space-y-6 flex-1 flex flex-col justify-center">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5 md:gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 md:w-12 md:h-12 bg-blue-50 rounded-lg md:rounded-xl flex items-center justify-center border border-blue-100/50 text-blue-600">
                      <GraduationCap size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-tight">Training Courses</p>
                      <p className="text-[10px] md:text-xs text-gray-500 font-medium">GHS {training.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] md:text-lg font-bold text-gray-900 leading-none">51.8%</p>
                    <p className="text-[10px] md:text-xs text-green-600 font-bold mt-1 bg-green-50 px-1.5 py-0.5 rounded-sm inline-block">+22.3%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-1.5 md:h-2.5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '51.8%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5 md:gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 md:w-12 md:h-12 bg-cyan-50 rounded-lg md:rounded-xl flex items-center justify-center border border-cyan-100/50 text-cyan-600">
                      <FolderKanban size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-tight">Project Requests</p>
                      <p className="text-[10px] md:text-xs text-gray-500 font-medium">GHS {projects.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] md:text-lg font-bold text-gray-900 leading-none">37.6%</p>
                    <p className="text-[10px] md:text-xs text-green-600 font-bold mt-1 bg-green-50 px-1.5 py-0.5 rounded-sm inline-block">+15.8%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-1.5 md:h-2.5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: '37.6%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5 md:gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 md:w-12 md:h-12 bg-orange-50 rounded-lg md:rounded-xl flex items-center justify-center border border-orange-100/50 text-orange-600">
                      <Briefcase size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-tight">Job Placements</p>
                      <p className="text-[10px] md:text-xs text-gray-500 font-medium">GHS {jobs.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] md:text-lg font-bold text-gray-900 leading-none">10.6%</p>
                    <p className="text-[10px] md:text-xs text-green-600 font-bold mt-1 bg-green-50 px-1.5 py-0.5 rounded-sm inline-block">+8.2%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-1.5 md:h-2.5 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '10.6%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Trends */}
          <div className="bg-white rounded-xl md:rounded-2xl p-2 md:p-4 lg:p-5 border border-gray-200 shadow-sm h-full flex flex-col overflow-hidden">
             <div className="flex flex-row items-center justify-between mb-4 md:mb-6 gap-2">
              <div>
                <h2 className="text-[11px] md:text-lg font-bold text-gray-900 tracking-tight">12-Month Trends</h2>
                <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-gray-500 mt-0.5 hidden sm:block">Monthly Analysis</p>
              </div>
              <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs">
                <div className="flex items-center gap-1 md:gap-1.5">
                  <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-blue-500 shadow-sm"></div>
                  <span className="text-gray-600 font-medium uppercase tracking-wider">Train</span>
                </div>
                <div className="flex items-center gap-1 md:gap-1.5">
                  <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-cyan-500 shadow-sm"></div>
                  <span className="text-gray-600 font-medium uppercase tracking-wider">Proj</span>
                </div>
                <div className="flex items-center gap-1 md:gap-1.5">
                  <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-orange-500 shadow-sm"></div>
                  <span className="text-gray-600 font-medium uppercase tracking-wider">Jobs</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto flex-1 flex items-end pb-1 md:pb-2 scrollbar-none custom-scrollbar -mx-2 md:mx-0 px-2 md:px-0">
              <div className="h-40 md:h-64 flex items-end gap-1 md:gap-3 min-w-[380px] md:min-w-[500px] w-full pt-4 md:pt-8 relative mx-auto justify-between px-1">
                 {/* Grid Lines */}
                 <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 py-1 md:py-2">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-full border-b border-dashed border-gray-400 relative"></div>
                    ))}
                 </div>
                 
                {revenueTrend.map((month, i) => {
                  const total = month.training + month.projects + month.jobs;
                  const maxTotal = Math.max(...revenueTrend.map(m => m.training + m.projects + m.jobs));
                  const heightPercent = (total / maxTotal) * 100;

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 md:gap-2 group relative z-10 w-full max-w-[1.8rem] md:max-w-[2.5rem]">
                      <div className="absolute -top-6 md:-top-10 bg-gray-900 bg-opacity-90 backdrop-blur-sm text-white text-[9px] md:text-sm font-semibold py-0.5 px-1 md:py-1 md:px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none z-20 border border-gray-700">
                        Total: {total.toLocaleString()}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-2 border-transparent border-t-gray-900 border-opacity-90"></div>
                      </div>
                      
                      <div className="w-full flex max-w-[20px] md:max-w-full flex-col-reverse gap-[1px] shadow-sm group-hover:shadow-[0_0_15px_rgba(0,79,162,0.2)] transition-shadow group-hover:-translate-y-1 duration-200" style={{ height: `${heightPercent}%` }}>
                        <div className="w-full bg-blue-500 rounded-t-sm md:rounded-t bg-opacity-90 group-hover:bg-opacity-100 transition-colors" style={{ height: `${(month.training / total) * 100}%` }}></div>
                        <div className="w-full bg-cyan-500 bg-opacity-90 group-hover:bg-opacity-100 transition-colors" style={{ height: `${(month.projects / total) * 100}%` }}></div>
                        <div className="w-full bg-orange-500 rounded-b-sm md:rounded-b bg-opacity-90 group-hover:bg-opacity-100 transition-colors" style={{ height: `${(month.jobs / total) * 100}%` }}></div>
                      </div>
                      <span className="text-[9px] md:text-xs text-gray-500 font-semibold uppercase tracking-widest">{month.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Funnel & Users Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
          {/* Conversion Funnel */}
          <div className="bg-white rounded-xl md:rounded-2xl p-2 md:p-4 lg:p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4 md:mb-6">
               <div className="flex items-center gap-1.5 md:gap-2">
                 <Target size={16} className="text-[#004fa2]" />
                 <h2 className="text-[11px] md:text-lg font-bold text-gray-900 tracking-tight">Conversion Funnel</h2>
               </div>
            </div>

            <div className="space-y-3.5 md:space-y-5">
              {funnel.map((stage, i) => (
                <div key={i} className="group">
                  <div className="flex items-center justify-between mb-1.5 md:mb-2">
                    <span className="text-[10px] md:text-sm font-semibold text-gray-700 uppercase tracking-widest">{stage.stage}</span>
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="text-[10px] md:text-sm text-gray-500 font-medium">{stage.count.toLocaleString()}</span>
                      <span className="text-[10px] md:text-sm font-bold text-[#004fa2] w-10 md:w-14 text-right bg-blue-50 px-1 md:px-1.5 py-0.5 rounded">{stage.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 h-5 md:h-8 rounded-md md:rounded-lg overflow-hidden border border-gray-200/50 shadow-inner p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-[#004fa2] to-[#0066cc] rounded md:rounded-md flex items-center justify-end pr-2 md:pr-3 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,79,162,0.3)] relative overflow-hidden group-hover:brightness-110"
                      style={{ width: `${stage.percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:15px_15px] md:bg-[length:20px_20px]"></div>
                      {stage.percentage > 15 && (
                        <span className="text-[9px] md:text-xs font-bold text-white relative z-10">{stage.count.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geography */}
          <div className="bg-white rounded-xl md:rounded-2xl p-2 md:p-4 lg:p-5 border border-gray-200 shadow-sm">
             <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center gap-1.5 md:gap-2">
                   <Globe size={16} className="text-gray-400" />
                   <h2 className="text-[11px] md:text-lg font-bold text-gray-900 tracking-tight">Geographic Hubs</h2>
                </div>
             </div>

             <div className="space-y-2 md:space-y-3">
               {geography.map((geo, i) => (
                 <div key={i} className="flex items-center justify-between p-2 md:p-3 border border-transparent hover:border-gray-100 bg-gray-50/50 hover:bg-gray-50 rounded-lg md:rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer group">
                   <div className="flex items-center gap-2 md:gap-4">
                     <span className="text-xl md:text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform">{geo.flag}</span>
                     <div>
                       <p className="text-xs md:text-sm font-bold text-gray-900 leading-tight">{geo.country}</p>
                       <p className="text-[10px] md:text-xs text-gray-500 font-medium">{geo.users} users</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-2 md:gap-3">
                     <div className="w-12 md:w-16 h-1 md:h-1.5 bg-gray-200 rounded-full hidden sm:block overflow-hidden">
                       <div className="h-full bg-[#004fa2] rounded-full" style={{ width: `${geo.percentage}%` }}></div>
                     </div>
                     <span className="text-[10px] md:text-sm font-bold text-[#004fa2] bg-blue-50 px-1.5 py-0.5 md:px-2 md:py-1 rounded md:rounded-md">{geo.percentage}%</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Top Courses TABLE */}
        <div className="bg-white rounded-xl md:rounded-2xl p-2 md:p-4 lg:p-5 border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-1.5 md:gap-2 mb-4 md:mb-6">
             <Star size={16} className="text-yellow-500 fill-yellow-500" />
             <h2 className="text-[11px] md:text-lg font-bold text-gray-900 tracking-tight">Top Performing Courses</h2>
          </div>

          <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0 scrollbar-none custom-scrollbar">
            <table className="w-full min-w-[500px] border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="text-left text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-widest pb-2 md:pb-3 pr-2 md:pr-4">Course Name</th>
                  <th className="text-right text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-widest pb-2 md:pb-3 px-2 md:px-4">Students</th>
                  <th className="text-right text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-widest pb-2 md:pb-3 px-2 md:px-4">Rating</th>
                  <th className="text-right text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-widest pb-2 md:pb-3 pl-2 md:pl-4">Completion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {training.topCourses.map((course, i) => (
                  <tr key={i} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="py-2.5 md:py-4 pr-2 md:pr-4">
                      <div className="flex items-center gap-2 md:gap-3">
                         <div className="w-5 h-5 md:w-8 md:h-8 rounded md:rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform hidden sm:flex">
                             <GraduationCap size={12} />
                         </div>
                         <span className="text-[11px] md:text-sm font-semibold text-gray-900 group-hover:text-[#004fa2] transition-colors">{course.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-2.5 md:py-4 px-2 md:px-4">
                      <span className="text-[10px] md:text-sm font-semibold text-gray-900 bg-gray-100 px-1.5 py-0.5 md:px-2 md:py-1 rounded md:rounded-md inline-block shadow-sm">{course.enrollments}</span>
                    </td>
                    <td className="text-right py-2.5 md:py-4 px-2 md:px-4">
                      <span className="text-[10px] md:text-sm font-semibold text-yellow-600 flex items-center justify-end gap-1 md:gap-1.5">
                        <Star size={10} fill="currentColor" className="drop-shadow-sm" /> {course.rating}
                      </span>
                    </td>
                    <td className="text-right py-2.5 md:py-4 pl-2 md:pl-4">
                      <span className={`text-[10px] md:text-sm font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded md:rounded-md inline-block shadow-sm whitespace-nowrap ${course.completion >= 75 ? 'text-green-600 bg-green-50 border border-green-100' : 'text-amber-600 bg-amber-50 border border-amber-100'}`}>
                        {course.completion}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
