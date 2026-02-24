import apiClient from './api';

export const kycService = {
  async getPendingReviews() {
    return apiClient.get('/kyc/pending');
  },

  async getReviewById(id) {
    return apiClient.get(`/kyc/${id}`);
  },

  async approveReview(id, data) {
    return apiClient.post(`/kyc/${id}/approve`, data);
  },

  async rejectReview(id, reason) {
    return apiClient.post(`/kyc/${id}/reject`, { reason });
  },

  async requestMoreInfo(id, message) {
    return apiClient.post(`/kyc/${id}/request-info`, { message });
  }
};

export default kycService;
