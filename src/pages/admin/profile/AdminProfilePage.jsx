/**
 * Admin Profile Page
 * Professional interface for managing admin profile, security settings, and preferences.
 * Connected directly to live ZyraTech API and Redux auth store.
 */

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { useAuth } from '../../../hooks/useAuth';
import { updateUserProfile, changePassword, verifySession, uploadUserAvatar } from '../../../store/slices/authSlice';
import authService from '../../../services/authService';
import activityLogService from '../../../services/activityLogService';
import { normalizeAvatarUrl } from '../../../utils/avatar';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Shield,
    Key,
    Lock,
    Bell,
    Monitor,
    Smartphone,
    Camera,
    Save,
    Edit,
    CheckCircle,
    AlertCircle,
    Briefcase,
    Calendar,
    Clock,
    Activity,
    Loader2
} from 'lucide-react';

const AdminProfilePage = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();

    // Tab & Edit state
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('Profile updated successfully!');
    const [errorMessage, setErrorMessage] = useState('');
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const [imageError, setImageError] = useState(false);

    // User profile state
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        name: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        location: '',
        avatar: null,
        bio: '',
        joinedDate: '',
        lastLogin: '',
        accountStatus: 'active',
        twoFactorEnabled: false
    });

    // Password change state
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Notification settings
    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        browserPush: true,
        newsletters: false,
        securityAlerts: true,
        newEnrollments: true,
        paymentConfirmations: true,
        reportSummaries: false
    });

    // Fetch fresh session on mount
    useEffect(() => {
        dispatch(verifySession());
    }, [dispatch]);

    // Sync state with live user data from Redux / API
    useEffect(() => {
        if (user) {
            const firstName = user.firstName || (user.name ? user.name.split(' ')[0] : '') || '';
            const lastName = user.lastName || (user.name ? user.name.split(' ').slice(1).join(' ') : '') || '';
            const displayName = (firstName && lastName)
                ? `${firstName} ${lastName}`.trim()
                : (user.name || `${firstName} ${lastName}`.trim());
            const formattedRole = user.role === 'super_admin' ? 'Super Admin'
                : user.role === 'admin' ? 'Administrator'
                : (user.role || 'Admin');

            const savedAvatar = normalizeAvatarUrl(localStorage.getItem('admin_avatar'));
            setImageError(false);

            setUserData(prev => {
                const resolvedAvatar = normalizeAvatarUrl(user.avatar) || savedAvatar || normalizeAvatarUrl(prev.avatar) || null;
                return {
                    ...prev,
                    firstName,
                    lastName,
                    name: displayName,
                    email: user.email || '',
                    phone: user.phone || '',
                    role: formattedRole,
                    department: user.department || 'Software Engineering',
                    location: user.location || 'Ghana',
                    avatar: resolvedAvatar,
                    bio: user.bio || '',
                    joinedDate: user.createdAt || user.joinedDate || '',
                    lastLogin: user.lastLogin || '',
                    accountStatus: user.accountStatus || 'active',
                    twoFactorEnabled: !!user.twoFactorEnabled
                };
            });

            if (user.notificationPreferences && typeof user.notificationPreferences === 'object') {
                setNotifications(prev => ({
                    ...prev,
                    ...user.notificationPreferences
                }));
            }
        }
    }, [user]);

    // Handle avatar upload via official POST /api/auth/profile/avatar endpoint
    const handleAvatarUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation per backend doc: JPG, PNG, WebP only, max 10MB
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type.toLowerCase())) {
            setErrorMessage('Please select a valid image file (JPG, PNG, or WebP).');
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }

        const MAX_SIZE = 10 * 1024 * 1024; // 10MB
        if (file.size > MAX_SIZE) {
            setErrorMessage('Image size exceeds 10MB limit. Please choose a smaller image.');
            setTimeout(() => setErrorMessage(''), 5000);
            return;
        }

        setIsUploadingAvatar(true);
        setErrorMessage('');
        setShowSuccess(false);

        // Instant local preview for immediate visual feedback
        const localPreviewUrl = URL.createObjectURL(file);
        const previousAvatar = userData.avatar;
        setUserData(prev => ({ ...prev, avatar: localPreviewUrl }));

        try {
            const actionResult = await dispatch(uploadUserAvatar(file)).unwrap();
            const rawPersistentAvatarUrl =
                actionResult?.avatar ||
                actionResult?.user?.avatar ||
                actionResult?.user?.avatarUrl ||
                actionResult?.url ||
                actionResult?.avatarUrl ||
                actionResult?.imageUrl;

            const persistentAvatarUrl = normalizeAvatarUrl(rawPersistentAvatarUrl);

            if (persistentAvatarUrl) {
                setUserData(prev => ({
                    ...prev,
                    avatar: persistentAvatarUrl
                }));
                setImageError(false);
            }

            setSuccessMessage('Avatar uploaded successfully!');
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 4000);
        } catch (err) {
            console.error('Avatar upload failed:', err);
            // Revert preview on failure
            setUserData(prev => ({ ...prev, avatar: previousAvatar }));
            const msg = typeof err === 'string' ? err : err?.message || 'Failed to upload avatar. Please try again.';
            setErrorMessage(msg);
            setTimeout(() => setErrorMessage(''), 6000);
        } finally {
            setIsUploadingAvatar(false);
            if (e.target) {
                e.target.value = '';
            }
        }
    };

    // Handle profile text inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => {
            const next = {
                ...prev,
                [name]: value
            };
            if (name === 'firstName' || name === 'lastName') {
                const fn = name === 'firstName' ? value : prev.firstName;
                const ln = name === 'lastName' ? value : prev.lastName;
                next.name = `${fn || ''} ${ln || ''}`.trim();
            }
            return next;
        });
    };

    // Handle save profile changes with automatic name sync
    const handleSave = async () => {
        setIsSaving(true);
        setErrorMessage('');
        setShowSuccess(false);

        try {
            const fn = userData.firstName.trim();
            const ln = userData.lastName.trim();
            const currentAvatar = normalizeAvatarUrl(userData.avatar) || normalizeAvatarUrl(localStorage.getItem('admin_avatar')) || null;

            const payload = {
                firstName: fn,
                lastName: ln,
                phone: userData.phone.trim(),
                department: userData.department.trim(),
                location: userData.location.trim(),
                bio: userData.bio.trim()
            };

            // Only pass avatar if it's a valid remote URL (never blob or base64)
            if (currentAvatar && /^https?:\/\//i.test(currentAvatar)) {
                payload.avatar = currentAvatar;
            }

            const result = await dispatch(updateUserProfile(payload)).unwrap();
            
            if (result?.user) {
                const u = result.user;
                setUserData(prev => ({
                    ...prev,
                    firstName: u.firstName ?? fn,
                    lastName: u.lastName ?? ln,
                    name: u.name || `${fn} ${ln}`.trim(),
                    avatar: u.avatar || currentAvatar || prev.avatar,
                    phone: u.phone ?? prev.phone,
                    department: u.department ?? prev.department,
                    location: u.location ?? prev.location,
                    bio: u.bio ?? prev.bio
                }));
            }

            try {
                await authService.updateNotificationPreferences(notifications);
            } catch {
                // Non-blocking
            }

            setSuccessMessage('Profile updated successfully!');
            setShowSuccess(true);
            setIsEditing(false);
            setTimeout(() => setShowSuccess(false), 4000);
        } catch (err) {
            const msg = typeof err === 'string' ? err : err?.message || 'Failed to update profile. Please try again.';
            setErrorMessage(msg);
            setTimeout(() => setErrorMessage(''), 6000);
        } finally {
            setIsSaving(false);
        }
    };

    // Handle password change
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (!passwordData.currentPassword) {
            setPasswordError('Please enter your current password.');
            return;
        }
        if (!passwordData.newPassword) {
            setPasswordError('Please enter a new password.');
            return;
        }
        if (passwordData.newPassword.length < 8) {
            setPasswordError('New password must be at least 8 characters long.');
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('New password and confirmation password do not match.');
            return;
        }

        setPasswordLoading(true);
        try {
            await dispatch(changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            })).unwrap();

            setPasswordSuccess('Password changed successfully!');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            setTimeout(() => setPasswordSuccess(''), 5000);
        } catch (err) {
            const msg = typeof err === 'string' ? err : err?.message || 'Failed to change password. Please verify your current password.';
            setPasswordError(msg);
        } finally {
            setPasswordLoading(false);
        }
    };

    // Helper: Compute initials
    const getInitials = () => {
        if (userData.firstName && userData.lastName) {
            return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
        }
        const displayName = getDisplayName();
        if (displayName && displayName !== 'Admin User') {
            const parts = displayName.trim().split(/\s+/);
            if (parts.length >= 2) {
                return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
            }
            return parts[0].slice(0, 2).toUpperCase();
        }
        if (userData.email) {
            return userData.email.slice(0, 2).toUpperCase();
        }
        return 'AU';
    };

    const getDisplayName = () => {
        const combined = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
        if (combined) return combined;
        if (userData.name) return userData.name;
        return userData.email || 'Admin User';
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Format time
    const formatTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Activity logs from service or fallback
    const activityLogs = activityLogService.getLogs ? activityLogService.getLogs({ limit: 6 }) : [];

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto space-y-3 md:space-y-6 pb-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center shadow-sm">
                                <User className="text-white" size={20} />
                            </div>
                            My Profile
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[44px] md:ml-[52px]">
                            Manage your account settings and preferences
                        </p>
                    </div>

                    {activeTab === 'profile' && (
                        isEditing ? (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setErrorMessage('');
                                    }}
                                    disabled={isSaving}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d7a] hover:to-[#004fa2] transition-all duration-200 shadow-md ${isSaving ? 'opacity-70 cursor-wait' : ''}`}
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm font-medium text-sm"
                            >
                                <Edit size={16} />
                                Edit Profile
                            </button>
                        )
                    )}
                </div>

                {/* Alerts */}
                {showSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 text-green-700 animate-in fade-in slide-in-from-top-4 duration-300 shadow-sm">
                        <CheckCircle size={20} className="shrink-0" />
                        <span className="font-medium text-sm">{successMessage}</span>
                    </div>
                )}

                {errorMessage && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-4 duration-300 shadow-sm">
                        <AlertCircle size={20} className="shrink-0" />
                        <span className="font-medium text-sm">{errorMessage}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Profile Card & Menu */}
                    <div className="space-y-6">
                        {/* Profile Summary Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-5">
                            <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className="w-16 h-16 rounded-full border-2 border-gray-200 shadow-sm shrink-0 overflow-hidden relative group">
                                    {userData.avatar && !imageError ? (
                                        <img
                                            key={userData.avatar}
                                            decoding="async"
                                            src={normalizeAvatarUrl(userData.avatar)}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                            onError={() => setImageError(true)}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white font-bold text-lg">
                                            {getInitials()}
                                        </div>
                                    )}
                                    {isUploadingAvatar ? (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <Loader2 className="text-white animate-spin" size={22} />
                                        </div>
                                    ) : (
                                        <div
                                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                            onClick={() => document.getElementById('avatar-upload').click()}
                                            title="Change Photo"
                                        >
                                            <Camera className="text-white" size={16} />
                                        </div>
                                    )}
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        className="hidden"
                                        disabled={isUploadingAvatar}
                                        onChange={handleAvatarUpload}
                                    />
                                </div>
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-base font-bold text-gray-900 truncate">
                                        {getDisplayName()}
                                    </h2>
                                    <p className="text-xs text-gray-500 mb-2 truncate">{userData.email || 'Loading...'}</p>
                                    <div className="flex items-center flex-wrap gap-1.5">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                            userData.role.toLowerCase().includes('super')
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-blue-100 text-blue-700'
                                        }`}>
                                            {userData.role || 'Admin'}
                                        </span>
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold flex items-center gap-1 capitalize">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                            {userData.accountStatus || 'Active'}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => document.getElementById('avatar-upload').click()}
                                        disabled={isUploadingAvatar}
                                        className="mt-2 text-xs text-[#004fa2] hover:underline font-medium block disabled:opacity-50"
                                    >
                                        {isUploadingAvatar ? (
                                            <span className="flex items-center gap-1">
                                                <Loader2 size={12} className="animate-spin" /> Uploading...
                                            </span>
                                        ) : (
                                            'Change Photo'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <nav className="flex lg:flex-col overflow-x-auto p-2 gap-1">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`flex items-center gap-2 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                                        activeTab === 'profile'
                                            ? 'bg-blue-50 text-[#004fa2] font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <User size={18} />
                                    <span>Personal Info</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('security')}
                                    className={`flex items-center gap-2 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                                        activeTab === 'security'
                                            ? 'bg-blue-50 text-[#004fa2] font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Shield size={18} />
                                    <span>Security</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('notifications')}
                                    className={`flex items-center gap-2 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                                        activeTab === 'notifications'
                                            ? 'bg-blue-50 text-[#004fa2] font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Bell size={18} />
                                    <span>Notifications</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('activity')}
                                    className={`flex items-center gap-2 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                                        activeTab === 'activity'
                                            ? 'bg-blue-50 text-[#004fa2] font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <Activity size={18} />
                                    <span>Activity</span>
                                </button>
                            </nav>
                        </div>

                        {/* Quick Info */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
                            <h3 className="font-semibold text-gray-900 text-sm">Account Info</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Calendar size={16} className="text-gray-400 shrink-0" />
                                    <span>{userData.joinedDate ? `Joined ${formatDate(userData.joinedDate)}` : 'Status: Verified Admin'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Clock size={16} className="text-gray-400 shrink-0" />
                                    <span className="truncate">
                                        Last Login: {userData.lastLogin ? `${formatDate(userData.lastLogin)}, ${formatTime(userData.lastLogin)}` : 'Active now'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <MapPin size={16} className="text-gray-400 shrink-0" />
                                    <span>{userData.location || 'Ghana'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content Area */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* PERSONAL INFORMATION TAB */}
                        {activeTab === 'profile' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <User size={20} className="text-[#004fa2]" />
                                    Personal Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={userData.firstName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="First Name"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={userData.lastName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="Last Name"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input
                                                type="email"
                                                name="email"
                                                value={userData.email}
                                                disabled={true}
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-not-allowed"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400">Account email cannot be modified directly</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={userData.phone}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                placeholder="+233..."
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Department</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input
                                                type="text"
                                                name="department"
                                                value={userData.department}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                placeholder="Department"
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input
                                                type="text"
                                                name="location"
                                                value={userData.location}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                placeholder="City, Country"
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Bio</label>
                                        <textarea
                                            name="bio"
                                            value={userData.bio}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            rows={4}
                                            placeholder="A short description about yourself..."
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] disabled:opacity-60 disabled:cursor-not-allowed transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECURITY TAB */}
                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                {/* Password Change */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Lock size={20} className="text-[#004fa2]" />
                                        Change Password
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-6">Ensure your account uses a strong, unique password.</p>

                                    {passwordSuccess && (
                                        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm flex items-center gap-2">
                                            <CheckCircle size={16} />
                                            <span>{passwordSuccess}</span>
                                        </div>
                                    )}
                                    {passwordError && (
                                        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm flex items-center gap-2">
                                            <AlertCircle size={16} />
                                            <span>{passwordError}</span>
                                        </div>
                                    )}

                                    <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Current Password</label>
                                            <div className="relative">
                                                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                                <input
                                                    type="password"
                                                    value={passwordData.currentPassword}
                                                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                                    placeholder="••••••••••••"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">New Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                                <input
                                                    type="password"
                                                    value={passwordData.newPassword}
                                                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                                    placeholder="Minimum 8 characters"
                                                    required
                                                    minLength={8}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                                <input
                                                    type="password"
                                                    value={passwordData.confirmPassword}
                                                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                                    placeholder="Confirm new password"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={passwordLoading}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d7a] hover:to-[#004fa2] transition-all text-sm font-medium shadow-sm disabled:opacity-60"
                                        >
                                            {passwordLoading ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Updating...
                                                </>
                                            ) : (
                                                'Update Password'
                                            )}
                                        </button>
                                    </form>
                                </div>

                                {/* Two-Factor Authentication */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <Shield size={20} className="text-[#004fa2]" />
                                        Two-Factor Authentication
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-6">Adds an extra layer of security to your admin account.</p>

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                                                <Smartphone size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm sm:text-base">Authenticator App</h4>
                                                <p className="text-xs sm:text-sm text-gray-500">Google Authenticator, Microsoft Authenticator, or Authy</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {userData.twoFactorEnabled ? (
                                                <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Enabled</span>
                                            ) : (
                                                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">Disabled</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Session Management */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <Monitor size={20} className="text-[#004fa2]" />
                                        Active Sessions
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 border border-gray-100 hover:bg-gray-50 rounded-xl transition-colors">
                                            <div className="flex items-center gap-3">
                                                <Monitor className="text-gray-400 shrink-0" size={20} />
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">Active Browser Session</p>
                                                    <p className="text-xs text-gray-500">{userData.location || 'Ghana'} • Authenticated Admin</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-green-600 font-medium bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                                                    Current Session
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* NOTIFICATIONS TAB */}
                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                                <Bell size={20} className="text-[#004fa2]" />
                                                Notification Preferences
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">Manage what notifications you receive across the platform</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Activity Alerts */}
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Activity Alerts</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-sm">New Enrollment Alerts</p>
                                                        <p className="text-xs text-gray-500">Get notified when a student registers for training</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={notifications.newEnrollments}
                                                            onChange={() => setNotifications(p => ({ ...p, newEnrollments: !p.newEnrollments }))}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004fa2]"></div>
                                                    </label>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-sm">Payment Confirmations</p>
                                                        <p className="text-xs text-gray-500">Receive alerts when payments are processed</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={notifications.paymentConfirmations}
                                                            onChange={() => setNotifications(p => ({ ...p, paymentConfirmations: !p.paymentConfirmations }))}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004fa2]"></div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* System Alerts */}
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">System Alerts</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-sm">Security Alerts</p>
                                                        <p className="text-xs text-gray-500">Unusual login attempts and security events</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={notifications.securityAlerts}
                                                            onChange={() => setNotifications(p => ({ ...p, securityAlerts: !p.securityAlerts }))}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004fa2]"></div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Channels */}
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Delivery Channels</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div
                                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                        notifications.emailAlerts ? 'border-[#004fa2] bg-blue-50/50' : 'border-gray-200 hover:border-blue-200'
                                                    }`}
                                                    onClick={() => setNotifications(p => ({ ...p, emailAlerts: !p.emailAlerts }))}
                                                >
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <Mail size={20} className={notifications.emailAlerts ? 'text-[#004fa2]' : 'text-gray-400'} />
                                                        <span className="font-bold text-gray-900 text-sm">Email</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">Deliver notifications to {userData.email}</p>
                                                </div>
                                                <div
                                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                        notifications.browserPush ? 'border-[#004fa2] bg-blue-50/50' : 'border-gray-200 hover:border-blue-200'
                                                    }`}
                                                    onClick={() => setNotifications(p => ({ ...p, browserPush: !p.browserPush }))}
                                                >
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <Bell size={20} className={notifications.browserPush ? 'text-[#004fa2]' : 'text-gray-400'} />
                                                        <span className="font-bold text-gray-900 text-sm">Browser Push</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">Deliver pop-up notifications when online</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100">
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        await authService.updateNotificationPreferences(notifications);
                                                        setSuccessMessage('Notification preferences saved!');
                                                        setShowSuccess(true);
                                                        setTimeout(() => setShowSuccess(false), 3000);
                                                    } catch {
                                                        setErrorMessage('Failed to save preferences.');
                                                        setTimeout(() => setErrorMessage(''), 3000);
                                                    }
                                                }}
                                                className="px-5 py-2.5 bg-[#004fa2] hover:bg-[#003d7a] text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
                                            >
                                                Save Notification Preferences
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ACTIVITY TAB */}
                        {activeTab === 'activity' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Activity size={20} className="text-[#004fa2]" />
                                    Recent Activity
                                </h3>

                                {activityLogs.length > 0 ? (
                                    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                        {activityLogs.map((item, idx) => (
                                            <div key={item.id || idx} className="relative flex items-start gap-3 ml-0 pl-0">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-[#004fa2] shadow-sm shrink-0 z-10 border border-blue-100">
                                                    <Activity size={14} />
                                                </div>
                                                <div className="flex-1 bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm">
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                                                        <div className="font-bold text-slate-900 text-sm capitalize">
                                                            {item.description || item.type?.replace(/_/g, ' ')}
                                                        </div>
                                                        <time className="font-medium text-blue-600 text-xs">
                                                            {formatDate(item.timestamp)}
                                                        </time>
                                                    </div>
                                                    <div className="text-slate-500 text-xs">
                                                        {item.details?.device ? `${item.details.device} • ${item.details.browser || ''}` : 'Admin activity recorded'}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500 text-sm">
                                        <Activity className="mx-auto mb-2 text-gray-400" size={32} />
                                        <p>No recent activity recorded yet.</p>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminProfilePage;
