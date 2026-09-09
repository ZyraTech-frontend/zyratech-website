/**
 * Administrator Form Page (Add/Edit) - Multi-Step Wizard
 * Dedicated page for creating or editing administrator accounts
 * Follows the same pattern as JobFormPage / CourseFormPage
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import { createUser, updateUser } from '../../../store/slices/usersSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { ROLE_LABELS } from '../../../utils/constants';
import {
  ChevronLeft,
  ChevronRight,
  Save,
  X,
  User,
  Mail,
  Phone,
  Shield,
  ShieldCheck,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Check,
  KeyRound,
  UserCog,
  IdCard
} from 'lucide-react';

// Department options — aligned with admin sidebar sections
const DEPARTMENTS = [
  { value: 'Training Courses', section: 'Content' },
  { value: 'Blog Articles', section: 'Content' },
  { value: 'Job Listings', section: 'Content' },
  { value: 'Gallery', section: 'Content' },
  { value: 'Projects', section: 'Content' },
  { value: 'FAQ', section: 'Content' },
  { value: 'Testimonials', section: 'Content' },
  { value: 'Team Members', section: 'Content' },
  { value: 'Payments', section: 'Business' },
  { value: 'Enrollments', section: 'Business' },
  { value: 'Messages', section: 'Business' },
  { value: 'Partnerships', section: 'Business' },
  { value: 'Contact Inquiries', section: 'Business' },
  { value: 'Impact Stories', section: 'Business' },
  { value: 'Newsletter', section: 'Business' }
];

// Group departments by section for display
const DEPARTMENT_SECTIONS = [
  { label: 'Content Management', departments: DEPARTMENTS.filter(d => d.section === 'Content') },
  { label: 'Business Operations', departments: DEPARTMENTS.filter(d => d.section === 'Business') }
];

// Mapping of department to its default backend permissions
export const DEPARTMENT_PERMISSIONS_MAP = {
  'Training Courses': ['training_courses', 'enrollments'],
  'Blog Articles': ['blog_articles'],
  'Job Listings': ['job_listings'],
  'Gallery': ['gallery'],
  'Projects': ['projects'],
  'FAQ': ['faq'],
  'Testimonials': ['testimonials'],
  'Team Members': ['about_page', 'about_section'],
  'Payments': ['payments'],
  'Enrollments': ['enrollments', 'training_courses'],
  'Messages': ['messages'],
  'Partnerships': ['partnership_requests', 'partnership_content'],
  'Contact Inquiries': ['contact_inquiries'],
  'Impact Stories': ['impact_stories'],
  'Newsletter': ['newsletter']
};

export const AVAILABLE_PERMISSIONS = [
  // Content Management
  { id: 'training_courses', label: 'Training Courses', section: 'Content' },
  { id: 'blog_articles', label: 'Blog Articles', section: 'Content' },
  { id: 'job_listings', label: 'Job Listings', section: 'Content' },
  { id: 'gallery', label: 'Gallery Albums', section: 'Content' },
  { id: 'projects', label: 'Projects & Case Studies', section: 'Content' },
  { id: 'faq', label: 'FAQ', section: 'Content' },
  { id: 'testimonials', label: 'Testimonials', section: 'Content' },
  { id: 'hero_slides', label: 'Hero Slides', section: 'Content' },
  { id: 'services', label: 'Services', section: 'Content' },
  { id: 'benefits', label: 'Why Choose Us', section: 'Content' },
  { id: 'about_section', label: 'About Section', section: 'Content' },
  { id: 'about_page', label: 'About Page', section: 'Content' },
  { id: 'work_with_us', label: 'Work With Us', section: 'Content' },
  { id: 'quality_assurance', label: 'Quality Assurance', section: 'Content' },
  { id: 'partnership_content', label: 'Partnership Content', section: 'Content' },

  // Business Operations
  { id: 'enrollments', label: 'Enrollments', section: 'Business' },
  { id: 'payments', label: 'Payments & Revenue', section: 'Business' },
  { id: 'messages', label: 'Messages', section: 'Business' },
  { id: 'partnership_requests', label: 'Partnership Requests', section: 'Business' },
  { id: 'contact_inquiries', label: 'Contact Inquiries', section: 'Business' },
  { id: 'impact_stories', label: 'Impact Stories', section: 'Business' },
  { id: 'newsletter', label: 'Newsletter Subscribers', section: 'Business' }
];

// Step definitions
const STEPS = [
  { key: 'personal', title: 'Personal Info', icon: User },
  { key: 'department', title: 'Department & Access', icon: Shield },
  { key: 'security', title: 'Security', icon: KeyRound },
  { key: 'review', title: 'Review & Confirm', icon: Check }
];

// Generate a temporary password
const generateTempPassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const AdministratorFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEditing = Boolean(id);
  const { items: administrators } = useSelector((state) => state.users);
  const existingAdmin = isEditing ? administrators.find(a => a.id === id) : null;

  // Step state
  const [currentStep, setCurrentStep] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'admin',
    department: '',
    permissions: [],
    tempPassword: generateTempPassword()
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  // Load existing admin data for editing
  useEffect(() => {
    if (isEditing && existingAdmin) {
      setFormData({
        name: existingAdmin.name || '',
        email: existingAdmin.email || '',
        phone: existingAdmin.phone || '',
        role: existingAdmin.role || 'admin',
        department: existingAdmin.department || '',
        permissions: Array.isArray(existingAdmin.permissions) ? existingAdmin.permissions : [],
        tempPassword: '' // Not relevant when editing
      });
    }
  }, [isEditing, existingAdmin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const togglePermission = (permId) => {
    setFormData(prev => {
      const exists = prev.permissions.includes(permId);
      const updated = exists
        ? prev.permissions.filter(p => p !== permId)
        : [...prev.permissions, permId];
      return { ...prev, permissions: updated };
    });
    if (errors.permissions) {
      setErrors(prev => ({ ...prev, permissions: undefined }));
    }
  };

  const selectAllPermissions = () => {
    setFormData(prev => ({
      ...prev,
      permissions: AVAILABLE_PERMISSIONS.map(p => p.id)
    }));
    if (errors.permissions) {
      setErrors(prev => ({ ...prev, permissions: undefined }));
    }
  };

  const resetToDepartmentDefaults = () => {
    const defaultPerms = DEPARTMENT_PERMISSIONS_MAP[formData.department] || [];
    setFormData(prev => ({
      ...prev,
      permissions: [...defaultPerms]
    }));
    if (errors.permissions) {
      setErrors(prev => ({ ...prev, permissions: undefined }));
    }
  };

  const validateStep = (stepIndex) => {
    const newErrors = {};
    const stepKey = STEPS[stepIndex]?.key;

    if (stepKey === 'personal') {
      if (!formData.name.trim()) newErrors.name = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email address is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email address';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

      // Check duplicate email (only for new admins or if email changed)
      if (formData.email.trim()) {
        const duplicate = administrators.find(
          a => a.email?.toLowerCase() === formData.email.toLowerCase() && a.id !== id
        );
        if (duplicate) newErrors.email = 'An administrator with this email already exists';
      }
    }

    if (stepKey === 'department') {
      if (!formData.department) newErrors.department = 'Please assign a department';
      const effectivePerms = formData.permissions.length > 0
        ? formData.permissions
        : (DEPARTMENT_PERMISSIONS_MAP[formData.department] || []);
      if (effectivePerms.length === 0) {
        newErrors.permissions = 'At least one permission is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    // Validate all content steps
    for (let i = 0; i < STEPS.length - 1; i++) {
      if (!validateStep(i)) {
        setCurrentStep(i);
        return;
      }
    }

    setIsSaving(true);

    const activePermissions = formData.permissions && formData.permissions.length > 0
      ? formData.permissions
      : (DEPARTMENT_PERMISSIONS_MAP[formData.department] || [formData.department.toLowerCase().replace(/\s+/g, '_')]);

    try {
      if (isEditing) {
        const updatedData = {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          role: formData.role,
          department: formData.department.trim(),
          permissions: activePermissions
        };

        await dispatch(updateUser({ id, data: updatedData })).unwrap();
        dispatch(addNotification({
          type: 'success',
          message: `"${formData.name}" has been updated successfully.`
        }));
      } else {
        const newAdmin = {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          role: 'admin',
          department: formData.department.trim(),
          password: formData.tempPassword,
          temporaryPassword: formData.tempPassword,
          permissions: activePermissions,
          mustChangePassword: true
        };

        await dispatch(createUser(newAdmin)).unwrap();
        dispatch(addNotification({
          type: 'success',
          message: `Administrator account for "${formData.name}" created. Share the temporary password securely.`
        }));
      }

      setIsSaving(false);
      navigate('/admin/users');
    } catch (err) {
      setIsSaving(false);
      const errMsg = typeof err === 'string' ? err : (err?.message || 'Failed to save administrator');
      dispatch(addNotification({
        type: 'error',
        message: errMsg
      }));

      // If validation error, direct user to corresponding step
      if (errMsg.toLowerCase().includes('permission')) {
        setErrors(prev => ({ ...prev, permissions: errMsg }));
        setCurrentStep(1);
      } else if (errMsg.toLowerCase().includes('email')) {
        setErrors(prev => ({ ...prev, email: errMsg }));
        setCurrentStep(0);
      }
    }
  };

  const handleCancel = () => {
    if (formData.name || formData.email) {
      dispatch(openConfirmDialog({
        title: 'Discard Changes?',
        message: 'You have unsaved changes. Are you sure you want to leave?',
        isDangerous: true,
        confirmText: 'Discard',
        onConfirm: () => navigate('/admin/users')
      }));
    } else {
      navigate('/admin/users');
    }
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(formData.tempPassword);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
  };

  const handleRegeneratePassword = () => {
    setFormData(prev => ({ ...prev, tempPassword: generateTempPassword() }));
  };

  // If editing and admin not found
  if (isEditing && !existingAdmin) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <AlertCircle size={48} className="text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Administrator Not Found</h2>
          <p className="text-gray-500 mb-4">The administrator you&apos;re trying to edit doesn&apos;t exist.</p>
          <button
            onClick={() => navigate('/admin/users')}
            className="text-[#004fa2] hover:underline font-medium"
          >
            Return to Administrators
          </button>
        </div>
      </AdminLayout>
    );
  }

  // Render step content
  const renderStepContent = () => {
    const stepKey = STEPS[currentStep]?.key;

    switch (stepKey) {
      case 'personal':
        return (
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Kwame Asante"
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@zyratech.com"
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+233 XX XXX XXXX"
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>
        );

      case 'department':
        return (
          <div className="space-y-6">
            {/* Role info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <ShieldCheck size={20} className="text-[#004fa2] mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Role: Administrator</p>
                <p className="text-sm text-gray-600 mt-0.5">Full access to the admin panel. All accounts created here are administrators.</p>
              </div>
            </div>

            {/* Department selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Assigned Department <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500 mb-4">
                Select the section this administrator will primarily manage.
              </p>

              <div className="space-y-5">
                {DEPARTMENT_SECTIONS.map(section => (
                  <div key={section.label}>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{section.label}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {section.departments.map(dept => {
                        const isSelected = formData.department === dept.value;
                        return (
                          <button
                            key={dept.value}
                            type="button"
                            onClick={() => {
                              const defaultPerms = DEPARTMENT_PERMISSIONS_MAP[dept.value] || [dept.value.toLowerCase().replace(/\s+/g, '_')];
                              setFormData(prev => {
                                const currentPerms = prev.permissions.length > 0 ? prev.permissions : [];
                                const mergedPerms = Array.from(new Set([...currentPerms, ...defaultPerms]));
                                return {
                                  ...prev,
                                  department: dept.value,
                                  permissions: mergedPerms
                                };
                              });
                              if (errors.department) setErrors(prev => ({ ...prev, department: undefined }));
                              if (errors.permissions) setErrors(prev => ({ ...prev, permissions: undefined }));
                            }}
                            className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                              isSelected
                                ? 'border-[#004fa2] bg-[#004fa2]/5'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center ${
                              isSelected ? 'bg-[#004fa2] text-white' : 'bg-gray-100 text-gray-500'
                            }`}>
                              <Shield size={16} />
                            </div>
                            <p className={`text-sm font-medium ${isSelected ? 'text-[#004fa2]' : 'text-gray-700'}`}>{dept.value}</p>
                            {isSelected && (
                              <Check size={16} className="text-[#004fa2] ml-auto" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
            </div>

            {/* Permissions Granular Selection */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-900">
                    Module Permissions & Access Scope <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Select which modules this administrator can view and manage. At least 1 permission is required.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={selectAllPermissions}
                    className="text-xs px-2.5 py-1 bg-blue-50 text-[#004fa2] hover:bg-blue-100 rounded-lg font-medium transition-colors"
                  >
                    Select All
                  </button>
                  {formData.department && (
                    <button
                      type="button"
                      onClick={resetToDepartmentDefaults}
                      className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                    >
                      Department Defaults
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, permissions: [] }))}
                    className="text-xs px-2.5 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {errors.permissions && (
                <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errors.permissions}</span>
                </div>
              )}

              <div className="space-y-4 bg-gray-50/50 p-4 rounded-xl border border-gray-200/80">
                {/* Content Management Permissions */}
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Content Management Modules</p>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_PERMISSIONS.filter(p => p.section === 'Content').map(perm => {
                      const isChecked = formData.permissions.includes(perm.id);
                      return (
                        <button
                          key={perm.id}
                          type="button"
                          onClick={() => togglePermission(perm.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                            isChecked
                              ? 'bg-[#004fa2] text-white border-[#004fa2] shadow-sm shadow-[#004fa2]/20'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded flex items-center justify-center ${isChecked ? 'bg-white text-[#004fa2]' : 'border border-gray-300'}`}>
                            {isChecked && <Check size={10} strokeWidth={3} />}
                          </span>
                          {perm.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Business Operations Permissions */}
                <div className="pt-3 border-t border-gray-200/60">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Business Operations Modules</p>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_PERMISSIONS.filter(p => p.section === 'Business').map(perm => {
                      const isChecked = formData.permissions.includes(perm.id);
                      return (
                        <button
                          key={perm.id}
                          type="button"
                          onClick={() => togglePermission(perm.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                            isChecked
                              ? 'bg-[#004fa2] text-white border-[#004fa2] shadow-sm shadow-[#004fa2]/20'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded flex items-center justify-center ${isChecked ? 'bg-white text-[#004fa2]' : 'border border-gray-300'}`}>
                            {isChecked && <Check size={10} strokeWidth={3} />}
                          </span>
                          {perm.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>Selected: <strong className="text-gray-900">{formData.permissions.length}</strong> modules</span>
                  {formData.permissions.length === 0 && (
                    <span className="text-amber-600 font-semibold">⚠️ At least 1 permission required</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            {isEditing ? (
              // Edit mode — no password section
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <KeyRound size={22} className="text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Password Management</h3>
                    <p className="text-sm text-blue-700">
                      The administrator manages their own password. If they need a password reset,
                      they can request one through the login page, or you can reset it from the
                      administrators list.
                    </p>
                    {existingAdmin?.mustChangePassword && (
                      <div className="mt-3 flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                        <AlertTriangle size={14} className="shrink-0" />
                        <span className="text-sm font-medium">This administrator has not changed their temporary password yet.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Create mode — temp password
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temporary Password
                  </label>
                  <p className="text-sm text-gray-500 mb-4">
                    A temporary password has been generated. The administrator will be required to change it on their first login.
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="relative flex-1">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.tempPassword}
                          readOnly
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-mono pr-12 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} className="text-gray-400" /> : <Eye size={16} className="text-gray-400" />}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyPassword}
                        className={`p-3 rounded-xl transition-all ${
                          copiedPassword
                            ? 'bg-green-100 text-green-600 border border-green-200'
                            : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                        }`}
                        title="Copy password"
                      >
                        {copiedPassword ? <CheckCircle size={18} /> : <Copy size={18} />}
                      </button>
                      <button
                        type="button"
                        onClick={handleRegeneratePassword}
                        className="p-3 rounded-xl bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all"
                        title="Generate new password"
                      >
                        <RefreshCw size={18} />
                      </button>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                      <div className="text-sm text-amber-700">
                        <p className="font-semibold mb-1">Important</p>
                        <ul className="space-y-1 text-xs">
                          <li>Share this password securely with the administrator (in person or encrypted channel).</li>
                          <li>The password will only be shown once — make sure to copy it before proceeding.</li>
                          <li>The administrator must change this password on their first login.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* KYC Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <IdCard size={20} className="text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">KYC Verification</h3>
                      <p className="text-sm text-blue-700">
                        After account creation, the administrator will need to submit their KYC documents (government ID, proof of address) for verification.
                        You can review and approve their KYC from the administrators list.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-[#004fa2]/5 to-[#0066cc]/5 rounded-xl p-6 border border-[#004fa2]/10">
              <h3 className="font-bold text-gray-900 text-lg mb-6">
                {isEditing ? 'Review Changes' : 'Review New Administrator'}
              </h3>

              {/* Personal Info */}
              <div className="mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
                  <User size={14} /> Personal Information
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Full Name</p>
                    <p className="font-semibold text-gray-900">{formData.name || '—'}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Email Address</p>
                    <p className="font-semibold text-gray-900">{formData.email || '—'}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                    <p className="font-semibold text-gray-900">{formData.phone || '—'}</p>
                  </div>
                </div>
              </div>

              {/* Role & Department */}
              <div className="mb-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
                  <Shield size={14} /> Department & Access Scope
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Role</p>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#004fa2]" />
                      <p className="font-semibold text-gray-900">Administrator</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Primary Department</p>
                    <p className="font-semibold text-gray-900">{formData.department || 'Not assigned'}</p>
                  </div>
                </div>

                {/* Granted Permissions Badges */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-500 font-medium">Assigned Module Permissions</p>
                    <span className="text-xs font-bold text-[#004fa2]">{formData.permissions.length} module(s)</span>
                  </div>
                  {formData.permissions.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {formData.permissions.map(permId => {
                        const perm = AVAILABLE_PERMISSIONS.find(p => p.id === permId);
                        return (
                          <span key={permId} className="px-2.5 py-1 bg-blue-50 text-[#004fa2] rounded-md text-xs font-medium border border-blue-100 flex items-center gap-1">
                            <Check size={12} />
                            {perm?.label || permId}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-amber-600 font-medium">⚠️ No permissions selected (At least 1 required)</p>
                  )}
                </div>
              </div>

              {/* Security */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
                  <KeyRound size={14} /> Security
                </p>
                {isEditing ? (
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600">Password settings remain unchanged. The administrator manages their own password.</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      <p className="text-sm text-gray-700">Temporary password generated</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      <p className="text-sm text-gray-700">Must change password on first login</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      <p className="text-sm text-gray-700">KYC verification required after signup</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Final Warning */}
            {!isEditing && (
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertTriangle size={18} className="text-amber-600 mt-0.5 shrink-0" />
                <p className="text-sm text-amber-700">
                  Make sure you have copied the temporary password before saving. It will not be shown again after you leave this page.
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const currentStepData = STEPS[currentStep];
  const StepIcon = currentStepData?.icon || User;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Edit Administrator' : 'Create Administrator'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {isEditing ? `Editing: ${existingAdmin?.name}` : 'Set up a new administrator account'}
              </p>
            </div>
          </div>

          <button
            onClick={handleCancel}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            <X size={18} />
            Cancel
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between overflow-x-auto pb-2">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === currentStep;
              const isCompleted = idx < currentStep;

              return (
                <div key={step.key} className="flex items-center">
                  <button
                    onClick={() => {
                      if (isCompleted) setCurrentStep(idx);
                    }}
                    disabled={!isCompleted && !isActive}
                    className={`flex flex-col items-center gap-1 min-w-[80px] ${isCompleted ? 'cursor-pointer' : ''}`}
                  >
                    <div
                      className={`w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-[#004fa2] text-white'
                          : isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                    </div>
                    <span
                      className={`text-xs font-medium whitespace-nowrap ${
                        isActive ? 'text-[#004fa2]' : isCompleted ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>

                  {idx < STEPS.length - 1 && (
                    <div
                      className={`w-8 h-0.5 mx-1 ${idx < currentStep ? 'bg-green-500' : 'bg-gray-200'}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
              <StepIcon className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{currentStepData?.title}</h2>
              <p className="text-sm text-gray-500">Step {currentStep + 1} of {STEPS.length}</p>
            </div>
          </div>

          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          {currentStep === STEPS.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d80] hover:to-[#004fa2] transition-all font-medium shadow-md disabled:opacity-50"
            >
              <Save size={18} />
              {isSaving ? 'Saving...' : (isEditing ? 'Update Administrator' : 'Create Administrator')}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d80] hover:to-[#004fa2] transition-all font-medium shadow-md"
            >
              Next
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdministratorFormPage;
