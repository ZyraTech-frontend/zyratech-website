/**
 * Settings Page (Super Admin Only)
 * Manage site-wide settings, branding, payment keys, etc.
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings, updateSetting } from '../../../store/slices/settingsSlice';
import { addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import LoadingSpinner from '../../../components/admin/shared/LoadingSpinner';
import { usePermissions } from '../../../hooks/usePermissions';
import { 
  Palette, 
  CreditCard, 
  Mail, 
  Globe, 
  Shield,
  Save,
  Upload,
  Phone,
  Share2,
  BarChart3,
  Search
} from 'lucide-react';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { isSuperAdmin } = usePermissions();
  const { values: settings, loading } = useSelector((state) => state.settings);
  const [activeTab, setActiveTab] = useState('branding');
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  // Redirect if not super admin
  if (!isSuperAdmin) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-red-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Super Admin Only</h2>
            <p className="text-gray-600 mt-2">You don't have permission to access this page.</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const handleSave = async (category) => {
    setSaving(true);
    try {
      // Save all settings in the category
      const categorySettings = Object.keys(formData).filter(key => 
        getCategoryForKey(key) === category
      );
      
      for (const key of categorySettings) {
        await dispatch(updateSetting({ key, value: formData[key] }));
      }
      
      dispatch(addNotification({
        type: 'success',
        message: 'Settings saved successfully!'
      }));
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to save settings'
      }));
    } finally {
      setSaving(false);
    }
  };

  const getCategoryForKey = (key) => {
    if (['siteName', 'siteDescription', 'tagline', 'logoLight', 'logoDark', 'favicon', 'primaryColor', 'secondaryColor'].includes(key)) return 'branding';
    if (['contactEmail', 'contactPhone', 'contactWhatsApp', 'contactAddress', 'hrName', 'hrEmail', 'hrTitle', 'businessHoursWeekday', 'businessHoursWeekend'].includes(key)) return 'contact';
    if (['socialLinkedIn', 'socialTwitter', 'socialInstagram', 'socialFacebook', 'socialYouTube'].includes(key)) return 'social';
    if (['googleAnalyticsId', 'metaPixelId', 'enableVisitorTracking', 'seoTitle', 'seoDescription', 'seoKeywords', 'siteUrl'].includes(key)) return 'analytics';
    if (['paystackPublicKey', 'paystackSecretKey', 'stripePublicKey', 'stripeSecretKey', 'currency'].includes(key)) return 'payments';
    if (['smtpHost', 'smtpPort', 'smtpUser', 'smtpPassword', 'fromEmail', 'fromName', 'supportEmail'].includes(key)) return 'email';
    return 'general';
  };

  const tabs = [
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'contact', label: 'Contact Info', icon: Phone },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'analytics', label: 'Analytics & SEO', icon: BarChart3 },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'general', label: 'General', icon: Globe }
  ];

  if (loading && !formData.siteName) {
    return (
      <AdminLayout>
        <LoadingSpinner text="Loading settings..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">Manage site-wide configuration and settings</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex -mb-px min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Branding Tab */}
            {activeTab === 'branding' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={formData.siteName || ''}
                      onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="ZyraTech Hub"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Description
                    </label>
                    <input
                      type="text"
                      value={formData.siteDescription || ''}
                      onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="Empowering youth through technology"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={formData.primaryColor || '#004fa2'}
                        onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                        className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.primaryColor || '#004fa2'}
                        onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                        placeholder="#004fa2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Secondary Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={formData.secondaryColor || '#ff6b35'}
                        onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                        className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.secondaryColor || '#ff6b35'}
                        onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                        placeholder="#ff6b35"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo (Light Mode)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload logo</p>
                      <input type="file" className="hidden" accept="image/*" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo (Dark Mode)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload logo</p>
                      <input type="file" className="hidden" accept="image/*" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Favicon
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload icon</p>
                      <input type="file" className="hidden" accept="image/*" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleSave('branding')}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save size={20} />
                  {saving ? 'Saving...' : 'Save Branding'}
                </button>
              </div>
            )}

            {/* Contact Info Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={formData.contactEmail || ''}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="info@zyratechhub.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.contactPhone || ''}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="+233 50 958 2497"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={formData.contactWhatsApp || ''}
                      onChange={(e) => setFormData({ ...formData, contactWhatsApp: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="233509582497"
                    />
                    <p className="text-xs text-gray-500 mt-1">Without + or spaces (e.g., 233509582497)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address
                    </label>
                    <input
                      type="text"
                      value={formData.contactAddress || ''}
                      onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="Koforidua, Eastern Region, Ghana"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4 pt-4 border-t">HR Contact (Training Pages)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      HR Name
                    </label>
                    <input
                      type="text"
                      value={formData.hrName || ''}
                      onChange={(e) => setFormData({ ...formData, hrName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="Magdalene"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      HR Email
                    </label>
                    <input
                      type="email"
                      value={formData.hrEmail || ''}
                      onChange={(e) => setFormData({ ...formData, hrEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="magdalene@zyratech.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      HR Title
                    </label>
                    <input
                      type="text"
                      value={formData.hrTitle || ''}
                      onChange={(e) => setFormData({ ...formData, hrTitle: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="HR Coordinator"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4 pt-4 border-t">Business Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weekday Hours
                    </label>
                    <input
                      type="text"
                      value={formData.businessHoursWeekday || ''}
                      onChange={(e) => setFormData({ ...formData, businessHoursWeekday: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="8:00 AM - 5:00 PM"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weekend Hours
                    </label>
                    <input
                      type="text"
                      value={formData.businessHoursWeekend || ''}
                      onChange={(e) => setFormData({ ...formData, businessHoursWeekend: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="Closed"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleSave('contact')}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save size={20} />
                  {saving ? 'Saving...' : 'Save Contact Info'}
                </button>
              </div>
            )}

            {/* Social Media Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <p className="text-sm text-gray-600 mb-4">
                  These links appear in the footer and contact pages. Leave empty to hide a platform.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={formData.socialLinkedIn || ''}
                      onChange={(e) => setFormData({ ...formData, socialLinkedIn: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="https://www.linkedin.com/company/zyra-tech-hub"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      X (Twitter) URL
                    </label>
                    <input
                      type="url"
                      value={formData.socialTwitter || ''}
                      onChange={(e) => setFormData({ ...formData, socialTwitter: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="https://x.com/zyratechhub"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram URL
                    </label>
                    <input
                      type="url"
                      value={formData.socialInstagram || ''}
                      onChange={(e) => setFormData({ ...formData, socialInstagram: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="https://www.instagram.com/zyratechhub"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Facebook URL
                    </label>
                    <input
                      type="url"
                      value={formData.socialFacebook || ''}
                      onChange={(e) => setFormData({ ...formData, socialFacebook: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="https://www.facebook.com/zyratechhub"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={formData.socialYouTube || ''}
                    onChange={(e) => setFormData({ ...formData, socialYouTube: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                    placeholder="https://www.youtube.com/@zyratechhub"
                  />
                </div>

                <button
                  onClick={() => handleSave('social')}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save size={20} />
                  {saving ? 'Saving...' : 'Save Social Links'}
                </button>
              </div>
            )}

            {/* Analytics & SEO Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Tracking</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Google Analytics ID
                    </label>
                    <input
                      type="text"
                      value={formData.googleAnalyticsId || ''}
                      onChange={(e) => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 font-mono text-sm"
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Pixel ID
                    </label>
                    <input
                      type="text"
                      value={formData.metaPixelId || ''}
                      onChange={(e) => setFormData({ ...formData, metaPixelId: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 font-mono text-sm"
                      placeholder="1234567890"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.enableVisitorTracking || false}
                      onChange={(e) => setFormData({ ...formData, enableVisitorTracking: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Enable Visitor Tracking</span>
                  </label>
                  <p className="text-sm text-gray-500 mt-1 ml-6">
                    Track website visitors and page views for analytics dashboard
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4 pt-4 border-t">SEO Settings</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site URL
                  </label>
                  <input
                    type="url"
                    value={formData.siteUrl || ''}
                    onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                    placeholder="https://zyratechhub.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.seoTitle || ''}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                    placeholder="ZyraTech Hub | Empowering Youth Through Technology"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Meta Description
                  </label>
                  <textarea
                    value={formData.seoDescription || ''}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                    placeholder="Ghana's premier technology education and innovation center..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Keywords
                  </label>
                  <input
                    type="text"
                    value={formData.seoKeywords || ''}
                    onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                    placeholder="tech training Ghana, digital skills, software development"
                  />
                  <p className="text-xs text-gray-500 mt-1">Comma-separated keywords</p>
                </div>

                <button
                  onClick={() => handleSave('analytics')}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save size={20} />
                  {saving ? 'Saving...' : 'Save Analytics & SEO'}
                </button>
              </div>
            )}

            {/* Payment Settings Tab */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    <strong>⚠️ Warning:</strong> Keep these keys secure. Never share them publicly.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Paystack Configuration</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Public Key
                      </label>
                      <input
                        type="text"
                        value={formData.paystackPublicKey || ''}
                        onChange={(e) => setFormData({ ...formData, paystackPublicKey: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 font-mono text-sm"
                        placeholder="pk_test_..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secret Key
                      </label>
                      <input
                        type="password"
                        value={formData.paystackSecretKey || ''}
                        onChange={(e) => setFormData({ ...formData, paystackSecretKey: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 font-mono text-sm"
                        placeholder="sk_test_..."
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Stripe Configuration</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Public Key
                      </label>
                      <input
                        type="text"
                        value={formData.stripePublicKey || ''}
                        onChange={(e) => setFormData({ ...formData, stripePublicKey: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 font-mono text-sm"
                        placeholder="pk_test_..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secret Key
                      </label>
                      <input
                        type="password"
                        value={formData.stripeSecretKey || ''}
                        onChange={(e) => setFormData({ ...formData, stripeSecretKey: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 font-mono text-sm"
                        placeholder="sk_test_..."
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={formData.currency || 'GHS'}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                  >
                    <option value="GHS">GHS - Ghanaian Cedi</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </div>

                <button
                  onClick={() => handleSave('payments')}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save size={20} />
                  {saving ? 'Saving...' : 'Save Payment Settings'}
                </button>
              </div>
            )}

            {/* Email Settings Tab */}
            {activeTab === 'email' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMTP Host
                    </label>
                    <input
                      type="text"
                      value={formData.smtpHost || ''}
                      onChange={(e) => setFormData({ ...formData, smtpHost: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="smtp.gmail.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMTP Port
                    </label>
                    <input
                      type="number"
                      value={formData.smtpPort || '587'}
                      onChange={(e) => setFormData({ ...formData, smtpPort: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="587"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMTP Username
                    </label>
                    <input
                      type="text"
                      value={formData.smtpUser || ''}
                      onChange={(e) => setFormData({ ...formData, smtpUser: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="your-email@gmail.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMTP Password
                    </label>
                    <input
                      type="password"
                      value={formData.smtpPassword || ''}
                      onChange={(e) => setFormData({ ...formData, smtpPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Email
                    </label>
                    <input
                      type="email"
                      value={formData.fromEmail || ''}
                      onChange={(e) => setFormData({ ...formData, fromEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="noreply@zyratech.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Name
                    </label>
                    <input
                      type="text"
                      value={formData.fromName || ''}
                      onChange={(e) => setFormData({ ...formData, fromName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      placeholder="ZyraTech Hub"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleSave('email')}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save size={20} />
                  {saving ? 'Saving...' : 'Save Email Settings'}
                </button>
              </div>
            )}

            {/* General Settings Tab */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.maintenanceMode || false}
                      onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Maintenance Mode</span>
                  </label>
                  <p className="text-sm text-gray-500 mt-1 ml-6">
                    Display a maintenance message to visitors
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.allowRegistration || true}
                      onChange={(e) => setFormData({ ...formData, allowRegistration: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Allow Public Registration</span>
                  </label>
                  <p className="text-sm text-gray-500 mt-1 ml-6">
                    Allow users to register for courses
                  </p>
                </div>

                <button
                  onClick={() => handleSave('general')}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save size={20} />
                  {saving ? 'Saving...' : 'Save General Settings'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
