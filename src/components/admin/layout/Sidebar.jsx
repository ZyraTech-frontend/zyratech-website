/**
 * Admin Sidebar Navigation Component
 * Displays navigation menu based on user role
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  Users,
  Settings,
  Mail,
  Image,
  BarChart3,
  MessageSquare,
  LogOut,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { usePermissions } from '../../../hooks/usePermissions';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../../store/slices/uiSlice';
import { logoutUser } from '../../../store/slices/authSlice';

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { isSuperAdmin, isAdmin, isEditor } = usePermissions();
  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  const NavItem = ({ icon: Icon, label, path, requiredRole }) => {
    // Show item based on role
    if (requiredRole === 'super_admin' && !isSuperAdmin) return null;
    if (requiredRole === 'admin' && !isAdmin && !isSuperAdmin) return null;

    return (
      <Link
        to={path}
        className={`flex items-center gap-3 px-4 py-3 rounded hover:bg-blue-600 transition ${isActive(
          path
        )}`}
      >
        <Icon size={20} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static left-0 top-0 h-screen w-64 bg-blue-600 text-white flex flex-col transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-blue-500">
          <h1 className="text-2xl font-bold">ZyraTech Admin</h1>
          <p className="text-blue-200 text-sm mt-1">Management Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-2 px-2">
            {/* Main */}
            <div className="text-xs font-bold text-blue-200 px-2 py-2">MAIN</div>
            <NavItem
              icon={LayoutDashboard}
              label="Dashboard"
              path="/admin/dashboard"
            />

            {/* Content Management */}
            <div className="text-xs font-bold text-blue-200 px-2 py-2 mt-6">
              CONTENT
            </div>
            <NavItem
              icon={BookOpen}
              label="Training Courses"
              path="/admin/training/courses"
            />
            <NavItem
              icon={MessageSquare}
              label="Blog Articles"
              path="/admin/content/blog"
            />
            <NavItem
              icon={BarChart3}
              label="Job Listings"
              path="/admin/content/jobs"
            />
            <NavItem icon={Image} label="Gallery" path="/admin/content/gallery" />
            <NavItem
              icon={MessageSquare}
              label="Testimonials"
              path="/admin/content/testimonials"
            />

            {/* Business */}
            <div className="text-xs font-bold text-blue-200 px-2 py-2 mt-6">
              BUSINESS
            </div>
            <NavItem
              icon={Mail}
              label="Submissions"
              path="/admin/submissions"
              requiredRole="admin"
            />
            <NavItem
              icon={CreditCard}
              label="Payments"
              path="/admin/payments/transactions"
              requiredRole="admin"
            />

            {/* Administration */}
            <div className="text-xs font-bold text-blue-200 px-2 py-2 mt-6">
              ADMINISTRATION
            </div>
            <NavItem
              icon={Users}
              label="Users"
              path="/admin/users"
              requiredRole="super_admin"
            />
            <NavItem
              icon={Settings}
              label="Settings"
              path="/admin/settings"
              requiredRole="super_admin"
            />
          </div>
        </nav>

        {/* User Info & Logout */}
        <div className="border-t border-blue-500 p-4">
          <div className="mb-4">
            <div className="text-sm font-semibold truncate">{user?.name || user?.email}</div>
            <div className="text-xs text-blue-200 capitalize">{user?.role}</div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => dispatch(toggleSidebar())}
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
