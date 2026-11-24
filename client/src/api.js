import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const errMsg = (err) => err?.response?.data?.message || err.message || 'Something went wrong';
export const CATEGORIES = ['Politics', 'Sports', 'Technology', 'Entertainment', 'Business', 'Health', 'General'];
export default api;
