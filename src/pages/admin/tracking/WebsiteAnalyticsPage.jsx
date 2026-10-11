/**
 * Website Analytics Page
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
  Calendar,
  ArrowUp,
  ArrowDown,
  ExternalLink
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
    { source: 'Direct', visitors: 4523, percentage: 35.2, change: 12.3 },
    { source: 'Organic Search', visitors: 3845, percentage: 29.9, change: 18.7 },
    { source: 'Social Media', visitors: 2345, percentage: 18.3, change: -5.2 },
    { source: 'Referral', visitors: 1234, percentage: 9.6, change: 8.4 },
    { source: 'Email', visitors: 900, percentage: 7.0, change: 15.6 }
  ];

  const deviceBreakdown = [
    { device: 'Desktop', visitors: 7234, percentage: 56.3, avgSession: '5m 23s' },
    { device: 'Mobile', visitors: 4523, percentage: 35.2, avgSession: '3m 45s' },
    { device: 'Tablet', visitors: 1090, percentage: 8.5, avgSession: '4m 12s' }
  ];

  const locationData = [
    { country: 'Ghana', flag: '🇬🇭', visitors: 8923, percentage: 69.5 },
    { country: 'Nigeria', flag: '🇳🇬', visitors: 2345, percentage: 18.3 },
    { country: 'United States', flag: '🇺🇸', visitors: 845, percentage: 6.6 },
    { country: 'United Kingdom', flag: '🇬🇧', visitors: 523, percentage: 4.1 },
    { country: 'Others', flag: '🌍', visitors: 211, percentage: 1.6 }
  ];

  const engagementMetrics = [
    { metric: 'Avg Pages/Session', value: '3.52', change: 8.2 },
    { metric: 'New vs Returning', value: '65% / 35%', change: null },
    { metric: 'Conversion Rate', value: '3.29%', change: 12.4 },
    { metric: 'Exit Rate', value: '42.1%', change: -6.3 }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 pb-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-6 text-white shadow-lg border border-blue-500/30">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Globe size={14} className="text-blue-200" />
                <span className="text-blue-200 text-xs font-bold uppercase tracking-wider">Internal Website Analytics</span>
              </div>
              <h1 className="text-2xl font-bold mb-1">Traffic & Engagement Dashboard</h1>
              <p className="text-blue-200 text-sm">Real-time website performance and user behavior insights</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium border border-white/20 flex items-center gap-2 transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <Users size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Total Visitors</p>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{stats.totalVisitors.toLocaleString()}</h3>
            <div className="flex items-center gap-1 text-xs">
              {stats.visitorsChange > 0 ? (
                <>
                  <ArrowUp size={12} className="text-green-600" />
                  <span className="text-green-600 font-semibold">+{stats.visitorsChange}%</span>
                </>
              ) : (
                <>
                  <ArrowDown size={12} className="text-red-600" />
                  <span className="text-red-600 font-semibold">{stats.visitorsChange}%</span>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
                <Eye size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Page Views</p>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{stats.pageViews.toLocaleString()}</h3>
            <div className="flex items-center gap-1 text-xs">
              <ArrowUp size={12} className="text-green-600" />
              <span className="text-green-600 font-semibold">+{stats.pageViewsChange}%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                <Clock size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Avg Session</p>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{stats.avgSessionDuration}</h3>
            <div className="flex items-center gap-1 text-xs">
              <ArrowDown size={12} className="text-red-600" />
              <span className="text-red-600 font-semibold">{stats.sessionChange}%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                <MousePointerClick size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Bounce Rate</p>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{stats.bounceRate}%</h3>
            <div className="flex items-center gap-1 text-xs">
              <ArrowDown size={12} className="text-green-600" />
              <span className="text-green-600 font-semibold">{stats.bounceChange}%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                <Activity size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Unique Users</p>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{stats.uniqueUsers.toLocaleString()}</h3>
            <div className="flex items-center gap-1 text-xs">
              <ArrowUp size={12} className="text-green-600" />
              <span className="text-green-600 font-semibold">+{stats.usersChange}%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                <TrendingUp size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Conversions</p>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{stats.conversions}</h3>
            <div className="flex items-center gap-1 text-xs">
              <ArrowUp size={12} className="text-green-600" />
              <span className="text-green-600 font-semibold">+{stats.conversionsChange}%</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Top Pages</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {topPages.map((page, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{page.title}</p>
                      <p className="text-xs text-gray-500 truncate">{page.path}</p>
                    </div>
                    <ExternalLink size={14} className="text-gray-400 shrink-0 ml-2" />
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>
                      <p className="text-gray-500 mb-0.5">Views</p>
                      <p className="font-semibold text-gray-900">{page.views.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-0.5">Visitors</p>
                      <p className="font-semibold text-gray-900">{page.uniqueVisitors.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-0.5">Avg Time</p>
                      <p className="font-semibold text-gray-900">{page.avgTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-0.5">Bounce</p>
                      <p className="font-semibold text-gray-900">{page.bounceRate}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Traffic Sources</h2>
            </div>
            <div className="p-4 space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900">{source.source}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-900">{source.visitors.toLocaleString()}</span>
                      <span className={`text-xs font-semibold ${source.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {source.change > 0 ? '+' : ''}{source.change}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 w-12 text-right">
                      {source.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Device Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-base font-bold text-gray-900">Device Breakdown</h2>
            </div>
            <div className="p-4 space-y-4">
              {deviceBreakdown.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900">{item.device}</span>
                    <span className="text-sm font-bold text-gray-900">{item.visitors.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 w-12 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Avg Session: {item.avgSession}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Data */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-base font-bold text-gray-900">Top Locations</h2>
            </div>
            <div className="p-4 space-y-3">
              {locationData.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-2xl shrink-0">{location.flag}</span>
                    <span className="text-sm font-medium text-gray-900 truncate">{location.country}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-semibold text-gray-900">{location.visitors.toLocaleString()}</span>
                    <span className="text-xs text-gray-500">({location.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-base font-bold text-gray-900">Engagement</h2>
            </div>
            <div className="p-4 space-y-4">
              {engagementMetrics.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{item.value}</span>
                    {item.change !== null && (
                      <span className={`text-xs font-semibold ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
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
    </AdminLayout>
  );
};

export default WebsiteAnalyticsPage;
