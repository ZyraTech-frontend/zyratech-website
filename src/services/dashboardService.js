/**
 * Dashboard Service
 * Aggregates data from multiple endpoints for dashboard display
 */

import api from './api';
import jobsService from './jobsService';
import trainingService from './trainingService';
import projectsService from './projectsService';
import paymentService from './paymentService';
import contactInquiryService from './contactInquiryService';
import partnersService from './partnersService';
import userService from './userService';
import activityLogService from './activityLogService';
import newsletterService from './newsletterService';
import blogService from './blogService';

const dashboardService = {
  /**
   * Get comprehensive dashboard statistics
   */
  getDashboardStats: async () => {
    try {
      const [
        jobs,
        payments,
        contactInquiries,
        partnerships,
        users,
        newsletter,
        blogs
      ] = await Promise.allSettled([
        jobsService.getAllJobsAdmin().catch(() => []),
        paymentService.getAdminPayments({ limit: 1000 }).catch(() => ({ payments: [], pagination: {} })),
        contactInquiryService.getAdminContactInquiries({ limit: 1000 }).catch(() => ({ inquiries: [] })),
        partnersService.getAdminPartnerships({ limit: 1000 }).catch(() => ({ data: [] })),
        userService.getAllUsers().catch(() => []),
        newsletterService.getAdminSubscribers({ limit: 1000 }).catch(() => ({ subscribers: [] })),
        blogService.getAdminBlogs({ limit: 1000 }).catch(() => ({ articles: [] }))
      ]);

      const jobsData = jobs.status === 'fulfilled' ? jobs.value : [];
      const paymentsData = payments.status === 'fulfilled' ? payments.value : { payments: [], pagination: {} };
      const inquiriesData = contactInquiries.status === 'fulfilled' ? contactInquiries.value : { inquiries: [] };
      const partnershipsData = partnerships.status === 'fulfilled' ? partnerships.value : { data: [] };
      const usersData = users.status === 'fulfilled' ? users.value : [];
      const newsletterData = newsletter.status === 'fulfilled' ? newsletter.value : { subscribers: [] };
      const blogsData = blogs.status === 'fulfilled' ? blogs.value : { articles: [] };

      const stats = {
        jobs: {
          total: Array.isArray(jobsData) ? jobsData.length : 0,
          active: Array.isArray(jobsData) ? jobsData.filter(j => j.status === 'active' || j.status === 'published').length : 0,
        },
        payments: {
          total: paymentsData.payments?.length || 0,
          completed: paymentsData.payments?.filter(p => p.status === 'completed' || p.status === 'success').length || 0,
          pending: paymentsData.payments?.filter(p => p.status === 'pending').length || 0,
          totalRevenue: paymentsData.payments?.reduce((sum, p) => {
            if (p.status === 'completed' || p.status === 'success') {
              return sum + (parseFloat(p.amount) || 0);
            }
            return sum;
          }, 0) || 0,
        },
        inquiries: {
          total: inquiriesData.inquiries?.length || 0,
          unread: inquiriesData.inquiries?.filter(i => i.status === 'unread' || i.status === 'pending').length || 0,
          resolved: inquiriesData.inquiries?.filter(i => i.status === 'resolved' || i.status === 'completed').length || 0,
        },
        partnerships: {
          total: partnershipsData.data?.length || 0,
          approved: partnershipsData.data?.filter(p => p.status === 'approved').length || 0,
          pending: partnershipsData.data?.filter(p => p.status === 'pending').length || 0,
        },
        users: {
          total: Array.isArray(usersData) ? usersData.length : 0,
          admins: Array.isArray(usersData) ? usersData.filter(u => u.role === 'admin' || u.role === 'super_admin').length : 0,
        },
        newsletter: {
          total: newsletterData.subscribers?.length || 0,
          active: newsletterData.subscribers?.filter(s => s.status === 'active' || s.isActive).length || 0,
        },
        blog: {
          total: blogsData.articles?.length || 0,
          published: blogsData.articles?.filter(b => b.status === 'published').length || 0,
        },
      };

      return stats;
    } catch (error) {
      console.error('[dashboardService] Error:', error);
      throw error;
    }
  },

  getRecentActivity: async (limit = 10) => {
    try {
      const response = await activityLogService.getAdminActivityLogs({ limit });
      return response.logs || response.data || [];
    } catch (error) {
      console.error('[dashboardService] Error fetching activity:', error);
      return [];
    }
  },

  getRevenueChart: async (months = 6) => {
    try {
      const response = await paymentService.getAdminPayments({ limit: 1000 });
      const payments = response.payments || [];
      
      const monthlyData = {};
      const now = new Date();
      
      for (let i = months - 1; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = date.toLocaleDateString('en-US', { month: 'short' });
        monthlyData[key] = 0;
      }

      payments.forEach(payment => {
        if (payment.status === 'completed' || payment.status === 'success') {
          const date = new Date(payment.createdAt || payment.paidAt);
          const key = date.toLocaleDateString('en-US', { month: 'short' });
          if (monthlyData[key] !== undefined) {
            monthlyData[key] += parseFloat(payment.amount) || 0;
          }
        }
      });

      return Object.entries(monthlyData).map(([month, amount]) => ({
        month,
        amount: parseFloat(amount.toFixed(2)),
      }));
    } catch (error) {
      console.error('[dashboardService] Error fetching revenue chart:', error);
      return [];
    }
  },
};

export default dashboardService;