import axios from 'axios';

const isLocalDev = typeof window !== 'undefined' && window.location.port === '3000';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (isLocalDev ? 'http://localhost:8000' : ''),
  headers: {
    'Content-Type': 'application/json',
  },
});
