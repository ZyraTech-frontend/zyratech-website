/**
 * Analytics Page - Super Admin Only
 * Comprehensive analytics dashboard with detailed metrics and insights
 */

import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Clock,
  Globe,
  Smartphone,
  Monitor,
  MousePointer,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import AdminLayout from '../../components/admin/layout/AdminLayout';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7days');

  // Key metrics data
  const keyMetrics = [
    {
      label: 'Total Page Views',
      value: '45,832',
      change: '+18.2%',
      trend: 'up',
      icon: Eye,
      color: 'blue'
    },
    {
      label: 'Unique Visitors',
      value: '12,458',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'green'
    },
    {
      label: 'Avg. Session Duration',
      value: '3m 42s',
      change: '+8.1%',
      trend: 'up',
      icon: Clock,
      color: 'purple'
    },
    {
      label: 'Bounce Rate',
      value: '42.3%',
      change: '-5.2%',
      trend: 'down',
      icon: MousePointer,
      color: 'orange'
    }
  ];

  // Traffic sources data
  const trafficSources = [
    { source: 'Direct', visits: 5243, percentage: 42, color: '#004fa2' },
    { source: 'Organic Search', visits: 3891, percentage: 31, color: '#0066cc' },
    { source: 'Social Media', visits: 2137, percentage: 17, color: '#00a8ff' },
    { source: 'Referral', visits: 1187, percentage: 10, color: '#80d4ff' }
  ];

  // Device breakdown
  const deviceData = [
    { device: 'Mobile', users: 7245, percentage: 58.2, icon: Smartphone },
    { device: 'Desktop', users: 3981, percentage: 31.9, icon: Monitor },
    { device: 'Tablet', users: 1232, percentage: 9.9, icon: Monitor }
  ];

  // Top pages
  const topPages = [
    { page: '/training', views: 8923, avgTime: '4m 23s', bounceRate: '38.2%' },
    { page: '/about', views: 6512, avgTime: '3m 12s', bounceRate: '41.5%' },
    { page: '/projects', views: 5234, avgTime: '2m 45s', bounceRate: '45.8%' },
    { page: '/contact', views: 4123, avgTime: '2m 18s', bounceRate: '52.3%' },
    { page: '/blog', views: 3456, avgTime: '5m 34s', bounceRate: '35.1%' }
  ];

  // Geographic distribution
  const topCountries = [
    { country: 'Ghana', flag: '🇬🇭', users: 4892, percentage: 39.3 },
    { country: 'Nigeria', flag: '🇳🇬', users: 3245, percentage: 26.0 },
    { country: 'United States', flag: '🇺🇸', users: 1834, percentage: 14.7 },
    { country: 'United Kingdom', flag: '🇬🇧', users: 1123, percentage: 9.0 },
    { country: 'South Africa', flag: '🇿🇦', users: 892, percentage: 7.2 },
    { country: 'Others', flag: '🌍', users: 472, percentage: 3.8 }
  ];

  // Hourly traffic pattern (24 hours)
  const hourlyTraffic = [
    320, 280, 245, 210, 198, 234, 367, 489, 542, 598, 634, 723,
    712, 689, 678, 745, 823, 912, 856, 734, 623, 534, 456, 378
  ];

  return (
    <AdminLayout>
      <div className="space-y-5 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
            <p className="text-sm text-gray-500 mt-1">Detailed insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#004fa2] cursor-pointer"
            >
              <option value="24hours">Last 24 Hours</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
            <button className="px-4 py-2 bg-[#004fa2] text-white rounded-lg text-sm font-medium hover:bg-[#003d7a] transition-colors">
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {keyMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const isPositive = metric.trend === 'up';

            return (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                      metric.color === 'blue'
                        ? 'bg-blue-50'
                        : metric.color === 'green'
                        ? 'bg-green-50'
                        : metric.color === 'purple'
                        ? 'bg-purple-50'
                        : 'bg-orange-50'
                    }`}
                  >
                    <Icon
                      className={
                        metric.color === 'blue'
                          ? 'text-blue-600'
                          : metric.color === 'green'
                          ? 'text-green-600'
                          : metric.color === 'purple'
                          ? 'text-purple-600'
                          : 'text-orange-600'
                      }
                      size={20}
                      strokeWidth={2.5}
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {metric.change}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium mb-1">{metric.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
              </div>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Traffic Sources */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">Traffic Sources</h2>
              <PieChart size={18} className="text-gray-400" />
            </div>
            
            <div className="space-y-3">
              {trafficSources.map((source, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">{source.source}</span>
                    <span className="text-gray-900 font-semibold">{source.percentage}%</span>
                  </div>
                  <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${source.percentage}%`,
                        backgroundColor: source.color
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{source.visits.toLocaleString()} visits</p>
                </div>
              ))}
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">Device Breakdown</h2>
              <BarChart3 size={18} className="text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {deviceData.map((device, i) => {
                const Icon = device.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                      <Icon size={18} className="text-gray-600" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">{device.device}</span>
                        <span className="text-xs text-gray-500">{device.percentage}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#004fa2] rounded-full transition-all duration-500"
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{device.users.toLocaleString()} users</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Countries */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">Geographic Distribution</h2>
              <Globe size={18} className="text-gray-400" />
            </div>
            
            <div className="space-y-2.5">
              {topCountries.map((country, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{country.flag}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{country.country}</p>
                      <p className="text-xs text-gray-500">{country.users.toLocaleString()} users</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#004fa2]">{country.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hourly Traffic Pattern */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-gray-900">Hourly Traffic Pattern</h2>
              <p className="text-xs text-gray-500 mt-0.5">Traffic distribution over 24 hours</p>
            </div>
            <Activity size={18} className="text-gray-400" />
          </div>
          
          <div className="h-48 flex items-end gap-1">
            {hourlyTraffic.map((traffic, i) => {
              const maxTraffic = Math.max(...hourlyTraffic);
              const heightPercent = (traffic / maxTraffic) * 100;
              const hour = i;
              
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="text-[9px] font-semibold text-[#004fa2] opacity-0 group-hover:opacity-100 transition-opacity">
                    {traffic}
                  </div>
                  <div
                    className="w-full bg-gradient-to-t from-[#004fa2] to-[#0066cc] rounded-t transition-all hover:from-[#003d7a] hover:to-[#004fa2] cursor-pointer"
                    style={{ height: `${heightPercent}%` }}
                  ></div>
                  {i % 3 === 0 && (
                    <span className="text-[9px] text-gray-500 font-medium">{hour}h</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Pages Table */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <h2 className="text-base font-bold text-gray-900 mb-4">Top Performing Pages</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3 pr-4">Page</th>
                  <th className="text-right text-xs font-semibold text-gray-600 pb-3 px-4">Views</th>
                  <th className="text-right text-xs font-semibold text-gray-600 pb-3 px-4">Avg. Time</th>
                  <th className="text-right text-xs font-semibold text-gray-600 pb-3 pl-4">Bounce Rate</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4">
                      <span className="text-sm font-medium text-gray-900">{page.page}</span>
                    </td>
                    <td className="text-right py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900">{page.views.toLocaleString()}</span>
                    </td>
                    <td className="text-right py-3 px-4">
                      <span className="text-sm text-gray-600">{page.avgTime}</span>
                    </td>
                    <td className="text-right py-3 pl-4">
                      <span className={`text-sm font-semibold ${
                        parseFloat(page.bounceRate) < 40 
                          ? 'text-green-600' 
                          : parseFloat(page.bounceRate) < 50 
                          ? 'text-yellow-600' 
                          : 'text-red-600'
                      }`}>
                        {page.bounceRate}
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
