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
  deleteEmailAddress,
  createEmailAddress 
} from '../../../../services/emailService';

const EMAIL_TYPES = [
  { value: 'noreply', label: 'No Reply', description: 'System automated emails' },
  { value: 'support', label: 'Support', description: 'Customer support inquiries' },
  { value: 'payments', label: 'Payments', description: 'Payment receipts and invoices' },
  { value: 'security', label: 'Security', description: 'Password resets and security alerts' },
  { value: 'careers', label: 'Careers', description: 'Job applications' },
  { value: 'training', label: 'Training', description: 'Course enrollments and training inquiries' },
  { value: 'partnerships', label: 'Partnerships', description: 'Partnership opportunities' },
  { value: 'projects', label: 'Projects', description: 'Project requests and proposals' },
  { value: 'admin', label: 'Admin', description: 'Administrative notifications' },
  { value: 'info', label: 'Info', description: 'General information inquiries' }
];

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
    description: '',
    isActive: true
  });
  const [saving, setSaving] = useState(false);
  const [deletingAddress, setDeletingAddress] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const canManageSettings = userRole === 'super_admin' || (userPermissions?.includes('settings') ?? false);

  useEffect(() => {
    if (canManageSettings) {
      loadAddresses();
    }
  }, [canManageSettings]);

  const loadAddresses = async () => {
    try {
      const list = await getAllEmailAddresses();
      console.log('[EmailAddressesPage] Loaded addresses:', list);
      const addressList = Array.isArray(list) ? list : [];
      console.log('[EmailAddressesPage] Setting addresses state:', addressList);
      // Verify each address has isActive property
      addressList.forEach((addr, idx) => {
        console.log(`  [${idx}] ${addr.email}: isActive=${addr.isActive}, type=${addr.type}`);
      });
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
      description: address.description || '',
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
      description: '',
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
      description: '',
      isActive: true
    });
  };

  const handleTypeChange = (typeValue) => {
    const selectedType = EMAIL_TYPES.find(t => t.value === typeValue);
    setFormData({
      ...formData,
      type: typeValue,
      description: selectedType?.description || ''
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
      console.log('[EmailAddressesPage] Saving email address:', { isCreating, formData });
      if (isCreating) {
        const result = await createEmailAddress(formData);
        console.log('[EmailAddressesPage] Create response:', result);
        dispatch(addNotification({
          type: 'success',
          message: 'Email address created successfully'
        }));
      } else {
        const result = await updateEmailAddress(editingId, formData);
        console.log('[EmailAddressesPage] Update response:', result);
        dispatch(addNotification({
          type: 'success',
          message: 'Email address updated successfully'
        }));
      }
      // Add newly created address to local list for instant feedback
      if (isCreating) {
        const newAddress = {
          id: `temp-${Date.now()}`,
          type: formData.type,
          email: formData.email,
          displayName: formData.displayName,
          description: formData.description,
          isActive: formData.isActive
        };
        setAddresses([...addresses, newAddress]);
      }
      handleCancel();
      // Reload to sync with backend (in case of race conditions)
      setTimeout(() => loadAddresses(), 500);
    } catch (error) {
      console.error('[EmailAddressesPage] Error saving:', error);
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
      const newState = !address.isActive;
      await toggleEmailAddress(address.type);
      dispatch(addNotification({
        type: 'success',
        message: `Email address ${newState ? 'enabled' : 'disabled'}`
      }));
      // Immediately update the local state for instant UI feedback
      setAddresses(addresses.map(addr => 
        addr.type === address.type 
          ? { ...addr, isActive: newState }
          : addr
      ));
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: error.userMessage || 'Failed to toggle email address'
      }));
    }
  };

  const handleDeleteClick = (address) => {
    setDeletingAddress(address);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingAddress) return;

    setIsDeleting(true);
    try {
      await deleteEmailAddress(deletingAddress.type);
      dispatch(addNotification({
        type: 'success',
        message: `Email address "${deletingAddress.email}" deleted successfully`
      }));
      setDeletingAddress(null);
      await loadAddresses();
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: error.userMessage || 'Failed to delete email address'
      }));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeletingAddress(null);
  };

  if (!canManageSettings) {
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
      <div className="space-y-6 max-w-6xl mx-auto pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-lg">
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
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:shadow-lg font-bold text-sm transition-all"
            >
              <Plus size={18} />
              Add Address
            </button>
          )}
        </div>

        {/* Form - Create/Edit */}
        {(editingId || isCreating) && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              {isCreating ? 'Create New Email Address' : 'Edit Email Address'}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Type Dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2] text-sm"
                  >
                    <option value="">Select email type...</option>
                    {EMAIL_TYPES.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2] text-sm"
                  />
                </div>
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Display Name *
                </label>
                <input
                  type="text"
                  placeholder="Display name for outgoing emails"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2] text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  placeholder="Additional details about this email address (max 500 characters)"
                  value={formData.description}
                  onChange={(e) => {
                    const text = e.target.value.slice(0, 500);
                    setFormData({ ...formData, description: text });
                  }}
                  maxLength={500}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2] text-sm resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500</p>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded cursor-pointer"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Active
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-6 py-2.5 text-gray-700 rounded-lg hover:bg-gray-100 font-medium text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-lg hover:shadow-lg font-medium text-sm transition-all disabled:opacity-50"
                >
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Email Addresses Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {!Array.isArray(addresses) || addresses.length === 0 ? (
            <div className="p-12 text-center">
              <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">No email addresses yet</h3>
              <p className="text-sm text-gray-600">Create your first email address to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Display Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Description</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Status</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {addresses.map((addr) => (
                    <tr key={addr.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          {EMAIL_TYPES.find(t => t.value === addr.type)?.label || addr.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{addr.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{addr.displayName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={addr.description}>
                        {addr.description || <span className="text-gray-400 italic">No description</span>}
                      </td>
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
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(addr)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
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

      {/* Delete Confirmation Modal - SINGLE INSTANCE */}
      {deletingAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trash2 className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Delete Email Address?</h3>
                  <p className="text-sm text-gray-600 mt-1">This action cannot be undone</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Details Box - No Border */}
              <div className="bg-red-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-3 font-medium">You are about to delete:</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900">{deletingAddress.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="font-semibold text-gray-900">
                      {EMAIL_TYPES.find(t => t.value === deletingAddress.type)?.label || deletingAddress.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Display Name</p>
                    <p className="font-semibold text-gray-900">{deletingAddress.displayName}</p>
                  </div>
                </div>
              </div>

              {/* Warning Message */}
              <p className="text-sm text-gray-600 mb-6">
                This will permanently remove this email address from the system. If you depend on this address for sending emails, this action may cause issues.
              </p>
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={handleDeleteCancel}
                disabled={isDeleting}
                className="px-6 py-2.5 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/30 font-medium text-sm transition-all disabled:opacity-50"
              >
                <Trash2 size={16} />
                {isDeleting ? 'Deleting...' : 'Delete Address'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default EmailAddressesPage;
