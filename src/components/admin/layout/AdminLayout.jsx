/**
 * Admin Layout Wrapper
 * Main layout for all admin pages
 */

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const notifications = useSelector((state) => state.ui.notifications);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-3 rounded shadow-lg text-white max-w-xs ${
              notification.type === 'success'
                ? 'bg-green-600'
                : notification.type === 'error'
                ? 'bg-red-600'
                : notification.type === 'warning'
                ? 'bg-yellow-600'
                : 'bg-blue-600'
            }`}
          >
            {notification.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLayout;
