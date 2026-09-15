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
      const response = await api.get('/admin/training/applications', { params });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      throw error;
    }
  },

  // Get single application details (admin only)
  getApplication: async (applicationId) => {
    try {
      const response = await api.get(`/admin/training/applications/${applicationId}`);
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Failed to fetch application:', error);
      throw error;
    }
  },

  // Update application status (admin only)
  updateApplicationStatus: async (applicationId, status, notes = '') => {
    try {
      const response = await api.patch(`/admin/training/applications/${applicationId}`, {
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
