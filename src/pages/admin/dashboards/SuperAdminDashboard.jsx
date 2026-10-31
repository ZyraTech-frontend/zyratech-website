/**
 * Super Admin Dashboard - Enhanced with comprehensive metrics
 * Fixed: Safe defaults, error handling, proper guards for toLocaleString
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users, GraduationCap, Briefcase, AlertCircle, 
    MessageSquare, CreditCard, Handshake, TrendingUp, RefreshCw
} from 'lucide-react';

import StatCard from '../../../components/admin/dashboard/StatCard';
import FinancialCard from '../../../components/admin/dashboard/FinancialCard';
import ChartCard from '../../../components/admin/dashboard/ChartCard';
import ActivityTable from '../../../components/admin/dashboard/ActivityTable';
import QuickActionCard from '../../../components/admin/dashboard/QuickActionCard';

import dashboardService from '../../../services/dashboardService';

const SuperAdminDashboard = ({ user }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    
    // Initialize with safe defaults
    const [dashboardData, setDashboardData] = useState({
        stats: {
            totalRevenue: 0,
            totalPayments: 0,
            pendingPayments: 0,
            completedPayments: 0,
            totalUsers: 0,
            activeUsers: 0,
            admins: 0,
            pendingKYC: 0,
            enrollments: { total: 0, pending: 0, approved: 0, rejected: 0 },
            totalJobs: 0,
            activeJobs: 0,
            pendingApplications: 0,
            totalInquiries: 0,
            unreadInquiries: 0,
            resolvedInquiries: 0,
            totalPartnerships: 0,
            pendingPartnerships: 0,
            approvedPartnerships: 0
        },
        recentActivity: [],
        revenueChart: [],
        quickActions: []
    });
    
    const [currentDate] = useState(new Date());
    
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await dashboardService.getDashboardData();
            setDashboardData(data);
        } catch (error) {
            console.error('[Dashboard] Error fetching data:', error);
            setError('Failed to load dashboard data. Please try refreshing.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchDashboardData();
        setTimeout(() => setRefreshing(false), 1000);
    };

    const formattedDate = currentDate.toLocaleString('en-US', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <RefreshCw className="animate-spin text-[#004fa2] mx-auto mb-4" size={40} />
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const stats = dashboardData?.stats || {};
    const revenueChart = dashboardData?.revenueChart || [];
    const recentActivity = dashboardData?.recentActivity || [];
    const quickActions = dashboardData?.quickActions || [];

    const weeklyRevenue = stats.totalRevenue ? (Number(stats.totalRevenue) * 0.08).toFixed(0) : 0;
    const weeklyGrowth = 12.5;

    return (
        <div className="min-h-screen bg-gray-50 pb-8">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-4 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Welcome Back, <span className="text-[#004fa2]">{user?.firstName || user?.name?.split(' ')[0] || 'Admin'}</span>
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#004fa2] hover:bg-[#003d82] rounded-lg transition-colors disabled:opacity-50"
                        >
                            <RefreshCw className={refreshing ? 'animate-spin' : ''} size={16} />
                            Refresh
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-6">
                {/* Error Alert */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                        <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                        <div className="flex-1">
                            <h3 className="font-semibold text-red-900 mb-1">Error Loading Dashboard</h3>
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                        <button 
                            onClick={fetchDashboardData}
                            className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Needs Attention Alert */}
                {((stats.pendingKYC || 0) > 0 || (stats.pendingApplications || 0) > 0 || (stats.enrollments?.pending || 0) > 0) && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                        <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
                        <div className="flex-1">
                            <h3 className="font-semibold text-amber-900 mb-1">Items Requiring Attention</h3>
                            <div className="text-sm text-amber-800 space-y-1">
                                {(stats.pendingKYC || 0) > 0 && <p>• {stats.pendingKYC} users pending KYC verification</p>}
                                {(stats.pendingApplications || 0) > 0 && <p>• {stats.pendingApplications} job applications pending review</p>}
                                {(stats.enrollments?.pending || 0) > 0 && <p>• {stats.enrollments.pending} training enrollments pending approval</p>}
                                {(stats.unreadInquiries || 0) > 0 && <p>• {stats.unreadInquiries} unread inquiries</p>}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                    {/* Left Column - Stats & Financial */}
                    <div className="space-y-6">
                        <FinancialCard
                            totalRevenue={stats.totalRevenue || 0}
                            weeklyRevenue={weeklyRevenue}
                            weeklyGrowth={weeklyGrowth}
                        />

                        <StatCard
                            title="Total Users"
                            value={stats.totalUsers || 0}
                            subtitle={`${stats.activeUsers || 0} active`}
                            trend={5.2}
                            icon={Users}
                            color="#3b82f6"
                        />

                        <StatCard
                            title="Pending KYC"
                            value={stats.pendingKYC || 0}
                            subtitle="Awaiting verification"
                            icon={AlertCircle}
                            color="#f59e0b"
                            alert={(stats.pendingKYC || 0) > 0}
                        />
                    </div>

                    {/* Center Column - Revenue Chart */}
                    <div>
                        <ChartCard
                            title="Revenue Trend"
                            subtitle="Last 6 months"
                            data={revenueChart}
                            color="#10b981"
                        />
                    </div>

                    {/* Right Column - Enrollments & Applications */}
                    <div className="space-y-6">
                        <StatCard
                            title="Training Enrollments"
                            value={stats.enrollments?.total || 0}
                            subtitle={`${stats.enrollments?.pending || 0} pending approval`}
                            icon={GraduationCap}
                            color="#8b5cf6"
                            alert={(stats.enrollments?.pending || 0) > 0}
                        />

                        <StatCard
                            title="Job Applications"
                            value={stats.pendingApplications || 0}
                            subtitle={`From ${stats.activeJobs || 0} active jobs`}
                            icon={Briefcase}
                            color="#3b82f6"
                            alert={(stats.pendingApplications || 0) > 0}
                        />

                        <StatCard
                            title="Contact Inquiries"
                            value={stats.totalInquiries || 0}
                            subtitle={`${stats.unreadInquiries || 0} unread`}
                            icon={MessageSquare}
                            color="#ef4444"
                            alert={(stats.unreadInquiries || 0) > 0}
                        />
                    </div>
                </div>

                {/* Bottom Section - Activity & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ActivityTable activities={recentActivity} />
                    
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {quickActions.map((action, index) => (
                                <QuickActionCard
                                    key={index}
                                    title={action.title}
                                    count={action.count || 0}
                                    color={action.color}
                                    onClick={() => navigate(action.path)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
