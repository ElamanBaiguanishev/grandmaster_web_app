// src/api/index.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/', // Замените на ваш URL
});

export default api;
