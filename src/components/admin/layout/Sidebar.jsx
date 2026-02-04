/**
 * Admin Sidebar Navigation Component
 * Modern purple-themed sidebar with expandable menus
 */

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  BookOpen,
  GraduationCap,
  CreditCard,
  Briefcase,
  Image,
  MessageSquare,
  FileText,
  FolderKanban,
  Handshake,
  Mail,
  HelpCircle,
  MessageCircle,
  UsersRound,
  TrendingUp,
  ClipboardList,
  FileBarChart,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { usePermissions } from '../../../hooks/usePermissions';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isSuperAdmin } = usePermissions();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  return (
    <div className="h-screen w-72 bg-gradient-to-b from-[#004fa2] to-[#003d7a] text-white flex flex-col shadow-2xl shrink-0">
      {/* Logo/Brand */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <LayoutDashboard size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Account Manager</h1>
            <p className="text-blue-200 text-xs">ZyraTech Hub</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="space-y-0.5">
          {/* Dashboard Section */}
          <div>
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                isActive('/admin/dashboard')
                  ? 'bg-white/15 text-white'
                  : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
            >
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </Link>
          </div>

          {/* Analytics (Super Admin Only) */}
          {isSuperAdmin && (
            <Link
              to="/admin/analytics"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                isActive('/admin/analytics')
                  ? 'bg-white/15 text-white'
                  : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
            >
              <BarChart3 size={20} />
              <span className="font-medium">Analytics</span>
            </Link>
          )}

          {/* Content Management Section */}
          <div className="pt-3 pb-1.5">
            <p className="px-4 text-xs font-semibold text-blue-300 uppercase tracking-wider">
              Content
            </p>
          </div>

          <Link
            to="/admin/training"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
              isActive('/admin/training')
                ? 'bg-white/15 text-white'
                : 'text-blue-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <GraduationCap size={20} />
            <span className="font-medium">Training Courses</span>
          </Link>

          <Link
            to="/admin/blog"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
              isActive('/admin/blog')
                ? 'bg-white/15 text-white'
                : 'text-blue-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <BookOpen size={20} />
            <span className="font-medium">Blog Articles</span>
          </Link>

          <Link
            to="/admin/jobs"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
              isActive('/admin/jobs')
                ? 'bg-white/15 text-white'
                : 'text-blue-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Briefcase size={20} />
            <span className="font-medium">Job Listings</span>
          </Link>

          <Link
            to="/admin/gallery"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
              isActive('/admin/gallery')
                ? 'bg-white/15 text-white'
                : 'text-blue-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Image size={20} />
            <span className="font-medium">Gallery</span>
          </Link>

          <Link
            to="/admin/projects"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
              isActive('/admin/projects')
                ? 'bg-white/15 text-white'
                : 'text-blue-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <FolderKanban size={20} />
            <span className="font-medium">Projects</span>
          </Link>

          <Link
            to="/admin/faq"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
              isActive('/admin/faq')
                ? 'bg-white/15 text-white'
                : 'text-blue-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <HelpCircle size={20} />
            <span className="font-medium">FAQ</span>
          </Link>

          <Link
            to="/admin/testimonials"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
              isActive('/admin/testimonials')
                ? 'bg-white/15 text-white'
                : 'text-blue-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <MessageCircle size={20} />
            <span className="font-medium">Testimonials</span>
          </Link>

          <Link
            to="/admin/team"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
              isActive('/admin/team')
                ? 'bg-white/15 text-white'
                : 'text-blue-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <UsersRound size={20} />
            <span className="font-medium">Team Members</span>
          </Link>

          {/* Business Operations Section */}
          <div className="pt-3 pb-1.5">
            <p className="px-4 text-xs font-semibold text-blue-300 uppercase tracking-wider">
              Business
            </p>
          </div>

          <Link
            to="/admin/payments"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
              isActive('/admin/payments')
                ? 'bg-white/15 text-white'
                : 'text-blue-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <CreditCard size={20} />
            <span className="font-medium">Payments</span>
          </Link>

          <Link
            to="/admin/enrollments"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
              isActive('/admin/enrollments')
                ? 'bg-white/15 text-white'
                : 'text-blue-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <FileText size={20} />
            <span className="font-medium">Enrollments</span>
          </Link>

          <Link
            to="/admin/messages"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
              isActive('/admin/messages')
                ? 'bg-white/15 text-white'
                : 'text-blue-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <MessageSquare size={20} />
            <span className="font-medium">Messages</span>
          </Link>

          <Link
            to="/admin/partnerships"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
              isActive('/admin/partnerships')
                ? 'bg-white/15 text-white'
                : 'text-blue-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Handshake size={20} />
            <span className="font-medium">Partnerships</span>
          </Link>

          <Link
            to="/admin/contact-inquiries"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
              isActive('/admin/contact-inquiries')
                ? 'bg-white/15 text-white'
                : 'text-blue-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Mail size={20} />
            <span className="font-medium">Contact Inquiries</span>
          </Link>

          <Link
            to="/admin/impact"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
              isActive('/admin/impact')
                ? 'bg-white/15 text-white'
                : 'text-blue-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <TrendingUp size={20} />
            <span className="font-medium">Impact Stories</span>
          </Link>

          <Link
            to="/admin/newsletter"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
              isActive('/admin/newsletter')
                ? 'bg-white/15 text-white'
                : 'text-blue-200 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Mail size={20} />
            <span className="font-medium">Newsletter</span>
          </Link>

          {/* System Section (Super Admin Only) */}
          {isSuperAdmin && (
            <>
              <div className="pt-3 pb-1.5">
                <p className="px-4 text-xs font-semibold text-blue-300 uppercase tracking-wider">
                  System
                </p>
              </div>

              <Link
                to="/admin/users"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  isActive('/admin/users')
                    ? 'bg-white/15 text-white'
                    : 'text-blue-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Users size={20} />
                <span className="font-medium">User Management</span>
              </Link>

              <Link
                to="/admin/settings"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  isActive('/admin/settings')
                    ? 'bg-white/15 text-white'
                    : 'text-blue-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Settings size={20} />
                <span className="font-medium">Settings</span>
              </Link>

              <Link
                to="/admin/activity-logs"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  isActive('/admin/activity-logs')
                    ? 'bg-white/15 text-white'
                    : 'text-blue-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                <ClipboardList size={20} />
                <span className="font-medium">Activity Logs</span>
              </Link>

              <Link
                to="/admin/reports"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  isActive('/admin/reports')
                    ? 'bg-white/15 text-white'
                    : 'text-blue-200 hover:bg-white/5 hover:text-white'
                }`}
              >
                <FileBarChart size={20} />
                <span className="font-medium">Reports</span>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* User Info & Logout */}
      <div className="border-t border-blue-500/30 p-3">
        <div className="mb-3">
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
  );
};

export default Sidebar;
