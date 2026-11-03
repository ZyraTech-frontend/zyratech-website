import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, Send, RefreshCw, Copy, Check } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../store/slices/uiSlice';
import paymentService, { payment_STATUS } from '../../../services/paymentService';
import emailNotificationService from '../../../services/emailNotificationService';
import AdminLayout from '../../../components/admin/layout/AdminLayout';

const PaymentDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payment, setpayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState('');

  // Fetch payment details
  const fetchpayment = async () => {
    setLoading(true);
    try {
      const data = await paymentService.getpaymentById(id);
      setpayment(data);
      setStatus(data.status || 'new');
      setResponse(data.response || '');
    } catch (error) {
      console.error('Failed to fetch payment:', error);
      dispatch(addNotification({
        message: 'Failed to load payment details',
        type: 'error'
      }));
      setTimeout(() => navigate('/admin/payments'), 2000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchpayment();
  }, [id]);

  // Update payment
  const handleUpdate = async () => {
    if (!response.trim()) {
      dispatch(addNotification({
        message: 'Please enter a response message',
        type: 'warning'
      }));
      return;
    }

    setUpdating(true);
    try {
      const updated = await paymentService.updatepayment(id, {
        status,
        response
      });
      setpayment(updated);

      // Send response email via AWS SES
      try {
        await emailNotificationService.sendContactResponse({
          email: payment.email,
          name: payment.name,
          response: response,
          subject: payment.subject
        });
      } catch (emailError) {
        console.error('Failed to send response email:', emailError);
        // Don't fail the update if email fails
      }

      dispatch(addNotification({
        message: 'payment updated and response email sent successfully',
        type: 'success'
      }));
    } catch (error) {
      console.error('Failed to update payment:', error);
      dispatch(addNotification({
        message: error.response?.data?.message || 'Failed to update payment',
        type: 'error'
      }));
    } finally {
      setUpdating(false);
    }
  };

  // Copy email to clipboard
  const copyEmail = () => {
    if (payment?.email) {
      navigator.clipboard.writeText(payment.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusColor = (statusValue) => {
    switch (statusValue) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'viewed':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800';
      case 'responded':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <RefreshCw className="animate-spin text-[#004fa2] mx-auto mb-2" size={32} />
            <p className="text-gray-600">Loading payment...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!payment) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-600">payment not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/payments')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">payment Details</h1>
            <p className="text-gray-600 mt-1">ID: {payment.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* payment Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">payment Information</h2>

              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
                <p className="text-gray-900 font-medium">{payment.name}</p>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Email Address</label>
                <div className="flex items-center gap-2">
                  <a href={`mailto:${payment.email}`} className="text-[#004fa2] hover:underline">
                    {payment.email}
                  </a>
                  <button
                    onClick={copyEmail}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Copy email"
                  >
                    {copied ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Phone */}
              {payment.phone && (
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Phone Number</label>
                  <a href={`tel:${payment.phone}`} className="text-[#004fa2] hover:underline flex items-center gap-2">
                    <Phone size={16} />
                    {payment.phone}
                  </a>
                </div>
              )}

              {/* Subject */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Subject</label>
                <p className="text-gray-900 font-medium">{payment.subject}</p>
              </div>

              {/* Date */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Submitted Date</label>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  {formatDate(payment.submittedAt || payment.createdAt)}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Message</label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{payment.message}</p>
                </div>
              </div>
            </div>

            {/* Response Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Response</h2>

              {/* Status */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
                >
                  {Object.entries(payment_STATUS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Response Message */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Response Message</label>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Enter your response message. This will be sent to the inquirer via email."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent resize-vertical"
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleUpdate}
                disabled={updating}
                className="w-full bg-[#004fa2] hover:bg-[#003a7a] text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {updating ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Response & Update Status
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500">
                A confirmation email will be sent to {payment.email} with your response.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Current Status</h3>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                {payment_STATUS[payment.status] || payment.status}
              </span>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Quick Info</h3>
              
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">payment ID</p>
                <p className="text-gray-900 font-mono text-sm break-all">{payment.id}</p>
              </div>

              {payment.response && (
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Last Response</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {formatDate(payment.updatedAt || payment.createdAt)}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Actions</h3>
              <button
                onClick={() => navigate('/admin/payments')}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PaymentDetailsPage;
