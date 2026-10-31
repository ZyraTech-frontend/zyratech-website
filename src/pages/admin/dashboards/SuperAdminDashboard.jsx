/**
 * Super Admin Dashboard - Professional Redesign
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users, GraduationCap, Briefcase, FolderKanban, 
    MessageSquare, Mail, Handshake, Image, FileText,
    Calendar, Bell, RefreshCw, TrendingUp, CreditCard, Eye
} from 'lucide-react';

import StatCard from '../../../components/admin/dashboard/StatCard';
import FinancialCard from '../../../components/admin/dashboard/FinancialCard';
import ChartCard from '../../../components/admin/dashboard/ChartCard';
import ActivityTable from '../../../components/admin/dashboard/ActivityTable';
import QuickActionCard from '../../../components/admin/dashboard/QuickActionCard';

import dashboardService from '../../../services/dashboardService';
import paymentService from '../../../services/paymentService';

const SuperAdminDashboard = ({ user }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [stats, setStats] = useState(null);
    const [revenueChart, setRevenueChart] = useState([]);
    const [recentPayments, setRecentPayments] = useState([]);
    const [currentDate] = useState(new Date());
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [statsData, chartData, paymentsData] = await Promise.all([
                dashboardService.getDashboardStats(),
                dashboardService.getRevenueChart(6),
                paymentService.getAdminPayments({ limit: 5 })
            ]);

            setStats(statsData);
            setRevenueChart(chartData);
            
            const formattedPayments = (paymentsData.payments || []).slice(0, 5).map(payment => ({
                name: payment.courseName || payment.description || 'Payment',
                subtitle: payment.payerEmail || payment.reference,
                date: new Date(payment.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
                time: new Date(payment.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                status: payment.status === 'success' ? 'Successful' : payment.status,
                amount: `GHS ${parseFloat(payment.amount).toLocaleString()}`,
                icon: payment.courseName?.charAt(0) || 'P'
            }));
            
            setRecentPayments(formattedPayments);
        } catch (error) {
            console.error('[Dashboard] Error fetching data:', error);
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

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    const formattedDateRange = `${currentDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} - ${new Date(currentDate.getTime() + 30*24*60*60*1000).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`;

    const weeklyRevenue = stats?.payments.totalRevenue ? (stats.payments.totalRevenue * 0.08).toFixed(0) : 0;
    const weeklyGrowth = 12.5;

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
    return (
        <div className="min-h-screen bg-gray-50 pb-8">
            <div className="bg-white border-b border-gray-100 px-6 py-4 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Welcome Back, <span className="text-[#004fa2]">{user?.firstName || user?.name?.split(' ')[0] || 'Admin'}</span>
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                            <Calendar size={16} />
                            <span className="hidden md:inline">{formattedDateRange}</span>
                        </button>
                        <button 
                            onClick={handleRefresh}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                            disabled={refreshing}
                        >
                            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                            <span className="hidden md:inline">Refresh</span>
                        </button>
                        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-3 space-y-6">
                        <FinancialCard
                            totalRevenue={stats?.payments.totalRevenue || 0}
                            weeklyRevenue={weeklyRevenue}
                            weeklyGrowth={weeklyGrowth}
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <StatCard icon={Users} label="Total Users" value={stats?.users.total || 0} color="purple" onClick={() => navigate('/admin/users')} />
                            <StatCard icon={CreditCard} label="Payments" value={stats?.payments.completed || 0} color="green" onClick={() => navigate('/admin/payments')} />
                        </div>
                    </div>
                    <div className="lg:col-span-6">
                        <ChartCard title="Revenue Trend" data={revenueChart} type="bar" metric="Revenue" />
                    </div>
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-700 mb-4">System Health</h3>
                            <div className="mb-4">
                                <p className="text-xs text-gray-500 mb-1">Total Revenue</p>
                                <p className="text-3xl font-bold text-gray-900">GHS {(stats?.payments.totalRevenue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                <div className="mt-3 h-16 flex items-end gap-1">
                                    {revenueChart.slice(0, 6).map((item, i) => {
                                        const max = Math.max(...revenueChart.map(d => d.amount));
                                        const height = max > 0 ? (item.amount / max) * 100 : 0;
                                        return <div key={i} className="flex-1 bg-gradient-to-t from-[#1a7f64] to-[#2d9f7f] rounded-sm" style={{ height: `${height}%`, minHeight: '4px' }}></div>;
                                    })}
                                </div>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <button onClick={() => navigate('/admin/reports')} className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-[#1a7f64] rounded-lg hover:bg-[#2d9f7f] transition-colors">View Reports</button>
                                <button className="flex-1 py-2 px-3 text-xs font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Export</button>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm"><span className="text-gray-600">Pending</span><span className="font-semibold">{stats?.payments.pending || 0}</span></div>
                                <div className="flex items-center justify-between text-sm"><span className="text-gray-600">Completed</span><span className="font-semibold text-green-600">{stats?.payments.completed || 0}</span></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Active Admins</h3>
                            <div className="flex -space-x-2">
                                {[...Array(Math.min(stats?.users.admins || 0, 5))].map((_, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] border-2 border-white flex items-center justify-center text-white text-xs font-bold">A{i + 1}</div>
                                ))}
                                {stats?.users.admins > 5 && <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-bold">+{stats.users.admins - 5}</div>}
                            </div>
                        </div>
                    </div>
                </div>
                <ActivityTable title="Recent Payments" activities={recentPayments} />
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <QuickActionCard icon={FileText} label="Blog Posts" path="/admin/blog" count={stats?.blog.total} color="blue" />
                        <QuickActionCard icon={Briefcase} label="Jobs" path="/admin/jobs" count={stats?.jobs.total} color="green" />
                        <QuickActionCard icon={GraduationCap} label="Training" path="/admin/training/applications" color="purple" />
                        <QuickActionCard icon={FolderKanban} label="Projects" path="/admin/projects" color="orange" />
                        <QuickActionCard icon={MessageSquare} label="Inquiries" path="/admin/contact-inquiries" count={stats?.inquiries.unread} color="cyan" />
                        <QuickActionCard icon={Handshake} label="Partnerships" path="/admin/partnerships" count={stats?.partnerships.pending} color="pink" />
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard icon={Mail} label="Newsletter" value={stats?.newsletter.active || 0} color="cyan" onClick={() => navigate('/admin/newsletter')} />
                    <StatCard icon={Image} label="Gallery" value={'-'} color="purple" onClick={() => navigate('/admin/gallery')} />
                    <StatCard icon={FileText} label="Blog Posts" value={stats?.blog.published || 0} color="blue" onClick={() => navigate('/admin/blog')} />
                    <StatCard icon={Users} label="Admins" value={stats?.users.admins || 0} color="green" onClick={() => navigate('/admin/users')} />
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;