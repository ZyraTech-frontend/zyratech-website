/**
 * Email Templates Page
 * Create and manage email templates with variable substitution
 */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../../store/slices/uiSlice';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import LoadingSpinner from '../../../../components/admin/shared/LoadingSpinner';
import { useAuth } from '../../../../hooks/useAuth';
import { Mail, Plus, Edit2, Trash2, Shield, Save, X, Eye, CheckCircle, XCircle, Copy } from 'lucide-react';
import { 
  getAllEmailTemplates, 
  createEmailTemplate, 
  updateEmailTemplate, 
  deleteEmailTemplate, 
  toggleEmailTemplate,
  previewEmailTemplate 
} from '../../../../services/emailService';

const EmailTemplatesPage = () => {
  const dispatch = useDispatch();
  const { userPermissions, userRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [saving, setSaving] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    textBody: '',
    htmlBody: '',
    description: '',
    variables: [],
    category: 'welcome',
    fromType: 'noreply',
    isActive: true
  });

  const canManageSettings = userRole === 'super_admin' || (userPermissions?.includes('settings') ?? false);

  const categories = [
    { value: 'password_reset', label: 'Password Reset' },
    { value: 'welcome', label: 'Welcome' },
    { value: 'notification', label: 'Notification' },
    { value: 'transactional', label: 'Transactional' },
    { value: 'marketing', label: 'Marketing' }
  ];

  const fromTypes = [
    { value: 'noreply', label: 'No Reply' },
    { value: 'support', label: 'Support' },
    { value: 'security', label: 'Security' },
    { value: 'payments', label: 'Payments' },
    { value: 'training', label: 'Training' },
    { value: 'careers', label: 'Careers' },
    { value: 'info', label: 'Info' }
  ];

  useEffect(() => {
    loadTemplates();
  }, []);

  useEffect(() => {
    filterTemplates();
  }, [templates, categoryFilter, activeFilter]);

  const loadTemplates = async () => {
    try {
      const data = await getAllEmailTemplates();
      setTemplates(data);
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to load email templates'
      }));
    } finally {
      setLoading(false);
    }
  };

  const filterTemplates = () => {
    let filtered = templates;
    
    if (categoryFilter) {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }
    
    if (activeFilter === 'active') {
      filtered = filtered.filter(t => t.isActive);
    } else if (activeFilter === 'inactive') {
      filtered = filtered.filter(t => !t.isActive);
    }
    
    setFilteredTemplates(filtered);
  };

  const handleCreate = () => {
    setEditingTemplate(null);
    setFormData({
      name: '',
      subject: '',
      textBody: '',
      htmlBody: '',
      description: '',
      variables: [],
      category: 'welcome',
      fromType: 'noreply',
      isActive: true
    });
    setShowModal(true);
  };

  const handleEdit = (template) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      subject: template.subject,
      textBody: template.textBody,
      htmlBody: template.htmlBody || '',
      description: template.description || '',
      variables: template.variables || [],
      category: template.category,
      fromType: template.fromType,
      isActive: template.isActive
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTemplate(null);
    setFormData({
      name: '',
      subject: '',
      textBody: '',
      htmlBody: '',
      description: '',
      variables: [],
      category: 'welcome',
      fromType: 'noreply',
      isActive: true
    });
  };

  const extractVariables = (text) => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = [...text.matchAll(regex)];
    return [...new Set(matches.map(m => `{{${m[1]}}}`))];
  };

  const handleSave = async () => {
    if (!canManageSettings) {
      dispatch(addNotification({
        type: 'error',
        title: 'Permission Required',
        message: 'You do not have permission to manage templates.'
      }));
      return;
    }

    // Extract variables from subject and text body
    const allText = `${formData.subject} ${formData.textBody} ${formData.htmlBody || ''}`;
    const variables = extractVariables(allText);

    const templateData = { ...formData, variables };

    setSaving(true);
    try {
      if (editingTemplate) {
        await updateEmailTemplate(editingTemplate.id, templateData);
        dispatch(addNotification({
          type: 'success',
          message: 'Template updated successfully!'
        }));
      } else {
        await createEmailTemplate(templateData);
        dispatch(addNotification({
          type: 'success',
          message: 'Template created successfully!'
        }));
      }
      await loadTemplates();
      handleCloseModal();
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: editingTemplate ? 'Failed to update template' : 'Failed to create template'
      }));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (template) => {
    if (!canManageSettings) {
      dispatch(addNotification({
        type: 'error',
        title: 'Permission Required',
        message: 'You do not have permission to delete templates.'
      }));
      return;
    }

    if (template.isSystem) {
      dispatch(addNotification({
        type: 'error',
        message: 'Cannot delete system templates'
      }));
      return;
    }

    if (!confirm(`Delete template "${template.name}"?`)) return;

    try {
      await deleteEmailTemplate(template.id);
      dispatch(addNotification({
        type: 'success',
        message: 'Template deleted successfully!'
      }));
      await loadTemplates();
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to delete template'
      }));
    }
  };

  const handleToggle = async (template) => {
    if (!canManageSettings) {
      dispatch(addNotification({
        type: 'error',
        title: 'Permission Required',
        message: 'You do not have permission to toggle templates.'
      }));
      return;
    }

    try {
      await toggleEmailTemplate(template.id);
      dispatch(addNotification({
        type: 'success',
        message: 'Template status updated!'
      }));
      await loadTemplates();
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to toggle template status'
      }));
    }
  };

  const handlePreview = async (template) => {
    // Generate sample variables
    const sampleVars = {};
    template.variables?.forEach(v => {
      const key = v.replace(/[{}]/g, '');
      sampleVars[key] = `Sample ${key}`;
    });

    try {
      const preview = await previewEmailTemplate(template.id, sampleVars);
      setPreviewData(preview);
      setShowPreview(true);
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to generate preview'
      }));
    }
  };

  const insertVariable = (variable) => {
    setFormData({ ...formData, textBody: formData.textBody + ` ${variable}` });
  };

  const commonVariables = ['{{userName}}', '{{email}}', '{{companyName}}', '{{resetUrl}}', '{{verifyUrl}}', '{{expiryMinutes}}'];

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
        <LoadingSpinner text="Loading email templates..." />
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
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight truncate">Email Templates</h1>
              <p className="text-[11px] sm:text-sm text-gray-500 font-medium truncate mt-0.5">Create and manage email templates with variables</p>
            </div>
          </div>
          {canManageSettings && (
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all font-bold text-sm shrink-0"
            >
              <Plus size={18} />
              Create Template
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-2">Status</label>
              <div className="flex gap-2">
                {['all', 'active', 'inactive'].map(status => (
                  <button
                    key={status}
                    onClick={() => setActiveFilter(status)}
                    className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                      activeFilter === status
                        ? 'bg-[#004fa2] text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 truncate">{template.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 truncate">{template.subject}</p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    {template.isSystem && (
                      <span className="inline-flex items-center px-2 py-1 rounded-lg bg-purple-100 text-purple-700 text-[10px] font-bold">
                        SYSTEM
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold">
                    {categories.find(c => c.value === template.category)?.label || template.category}
                  </span>
                  {template.isActive ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-green-100 text-green-700 text-xs font-bold">
                      <CheckCircle size={10} />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold">
                      <XCircle size={10} />
                      Inactive
                    </span>
                  )}
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-amber-100 text-amber-700 text-xs font-bold">
                    v{template.version || 1}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {(template.variables || []).slice(0, 3).map((v, i) => (
                    <span key={i} className="text-[10px] font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {v}
                    </span>
                  ))}
                  {(template.variables || []).length > 3 && (
                    <span className="text-[10px] font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      +{(template.variables || []).length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handlePreview(template)}
                    className="text-xs font-bold text-[#004fa2] hover:text-[#0066cc] flex items-center gap-1"
                  >
                    <Eye size={14} />
                    Preview
                  </button>
                  {canManageSettings && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggle(template)}
                        className="p-1.5 text-gray-600 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <CheckCircle size={14} />
                      </button>
                      <button
                        onClick={() => handleEdit(template)}
                        className="p-1.5 text-gray-600 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      {!template.isSystem && (
                        <button
                          onClick={() => handleDelete(template)}
                          className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">No templates found</h3>
            <p className="text-sm text-gray-600">Try adjusting your filters or create a new template</p>
          </div>
        )}

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[#004fa2]">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {editingTemplate ? 'Edit Template' : 'Create Template'}
                    </h3>
                  </div>
                </div>
                <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Template Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all"
                      placeholder="password_reset"
                      disabled={editingTemplate?.isSystem}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">From Email Type *</label>
                    <select
                      value={formData.fromType}
                      onChange={(e) => setFormData({ ...formData, fromType: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50"
                    >
                      {fromTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Status</label>
                    <div className="flex items-center h-[46px]">
                      <button
                        onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                          formData.isActive
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {formData.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all"
                    placeholder="Brief description of this template"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Subject Line *</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all"
                    placeholder="Reset Your Password - {{companyName}}"
                  />
                </div>

                {/* Quick Insert Variables */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Quick Insert Variables</label>
                  <div className="flex flex-wrap gap-2">
                    {commonVariables.map(v => (
                      <button
                        key={v}
                        onClick={() => insertVariable(v)}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-[#004fa2] hover:text-white text-gray-700 rounded-lg text-xs font-mono transition-colors"
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Plain Text Body *</label>
                  <textarea
                    value={formData.textBody}
                    onChange={(e) => setFormData({ ...formData, textBody: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all resize-none font-mono"
                    placeholder="Hi {{userName}},&#10;&#10;We received a request to reset your password...&#10;&#10;Click this link: {{resetUrl}}"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">HTML Body (Optional)</label>
                  <textarea
                    value={formData.htmlBody}
                    onChange={(e) => setFormData({ ...formData, htmlBody: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all resize-none font-mono"
                    placeholder="<h1>Password Reset</h1>&#10;<p>Hi {{userName}},</p>&#10;..."
                  />
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0">
                <button
                  onClick={handleCloseModal}
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
                  {saving ? 'Saving...' : editingTemplate ? 'Update Template' : 'Create Template'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreview && previewData && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
                <h3 className="text-lg font-bold text-gray-900">Template Preview</h3>
                <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Subject:</label>
                  <p className="text-sm text-gray-900 mt-1 font-semibold">{previewData.subject}</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Plain Text:</label>
                  <pre className="text-sm text-gray-900 mt-2 whitespace-pre-wrap font-sans bg-gray-50 p-4 rounded-xl">
                    {previewData.textBody}
                  </pre>
                </div>
                {previewData.htmlBody && (
                  <div className="border-t border-gray-100 pt-4">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">HTML Preview:</label>
                    <div 
                      className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-200"
                      dangerouslySetInnerHTML={{ __html: previewData.htmlBody }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default EmailTemplatesPage;
