/**
 * Users Management Page (Super Admin Only)
 * Manage all users, roles, and permissions
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, updateUser, changeUserRole, deleteUser } from '../../../store/slices/usersSlice';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import DataTable from '../../../components/admin/shared/DataTable';
import StatusBadge from '../../../components/admin/shared/StatusBadge';
import LoadingSpinner from '../../../components/admin/shared/LoadingSpinner';
import { usePermissions } from '../../../hooks/usePermissions';
import { ROLES, ROLE_LABELS, USER_STATUSES } from '../../../utils/constants';
import { UserPlus, Edit, Trash2, Shield, Mail, User, Phone, Calendar } from 'lucide-react';

const UsersPage = () => {
  const dispatch = useDispatch();
  const { isSuperAdmin } = usePermissions();
  const { items: users, loading, pagination } = useSelector((state) => state.users);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: ROLES.VIEWER,
    status: USER_STATUSES.ACTIVE,
    password: ''
  });

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 20 }));
  }, [dispatch]);

  // Redirect if not super admin (double protection)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      dispatch(updateUser({ id: editingUser.id, data: formData }));
    } else {
      dispatch(createUser(formData));
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      status: user.status,
      password: '' // Don't populate password for editing
    });
    setShowModal(true);
  };

  const handleDelete = (user) => {
    dispatch(openConfirmDialog({
      title: 'Delete User',
      message: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      isDangerous: true,
      onConfirm: () => dispatch(deleteUser(user.id))
    }));
  };

  const handleChangeRole = (user, newRole) => {
    dispatch(openConfirmDialog({
      title: 'Change User Role',
      message: `Change ${user.name}'s role from ${ROLE_LABELS[user.role]} to ${ROLE_LABELS[newRole]}?`,
      onConfirm: () => dispatch(changeUserRole({ userId: user.id, role: newRole }))
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: ROLES.VIEWER,
      status: USER_STATUSES.ACTIVE,
      password: ''
    });
    setEditingUser(null);
  };

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true, render: (value) => ROLE_LABELS[value] },
    { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} /> },
    { key: 'createdAt', label: 'Joined', sortable: true, render: (value) => new Date(value).toLocaleDateString() }
  ];

  const actions = [
    {
      label: 'Edit',
      icon: Edit,
      onClick: handleEdit,
      variant: 'primary'
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: handleDelete,
      variant: 'danger'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-1">Manage users, roles, and permissions</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <UserPlus size={20} />
            Add User
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{users.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Super Admins</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {users.filter(u => u.role === ROLES.SUPER_ADMIN).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Admins</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {users.filter(u => u.role === ROLES.ADMIN).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Active Users</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {users.filter(u => u.status === USER_STATUSES.ACTIVE).length}
            </p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow">
          <DataTable
            columns={columns}
            data={users}
            loading={loading}
            actions={actions}
            pagination={pagination}
            onPageChange={(page) => dispatch(fetchUsers({ page, limit: 20 }))}
          />
        </div>
      </div>

      {/* Create/Edit User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingUser ? 'Edit User' : 'Create New User'}
              </h2>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                    placeholder="+233 20 000 0000"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                  required
                >
                  {Object.entries(ROLE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                  required
                >
                  <option value={USER_STATUSES.ACTIVE}>Active</option>
                  <option value={USER_STATUSES.SUSPENDED}>Suspended</option>
                  <option value={USER_STATUSES.INACTIVE}>Inactive</option>
                </select>
              </div>

              {/* Password (only for new users or if changing) */}
              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                    placeholder="••••••••"
                    required={!editingUser}
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingUser ? 'Update User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UsersPage;
