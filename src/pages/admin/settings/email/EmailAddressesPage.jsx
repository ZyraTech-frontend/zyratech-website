import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../../store/slices/uiSlice';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import LoadingSpinner from '../../../../components/admin/shared/LoadingSpinner';
import { useAuth } from '../../../../hooks/useAuth';
import { Mail, Plus, Edit2, Trash2, Shield, Save, X, CheckCircle, XCircle } from 'lucide-react';
import { 
  getAllEmailAddresses, 
  updateEmailAddress, 
  toggleEmailAddress,
  createEmailAddress 
} from '../../../../services/emailService';

const EmailAddressesPage = () => {
  const dispatch = useDispatch();
  const { userPermissions, userRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    email: '',
    displayName: '',
    isActive: true
  });
  const [saving, setSaving] = useState(false);

  const canManageSettings = userRole === 'super_admin' || (userPermissions?.includes('settings') ?? false);

  useEffect(() => {
    if (canManageSettings) {
      loadAddresses();
    }
  }, [canManageSettings]);

  const loadAddresses = async () => {
    try {
      const list = await getAllEmailAddresses();
      const addressList = Array.isArray(list) ? list : [];
      console.log('[EmailAddressesPage] Loaded addresses:', addressList);
      setAddresses(addressList);
    } catch (error) {
      console.error('[EmailAddressesPage] Error loading addresses:', error);
      setAddresses([]);
      dispatch(addNotification({
        type: 'error',
        message: error.userMessage || 'Failed to load email addresses'
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setEditingId(address.id);
    setFormData({
      type: address.type,
      email: address.email,
      displayName: address.displayName,
      isActive: address.isActive !== false
    });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      type: '',
      email: '',
      displayName: '',
      isActive: true
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({
      type: '',
      email: '',
      displayName: '',
      isActive: true
    });
  };

  const handleSave = async () => {
    if (!formData.email || !formData.displayName || !formData.type) {
      dispatch(addNotification({
        type: 'error',
        message: 'Please fill in all required fields'
      }));
      return;
    }

    setSaving(true);
    try {
      if (isCreating) {
        await createEmailAddress(formData);
        dispatch(addNotification({
          type: 'success',
          message: 'Email address created successfully'
        }));
      } else {
        await updateEmailAddress(editingId, formData);
        dispatch(addNotification({
          type: 'success',
          message: 'Email address updated successfully'
        }));
      }
      handleCancel();
      await loadAddresses();
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: error.userMessage || 'Failed to save email address'
      }));
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (address) => {
    try {
      await toggleEmailAddress(address.id);
      dispatch(addNotification({
        type: 'success',
        message: `Email address ${address.isActive ? 'disabled' : 'enabled'}`
      }));
      await loadAddresses();
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: error.userMessage || 'Failed to toggle email address'
      }));
    }
  };

  if (!canManageSettings) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-red-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Permission Required</h2>
            <p className="text-gray-600 mt-2">You don'\''t have permission to access this page.</p>
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
      <div className="space-y-6 max-w-6xl mx-auto pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center shadow-md">
              <Mail className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Email Addresses</h1>
              <p className="text-sm text-gray-500">Manage company email addresses</p>
            </div>
          </div>
          {!editingId && !isCreating && (
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:shadow-blue-500/25 font-bold text-sm transition-all"
            >
              <Plus size={18} />
              Add Address
            </button>
          )}
        </div>

        {/* Form - Create/Edit */}
        {(editingId || isCreating) && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              {isCreating ? 'Create New Email Address' : 'Edit Email Address'}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Type *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., support, sales, noreply"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2] text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Display Name *
                </label>
                <input
                  type="text"
                  placeholder="Display name for outgoing emails"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2] text-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  Active
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-lg hover:shadow-blue-500/25 font-medium text-sm transition-all disabled:opacity-50"
                >
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {!Array.isArray(addresses) || addresses.length === 0 ? (
            <div className="p-12 text-center">
              <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">No email addresses yet</h3>
              <p className="text-sm text-gray-600">Create your first email address to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Display Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {addresses.map((addr) => (
                    <tr key={addr.id} className="border-t hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          {addr.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{addr.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{addr.displayName}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          addr.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {addr.isActive ? <CheckCircle size={14} /> : <XCircle size={14} />}
                          {addr.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(addr)}
                            className="p-2 text-gray-600 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleToggle(addr)}
                            className={`p-2 rounded-lg transition-colors ${
                              addr.isActive 
                                ? 'text-yellow-600 hover:bg-yellow-50' 
                                : 'text-green-600 hover:bg-green-50'
                            }`}
                            title={addr.isActive ? 'Disable' : 'Enable'}
                          >
                            <XCircle size={16} />
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
      </div>
    </AdminLayout>
  );
};

export default EmailAddressesPage;
