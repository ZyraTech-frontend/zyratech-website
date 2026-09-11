/**
 * Admin Header Component
 * Modern header with search, notifications, and user menu
 */

import React, { useState } from 'react';
import { Bell, Settings, Search, ChevronDown, User, LogOut, Menu, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { usePermissions } from '../../../hooks/usePermissions';
import { normalizeAvatarUrl } from '../../../utils/avatar';

const Header = ({ onMenuClick, sidebarOpen }) => {
  const { user: hookUser } = useAuth();
  const reduxUser = useSelector((state) => state.auth.user);
  const user = reduxUser || hookUser;
  const { isSuperAdmin } = usePermissions();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarLoadError, setAvatarLoadError] = useState(false);
  const [, setTick] = useState(0);

  // Listen for avatar changes from profile page or auth state
  React.useEffect(() => {
    const getActiveAvatar = () => normalizeAvatarUrl(localStorage.getItem('admin_avatar') || user?.avatar || null);
    setAvatarUrl(getActiveAvatar());
    setAvatarLoadError(false);

    const handleStorageChange = () => {
      setAvatarUrl(getActiveAvatar());
      setAvatarLoadError(false);
      setTick(t => t + 1);
    };

    window.addEventListener('avatar-updated', handleStorageChange);
    window.addEventListener('user-profile-updated', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('avatar-updated', handleStorageChange);
      window.removeEventListener('user-profile-updated', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [user?.avatar]);

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/admin/dashboard') return 'Dashboard';
    if (path.includes('/admin/users')) return 'Dashboard / Users / Overview';
    if (path.includes('/admin/settings')) return 'Dashboard / Settings';
    return 'Dashboard';
  };

  const displayName = (user?.firstName && user?.lastName)
    ? `${user.firstName} ${user.lastName}`.trim()
    : (user?.name || user?.email || 'User');

  const getInitials = (name) => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || 'U';
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/admin/login');
    });
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="px-4 lg:px-8 py-4">
        {/* Top Row: Search, Avatar, Notifications */}
        <div className="flex items-center justify-between mb-3">
          {/* Left: Hamburger + Search Bar */}
          <div className="flex items-center gap-3 flex-1 lg:max-w-xl">
            {/* Hamburger/Toggle Menu Button - always visible */}
            <button
              onClick={onMenuClick}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
              title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {sidebarOpen ? <PanelLeftClose size={22} /> : <PanelLeft size={22} />}
            </button>

            {/* Search Bar - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block flex-1">
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

            {/* Mobile Search Icon */}
            <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Search size={22} />
            </button>
          </div>

          {/* Right Side: Avatar, Notifications, Settings */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-1 sm:px-3 py-2 hover:bg-gray-100 rounded transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 overflow-hidden">
                  {avatarUrl && !avatarLoadError ? (
                    <img
                      key={avatarUrl}
                      src={avatarUrl}
                      alt={displayName || 'Profile'}
                      className="w-full h-full object-cover"
                      onError={() => setAvatarLoadError(true)}
                    />
                  ) : (
                    getInitials(displayName)
                  )}
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-900 truncate max-w-[100px] sm:max-w-none">{displayName}</span>
                <ChevronDown size={16} className="text-gray-600" />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{displayName}</p>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                  </div>

                  {isSuperAdmin && (
                    <Link
                      to="/admin/settings"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <Settings size={16} />
                      Settings
                    </Link>
                  )}

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
      </div>
    </header>
  );
};

export default Header;
