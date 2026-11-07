import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../../store/slices/uiSlice';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import LoadingSpinner from '../../../../components/admin/shared/LoadingSpinner';
import { useAuth } from '../../../../hooks/useAuth';
import { Mail, Plus, Edit2, Trash2, Shield, Save, X, Eye, Copy } from 'lucide-react';
import { 
  getAllEmailTemplates, 
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
  toggleEmailTemplate
} from '../../../../services/emailService';

const EmailTemplatesPage = () => {
  const dispatch = useDispatch();
  const { userPermissions, userRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showPreview, setShowPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    htmlBody: '',
    textBody: '',
    variables: '',
    isActive: true
  });
  const [saving, setSaving] = useState(false);

  const canManageSettings = userRole === 'super_admin' || (userPermissions?.includes('settings') ?? false);

  useEffect(() => {
    if (canManageSettings) {
      loadTemplates();
    }
  }, [canManageSettings]);

  const loadTemplates = async () => {
    try {
      const list = await getAllEmailTemplates();
      const templateList = Array.isArray(list) ? list : [];
      console.log('[EmailTemplatesPage] Loaded templates:', templateList);
      setTemplates(templateList);
    } catch (error) {
      console.error('[EmailTemplatesPage] Error loading templates:', error);
      setTemplates([]);
      dispatch(addNotification({
        type: 'error',
        message: error.userMessage || 'Failed to load email templates'
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (template) => {
    setEditingId(template.id);
    setFormData({
      name: template.name,
      subject: template.subject,
      htmlBody: template.htmlBody || '',
      textBody: template.textBody || '',
      variables: template.variables ? JSON.stringify(template.variables) : '',
      isActive: template.isActive !== false
    });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      name: '',
      subject: '',
      htmlBody: '',
      textBody: '',
      variables: '',
      isActive: true
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({
      name: '',
      subject: '',
      htmlBody: '',
      textBody: '',
      variables: '',
      isActive: true
    });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.subject || !formData.htmlBody) {
      dispatch(addNotification({
        type: 'error',
        message: 'Please fill in all required fields (Name, Subject, HTML Body)'
      }));
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: formData.name,
        subject: formData.subject,
        htmlBody: formData.htmlBody,
        textBody: formData.textBody,
        isActive: formData.isActive
      };

      if (formData.variables) {
        try {
          payload.variables = JSON.parse(formData.variables);
        } catch (e) {
          dispatch(addNotification({
            type: 'error',
            message: 'Invalid JSON in Variables field'
          }));
          setSaving(false);
          return;
        }
      }

      if (isCreating) {
        await createEmailTemplate(payload);
        dispatch(addNotification({
          type: 'success',
          message: 'Email template created successfully'
        }));
      } else {
        await updateEmailTemplate(editingId, payload);
        dispatch(addNotification({
          type: 'success',
          message: 'Email template updated successfully'
        }));
      }
      handleCancel();
      await loadTemplates();
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: error.userMessage || 'Failed to save email template'
      }));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (template) => {
    if (!confirm(`Delete template "${template.name}"?`)) return;

    try {
      await deleteEmailTemplate(template.id);
      dispatch(addNotification({
        type: 'success',
        message: 'Email template deleted successfully'
      }));
      await loadTemplates();
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: error.userMessage || 'Failed to delete email template'
      }));
    }
  };

  const handleToggle = async (template) => {
    try {
      await toggleEmailTemplate(template.id);
      dispatch(addNotification({
        type: 'success',
        message: `Email template ${template.isActive ? 'disabled' : 'enabled'}`
      }));
      await loadTemplates();
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: error.userMessage || 'Failed to toggle email template'
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
        <LoadingSpinner text="Loading email templates..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center shadow-md">
              <Mail className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Email Templates</h1>
              <p className="text-sm text-gray-500">Create and manage email templates</p>
            </div>
          </div>
          {!editingId && !isCreating && (
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:shadow-blue-500/25 font-bold text-sm transition-all"
            >
              <Plus size={18} />
              Create Template
            </button>
          )}
        </div>

        {/* Form - Create/Edit */}
        {(editingId || isCreating) && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              {isCreating ? 'Create New Email Template' : 'Edit Email Template'}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Welcome Email, Password Reset"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Subject *
                  </label>
                  <input
                    type="text"
                    placeholder="Email subject line"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  HTML Body *
                </label>
                <textarea
                  placeholder="HTML email content"
                  value={formData.htmlBody}
                  onChange={(e) => setFormData({ ...formData, htmlBody: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2] text-sm font-mono"
                />
                <p className="text-xs text-gray-500 mt-1">Use {"{"}variable{"}"} syntax for dynamic content</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Text Body (optional)
                </label>
                <textarea
                  placeholder="Plain text version of email content"
                  value={formData.textBody}
                  onChange={(e) => setFormData({ ...formData, textBody: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2] text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Variables (JSON, optional)
                </label>
                <textarea
                  placeholder='{{"name": "string", "link": "string"}}'
                  value={formData.variables}
                  onChange={(e) => setFormData({ ...formData, variables: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2] text-sm font-mono"
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
          {!Array.isArray(templates) || templates.length === 0 ? (
            <div className="p-12 text-center">
              <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">No templates yet</h3>
              <p className="text-sm text-gray-600">Create your first email template to get started</p>
            </div>
          ) : (
            <div className="space-y-0 divide-y">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Subject: {template.subject}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {template.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(template)}
                      className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggle(template)}
                      className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                        template.isActive 
                          ? 'text-yellow-600 hover:bg-yellow-50' 
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                    >
                      {template.isActive ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      onClick={() => handleDelete(template)}
                      className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default EmailTemplatesPage;

