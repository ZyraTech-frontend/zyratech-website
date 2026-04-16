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
  KeyRound, UserCog, Users, Lock, Unlock, IdCard,
  ChevronDown, ZoomIn, ZoomOut, RotateCw, History, Image as ImageIcon, Maximize, AlertCircle, FileText, Upload, ArrowRight, Briefcase, Mail
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

  // New KYC specific states
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeKycTab, setActiveKycTab] = useState('details'); // 'details' | 'history'
  const [activeDocument, setActiveDocument] = useState('id'); // 'id' | 'address'
  const [showRejectDropdown, setShowRejectDropdown] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

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
    setZoomLevel(1);
    setActiveDocument('id');
    setActiveKycTab('details');
    setShowRejectDropdown(false);
    setRejectReason('');
  };

  const closeKycModal = () => {
    setShowKycModal(false);
    setTimeout(() => {
      setSelectedAdmin(null);
      setZoomLevel(1);
      setActiveDocument('id');
      setActiveKycTab('details');
      setShowRejectDropdown(false);
      setRejectReason('');
    }, 300);
  };

  const handleKycAction = (action) => {
    const newStatus = action === 'approve' ? 'verified' : 'rejected';
    
    const updatedData = { ...selectedAdmin, kycStatus: newStatus };
    if (action === 'reject' && rejectReason) {
      updatedData.kycRejectReason = rejectReason;
    }

    dispatch(updateUser({
      id: selectedAdmin.id,
      data: updatedData
    }));

    dispatch(addNotification({
      type: action === 'approve' ? 'success' : 'warning',
      message: action === 'approve'
        ? `"${selectedAdmin.name}"'s KYC has been verified successfully.`
        : `"${selectedAdmin.name}"'s KYC has been rejected. (${rejectReason || 'No reason provided'})`
    }));

    closeKycModal();
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
    setCurrentPage(1);
  };

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const currentAdmins = filteredAdmins.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, departmentFilter, kycFilter]);

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
      <div className="space-y-6 pb-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                        <Users className="text-white" size={22} />
                    </div>
                    Administrator Accounts
                </h1>
                <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                    Create and manage administrator accounts, roles & KYC verification
                </p>
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate('/admin/users/new')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#004fa2] text-white rounded-xl hover:bg-[#003d80] transition-colors shadow-sm font-medium text-sm"
                >
                    <UserPlus size={16} />
                    Create Administrator
                </button>
            </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
            {[
                { label: 'Total Admins', value: stats.total, icon: Users, iconColor: 'text-blue-600' },
                { label: 'Live', value: stats.active, icon: CheckCircle, iconColor: 'text-green-600', badge: 'Active', badgeColor: 'bg-green-100 text-green-700' },
                { label: 'Deactivated', value: stats.total - stats.active - stats.pendingPassword, icon: Lock, iconColor: 'text-gray-600' },
                { label: 'Pending Setup', value: stats.pendingPassword, icon: KeyRound, iconColor: 'text-amber-600' },
                { label: 'KYC Verified', value: stats.kycVerified, icon: BadgeCheck, iconColor: 'text-emerald-600' },
                { label: 'KYC Pending', value: stats.kycPending, icon: Clock, iconColor: 'text-amber-600', alert: stats.kycPending > 0 }
            ].map((stat, i) => (
                <div
                    key={i}
                    onClick={() => {
                        resetFilters();
                        if (stat.label === 'Live') setStatusFilter('active');
                        if (stat.label === 'Deactivated') setStatusFilter('deactivated');
                        if (stat.label === 'Pending Setup') setStatusFilter('pending_password');
                        if (stat.label === 'KYC Verified') setKycFilter('verified');
                        if (stat.label === 'KYC Pending') setKycFilter('pending');
                    }}
                    className={`group bg-white rounded-xl p-2.5 sm:p-3 border shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer ${stat.alert ? 'border-amber-300 bg-amber-50' : 'border-gray-200 hover:border-[#004fa2]'}`}
                >
                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                        <stat.icon className={`${stat.iconColor} group-hover:scale-110 transition-transform duration-300 shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4`} />
                        <p className="text-base sm:text-xl font-bold text-gray-900 truncate">
                            {stat.value.toLocaleString()}
                        </p>
                        {stat.badge && <span className={`ml-auto px-1.5 py-0.5 text-[9px] font-bold rounded-full hidden sm:inline-block ${stat.badgeColor}`}>{stat.badge}</span>}
                        {stat.alert && <span className="ml-auto px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-bold rounded-full hidden sm:inline-block animate-pulse">Action</span>}
                    </div>
                    <p className="text-[9px] sm:text-[10px] font-semibold text-gray-500 uppercase tracking-wide truncate">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>

        {/* Filters and Search - Ultra Compact Dropdowns */}
        <div className="bg-white rounded-xl p-2 sm:p-2.5 shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or department..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004fa2] focus:border-[#004fa2] text-[12px] bg-gray-50/50 transition-all font-medium h-[34px]"
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="flex-1 sm:flex-none px-1.5 sm:px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004fa2] text-[11px] sm:text-xs bg-gray-50/50 min-w-0 font-medium h-[34px]"
                    >
                        <option value="all">All Status</option>
                        {Object.values(ACCOUNT_STATUSES).map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>

                    <select
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                        className="flex-1 sm:flex-none px-1.5 sm:px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004fa2] text-[11px] sm:text-xs bg-gray-50/50 min-w-0 font-medium h-[34px]"
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
                        className="flex-1 sm:flex-none px-1.5 sm:px-2 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#004fa2] text-[11px] sm:text-xs bg-gray-50/50 min-w-0 font-medium h-[34px]"
                    >
                        <option value="all">All KYC</option>
                        {Object.values(KYC_STATUSES).map(k => (
                            <option key={k.value} value={k.value}>{k.label}</option>
                        ))}
                    </select>
                    {hasActiveFilters && (
                        <button
                            onClick={resetFilters}
                            className="shrink-0 h-[34px] w-[34px] flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 border border-gray-200 rounded-lg transition-colors bg-gray-50"
                            title="Reset Filters"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* Administrator List */}
        {loading ? (
          <div className="flex items-center justify-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm mt-4">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-100 border-t-[#004fa2] rounded-full animate-spin mx-auto mb-3" />
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Loading Accounts...</p>
            </div>
          </div>
        ) : currentAdmins.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100 mt-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCog className="text-gray-400" size={28} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {hasActiveFilters ? 'No matches found' : 'No administrator accounts yet'}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {hasActiveFilters
                ? 'Try adjusting your search criteria or resetting filters to see more results.'
                : 'Get started by setting up the first administrative profile for your organization.'}
            </p>
            {hasActiveFilters ? (
              <button onClick={resetFilters} className="px-4 py-2 text-sm text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors font-medium">
                Reset Filters
              </button>
            ) : (
              <button onClick={() => navigate('/admin/users/new')} className="px-4 py-2 text-sm bg-[#004fa2] text-white hover:bg-[#003d80] rounded-lg transition-colors font-medium flex items-center justify-center gap-2 mx-auto">
                <UserPlus size={16} /> Create Administrator
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            {currentAdmins.map(admin => {
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
                  className={`bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center p-3 gap-3 transition-colors group ${
                    isDeactivated ? 'opacity-75' : 'hover:border-[#004fa2]'
                  }`}
                >
                  <div className="flex items-center gap-3 md:w-1/4 shrink-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm overflow-hidden shrink-0 ${
                      isDeactivated ? 'bg-gray-400' : 'bg-[#004fa2]'
                    }`}>
                      {admin.avatar || admin.profileImage ? (
                          <img src={admin.avatar || admin.profileImage} alt={admin.name} className="w-full h-full object-cover" />
                      ) : (
                          <User size={20} className="opacity-90" strokeWidth={2.5} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <h3 className="text-xs font-bold text-gray-900 truncate">{admin.name}</h3>
                      </div>
                      <p className="text-[10px] text-gray-500 truncate">{admin.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap md:flex-nowrap gap-2 md:w-2/5 flex-1 items-center">
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border ${getRoleBadgeClasses(roleConfig.color)}`}>
                      <RoleIcon size={10} />
                      {roleConfig.label}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${accountStatus.colorClass}`}>
                      <AccountIcon size={10} />
                      {accountStatus.label}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${kycStatus.colorClass}`}>
                      <KycIcon size={10} />
                      {kycStatus.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 md:w-1/3 shrink-0">
                    <div className="text-[10px] text-gray-500 hidden xl:block">
                      <p className="truncate w-24"><Phone size={10} className="inline mr-1"/>{admin.phone || 'N/A'}</p>
                      <p className="truncate w-24"><Shield size={10} className="inline mr-1"/>{admin.department || 'N/A'}</p>
                    </div>

                    <div className="flex items-center gap-0.5 border-l border-gray-100 pl-2">
                      <button onClick={() => openDetail(admin)} className="p-1.5 hover:bg-blue-50 rounded text-gray-400 hover:text-[#004fa2] transition-colors" title="View Details"><Eye size={14} /></button>
                      
                      {admin.kycStatus === 'pending' && (
                        <button onClick={() => openKycReview(admin)} className="p-1.5 hover:bg-amber-50 rounded text-amber-500 hover:text-amber-600 transition-colors" title="Review KYC"><BadgeCheck size={14} /></button>
                      )}

                      <button onClick={() => navigate(`/admin/users/edit/${admin.id}`)} className="p-1.5 hover:bg-green-50 rounded text-gray-400 hover:text-green-600 transition-colors" title="Edit"><Edit size={14} /></button>
                      
                      {isDeactivated ? (
                        <button onClick={() => handleReactivate(admin)} className="p-1.5 hover:bg-green-50 rounded text-gray-400 hover:text-green-600 transition-colors" title="Reactivate"><Unlock size={14} /></button>
                      ) : (
                        <button onClick={() => handleDeactivate(admin)} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-600 transition-colors" title="Deactivate"><Lock size={14} /></button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                        Showing <span className="font-bold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredAdmins.length)}</span> of <span className="font-bold text-gray-900">{filteredAdmins.length}</span> administrators
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>
                        <div className="flex items-center gap-1 hidden sm:flex">
                            {[...Array(totalPages)].map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentPage(idx + 1)}
                                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${currentPage === idx + 1 ? 'bg-[#004fa2] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                        </div>
                        <span className="sm:hidden text-xs font-bold text-gray-900 mx-2">
                            {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
          </div>
        )}
      </div>

      {/* ─── KYC REVIEW MODAL ────────────────────────────── */}
      {showKycModal && selectedAdmin && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-6 transition-all duration-300" onClick={closeKycModal}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[96vh] h-[850px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            
            {/* Premium Header */}
            <div className="relative border-b border-gray-100 bg-white z-20 shrink-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-blue-50/80 to-transparent pointer-events-none"></div>
              <div className="px-4 py-4 sm:px-8 sm:py-5 flex flex-wrap items-start sm:items-center justify-between relative z-10 gap-3">
                <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md shadow-[#004fa2]/20 ring-4 ring-blue-50 shrink-0">
                    <BadgeCheck size={20} className="text-white sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight">KYC Verification</h2>
                    <p className="text-[11px] sm:text-sm text-gray-500 font-medium flex flex-wrap items-center gap-1.5 mt-0.5">
                      <span className="opacity-80">Reviewing documents for</span>
                      <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-md truncate max-w-[150px] sm:max-w-[200px]">{selectedAdmin.name}</span>
                    </p>
                  </div>
                </div>
                <button onClick={closeKycModal} className="absolute right-4 top-4 sm:static p-2 sm:p-2.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors bg-gray-50 border border-gray-100 shrink-0">
                  <X size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Main Body */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden bg-[#f8fafc]">
              
              {/* Left Column: Document Viewer (approx 65%) */}
              <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200/60 relative pb-6 lg:pb-0 shrink-0">
                
                {/* Top Controls Bar */}
                <div className="px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/60 backdrop-blur-md border-b border-gray-200/40 z-10 sticky top-0">
                  
                  {/* Scrollable Tabs */}
                  <div className="w-full sm:w-auto overflow-x-auto hide-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
                    <div className="inline-flex bg-gray-100/80 p-1 rounded-xl outline outline-1 outline-gray-200 shrink-0">
                      <button 
                        onClick={() => { setActiveDocument('id'); setZoomLevel(1); }}
                        className={`flex items-center gap-2 px-3 sm:px-4 py-2 mt-0 rounded-lg text-[11px] sm:text-sm font-bold transition-all whitespace-nowrap ${
                          activeDocument === 'id' 
                          ? 'bg-white text-[#004fa2] shadow-sm ring-1 ring-black/5' 
                          : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <IdCard size={14} className={activeDocument === 'id' ? 'text-[#004fa2] sm:w-4 sm:h-4' : 'text-gray-400 sm:w-4 sm:h-4'} />
                        Government ID
                      </button>
                      <button 
                        onClick={() => { setActiveDocument('address'); setZoomLevel(1); }}
                        className={`flex items-center gap-2 px-3 sm:px-4 py-2 mt-0 rounded-lg text-[11px] sm:text-sm font-bold transition-all whitespace-nowrap ${
                          activeDocument === 'address' 
                          ? 'bg-white text-[#004fa2] shadow-sm ring-1 ring-black/5' 
                          : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <FileText size={14} className={activeDocument === 'address' ? 'text-[#004fa2] sm:w-4 sm:h-4' : 'text-gray-400 sm:w-4 sm:h-4'} />
                        Proof of Address
                      </button>
                    </div>
                  </div>
                  
                  {/* Status indicator */}
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-50 border border-amber-200 rounded-xl shadow-sm shrink-0 self-start sm:self-auto">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                    <span className="text-[10px] sm:text-xs font-black text-amber-800 uppercase tracking-widest hidden sm:inline-block">Awaiting Verification</span>
                    <span className="text-[10px] sm:text-xs font-black text-amber-800 uppercase tracking-widest sm:hidden">Awaiting</span>
                  </div>
                </div>

                {/* Viewer Area */}
                <div className="flex-1 w-full bg-gradient-to-b from-gray-50 to-gray-100/50 relative overflow-hidden group flex items-center justify-center min-h-[350px] lg:min-h-0 p-4">
                  
                  {/* Backdrop Grid Pattern */}
                  <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #004fa210 1px, transparent 1px), linear-gradient(to bottom, #004fa210 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-transparent to-transparent pointer-events-none"></div>

                  {/* Simulated Document Wrapper */}
                  <div 
                    className="transform origin-center transition-transform duration-300 ease-out z-10 w-full max-w-[500px]"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    {activeDocument === 'id' ? (
                        <div className="w-full aspect-[1.6/1] bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl shadow-xl border border-blue-200/60 p-4 sm:p-6 flex flex-col relative overflow-hidden backdrop-blur-md hover:shadow-2xl transition-all duration-500">
                          <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc]" />
                          <div className="absolute -right-16 -top-16 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl"></div>
                          
                          <div className="flex justify-between items-start mb-4 sm:mb-6 w-full relative z-10">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white/80 rounded-xl flex items-center justify-center shadow-sm border border-blue-100/50">
                                <Shield size={20} className="text-[#004fa2] sm:w-7 sm:h-7" />
                              </div>
                              <div>
                                <div className="text-[8px] sm:text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase">Republic of Mockland</div>
                                <div className="text-base sm:text-lg font-black text-[#004fa2] tracking-tight">Identity Card</div>
                              </div>
                            </div>
                            <ImageIcon size={24} className="text-gray-300 hidden sm:block" />
                          </div>
                          <div className="flex gap-4 sm:gap-6 mt-auto w-full relative z-10">
                            <div className="w-20 h-24 sm:w-28 sm:h-36 bg-gray-200/80 rounded-xl shrink-0 border-2 border-white shadow-md flex items-center justify-center overflow-hidden bg-white">
                              {selectedAdmin.avatar ? (
                                <img src={selectedAdmin.avatar} alt="Avatar" className="w-full h-full object-cover" />
                              ) : (
                                <User size={32} className="text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1 flex flex-col justify-end pb-1 space-y-2 sm:space-y-4">
                              <div>
                                <div className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-black">Full Name</div>
                                <div className="font-black text-gray-800 text-sm sm:text-lg uppercase tracking-wide truncate">{selectedAdmin.name}</div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                <div>
                                  <div className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-black">Doc No.</div>
                                  <div className="font-mono text-gray-700 text-xs sm:text-sm font-semibold">ID-98440-23X</div>
                                </div>
                                <div>
                                  <div className="text-[8px] sm:text-[10px] text-gray-400 uppercase tracking-widest font-black">Date of Birth</div>
                                  <div className="font-mono text-gray-700 text-xs sm:text-sm font-semibold">1985-04-12</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Hologram */}
                          <div className="absolute bottom-4 right-4 w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-yellow-300/40 bg-gradient-to-tr from-yellow-200/30 to-purple-300/30 backdrop-blur-md flex items-center justify-center shadow-lg">
                            <BadgeCheck size={20} className="text-yellow-600/60 sm:w-7 sm:h-7" />
                          </div>
                        </div>
                    ) : (
                        <div className="w-full aspect-[1/1.414] max-w-[420px] bg-white rounded-xl shadow-xl border border-gray-200 p-6 sm:p-8 flex flex-col relative mx-auto">
                          <div className="flex justify-between items-start mb-6 sm:mb-8 border-b border-gray-100 pb-4 sm:pb-6">
                             <div>
                               <div className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight">GLOBAL BANK</div>
                               <div className="text-[10px] sm:text-xs text-gray-400 mt-1 font-semibold uppercase tracking-wider">Reliable Since 1999</div>
                             </div>
                             <div className="text-right">
                               <div className="font-bold text-gray-800 text-sm sm:text-base">Statement</div>
                               <div className="text-[10px] sm:text-xs text-gray-500 font-mono mt-1 bg-gray-100 px-2 py-1 rounded inline-block">Oct 2025</div>
                             </div>
                          </div>
                          <div className="space-y-4 sm:space-y-6">
                            <div>
                              <div className="text-[9px] sm:text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1.5">Account Holder</div>
                              <div className="font-black text-gray-800 text-base sm:text-lg">{selectedAdmin.name}</div>
                              <div className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                                42 Wallaby Way<br/>
                                Sydney, NSW 2000<br/>
                                Australia
                              </div>
                            </div>
                            <div className="space-y-3 pt-4 border-t border-gray-100/60 opacity-50">
                              <div className="h-3 sm:h-4 bg-gray-200 rounded w-full" />
                              <div className="h-3 sm:h-4 bg-gray-200 rounded w-5/6" />
                              <div className="h-3 sm:h-4 bg-gray-200 rounded w-4/6" />
                            </div>
                          </div>
                        </div>
                    )}
                  </div>
                  
                  {/* Floating Action Controls for Zoom / Image View */}
                  <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 flex items-center bg-white/95 backdrop-blur-md shadow-lg border border-gray-200/50 rounded-2xl p-1.5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 lg:translate-y-2 lg:group-hover:translate-y-0 z-20">
                    <button onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.5))} className="p-2 sm:p-2.5 hover:bg-gray-100/80 text-gray-600 rounded-xl transition-colors" title="Zoom Out">
                      <ZoomOut size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                    <div className="w-px h-6 bg-gray-200 mx-1" />
                    <span className="w-10 sm:w-12 text-center text-[10px] sm:text-xs font-bold text-gray-600 font-mono">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <div className="w-px h-6 bg-gray-200 mx-1" />
                    <button onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 3))} className="p-2 sm:p-2.5 hover:bg-gray-100/80 text-gray-600 rounded-xl transition-colors" title="Zoom In">
                      <ZoomIn size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                    <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block" />
                    <button onClick={() => setZoomLevel(1)} className="p-2 sm:p-2.5 hover:bg-blue-50 text-[#004fa2] rounded-xl transition-colors hidden sm:block" title="Reset Zoom">
                      <Maximize size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Info & Actions (approx 35%) */}
              <div className="w-full lg:w-[450px] flex flex-col bg-white lg:shadow-[-12px_0_30px_-15px_rgba(0,0,0,0.05)] z-20 shrink-0 lg:h-full relative border-t lg:border-t-0">
                
                {/* Right Tabs */}
                <div className="grid grid-cols-2 bg-gray-50/50 p-2 sm:p-3 gap-2 border-b border-gray-100 shrink-0 sticky top-0 z-10 backdrop-blur-sm">
                  <button 
                    onClick={() => setActiveKycTab('details')}
                    className={`flex justify-center items-center gap-2 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 ${
                      activeKycTab === 'details' 
                      ? 'bg-white text-[#004fa2] shadow-sm border border-gray-200/50 ring-1 ring-black/5' 
                      : 'text-gray-500 hover:bg-gray-100/80 border border-transparent'
                    }`}
                  >
                    <User size={16} className={activeKycTab === 'details' ? 'text-[#004fa2]' : 'text-gray-400'} />
                    User Details
                  </button>
                  <button 
                    onClick={() => setActiveKycTab('history')}
                    className={`flex justify-center items-center gap-2 py-2.5 sm:py-3 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 ${
                      activeKycTab === 'history' 
                      ? 'bg-white text-[#004fa2] shadow-sm border border-gray-200/50 ring-1 ring-black/5' 
                      : 'text-gray-500 hover:bg-gray-100/80 border border-transparent'
                    }`}
                  >
                    <History size={16} className={activeKycTab === 'history' ? 'text-[#004fa2]' : 'text-gray-400'} />
                    Audit Log
                  </button>
                </div>

                {/* Info Area */}
                <div className="flex-1 lg:overflow-y-auto w-full p-4 sm:p-6 lg:scrollbar-thin lg:scrollbar-thumb-gray-200 pb-8 lg:pb-6">
                  {activeKycTab === 'details' ? (
                    <div className="space-y-6 sm:space-y-8 animate-in slide-in-from-right-4 duration-300">
                      
                      {/* Premium Information Match Card */}
                      <div className="bg-gradient-to-br from-[#004fa2]/[0.03] to-blue-50/20 border border-[#004fa2]/10 rounded-2xl p-4 sm:p-6 relative overflow-hidden shadow-sm">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100/40 rounded-full blur-2xl pointer-events-none"></div>
                        
                        <div className="flex items-center gap-2.5 mb-5 relative z-10">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 shadow-sm border border-emerald-200/50 mt-1 sm:mt-0">
                            <CheckCircle size={16} className="text-emerald-600" />
                          </div>
                          <h4 className="text-sm font-black text-gray-900 tracking-tight">System Match Check</h4>
                        </div>
                        
                        <div className="space-y-4 relative z-10">
                          <div className="flex justify-between items-center group">
                            <span className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide group-hover:text-blue-600 transition-colors">Provided Name</span>
                            <span className="text-sm sm:text-base font-bold text-gray-900 truncate max-w-[140px] sm:max-w-[200px] text-right">{selectedAdmin.name}</span>
                          </div>
                          <div className="h-px w-full bg-gradient-to-r from-gray-200/60 via-gray-200 to-gray-200/60" />
                          <div className="flex justify-between items-center group">
                            <span className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide group-hover:text-blue-600 transition-colors">Email Address</span>
                            <span className="text-xs sm:text-sm font-bold text-gray-900 truncate max-w-[140px] sm:max-w-[200px] text-right">{selectedAdmin.email}</span>
                          </div>
                          <div className="h-px w-full bg-gradient-to-r from-gray-200/60 via-gray-200 to-gray-200/60" />
                          <div className="flex justify-between items-center group">
                            <span className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide group-hover:text-blue-600 transition-colors">System Role</span>
                            <span className="text-xs sm:text-sm font-bold text-gray-900 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md">{ROLE_LABELS[selectedAdmin.role] || selectedAdmin.role}</span>
                          </div>
                        </div>
                      </div>

                      {/* Elevated Extracted Details */}
                      <div>
                        <div className="flex items-center gap-2 mb-4 px-1">
                           <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                           <h4 className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-[0.15em]">Extracted from Documents</h4>
                        </div>
                        
                        <div className="space-y-3 sm:space-y-4">
                          <div className="bg-white hover:bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5 flex justify-between items-center transition-all shadow-sm hover:shadow-md hover:border-gray-200 group">
                            <div>
                              <div className="text-[9px] sm:text-[10px] uppercase text-gray-400 font-bold mb-1.5 tracking-widest group-hover:text-[#004fa2] transition-colors">Extracted Name</div>
                              <div className="font-black text-gray-900 text-sm sm:text-base tracking-tight truncate max-w-[150px] sm:max-w-[220px]">{selectedAdmin.name}</div>
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                               <BadgeCheck size={18} className="text-emerald-500 sm:w-5 sm:h-5" />
                            </div>
                          </div>
                          
                          <div className="bg-white hover:bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5 flex justify-between items-center transition-all shadow-sm hover:shadow-md hover:border-gray-200 group">
                            <div>
                               <div className="text-[9px] sm:text-[10px] uppercase text-gray-400 font-bold mb-1.5 tracking-widest group-hover:text-amber-500 transition-colors">Document Expiry Date</div>
                               <div className="font-black text-gray-900 text-sm sm:text-base tracking-tight">14 Oct 2030</div>
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                               <Calendar size={16} className="text-gray-400 sm:w-4 sm:h-4" />
                            </div>
                          </div>
                          
                          <div className="bg-white hover:bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5 transition-all shadow-sm hover:shadow-md hover:border-[#004fa2]/30 group">
                            <div className="flex items-center justify-between mb-3">
                              <div className="text-[9px] sm:text-[10px] uppercase text-gray-400 font-bold tracking-widest group-hover:text-[#004fa2] transition-colors">Face Match Confidence</div>
                              <span className="text-xs sm:text-sm font-black text-[#004fa2] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">94%</span>
                            </div>
                            <div className="flex items-center gap-3 w-full mt-1">
                              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200 inset-shadow-sm">
                                <div className="h-full bg-gradient-to-r from-[#004fa2] to-[#0066cc] w-[94%] rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-0 relative before:absolute before:inset-0 before:ml-4 sm:before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-200 before:via-gray-200 before:to-transparent pt-2 pb-10 animate-in slide-in-from-right-4 duration-300">
                      
                      {/* Timeline Item 1 */}
                      <div className="relative flex items-start gap-4 sm:gap-6 mb-8 group is-active">
                        <div className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full border-4 border-white bg-amber-500 shrink-0 shadow-md ring-1 ring-amber-100 z-10 mt-1 sm:mt-0">
                          <Clock size={16} className="text-white sm:h-5 sm:w-5" />
                        </div>
                        <div className="flex-1 p-4 sm:p-5 rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50/80 to-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-2 h-full bg-amber-500/20"></div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1.5 sm:gap-0">
                            <h4 className="text-sm font-black text-gray-900 tracking-tight">Awaiting Review</h4>
                            <span className="text-[10px] sm:text-[11px] text-amber-800 font-bold tracking-wide bg-amber-100 px-2 py-0.5 rounded-md self-start sm:self-auto">Just now</span>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed font-medium">Documents are currently queued and waiting for super-admin verification.</p>
                        </div>
                      </div>
                      
                      {/* Timeline Item 2 */}
                      <div className="relative flex items-start gap-4 sm:gap-6 mb-8 group">
                        <div className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full border-4 border-white bg-[#004fa2] shrink-0 shadow-md ring-1 ring-blue-100 z-10 mt-1 sm:mt-0">
                          <Upload size={16} className="text-white sm:h-5 sm:w-5" />
                        </div>
                        <div className="flex-1 p-4 sm:p-5 rounded-2xl border border-gray-200/80 bg-white shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1.5 sm:gap-0">
                            <h4 className="text-sm font-black text-gray-900 tracking-tight">Documents Uploaded</h4>
                            <span className="text-[10px] sm:text-[11px] text-gray-500 font-bold tracking-wide bg-gray-100 px-2 py-0.5 rounded-md self-start sm:self-auto">Today, 09:42 AM</span>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed font-medium">User successfully submitted Government ID & Proof of Address documents.</p>
                        </div>
                      </div>

                      {/* Timeline Item 3 */}
                      <div className="relative flex items-start gap-4 sm:gap-6 group">
                        <div className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full border-4 border-white bg-gray-400 shrink-0 shadow-md ring-1 ring-gray-100 z-10 mt-1 sm:mt-0">
                          <User size={16} className="text-white sm:h-5 sm:w-5" />
                        </div>
                        <div className="flex-1 p-4 sm:p-5 rounded-2xl border border-gray-200/80 bg-white shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1.5 sm:gap-0">
                            <h4 className="text-sm font-black text-gray-900 tracking-tight">Account Created</h4>
                            <span className="text-[10px] sm:text-[11px] text-gray-500 font-bold tracking-wide bg-gray-100 px-2 py-0.5 rounded-md self-start sm:self-auto">3 days ago</span>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed font-medium">Admin account established by Super Admin.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Highly Professional Actions Bottom Bar */}
                <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50/50 shrink-0 shadow-[0_-8px_20px_rgba(0,0,0,0.02)] relative z-30 lg:mt-auto mt-0">
                  {showRejectDropdown ? (
                    <div className="space-y-4 animate-in slide-in-from-bottom-3 duration-300">
                      <div>
                        <label className="block text-xs font-black text-gray-700 mb-2 uppercase tracking-widest px-1">Reason for Rejection</label>
                        <select 
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          className="w-full text-sm border-gray-300 rounded-xl focus:border-red-500 focus:ring-red-500/20 py-3.5 bg-white shadow-sm font-medium"
                        >
                          <option value="">Select a reason...</option>
                          <option value="Document is blurry or illegible">Document is blurry or illegible</option>
                          <option value="Document expired">Document expired</option>
                          <option value="Name does not match account">Name does not match account</option>
                          <option value="Document is cropped or incomplete">Document is cropped or incomplete</option>
                          <option value="Unsupported document type">Unsupported document type</option>
                        </select>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setShowRejectDropdown(false)}
                          className="px-4 py-3 sm:py-3.5 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 text-gray-700 font-bold rounded-xl text-xs sm:text-sm transition-all flex-[0.8] shadow-sm active:scale-[0.98]"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => handleKycAction('reject')}
                          disabled={!rejectReason}
                          className="px-4 py-3 sm:py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:from-red-400 disabled:to-red-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex-1 shadow-md shadow-red-500/20 flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                          <ShieldX size={18} className="sm:w-5 sm:h-5" />
                          Confirm Reject
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Warning bar replacing floating text */}
                      <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 sm:p-4 flex gap-3 items-start shadow-sm mb-2 sm:mb-4">
                        <div className="bg-amber-100 p-1.5 rounded-lg shrink-0 mt-0.5 shadow-[0_2px_4px_rgba(245,158,11,0.2)]">
                          <AlertCircle size={16} className="text-amber-600" />
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs text-amber-800 font-medium leading-relaxed">
                            <span className="font-bold underline decoration-amber-300 decoration-2 underline-offset-2">Action Required:</span> Ensure all user information precisely matches the uploaded documents before approving.
                          </p>
                        </div>
                      </div>
                      
                      {/* Main action buttons grouped */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                          onClick={() => setShowRejectDropdown(true)}
                          className="w-full sm:flex-[0.85] py-3.5 sm:py-4 px-3 sm:px-4 bg-white border-2 border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 font-black rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm group active:scale-[0.98]"
                        >
                          <XCircle size={18} className="text-red-400 group-hover:text-red-600 transition-colors sm:w-5 sm:h-5" />
                          Reject Review
                        </button>
                        <button 
                          onClick={() => handleKycAction('approve')}
                          className="w-full sm:flex-[1.15] py-3.5 sm:py-4 px-3 sm:px-4 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 border border-emerald-400/20 group active:scale-[0.98]"
                        >
                          <BadgeCheck size={18} className="text-emerald-100 group-hover:scale-110 transition-transform sm:w-5 sm:h-5" />
                          Verify & Approve
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300" onClick={() => setShowDetailModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
              
              {/* Premium Header Profile Section */}
              <div className="relative pt-8 pb-6 px-6 sm:px-8 border-b border-gray-100 flex-shrink-0 bg-gray-50/30 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none opacity-40 ${isDeactivated ? 'bg-red-400' : 'bg-[#004fa2]'}`}></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wMikiLz48L3N2Zz4=')] opacity-50 z-0"></div>
                
                <button onClick={() => setShowDetailModal(false)} className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full text-gray-400 hover:text-gray-600 shadow-sm transition-all z-10 border border-gray-100">
                  <X size={18} />
                </button>

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-white font-bold overflow-hidden shrink-0 shadow-md ring-4 ring-white relative ${
                    isDeactivated ? 'bg-gradient-to-br from-gray-400 to-gray-600' : 'bg-gradient-to-br from-[#004fa2] to-[#0066cc]'
                  }`}>
                    {selectedAdmin.avatar || selectedAdmin.profileImage ? (
                        <img src={selectedAdmin.avatar || selectedAdmin.profileImage} alt={selectedAdmin.name} className="w-full h-full object-cover" />
                    ) : (
                        <User size={36} className="opacity-90" strokeWidth={2.5} />
                    )}
                    {isDeactivated && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                         <ShieldX size={28} className="text-white opacity-80" strokeWidth={2} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 mt-2 sm:mt-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate tracking-tight">{selectedAdmin.name}</h2>
                      {isDeactivated && <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider rounded-md border border-red-200">Deactivated</span>}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                      <Mail size={14} className="opacity-70" />
                      <span className="truncate">{selectedAdmin.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Information Body */}
              <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6 bg-gray-50/50">
                
                {/* 3-Column Status Bar (Role, Account, KYC) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all hover:border-[#004fa2]/30 flex flex-col items-start gap-2 relative overflow-hidden group">
                     <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-[#004fa2] transition-colors">Assigned Role</div>
                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${getRoleBadgeClasses(roleConfig.color)} bg-opacity-30`}>
                        <div className="p-1 rounded bg-white shadow-sm"><Shield size={12} className={roleConfig.color === 'blue' ? 'text-blue-600' : 'text-gray-600'} /></div>
                        {roleConfig.label}
                      </span>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all hover:border-gray-200 flex flex-col items-start gap-2 group">
                     <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Status</div>
                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${accountStatus.colorClass} border-current border-opacity-20 bg-opacity-30`}>
                        <div className="p-1 rounded bg-white shadow-sm"><DetailAccountIcon size={12} className="opacity-90" /></div>
                        {accountStatus.label}
                      </span>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all hover:border-gray-200 flex flex-col items-start gap-2 group">
                     <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">KYC Status</div>
                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${kycStatus.colorClass} border-current border-opacity-20 bg-opacity-30`}>
                        <div className="p-1 rounded bg-white shadow-sm"><DetailKycIcon size={12} className="opacity-90" /></div>
                        {kycStatus.label}
                      </span>
                  </div>
                </div>

                {/* 2-Column Details Grid */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                    <div className="p-4 sm:p-5 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                         <Briefcase size={12} />
                         Department
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{selectedAdmin.department || 'Not Assigned'}</p>
                    </div>
                    <div className="p-4 sm:p-5 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                         <Phone size={12} />
                         Phone Number
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{selectedAdmin.phone || 'Not Provided'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 border-t divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border-gray-100">
                    <div className="p-4 sm:p-5 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                         <Calendar size={12} />
                         Account Created
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{selectedAdmin.createdAt ? new Date(selectedAdmin.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown'}</p>
                    </div>
                    <div className="p-4 sm:p-5 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                         <Clock size={12} />
                         Last Known Login
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{selectedAdmin.lastLoginAt ? new Date(selectedAdmin.lastLoginAt).toLocaleString() : 'Never logged in'}</p>
                    </div>
                  </div>
                </div>

                {/* Status Warnings */}
                <div className="space-y-3">
                  {selectedAdmin.accountStatus === 'pending_password' && (
                    <div className="bg-amber-50/80 border border-amber-200/50 rounded-xl p-4 flex gap-4 transition-all">
                      <div className="mt-0.5"><KeyRound size={20} className="text-amber-500" /></div>
                      <div>
                        <h4 className="text-sm font-bold text-amber-900">Pending Setup Activation</h4>
                        <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                          This administrator is required to set a new password on their next login session to fully activate their account privileges.
                        </p>
                      </div>
                    </div>
                  )}

                  {isDeactivated && (
                    <div className="bg-red-50/80 border border-red-200/50 rounded-xl p-4 flex items-start gap-4 relative overflow-hidden transition-all">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
                      <div className="mt-0.5 relative z-10"><ShieldX size={20} className="text-red-600" /></div>
                      <div className="relative z-10">
                        <h4 className="text-sm font-bold text-red-900">Security: Access Revoked</h4>
                        <p className="text-xs text-red-800 mt-1 leading-relaxed font-medium">
                          {selectedAdmin.deactivatedAt
                            ? `This account was permanently offboarded on ${new Date(selectedAdmin.deactivatedAt).toLocaleDateString()}.`
                            : 'This account has been deactivated from all systems.'
                          }
                        </p>
                        {selectedAdmin.deactivationReason && (
                          <div className="mt-2 text-xs bg-white/60 p-2.5 rounded-lg border border-red-100 inline-block text-red-900">
                            <span className="font-bold">Reason:</span> {selectedAdmin.deactivationReason}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Sticky Action Footer */}
              <div className="px-6 sm:px-8 py-5 border-t border-gray-100 bg-white shrink-0 flex flex-col sm:flex-row items-center gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.02)] relative z-10">
                <button onClick={() => { setShowDetailModal(false); navigate(`/admin/users/edit/${selectedAdmin.id}`); }} className="w-full sm:flex-1 px-5 py-3.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold text-[13px] sm:text-sm flex items-center justify-center gap-2 transition-colors">
                  <Edit size={16} className="text-gray-400" />
                  Edit User Details
                </button>
                {isDeactivated ? (
                  <button onClick={() => { setShowDetailModal(false); handleReactivate(selectedAdmin); }} className="w-full sm:flex-1 px-5 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-md shadow-emerald-500/20 rounded-xl font-bold text-[13px] sm:text-sm flex items-center justify-center gap-2 transition-all">
                    <Unlock size={16} />
                    Restore Access
                  </button>
                ) : (
                  <button onClick={() => { setShowDetailModal(false); handleDeactivate(selectedAdmin); }} className="w-full sm:flex-1 px-5 py-3.5 bg-white border border-red-200 hover:bg-red-50 text-red-600 rounded-xl font-bold text-[13px] sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm group">
                    <Lock size={16} className="text-red-500 group-hover:scale-110 transition-transform" />
                    Revoke Access
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
