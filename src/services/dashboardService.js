/**
 * Dashboard Service - Enhanced with comprehensive metrics
 */

import paymentService from './paymentService';
import contactInquiryService from './contactInquiryService';
import partnersService from './partnersService';
import userService from './userService';
import { trainingApplicationService } from './trainingApplicationService';
import jobsService from './jobsService';

// Helper: Enhanced recent activity with mixed event types
const getRecentActivity = (payments, inquiries, enrollments, users) => {
  const activities = [];
  
  // Add payment activities
  payments.slice(0, 5).forEach(payment => {
    activities.push({
      type: 'payment',
      title: `Payment received: $${payment.amount}`,
      user: payment.userName || 'Unknown',
      timestamp: payment.createdAt,
      status: payment.status
    });
  });
  
  // Add inquiry activities
  inquiries.slice(0, 5).forEach(inquiry => {
    activities.push({
      type: 'inquiry',
      title: `New inquiry: ${inquiry.subject}`,
      user: inquiry.name,
      timestamp: inquiry.createdAt,
      status: inquiry.status || 'new'
    });
  });
  
  // Add enrollment activities
  enrollments.slice(0, 5).forEach(enrollment => {
    activities.push({
      type: 'enrollment',
      title: `Training application: ${enrollment.courseName || enrollment.trainingId}`,
      user: enrollment.userName || 'Unknown',
      timestamp: enrollment.createdAt,
      status: enrollment.status
    });
  });
  
  // Add user registration activities
  users.slice(0, 5).forEach(user => {
    if (user.createdAt) {
      activities.push({
        type: 'user',
        title: `New user registered`,
        user: user.name || user.email,
        timestamp: user.createdAt,
        status: user.kycStatus || 'pending'
      });
    }
  });
  
  // Sort by timestamp descending and return top 10
  return activities
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 10);
};

// Helper: Revenue chart data for last 6 months
const getRevenueChart = (payments) => {
  const months = [];
  const now = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      month: date.toLocaleString('default', { month: 'short' }),
      revenue: 0
    });
  }
  
  payments.forEach(payment => {
    if (payment.status === 'completed' || payment.status === 'success') {
      const paymentDate = new Date(payment.createdAt);
      const monthDiff = (now.getFullYear() - paymentDate.getFullYear()) * 12 
                      + (now.getMonth() - paymentDate.getMonth());
      
      if (monthDiff >= 0 && monthDiff < 6) {
        const index = 5 - monthDiff;
        months[index].revenue += parseFloat(payment.amount) || 0;
      }
    }
  });
  
  return months;
};

// Main service function
const getDashboardData = async () => {
  try {
    // Fetch all data in parallel
    const [
      paymentsRes,
      inquiriesRes,
      partnershipsRes,
      usersRes,
      enrollmentsRes,
      jobsRes
    ] = await Promise.allSettled([
      paymentService.getAdminPayments({ limit: 1000 }),
      contactInquiryService.getAdminContactInquiries({ limit: 1000 }),
      partnersService.getAdminPartnerships({ limit: 1000 }),
      userService.getAllUsers(),
      trainingApplicationService.getAllApplications({ limit: 1000 }),
      jobsService.getAllJobsAdmin()
    ]);

    // Extract data with fallbacks
    const payments = paymentsRes.status === 'fulfilled' ? paymentsRes.value.payments || [] : [];
    const inquiries = inquiriesRes.status === 'fulfilled' ? inquiriesRes.value.inquiries || [] : [];
    const partnerships = partnershipsRes.status === 'fulfilled' ? partnershipsRes.value.data || [] : [];
    const users = usersRes.status === 'fulfilled' ? usersRes.value || [] : [];
    const enrollments = enrollmentsRes.status === 'fulfilled' ? enrollmentsRes.value || [] : [];
    const jobs = jobsRes.status === 'fulfilled' ? jobsRes.value || [] : [];

    // Calculate comprehensive stats
    const stats = {
      // Payments
      totalRevenue: payments
        .filter(p => p.status === 'completed' || p.status === 'success')
        .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0),
      totalPayments: payments.length,
      pendingPayments: payments.filter(p => p.status === 'pending').length,
      completedPayments: payments.filter(p => p.status === 'completed' || p.status === 'success').length,

      // Users
      totalUsers: users.length,
      activeUsers: users.filter(u => u.isActive || u.status === 'active').length,
      admins: users.filter(u => u.role === 'admin' || u.role === 'super_admin').length,
      pendingKYC: users.filter(u => u.kycStatus === 'pending' || u.verificationStatus === 'pending').length,

      // Enrollments
      enrollments: {
        total: enrollments.length,
        pending: enrollments.filter(e => e.status === 'pending').length,
        approved: enrollments.filter(e => e.status === 'approved').length,
        rejected: enrollments.filter(e => e.status === 'rejected').length
      },

      // Jobs & Applications
      totalJobs: jobs.length,
      activeJobs: jobs.filter(j => j.status === 'active' || j.status === 'published').length,
      pendingApplications: jobs.reduce((sum, job) => sum + (job.applicants?.filter(a => a.status === 'pending').length || 0), 0),

      // Inquiries
      totalInquiries: inquiries.length,
      unreadInquiries: inquiries.filter(i => i.status === 'unread' || i.status === 'pending').length,
      resolvedInquiries: inquiries.filter(i => i.status === 'resolved' || i.status === 'completed').length,

      // Partnerships
      totalPartnerships: partnerships.length,
      pendingPartnerships: partnerships.filter(p => p.status === 'pending').length,
      approvedPartnerships: partnerships.filter(p => p.status === 'approved').length
    };

    return {
      stats,
      recentActivity: getRecentActivity(payments, inquiries, enrollments, users),
      revenueChart: getRevenueChart(payments),
      quickActions: [
        { title: 'Pending KYC', count: stats.pendingKYC, path: '/admin/users', color: '#f59e0b' },
        { title: 'Job Applications', count: stats.pendingApplications, path: '/admin/jobs', color: '#3b82f6' },
        { title: 'Enrollments', count: stats.enrollments.pending, path: '/admin/training-applications', color: '#8b5cf6' },
        { title: 'Payments', count: stats.pendingPayments, path: '/admin/payments', color: '#10b981' },
        { title: 'Inquiries', count: stats.unreadInquiries, path: '/admin/contact-inquiries', color: '#ef4444' },
        { title: 'Partnerships', count: stats.pendingPartnerships, path: '/admin/partnerships', color: '#06b6d4' }
      ]
    };
  } catch (error) {
    console.error('[dashboardService] Error fetching dashboard data:', error);
    throw error;
  }
};

export default {
  getDashboardData
};
