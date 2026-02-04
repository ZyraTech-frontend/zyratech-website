/**
 * Admin Dashboard Page
 * Overview with stats and recent activity
 */

import React, { useEffect, useState } from 'react';
import { Users, CreditCard, BookOpen, TrendingUp } from 'lucide-react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings } from '../../store/slices/settingsSlice';

const DashboardPage = () => {
  const { user } = useAuth();
  const { isSuperAdmin, isAdmin } = usePermissions();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.values);
  const [stats, setStats] = useState({
    totalUsers: 156,
    totalRevenue: 45250,
    activeCourses: 12,
    totalEnrollments: 234
  });

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your business</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded">
                <Users size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          {(isSuperAdmin || isAdmin) && (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {settings['payment.currency'] || 'GHS'} {stats.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded">
                  <CreditCard size={24} className="text-green-600" />
                </div>
              </div>
            </div>
          )}

          {/* Active Courses */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Courses</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeCourses}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded">
                <BookOpen size={24} className="text-purple-600" />
              </div>
            </div>
          </div>

          {/* Total Enrollments */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Enrollments</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalEnrollments}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded">
                <TrendingUp size={24} className="text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">New course enrollment</p>
                  <p className="text-sm text-gray-600">Python for Beginners</p>
                </div>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">Payment received</p>
                  <p className="text-sm text-gray-600">Transaction #TXN-001234</p>
                </div>
                <span className="text-xs text-gray-500">5 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-900">New contact submission</p>
                  <p className="text-sm text-gray-600">Partnership inquiry</p>
                </div>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a
                href="/admin/training/courses"
                className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
              >
                Add Course
              </a>
              <a
                href="/admin/content/blog"
                className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
              >
                Write Article
              </a>
              <a
                href="/admin/content/jobs"
                className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
              >
                Post Job
              </a>
              {isSuperAdmin && (
                <>
                  <a
                    href="/admin/users"
                    className="block w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-center"
                  >
                    Manage Users
                  </a>
                  <a
                    href="/admin/settings"
                    className="block w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-center"
                  >
                    Site Settings
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
