/**
 * Email Notification Service
 * Handles all email sending through AWS SES via backend API
 * 
 * This service provides methods for sending various types of emails:
 * - Transactional emails (password reset, verification, confirmations)
 * - Application confirmations (jobs, training, projects)
 * - Admin notifications (contact responses, newsletters)
 * - User notifications (abandoned form recovery)
 * 
 * All emails are processed through the backend with AWS SES integration.
 */

import api from './api';

const emailNotificationService = {
  /**
   * Send password reset email
   * POST /api/email/send-password-reset
   * 
   * @param {string} email - User's email address
   * @returns {Promise<Object>} Send response
   */
  sendPasswordResetEmail: async (email) => {
    try {
      const response = await api.post('/email/send-password-reset', { email });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  },

  /**
   * Send email verification message
   * POST /api/email/send-verification
   * 
   * @param {string} email - User's email address
   * @returns {Promise<Object>} Send response
   */
  sendVerificationEmail: async (email) => {
    try {
      const response = await api.post('/email/send-verification', { email });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw error;
    }
  },

  /**
   * Send contact inquiry confirmation to user
   * POST /api/email/send-contact-confirmation
   * 
   * @param {Object} data - Contact inquiry data
   * @param {string} data.email - User's email
   * @param {string} data.name - User's name
   * @param {string} data.subject - Inquiry subject
   * @param {string} data.inquiryId - Inquiry ID for reference
   * @returns {Promise<Object>} Send response
   */
  sendContactConfirmation: async (data) => {
    try {
      const response = await api.post('/email/send-contact-confirmation', {
        email: data.email,
        name: data.name,
        subject: data.subject,
        inquiryId: data.inquiryId
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error sending contact confirmation email:', error);
      throw error;
    }
  },

  /**
   * Send contact inquiry response to user (from admin)
   * POST /api/email/send-contact-response
   * 
   * @param {Object} data - Response data
   * @param {string} data.email - User's email
   * @param {string} data.name - User's name
   * @param {string} data.response - Admin's response message
   * @param {string} data.subject - Original inquiry subject
   * @returns {Promise<Object>} Send response
   */
  sendContactResponse: async (data) => {
    try {
      const response = await api.post('/email/send-contact-response', {
        email: data.email,
        name: data.name,
        response: data.response,
        subject: data.subject
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error sending contact response email:', error);
      throw error;
    }
  },

  /**
   * Send job application confirmation
   * POST /api/email/send-job-application-confirmation
   * 
   * @param {Object} data - Application data
   * @param {string} data.email - Applicant's email
   * @param {string} data.firstName - Applicant's first name
   * @param {string} data.jobTitle - Job title applied for
   * @param {string} data.applicationId - Application ID for reference
   * @returns {Promise<Object>} Send response
   */
  sendJobApplicationConfirmation: async (data) => {
    try {
      const response = await api.post('/email/send-job-application-confirmation', {
        email: data.email,
        firstName: data.firstName,
        jobTitle: data.jobTitle,
        applicationId: data.applicationId
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error sending job application confirmation email:', error);
      throw error;
    }
  },

  /**
   * Send training course application confirmation
   * POST /api/email/send-training-application-confirmation
   * 
   * @param {Object} data - Application data
   * @param {string} data.email - Applicant's email
   * @param {string} data.fullName - Applicant's full name
   * @param {string} data.courseName - Course name applied for
   * @param {string} data.applicationId - Application ID for reference
   * @returns {Promise<Object>} Send response
   */
  sendTrainingApplicationConfirmation: async (data) => {
    try {
      const response = await api.post('/email/send-training-application-confirmation', {
        email: data.email,
        fullName: data.fullName,
        courseName: data.courseName,
        applicationId: data.applicationId
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error sending training application confirmation email:', error);
      throw error;
    }
  },

  /**
   * Send project request confirmation
   * POST /api/email/send-project-request-confirmation
   * 
   * @param {Object} data - Request data
   * @param {string} data.email - Requester's email
   * @param {string} data.fullName - Requester's full name
   * @param {string} data.projectTitle - Project title
   * @param {string} data.requestId - Request ID for reference
   * @returns {Promise<Object>} Send response
   */
  sendProjectRequestConfirmation: async (data) => {
    try {
      const response = await api.post('/email/send-project-request-confirmation', {
        email: data.email,
        fullName: data.fullName,
        projectTitle: data.projectTitle,
        requestId: data.requestId
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error sending project request confirmation email:', error);
      throw error;
    }
  },

  /**
   * Send newsletter subscription confirmation
   * POST /api/email/send-newsletter-subscription-confirmation
   * 
   * @param {Object} data - Subscription data
   * @param {string} data.email - Subscriber's email
   * @param {string} data.name - Subscriber's name (optional)
   * @returns {Promise<Object>} Send response
   */
  sendNewsletterSubscriptionConfirmation: async (data) => {
    try {
      const response = await api.post('/email/send-newsletter-subscription-confirmation', {
        email: data.email,
        name: data.name || ''
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error sending newsletter subscription confirmation email:', error);
      throw error;
    }
  },

  /**
   * Send abandoned form recovery email to user
   * POST /api/email/send-abandoned-form-recovery
   * 
   * @param {Object} data - Form data
   * @param {string} data.email - User's email
   * @param {string} data.name - User's name
   * @param {string} data.formType - Type of form (job, training, project, etc.)
   * @param {string} data.resumeLink - Link to resume abandoned form
   * @returns {Promise<Object>} Send response
   */
  sendAbandonedFormRecovery: async (data) => {
    try {
      const response = await api.post('/email/send-abandoned-form-recovery', {
        email: data.email,
        name: data.name,
        formType: data.formType,
        resumeLink: data.resumeLink
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error sending abandoned form recovery email:', error);
      throw error;
    }
  },

  /**
   * Send custom email (admin only)
   * POST /api/email/send-custom
   * 
   * @param {Object} data - Email data
   * @param {string} data.to - Recipient email address
   * @param {string} data.subject - Email subject
   * @param {string} data.body - Email body (HTML allowed)
   * @param {string} data.templateName - Optional template name to use
   * @returns {Promise<Object>} Send response
   */
  sendCustomEmail: async (data) => {
    try {
      const response = await api.post('/email/send-custom', {
        to: data.to,
        subject: data.subject,
        body: data.body,
        templateName: data.templateName
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error sending custom email:', error);
      throw error;
    }
  },

  /**
   * Send bulk newsletter campaign to subscribers
   * POST /api/email/send-newsletter-campaign
   * 
   * @param {Object} data - Campaign data
   * @param {string} data.subject - Campaign subject
   * @param {string} data.body - Campaign body (HTML allowed)
   * @param {string} data.recipientGroup - Recipient group: "all", "subscribed", "active"
   * @returns {Promise<Object>} Send response with sent count
   */
  sendNewsletterCampaign: async (data) => {
    try {
      const response = await api.post('/email/send-newsletter-campaign', {
        subject: data.subject,
        body: data.body,
        recipientGroup: data.recipientGroup || 'all'
      });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error sending newsletter campaign:', error);
      throw error;
    }
  },

  /**
   * Get email notification preferences for user
   * GET /api/email/preferences
   * 
   * @returns {Promise<Object>} User's email preferences
   */
  getEmailPreferences: async () => {
    try {
      const response = await api.get('/email/preferences');
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error fetching email preferences:', error);
      throw error;
    }
  },

  /**
   * Update email notification preferences for user
   * POST /api/email/preferences
   * 
   * @param {Object} preferences - Preference object
   * @param {boolean} preferences.newsletters - Opt in/out of newsletters
   * @param {boolean} preferences.applicationUpdates - Opt in/out of application updates
   * @param {boolean} preferences.serviceUpdates - Opt in/out of service updates
   * @param {boolean} preferences.promotionalEmails - Opt in/out of promotional emails
   * @returns {Promise<Object>} Updated preferences
   */
  updateEmailPreferences: async (preferences) => {
    try {
      const response = await api.post('/email/preferences', preferences);
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error updating email preferences:', error);
      throw error;
    }
  }
};

export default emailNotificationService;
