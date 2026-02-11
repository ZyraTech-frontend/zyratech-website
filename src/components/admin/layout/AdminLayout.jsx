/**
 * Admin Layout Wrapper
 * Main layout for all admin pages
 */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const notifications = useSelector((state) => state.ui.notifications);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default open on desktop
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Close sidebar by default on mobile
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [children, isMobile]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container: controls width on desktop */}
      <div
        className={
          isMobile
            ? ''
            : sidebarOpen
            ? 'w-72 transition-all duration-300'
            : 'w-0 transition-all duration-300 overflow-hidden'
        }
      >
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isMobile={isMobile} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />

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
