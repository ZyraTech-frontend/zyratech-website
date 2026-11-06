/**
 * Email Management Service
 * Handles SMTP configuration, email addresses, and email templates
 */

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://your-backend-url.com';

// SMTP Configuration APIs
export const getSmtpConfig = async () => {
  const response = await axios.get(`${API_BASE}/admin/settings/email/smtp`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });
  return response.data;
};

export const updateSmtpConfig = async (config) => {
  const response = await axios.put(`${API_BASE}/admin/settings/email/smtp`, config, {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });
  return response.data;
};

export const testSmtpConnection = async (config) => {
  const response = await axios.post(`${API_BASE}/admin/settings/email/smtp/test`, config, {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });
  return response.data;
};

// Email Addresses APIs
export const getAllEmailAddresses = async () => {
  const response = await axios.get(`${API_BASE}/admin/email-addresses`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });
  return response.data;
};

export const getEmailAddress = async (type) => {
  const response = await axios.get(`${API_BASE}/admin/email-addresses/${type}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });
  return response.data;
};

export const updateEmailAddress = async (type, data) => {
  const response = await axios.put(`${API_BASE}/admin/email-addresses/${type}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });
  return response.data;
};

export const toggleEmailAddress = async (type) => {
  const response = await axios.patch(`${API_BASE}/admin/email-addresses/${type}/toggle`, {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });
  return response.data;
};

// Email Templates APIs
export const getAllEmailTemplates = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await axios.get(`${API_BASE}/admin/email-templates?${params}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });
  return response.data;
};

export const getEmailTemplate = async (id) => {
  const response = await axios.get(`${API_BASE}/admin/email-templates/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });
  return response.data;
};

export const getEmailTemplateByName = async (name) => {
  const response = await axios.get(`${API_BASE}/admin/email-templates/name/${name}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });
  return response.data;
};

export const createEmailTemplate = async (data) => {
  const response = await axios.post(`${API_BASE}/admin/email-templates`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });
  return response.data;
};

export const updateEmailTemplate = async (id, data) => {
  const response = await axios.put(`${API_BASE}/admin/email-templates/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });
  return response.data;
};

export const deleteEmailTemplate = async (id) => {
  const response = await axios.delete(`${API_BASE}/admin/email-templates/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });
  return response.data;
};

export const toggleEmailTemplate = async (id) => {
  const response = await axios.patch(`${API_BASE}/admin/email-templates/${id}/toggle`, {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });
  return response.data;
};

export const previewEmailTemplate = async (id, variables) => {
  const response = await axios.post(`${API_BASE}/admin/email-templates/${id}/preview`, { variables }, {
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
  });
  return response.data;
};
