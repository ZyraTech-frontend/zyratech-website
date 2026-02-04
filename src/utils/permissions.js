/**
 * Permission Management Utilities
 */

import { PERMISSIONS, ROLES } from './constants';

/**
 * Check if a user has a specific permission
 * @param {string} userRole - User's role
 * @param {string} permission - Permission to check
 * @returns {boolean}
 */
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  const allowedRoles = PERMISSIONS[permission];
  return allowedRoles?.includes(userRole) || false;
};

/**
 * Check if user can perform action on content
 */
export const canViewContent = (userRole) => {
  return hasPermission(userRole, 'VIEW_COURSES');
};

export const canCreateContent = (userRole) => {
  return hasPermission(userRole, 'CREATE_COURSE');
};

export const canEditContent = (userRole) => {
  return hasPermission(userRole, 'EDIT_COURSE');
};

export const canDeleteContent = (userRole) => {
  return hasPermission(userRole, 'DELETE_COURSE');
};

export const canPublishContent = (userRole) => {
  return hasPermission(userRole, 'PUBLISH_COURSE');
};

/**
 * Check if user can manage payments
 */
export const canViewPayments = (userRole) => {
  return hasPermission(userRole, 'VIEW_PAYMENTS');
};

export const canManagePayments = (userRole) => {
  return userRole === ROLES.SUPER_ADMIN || userRole === ROLES.ADMIN;
};

export const canRefundPayment = (userRole) => {
  return userRole === ROLES.SUPER_ADMIN;
};

export const canViewRevenue = (userRole) => {
  return userRole === ROLES.SUPER_ADMIN;
};

/**
 * Check if user can manage users
 */
export const canManageUsers = (userRole) => {
  return userRole === ROLES.SUPER_ADMIN;
};

export const canViewActivityLogs = (userRole) => {
  return userRole === ROLES.SUPER_ADMIN;
};

export const canAssignRoles = (userRole) => {
  return userRole === ROLES.SUPER_ADMIN;
};

/**
 * Check if user can manage settings
 */
export const canEditSettings = (userRole) => {
  return userRole === ROLES.SUPER_ADMIN;
};

export const canEditPaymentKeys = (userRole) => {
  return userRole === ROLES.SUPER_ADMIN;
};

/**
 * Check if user is super admin
 */
export const isSuperAdmin = (userRole) => {
  return userRole === ROLES.SUPER_ADMIN;
};

export const isAdmin = (userRole) => {
  return userRole === ROLES.ADMIN;
};

export const isEditor = (userRole) => {
  return userRole === ROLES.EDITOR;
};

export const isViewer = (userRole) => {
  return userRole === ROLES.VIEWER;
};

/**
 * Check if user has elevated privileges
 */
export const isPrivilegedUser = (userRole) => {
  return [ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(userRole);
};

/**
 * Get all permissions for a role
 */
export const getPermissionsForRole = (userRole) => {
  const rolePermissions = [];
  Object.entries(PERMISSIONS).forEach(([permission, roles]) => {
    if (roles.includes(userRole)) {
      rolePermissions.push(permission);
    }
  });
  return rolePermissions;
};
