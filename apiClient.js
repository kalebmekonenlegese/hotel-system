import { authService } from './authService';

export const apiClient = {
  // Utility to add token to headers
  getHeaders: () => {
    const token = authService.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  },

  // GET request
  get: async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: apiClient.getHeaders()
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // POST request
  post: async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: apiClient.getHeaders(),
        body: JSON.stringify(data)
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // PUT request
  put: async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: apiClient.getHeaders(),
        body: JSON.stringify(data)
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // DELETE request
  delete: async (url) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: apiClient.getHeaders()
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
};
