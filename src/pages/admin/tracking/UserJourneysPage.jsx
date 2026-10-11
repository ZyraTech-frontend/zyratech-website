/**
 * User Journeys Tracking Page - Premium UI Redesign
 * View and analyze individual user paths through the website
 */

import React, { useState } from 'react';
import {
  Eye,
  MousePointerClick,
  Clock,
  Globe,
  MapPin,
  TrendingUp,
  Filter,
  Download,
  User,
  Activity,
  ChevronRight,
  Maximize2,
  ExternalLink,
  Info,
  HelpCircle,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Search,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';

const UserJourneysPage = () => {
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('7days');
  const [showHelp, setShowHelp] = useState(false);

  // TODO: Replace with real API data
  const mockJourneys = [
    {
      id: 'journey_001',
      userId: 'user_12345',
      userEmail: 'john.doe@example.com',
      status: 'converted',
      startTime: '2024-01-15 14:23:00',
      endTime: '2024-01-15 14:45:12',
      duration: '22m 12s',
      device: 'Desktop',
      browser: 'Chrome 120',
      location: 'Accra, Ghana',
      totalPages: 8,
      actions: 15,
      conversionType: 'Course Registration',
      pages: [
        { url: '/', title: 'Home', time: '14:23:00', duration: '2m 34s' },
        { url: '/training', title: 'Training Courses', time: '14:25:34', duration: '5m 10s' },
        { url: '/training/web-development', title: 'Web Development Course', time: '14:30:44', duration: '8m 45s' },
        { url: '/training/register/web-development', title: 'Course Registration', time: '14:39:29', duration: '5m 43s' },
        { url: '/payment/success', title: 'Payment Success', time: '14:45:12', duration: '0m 0s' }
      ]
    },
    {
      id: 'journey_002',
      userId: 'visitor_67890',
      userEmail: null,
      status: 'abandoned',
      startTime: '2024-01-15 10:15:30',
      endTime: '2024-01-15 10:22:45',
      duration: '7m 15s',
      device: 'Mobile',
      browser: 'Safari iOS',
      location: 'Kumasi, Ghana',
      totalPages: 4,
      actions: 6,
      conversionType: null,
      pages: [
        { url: '/', title: 'Home', time: '10:15:30', duration: '1m 20s' },
        { url: '/services', title: 'Our Services', time: '10:16:50', duration: '3m 15s' },
        { url: '/training', title: 'Training Courses', time: '10:20:05', duration: '2m 40s' }
      ]
    },
    {
      id: 'journey_003',
      userId: 'user_45678',
      userEmail: 'sarah.mensah@example.com',
      status: 'active',
      startTime: '2024-01-15 15:30:00',
      endTime: null,
      duration: 'Ongoing',
      device: 'Desktop',
      browser: 'Firefox 121',
      location: 'Tema, Ghana',
      totalPages: 3,
      actions: 5,
      conversionType: null,
      pages: [
        { url: '/', title: 'Home', time: '15:30:00', duration: '1m 45s' },
        { url: '/about', title: 'About Us', time: '15:31:45', duration: '4m 20s' },
        { url: '/projects', title: 'Our Projects', time: '15:36:05', duration: 'Active' }
      ]
    }
  ];

  const stats = {
    total: 1847,
    converted: 423,
    abandoned: 892,
    active: 74,
    avgDuration: '8m 42s',
    conversionRate: 22.9
  };

  const journeyTypes = [
    { key: 'converted', label: 'Converted', count: stats.converted, color: 'bg-green-500', icon: CheckCircle },
    { key: 'abandoned', label: 'Abandoned', count: stats.abandoned, color: 'bg-orange-500', icon: AlertCircle },
    { key: 'active', label: 'Active Now', count: stats.active, color: 'bg-blue-500', icon: Activity }
  ];

  const deviceBreakdown = [
    { device: 'Desktop', icon: Monitor, percentage: 63.2, color: 'bg-blue-500' },
    { device: 'Mobile', icon: Smartphone, percentage: 28.5, color: 'bg-blue-600' },
    { device: 'Tablet', icon: Tablet, percentage: 8.3, color: 'bg-purple-500' }
  ];

  const filteredJourneys = filterStatus === 'all' 
    ? mockJourneys 
    : mockJourneys.filter(j => j.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'converted': return 'text-green-700 bg-green-50 border-green-200';
      case 'abandoned': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'active': return 'text-blue-700 bg-blue-50 border-blue-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'converted': return <CheckCircle size={14} className="text-green-600" />;
      case 'abandoned': return <AlertCircle size={14} className="text-orange-600" />;
      case 'active': return <Activity size={14} className="text-blue-600" />;
      default: return null;
    }
  };

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
                  <MousePointerClick size={16} className="text-blue-200" />
                  <span className="text-blue-200 text-xs font-bold uppercase tracking-wider">User Journey Tracking</span>
                </div>
                <h1 className="text-2xl font-bold mb-1">Visitor Path Analysis</h1>
                <p className="text-blue-100 text-sm">Track complete user paths from landing to conversion or exit</p>
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
                  <option value="custom" className="text-gray-900">Custom Range</option>
                </select>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium border border-white/20 flex items-center gap-2 transition-colors">
                  <Download size={16} />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <User size={16} />
                  </div>
                </div>
                <p className="text-xs text-blue-200 mb-1">Total Journeys</p>
                <h3 className="text-lg font-bold">{stats.total.toLocaleString()}</h3>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-300">
                    <CheckCircle size={16} />
                  </div>
                </div>
                <p className="text-xs text-blue-200 mb-1">✅ Converted</p>
                <h3 className="text-lg font-bold">{stats.converted}</h3>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-300">
                    <AlertCircle size={16} />
                  </div>
                </div>
                <p className="text-xs text-blue-200 mb-1">⚠️ Abandoned</p>
                <h3 className="text-lg font-bold">{stats.abandoned}</h3>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-300">
                    <Activity size={16} />
                  </div>
                </div>
                <p className="text-xs text-blue-200 mb-1">🔵 Active Now</p>
                <h3 className="text-lg font-bold">{stats.active}</h3>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-300">
                    <TrendingUp size={16} />
                  </div>
                </div>
                <p className="text-xs text-blue-200 mb-1">Conversion Rate</p>
                <h3 className="text-lg font-bold">{stats.conversionRate}%</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid with explanations */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <User size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Total Journeys</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.total.toLocaleString()}</h3>
            <p className="text-xs text-gray-500">All visitor paths</p>
          </div>

          <div className="bg-white rounded-xl p-4 border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                <CheckCircle size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">✅ Converted</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.converted}</h3>
            <p className="text-xs text-gray-500">Completed goal</p>
          </div>

          <div className="bg-white rounded-xl p-4 border-2 border-orange-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                <AlertCircle size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">⚠️ Abandoned</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.abandoned}</h3>
            <p className="text-xs text-gray-500">Left without goal</p>
          </div>

          <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <Activity size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">🔵 Active Now</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.active}</h3>
            <p className="text-xs text-gray-500">Browsing right now</p>
          </div>

          <div className="bg-white rounded-xl p-4 border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                <Clock size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Avg Duration</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.avgDuration}</h3>
            <p className="text-xs text-gray-500">Time per journey</p>
          </div>

          <div className="bg-white rounded-xl p-4 border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                <TrendingUp size={20} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Conversion Rate</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.conversionRate}%</h3>
            <p className="text-xs text-gray-500">Success rate</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border-2 border-gray-200 shadow-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <span className="text-sm font-bold text-gray-700">Filter by Status:</span>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filterStatus === 'all'
                    ? 'bg-[#004fa2] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Journeys ({stats.total})
              </button>
              <button
                onClick={() => setFilterStatus('converted')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filterStatus === 'converted'
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ✅ Converted ({stats.converted})
              </button>
              <button
                onClick={() => setFilterStatus('abandoned')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filterStatus === 'abandoned'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ⚠️ Abandoned ({stats.abandoned})
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filterStatus === 'active'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🔵 Active ({stats.active})
              </button>
            </div>

            <div className="ml-auto">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#004fa2] focus:border-[#004fa2]"
              >
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
        </div>

        {/* Journeys List and Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List View */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">User Journey List</h2>
              <span className="text-sm text-gray-500">{filteredJourneys.length} journeys</span>
            </div>
            
            <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
              {filteredJourneys.map((journey) => (
                <div
                  key={journey.id}
                  onClick={() => setSelectedJourney(journey)}
                  className={`bg-white rounded-xl p-4 border-2 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                    selectedJourney?.id === journey.id
                      ? 'border-[#004fa2] ring-2 ring-blue-100 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold border-2 flex items-center gap-1.5 ${getStatusColor(journey.status)}`}>
                          {getStatusIcon(journey.status)}
                          {journey.status.charAt(0).toUpperCase() + journey.status.slice(1)}
                        </span>
                        {journey.conversionType && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold border border-purple-200">
                            {journey.conversionType}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {journey.userEmail || `Visitor ${journey.userId.slice(-6)}`}
                      </p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400 shrink-0 ml-2" />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <p className="text-xs text-gray-500 mb-0.5">Duration</p>
                      <p className="text-sm font-bold text-gray-900">{journey.duration}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <p className="text-xs text-gray-500 mb-0.5">Pages</p>
                      <p className="text-sm font-bold text-gray-900">{journey.totalPages}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                      <p className="text-xs text-gray-500 mb-0.5">Actions</p>
                      <p className="text-sm font-bold text-gray-900">{journey.actions}</p>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Globe size={12} />
                      {journey.device}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {journey.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {journey.startTime.split(' ')[1]}
                    </span>
                  </div>
                </div>
              ))}

              {filteredJourneys.length === 0 && (
                <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-gray-200">
                  <MousePointerClick size={48} className="text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-semibold">No journeys found</p>
                  <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>

          {/* Detail View */}
          <div className="lg:sticky lg:top-6 lg:h-fit">
            {selectedJourney ? (
              <div className="bg-white rounded-xl border-2 border-gray-200 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#004fa2] to-[#003d7a] p-5 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Maximize2 size={14} />
                    <span className="text-xs font-bold uppercase tracking-wider">Journey Details</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">
                    {selectedJourney.userEmail || `Visitor ${selectedJourney.userId.slice(-6)}`}
                  </h3>
                  <p className="text-blue-200 text-sm">Journey ID: {selectedJourney.id}</p>
                </div>

                {/* Info */}
                <div className="p-5 border-b-2 border-gray-200 bg-gray-50">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Start Time</p>
                      <p className="text-sm font-bold text-gray-900">{selectedJourney.startTime}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Duration</p>
                      <p className="text-sm font-bold text-gray-900">{selectedJourney.duration}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Device</p>
                      <p className="text-sm font-bold text-gray-900">{selectedJourney.device}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Browser</p>
                      <p className="text-sm font-bold text-gray-900">{selectedJourney.browser}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200 col-span-2">
                      <p className="text-xs text-gray-500 mb-1">Location</p>
                      <p className="text-sm font-bold text-gray-900">{selectedJourney.location}</p>
                    </div>
                  </div>
                </div>

                {/* Page Path */}
                <div className="p-5">
                  <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ArrowRight size={16} />
                    Complete User Path ({selectedJourney.pages.length} pages)
                  </h4>
                  <div className="space-y-3">
                    {selectedJourney.pages.map((page, index) => (
                      <div key={index} className="relative">
                        {index < selectedJourney.pages.length - 1 && (
                          <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 to-blue-100" />
                        )}
                        <div className="flex items-start gap-3 relative z-10">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            index === selectedJourney.pages.length - 1 && selectedJourney.status === 'converted'
                              ? 'bg-green-500 text-white'
                              : 'bg-[#004fa2] text-white'
                          }`}>
                            {index === selectedJourney.pages.length - 1 && selectedJourney.status === 'converted' ? '✓' : index + 1}
                          </div>
                          <div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors">
                            <div className="flex items-start justify-between mb-1">
                              <p className="text-sm font-bold text-gray-900">{page.title}</p>
                              <ExternalLink size={12} className="text-gray-400 shrink-0 ml-2" />
                            </div>
                            <p className="text-xs text-gray-500 truncate mb-2">{page.url}</p>
                            <div className="flex items-center gap-3 text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <Clock size={10} />
                                {page.time}
                              </span>
                              <span>•</span>
                              <span className="font-semibold">{page.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Journey Outcome */}
                  {selectedJourney.conversionType && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border-2 border-green-200">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle size={16} />
                        <span className="text-sm font-bold">Journey Completed!</span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        User successfully completed: {selectedJourney.conversionType}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-gray-200">
                <Eye size={64} className="text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-bold text-gray-600">Select a Journey</p>
                <p className="text-sm text-gray-500 mt-2">Click on any journey from the list to view the complete user path</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserJourneysPage;
