/**
 * Permission Helper Utilities
 * Instant permission checks using user.permissions from auth state (NO API CALLS)
 * Backend team recommendation: Use Option 2 (Prefetch with Caching)
 */

import { addNotification } from '../store/slices/uiSlice';

/**
 * Permission to Department Mapping
 * These permissions are assigned based on the user's department
 */
export const PERMISSION_TO_DEPARTMENT = {
  projects: 'Software',
  blog_articles: 'Media',
  gallery: 'Media',
  training_courses: 'Training',
  transactions: 'CAO',
  jobs: 'CAO',
  enrollments: 'Training',
  content: 'Media',
  partnerships: 'Media',
  messages: 'Software/CAO',
  settings: 'Software'
};

/**
 * Check if user has a specific permission
 * @param {Array<string>} userPermissions - Array of permission strings from user object
 * @param {string} permission - Permission to check (e.g., 'projects', 'blog_articles')
 * @returns {boolean} True if user has permission, false otherwise
 */
export const hasPermission = (userPermissions, permission) => {
  if (!Array.isArray(userPermissions)) return false;
  return userPermissions.includes(permission);
};

/**
 * Check if user is a super admin
 * Super admins bypass all permission checks
 * @param {string} userRole - User's role (e.g., 'super_admin', 'Super Admin')
 * @returns {boolean} True if super admin, false otherwise
 */
export const isSuperAdmin = (userRole) => {
  if (!userRole) return false;
  return userRole.toLowerCase() === 'super_admin' || userRole.toLowerCase() === 'super admin';
};

/**
 * Check permission and show user-friendly error if denied
 * Uses error notification for better UX
 * @param {Array<string>} userPermissions - Array of user permissions
 * @param {string} userRole - User's role (to check for super admin)
 * @param {string} permission - Permission to check
 * @param {function} dispatch - Redux dispatch function
 * @param {string} permissionName - Human-readable permission name (e.g., 'Software Projects')
 * @param {string} department - Department associated with this permission
 * @returns {boolean} True if permission granted, false otherwise
 */
export const checkPermissionAndShowError = (
  userPermissions,
  userRole,
  permission,
  dispatch,
  permissionName,
  department
) => {
  // Super admins bypass all checks
  if (isSuperAdmin(userRole)) {
    return true;
  }

  // Check if user has permission
  if (hasPermission(userPermissions, permission)) {
    return true;
  }

  // Permission denied - show error notification
  const errorMessage = {
    title: 'Permission Required',
    message: `You do not have permission to manage ${permissionName || 'this resource'}.`,
    details: `This action requires the '${permission}' permission, which is typically assigned to the ${department || 'appropriate'} department. Please contact your Super Administrator if you need access.`,
    errorCode: 'PERMISSION_DENIED',
    department: department,
    contact: 'admin@zyratechhub.com'
  };

  // Dispatch error notification
  if (dispatch) {
    dispatch(addNotification({
      type: 'error',
      title: errorMessage.title,
      message: errorMessage.message,
      description: errorMessage.details,
      duration: 5000
    }));
  }

  return false;
};

/**
 * Utility to check multiple permissions at once
 * @param {Array<string>} userPermissions - Array of user permissions
 * @param {Array<string>} requiredPermissions - Array of permissions to check
 * @param {string} mode - 'all' = all required, 'any' = at least one required
 * @returns {boolean}
 */
export const checkMultiplePermissions = (
  userPermissions,
  requiredPermissions,
  mode = 'all'
) => {
  if (!Array.isArray(userPermissions) || !Array.isArray(requiredPermissions)) {
    return false;
  }

  if (mode === 'all') {
    return requiredPermissions.every(perm => hasPermission(userPermissions, perm));
  } else if (mode === 'any') {
    return requiredPermissions.some(perm => hasPermission(userPermissions, perm));
  }

  return false;
};

/**
 * Get permission requirements for a specific feature
 * Used to determine what to show/hide in UI
 * @param {string} feature - Feature name (e.g., 'projects', 'blog_articles')
 * @returns {Object} Permission info including department and description
 */
export const getPermissionInfo = (feature) => {
  const department = PERMISSION_TO_DEPARTMENT[feature];
  
  const permissionDescriptions = {
    projects: {
      department: 'Software',
      description: 'Create and manage software project requests',
      actions: ['create', 'edit', 'delete', 'approve']
    },
    blog_articles: {
      department: 'Media',
      description: 'Create and manage blog articles',
      actions: ['create', 'edit', 'delete', 'publish']
    },
    gallery: {
      department: 'Media',
      description: 'Manage gallery and media',
      actions: ['upload', 'edit', 'delete']
    },
    training_courses: {
      department: 'Training',
      description: 'Create and manage training courses',
      actions: ['create', 'edit', 'delete', 'publish']
    },
    transactions: {
      department: 'CAO',
      description: 'Manage financial transactions',
      actions: ['view', 'verify', 'refund']
    },
    jobs: {
      department: 'CAO',
      description: 'Create and manage job postings',
      actions: ['create', 'edit', 'delete', 'close']
    },
    enrollments: {
      department: 'Training',
      description: 'Manage course enrollments',
      actions: ['view', 'approve', 'reject']
    },
    content: {
      department: 'Media',
      description: 'Manage FAQs, Testimonials, Newsletter',
      actions: ['create', 'edit', 'delete']
    },
    partnerships: {
      department: 'Media',
      description: 'Manage partnerships',
      actions: ['create', 'edit', 'delete', 'publish']
    },
    messages: {
      department: 'Software/CAO',
      description: 'Manage messages and communications',
      actions: ['view', 'respond', 'archive']
    },
    settings: {
      department: 'Software',
      description: 'Manage system settings',
      actions: ['view', 'edit']
    }
  };

  return permissionDescriptions[feature] || {
    department: department || 'Unassigned',
    description: `Manage ${feature}`,
    actions: []
  };
};

/**
 * Create a permission check wrapper for conditional rendering
 * Usage: {canAccess && <Component />}
 * @param {Array<string>} userPermissions - Array of user permissions
 * @param {string} userRole - User's role
 * @param {string} requiredPermission - Permission to check
 * @returns {boolean}
 */
export const canAccessFeature = (userPermissions, userRole, requiredPermission) => {
  // Super admins always have access
  if (isSuperAdmin(userRole)) {
    return true;
  }

  // Check if user has the required permission
  return hasPermission(userPermissions, requiredPermission);
};
