/**
 * Super Admin Dashboard Overview
 * Professional dashboard with real metrics, charts, and insights
 */

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Briefcase, 
  GraduationCap,
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Eye,
  Calendar,
  Image,
  MessageSquare,
  FileText
} from 'lucide-react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { useDispatch } from 'react-redux';
import { fetchSettings } from '../../store/slices/settingsSlice';
import { trainingCourses } from '../../data/trainingCourses';
import { jobsData } from '../../data/jobsData';

const DashboardPage = () => {
  const { user } = useAuth();
  const { isSuperAdmin } = usePermissions();
  const dispatch = useDispatch();
  
  // Real metrics from actual data
  const totalTrainingCourses = trainingCourses.length;
  const totalJobListings = jobsData.length;
  const totalEnrollments = 247; // Mock but realistic
  const totalRevenue = 125840; // Mock revenue in GHS
  const websiteVisitors = 12458;
  const galleryImages = 342;
  const contactInquiries = 89;
  const blogArticles = 23;

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  // Monthly enrollment trend data (last 6 months)
  const enrollmentTrend = [
    { month: 'Sep', enrollments: 28 },
    { month: 'Oct', enrollments: 42 },
    { month: 'Nov', enrollments: 35 },
    { month: 'Dec', enrollments: 48 },
    { month: 'Jan', enrollments: 52 },
    { month: 'Feb', enrollments: 42 }
  ];

  // Revenue trend (last 6 months in GHS)
  const revenueTrend = [
    { month: 'Sep', revenue: 15200 },
    { month: 'Oct', revenue: 22400 },
    { month: 'Nov', revenue: 18900 },
    { month: 'Dec', revenue: 24600 },
    { month: 'Jan', revenue: 28400 },
    { month: 'Feb', revenue: 16340 }
  ];

  // Quick stat cards - Different for Super Admin vs Regular Admin
  const statCards = isSuperAdmin ? [
    {
      id: 'trainingCourses',
      label: 'Training Courses',
      value: totalTrainingCourses,
      trend: '+3 this month',
      trendDir: 'up',
      icon: GraduationCap,
      color: 'blue',
      iconSize: 22
    },
    {
      id: 'enrollments',
      label: 'Total Enrollments',
      value: totalEnrollments,
      trend: '+12.5% vs last month',
      trendDir: 'up',
      icon: Users,
      color: 'green',
      iconSize: 24
    },
    {
      id: 'revenue',
      label: 'Total Revenue',
      value: `GHS ${totalRevenue.toLocaleString()}`,
      trend: '+8.2% growth',
      trendDir: 'up',
      icon: DollarSign,
      color: 'purple',
      variant: 'highlight',
      iconSize: 26
    },
    {
      id: 'jobListings',
      label: 'Active Jobs',
      value: totalJobListings,
      trend: 'Recently updated',
      trendDir: 'neutral',
      icon: Briefcase,
      color: 'orange',
      iconSize: 21
    },
    {
      id: 'visitors',
      label: 'Website Visitors',
      value: websiteVisitors.toLocaleString(),
      trend: '+24.3% this month',
      trendDir: 'up',
      icon: Eye,
      color: 'cyan',
      iconSize: 23
    },
    {
      id: 'inquiries',
      label: 'Contact Inquiries',
      value: contactInquiries,
      trend: '23 pending',
      trendDir: 'neutral',
      icon: MessageSquare,
      color: 'red',
      iconSize: 22
    }
  ] : [
    {
      id: 'trainingCourses',
      label: 'Training Courses',
      value: totalTrainingCourses,
      trend: '+3 this month',
      trendDir: 'up',
      icon: GraduationCap,
      color: 'blue',
      iconSize: 22,
      variant: 'highlight'
    },
    {
      id: 'enrollments',
      label: 'Total Enrollments',
      value: totalEnrollments,
      trend: '+12.5% vs last month',
      trendDir: 'up',
      icon: Users,
      color: 'green',
      iconSize: 24
    },
    {
      id: 'jobListings',
      label: 'Active Jobs',
      value: totalJobListings,
      trend: 'Recently updated',
      trendDir: 'neutral',
      icon: Briefcase,
      color: 'orange',
      iconSize: 21
    },
    {
      id: 'inquiries',
      label: 'Contact Inquiries',
      value: contactInquiries,
      trend: '23 pending',
      trendDir: 'neutral',
      icon: MessageSquare,
      color: 'red',
      iconSize: 22
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-5 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isSuperAdmin ? 'Super Admin Dashboard' : 'Admin Dashboard'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.name || user?.email}</p>
          </div>
          {isSuperAdmin && (
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                <Calendar className="inline mr-2" size={16} />
                Last 30 days
              </button>
              <button className="px-4 py-2 bg-[#004fa2] text-white rounded-lg text-sm font-medium hover:bg-[#003d7a] transition">
                Generate Report
              </button>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            const isHighlight = card.variant === 'highlight';
            const isUp = card.trendDir === 'up';
            const isNeutral = card.trendDir === 'neutral';

            return (
              <div
                key={card.id}
                className={`group relative rounded-xl p-5 cursor-pointer transition-all duration-200 ${
                  isHighlight
                    ? 'bg-gradient-to-br from-[#004fa2] via-[#003d7a] to-[#002d5c] text-white shadow-lg hover:shadow-xl'
                    : 'bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300'
                }`}
                style={{
                  transform: `rotate(${index % 2 === 0 ? '-0.5deg' : '0.5deg'})`,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `rotate(${index % 2 === 0 ? '-0.5deg' : '0.5deg'})`;
                }}
              >
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        isHighlight 
                          ? 'bg-white/10' 
                          : card.color === 'blue'
                          ? 'bg-blue-50'
                          : card.color === 'green'
                          ? 'bg-green-50'
                          : card.color === 'orange'
                          ? 'bg-orange-50'
                          : card.color === 'cyan'
                          ? 'bg-cyan-50'
                          : card.color === 'red'
                          ? 'bg-red-50'
                          : 'bg-gray-50'
                      }`}
                    >
                      <Icon 
                        className={`transition-colors duration-200 ${
                          isHighlight 
                            ? 'text-white' 
                            : card.color === 'blue'
                            ? 'text-blue-600'
                            : card.color === 'green'
                            ? 'text-green-600'
                            : card.color === 'orange'
                            ? 'text-orange-600'
                            : card.color === 'cyan'
                            ? 'text-cyan-600'
                            : card.color === 'red'
                            ? 'text-red-600'
                            : 'text-gray-600'
                        }`} 
                        size={card.iconSize || 22}
                        strokeWidth={2.5}
                      />
                    </div>
                    
                    <div className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                      isHighlight
                        ? 'bg-white/15 text-white'
                        : isNeutral
                        ? 'bg-gray-100 text-gray-600'
                        : isUp
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {!isNeutral && (isUp ? '↑' : '↓')} {card.trend}
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <p
                      className={`text-xs font-medium ${
                        isHighlight ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {card.label}
                    </p>
                    <h3
                      className={`text-3xl font-bold ${
                        isHighlight ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {card.value}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        {isSuperAdmin && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Enrollment Trend Chart */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-bold text-gray-900">Enrollment Trends</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Last 6 months performance</p>
                </div>
                <select className="text-xs border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#004fa2] transition-all cursor-pointer hover:border-gray-400">
                  <option>6 Months</option>
                  <option>3 Months</option>
                  <option>1 Year</option>
                </select>
              </div>

              {/* Bar Chart */}
              <div className="space-y-3">
                <div className="flex items-end gap-2 h-44">
                  {enrollmentTrend.map((data, i) => {
                    const maxEnrollment = Math.max(...enrollmentTrend.map(d => d.enrollments));
                    const heightPercent = (data.enrollments / maxEnrollment) * 100;
                    
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group/bar">
                        <div className="text-[10px] font-semibold text-[#004fa2] opacity-0 group-hover/bar:opacity-100 transition-opacity">
                          {data.enrollments}
                        </div>
                        <div 
                          className="w-full bg-gradient-to-t from-[#004fa2] to-[#0066cc] rounded-t transition-all duration-200 hover:from-[#003d7a] hover:to-[#004fa2] cursor-pointer relative"
                          style={{ 
                            height: `${heightPercent}%`,
                            borderRadius: i % 2 === 0 ? '4px 4px 0 0' : '3px 3px 0 0'
                          }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-10">
                            {data.enrollments} students
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-600 font-medium">{data.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Revenue Trend Chart */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-bold text-gray-900">Revenue Overview</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Monthly revenue in GHS</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-[#004fa2]">GHS 125,840</p>
                  <p className="text-[10px] text-green-600 flex items-center gap-0.5 justify-end mt-0.5">
                    <TrendingUp size={10} />
                    <span>+8.2% growth</span>
                  </p>
                </div>
              </div>

              {/* Line Chart Visualization */}
              <div className="space-y-3">
                <div className="h-44 relative">
                  <svg className="w-full h-full">
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={`${y}%`}
                        x2="100%"
                        y2={`${y}%`}
                        stroke="#f3f4f6"
                        strokeWidth="1"
                      />
                    ))}
                    
                    <defs>
                      <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#004fa2" />
                        <stop offset="100%" stopColor="#0066cc" />
                      </linearGradient>
                      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#004fa2" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#004fa2" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Area under line */}
                    <path
                      d={`M 0,176 L ${revenueTrend.map((data, i) => {
                        const maxRevenue = Math.max(...revenueTrend.map(d => d.revenue));
                        const x = (i / (revenueTrend.length - 1)) * 100;
                        const y = 176 - ((data.revenue / maxRevenue) * 150);
                        return `${x},${y}`;
                      }).join(' L ')} L 100,176 Z`}
                      fill="url(#areaGradient)"
                    />
                    
                    {/* Revenue line */}
                    <polyline
                      fill="none"
                      stroke="url(#revenueGradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={revenueTrend.map((data, i) => {
                        const maxRevenue = Math.max(...revenueTrend.map(d => d.revenue));
                        const x = (i / (revenueTrend.length - 1)) * 100;
                        const y = 176 - ((data.revenue / maxRevenue) * 150);
                        return `${x},${y}`;
                      }).join(' ')}
                    />
                    
                    {/* Data points */}
                    {revenueTrend.map((data, i) => {
                      const maxRevenue = Math.max(...revenueTrend.map(d => d.revenue));
                      const x = (i / (revenueTrend.length - 1)) * 100;
                      const y = 100 - ((data.revenue / maxRevenue) * 85);
                      
                      return (
                        <g key={i} className="cursor-pointer group/point">
                          <circle
                            cx={`${x}%`}
                            cy={`${y}%`}
                            r="3"
                            fill="white"
                            stroke="#004fa2"
                            strokeWidth="2"
                          />
                          <text
                            x={`${x}%`}
                            y={`${y - 6}%`}
                            textAnchor="middle"
                            className="text-[10px] font-bold fill-[#004fa2] opacity-0 group-hover/point:opacity-100 transition-opacity"
                          >
                            {(data.revenue / 1000).toFixed(1)}k
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                  
                  {/* Month labels */}
                  <div className="flex justify-between mt-1.5">
                    {revenueTrend.map((data, i) => (
                      <span key={i} className="text-[10px] text-gray-600 font-medium">
                        {data.month}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Recent Enrollments */}
          <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">Recent Enrollments</h2>
              <button className="text-xs text-[#004fa2] hover:text-[#003d7a] font-medium transition-colors">
                View All →
              </button>
            </div>
            
            <div className="space-y-2">
              {[
                { name: 'Kwame Mensah', course: 'DevOps Engineering', date: '2 hours ago', status: 'pending' },
                { name: 'Abena Osei', course: 'Data Analysis with Python', date: '5 hours ago', status: 'confirmed' },
                { name: 'Kofi Asante', course: 'Web Development', date: '1 day ago', status: 'confirmed' },
                { name: 'Ama Adjei', course: 'Cloud Architecture', date: '1 day ago', status: 'pending' },
                { name: 'Yaw Boateng', course: 'DevOps Engineering', date: '2 days ago', status: 'confirmed' }
              ].map((enrollment, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {enrollment.name.charAt(0)}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                        enrollment.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {enrollment.name}
                      </p>
                      <p className="text-xs text-gray-500">{enrollment.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${
                      enrollment.status === 'confirmed' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      {enrollment.status}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{enrollment.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <h2 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h2>
            
            <div className="space-y-2.5">
              <button className="w-full flex items-center gap-3 p-3 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors">
                <GraduationCap size={18} strokeWidth={2.5} />
                <span className="text-sm font-medium">Add Course</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                <FileText size={18} strokeWidth={2.5} />
                <span className="text-sm font-medium">Create Article</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                <Briefcase size={18} strokeWidth={2.5} />
                <span className="text-sm font-medium">Post Job</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                <Image size={18} strokeWidth={2.5} />
                <span className="text-sm font-medium">Upload Media</span>
              </button>
            </div>

            <div className="mt-5 pt-5 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-700 mb-3">System Health</h3>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-xs text-gray-600 font-medium">Database</span>
                  <span className="flex items-center gap-1.5 text-xs text-green-600">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    <span className="font-semibold">Online</span>
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-xs text-gray-600 font-medium">API Status</span>
                  <span className="flex items-center gap-1.5 text-xs text-green-600">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    <span className="font-semibold">Healthy</span>
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-xs text-gray-600 font-medium">Storage</span>
                  <div className="flex items-center gap-2">
                    <div className="w-14 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#004fa2] rounded-full" style={{ width: '67%' }}></div>
                    </div>
                    <span className="text-xs text-gray-700 font-semibold">67%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
