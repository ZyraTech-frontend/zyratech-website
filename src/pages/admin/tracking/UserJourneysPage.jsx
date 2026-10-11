/**
 * User Journeys Tracking Page
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
  Calendar,
  User,
  Activity,
  ChevronRight,
  Maximize2,
  ExternalLink
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';

const UserJourneysPage = () => {
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, converted, abandoned
  const [dateRange, setDateRange] = useState('7days');

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

  const filteredJourneys = filterStatus === 'all' 
    ? mockJourneys 
    : mockJourneys.filter(j => j.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'converted': return 'text-green-700 bg-green-100 border-green-200';
      case 'abandoned': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'active': return 'text-blue-700 bg-blue-100 border-blue-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'converted': return <TrendingUp size={12} />;
      case 'abandoned': return <Clock size={12} />;
      case 'active': return <Activity size={12} />;
      default: return null;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-cyan-800 rounded-2xl p-6 text-white shadow-lg border border-cyan-500/30">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MousePointerClick size={14} className="text-cyan-200" />
                <span className="text-cyan-200 text-xs font-bold uppercase tracking-wider">User Journey Tracking</span>
              </div>
              <h1 className="text-2xl font-bold mb-1">Website User Journeys</h1>
              <p className="text-cyan-200 text-sm">Track and analyze individual user paths and behaviors</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium border border-white/20 flex items-center gap-2 transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
                <User size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Total Journeys</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.total.toLocaleString()}</h3>
          </div>

          <div className="bg-white rounded-xl p-4 border border-green-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                <TrendingUp size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Converted</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.converted}</h3>
          </div>

          <div className="bg-white rounded-xl p-4 border border-orange-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                <Clock size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Abandoned</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.abandoned}</h3>
          </div>

          <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <Activity size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Active Now</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.active}</h3>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                <Clock size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Avg Duration</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.avgDuration}</h3>
          </div>

          <div className="bg-white rounded-xl p-4 border border-purple-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                <TrendingUp size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Conversion</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.conversionRate}%</h3>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">Filters:</span>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilterStatus('converted')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'converted'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Converted ({stats.converted})
              </button>
              <button
                onClick={() => setFilterStatus('abandoned')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'abandoned'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Abandoned ({stats.abandoned})
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'active'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active ({stats.active})
              </button>
            </div>

            <div className="ml-auto">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
        </div>

        {/* Journeys List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List View */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">User Journeys</h2>
            
            {filteredJourneys.map((journey) => (
              <div
                key={journey.id}
                onClick={() => setSelectedJourney(journey)}
                className={`bg-white rounded-xl p-4 border-2 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                  selectedJourney?.id === journey.id
                    ? 'border-cyan-500 ring-2 ring-cyan-100'
                    : 'border-gray-200 hover:border-cyan-300'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-bold border flex items-center gap-1 ${getStatusColor(journey.status)}`}>
                        {getStatusIcon(journey.status)}
                        {journey.status.charAt(0).toUpperCase() + journey.status.slice(1)}
                      </span>
                      {journey.conversionType && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-semibold">
                          {journey.conversionType}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {journey.userEmail || `Visitor ${journey.userId.slice(-6)}`}
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 shrink-0 ml-2" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Duration</p>
                    <p className="text-sm font-semibold text-gray-900">{journey.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Pages</p>
                    <p className="text-sm font-semibold text-gray-900">{journey.totalPages}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Actions</p>
                    <p className="text-sm font-semibold text-gray-900">{journey.actions}</p>
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
                    <Calendar size={12} />
                    {journey.startTime.split(' ')[0]}
                  </span>
                </div>
              </div>
            ))}

            {filteredJourneys.length === 0 && (
              <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
                <MousePointerClick size={48} className="text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-medium">No journeys found</p>
                <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* Detail View */}
          <div className="lg:sticky lg:top-6 lg:h-fit">
            {selectedJourney ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 p-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Maximize2 size={14} />
                    <span className="text-xs font-bold uppercase tracking-wider">Journey Details</span>
                  </div>
                  <h3 className="text-lg font-bold">
                    {selectedJourney.userEmail || `Visitor ${selectedJourney.userId.slice(-6)}`}
                  </h3>
                  <p className="text-cyan-200 text-sm">Journey ID: {selectedJourney.id}</p>
                </div>

                {/* Info */}
                <div className="p-4 border-b border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Start Time</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedJourney.startTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Duration</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedJourney.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Device</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedJourney.device}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Browser</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedJourney.browser}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500 mb-1">Location</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedJourney.location}</p>
                    </div>
                  </div>
                </div>

                {/* Page Path */}
                <div className="p-4">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Page Path</h4>
                  <div className="space-y-3">
                    {selectedJourney.pages.map((page, index) => (
                      <div key={index} className="relative">
                        {index < selectedJourney.pages.length - 1 && (
                          <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-cyan-200" />
                        )}
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center text-xs font-bold text-cyan-700 shrink-0 relative z-10">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 mb-0.5">{page.title}</p>
                            <p className="text-xs text-gray-500 truncate mb-1">{page.url}</p>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span>{page.time}</span>
                              <span>•</span>
                              <span>{page.duration}</span>
                            </div>
                          </div>
                          <ExternalLink size={14} className="text-gray-400 shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-12 text-center border border-gray-200">
                <Eye size={48} className="text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-medium">Select a journey</p>
                <p className="text-sm text-gray-500 mt-1">Click on a journey to view detailed path</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserJourneysPage;
