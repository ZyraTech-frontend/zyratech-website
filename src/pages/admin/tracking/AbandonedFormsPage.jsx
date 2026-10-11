/**
 * Abandoned Forms Tracking Page
 * View and manage users who abandoned course registration forms
 */

import React, { useState } from 'react';
import {
  FileX,
  Mail,
  Clock,
  User,
  Calendar,
  MapPin,
  Globe,
  AlertCircle,
  Send,
  CheckCircle,
  Filter,
  Download,
  Eye,
  TrendingDown
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';

const AbandonedFormsPage = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, contacted, recovered, expired
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [dateRange, setDateRange] = useState('7days');

  // TODO: Replace with real API data
  const mockAbandonedForms = [
    {
      id: 'form_001',
      userId: 'user_12345',
      userName: 'John Mensah',
      userEmail: 'john.mensah@example.com',
      formType: 'Course Registration',
      courseName: 'Full Stack Web Development',
      abandonedAt: '2024-01-15 14:35:22',
      completionPercentage: 75,
      lastStep: 'Payment Information',
      totalSteps: 4,
      completedSteps: 3,
      device: 'Desktop',
      browser: 'Chrome 120',
      location: 'Accra, Ghana',
      status: 'pending',
      emailsSent: 0,
      lastEmailSent: null,
      formData: {
        firstName: 'John',
        lastName: 'Mensah',
        email: 'john.mensah@example.com',
        phone: '+233 24 123 4567',
        course: 'Full Stack Web Development',
        schedule: 'Weekend (8 weeks)'
      }
    },
    {
      id: 'form_002',
      userId: 'user_67890',
      userName: 'Sarah Osei',
      userEmail: 'sarah.osei@example.com',
      formType: 'Course Registration',
      courseName: 'Data Science & Analytics',
      abandonedAt: '2024-01-15 10:20:15',
      completionPercentage: 50,
      lastStep: 'Personal Information',
      totalSteps: 4,
      completedSteps: 2,
      device: 'Mobile',
      browser: 'Safari iOS',
      location: 'Kumasi, Ghana',
      status: 'contacted',
      emailsSent: 1,
      lastEmailSent: '2024-01-15 11:00:00',
      formData: {
        firstName: 'Sarah',
        lastName: 'Osei',
        email: 'sarah.osei@example.com',
        phone: '+233 20 987 6543',
        course: 'Data Science & Analytics',
        schedule: null
      }
    },
    {
      id: 'form_003',
      userId: 'user_45678',
      userName: 'Kwame Boateng',
      userEmail: 'kwame.b@example.com',
      formType: 'Course Registration',
      courseName: 'Digital Marketing Mastery',
      abandonedAt: '2024-01-14 16:45:30',
      completionPercentage: 90,
      lastStep: 'Confirm & Pay',
      totalSteps: 4,
      completedSteps: 4,
      device: 'Desktop',
      browser: 'Firefox 121',
      location: 'Tema, Ghana',
      status: 'recovered',
      emailsSent: 2,
      lastEmailSent: '2024-01-14 18:00:00',
      formData: {
        firstName: 'Kwame',
        lastName: 'Boateng',
        email: 'kwame.b@example.com',
        phone: '+233 50 555 1234',
        course: 'Digital Marketing Mastery',
        schedule: 'Weekday Evening (6 weeks)'
      }
    },
    {
      id: 'form_004',
      userId: 'user_99999',
      userName: 'Ama Agyeman',
      userEmail: 'ama.agyeman@example.com',
      formType: 'Course Registration',
      courseName: 'UI/UX Design Bootcamp',
      abandonedAt: '2024-01-10 09:15:00',
      completionPercentage: 25,
      lastStep: 'Course Selection',
      totalSteps: 4,
      completedSteps: 1,
      device: 'Tablet',
      browser: 'Chrome Android',
      location: 'Takoradi, Ghana',
      status: 'expired',
      emailsSent: 3,
      lastEmailSent: '2024-01-13 12:00:00',
      formData: {
        firstName: 'Ama',
        lastName: 'Agyeman',
        email: 'ama.agyeman@example.com',
        phone: null,
        course: 'UI/UX Design Bootcamp',
        schedule: null
      }
    }
  ];

  const stats = {
    total: 347,
    pending: 142,
    contacted: 108,
    recovered: 67,
    expired: 30,
    recoveryRate: 19.3,
    avgCompletionRate: 58.5
  };

  const filteredForms = filterStatus === 'all'
    ? mockAbandonedForms
    : mockAbandonedForms.filter(f => f.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'contacted': return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'recovered': return 'text-green-700 bg-green-100 border-green-200';
      case 'expired': return 'text-gray-700 bg-gray-100 border-gray-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <AlertCircle size={12} />;
      case 'contacted': return <Mail size={12} />;
      case 'recovered': return <CheckCircle size={12} />;
      case 'expired': return <Clock size={12} />;
      default: return null;
    }
  };

  const handleSendEmail = (form) => {
    setSelectedForm(form);
    setShowEmailModal(true);
  };

  const handleConfirmEmail = () => {
    // TODO: Implement API call to send recovery email
    console.log('Sending recovery email to:', selectedForm.userEmail);
    setShowEmailModal(false);
    setSelectedForm(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 rounded-2xl p-6 text-white shadow-lg border border-orange-500/30">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileX size={14} className="text-orange-200" />
                <span className="text-orange-200 text-xs font-bold uppercase tracking-wider">Form Abandonment Tracking</span>
              </div>
              <h1 className="text-2xl font-bold mb-1">Abandoned Course Registrations</h1>
              <p className="text-orange-200 text-sm">Recover incomplete registrations with targeted email follow-ups</p>
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
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                <FileX size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Total</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.total}</h3>
          </div>

          <div className="bg-white rounded-xl p-4 border border-orange-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                <AlertCircle size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Pending</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.pending}</h3>
          </div>

          <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <Mail size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Contacted</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.contacted}</h3>
          </div>

          <div className="bg-white rounded-xl p-4 border border-green-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                <CheckCircle size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Recovered</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.recovered}</h3>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                <Clock size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Expired</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.expired}</h3>
          </div>

          <div className="bg-white rounded-xl p-4 border border-purple-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                <TrendingDown size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Recovery</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.recoveryRate}%</h3>
          </div>

          <div className="bg-white rounded-xl p-4 border border-cyan-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
                <CheckCircle size={16} />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Avg Completion</p>
            <h3 className="text-xl font-bold text-gray-900">{stats.avgCompletionRate}%</h3>
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
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'pending'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setFilterStatus('contacted')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'contacted'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Contacted ({stats.contacted})
              </button>
              <button
                onClick={() => setFilterStatus('recovered')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'recovered'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Recovered ({stats.recovered})
              </button>
              <button
                onClick={() => setFilterStatus('expired')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === 'expired'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Expired ({stats.expired})
              </button>
            </div>

            <div className="ml-auto">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
        </div>

        {/* Abandoned Forms List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Course</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Progress</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Abandoned</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Device</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Emails</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredForms.map((form) => (
                  <tr key={form.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{form.userName}</p>
                        <p className="text-xs text-gray-500">{form.userEmail}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-gray-900">{form.courseName}</p>
                      <p className="text-xs text-gray-500">Last: {form.lastStep}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-500 rounded-full"
                              style={{ width: `${form.completionPercentage}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-gray-700">
                            {form.completionPercentage}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {form.completedSteps}/{form.totalSteps} steps
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-900">{form.abandonedAt.split(' ')[0]}</p>
                      <p className="text-xs text-gray-500">{form.abandonedAt.split(' ')[1]}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Globe size={12} />
                        <span>{form.device}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{form.location}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold border flex items-center gap-1 w-fit ${getStatusColor(form.status)}`}>
                        {getStatusIcon(form.status)}
                        {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{form.emailsSent} sent</p>
                        {form.lastEmailSent && (
                          <p className="text-xs text-gray-500">Last: {form.lastEmailSent.split(' ')[0]}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedForm(form)}
                          className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        {form.status !== 'recovered' && form.status !== 'expired' && (
                          <button
                            onClick={() => handleSendEmail(form)}
                            className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                          >
                            <Send size={14} />
                            Send Email
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredForms.length === 0 && (
            <div className="p-12 text-center">
              <FileX size={48} className="text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">No abandoned forms found</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>

        {/* Email Confirmation Modal */}
        {showEmailModal && selectedForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Send Recovery Email</h3>
                  <p className="text-sm text-gray-500">Remind user to complete registration</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Email will be sent to:</p>
                <p className="text-base font-bold text-gray-900">{selectedForm.userName}</p>
                <p className="text-sm text-gray-600">{selectedForm.userEmail}</p>
                <p className="text-sm text-gray-500 mt-2">Course: {selectedForm.courseName}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmEmail}
                  className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Send size={16} />
                  Send Email
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Detail View Modal */}
        {selectedForm && !showEmailModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6 text-white sticky top-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{selectedForm.userName}</h3>
                    <p className="text-orange-200 text-sm">{selectedForm.userEmail}</p>
                  </div>
                  <button
                    onClick={() => setSelectedForm(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Form Info */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Form Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Course</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedForm.courseName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Form Type</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedForm.formType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Abandoned At</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedForm.abandonedAt}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Last Step</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedForm.lastStep}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Progress</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-orange-500 rounded-full"
                            style={{ width: `${selectedForm.completionPercentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {selectedForm.completionPercentage}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Steps Completed</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedForm.completedSteps} of {selectedForm.totalSteps}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Device Info */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Device & Location</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Device</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedForm.device}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Browser</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedForm.browser}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500 mb-1">Location</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedForm.location}</p>
                    </div>
                  </div>
                </div>

                {/* Captured Form Data */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Captured Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {Object.entries(selectedForm.formData).map(([key, value]) => (
                      value && (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="text-sm font-semibold text-gray-900">{value}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* Email History */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Email History</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Emails Sent:</span>
                      <span className="text-sm font-semibold text-gray-900">{selectedForm.emailsSent}</span>
                    </div>
                    {selectedForm.lastEmailSent && (
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-600">Last Sent:</span>
                        <span className="text-sm font-semibold text-gray-900">{selectedForm.lastEmailSent}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {selectedForm.status !== 'recovered' && selectedForm.status !== 'expired' && (
                  <button
                    onClick={() => handleSendEmail(selectedForm)}
                    className="w-full px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send size={18} />
                    Send Recovery Email
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AbandonedFormsPage;
