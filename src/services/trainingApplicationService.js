/**
 * Training Applications Service
 * Handle course enrollment applications
 */

import api from './api';

export const trainingApplicationService = {
  // Submit course application (with CV file for advanced programs)
  submitApplication: async (applicationData) => {
    try {
      // Check if we need to send as FormData (for file upload)
      if (applicationData.cvFile) {
        const formData = new FormData();
        
        // Add all text fields
        formData.append('courseId', applicationData.courseId);
        formData.append('fullName', applicationData.fullName);
        formData.append('emailAddress', applicationData.emailAddress);
        formData.append('phoneNumber', applicationData.phoneNumber);
        formData.append('country', applicationData.country);
        formData.append('currentLocation', applicationData.currentLocation);
        formData.append('educationLevel', applicationData.educationLevel);
        formData.append('preferredCohort', applicationData.preferredCohort);
        formData.append('learningMode', applicationData.learningMode);
        
        // Add optional fields
        if (applicationData.message) formData.append('message', applicationData.message);
        if (applicationData.motivationStatement) formData.append('motivationStatement', applicationData.motivationStatement);
        if (applicationData.linkedinUrl) formData.append('linkedinUrl', applicationData.linkedinUrl);
        if (applicationData.websiteUrl) formData.append('websiteUrl', applicationData.websiteUrl);
        
        // Add CV file
        formData.append('cvFile', applicationData.cvFile);
        
        const response = await api.post('/training/applications', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data?.data || response.data;
      } else {
        // Send as regular JSON for basic programs
        const response = await api.post('/training/applications', {
          courseId: applicationData.courseId,
          fullName: applicationData.fullName,
          emailAddress: applicationData.emailAddress,
          phoneNumber: applicationData.phoneNumber,
          country: applicationData.country,
          currentLocation: applicationData.currentLocation,
          educationLevel: applicationData.educationLevel,
          preferredCohort: applicationData.preferredCohort,
          learningMode: applicationData.learningMode,
          message: applicationData.message || ''
        });
        return response.data?.data || response.data;
      }
    } catch (error) {
      console.error('Application submission failed:', error);
      throw error;
    }
  },

  // Get all applications (admin only)
  getAllApplications: async (params = {}) => {
    try {
      const response = await api.get('/admin/enrollments', { params });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      throw error;
    }
  },

  // Get single application details (admin only)
  getApplication: async (applicationId) => {
    try {
      const response = await api.get(`/admin/enrollments/${applicationId}`);
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Failed to fetch application:', error);
      throw error;
    }
  },

  // Get payment for an application by searching transactions with student email
  getApplicationPayment: async (applicationId) => {
    try {
      // First get the application to get student email
      const appResponse = await api.get(`/admin/enrollments/${applicationId}`);
      const application = appResponse.data?.data || appResponse.data;
      
      if (!application || !application.emailAddress) {
        return null;
      }
      
      // Search transactions by student email with completed status
      const response = await api.get(`/admin/transactions`, {
        params: {
          search: application.emailAddress,
          status: 'completed',
          limit: 10
        }
      });
      
      // Handle nested data structure: response.data.data.data
      const transactions = response.data?.data?.data || response.data?.data || response.data || [];
      
      console.log('📦 Transactions response:', response.data);
      console.log('📋 Transactions array:', transactions);
      
      // Filter to find payment matching this application's course
      const payment = transactions.find(t => 
        t.paymentType === 'training' && 
        (t.courseTitle === application.courseTitle || t.courseId === application.courseId)
      );
      
      console.log('💰 Found payment:', payment);
      
      return payment || null;
    } catch (error) {
      console.log('No payment found for application:', applicationId, error);
      return null;
    }
  },

  // Update application status (admin only)
  updateApplicationStatus: async (applicationId, status, notes = '') => {
    try {
      const response = await api.put(`/admin/enrollments/${applicationId}/status`, {
        status,
        notes
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Failed to update application status:', error);
      throw error;
    }
  }
};

export default trainingApplicationService;
