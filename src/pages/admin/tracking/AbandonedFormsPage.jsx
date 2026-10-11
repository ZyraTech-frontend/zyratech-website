/**
 * Abandoned Forms Tracking Page - Premium UI Redesign
 * View and manage users who abandoned course registration forms
 */

import React, { useState } from 'react';
import {
  FileX,
  Mail,
  Clock,
  AlertCircle,
  Send,
  CheckCircle,
  Filter,
  Download,
  Eye,
  TrendingDown,
  Globe,
  X,
  Info,
  FileText,
  User,
  Phone,
  CalendarDays,
  GraduationCap,
  ChevronRight,
  RefreshCw,
  Search,
  MoreVertical
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';

const AbandonedFormsPage = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [dateRange, setDateRange] = useState('7days');
  
  // Email composition state
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [useTemplate, setUseTemplate] = useState(true);

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

  // Default email template
  const defaultTemplate = `Hi {userName},

We noticed you started registering for {courseName} but didn't complete the process.

We'd love to help you finish! Your information has been saved, so you can continue right where you left off.

Click the link below to complete your registration:
{completionLink}

If you have any questions or need assistance, please don't hesitate to reach out to our team.

Best regards,
ZyraTech Training Team`;

  const filteredForms = filterStatus === 'all'
    ? mockAbandonedForms
    : mockAbandonedForms.filter(f => f.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'contacted': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'recovered': return 'text-green-700 bg-green-50 border-green-200';
      case 'expired': return 'text-gray-700 bg-gray-50 border-gray-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <AlertCircle size={14} className="text-blue-600" />;
      case 'contacted': return <Mail size={14} className="text-blue-600" />;
      case 'recovered': return <CheckCircle size={14} className="text-green-600" />;
      case 'expired': return <Clock size={14} className="text-gray-600" />;
      default: return null;
    }
  };

  const handleSendEmail = (form) => {
    setSelectedForm(form);
    
    if (useTemplate) {
      const subject = `Complete Your ${form.courseName} Registration`;
      const message = defaultTemplate
        .replace('{userName}', form.userName)
        .replace('{courseName}', form.courseName)
        .replace('{completionLink}', `https://zyratechhub.com/training/resume?form=${form.id}`);
      
      setEmailSubject(subject);
      setEmailMessage(message);
    } else {
      setEmailSubject('');
      setEmailMessage('');
    }
    
    setShowEmailModal(true);
  };

  const handleConfirmEmail = () => {
    // TODO: Implement API call to send recovery email
    console.log('Sending recovery email:', {
      to: selectedForm.userEmail,
      subject: emailSubject,
      message: emailMessage
    });
    
    setShowEmailModal(false);
    setSelectedForm(null);
    setEmailSubject('');
    setEmailMessage('');
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
                  <FileX size={16} className="text-blue-200" />
                  <span className="text-blue-200 text-xs font-bold uppercase tracking-wider">Abandoned Forms Recovery</span>
                </div>
                <h1 className="text-2xl font-bold mb-1">Form Recovery Center</h1>
                <p className="text-blue-100 text-sm">Track incomplete registrations and send recovery emails</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium border border-white/20 flex items-center gap-2 transition-colors">
                  <Download size={16} />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-blue-200 mb-1">Total Abandoned</p>
                    <h3 className="text-xl font-bold">{stats.total}</h3>
                  </div>
                  <FileX size={20} className="text-blue-200" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-blue-200 mb-1">Pending Action</p>
                    <h3 className="text-xl font-bold">{stats.pending}</h3>
                  </div>
                  <AlertCircle size={20} className="text-blue-200" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-orange-200 mb-1">Recovered</p>
                    <h3 className="text-xl font-bold">{stats.recovered}</h3>
                  </div>
                  <CheckCircle size={20} className="text-green-300" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-blue-200 mb-1">Recovery Rate</p>
                    <h3 className="text-xl font-bold">{stats.recoveryRate}%</h3>
                  </div>
                  <TrendingDown size={20} className="text-blue-200" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="space-y-6">
            {/* Status Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Filter size={16} />
                Filter by Status
              </h3>
              <div className="space-y-2">
                {[
                  { key: 'all', label: 'All Forms', count: stats.total, color: 'bg-gray-600' },
                  { key: 'pending', label: 'Pending', count: stats.pending, color: 'bg-blue-600' },
                  { key: 'contacted', label: 'Contacted', count: stats.contacted, color: 'bg-blue-600' },
                  { key: 'recovered', label: 'Recovered', count: stats.recovered, color: 'bg-green-600' },
                  { key: 'expired', label: 'Expired', count: stats.expired, color: 'bg-gray-600' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setFilterStatus(item.key)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      filterStatus === item.key
                        ? 'bg-gray-50 border-2 border-gray-300'
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <CalendarDays size={16} />
                Date Range
              </h3>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#004fa2] focus:border-[#004fa2]"
              >
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Completion</span>
                  <span className="text-sm font-bold text-gray-900">{stats.avgCompletionRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Recovery Rate</span>
                  <span className="text-sm font-bold text-gray-900">{stats.recoveryRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pending Forms</span>
                  <span className="text-sm font-bold text-blue-600">{stats.pending}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Forms List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Abandoned Forms</h2>
                    <p className="text-sm text-gray-600">{filteredForms.length} forms found</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search forms..."
                        className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004fa2] focus:border-[#004fa2]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Forms List */}
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {filteredForms.map((form) => (
                  <div key={form.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1 ${getStatusColor(form.status)}`}>
                            {getStatusIcon(form.status)}
                            {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                          </span>
                          <span className="text-xs font-medium text-gray-500">
                            {form.abandonedAt.split(' ')[0]}
                          </span>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                            <User size={20} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-bold text-gray-900 mb-1">{form.userName}</h3>
                            <p className="text-xs text-gray-600 mb-1">{form.userEmail}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Phone size={12} />
                                {form.formData.phone || 'No phone'}
                              </span>
                              <span className="flex items-center gap-1">
                                <Globe size={12} />
                                {form.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedForm(form)}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Course & Progress */}
                    <div className="ml-13 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GraduationCap size={14} className="text-gray-500" />
                          <span className="text-sm font-semibold text-gray-900">{form.courseName}</span>
                        </div>
                        <span className="text-xs font-bold text-gray-700">{form.completionPercentage}% complete</span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>Progress</span>
                          <span>{form.completedSteps} of {form.totalSteps} steps</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              form.completionPercentage >= 75 ? 'bg-green-500' :
                              form.completionPercentage >= 50 ? 'bg-[#004fa2]' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${form.completionPercentage}%` }}
                          />
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500">Last step: {form.lastStep}</p>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleSendEmail(form)}
                        className="px-4 py-2 bg-[#004fa2] hover:bg-[#003d7a] text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={form.status === 'recovered' || form.status === 'expired'}
                      >
                        <Send size={16} />
                        {form.status === 'contacted' ? 'Send Follow-up' : 'Send Recovery Email'}
                      </button>
                    </div>
                  </div>
                ))}

                {filteredForms.length === 0 && (
                  <div className="p-12 text-center">
                    <FileX size={48} className="text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 font-semibold">No abandoned forms found</p>
                    <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Email Composer Modal */}
        {showEmailModal && selectedForm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#004fa2] to-[#003d7a] p-6 text-white sticky top-0 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Send Recovery Email</h3>
                      <p className="text-orange-200 text-sm">Remind user to complete their registration</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Recipient Info */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-sm font-bold text-gray-700 mb-3">📧 Sending to:</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="text-sm font-bold text-gray-900">{selectedForm.userName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="text-sm font-bold text-gray-900">{selectedForm.userEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Course:</span>
                      <span className="text-sm font-bold text-gray-900">{selectedForm.courseName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Progress:</span>
                      <span className="text-sm font-bold text-blue-600">{selectedForm.completionPercentage}% Complete</span>
                    </div>
                  </div>
                </div>

                {/* Template Toggle */}
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <input
                    type="checkbox"
                    id="useTemplate"
                    checked={useTemplate}
                    onChange={(e) => {
                      setUseTemplate(e.target.checked);
                      if (e.target.checked) {
                        const subject = `Complete Your ${selectedForm.courseName} Registration`;
                        const message = defaultTemplate
                          .replace('{userName}', selectedForm.userName)
                          .replace('{courseName}', selectedForm.courseName)
                          .replace('{completionLink}', `https://zyratechhub.com/training/resume?form=${selectedForm.id}`);
                        setEmailSubject(subject);
                        setEmailMessage(message);
                      }
                    }}
                    className="w-5 h-5 rounded border-2 border-blue-400 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="useTemplate" className="text-sm font-medium text-blue-900">
                    Use template from Settings (Auto-fill subject and message)
                  </label>
                </div>

                {/* Email Subject */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Subject *
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Enter email subject line..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2] focus:border-[#004fa2] text-sm font-medium"
                  />
                </div>

                {/* Email Message */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Message *
                  </label>
                  <textarea
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    placeholder="Type your personalized message to the user..."
                    rows={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2] focus:border-[#004fa2] text-sm font-medium resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    💡 You can use: {`{userName}`}, {`{courseName}`}, {`{completionLink}`}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowEmailModal(false);
                      setEmailSubject('');
                      setEmailMessage('');
                    }}
                    className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmEmail}
                    disabled={!emailSubject.trim() || !emailMessage.trim()}
                    className="flex-1 px-6 py-3 bg-[#004fa2] hover:bg-[#003d7a] text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                    Send Recovery Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AbandonedFormsPage;
