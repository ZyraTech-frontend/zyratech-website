/**
 * Website Analytics Page - Premium UI Redesign
 * Internal website traffic and engagement analytics dashboard
 */

import React, { useState } from 'react';
import {
  Globe,
  TrendingUp,
  Eye,
  MousePointerClick,
  Clock,
  Users,
  FileText,
  BarChart3,
  Activity,
  Download,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Info,
  HelpCircle,
  Smartphone,
  Monitor,
  Tablet,
  Filter,
  CalendarDays,
  Search,
  ChevronRight,
  Circle
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';

const WebsiteAnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('pageviews');

  // TODO: Replace with real API data
  const stats = {
    totalVisitors: 12847,
    visitorsChange: 18.5,
    pageViews: 45234,
    pageViewsChange: 12.3,
    avgSessionDuration: '4m 32s',
    sessionChange: -2.1,
    bounceRate: 38.2,
    bounceChange: -5.3,
    uniqueUsers: 8432,
    usersChange: 15.7,
    conversions: 423,
    conversionsChange: 22.4
  };

  const topPages = [
    { path: '/', title: 'Home Page', views: 8234, uniqueVisitors: 6123, avgTime: '3m 12s', bounceRate: 32.4 },
    { path: '/training', title: 'Training Courses', views: 5421, uniqueVisitors: 4234, avgTime: '6m 45s', bounceRate: 28.1 },
    { path: '/services', title: 'Our Services', views: 4321, uniqueVisitors: 3456, avgTime: '4m 23s', bounceRate: 35.7 },
    { path: '/about', title: 'About Us', views: 3234, uniqueVisitors: 2845, avgTime: '3m 56s', bounceRate: 41.2 },
    { path: '/projects', title: 'Our Projects', views: 2845, uniqueVisitors: 2234, avgTime: '5m 12s', bounceRate: 36.8 },
    { path: '/contact', title: 'Contact Us', views: 2134, uniqueVisitors: 1834, avgTime: '2m 34s', bounceRate: 44.3 },
    { path: '/blog', title: 'Blog', views: 1923, uniqueVisitors: 1623, avgTime: '7m 23s', bounceRate: 25.6 },
    { path: '/partnerships', title: 'Partnerships', views: 1456, uniqueVisitors: 1245, avgTime: '4m 45s', bounceRate: 38.9 }
  ];

  const trafficSources = [
    { source: 'Direct', visitors: 4523, percentage: 35.2, change: 12.3, color: 'bg-blue-500' },
    { source: 'Organic Search', visitors: 3845, percentage: 29.9, change: 18.7, color: 'bg-green-500' },
    { source: 'Social Media', visitors: 2345, percentage: 18.3, change: -5.2, color: 'bg-purple-500' },
    { source: 'Referral', visitors: 1234, percentage: 9.6, change: 8.4, color: 'bg-orange-500' },
    { source: 'Email', visitors: 900, percentage: 7.0, change: 15.6, color: 'bg-blue-400' }
  ];

  const deviceBreakdown = [
    { device: 'Desktop', icon: Monitor, visitors: 7234, percentage: 56.3, avgSession: '5m 23s', color: 'bg-blue-500' },
    { device: 'Mobile', icon: Smartphone, visitors: 4523, percentage: 35.2, avgSession: '3m 45s', color: 'bg-blue-500' },
    { device: 'Tablet', icon: Tablet, visitors: 1090, percentage: 8.5, avgSession: '4m 12s', color: 'bg-purple-500' }
  ];

  const locationData = [
    { country: 'Ghana', flag: '🇬🇭', visitors: 8923, percentage: 69.5 },
    { country: 'Nigeria', flag: '🇳🇬', visitors: 2345, percentage: 18.3 },
    { country: 'United States', flag: '🇺🇸', visitors: 845, percentage: 6.6 },
    { country: 'United Kingdom', flag: '🇬🇧', visitors: 523, percentage: 4.1 },
    { country: 'Others', flag: '🌍', visitors: 211, percentage: 1.6 }
  ];

  const engagementMetrics = [
    { metric: 'Avg Pages/Session', value: '3.52', change: 8.2, color: 'bg-blue-500' },
    { metric: 'New vs Returning', value: '65% / 35%', change: null, color: 'bg-purple-500' },
    { metric: 'Conversion Rate', value: '3.29%', change: 12.4, color: 'bg-green-500' },
    { metric: 'Exit Rate', value: '42.1%', change: -6.3, color: 'bg-orange-500' }
  ];

  const metrics = [
    { label: 'Total Visitors', value: stats.totalVisitors.toLocaleString(), change: stats.visitorsChange, icon: Users, color: 'bg-blue-500' },
    { label: 'Page Views', value: stats.pageViews.toLocaleString(), change: stats.pageViewsChange, icon: Eye, color: 'bg-blue-400' },
    { label: 'Avg Session', value: stats.avgSessionDuration, change: stats.sessionChange, icon: Clock, color: 'bg-purple-500' },
    { label: 'Bounce Rate', value: `${stats.bounceRate}%`, change: stats.bounceChange, icon: MousePointerClick, color: 'bg-orange-500' },
    { label: 'Unique Users', value: stats.uniqueUsers.toLocaleString(), change: stats.usersChange, icon: Users, color: 'bg-green-500' },
    { label: 'Conversions', value: stats.conversions, change: stats.conversionsChange, icon: TrendingUp, color: 'bg-green-500' }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 pb-8">
        {/* Premium Header with ZyraTech Brand Colors */}
        <div className="bg-gradient-to-br from-[#004fa2] via-[#003d7a] to-[#0066cc] rounded-2xl p-6 text-white relative overflow-hidden shadow-xl border border-blue-500/30">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -ml-12 -mb-12 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={16} className="text-blue-200" />
                  <span className="text-blue-200 text-xs font-bold uppercase tracking-wider">Website Analytics</span>
                </div>
                <h1 className="text-2xl font-bold mb-1">Traffic & Engagement Dashboard</h1>
                <p className="text-blue-100 text-sm">Monitor your website's performance and user behavior</p>
              </div>
              
              <div className="flex items-center gap-2">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="today" className="text-gray-900">Today</option>
                  <option value="7days" className="text-gray-900">Last 7 Days</option>
                  <option value="30days" className="text-gray-900">Last 30 Days</option>
                  <option value="90days" className="text-gray-900">Last 90 Days</option>
                </select>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium border border-white/20 flex items-center gap-2 transition-colors">
                  <Download size={16} />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${metric.color} bg-opacity-90`}>
                      <metric.icon size={16} className="text-white" />
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold flex items-center justify-end gap-1 ${
                        metric.change > 0 ? 'text-green-300' : metric.change < 0 ? 'text-red-300' : 'text-blue-200'
                      }`}>
                        {metric.change !== undefined && (
                          <>
                            {metric.change > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                            {Math.abs(metric.change)}%
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-blue-200 mb-1">{metric.label}</p>
                  <h3 className="text-lg font-bold">{metric.value}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Filters & Quick Stats */}
          <div className="space-y-6">
            {/* Date Range Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <CalendarDays size={16} />
                Date Range
              </h3>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>

            {/* Traffic Sources */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BarChart3 size={16} />
                Traffic Sources
              </h3>
              <div className="space-y-3">
                {trafficSources.map((source, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${source.color}`} />
                        <span className="text-sm font-medium text-gray-700">{source.source}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">{source.visitors.toLocaleString()}</span>
                        <span className={`text-xs font-bold ${source.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {source.change > 0 ? '+' : ''}{source.change}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full ${source.color}`} style={{ width: `${source.percentage}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 w-10 text-right">{source.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Device Types</h3>
              <div className="space-y-3">
                {deviceBreakdown.map((device, index) => {
                  const Icon = device.icon;
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                            <Icon size={16} />
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{device.device}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{device.visitors.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full ${device.color}`} style={{ width: `${device.percentage}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 w-10 text-right">{device.percentage}%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">Avg session: {device.avgSession}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content - Top Pages */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Most Visited Pages</h2>
                    <p className="text-sm text-gray-600">Top performing pages on your website</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search pages..."
                        className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pages List */}
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {topPages.map((page, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-bold text-gray-900 mb-0.5">{page.title}</h3>
                            <p className="text-xs text-gray-500 truncate">{page.path}</p>
                          </div>
                        </div>
                      </div>
                      
                      <ExternalLink size={16} className="text-gray-400 hover:text-gray-600 transition-colors" />
                    </div>

                    {/* Stats */}
                    <div className="ml-9 grid grid-cols-4 gap-2">
                      <div className="bg-blue-50 rounded p-2">
                        <p className="text-xs text-gray-500 mb-0.5">Views</p>
                        <p className="text-sm font-bold text-gray-900">{page.views.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-50 rounded p-2">
                        <p className="text-xs text-gray-500 mb-0.5">Visitors</p>
                        <p className="text-sm font-bold text-gray-900">{page.uniqueVisitors.toLocaleString()}</p>
                      </div>
                      <div className="bg-purple-50 rounded p-2">
                        <p className="text-xs text-gray-500 mb-0.5">Avg Time</p>
                        <p className="text-sm font-bold text-gray-900">{page.avgTime}</p>
                      </div>
                      <div className="bg-orange-50 rounded p-2">
                        <p className="text-xs text-gray-500 mb-0.5">Bounce Rate</p>
                        <p className="text-sm font-bold text-gray-900">{page.bounceRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Locations */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Top Locations</h3>
                  <Globe size={16} className="text-gray-500" />
                </div>
                <div className="space-y-2">
                  {locationData.map((location, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{location.flag}</span>
                        <span className="text-sm font-medium text-gray-700">{location.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">{location.visitors.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">({location.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engagement Metrics */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Engagement Metrics</h3>
                  <Activity size={16} className="text-gray-500" />
                </div>
                <div className="space-y-3">
                  {engagementMetrics.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-sm font-medium text-gray-700">{item.metric}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">{item.value}</span>
                        {item.change !== null && (
                          <span className={`text-xs font-bold ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {item.change > 0 ? '+' : ''}{item.change}%
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default WebsiteAnalyticsPage;
