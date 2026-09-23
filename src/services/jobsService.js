/**
 * Jobs Service
 * Manage job listings and applications
 */

import api from './api';

export const jobsService = {
  // Public: Get all jobs
  getAllJobs: async (params = {}) => {
    try {
      const response = await api.get('/jobs', { params });
      console.log('Backend jobs response:', response);
      
      // Handle multiple possible response formats
      const data = response.data;
      let jobs = [];
      
      // Format 1: { success: true, data: { data: [...] } }
      if (data.success && data.data && Array.isArray(data.data.data)) {
        jobs = data.data.data;
      }
      // Format 2: { success: true, data: [...] }
      else if (data.success && Array.isArray(data.data)) {
        jobs = data.data;
      }
      // Format 3: { data: [...] }
      else if (data.data && Array.isArray(data.data.data)) {
        jobs = data.data.data;
      }
      // Format 4: Direct array
      else if (Array.isArray(data.data)) {
        jobs = data.data;
      }
      // Format 5: Direct array response
      else if (Array.isArray(data)) {
        jobs = data;
      }
      
      // Normalize job fields to match frontend expectations
      jobs = jobs.map(job => ({
        ...job,
        // Handle location field - backend uses 'location', frontend expects 'locations' array
        locations: job.locations || (job.location ? [job.location] : []),
        // Map backend field names to frontend field names for display
        // Backend sends: requirements, responsibilities, benefits
        qualifications: job.requirements || [],
        perks: job.benefits || [],
        // Ensure arrays exist
        responsibilities: job.responsibilities || [],
        // Ensure text fields exist
        description: job.description || '',
        jobDescription: job.description || '',
        companyDescription: job.companyDescription || '',
        // Level and department fields
        level: job.level || '',
        department: job.department || ''
      }));
      
      console.log('Processed jobs:', jobs);
      return jobs;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      console.error('Response status:', error.response?.status);
      console.error('Response data:', error.response?.data);
      throw error;
    }
  },

  // Public: Get single job by ID or slug
  getJob: async (idOrSlug) => {
    try {
      const response = await api.get(`/jobs/${idOrSlug}`);
      // Handle both nested and flat response formats
      let job = response.data.data?.data || response.data.data || response.data;
      
      // Normalize job fields to match frontend expectations
      if (job) {
        job = {
          ...job,
          // Handle location field - backend uses 'location', frontend expects 'locations' array
          locations: job.locations || (job.location ? [job.location] : []),
          // Map backend field names to frontend field names for display
          // Backend sends: requirements, responsibilities, benefits
          qualifications: job.requirements || [],
          perks: job.benefits || [],
          // Ensure arrays exist
          responsibilities: job.responsibilities || [],
          // Ensure text fields exist
          description: job.description || '',
          jobDescription: job.description || '',
          companyDescription: job.companyDescription || '',
          // Level and department fields
          level: job.level || '',
          department: job.department || ''
        };
      }
      
      console.log('Processed single job:', job);
      return job;
    } catch (error) {
      console.error(`Error fetching job ${idOrSlug}:`, error);
      throw error;
    }
  },

  // Public: Get jobs by category
  getJobsByCategory: async (category, params = {}) => {
    try {
      const response = await api.get('/jobs', { 
        params: { ...params, category } 
      });
      const jobs = response.data.data?.data || response.data.data || [];
      return jobs;
    } catch (error) {
      console.error(`Error fetching jobs for category ${category}:`, error);
      throw error;
    }
  },

  // Public: Search jobs
  searchJobs: async (searchTerm, params = {}) => {
    try {
      const response = await api.get('/jobs', { 
        params: { ...params, search: searchTerm } 
      });
      const jobs = response.data.data?.data || response.data.data || [];
      return jobs;
    } catch (error) {
      console.error(`Error searching jobs:`, error);
      throw error;
    }
  },

  // Public: Submit job application
  submitJobApplication: async (jobId, applicationData) => {
    try {
      // Backend expects: POST /jobs/applications with FormData (multipart/form-data)
      // Fields: jobId, coverLetter, resume (required), additionalAttachments (optional)
      // Note: Don't set Content-Type manually - let browser set it with boundary
      const response = await api.post('/jobs/applications', applicationData);
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error submitting job application:', error);
      throw error;
    }
  },

  // Admin: Get all jobs
  getAllJobsAdmin: async (params = {}) => {
    try {
      const response = await api.get('/admin/jobs', { params });
      return response.data.data?.data || response.data.data || [];
    } catch (error) {
      console.error('Error fetching admin jobs:', error);
      throw error;
    }
  },

  // Admin: Create job
  createJob: async (jobData) => {
    try {
      const response = await api.post('/admin/jobs', jobData);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  // Admin: Update job
  updateJob: async (jobId, jobData) => {
    try {
      const response = await api.put(`/admin/jobs/${jobId}`, jobData);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  // Admin: Delete job
  deleteJob: async (jobId) => {
    try {
      const response = await api.delete(`/admin/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  },

  // Admin: Get job applications
  getJobApplications: async (jobId, params = {}) => {
    try {
      const response = await api.get(`/admin/jobs/${jobId}/applications`, { params });
      return response.data?.data?.data || response.data?.data || [];
    } catch (error) {
      console.error('Error fetching job applications:', error);
      throw error;
    }
  },

  // Admin: Update application status
  updateApplicationStatus: async (applicationId, status, notes = '') => {
    try {
      const response = await api.patch(`/admin/job-applications/${applicationId}`, { 
        status, 
        notes 
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  },

  // Admin: Get single application
  getApplication: async (applicationId) => {
    try {
      const response = await api.get(`/admin/job-applications/${applicationId}`);
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error fetching application:', error);
      throw error;
    }
  }
};

export default jobsService;
