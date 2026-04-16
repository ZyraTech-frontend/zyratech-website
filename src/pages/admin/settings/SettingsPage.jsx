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
  Search,
  Settings
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
      <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto pb-8">
        {/* Modern Header - High Density Desktop, Compact Mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#004fa2]/5 to-[#0066cc]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-3 sm:gap-4 relative z-10 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center shadow-md shrink-0">
              <Settings className="text-white" size={20} />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight truncate">System Settings</h1>
              <p className="text-[11px] sm:text-sm text-gray-500 font-medium truncate mt-0.5">Manage site-wide configuration and preferences</p>
            </div>
          </div>
        </div>

        {/* Dynamic Layout Wrapper */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Settings Navigation */}
          <div className="w-full lg:w-64 xl:w-72 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:sticky lg:top-24">
              <div className="p-4 sm:p-5 border-b border-gray-50 bg-gray-50/50">
                <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center lg:text-left">Configuration Menu</h2>
              </div>
              <div className="p-2 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-semibold text-[13px] sm:text-sm transition-all whitespace-nowrap lg:whitespace-normal shrink-0 group ${
                      activeTab === tab.id
                        ? 'bg-blue-50/80 text-[#004fa2] shadow-sm ring-1 ring-[#004fa2]/10'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-white shadow-sm text-[#004fa2]' : 'bg-transparent text-gray-400 group-hover:bg-white group-hover:shadow-sm group-hover:text-gray-600'}`}>
                        <tab.icon size={18} />
                    </div>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="flex-1 w-full min-w-0 space-y-6">
            {/* Branding Tab */}
            {activeTab === 'branding' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Site Identity Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[#004fa2]">
                        <Globe size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-900">Site Identity</h3>
                        <p className="text-[11px] text-gray-500 font-medium tracking-wide mt-0.5">Primary brand details displayed across the platform</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Site Name</label>
                        <input
                          type="text"
                          value={formData.siteName || ''}
                          onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                          placeholder="ZyraTech Hub"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Site Tagline</label>
                        <input
                          type="text"
                          value={formData.siteDescription || ''}
                          onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                          placeholder="Empowering youth through technology"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Theme Colors Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <Palette size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-900">Theme Colors</h3>
                        <p className="text-[11px] text-gray-500 font-medium tracking-wide mt-0.5">Control the primary and accent colors used directly in UI components</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Primary Color (Hex)</label>
                        <div className="flex bg-gray-50/50 hover:bg-white focus-within:bg-white border border-gray-200 rounded-xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#004fa2]/20 focus-within:border-[#004fa2]">
                          <div className="w-16 border-r border-gray-200 bg-white p-1">
                              <input
                                type="color"
                                value={formData.primaryColor || '#004fa2'}
                                onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                                className="w-full h-full rounded-lg cursor-pointer border-0 p-0 block"
                              />
                          </div>
                          <input
                            type="text"
                            value={formData.primaryColor || '#004fa2'}
                            onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                            className="flex-1 px-4 py-3 outline-none text-sm font-mono text-gray-700 uppercase bg-transparent"
                            placeholder="#004fa2"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Secondary Color (Hex)</label>
                        <div className="flex bg-gray-50/50 hover:bg-white focus-within:bg-white border border-gray-200 rounded-xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500">
                           <div className="w-16 border-r border-gray-200 bg-white p-1">
                              <input
                                type="color"
                                value={formData.secondaryColor || '#ff6b35'}
                                onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                                className="w-full h-full rounded-lg cursor-pointer border-0 p-0 block"
                              />
                          </div>
                          <input
                            type="text"
                            value={formData.secondaryColor || '#ff6b35'}
                            onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                            className="flex-1 px-4 py-3 outline-none text-sm font-mono text-gray-700 uppercase bg-transparent"
                            placeholder="#FF6B35"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Media Assets Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <Upload size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-900">Media Assets</h3>
                        <p className="text-[11px] text-gray-500 font-medium tracking-wide mt-0.5">Upload logos and icons for branding</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {['Logo (Light Mode)', 'Logo (Dark Mode)', 'Favicon'].map((label, i) => (
                          <div key={i} className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">{label}</label>
                            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-200 hover:border-[#004fa2]/50 bg-gray-50 hover:bg-[#004fa2]/5 transition-all rounded-xl cursor-pointer group">
                              <Upload className="h-6 w-6 text-gray-400 group-hover:text-[#004fa2] mb-2 transition-colors" />
                              <span className="text-[11px] font-semibold text-gray-500 group-hover:text-[#004fa2] transition-colors">Select Image</span>
                              <input type="file" className="hidden" accept="image/*" />
                            </label>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleSave('branding')}
                      disabled={saving}
                      className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all font-bold text-sm disabled:opacity-50"
                    >
                      <Save size={18} />
                      {saving ? 'Saving Changes...' : 'Save Branding Identity'}
                    </button>
                </div>
              </div>
            )}

            {/* Contact Info Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Primary Contact Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[#004fa2]">
                        <Phone size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-900">Primary Contact</h3>
                        <p className="text-[11px] text-gray-500 font-medium tracking-wide mt-0.5">Main communication channels for the public</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Contact Email</label>
                        <input
                          type="email"
                          value={formData.contactEmail || ''}
                          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all"
                          placeholder="info@zyratechhub.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Contact Phone</label>
                        <input
                          type="tel"
                          value={formData.contactPhone || ''}
                          onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all"
                          placeholder="+233 55 955 4261"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">WhatsApp Number</label>
                        <input
                          type="text"
                          value={formData.contactWhatsApp || ''}
                          onChange={(e) => setFormData({ ...formData, contactWhatsApp: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all"
                          placeholder="233559554261"
                        />
                        <p className="text-[10px] text-gray-500 font-medium">Without + or spaces (e.g., 233559554261)</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Business Address</label>
                        <input
                          type="text"
                          value={formData.contactAddress || ''}
                          onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all"
                          placeholder="Koforidua, Eastern Region, Ghana"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* HR Contact Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                        <Mail size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-900">HR Contact</h3>
                        <p className="text-[11px] text-gray-500 font-medium tracking-wide mt-0.5">Used for training and career pages</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">HR Name</label>
                        <input
                          type="text"
                          value={formData.hrName || ''}
                          onChange={(e) => setFormData({ ...formData, hrName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all"
                          placeholder="Magdalene"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">HR Email</label>
                        <input
                          type="email"
                          value={formData.hrEmail || ''}
                          onChange={(e) => setFormData({ ...formData, hrEmail: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all"
                          placeholder="magdalene@zyratech.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">HR Title</label>
                        <input
                          type="text"
                          value={formData.hrTitle || ''}
                          onChange={(e) => setFormData({ ...formData, hrTitle: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all"
                          placeholder="HR Coordinator"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600">
                        <Shield size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-900">Business Hours</h3>
                        <p className="text-[11px] text-gray-500 font-medium tracking-wide mt-0.5">Operating hours displayed on the site</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Weekday Hours</label>
                        <input
                          type="text"
                          value={formData.businessHoursWeekday || ''}
                          onChange={(e) => setFormData({ ...formData, businessHoursWeekday: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all"
                          placeholder="8:00 AM - 5:00 PM"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Weekend Hours</label>
                        <input
                          type="text"
                          value={formData.businessHoursWeekend || ''}
                          onChange={(e) => setFormData({ ...formData, businessHoursWeekend: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all"
                          placeholder="Closed"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleSave('contact')}
                      disabled={saving}
                      className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all font-bold text-sm disabled:opacity-50"
                    >
                      <Save size={18} />
                      {saving ? 'Saving Changes...' : 'Save Contact Info'}
                    </button>
                </div>
              </div>
            )}

            {/* Social Media Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600">
                            <Share2 size={16} />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-gray-900">Social Connections</h3>
                            <p className="text-[11px] text-gray-500 font-medium tracking-wide mt-0.5">Links for footer and contact pages. Leave empty to hide.</p>
                        </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">LinkedIn URL</label>
                        <input
                          type="url"
                          value={formData.socialLinkedIn || ''}
                          onChange={(e) => setFormData({ ...formData, socialLinkedIn: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                          placeholder="https://www.linkedin.com/company/zyratechhub"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">X (Twitter) URL</label>
                        <input
                          type="url"
                          value={formData.socialTwitter || ''}
                          onChange={(e) => setFormData({ ...formData, socialTwitter: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                          placeholder="https://x.com/zyratechhub"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Instagram URL</label>
                        <input
                          type="url"
                          value={formData.socialInstagram || ''}
                          onChange={(e) => setFormData({ ...formData, socialInstagram: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                          placeholder="https://www.instagram.com/zyratechhub"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Facebook URL</label>
                        <input
                          type="url"
                          value={formData.socialFacebook || ''}
                          onChange={(e) => setFormData({ ...formData, socialFacebook: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                          placeholder="https://www.facebook.com/zyratechhub"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">YouTube URL</label>
                      <input
                        type="url"
                        value={formData.socialYouTube || ''}
                        onChange={(e) => setFormData({ ...formData, socialYouTube: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                        placeholder="https://www.youtube.com/@zyratechhub"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleSave('social')}
                      disabled={saving}
                      className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all font-bold text-sm disabled:opacity-50"
                    >
                      <Save size={18} />
                      {saving ? 'Saving Changes...' : 'Save Social Links'}
                    </button>
                </div>
              </div>
            )}

            {/* Analytics & SEO Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Analytics Tracking Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                        <BarChart3 size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-900">Analytics Tracking</h3>
                        <p className="text-[11px] text-gray-500 font-medium tracking-wide mt-0.5">Configure tracking IDs for visitor analytics</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Google Analytics ID</label>
                        <input
                          type="text"
                          value={formData.googleAnalyticsId || ''}
                          onChange={(e) => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm font-mono text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                          placeholder="G-XXXXXXXXXX"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Meta Pixel ID</label>
                        <input
                          type="text"
                          value={formData.metaPixelId || ''}
                          onChange={(e) => setFormData({ ...formData, metaPixelId: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm font-mono text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                          placeholder="1234567890"
                        />
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-50">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
                            <input
                            type="checkbox"
                            checked={formData.enableVisitorTracking || false}
                            onChange={(e) => setFormData({ ...formData, enableVisitorTracking: e.target.checked })}
                            className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[#004fa2] checked:border-[#004fa2] transition-colors peer cursor-pointer"
                            />
                            <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 14 10" fill="none">
                                <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <span className="text-sm font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors">Enable Internal Tracking</span>
                            <p className="text-[11px] text-gray-500 mt-0.5">Collect anonymous usage data to improve user experience directly on the dashboard</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* SEO Settings Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <Search size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-900">SEO Settings</h3>
                        <p className="text-[11px] text-gray-500 font-medium tracking-wide mt-0.5">Optimize search engine visibility</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Primary Site URL</label>
                        <input
                            type="url"
                            value={formData.siteUrl || ''}
                            onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                            placeholder="https://zyratechhub.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Default Meta Title</label>
                        <input
                            type="text"
                            value={formData.seoTitle || ''}
                            onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                            placeholder="ZyraTech Hub | Empowering Youth Through Technology"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Default Meta Description</label>
                        <textarea
                            value={formData.seoDescription || ''}
                            onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400 resize-none"
                            placeholder="Ghana's premier technology education and innovation center..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Default Keywords</label>
                        <input
                            type="text"
                            value={formData.seoKeywords || ''}
                            onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                            placeholder="tech training Ghana, digital skills, software development"
                        />
                        <p className="text-[10px] text-gray-500 font-medium">Comma-separated key terms</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleSave('analytics')}
                      disabled={saving}
                      className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all font-bold text-sm disabled:opacity-50"
                    >
                      <Save size={18} />
                      {saving ? 'Saving Changes...' : 'Save Analytics & SEO'}
                    </button>
                </div>
              </div>
            )}

            {/* Payment Settings Tab */}
            {activeTab === 'payments' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-amber-50/80 border border-amber-200/50 rounded-2xl p-5 flex gap-4">
                  <div className="mt-0.5"><Shield className="text-amber-500" size={20} /></div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-900">Security Warning</h4>
                    <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                        API keys grant full access to your payment gateways. Keep these keys secure and never share them publicly. Changes here apply immediately to live checkouts.
                    </p>
                  </div>
                </div>

                {/* Gateway Cards Container */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Paystack Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                        <div className="px-6 py-5 border-b border-gray-50 bg-[#0BA4DB]/5 flex items-center justify-between">
                            <h3 className="text-base font-bold text-[#0BA4DB]">Paystack Integration</h3>
                            <div className="px-2 py-1 bg-[#0BA4DB]/10 text-[#0BA4DB] rounded text-[10px] font-bold uppercase tracking-wider">Active</div>
                        </div>
                        <div className="p-6 space-y-5 flex-1">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Public Key</label>
                                <input
                                    type="text"
                                    value={formData.paystackPublicKey || ''}
                                    onChange={(e) => setFormData({ ...formData, paystackPublicKey: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm font-mono text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                                    placeholder="pk_live_..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Secret Key</label>
                                <input
                                    type="password"
                                    value={formData.paystackSecretKey || ''}
                                    onChange={(e) => setFormData({ ...formData, paystackSecretKey: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm font-mono text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400 tracking-[0.2em]"
                                    placeholder="sk_live_..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stripe Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                        <div className="px-6 py-5 border-b border-gray-50 bg-[#635BFF]/5 flex items-center justify-between">
                            <h3 className="text-base font-bold text-[#635BFF]">Stripe Integration</h3>
                            <div className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-[10px] font-bold uppercase tracking-wider">Inactive</div>
                        </div>
                        <div className="p-6 space-y-5 flex-1">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Public Key</label>
                                <input
                                    type="text"
                                    value={formData.stripePublicKey || ''}
                                    onChange={(e) => setFormData({ ...formData, stripePublicKey: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] text-sm font-mono text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                                    placeholder="pk_live_..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Secret Key</label>
                                <input
                                    type="password"
                                    value={formData.stripeSecretKey || ''}
                                    onChange={(e) => setFormData({ ...formData, stripeSecretKey: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] text-sm font-mono text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400 tracking-[0.2em]"
                                    placeholder="sk_live_..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Base Currency */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">Store Base Currency</h3>
                            <p className="text-[11px] text-gray-500 mt-1">Default currency for all transactions</p>
                        </div>
                        <select
                            value={formData.currency || 'GHS'}
                            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                            className="w-full sm:w-64 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm font-bold text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all"
                        >
                            <option value="GHS">GHS - Ghanaian Cedi</option>
                            <option value="USD">USD - US Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British Pound</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleSave('payments')}
                      disabled={saving}
                      className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all font-bold text-sm disabled:opacity-50"
                    >
                      <Save size={18} />
                      {saving ? 'Saving Changes...' : 'Save Payment Settings'}
                    </button>
                </div>
              </div>
            )}

            {/* Email Settings Tab */}
            {activeTab === 'email' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <Mail size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-900">SMTP Configuration</h3>
                        <p className="text-[11px] text-gray-500 font-medium tracking-wide mt-0.5">Settings for outgoing system emails</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">SMTP Host</label>
                        <input
                          type="text"
                          value={formData.smtpHost || ''}
                          onChange={(e) => setFormData({ ...formData, smtpHost: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                          placeholder="smtp.gmail.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">SMTP Port</label>
                        <input
                          type="number"
                          value={formData.smtpPort || '587'}
                          onChange={(e) => setFormData({ ...formData, smtpPort: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                          placeholder="587"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">SMTP Username</label>
                        <input
                          type="text"
                          value={formData.smtpUser || ''}
                          onChange={(e) => setFormData({ ...formData, smtpUser: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                          placeholder="your-email@gmail.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">SMTP Password</label>
                        <input
                          type="password"
                          value={formData.smtpPassword || ''}
                          onChange={(e) => setFormData({ ...formData, smtpPassword: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-50">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">From Email</label>
                        <input
                          type="email"
                          value={formData.fromEmail || ''}
                          onChange={(e) => setFormData({ ...formData, fromEmail: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm text-gray-900 bg-gray-50/50 hover:bg-white focus:bg-white transition-all placeholder:text-gray-400"
                          placeholder="noreply@zyratech.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">From Name</label>
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

                <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleSave('email')}
                      disabled={saving}
                      className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all font-bold text-sm disabled:opacity-50"
                    >
                      <Save size={18} />
                      {saving ? 'Saving Changes...' : 'Save Email Settings'}
                    </button>
                </div>
              </div>
            )}

            {/* General Settings Tab */}
            {activeTab === 'general' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-gray-700">
                        <Settings size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-900">System Preferences</h3>
                        <p className="text-[11px] text-gray-500 font-medium tracking-wide mt-0.5">Global behavior and toggle switches</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100/50 transition-colors cursor-pointer" onClick={() => setFormData({ ...formData, maintenanceMode: !formData.maintenanceMode })}>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">Maintenance Mode</h4>
                        <p className="text-xs text-gray-500 mt-1">Display a maintenance message to public visitors while allowing admin access.</p>
                      </div>
                      <div className="relative">
                        <input
                            type="checkbox"
                            checked={formData.maintenanceMode || false}
                            onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#004fa2]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004fa2]"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100/50 transition-colors cursor-pointer" onClick={() => setFormData({ ...formData, allowRegistration: !formData.allowRegistration })}>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">Allow Public Registration</h4>
                        <p className="text-xs text-gray-500 mt-1">Allow new users to create accounts and register for courses.</p>
                      </div>
                      <div className="relative">
                        <input
                            type="checkbox"
                            checked={formData.allowRegistration !== false}
                            onChange={(e) => setFormData({ ...formData, allowRegistration: e.target.checked })}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#004fa2]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004fa2]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button
                      onClick={() => handleSave('general')}
                      disabled={saving}
                      className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl shadow-md hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all font-bold text-sm disabled:opacity-50"
                    >
                      <Save size={18} />
                      {saving ? 'Saving...' : 'Save General Settings'}
                    </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
