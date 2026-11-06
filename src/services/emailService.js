import api from './api';

// SMTP Configuration APIs
export const getSmtpConfig = async () => {
  const response = await api.get('/admin/settings/email/smtp');
  return response.data;
};

export const updateSmtpConfig = async (config) => {
  const response = await api.put('/admin/settings/email/smtp', config);
  return response.data;
};

export const testSmtpConnection = async (config) => {
  const response = await api.post('/admin/settings/email/smtp/test', config);
  return response.data;
};

// Email Addresses APIs
export const getAllEmailAddresses = async () => {
  const response = await api.get('/admin/email-addresses');
  return response.data;
};

export const getEmailAddress = async (type) => {
  const response = await api.get(`/admin/email-addresses/${type}`);
  return response.data;
};

export const updateEmailAddress = async (type, data) => {
  const response = await api.put(`/admin/email-addresses/${type}`, data);
  return response.data;
};

export const toggleEmailAddress = async (type) => {
  const response = await api.patch(`/admin/email-addresses/${type}/toggle`, {});
  return response.data;
};

// Email Templates APIs
export const getAllEmailTemplates = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/admin/email-templates?${params}`);
  return response.data;
};

export const getEmailTemplate = async (id) => {
  const response = await api.get(`/admin/email-templates/${id}`);
  return response.data;
};

export const getEmailTemplateByName = async (name) => {
  const response = await api.get(`/admin/email-templates/name/${name}`);
  return response.data;
};

export const createEmailTemplate = async (data) => {
  const response = await api.post('/admin/email-templates', data);
  return response.data;
};

export const updateEmailTemplate = async (id, data) => {
  const response = await api.put(`/admin/email-templates/${id}`, data);
  return response.data;
};

export const deleteEmailTemplate = async (id) => {
  const response = await api.delete(`/admin/email-templates/${id}`);
  return response.data;
};

export const toggleEmailTemplate = async (id) => {
  const response = await api.patch(`/admin/email-templates/${id}/toggle`, {});
  return response.data;
};

export const previewEmailTemplate = async (id, variables) => {
  const response = await api.post(`/admin/email-templates/${id}/preview`, { variables });
  return response.data;
};
