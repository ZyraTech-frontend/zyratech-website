/**
 * usePermissions Hook
 * Check if user has specific permissions
 */

import { useAuth } from './useAuth';
import {
  hasPermission,
  isSuperAdmin,
  isAdmin,
  isEditor,
  canManageUsers,
  canManagePayments,
  canViewPayments,
  canRefundPayment,
  canEditSettings,
  canEditPaymentKeys
} from '../utils/permissions';

export const usePermissions = () => {
  const { userRole } = useAuth();

  return {
    can: (permission) => hasPermission(userRole, permission),
    isSuperAdmin: isSuperAdmin(userRole),
    isAdmin: isAdmin(userRole),
    isEditor: isEditor(userRole),
    canManageUsers: canManageUsers(userRole),
    canManagePayments: canManagePayments(userRole),
    canViewPayments: canViewPayments(userRole),
    canRefundPayment: canRefundPayment(userRole),
    canEditSettings: canEditSettings(userRole),
    canEditPaymentKeys: canEditPaymentKeys(userRole)
  };
};
