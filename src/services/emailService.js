import api from './api';

// Helper to extract list data from various backend response shapes
const extractList = (response) => {
  const body = response?.data ?? response;
  if (Array.isArray(body)) {
    console.log('[extractList] Got direct array, length:', body.length);
    return body;
  }
  if (Array.isArray(body?.data)) {
    console.log('[extractList] Got body.data array, length:', body.data.length);
    return body.data;
  }
  if (Array.isArray(body?.data?.data)) {
    console.log('[extractList] Got body.data.data array, length:', body.data.data.length);
    return body.data.data;
  }
  console.warn('[extractList] Could not extract array from response:', body);
  return [];
};

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
  console.log('[emailService] getAllEmailAddresses raw response:', response.data);
  return extractList(response);
};

export const getEmailAddress = async (type) => {
  const response = await api.get(`/admin/email-addresses/${type}`);
  return response.data;
};

export const createEmailAddress = async (data) => {
  const response = await api.post('/admin/email-addresses', data);
  return response.data;
};

export const updateEmailAddress = async (id, data) => {
  const response = await api.put(`/admin/email-addresses/${id}`, data);
  return response.data;
};

export const toggleEmailAddress = async (id) => {
  const response = await api.patch(`/admin/email-addresses/${id}/toggle`, {});
  return response.data;
};


export const deleteEmailAddress = async (type) => {
  const response = await api.delete(`/admin/email-addresses/${type}`);
  return response.data;
};
// Email Templates APIs
export const getAllEmailTemplates = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await api.get(`/admin/email-templates?${params}`);
  console.log('[emailService] getAllEmailTemplates raw response:', response.data);
  return extractList(response);
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


