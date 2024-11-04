import axios from 'axios';
import { getTokenFromLocalStorage, getYearFromLocalStorage } from '../helpers/localstorage.helper';

// Используем переменные окружения через import.meta.env для Vite
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  // baseURL из .env
  headers: {
    Authorization: 'Bearer ' + getTokenFromLocalStorage() || "",
    'x-secret-key': import.meta.env.VITE_SECRET_KEY,  // Добавляем секретный ключ,
    'current-year': getYearFromLocalStorage() || "",
  }
});

export default api;

export const staticUrl = import.meta.env.VITE_STATIC_URL || ''; // static URL из .env
