/**
 * Email Addresses Page
 * Manage company email addresses (support@, noreply@, payments@, etc.)
 */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../../store/slices/uiSlice';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import LoadingSpinner from '../../../../components/admin/shared/LoadingSpinner';
import { useAuth } from '../../../../hooks/useAuth';
import { Mail, Edit2, Shield, Save, X, CheckCircle, XCircle, Power } from 'lucide-react';
import { getAllEmailAddresses, updateEmailAddress, toggleEmailAddress } from '../../../../services/emailService';

const EmailAddressesPage = () => {
  const dispatch = useDispatch();
  const { userPermissions, userRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [emailAddresses, setEmailAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  const canManageSettings = userRole === 'super_admin' || (userPermissions?.includes('settings') ?? false);

  useEffect(() => {
    loadEmailAddresses();
  }, []);

  const loadEmailAddresses = async () => {
    try {
      const data = await getAllEmailAddresses();
      setEmailAddresses(data);
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to load email addresses'
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address.id);
    setEditForm({
      email: address.email,
      displayName: address.displayName,
      description: address.description,
      enabled: address.enabled
    });
  };

  const handleCancelEdit = () => {
    setEditingAddress(null);
    setEditForm({});
  };

  const handleSave = async () => {
    if (!canManageSettings) {
      dispatch(addNotification({
        type: 'error',
        title: 'Permission Required',
        message: 'You do not have permission to update email addresses.'
      }));
      return;
    }

    setSaving(true);
    try {
      await updateEmailAddress(editingAddress.replace('default_', ''), editForm);
      dispatch(addNotification({
        type: 'success',
        message: 'Email address updated successfully!'
      }));
      await loadEmailAddresses();
      setEditingAddress(null);
      setEditForm({});
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to update email address'
      }));
    } finally {
      setSaving(false);
    }
  };

  const handlePower = async (type) => {
    if (!canManageSettings) {
      dispatch(addNotification({
        type: 'error',
        title: 'Permission Required',
        message: 'You do not have permission to Power email addresses.'
      }));
      return;
    }

    try {
      await toggleEmailAddress(type.replace('default_', ''));
      dispatch(addNotification({
        type: 'success',
        message: 'Email address status updated!'
      }));
      await loadEmailAddresses();
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to Power email address'
      }));
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      'default_noreply': 'No Reply',
      'default_support': 'Support',
      'default_payments': 'Payments',
      'default_careers': 'Careers',
      'default_training': 'Training',
      'default_partnerships': 'Partnerships',
      'default_projects': 'Projects',
      'default_security': 'Security',
      'default_admin': 'Admin',
      'default_info': 'Info'
    };
    return labels[type] || type;
  };

  if (!canManageSettings && userRole !== 'super_admin') {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-red-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Permission Required</h2>
            <p className="text-gray-600 mt-2">You don't have permission to access this page.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (loading) {
    return (
      <AdminLayout>
        <LoadingSpinner text="Loading email addresses..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-3 md:space-y-6 max-w-7xl mx-auto pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#004fa2]/5 to-[#0066cc]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-3 sm:gap-4 relative z-10 min-w-0">
            <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center shadow-md shrink-0">
              <Mail className="text-white" size={20} />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight truncate">Email Addresses</h1>
              <p className="text-[11px] sm:text-sm text-gray-500 font-medium truncate mt-0.5">Manage company email addresses for different purposes</p>
            </div>
          </div>
        </div>

        {/* Email Addresses Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-700 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-700 uppercase tracking-wider">Email Address</th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-700 uppercase tracking-wider">Display Name</th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-700 uppercase tracking-wider">Verified</th>
                  <th className="px-6 py-4 text-right text-[11px] font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {emailAddresses.map((address) => (
                  <tr key={address.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">{getTypeLabel(address.id)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700 font-mono">{address.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{address.displayName}</span>
                    </td>
                    <td className="px-6 py-4">
                      {address.enabled ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-bold">
                          <CheckCircle size={12} />
                          Enabled
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold">
                          <XCircle size={12} />
                          Disabled
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {address.verified ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold">
                          <CheckCircle size={12} />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-700 text-xs font-bold">
                          <XCircle size={12} />
                          Not Verified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {canManageSettings && (
                          <>
                            <button
                              onClick={() => handlePower(address.id)}
                              className="p-2 text-gray-600 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                              title={address.enabled ? 'Disable' : 'Enable'}
                            >
                              <Power size={16} />
                            </button>
                            <button
                              onClick={() => handleEdit(address)}
                              className="p-2 text-gray-600 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editingAddress && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[#004fa2]">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Edit Email Address</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{getTypeLabel(editingAddress)}</p>
                  </div>
                </div>
                <button onClick={handleCancelEdit} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    value={editForm.email || ''}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Display Name *</label>
                  <input
                    type="text"
                    value={editForm.displayName || ''}
                    onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Description</label>
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all resize-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-gray-700">Status:</label>
                  <button
                    onClick={() => setEditForm({ ...editForm, enabled: !editForm.enabled })}
                    className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors ${
                      editForm.enabled
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {editForm.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={handleCancelEdit}
                  disabled={saving}
                  className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-bold text-sm disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all font-bold text-sm disabled:opacity-50"
                >
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default EmailAddressesPage;
