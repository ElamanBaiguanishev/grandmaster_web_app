import axios from 'axios';
import { getTokenFromLocalStorage, getYearFromLocalStorage } from '../helpers/localstorage.helper';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  // baseURL из .env
  headers: {
    'x-secret-key': import.meta.env.VITE_SECRET_KEY,
    'current-year': getYearFromLocalStorage() || "",
  }
});

api.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

export const staticUrl = import.meta.env.VITE_STATIC_URL || '';
