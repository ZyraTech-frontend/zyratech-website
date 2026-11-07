import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../../store/slices/uiSlice';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import LoadingSpinner from '../../../../components/admin/shared/LoadingSpinner';
import { useAuth } from '../../../../hooks/useAuth';
import { Mail, Server, Key, CheckCircle, XCircle, Shield, Save, TestTube } from 'lucide-react';
import { getSmtpConfig, updateSmtpConfig, testSmtpConnection } from '../../../../services/emailService';

const SmtpConfigPage = () => {
  const dispatch = useDispatch();
  const { userPermissions, userRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [formData, setFormData] = useState({
    smtpHost: '',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    fromEmail: '',
    fromName: ''
  });

  const canManageSettings = userRole === 'super_admin' || (userPermissions?.includes('settings') ?? false);

  useEffect(() => {
    loadSmtpConfig();
  }, []);

  const loadSmtpConfig = async () => {
    try {
      const response = await getSmtpConfig();
      console.log('[SmtpConfigPage] Raw SMTP config response:', response);
      
      // Handle nested response: { data: {...} } or direct object
      const config = response?.data ?? response;
      console.log('[SmtpConfigPage] Extracted SMTP config:', config);
      
      // Only set if we have actual data
      if (config && Object.keys(config).length > 0) {
        setFormData(prev => ({
          ...prev,
          ...config
        }));
        console.log('[SmtpConfigPage] Loaded SMTP config successfully');
      } else {
        console.log('[SmtpConfigPage] No SMTP config found, using defaults');
      }
    } catch (error) {
      console.error('[SmtpConfigPage] Error loading SMTP config:', error);
      console.log('[SmtpConfigPage] No existing config yet or error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async () => {
    if (!canManageSettings) {
      dispatch(addNotification({
        type: 'error',
        title: 'Permission Required',
        message: 'You do not have permission to test SMTP settings.'
      }));
      return;
    }

    setTesting(true);
    setTestResult(null);
    
    try {
      const result = await testSmtpConnection({
        smtpHost: formData.smtpHost,
        smtpPort: formData.smtpPort,
        smtpUsername: formData.smtpUsername,
        smtpPassword: formData.smtpPassword
      });
      
      setTestResult({ success: true, message: result.message });
      dispatch(addNotification({
        type: 'success',
        message: 'SMTP connection successful!'
      }));
    } catch (error) {
      const errorMsg = error.userMessage || error.response?.data?.message || 'Connection failed';
      setTestResult({ success: false, message: errorMsg });
      dispatch(addNotification({
        type: 'error',
        message: errorMsg
      }));
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async () => {
    if (!canManageSettings) {
      dispatch(addNotification({
        type: 'error',
        title: 'Permission Required',
        message: 'You do not have permission to update SMTP settings.'
      }));
      return;
    }

    setSaving(true);
    try {
      await updateSmtpConfig(formData);
      dispatch(addNotification({
        type: 'success',
        message: 'SMTP configuration saved successfully!'
      }));
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: error.userMessage || 'Failed to save SMTP configuration'
      }));
    } finally {
      setSaving(false);
    }
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
        <LoadingSpinner text="Loading SMTP configuration..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-3 md:space-y-6 max-w-7xl mx-auto pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#004fa2]/5 to-[#0066cc]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-3 sm:gap-4 relative z-10 min-w-0">
            <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center shadow-md shrink-0">
              <Mail className="text-white" size={20} />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight truncate">SMTP Configuration</h1>
              <p className="text-[11px] sm:text-sm text-gray-500 font-medium truncate mt-0.5">Configure email server settings for outgoing emails</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[#004fa2]">
                <Server size={16} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Mail Server Settings</h3>
                <p className="text-[11px] text-gray-500 font-medium tracking-wide mt-0.5">SMTP host and authentication credentials</p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">SMTP Host *</label>
                  <input
                    type="text"
                    value={formData.smtpHost || ''}
                    onChange={(e) => setFormData({ ...formData, smtpHost: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">SMTP Port *</label>
                  <input
                    type="number"
                    value={formData.smtpPort || ''}
                    onChange={(e) => setFormData({ ...formData, smtpPort: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                    placeholder="587"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">SMTP Username *</label>
                  <input
                    type="text"
                    value={formData.smtpUsername || ''}
                    onChange={(e) => setFormData({ ...formData, smtpUsername: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                    placeholder="your-email@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">SMTP Password *</label>
                  <input
                    type="password"
                    value={formData.smtpPassword || ''}
                    onChange={(e) => setFormData({ ...formData, smtpPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Mail size={16} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Default Sender Information</h3>
                <p className="text-[11px] text-gray-500 font-medium tracking-wide mt-0.5">Default "From" address and name for outgoing emails</p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">From Email *</label>
                  <input
                    type="email"
                    value={formData.fromEmail || ''}
                    onChange={(e) => setFormData({ ...formData, fromEmail: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                    placeholder="noreply@zyratechhub.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">From Name *</label>
                  <input
                    type="text"
                    value={formData.fromName || ''}
                    onChange={(e) => setFormData({ ...formData, fromName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                    placeholder="ZyraTech Hub"
                  />
                </div>
              </div>
            </div>
          </div>

          {testResult && (
            <div className={`p-4 rounded-xl border ${testResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-center gap-3">
                {testResult.success ? (
                  <CheckCircle className="text-green-600" size={20} />
                ) : (
                  <XCircle className="text-red-600" size={20} />
                )}
                <p className={`text-sm font-medium ${testResult.success ? 'text-green-900' : 'text-red-900'}`}>
                  {testResult.message}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={handleTestConnection}
              disabled={testing || saving}
              className="flex items-center gap-2 px-6 py-3.5 bg-white text-[#004fa2] border border-[#004fa2] rounded-xl hover:bg-[#004fa2]/5 transition-all font-bold text-sm disabled:opacity-50"
            >
              <TestTube size={18} />
              {testing ? 'Testing Connection...' : 'Test Connection'}
            </button>
            <button
              onClick={handleSave}
              disabled={saving || testing}
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all font-bold text-sm disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? 'Saving Changes...' : 'Save Configuration'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SmtpConfigPage;

