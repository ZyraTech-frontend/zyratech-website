import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../../store/slices/uiSlice';
import api from '../../../services/api';
import { 
  CreditCard, 
  Shield, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Loader,
  Save,
  TestTube,
  Lock,
  Key
} from 'lucide-react';

const PaymentSettingsTab = () => {
  const dispatch = useDispatch();
  
  // State
  const [environment, setEnvironment] = useState('test');
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // Fetch settings when environment changes
  useEffect(() => {
    fetchSettings();
  }, [environment]);

  const fetchSettings = async () => {
    setLoading(true);
    setTestResult(null);
    try {
      const response = await api.get(`/admin/settings/payment?environment=${environment}`);
      
      if (response.data.success) {
        setSettings(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch payment settings:', error);
      
      // If 404, settings don't exist yet
      if (error.response?.status === 404) {
        setSettings(null);
      } else {
        dispatch(addNotification({
          type: 'error',
          message: error.response?.data?.message || 'Failed to load payment settings'
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    setTesting(true);
    setTestResult(null);
    
    try {
      const response = await api.post('/admin/settings/payment/test', {
        environment
      });
      
      setTestResult(response.data.data);
      
      if (response.data.data.valid) {
        dispatch(addNotification({
          type: 'success',
          message: '✓ Paystack connection successful!'
        }));
      } else {
        dispatch(addNotification({
          type: 'error',
          message: '✗ ' + response.data.data.message
        }));
      }
    } catch (error) {
      setTestResult({ valid: false, message: 'Connection test failed' });
      dispatch(addNotification({
        type: 'error',
        message: 'Connection test failed'
      }));
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Security Warning */}
      <div className="bg-amber-50/80 border border-amber-200/50 rounded-2xl p-5 flex gap-4">
        <div className="mt-0.5">
          <Shield className="text-amber-500" size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-amber-900">Security Notice</h4>
          <p className="text-xs text-amber-800 mt-1 leading-relaxed">
            All payment keys are encrypted in the database using AES-256-GCM encryption. 
            Keys are masked in responses and all changes are logged in the audit trail.
          </p>
        </div>
      </div>

      {/* Environment Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100">
          <div className="flex">
            <button
              onClick={() => setEnvironment('test')}
              className={`flex-1 px-6 py-4 font-semibold text-sm transition-all relative ${
                environment === 'test'
                  ? 'text-[#004fa2] bg-blue-50/50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <TestTube size={18} />
                Test Environment
              </div>
              {environment === 'test' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#004fa2]"></div>
              )}
            </button>
            
            <button
              onClick={() => setEnvironment('live')}
              className={`flex-1 px-6 py-4 font-semibold text-sm transition-all relative ${
                environment === 'live'
                  ? 'text-green-600 bg-green-50/50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Lock size={18} />
                Live Environment
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded">PRODUCTION</span>
              </div>
              {environment === 'live' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="animate-spin text-[#004fa2]" size={32} />
            </div>
          ) : settings ? (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {environment === 'test' ? 'Test' : 'Live'} Configuration
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage Paystack keys for {environment} environment
                  </p>
                </div>
                <div className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                  settings.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {settings.status === 'active' ? '● Active' : '○ Inactive'}
                </div>
              </div>

              {/* Keys Display */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Public Key (Masked)
                  </label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                    <Key size={16} className="text-gray-400" />
                    <code className="flex-1 text-sm font-mono text-gray-700">
                      {settings.publicKey}
                    </code>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Secret Key (Masked)
                  </label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                    <Lock size={16} className="text-gray-400" />
                    <code className="flex-1 text-sm font-mono text-gray-700 tracking-wider">
                      {settings.secretKey}
                    </code>
                  </div>
                </div>
              </div>

              {/* Test Result */}
              {testResult && (
                <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                  testResult.valid
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  {testResult.valid ? (
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  ) : (
                    <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  )}
                  <div>
                    <p className={`font-semibold text-sm ${
                      testResult.valid ? 'text-green-900' : 'text-red-900'
                    }`}>
                      {testResult.valid ? 'Connection Successful' : 'Connection Failed'}
                    </p>
                    <p className={`text-xs mt-1 ${
                      testResult.valid ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {testResult.message}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#004fa2] text-white rounded-xl hover:bg-[#003d7a] transition-all font-semibold text-sm shadow-sm"
                >
                  <Key size={18} />
                  Edit Keys
                </button>
                
                <button
                  onClick={testConnection}
                  disabled={testing}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {testing ? (
                    <>
                      <Loader className="animate-spin" size={18} />
                      Testing...
                    </>
                  ) : (
                    <>
                      <TestTube size={18} />
                      Test Connection
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            // Empty State
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No Payment Settings Configured
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Add your Paystack keys for {environment} environment to start accepting payments
              </p>
              <button
                onClick={() => setShowEditModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#004fa2] text-white rounded-xl hover:bg-[#003d7a] transition-all font-semibold text-sm shadow-sm"
              >
                <Key size={18} />
                Add Keys
              </button>
            </div>
          )}
        </div>
      </div>

      {/* How to Get Keys Guide */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <h4 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
          <AlertTriangle size={16} />
          How to Get Paystack Keys
        </h4>
        <ol className="text-xs text-blue-800 space-y-1.5 list-decimal list-inside">
          <li>Go to <a href="https://paystack.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold">paystack.com</a> and log in</li>
          <li>Navigate to Settings → API Keys & Webhooks</li>
          <li>Copy your {environment === 'test' ? 'Test' : 'Live'} Public Key (starts with <code className="bg-white px-1 rounded">pk_{environment}_</code>)</li>
          <li>Copy your {environment === 'test' ? 'Test' : 'Live'} Secret Key (starts with <code className="bg-white px-1 rounded">sk_{environment}_</code>)</li>
          <li>Paste them into the form above and save</li>
        </ol>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditKeysModal
          environment={environment}
          currentSettings={settings}
          onClose={() => setShowEditModal(false)}
          onSaved={() => {
            setShowEditModal(false);
            fetchSettings();
          }}
        />
      )}
    </div>
  );
};

// Edit Keys Modal Component
const EditKeysModal = ({ environment, currentSettings, onClose, onSaved }) => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    publicKey: '',
    secretKey: '',
    status: 'active'
  });
  
  const [errors, setErrors] = useState([]);
  const [saving, setSaving] = useState(false);
  const [showPublicKey, setShowPublicKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  const validate = () => {
    const newErrors = [];
    
    const expectedPublicPrefix = environment === 'test' ? 'pk_test_' : 'pk_live_';
    if (!formData.publicKey.startsWith(expectedPublicPrefix)) {
      newErrors.push(`Public key must start with ${expectedPublicPrefix}`);
    }
    
    const expectedSecretPrefix = environment === 'test' ? 'sk_test_' : 'sk_live_';
    if (!formData.secretKey.startsWith(expectedSecretPrefix)) {
      newErrors.push(`Secret key must start with ${expectedSecretPrefix}`);
    }
    
    if (!formData.publicKey || !formData.secretKey) {
      newErrors.push('Both keys are required');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleTestAndSave = async () => {
    if (!validate()) return;
    
    setSaving(true);
    try {
      // Save the keys
      const saveResponse = await api.put('/admin/settings/payment', {
        environment,
        publicKey: formData.publicKey,
        secretKey: formData.secretKey,
        status: formData.status
      });
      
      if (!saveResponse.data.success) {
        throw new Error(saveResponse.data.message || 'Failed to save settings');
      }
      
      // Test connection
      const testResponse = await api.post('/admin/settings/payment/test', {
        environment
      });
      
      if (testResponse.data.data.valid) {
        dispatch(addNotification({
          type: 'success',
          message: '✓ Settings saved and connection verified!'
        }));
        onSaved();
      } else {
        dispatch(addNotification({
          type: 'warning',
          message: '⚠ Settings saved but connection test failed: ' + testResponse.data.data.message
        }));
        onSaved();
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to save settings';
      dispatch(addNotification({
        type: 'error',
        message: '✗ ' + message
      }));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Edit Payment Keys
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {environment === 'test' ? 'Test' : 'Live'} Environment
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <span className="text-gray-400 text-xl">×</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Errors */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-red-900 mb-2">Please fix the following errors:</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    {errors.map((err, i) => (
                      <li key={i}>• {err}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Public Key */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Public Key <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPublicKey ? 'text' : 'password'}
                value={formData.publicKey}
                onChange={e => setFormData({ ...formData, publicKey: e.target.value })}
                placeholder={`pk_${environment}_your_full_public_key_here`}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPublicKey(!showPublicKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPublicKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Secret Key */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Secret Key <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showSecretKey ? 'text' : 'password'}
                value={formData.secretKey}
                onChange={e => setFormData({ ...formData, secretKey: e.target.value })}
                placeholder={`sk_${environment}_your_full_secret_key_here`}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm font-mono tracking-wider"
              />
              <button
                type="button"
                onClick={() => setShowSecretKey(!showSecretKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showSecretKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Status
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={formData.status === 'active'}
                  onChange={() => setFormData({ ...formData, status: 'active' })}
                  className="w-4 h-4 text-[#004fa2] focus:ring-[#004fa2]"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={formData.status === 'inactive'}
                  onChange={() => setFormData({ ...formData, status: 'inactive' })}
                  className="w-4 h-4 text-gray-600 focus:ring-gray-600"
                />
                <span className="text-sm font-medium text-gray-700">Inactive</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            disabled={saving}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold text-sm disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleTestAndSave}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#004fa2] text-white rounded-xl hover:bg-[#003d7a] transition-all font-semibold text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader className="animate-spin" size={18} />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Test & Save
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettingsTab;
