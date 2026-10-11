/**
 * Admin Sidebar Navigation Component
 * Modern blue-themed sidebar with collapsible menus for organized content
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
  Inbox,
  Mail,
  HelpCircle,
  MessageCircle,
  TrendingUp,
  ClipboardList,
  FileBarChart,
  LogOut,
  X,
  CheckCircle,
  Quote,
  Layout,
  UserPlus,
  ShieldCheck,
  MousePointerClick,
  FileX,
  Globe,
  Home,
  Info,
  ChevronDown,
  Layers
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { usePermissions } from '../../../hooks/usePermissions';
import { logoutUser } from '../../../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { normalizeAvatarUrl } from '../../../utils/avatar';

/**
 * Collapsible Menu Component
 * Groups related content items in the sidebar
 */
const CollapsibleMenu = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-blue-200 hover:bg-white/5 hover:text-white rounded-lg transition-all"
      >
        <div className="flex items-center gap-3">
          <Icon size={20} />
          <span className="font-medium">{title}</span>
        </div>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="pl-2 space-y-1 border-l border-blue-400/20 ml-4">
          {children}
        </div>
      )}
    </div>
  );
};

/**
 * Sub-menu link component for use within CollapsibleMenu
 */
const SubMenuLink = ({ to, children, isActive }) => (
  <Link
    to={to}
    className={`block px-4 py-1.5 text-sm rounded-lg transition-all ${
      isActive
        ? 'bg-white/15 text-white font-medium'
        : 'text-blue-200 hover:bg-white/5 hover:text-white'
    }`}
  >
    • {children}
  </Link>
);

const Sidebar = ({ isOpen, onClose, isMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const reduxUser = useSelector((state) => state.auth.user);
  const user = reduxUser || authUser;
  const { isSuperAdmin } = usePermissions();

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarLoadError, setAvatarLoadError] = useState(false);
  const [, setTick] = useState(0);

  React.useEffect(() => {
    const getActive = () => normalizeAvatarUrl(localStorage.getItem('admin_avatar') || user?.avatar || null);
    setAvatarUrl(getActive());
    setAvatarLoadError(false);

    const handleSync = () => {
      setAvatarUrl(getActive());
      setAvatarLoadError(false);
      setTick(t => t + 1);
    };

    window.addEventListener('avatar-updated', handleSync);
    window.addEventListener('user-profile-updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('avatar-updated', handleSync);
      window.removeEventListener('user-profile-updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [user?.avatar]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/admin/login');
    });
  };

  return (
    <div className={`
      ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'}
      h-screen w-72 bg-gradient-to-b from-[#004fa2] to-[#003d7a] text-white flex flex-col shadow-2xl shrink-0
      transform transition-all duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      ${!isOpen && !isMobile ? 'w-0 overflow-hidden' : ''}
    `}>
      {/* Logo/Brand */}
      <div className="px-4 py-5 md:px-6 md:py-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="bg-white rounded-lg flex items-center justify-center p-1 md:p-1.5 shrink-0 shadow-sm w-10 h-10 md:w-12 md:h-12 overflow-hidden">
              <img decoding="async"
                src="/zyrateclogopng.webp"
                alt="ZyraTech"
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-base md:text-lg font-bold leading-tight truncate">Account Manager</h1>
              <p className="text-blue-200 text-[10px] md:text-xs truncate mt-0.5">ZyraTech Hub</p>
            </div>
          </div>
          {/* Close button - visible on mobile only */}
          {isMobile && (
            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors shrink-0 ml-2"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="space-y-1">
          {/* Dashboard */}
          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/dashboard')
              ? 'bg-white/15 text-white'
              : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>

          {/* Analytics (Super Admin Only) */}
          {isSuperAdmin && (
            <Link
              to="/admin/analytics"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/analytics')
                ? 'bg-white/15 text-white'
                : 'text-blue-200 hover:bg-white/5 hover:text-white'
                }`}
            >
              <BarChart3 size={20} />
              <span className="font-medium">Analytics</span>
            </Link>
          )}

          {/* Analytics & Tracking Section (Super Admin Only) */}
          {isSuperAdmin && (
            <>
              <div className="pt-3 pb-1.5">
                <p className="px-4 text-xs font-semibold text-blue-300 uppercase tracking-wider">
                  Analytics & Tracking
                </p>
              </div>

              <Link
                to="/admin/tracking/website-analytics"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/tracking/website-analytics')
                  ? 'bg-white/15 text-white'
                  : 'text-blue-200 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <Globe size={20} />
                <span className="font-medium">Website Analytics</span>
              </Link>

              <Link
                to="/admin/tracking/user-journeys"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/tracking/user-journeys')
                  ? 'bg-white/15 text-white'
                  : 'text-blue-200 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <MousePointerClick size={20} />
                <span className="font-medium">User Journeys</span>
              </Link>

              <Link
                to="/admin/tracking/abandoned-forms"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/tracking/abandoned-forms')
                  ? 'bg-white/15 text-white'
                  : 'text-blue-200 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <FileX size={20} />
                <span className="font-medium">Abandoned Forms</span>
              </Link>
            </>
          )}

          {/* ===== CONTENT PAGES SECTION ===== */}
          <div className="pt-4 pb-1.5">
            <p className="px-4 text-xs font-semibold text-blue-300 uppercase tracking-wider">
              Content Pages
            </p>
          </div>

          {/* Home Page */}
          <CollapsibleMenu 
            title="Home Page" 
            icon={Home}
            defaultOpen={location.pathname.includes('/content/hero')}
          >
            <SubMenuLink 
              to="/admin/content/hero"
              isActive={location.pathname === '/admin/content/hero'}
            >
              Hero Slides
            </SubMenuLink>
          </CollapsibleMenu>

          {/* About Page */}
          <CollapsibleMenu 
            title="About Page" 
            icon={Info}
            defaultOpen={location.pathname.includes('/content/about')}
          >
            <SubMenuLink 
              to="/admin/content/about"
              isActive={location.pathname === '/admin/content/about'}
            >
              All Sections
            </SubMenuLink>
          </CollapsibleMenu>

          {/* Services & Benefits Page */}
          <CollapsibleMenu 
            title="Services Page" 
            icon={Briefcase}
            defaultOpen={location.pathname.includes('/content/services') || location.pathname.includes('/content/benefits')}
          >
            <SubMenuLink 
              to="/admin/content/services"
              isActive={location.pathname === '/admin/content/services'}
            >
              Services
            </SubMenuLink>
            <SubMenuLink 
              to="/admin/content/benefits"
              isActive={location.pathname === '/admin/content/benefits'}
            >
              Why Choose Us
            </SubMenuLink>
          </CollapsibleMenu>

          {/* Partnership Page */}
          <CollapsibleMenu 
            title="Partnership Page" 
            icon={Handshake}
            defaultOpen={location.pathname.includes('/content/partnership')}
          >
            <SubMenuLink 
              to="/admin/content/partnership"
              isActive={location.pathname === '/admin/content/partnership'}
            >
              All Sections
            </SubMenuLink>
          </CollapsibleMenu>

          {/* Work With Us Page */}
          <CollapsibleMenu 
            title="Work With Us" 
            icon={UserPlus}
            defaultOpen={location.pathname.includes('/content/work-with-us')}
          >
            <SubMenuLink 
              to="/admin/content/work-with-us"
              isActive={location.pathname === '/admin/content/work-with-us'}
            >
              All Sections
            </SubMenuLink>
          </CollapsibleMenu>

          {/* Quality Assurance Page */}
          <CollapsibleMenu 
            title="Quality Assurance" 
            icon={ShieldCheck}
            defaultOpen={location.pathname.includes('/content/quality-assurance')}
          >
            <SubMenuLink 
              to="/admin/content/quality-assurance"
              isActive={location.pathname === '/admin/content/quality-assurance'}
            >
              All Sections
            </SubMenuLink>
          </CollapsibleMenu>

          {/* ===== OTHER CONTENT SECTION ===== */}
          <div className="pt-4 pb-1.5">
            <p className="px-4 text-xs font-semibold text-blue-300 uppercase tracking-wider">
              Content Management
            </p>
          </div>

          <Link
            to="/admin/training"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/training')
              ? 'bg-white/15 text-white'
              : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
          >
            <GraduationCap size={20} />
            <span className="font-medium">Training Courses</span>
          </Link>

          <Link
            to="/admin/blog"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/blog')
              ? 'bg-white/15 text-white'
              : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
          >
            <BookOpen size={20} />
            <span className="font-medium">Blog Articles</span>
          </Link>

          <Link
            to="/admin/jobs"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/jobs')
              ? 'bg-white/15 text-white'
              : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
          >
            <Briefcase size={20} />
            <span className="font-medium">Job Listings</span>
          </Link>

          <Link
            to="/admin/gallery"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/gallery')
              ? 'bg-white/15 text-white'
              : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
          >
            <Image size={20} />
            <span className="font-medium">Gallery</span>
          </Link>

          <Link
            to="/admin/projects"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/projects')
              ? 'bg-white/15 text-white'
              : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
          >
            <FolderKanban size={20} />
            <span className="font-medium">Projects</span>
          </Link>

          <Link
            to="/admin/project-requests"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/project-requests')
              ? 'bg-white/15 text-white'
              : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
          >
            <Inbox size={20} />
            <span className="font-medium">Project Requests</span>
          </Link>

          <Link
            to="/admin/faq"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/faq')
              ? 'bg-white/15 text-white'
              : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
          >
            <HelpCircle size={20} />
            <span className="font-medium">FAQ</span>
          </Link>

          <Link
            to="/admin/testimonials"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/testimonials')
              ? 'bg-white/15 text-white'
              : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
          >
            <MessageCircle size={20} />
            <span className="font-medium">Testimonials</span>
          </Link>

          {/* Business Operations Section */}
          <div className="pt-4 pb-1.5">
            <p className="px-4 text-xs font-semibold text-blue-300 uppercase tracking-wider">
              Business
            </p>
          </div>

          <Link
            to="/admin/payments"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/payments')
              ? 'bg-white/15 text-white'
              : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
          >
            <CreditCard size={20} />
            <span className="font-medium">Payments</span>
          </Link>

          <Link
            to="/admin/enrollments"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/enrollments')
              ? 'bg-white/15 text-white'
              : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
          >
            <FileText size={20} />
            <span className="font-medium">Enrollments</span>
          </Link>

          <Link
            to="/admin/partnerships"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/partnerships')
              ? 'bg-white/15 text-white'
              : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
          >
            <Handshake size={20} />
            <span className="font-medium">Partnership Requests</span>
          </Link>

          <Link
            to="/admin/contact-inquiries"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/contact-inquiries')
              ? 'bg-white/15 text-white'
              : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
          >
            <Inbox size={20} />
            <span className="font-medium">Contact Inquiries</span>
          </Link>

          <Link
            to="/admin/impact"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/impact')
              ? 'bg-white/15 text-white'
              : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
          >
            <TrendingUp size={20} />
            <span className="font-medium">Impact Stories</span>
          </Link>

          <Link
            to="/admin/newsletter"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/newsletter')
              ? 'bg-white/15 text-white'
              : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
          >
            <Mail size={20} />
            <span className="font-medium">Newsletter</span>
          </Link>

          <Link
            to="/admin/newsletter/templates"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/newsletter/templates')
              ? 'bg-white/15 text-white'
              : 'text-blue-200 hover:bg-white/5 hover:text-white'
              }`}
          >
            <Mail size={20} />
            <span className="font-medium">Email Templates</span>
          </Link>

          {/* System Section (Super Admin Only) */}
          {isSuperAdmin && (
            <>
              <div className="pt-4 pb-1.5">
                <p className="px-4 text-xs font-semibold text-blue-300 uppercase tracking-wider">
                  System
                </p>
              </div>

              <Link
                to="/admin/users"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/users')
                  ? 'bg-white/15 text-white'
                  : 'text-blue-200 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <Users size={20} />
                <span className="font-medium">Administrators</span>
              </Link>

              <Link
                to="/admin/settings"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/settings')
                  ? 'bg-white/15 text-white'
                  : 'text-blue-200 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <Settings size={20} />
                <span className="font-medium">Settings</span>
              </Link>

              <Link
                to="/admin/activity-logs"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/activity-logs')
                  ? 'bg-white/15 text-white'
                  : 'text-blue-200 hover:bg-white/5 hover:text-white'
                  }`}
              >
                <ClipboardList size={20} />
                <span className="font-medium">Activity Logs</span>
              </Link>

              <Link
                to="/admin/reports"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/admin/reports')
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
        <div className="flex items-center gap-3 mb-3">
          {normalizeAvatarUrl(avatarUrl || user?.avatar) && !avatarLoadError ? (
            <img
              key={normalizeAvatarUrl(avatarUrl || user?.avatar)}
              src={normalizeAvatarUrl(avatarUrl || user?.avatar)}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
              onError={() => setAvatarLoadError(true)}
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
              {((user?.firstName?.[0] || '') + (user?.lastName?.[0] || '')) || 'AU'}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold truncate text-white">
              {(user?.firstName && user?.lastName) ? `${user.firstName} ${user.lastName}`.trim() : (user?.name || user?.email || 'Admin')}
            </div>
            <div className="text-xs text-blue-200 capitalize truncate">{user?.role?.replace(/_/g, ' ')}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/90 hover:bg-red-600 text-white rounded-lg transition text-sm font-medium"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
