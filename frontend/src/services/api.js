import axios from 'axios';

const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || '/api' 
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

// Leaves
export const applyLeave = (data) => API.post('/leaves/apply', data);
export const getMyLeaves = () => API.get('/leaves/my');
export const getPendingLeaves = () => API.get('/leaves/pending');
export const getAllLeaves = () => API.get('/leaves/all');
export const updateLeave = (id, data) => API.put(`/leaves/update/${id}`, data);

export default API;
