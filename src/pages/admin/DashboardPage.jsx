/**
 * Super Admin Dashboard Overview
 * Professional dashboard with real metrics, charts, and insights
 */

import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { useDispatch } from 'react-redux';
import { fetchSettings } from '../../store/slices/settingsSlice';

// Import our dedicated dashboard views
import SuperAdminDashboard from './dashboards/SuperAdminDashboard';
import RegularAdminDashboard from './dashboards/RegularAdminDashboard';

const DashboardPage = () => {
  const { user } = useAuth();
  const { isSuperAdmin } = usePermissions();
  const dispatch = useDispatch();
  
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
