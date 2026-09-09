/**
 * useAuth Hook
 * Get current user and authentication state
 */

import { useSelector } from 'react-redux';

export const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const user = auth.user;
  const firstName = user?.firstName || (user?.name ? user.name.split(' ')[0] : null);
  const lastName = user?.lastName || (user?.name && user.name.includes(' ') ? user.name.split(' ').slice(1).join(' ') : null);
  const fullName = (firstName && lastName)
    ? `${firstName} ${lastName}`.trim()
    : (user?.name || firstName || user?.email || null);

  const resolvedUser = user ? {
    ...user,
    firstName: user.firstName || firstName,
    lastName: user.lastName || lastName,
    name: user.name || fullName
  } : null;

  return {
    user: resolvedUser,
    token: auth.token,
    loading: auth.loading,
    error: auth.error,
    isAuthenticated: auth.isAuthenticated,
    userRole: auth.user?.role || null,
    userId: auth.user?.id || null,
    userName: fullName,
    userFirstName: firstName
  };
};
