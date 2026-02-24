import apiClient from './api';

export const authService = {
  async login(credentials) {
    return apiClient.post('/auth/login', credentials);
  },

  async logout() {
    return apiClient.post('/auth/logout');
  },

  async refreshToken() {
    return apiClient.post('/auth/refresh');
  },

  async getCurrentUser() {
    return apiClient.get('/auth/me');
  },

  async updatePassword(data) {
    return apiClient.put('/auth/password', data);
  }
};

export default authService;
