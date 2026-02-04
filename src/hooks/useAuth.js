/**
 * useAuth Hook
 * Get current user and authentication state
 */

import { useSelector } from 'react-redux';

export const useAuth = () => {
  const auth = useSelector((state) => state.auth);

  return {
    user: auth.user,
    token: auth.token,
    loading: auth.loading,
    error: auth.error,
    isAuthenticated: auth.isAuthenticated,
    userRole: auth.user?.role || null,
    userId: auth.user?.id || null,
    userName: auth.user?.name || auth.user?.email || null
  };
};
