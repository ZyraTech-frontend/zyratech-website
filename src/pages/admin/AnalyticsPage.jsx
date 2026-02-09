/**
 * Business Analytics - Matching SuperAdminDashboard Design
 * Comprehensive analytics with consistent styling
 */

import React, { useState } from 'react';
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
  UserPlus
} from 'lucide-react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { trainingCourses } from '../../data/trainingCourses';
import { jobsData } from '../../data/jobsData';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('30days');

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
    active: jobsData.length,
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
      <div className="space-y-6 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Business Analytics</h1>
            <p className="text-sm text-gray-500 mt-1">Comprehensive insights across all operations</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#004fa2] cursor-pointer"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="12months">Last 12 Months</option>
            </select>
            <button className="px-4 py-2 bg-[#004fa2] text-white rounded-lg text-sm font-medium hover:bg-[#003d7a] transition-colors flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <AlertTriangle className="text-orange-600" size={24} />
              </div>
              <span className="text-2xl font-bold text-orange-600">{payments.pendingPayments + projects.pending}</span>
            </div>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">Pending Approvals</p>
            <p className="text-xs text-gray-500">{payments.pendingPayments} payments · {projects.pending} projects</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <UserPlus className="text-blue-600" size={24} />
              </div>
              <span className="text-2xl font-bold text-blue-600">+{users.newSignups}</span>
            </div>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">New Signups</p>
            <p className="text-xs text-gray-500">Last 24 hours</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <span className="text-2xl font-bold text-green-600">{systemHealth.serverUptime}%</span>
            </div>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-1">System Uptime</p>
            <p className="text-xs text-gray-500">All services operational</p>
          </div>
        </div>

        {/* Key Business Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <DollarSign className="text-white" size={20} />
              </div>
              <span className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
                <TrendingUp size={12} /> +{metrics.revenue.growth}%
              </span>
            </div>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">Total Revenue</p>
            <h3 className="text-4xl font-black text-gray-900">GHS {metrics.revenue.total.toLocaleString()}</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="text-white" size={20} />
              </div>
              <span className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
                <TrendingUp size={12} /> +{users.signupGrowth}%
              </span>
            </div>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">Total Users</p>
            <h3 className="text-4xl font-black text-gray-900">{users.total.toLocaleString()}</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="text-white" size={20} />
              </div>
              <span className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
                <TrendingUp size={12} /> +{metrics.conversion.change}%
              </span>
            </div>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">Conversion Rate</p>
            <h3 className="text-4xl font-black text-gray-900">{metrics.conversion.rate}%</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <CreditCard className="text-white" size={20} />
              </div>
              <span className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
                <CheckCircle size={12} /> {payments.successRate}%
              </span>
            </div>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">Payment Success</p>
            <h3 className="text-4xl font-black text-gray-900">{payments.successfulPayments}</h3>
          </div>
        </div>

        {/* Revenue Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Revenue Distribution</h2>
            <span className="text-xs text-gray-500">By service category</span>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <GraduationCap size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Training Courses</p>
                    <p className="text-xs text-gray-500">GHS {training.revenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">51.8%</p>
                  <p className="text-xs text-green-600 font-semibold">+22.3%</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '51.8%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FolderKanban size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Project Requests</p>
                    <p className="text-xs text-gray-500">GHS {projects.revenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">37.6%</p>
                  <p className="text-xs text-green-600 font-semibold">+15.8%</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full" style={{ width: '37.6%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Briefcase size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Job Placements</p>
                    <p className="text-xs text-gray-500">GHS {jobs.revenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">10.6%</p>
                  <p className="text-xs text-green-600 font-semibold">+8.2%</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" style={{ width: '10.6%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Trends */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">12-Month Revenue Trends</h2>
              <p className="text-xs text-gray-500 mt-1">Monthly breakdown by service</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#004fa2]"></div>
                <span className="text-gray-600">Training</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0066cc]"></div>
                <span className="text-gray-600">Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00a8ff]"></div>
                <span className="text-gray-600">Jobs</span>
              </div>
            </div>
          </div>

          <div className="h-64 flex items-end gap-2">
            {revenueTrend.map((month, i) => {
              const total = month.training + month.projects + month.jobs;
              const maxTotal = Math.max(...revenueTrend.map(m => m.training + m.projects + m.jobs));
              const heightPercent = (total / maxTotal) * 100;

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] font-semibold text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
                    {total.toLocaleString()}
                  </div>
                  <div className="w-full flex flex-col-reverse gap-0.5" style={{ height: `${heightPercent}%` }}>
                    <div className="w-full bg-[#004fa2] rounded-t" style={{ height: `${(month.training / total) * 100}%` }}></div>
                    <div className="w-full bg-[#0066cc]" style={{ height: `${(month.projects / total) * 100}%` }}></div>
                    <div className="w-full bg-[#00a8ff]" style={{ height: `${(month.jobs / total) * 100}%` }}></div>
                  </div>
                  <span className="text-[10px] text-gray-600 font-medium">{month.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Service Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="text-white" size={20} />
              </div>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
                {training.completion}%
              </span>
            </div>

            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Training</p>
            <h3 className="text-4xl font-black text-gray-900 mb-4">{training.enrollments}</h3>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active</span>
                <span className="text-sm font-bold text-blue-600">{training.active}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-sm font-bold text-green-600">{training.completed}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Courses</span>
                <span className="text-sm font-bold text-gray-900">{training.courses}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="text-white" size={20} />
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full">
                {jobs.placements}
              </span>
            </div>

            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Jobs</p>
            <h3 className="text-4xl font-black text-gray-900 mb-4">{jobs.active}</h3>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Applications</span>
                <span className="text-sm font-bold text-gray-900">{jobs.applications.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Placements</span>
                <span className="text-sm font-bold text-green-600">{jobs.placements}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Time</span>
                <span className="text-sm font-bold text-gray-900">{jobs.avgHireTime}d</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <FolderKanban className="text-white" size={20} />
              </div>
              <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
                {projects.conversion}%
              </span>
            </div>

            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Projects</p>
            <h3 className="text-4xl font-black text-gray-900 mb-4">{projects.total}</h3>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active</span>
                <span className="text-sm font-bold text-cyan-600">{projects.active}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-sm font-bold text-green-600">{projects.completed}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Value</span>
                <span className="text-sm font-bold text-gray-900">GHS {projects.avgValue}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Handshake className="text-white" size={20} />
              </div>
              <span className="text-xs font-bold text-orange-700 bg-orange-100 px-3 py-1.5 rounded-full">
                {partnerships.pending}
              </span>
            </div>

            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Partners</p>
            <h3 className="text-4xl font-black text-gray-900 mb-4">{partnerships.total}</h3>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active</span>
                <span className="text-sm font-bold text-purple-600">{partnerships.active}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-bold text-orange-600">{partnerships.pending}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Geography & System */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Geographic Distribution</h2>
              <Globe size={18} className="text-gray-400" />
            </div>

            <div className="space-y-4">
              {geography.map((geo, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{geo.flag}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{geo.country}</p>
                      <p className="text-xs text-gray-500">{geo.users} users</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#004fa2]">{geo.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">System Health</h2>
              <Activity size={18} className="text-green-500" />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Server Uptime</span>
                  <span className="text-sm font-bold text-green-600">{systemHealth.serverUptime}%</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: `${systemHealth.serverUptime}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Database Health</span>
                  <span className="text-sm font-bold text-green-600">{systemHealth.databaseHealth}%</span>
                </div>
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: `${systemHealth.databaseHealth}%` }}></div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Response</span>
                  <span className="text-sm font-bold text-gray-900">{systemHealth.avgResponseTime}ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Calls (24h)</span>
                  <span className="text-sm font-bold text-gray-900">{systemHealth.apiCalls.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Conversion Funnel</h2>

          <div className="space-y-4">
            {funnel.map((stage, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">{stage.stage}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{stage.count.toLocaleString()}</span>
                    <span className="text-xs font-bold text-[#004fa2] w-12 text-right">{stage.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 h-8 rounded-xl overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#004fa2] to-[#0066cc] flex items-center justify-end pr-3 transition-all duration-500"
                    style={{ width: `${stage.percentage}%` }}
                  >
                    {stage.percentage > 15 && (
                      <span className="text-xs font-bold text-white">{stage.count.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Courses */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Top Performing Courses</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3 pr-4">Course</th>
                  <th className="text-right text-xs font-semibold text-gray-600 pb-3 px-4">Students</th>
                  <th className="text-right text-xs font-semibold text-gray-600 pb-3 px-4">Rating</th>
                  <th className="text-right text-xs font-semibold text-gray-600 pb-3 pl-4">Completion</th>
                </tr>
              </thead>
              <tbody>
                {training.topCourses.map((course, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 pr-4">
                      <span className="text-sm font-medium text-gray-900">{course.name}</span>
                    </td>
                    <td className="text-right py-4 px-4">
                      <span className="text-sm font-semibold text-gray-900">{course.enrollments}</span>
                    </td>
                    <td className="text-right py-4 px-4">
                      <span className="text-sm font-semibold text-yellow-600 flex items-center justify-end gap-1">
                        <Star size={12} fill="currentColor" /> {course.rating}
                      </span>
                    </td>
                    <td className="text-right py-4 pl-4">
                      <span className={`text-sm font-semibold ${course.completion >= 75 ? 'text-green-600' : 'text-yellow-600'
                        }`}>
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
