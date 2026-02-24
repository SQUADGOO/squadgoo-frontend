import apiClient from './api';

export const notificationService = {
  async getAllNotifications(params = {}) {
    return apiClient.get('/notifications', { params });
  },

  async sendNotification(data) {
    return apiClient.post('/notifications/send', data);
  },

  async getTemplates() {
    return apiClient.get('/notifications/templates');
  },

  async createTemplate(data) {
    return apiClient.post('/notifications/templates', data);
  },

  async updateTemplate(id, data) {
    return apiClient.put(`/notifications/templates/${id}`, data);
  },

  async deleteTemplate(id) {
    return apiClient.delete(`/notifications/templates/${id}`);
  }
};

export default notificationService;
