/**
 * Admin Header Component
 * Modern header with search, notifications, and user menu
 */

import React, { useState } from 'react';
import { Bell, Settings, Search, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/admin/dashboard') return 'Dashboard';
    if (path.includes('/admin/users')) return 'Dashboard / Users / Overview';
    if (path.includes('/admin/settings')) return 'Dashboard / Settings';
    return 'Dashboard';
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || 'U';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="px-8 py-4">
        {/* Top Row: Search, Avatar, Notifications */}
        <div className="flex items-center justify-between mb-3">
          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2] focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Right Side: Avatar, Notifications, Settings */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded"
            >
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {getInitials(user?.name || user?.email)}
              </div>
              <span className="text-sm font-medium text-gray-900">{user?.name || user?.email}</span>
              <ChevronDown size={16} className="text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>

                <Link
                  to="/admin/settings"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <Settings size={16} />
                  Settings
                </Link>

                <Link
                  to="/admin/profile"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <User size={16} />
                  Profile
                </Link>

                <div className="border-t border-gray-200"></div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
