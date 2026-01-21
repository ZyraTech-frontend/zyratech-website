import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  DollarSign, 
  BookOpen, 
  Wrench, 
  TrendingUp, 
  Calendar,
  Mail,
  Phone,
  BarChart3,
  Settings,
  LogOut,
  Home,
  FileText,
  ShoppingCart
} from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    activeCourses: 0,
    activeProjects: 0,
    pendingBookings: 0,
    newInquiries: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API calls
    const fetchDashboardData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          totalUsers: 156,
          totalRevenue: 12450,
          activeCourses: 12,
          activeProjects: 8,
          pendingBookings: 5,
          newInquiries: 23
        });

        setRecentActivity([
          { type: 'enrollment', message: 'New enrollment in Web Development course', time: '2 hours ago' },
          { type: 'booking', message: 'Facility booking requested for tomorrow', time: '3 hours ago' },
          { type: 'inquiry', message: 'Contact form submission from potential partner', time: '5 hours ago' },
          { type: 'payment', message: 'Payment received for AI & Robotics course', time: '6 hours ago' }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-500', change: '+12%' },
    { title: 'Revenue', value: `GHS ${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500', change: '+8%' },
    { title: 'Active Courses', value: stats.activeCourses, icon: BookOpen, color: 'bg-purple-500', change: '+2' },
    { title: 'Active Projects', value: stats.activeProjects, icon: Wrench, color: 'bg-[#5c3a21]', change: '+1' },
    { title: 'Pending Bookings', value: stats.pendingBookings, icon: Calendar, color: 'bg-red-500', change: '+3' },
    { title: 'New Inquiries', value: stats.newInquiries, icon: Mail, color: 'bg-indigo-500', change: '+15' }
  ];

  const navigationItems = [
    { name: 'Dashboard', icon: Home, current: true, href: '/admin/dashboard' },
    { name: 'Users', icon: Users, current: false, href: '/admin/users' },
    { name: 'Analytics', icon: BarChart3, current: false, href: '/admin/analytics' },
    { name: 'Settings', icon: Settings, current: false, href: '/admin/settings' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004fa2] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/zyratecpng.png" 
                alt="Zyra Tech Hub" 
                className="h-8 w-auto mr-4"
              />
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <LogOut className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.current
                      ? 'bg-[#004fa2] text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
                >
                  <item.icon
                    className={`${
                      item.current ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 h-5 w-5`}
                  />
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statCards.map((card, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-2">{card.value}</p>
                    <p className="text-sm text-green-600 mt-2">{card.change} from last month</p>
                  </div>
                  <div className={`${card.color} p-3 rounded-lg`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#004fa2] rounded-full"></div>
                      <p className="text-sm text-gray-900">{activity.message}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Manage Users</span>
                </button>
                <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">View Courses</span>
                </button>
                <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Generate Reports</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">API Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Storage</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">78%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Staff Meeting</p>
                  <p className="text-gray-600">Tomorrow, 10:00 AM</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Course Review</p>
                  <p className="text-gray-600">Friday, 2:00 PM</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Monthly Report</p>
                  <p className="text-gray-600">Due in 5 days</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
