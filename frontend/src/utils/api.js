import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true, // Crucial for HttpOnly Cookie transport
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor (e.g. for custom logging or injection)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (e.g. auto redirection on 401 Unauthorized status)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Auto-handling logout or session expiration stubs...
      console.warn('Session expired or unauthorized request.');
    }
    return Promise.reject(error);
  }
);

export default api;
