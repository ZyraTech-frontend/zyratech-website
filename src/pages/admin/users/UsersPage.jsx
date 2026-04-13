/**
 * Administrators Management Page (Super Admin Only)
 * - Super Admin creates admin accounts with temporary passwords
 * - Admins must change password on first login
 * - Accounts are deactivated (never deleted) when admins leave
 * - KYC verification tracking for each admin
 */

import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, updateUser, deactivateUser, reactivateUser } from '../../../store/slices/usersSlice';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import { ROLES, ROLE_LABELS } from '../../../utils/constants';
import {
  UserPlus, Edit, Shield, ShieldCheck, ShieldX,
  User, Phone, Calendar, Search, X, Eye,
  CheckCircle, Clock, AlertTriangle, XCircle,
  BadgeCheck, FileWarning, MoreVertical,
  KeyRound, UserCog, Users, Lock, Unlock, IdCard
} from 'lucide-react';

// Admin role config (all accounts are administrators)
const ADMIN_ROLES = {
  admin: { value: 'admin', label: 'Administrator', icon: ShieldCheck, color: 'blue' }
};

// Account statuses
const ACCOUNT_STATUSES = {
  active: { value: 'active', label: 'Active', icon: CheckCircle, colorClass: 'bg-green-100 text-green-700', dotColor: 'bg-green-500' },
  deactivated: { value: 'deactivated', label: 'Deactivated', icon: XCircle, colorClass: 'bg-red-100 text-red-700', dotColor: 'bg-red-500' },
  pending_password: { value: 'pending_password', label: 'Pending Password Change', icon: Clock, colorClass: 'bg-amber-100 text-amber-700', dotColor: 'bg-amber-500' }
};

// KYC statuses
const KYC_STATUSES = {
  not_submitted: { value: 'not_submitted', label: 'Not Submitted', icon: FileWarning, colorClass: 'bg-gray-100 text-gray-600', dotColor: 'bg-gray-400' },
  pending: { value: 'pending', label: 'Pending Review', icon: Clock, colorClass: 'bg-amber-100 text-amber-700', dotColor: 'bg-amber-500' },
  verified: { value: 'verified', label: 'Verified', icon: BadgeCheck, colorClass: 'bg-green-100 text-green-700', dotColor: 'bg-green-500' },
  rejected: { value: 'rejected', label: 'Rejected', icon: XCircle, colorClass: 'bg-red-100 text-red-700', dotColor: 'bg-red-500' }
};

const UsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuperAdmin } = usePermissions();
  const { items: administrators, loading } = useSelector((state) => state.users);

  // UI State
  const [showKycModal, setShowKycModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [kycFilter, setKycFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 50 }));
  }, [dispatch]);

  // Filter admins (exclude super_admin from the list)
  const filteredAdmins = useMemo(() => {
    let result = administrators.filter(a => a.role !== 'super_admin');

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.name?.toLowerCase().includes(q) ||
        a.email?.toLowerCase().includes(q) ||
        a.department?.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter(a => a.accountStatus === statusFilter);
    }
    if (departmentFilter !== 'all') {
      result = result.filter(a => a.department === departmentFilter);
    }
    if (kycFilter !== 'all') {
      result = result.filter(a => a.kycStatus === kycFilter);
    }
    return result;
  }, [administrators, searchQuery, statusFilter, departmentFilter, kycFilter]);

  // Stats
  const stats = useMemo(() => {
    const admins = administrators.filter(a => a.role !== 'super_admin');
    return {
      total: admins.length,
      active: admins.filter(a => a.accountStatus === 'active').length,
      deactivated: admins.filter(a => a.accountStatus === 'deactivated').length,
      pendingPassword: admins.filter(a => a.accountStatus === 'pending_password').length,
      kycVerified: admins.filter(a => a.kycStatus === 'verified').length,
      kycPending: admins.filter(a => a.kycStatus === 'pending').length,
      kycRejected: admins.filter(a => a.kycStatus === 'rejected').length,
      kycNotSubmitted: admins.filter(a => a.kycStatus === 'not_submitted').length
    };
  }, [administrators]);

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

  // ─── DEACTIVATE / REACTIVATE ────────────────────────────
  const handleDeactivate = (admin) => {
    dispatch(openConfirmDialog({
      title: 'Deactivate Administrator',
      message: `Are you sure you want to deactivate "${admin.name}"? This will revoke their access immediately. Their account can be reactivated later. Accounts are never deleted to preserve audit trails.`,
      isDangerous: true,
      onConfirm: () => {
        dispatch(deactivateUser(admin.id));
        dispatch(addNotification({ type: 'success', message: `"${admin.name}" has been deactivated.` }));
      }
    }));
  };

  const handleReactivate = (admin) => {
    dispatch(openConfirmDialog({
      title: 'Reactivate Administrator',
      message: `Reactivate "${admin.name}"'s account? They will regain access with their existing role (${ROLE_LABELS[admin.role]}).`,
      onConfirm: () => {
        dispatch(reactivateUser(admin.id));
        dispatch(addNotification({ type: 'success', message: `"${admin.name}" has been reactivated.` }));
      }
    }));
  };

  // ─── KYC ─────────────────────────────────────────────────
  const openKycReview = (admin) => {
    setSelectedAdmin(admin);
    setShowKycModal(true);
  };

  const handleKycAction = (action) => {
    const newStatus = action === 'approve' ? 'verified' : 'rejected';
    dispatch(updateUser({
      id: selectedAdmin.id,
      data: { ...selectedAdmin, kycStatus: newStatus }
    }));

    dispatch(addNotification({
      type: action === 'approve' ? 'success' : 'warning',
      message: action === 'approve'
        ? `"${selectedAdmin.name}"'s KYC has been verified successfully.`
        : `"${selectedAdmin.name}"'s KYC has been rejected. They will need to resubmit.`
    }));

    setShowKycModal(false);
    setSelectedAdmin(null);
  };

  // ─── VIEW DETAIL ─────────────────────────────────────────
  const openDetail = (admin) => {
    setSelectedAdmin(admin);
    setShowDetailModal(true);
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || departmentFilter !== 'all' || kycFilter !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setDepartmentFilter('all');
    setKycFilter('all');
  };

  // Helper to get Tailwind color classes for roles
  const getRoleBadgeClasses = (color) => {
    const map = {
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      gray: 'bg-gray-100 text-gray-600 border-gray-200'
    };
    return map[color] || map.gray;
  };

  // ─── RENDER ──────────────────────────────────────────────
  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center shadow-lg">
              <UserCog size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Administrators</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Create and manage administrator accounts, roles & KYC verification
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/admin/users/new')}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:shadow-lg transition-all font-medium text-sm shadow-md"
          >
            <UserPlus size={18} />
            Create Administrator
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {/* Total */}
          <button onClick={() => resetFilters()} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Users size={18} className="text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-500">Total Admins</p>
          </button>

          {/* Active */}
          <button onClick={() => { resetFilters(); setStatusFilter('active'); }} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <CheckCircle size={18} className="text-green-600" />
              </div>
              {stats.active > 0 && <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">Live</span>}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            <p className="text-xs text-gray-500">Active</p>
          </button>

          {/* Deactivated */}
          <button onClick={() => { resetFilters(); setStatusFilter('deactivated'); }} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <XCircle size={18} className="text-red-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.deactivated}</p>
            <p className="text-xs text-gray-500">Deactivated</p>
          </button>

          {/* Pending Password */}
          <button onClick={() => { resetFilters(); setStatusFilter('pending_password'); }} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                <KeyRound size={18} className="text-amber-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.pendingPassword}</p>
            <p className="text-xs text-gray-500">Pending Setup</p>
          </button>

          {/* KYC Verified */}
          <button onClick={() => { resetFilters(); setKycFilter('verified'); }} className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-left group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                <BadgeCheck size={18} className="text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stats.kycVerified}</p>
            <p className="text-xs text-green-100">KYC Verified</p>
          </button>

          {/* KYC Pending */}
          <button onClick={() => { resetFilters(); setKycFilter('pending'); }} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                <Clock size={18} className="text-amber-600" />
              </div>
              {stats.kycPending > 0 && <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.kycPending}</p>
            <p className="text-xs text-gray-500">KYC Pending</p>
          </button>

          {/* KYC Rejected */}
          <button onClick={() => { resetFilters(); setKycFilter('rejected'); }} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <ShieldX size={18} className="text-red-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.kycRejected}</p>
            <p className="text-xs text-gray-500">KYC Rejected</p>
          </button>

          {/* KYC Not Submitted */}
          <button onClick={() => { resetFilters(); setKycFilter('not_submitted'); }} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <FileWarning size={18} className="text-gray-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.kycNotSubmitted}</p>
            <p className="text-xs text-gray-500">No KYC</p>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or department..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none"
            >
              <option value="all">All Status</option>
              {Object.values(ACCOUNT_STATUSES).map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none"
            >
              <option value="all">All Departments</option>
              <optgroup label="Content">
                <option value="Training Courses">Training Courses</option>
                <option value="Blog Articles">Blog Articles</option>
                <option value="Job Listings">Job Listings</option>
                <option value="Gallery">Gallery</option>
                <option value="Projects">Projects</option>
                <option value="FAQ">FAQ</option>
                <option value="Testimonials">Testimonials</option>
                <option value="Team Members">Team Members</option>
              </optgroup>
              <optgroup label="Business">
                <option value="Payments">Payments</option>
                <option value="Enrollments">Enrollments</option>
                <option value="Messages">Messages</option>
                <option value="Partnerships">Partnerships</option>
                <option value="Contact Inquiries">Contact Inquiries</option>
                <option value="Impact Stories">Impact Stories</option>
                <option value="Newsletter">Newsletter</option>
              </optgroup>
            </select>
            <select
              value={kycFilter}
              onChange={(e) => setKycFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none"
            >
              <option value="all">All KYC</option>
              {Object.values(KYC_STATUSES).map(k => (
                <option key={k.value} value={k.value}>{k.label}</option>
              ))}
            </select>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-3 py-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm"
              >
                <X size={16} />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Admin Cards Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-gray-500">Loading administrators...</p>
            </div>
          </div>
        ) : filteredAdmins.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
            <UserCog size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {hasActiveFilters ? 'No administrators match your filters' : 'No administrators yet'}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {hasActiveFilters
                ? 'Try adjusting your search or filter criteria.'
                : 'Create your first administrator account to get started.'}
            </p>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-sm text-[#004fa2] hover:underline">
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAdmins.map(admin => {
              const roleConfig = ADMIN_ROLES[admin.role] || ADMIN_ROLES.admin;
              const accountStatus = ACCOUNT_STATUSES[admin.accountStatus] || ACCOUNT_STATUSES.active;
              const kycStatus = KYC_STATUSES[admin.kycStatus] || KYC_STATUSES.not_submitted;
              const AccountIcon = accountStatus.icon;
              const KycIcon = kycStatus.icon;
              const RoleIcon = roleConfig.icon;
              const isDeactivated = admin.accountStatus === 'deactivated';

              return (
                <div
                  key={admin.id}
                  className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-all group ${
                    isDeactivated ? 'opacity-70 border-red-200' : 'border-gray-100'
                  }`}
                >
                  {/* Card Header */}
                  <div className={`px-5 py-4 ${isDeactivated ? 'bg-red-50' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg ${
                          isDeactivated
                            ? 'bg-gradient-to-br from-gray-400 to-gray-500'
                            : 'bg-gradient-to-br from-[#004fa2] to-[#0066cc]'
                        }`}>
                          {admin.name?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{admin.name}</h3>
                          <p className="text-xs text-gray-500">{admin.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => openDetail(admin)}
                        className="p-2 rounded-lg hover:bg-white transition-colors"
                        title="View details"
                      >
                        <MoreVertical size={16} className="text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-5 py-4 space-y-3">
                    {/* Role & Status Badges */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getRoleBadgeClasses(roleConfig.color)}`}>
                        <RoleIcon size={12} />
                        {roleConfig.label}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${accountStatus.colorClass}`}>
                        <AccountIcon size={12} />
                        {accountStatus.label}
                      </span>
                    </div>

                    {/* KYC Status */}
                    <div className="flex items-center gap-2">
                      <IdCard size={14} className="text-gray-400" />
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${kycStatus.colorClass}`}>
                        <KycIcon size={11} />
                        KYC: {kycStatus.label}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="space-y-1.5 text-xs text-gray-500">
                      {admin.phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={13} className="text-gray-400" />
                          <span>{admin.phone}</span>
                        </div>
                      )}
                      {admin.department && (
                        <div className="flex items-center gap-2">
                          <Shield size={13} className="text-gray-400" />
                          <span>{admin.department}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-gray-400" />
                        <span>Added {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}</span>
                      </div>
                    </div>

                    {/* Password change reminder */}
                    {admin.accountStatus === 'pending_password' && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                        <KeyRound size={14} className="text-amber-600 shrink-0" />
                        <span className="text-[11px] text-amber-700 font-medium">Has not changed temporary password</span>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => openDetail(admin)}
                      className="text-sm text-[#004fa2] hover:underline font-medium"
                    >
                      View Details
                    </button>
                    <div className="flex items-center gap-1">
                      {admin.kycStatus === 'pending' && (
                        <button
                          onClick={() => openKycReview(admin)}
                          className="p-2 rounded-lg hover:bg-amber-50 text-amber-600 transition-colors"
                          title="Review KYC"
                        >
                          <BadgeCheck size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/admin/users/edit/${admin.id}`)}
                        className="p-2 rounded-lg hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      {isDeactivated ? (
                        <button
                          onClick={() => handleReactivate(admin)}
                          className="p-2 rounded-lg hover:bg-green-50 text-gray-500 hover:text-green-600 transition-colors"
                          title="Reactivate account"
                        >
                          <Unlock size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDeactivate(admin)}
                          className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                          title="Deactivate account"
                        >
                          <Lock size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── KYC REVIEW MODAL ────────────────────────────── */}
      {showKycModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowKycModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <IdCard size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">KYC Verification</h2>
                  <p className="text-xs text-gray-500">Review {selectedAdmin.name}&apos;s identity documents</p>
                </div>
              </div>
              <button onClick={() => setShowKycModal(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Admin Info */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white font-bold text-xl">
                  {selectedAdmin.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedAdmin.name}</p>
                  <p className="text-sm text-gray-500">{selectedAdmin.email}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{ROLE_LABELS[selectedAdmin.role] || selectedAdmin.role}</p>
                </div>
              </div>

              {/* KYC Documents (placeholder) */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Submitted Documents</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <IdCard size={20} className="text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Government-issued ID</p>
                      <p className="text-xs text-gray-500">Submitted {selectedAdmin.kycSubmittedAt || 'recently'}</p>
                    </div>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Pending</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <User size={20} className="text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Proof of Address</p>
                      <p className="text-xs text-gray-500">Utility bill or bank statement</p>
                    </div>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Pending</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-700">
                    Please verify the submitted documents carefully before approving. Rejected KYC will require the administrator to resubmit their documents.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3">
              <button
                onClick={() => handleKycAction('reject')}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                <XCircle size={16} />
                Reject KYC
              </button>
              <button
                onClick={() => handleKycAction('approve')}
                className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                <BadgeCheck size={16} />
                Approve KYC
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── DETAIL MODAL ────────────────────────────────── */}
      {showDetailModal && selectedAdmin && (() => {
        const roleConfig = ADMIN_ROLES[selectedAdmin.role] || ADMIN_ROLES.admin;
        const accountStatus = ACCOUNT_STATUSES[selectedAdmin.accountStatus] || ACCOUNT_STATUSES.active;
        const kycStatus = KYC_STATUSES[selectedAdmin.kycStatus] || KYC_STATUSES.not_submitted;
        const DetailAccountIcon = accountStatus.icon;
        const DetailKycIcon = kycStatus.icon;
        const isDeactivated = selectedAdmin.accountStatus === 'deactivated';

        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className={`px-6 py-5 ${isDeactivated ? 'bg-gradient-to-r from-red-50 to-red-100' : 'bg-gradient-to-r from-[#004fa2]/5 to-[#0066cc]/5'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl ${
                      isDeactivated ? 'bg-gradient-to-br from-gray-400 to-gray-500' : 'bg-gradient-to-br from-[#004fa2] to-[#0066cc]'
                    }`}>
                      {selectedAdmin.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">{selectedAdmin.name}</h2>
                      <p className="text-sm text-gray-500">{selectedAdmin.email}</p>
                    </div>
                  </div>
                  <button onClick={() => setShowDetailModal(false)} className="p-2 rounded-lg hover:bg-white/80">
                    <X size={18} className="text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Role</p>
                    <p className="font-semibold text-gray-900 text-sm">{roleConfig.label}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Account Status</p>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${accountStatus.colorClass}`}>
                      <DetailAccountIcon size={12} />
                      {accountStatus.label}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">KYC Status</p>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${kycStatus.colorClass}`}>
                      <DetailKycIcon size={12} />
                      {kycStatus.label}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Department</p>
                    <p className="font-semibold text-gray-900 text-sm">{selectedAdmin.department || '—'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p className="font-semibold text-gray-900 text-sm">{selectedAdmin.phone || '—'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Date Created</p>
                    <p className="font-semibold text-gray-900 text-sm">{selectedAdmin.createdAt ? new Date(selectedAdmin.createdAt).toLocaleDateString() : '—'}</p>
                  </div>
                </div>

                {selectedAdmin.lastLoginAt && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Last Login</p>
                    <p className="font-semibold text-gray-900 text-sm">{new Date(selectedAdmin.lastLoginAt).toLocaleString()}</p>
                  </div>
                )}

                {selectedAdmin.accountStatus === 'pending_password' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                    <KeyRound size={18} className="text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800">Password Change Required</p>
                      <p className="text-xs text-amber-600 mt-1">This administrator has not yet changed their temporary password. They will be prompted to do so on next login.</p>
                    </div>
                  </div>
                )}

                {isDeactivated && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <ShieldX size={18} className="text-red-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-red-800">Account Deactivated</p>
                      <p className="text-xs text-red-600 mt-1">
                        {selectedAdmin.deactivatedAt
                          ? `Deactivated on ${new Date(selectedAdmin.deactivatedAt).toLocaleDateString()}.`
                          : 'This account has been deactivated.'
                        }
                        {selectedAdmin.deactivationReason && ` Reason: ${selectedAdmin.deactivationReason}`}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3">
                <button onClick={() => { setShowDetailModal(false); navigate(`/admin/users/edit/${selectedAdmin.id}`); }} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2">
                  <Edit size={16} />
                  Edit Details
                </button>
                {isDeactivated ? (
                  <button onClick={() => { setShowDetailModal(false); handleReactivate(selectedAdmin); }} className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2">
                    <Unlock size={16} />
                    Reactivate
                  </button>
                ) : (
                  <button onClick={() => { setShowDetailModal(false); handleDeactivate(selectedAdmin); }} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2">
                    <Lock size={16} />
                    Deactivate
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </AdminLayout>
  );
};

export default UsersPage;
