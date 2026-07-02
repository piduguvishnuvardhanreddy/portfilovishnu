import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Helper to resolve image paths (local uploads vs absolute links)
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  // Strip "/api" from the end of the base URL to get the backend domain
  const apiBase = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';
  const backendHost = apiBase.replace(/\/api$/, '');
  return `${backendHost}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};

// Dynamic configuration of the admin credential headers
export const setAdminPasswordHeader = (password) => {
  if (password) {
    api.defaults.headers.common['x-admin-password'] = password;
    localStorage.setItem('portfolio_admin_password', password);
  } else {
    delete api.defaults.headers.common['x-admin-password'];
    localStorage.removeItem('portfolio_admin_password');
  }
};

// Initialize header on load if stored
const storedPassword = localStorage.getItem('portfolio_admin_password');
if (storedPassword) {
  api.defaults.headers.common['x-admin-password'] = storedPassword;
}

export const getStoredPassword = () => {
  return localStorage.getItem('portfolio_admin_password') || '';
};

// --- Projects CRUD ---
export const getProjects = async () => {
  const res = await api.get('/projects');
  return res.data;
};

export const createProject = async (data) => {
  const res = await api.post('/projects', data);
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await api.put(`/projects/${id}`, data);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};

// --- Skills CRUD ---
export const getSkills = async () => {
  const res = await api.get('/skills');
  return res.data;
};

export const createSkill = async (data) => {
  const res = await api.post('/skills', data);
  return res.data;
};

export const updateSkill = async (id, data) => {
  const res = await api.put(`/skills/${id}`, data);
  return res.data;
};

export const deleteSkill = async (id) => {
  const res = await api.delete(`/skills/${id}`);
  return res.data;
};

// --- Experience CRUD ---
export const getExperiences = async () => {
  const res = await api.get('/experiences');
  return res.data;
};

export const createExperience = async (data) => {
  const res = await api.post('/experiences', data);
  return res.data;
};

export const updateExperience = async (id, data) => {
  const res = await api.put(`/experiences/${id}`, data);
  return res.data;
};

export const deleteExperience = async (id) => {
  const res = await api.delete(`/experiences/${id}`);
  return res.data;
};

// --- Education CRUD ---
export const getEducations = async () => {
  const res = await api.get('/educations');
  return res.data;
};

export const createEducation = async (data) => {
  const res = await api.post('/educations', data);
  return res.data;
};

export const updateEducation = async (id, data) => {
  const res = await api.put(`/educations/${id}`, data);
  return res.data;
};

export const deleteEducation = async (id) => {
  const res = await api.delete(`/educations/${id}`);
  return res.data;
};

// --- Certificates CRUD ---
export const getCertificates = async () => {
  const res = await api.get('/certificates');
  return res.data;
};

export const createCertificate = async (data) => {
  const res = await api.post('/certificates', data);
  return res.data;
};

export const updateCertificate = async (id, data) => {
  const res = await api.put(`/certificates/${id}`, data);
  return res.data;
};

export const deleteCertificate = async (id) => {
  const res = await api.delete(`/certificates/${id}`);
  return res.data;
};

// --- Contact APIs ---
export const submitContact = async (data) => {
  const res = await api.post('/contacts', data);
  return res.data;
};

export const getMessages = async () => {
  const res = await api.get('/contacts');
  return res.data;
};

export const deleteMessage = async (id) => {
  const res = await api.delete(`/contacts/${id}`);
  return res.data;
};

// --- Image Upload API ---
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export default api;
