import apiClient from './api';

export const userService = {
  async getAllUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return apiClient.get(`/users?${queryString}`);
  },

  async getUserById(id) {
    return apiClient.get(`/users/${id}`);
  },

  async createUser(data) {
    return apiClient.post('/users', data);
  },

  async updateUser(id, data) {
    return apiClient.put(`/users/${id}`, data);
  },

  async deleteUser(id) {
    return apiClient.delete(`/users/${id}`);
  },

  async suspendUser(id, reason) {
    return apiClient.post(`/users/${id}/suspend`, { reason });
  },

  async impersonateUser(id) {
    return apiClient.post(`/users/${id}/impersonate`);
  }
};

export default userService;
