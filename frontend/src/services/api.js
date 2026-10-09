import axios from "axios";

/**
 * Centralized API Base URL Configuration
 * Supports VITE_API_URL and VITE_API_BASE_URL for Vercel deployment,
 * with production Render fallback (https://ai-cv-maker-z6q6.onrender.com)
 * and local development fallback (http://localhost:8080).
 */
const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    return envUrl.replace(/\/+$/, "");
  }
  if (import.meta.env.DEV) {
    return "http://localhost:8080";
  }
  return "https://ai-cv-maker-z6q6.onrender.com";
};

const API_BASE_URL = getBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 20000 // 20 seconds timeout for Render cold-starts & network resiliency
});

// Interceptor to attach JWT token from localStorage if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for user-friendly error formatting & timeout handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED' || (error.message && error.message.toLowerCase().includes('timeout'))) {
      error.customMessage = "Server is starting or taking longer to respond. Please try again in a few seconds.";
    } else if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
      error.customMessage = "Network error. Please check your connection or try again shortly.";
    }
    return Promise.reject(error);
  }
);

export default api;
