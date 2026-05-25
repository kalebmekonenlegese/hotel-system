const API_URL = "http://localhost:5000/api/auth";

/**
 * Handle network and response errors
 * @param {Error} error - The error object
 * @returns {Error} - Processed error with user-friendly message
 */
const handleNetworkError = (error) => {
  if (error instanceof TypeError) {
    // Network error (fetch failed)
    const networkError = new Error(
      "Network error: Unable to connect to the server. Please check your internet connection."
    );
    networkError.type = "network";
    return networkError;
  }
  return error;
};

export const authService = {
  // Register new user
  register: async (email, password, name) => {
    try {
      // Validate input
      if (!email || !password || !name) {
        throw new Error("Email, password, and name are required");
      }

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, name })
      });

      // Handle HTTP errors
      if (!response.ok) {
        let errorMessage = "Registration failed";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          // If response body is not JSON, use status text
          errorMessage = `Registration failed (${response.status}: ${response.statusText})`;
        }

        const error = new Error(errorMessage);
        error.status = response.status;
        throw error;
      }

      const data = await response.json();

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      // Handle network errors
      throw handleNetworkError(error);
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      // Validate input
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      // Handle HTTP errors
      if (!response.ok) {
        let errorMessage = "Login failed";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          // If response body is not JSON, use status text
          errorMessage = `Login failed (${response.status}: ${response.statusText})`;
        }

        const error = new Error(errorMessage);
        error.status = response.status;
        throw error;
      }

      const data = await response.json();

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      // Handle network errors
      throw handleNetworkError(error);
    }
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Get token
  getToken: () => {
    return localStorage.getItem("token");
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};
