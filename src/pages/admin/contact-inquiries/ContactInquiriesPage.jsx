import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, Trash2, RefreshCw, Filter, Mail, Phone, Calendar } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addNotification, openConfirmDialog } from '../../../store/slices/uiSlice';
import contactInquiryService, { INQUIRY_STATUS } from '../../../services/contactInquiryService';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import ConfirmDialog from '../../../components/admin/shared/ConfirmDialog';

const ContactInquiriesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch inquiries
  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        ...(statusFilter !== 'all' && { status: statusFilter })
      };
      const result = await contactInquiryService.getInquiries(params);
      setInquiries(result.data || []);
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
      dispatch(addNotification({
        message: 'Failed to load inquiries',
        type: 'error'
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [currentPage, itemsPerPage, statusFilter]);

  // Filter inquiries locally
  const filteredInquiries = inquiries.filter(inquiry =>
    inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete inquiry
  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    try {
      await contactInquiryService.deleteInquiry(deletingId);
      setInquiries(inquiries.filter(i => i.id !== deletingId));
      dispatch(addNotification({
        message: 'Inquiry deleted successfully',
        type: 'success'
      }));
    } catch (error) {
      console.error('Failed to delete inquiry:', error);
      dispatch(addNotification({
        message: error.response?.data?.message || 'Failed to delete inquiry',
        type: 'error'
      }));
    } finally {
      setDeletingId(null);
    }
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (id) => {
    setDeletingId(id);
    dispatch(openConfirmDialog({
      title: 'Delete Inquiry',
      message: 'Are you sure you want to delete this inquiry? This action cannot be undone.',
      isDangerous: true,
      confirmText: 'Delete',
      onConfirm: handleDeleteConfirm
    }));
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
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

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Inquiries</h1>
            <p className="text-gray-600 mt-1">Manage customer inquiries and messages</p>
          </div>
          <button
            onClick={fetchInquiries}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name, email, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2] focus:border-transparent"
            >
              <option value="all">All Status</option>
              {Object.entries(INQUIRY_STATUS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin">
                <RefreshCw className="text-[#004fa2]" size={24} />
              </div>
              <p className="text-gray-600 mt-2">Loading inquiries...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Mail size={32} className="mx-auto mb-2 opacity-50" />
              <p>No inquiries found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{inquiry.name}</div>
                        {inquiry.phone && (
                          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                            <Phone size={14} />
                            {inquiry.phone}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a href={`mailto:${inquiry.email}`} className="text-[#004fa2] hover:underline">
                          {inquiry.email}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900 truncate max-w-xs">{inquiry.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(inquiry.status)}`}>
                          {INQUIRY_STATUS[inquiry.status] || inquiry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(inquiry.submittedAt || inquiry.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/admin/contact-inquiries/${inquiry.id}`)}
                            className="p-2 text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => openDeleteDialog(inquiry.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && filteredInquiries.length > 0 && (
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {filteredInquiries.length} of {inquiries.length} inquiries
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-2">Page {currentPage}</span>
              <button
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Dialog (handled by Redux) */}
      <ConfirmDialog />
    </AdminLayout>
  );
};

export default ContactInquiriesPage;
