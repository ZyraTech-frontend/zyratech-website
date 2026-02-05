/**
 * Admin Dashboard Container
 * "Smart" container that decides which dashboard to show based on user role.
 * strict separation of concerns: Super Admin vs Regular Admin.
 */

import React from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';

// Import the specific dashboard views
import SuperAdminDashboard from './dashboards/SuperAdminDashboard';
import RegularAdminDashboard from './dashboards/RegularAdminDashboard';

const DashboardPage = () => {
  const { user } = useAuth();
  const { isSuperAdmin } = usePermissions();

  return (
    <AdminLayout>
      {isSuperAdmin ? (
        <SuperAdminDashboard user={user} />
      ) : (
        <RegularAdminDashboard user={user} />
      )}
    </AdminLayout>
  );
};

export default DashboardPage;
