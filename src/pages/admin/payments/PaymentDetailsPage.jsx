import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, User, Mail, Calendar, Receipt, CheckCircle, XCircle, Clock, RefreshCcw, BookOpen, Briefcase } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../store/slices/uiSlice';
import paymentService from '../../../services/paymentService';
import AdminLayout from '../../../components/admin/layout/AdminLayout';

const STATUS_CONFIG = {
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700 border border-green-200', icon: CheckCircle },
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700 border border-amber-200', icon: Clock },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-700 border border-red-200', icon: XCircle },
  refunded: { label: 'Refunded', color: 'bg-purple-100 text-purple-700 border border-purple-200', icon: RefreshCcw }
};

const PAYMENT_METHODS = {
  mobile_money: { label: 'Mobile Money', color: 'bg-amber-100 text-amber-700' },
  card: { label: 'Card', color: 'bg-blue-100 text-blue-700' },
  bank: { label: 'Bank Transfer', color: 'bg-green-100 text-green-700' }
};

const formatCurrency = (amount, currency = 'GHS') => {
  return `${currency} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide ${config.color}`}>
      <Icon size={14} />
      {config.label}
    </span>
  );
};

const PaymentDetailsPage = () => {
  const { reference } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentDetails();
  }, [reference]);

  const fetchPaymentDetails = async () => {
    setLoading(true);
    try {
      const response = await paymentService.getTransactionDetails(reference);
      if (response.success) {
        setPayment(response.data);
      }
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

  const handleDownloadReceipt = async () => {
    try {
      dispatch(addNotification({ type: 'info', message: 'Downloading receipt...' }));
      await paymentService.downloadReceipt(reference);
      dispatch(addNotification({ type: 'success', message: 'Receipt downloaded successfully' }));
    } catch (error) {
      dispatch(addNotification({ type: 'error', message: error.message || 'Failed to download receipt' }));
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading transaction details...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!payment) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-600">Transaction not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-8">
        <button onClick={() => navigate('/admin/payments')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Payments</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Transaction Details</h1>
              <p className="text-sm text-gray-500 font-mono">{payment.reference}</p>
            </div>
            <StatusBadge status={payment.status} />
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-white mb-6">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard size={24} />
              <span className="text-sm font-medium opacity-90">Transaction Amount</span>
            </div>
            <p className="text-4xl font-black">{formatCurrency(payment.amount, payment.currency)}</p>
            {payment.status === 'refunded' && <p className="text-sm mt-2 opacity-90">This payment has been refunded</p>}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User size={20} className="text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Student Information</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Full Name</p>
                  <p className="text-sm font-semibold text-gray-900">{payment.studentName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email Address</p>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-gray-400" />
                    <p className="text-sm font-semibold text-gray-900">{payment.studentEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                {payment.paymentType === 'training' ? <BookOpen size={20} className="text-blue-600" /> : <Briefcase size={20} className="text-purple-600" />}
                <h2 className="text-lg font-bold text-gray-900">{payment.paymentType === 'training' ? 'Course' : 'Project'} Details</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Title</p>
                  <p className="text-sm font-semibold text-gray-900">{payment.courseTitle || payment.projectTitle || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Type</p>
                  <span className={`inline-block text-xs px-3 py-1 rounded-full font-semibold ${payment.paymentType === 'training' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                    {payment.paymentType === 'training' ? 'Training Course' : 'Project'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Payment Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Payment Method</p>
                <span className={`inline-block text-xs px-3 py-1 rounded-full font-semibold ${PAYMENT_METHODS[payment.paymentMethod]?.color || 'bg-gray-100 text-gray-700'}`}>
                  {PAYMENT_METHODS[payment.paymentMethod]?.label || payment.paymentMethod}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Transaction Date</p>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <p className="text-sm font-semibold text-gray-900">{formatDate(payment.createdAt)}</p>
                </div>
              </div>
              {payment.paidAt && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Paid At</p>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    <p className="text-sm font-semibold text-gray-900">{formatDate(payment.paidAt)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Refund Information Section */}
          {(payment.status === 'refunded' || payment.status === 'refunding') && (
            <div className="border-t border-gray-100 pt-6 mt-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <RefreshCcw size={24} className={`text-purple-600 ${payment.status === 'refunding' ? 'animate-spin' : ''}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Refund Information</h3>
                      <p className="text-sm text-gray-600">
                        {payment.status === 'refunding' ? 'Refund is being processed by Paystack' : 'This transaction has been refunded'}
                      </p>
                    </div>
                  </div>
                  {payment.status === 'refunding' ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                      <Clock size={14} />
                      PROCESSING
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      <CheckCircle size={14} />
                      COMPLETED
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-4 border border-purple-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Refund Amount</p>
                    <p className="text-2xl font-bold text-purple-600">{formatCurrency(payment.amount, payment.currency)}</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-purple-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Refund Status</p>
                    <p className="text-lg font-bold text-gray-900">
                      {payment.status === 'refunding' ? 'Processing by Paystack' : 'Refunded to Customer'}
                    </p>
                  </div>
                  
                  {payment.refundReason && (
                    <div className="bg-white rounded-lg p-4 border border-purple-100 md:col-span-2">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Refund Reason</p>
                      <p className="text-sm text-gray-900">{payment.refundReason}</p>
                    </div>
                  )}
                  
                  {payment.refundedAt && payment.status === 'refunded' && (
                    <div className="bg-white rounded-lg p-4 border border-green-100 md:col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={16} className="text-green-600" />
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Refund Completed At</p>
                      </div>
                      <p className="text-lg font-bold text-green-600">{formatDate(payment.refundedAt)}</p>
                      <p className="text-xs text-gray-500 mt-1">Funds were returned to the customer's account by Paystack</p>
                    </div>
                  )}
                  
                  {payment.status === 'refunding' && (
                    <div className="bg-white rounded-lg p-4 border border-yellow-100 md:col-span-2">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-yellow-600" />
                        <p className="text-sm text-yellow-700 font-medium">
                          Refund request sent to Paystack. Processing typically takes 5-10 business days.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mt-6">
            <button onClick={handleDownloadReceipt} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-sm">
              <Receipt size={20} />
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PaymentDetailsPage;