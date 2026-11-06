/**
 * Super Admin Dashboard - Clean Professional Layout
 * Money First - Revenue at the TOP
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users, GraduationCap, Briefcase, AlertCircle, 
    MessageSquare, RefreshCw, FolderKanban, TrendingUp
} from 'lucide-react';

import StatCard from '../../../components/admin/dashboard/StatCard';
import FinancialCard from '../../../components/admin/dashboard/FinancialCard';
import ChartCard from '../../../components/admin/dashboard/ChartCard';
import QuickActionCard from '../../../components/admin/dashboard/QuickActionCard';
import PendingActionsCard from '../../../components/admin/dashboard/PendingActionsCard';
import RecentActivityCard from '../../../components/admin/dashboard/RecentActivityCard';
import SystemHealthCard from '../../../components/admin/dashboard/SystemHealthCard';
import UserEngagementCard from '../../../components/admin/dashboard/UserEngagementCard';
import RevenueBreakdownCard from '../../../components/admin/dashboard/RevenueBreakdownCard';
import RefundTrackerCard from '../../../components/admin/dashboard/RefundTrackerCard';

import dashboardService from '../../../services/dashboardService';

const SuperAdminDashboard = ({ user }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    
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
        pendingActions: [],
        revenueChart: [],
        systemHealth: {},
        userEngagement: {},
        revenueBreakdown: {},
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
    const pendingActions = dashboardData?.pendingActions || [];
    const quickActions = dashboardData?.quickActions || [];
    const systemHealth = dashboardData?.systemHealth || {};
    const userEngagement = dashboardData?.userEngagement || {};
    const revenueBreakdown = dashboardData?.revenueBreakdown || {};
    const refundData = dashboardData?.refundData || {};

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

            <div className="px-6 max-w-[1600px] mx-auto">
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

                {/* Items Requiring Attention - Professional Card Grid */}
                {((stats.pendingKYC || 0) > 0 || (stats.pendingApplications || 0) > 0 || (stats.enrollments?.pending || 0) > 0 || (stats.unreadInquiries || 0) > 0) && (
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                                <AlertCircle className="text-white" size={18} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Items Requiring Attention</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {(stats.pendingKYC || 0) > 0 && (
                                <button
                                    onClick={() => navigate('/admin/users?filter=pending_kyc')}
                                    className="group bg-white border border-amber-200 hover:border-amber-400 rounded-xl p-4 transition-all duration-200 hover:shadow-md text-left"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                                            <Users className="text-amber-600" size={20} />
                                        </div>
                                        <span className="text-2xl font-bold text-amber-600">{stats.pendingKYC}</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900 mb-1">KYC Verification</p>
                                    <p className="text-xs text-gray-500">Users pending verification</p>
                                </button>
                            )}
                            
                            {(stats.pendingApplications || 0) > 0 && (
                                <button
                                    onClick={() => navigate('/admin/jobs?tab=applications&status=pending')}
                                    className="group bg-white border border-blue-200 hover:border-blue-400 rounded-xl p-4 transition-all duration-200 hover:shadow-md text-left"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                            <Briefcase className="text-blue-600" size={20} />
                                        </div>
                                        <span className="text-2xl font-bold text-blue-600">{stats.pendingApplications}</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900 mb-1">Job Applications</p>
                                    <p className="text-xs text-gray-500">Applications pending review</p>
                                </button>
                            )}
                            
                            {(stats.enrollments?.pending || 0) > 0 && (
                                <button
                                    onClick={() => navigate('/admin/training?status=pending')}
                                    className="group bg-white border border-purple-200 hover:border-purple-400 rounded-xl p-4 transition-all duration-200 hover:shadow-md text-left"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                            <GraduationCap className="text-purple-600" size={20} />
                                        </div>
                                        <span className="text-2xl font-bold text-purple-600">{stats.enrollments.pending}</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900 mb-1">Training Enrollments</p>
                                    <p className="text-xs text-gray-500">Enrollments awaiting approval</p>
                                </button>
                            )}
                            
                            {(stats.unreadInquiries || 0) > 0 && (
                                <button
                                    onClick={() => navigate('/admin/contact-inquiries?status=unread')}
                                    className="group bg-white border border-emerald-200 hover:border-emerald-400 rounded-xl p-4 transition-all duration-200 hover:shadow-md text-left"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                                            <MessageSquare className="text-emerald-600" size={20} />
                                        </div>
                                        <span className="text-2xl font-bold text-emerald-600">{stats.unreadInquiries}</span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900 mb-1">Unread Inquiries</p>
                                    <p className="text-xs text-gray-500">Messages awaiting response</p>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* ROW 1: REVENUE FIRST - Revenue Card + Chart + Revenue Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
                    {/* Revenue Card (4 cols - wider for better display) */}
                    <div className="md:col-span-4">
                        <FinancialCard
                            totalRevenue={stats.totalRevenue || 0}
                            weeklyRevenue={weeklyRevenue}
                            weeklyGrowth={weeklyGrowth}
                        />
                    </div>

                    {/* Revenue Chart (5 cols) */}
                    <div className="md:col-span-5">
                        <ChartCard
                            title="Revenue Trend"
                            subtitle="Last 6 months"
                            data={revenueChart}
                            color="#10b981"
                        />
                    </div>

                    {/* Revenue Breakdown (3 cols) */}
                    <div className="md:col-span-3">
                        <RevenueBreakdownCard breakdown={revenueBreakdown} />
                    </div>
                </div>

                
                {/* ROW 1.5: Refund Tracker (wider) + Compact Stats */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
                    <div className="md:col-span-6">
                        <RefundTrackerCard refundData={refundData} />
                    </div>
                    <div className="md:col-span-3">
                        <StatCard
                            title="Active Projects" compact={true}
                            value={15}
                            subtitle="3 completed this month"
                            icon={FolderKanban}
                            color="#3b82f6"
                        />
                    </div>
                    <div className="md:col-span-3">
                        <StatCard
                            title="Website Traffic" compact={true}
                            value="1,234"
                            subtitle="visitors today (?12%)"
                            icon={TrendingUp}
                            color="#10b981"
                        />
                    </div>
                </div>

                {/* ROW 2: System Health + User Engagement + Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
                    <div className="md:col-span-4">
                        <SystemHealthCard health={systemHealth} />
                    </div>
                    <div className="md:col-span-4">
                        <UserEngagementCard engagement={userEngagement} />
                    </div>
                    <div className="md:col-span-4 space-y-4">
                        <StatCard
                            title="Total Users"
                            value={stats.totalUsers || 0}
                            subtitle={`${stats.activeUsers || 0} active`}
                            trend={5.2}
                            icon={Users}
                            color="#3b82f6"
                        />
                        <StatCard
                            title="Training Enrollments"
                            value={stats.enrollments?.total || 0}
                            subtitle={`${stats.enrollments?.pending || 0} pending`}
                            icon={GraduationCap}
                            color="#8b5cf6"
                            alert={(stats.enrollments?.pending || 0) > 0}
                        />
                    </div>
                </div>

                {/* ROW 3: Pending Actions + Recent Activity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <PendingActionsCard actions={pendingActions} />
                    <RecentActivityCard activities={recentActivity} />
                </div>


                {/* BOTTOM: Quick Actions */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
    );
};

export default SuperAdminDashboard;




