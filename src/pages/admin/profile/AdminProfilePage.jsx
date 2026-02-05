/**
 * Admin Profile Page
 * Professional interface for managing admin profile, security settings, and preferences
 */

import React, { useState } from 'react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Shield,
    Key,
    Lock,
    Bell,
    Globe,
    Monitor,
    Smartphone,
    Camera,
    Save,
    Edit,
    CheckCircle,
    AlertCircle,
    LogOut,
    Briefcase,
    Calendar,
    Clock,
    Activity,
    Award
} from 'lucide-react';

const AdminProfilePage = () => {
    const { isSuperAdmin } = usePermissions();

    // State management
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock user data
    const [userData, setUserData] = useState({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@zyratech.com',
        phone: '+233 20 123 4567',
        role: 'Super Admin',
        department: 'Management',
        location: 'Accra, Ghana',
        avatar: null,
        bio: 'Senior Administrator responsible for platform management and oversight. Joined ZyraTech in 2021.',
        joinedDate: '2021-05-15',
        lastLogin: '2024-12-19T14:30:00Z'
    });

    // Mock notification settings
    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        browserPush: true,
        newsletters: false,
        securityAlerts: true,
        newEnrollments: true,
        paymentConfirmations: true,
        reportSummaries: false
    });

    // Mock security settings
    const [security, setSecurity] = useState({
        twoFactor: true,
        sessionTimeout: '30m',
        loginAlerts: true
    });

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle save
    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setIsEditing(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
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
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto space-y-6 pb-8">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                <User className="text-white" size={22} />
                            </div>
                            My Profile
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Manage your account settings and preferences
                        </p>
                    </div>
                    {isEditing ? (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsEditing(false)}
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
                    )}
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 text-green-700 animate-in fade-in slide-in-from-top-4 duration-300">
                        <CheckCircle size={20} />
                        <span className="font-medium">Profile updated successfully!</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Profile Card & Menu */}
                    <div className="space-y-6">
                        {/* Profile Summary Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="h-32 bg-gradient-to-r from-[#004fa2] to-[#0066cc] relative">
                                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                            </div>
                            <div className="px-6 relative">
                                <div className="w-24 h-24 bg-white rounded-full p-1.5 absolute -top-12 border-4 border-white shadow-md">
                                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden relative group">
                                        {userData.avatar ? (
                                            <img src={userData.avatar} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-2xl font-bold text-gray-400">
                                                {userData.firstName[0]}{userData.lastName[0]}
                                            </span>
                                        )}
                                        {isEditing && (
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                                <Camera className="text-white" size={20} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="pt-14 pb-6 text-center">
                                    <h2 className="text-xl font-bold text-gray-900">{userData.firstName} {userData.lastName}</h2>
                                    <p className="text-sm text-gray-500">{userData.role}</p>
                                    <div className="flex items-center justify-center gap-2 mt-3">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${userData.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {userData.role}
                                        </span>
                                        <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <nav className="flex flex-col p-2">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile'
                                            ? 'bg-blue-50 text-[#004fa2]'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <User size={18} />
                                    Personal Information
                                </button>
                                <button
                                    onClick={() => setActiveTab('security')}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security'
                                            ? 'bg-blue-50 text-[#004fa2]'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Shield size={18} />
                                    Security & Password
                                </button>
                                <button
                                    onClick={() => setActiveTab('notifications')}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications'
                                            ? 'bg-blue-50 text-[#004fa2]'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Bell size={18} />
                                    Notifications
                                </button>
                                <button
                                    onClick={() => setActiveTab('activity')}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'activity'
                                            ? 'bg-blue-50 text-[#004fa2]'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Activity size={18} />
                                    Recent Activity
                                </button>
                            </nav>
                        </div>

                        {/* Quick Info */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
                            <h3 className="font-semibold text-gray-900 text-sm">Account Info</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span>Joined {formatDate(userData.joinedDate)}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Clock size={16} className="text-gray-400" />
                                    <span>Last Login: {formatDate(userData.lastLogin)}, {formatTime(userData.lastLogin)}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <MapPin size={16} className="text-gray-400" />
                                    <span>IP: 192.168.1.100</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content Area */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* PERSONAL INFORMATION TAB */}
                        {activeTab === 'profile' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
                                                onChange={handleInputChange}
                                                disabled={true} // Email typically cannot be changed easily
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400">Contact admin support to change email</p>
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
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <Lock size={20} className="text-[#004fa2]" />
                                        Change Password
                                    </h3>

                                    <div className="space-y-4 max-w-lg">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Current Password</label>
                                            <div className="relative">
                                                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                                <input
                                                    type="password"
                                                    disabled={!isEditing}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                                                    placeholder="••••••••••••"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">New Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                                <input
                                                    type="password"
                                                    disabled={!isEditing}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                                                    placeholder="Enter new password"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                                <input
                                                    type="password"
                                                    disabled={!isEditing}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                                                    placeholder="Confirm new password"
                                                />
                                            </div>
                                        </div>
                                        {isEditing && (
                                            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                                                Update Password
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Two-Factor Authentication */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                        <Shield size={20} className="text-[#004fa2]" />
                                        Two-Factor Authentication
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-6">Adds an extra layer of security to your account.</p>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                                <Smartphone size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Authenticator App</h4>
                                                <p className="text-sm text-gray-500">Use an app like Google Authenticator or Authy</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Enabled</span>
                                            <button
                                                disabled={!isEditing}
                                                className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium disabled:opacity-50"
                                            >
                                                Disable
                                            </button>
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
                                        <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors">
                                            <div className="flex items-center gap-4">
                                                <Monitor className="text-gray-400" size={24} />
                                                <div>
                                                    <p className="font-semibold text-gray-900">Windows PC - Chrome</p>
                                                    <p className="text-sm text-gray-500">Accra, Ghana • 192.168.1.100</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">Current Session</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors">
                                            <div className="flex items-center gap-4">
                                                <Smartphone className="text-gray-400" size={24} />
                                                <div>
                                                    <p className="font-semibold text-gray-900">iPhone 13 - Safari</p>
                                                    <p className="text-sm text-gray-500">Accra, Ghana • 41.215.160.50</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400">Active 2 days ago</p>
                                                <button className="text-xs text-red-600 font-medium hover:underline mt-1">Revoke</button>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="mt-6 text-sm text-red-600 font-medium hover:text-red-700 flex items-center gap-2">
                                        <LogOut size={16} />
                                        Sign out of all other sessions
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* NOTIFICATIONS TAB */}
                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <Bell size={20} className="text-[#004fa2]" />
                                        Notification Preferences
                                    </h3>

                                    <div className="space-y-6">
                                        {/* Activity Alerts */}
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Activity Alerts</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-gray-900">New Enrollment Alerts</p>
                                                        <p className="text-sm text-gray-500">Get notified when a new student enrolls</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={notifications.newEnrollments}
                                                            disabled={!isEditing}
                                                            onChange={() => setNotifications(p => ({ ...p, newEnrollments: !p.newEnrollments }))}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004fa2]"></div>
                                                    </label>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-gray-900">Payment Confirmations</p>
                                                        <p className="text-sm text-gray-500">Get notified when a payment is processed</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={notifications.paymentConfirmations}
                                                            disabled={!isEditing}
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
                                                        <p className="font-medium text-gray-900">Security Alerts</p>
                                                        <p className="text-sm text-gray-500">Unusual login attempts and password changes</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={notifications.securityAlerts}
                                                            disabled={!isEditing}
                                                            onChange={() => setNotifications(p => ({ ...p, securityAlerts: !p.securityAlerts }))}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004fa2]"></div>
                                                    </label>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-gray-900">System Updates</p>
                                                        <p className="text-sm text-gray-500">Platform maintenance and update announcements</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={true}
                                                            disabled={true}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004fa2] opacity-60"></div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Channels */}
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Delivery Channels</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${notifications.emailAlerts ? 'border-[#004fa2] bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
                                                    onClick={() => isEditing && setNotifications(p => ({ ...p, emailAlerts: !p.emailAlerts }))}
                                                >
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <Mail size={20} className={notifications.emailAlerts ? 'text-[#004fa2]' : 'text-gray-400'} />
                                                        <span className="font-bold text-gray-900">Email</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">Receive notifications via email to {userData.email}</p>
                                                </div>
                                                <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${notifications.browserPush ? 'border-[#004fa2] bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
                                                    onClick={() => isEditing && setNotifications(p => ({ ...p, browserPush: !p.browserPush }))}
                                                >
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <Bell size={20} className={notifications.browserPush ? 'text-[#004fa2]' : 'text-gray-400'} />
                                                        <span className="font-bold text-gray-900">Browser Push</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">Receive pop-up notifications when online</p>
                                                </div>
                                            </div>
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

                                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                    {[
                                        { action: 'Updated Payment Settings', desc: 'Changed global currency settings to GHS', date: '2 hours ago', icon: Edit, color: 'text-blue-500' },
                                        { action: 'Approved New Course', desc: 'Released "Advanced Data Science" module', date: 'Yesterday', icon: CheckCircle, color: 'text-green-500' },
                                        { action: 'Login Detected', desc: 'Login from new device (Safari on iPhone)', date: '2 days ago', icon: Lock, color: 'text-gray-500' },
                                        { action: 'Exported Report', desc: 'Downloaded Monthly Revenue Report (PDF)', date: '3 days ago', icon: Save, color: 'text-purple-500' },
                                    ].map((item, idx) => {
                                        const Icon = item.icon;
                                        return (
                                            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 group-[.is-active]:bg-white text-slate-500 group-[.is-active]:text-[#004fa2] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                                    <Icon size={16} />
                                                </div>
                                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                                    <div className="flex items-center justify-between space-x-2 mb-1">
                                                        <div className="font-bold text-slate-900">{item.action}</div>
                                                        <time className="font-caveat font-medium text-indigo-500 text-xs">{item.date}</time>
                                                    </div>
                                                    <div className="text-slate-500 text-sm">{item.desc}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminProfilePage;
