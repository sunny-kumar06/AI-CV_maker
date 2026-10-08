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
  withCredentials: true
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

export default api;
