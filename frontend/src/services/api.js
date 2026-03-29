import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('adminToken');
};

// Create axios instance with auth header
const createAuthRequest = () => {
  const token = getAuthToken();
  return axios.create({
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
};

// Auth APIs
export const adminLogin = async (username, password) => {
  const response = await axios.post(`${API}/admin/login`, { username, password });
  if (response.data.token) {
    localStorage.setItem('adminToken', response.data.token);
    localStorage.setItem('adminUser', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const adminLogout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};

export const getAdminUser = () => {
  const user = localStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Blog APIs
export const getAllBlogPosts = async () => {
  const response = await axios.get(`${API}/blog`);
  return response.data;
};

export const getBlogPostBySlug = async (slug) => {
  const response = await axios.get(`${API}/blog/${slug}`);
  return response.data;
};

export const getAllAdminBlogPosts = async () => {
  const authRequest = createAuthRequest();
  const response = await authRequest.get(`${API}/admin/blog`);
  return response.data;
};

export const createBlogPost = async (postData) => {
  const authRequest = createAuthRequest();
  const response = await authRequest.post(`${API}/admin/blog`, postData);
  return response.data;
};

export const updateBlogPost = async (postId, postData) => {
  const authRequest = createAuthRequest();
  const response = await authRequest.put(`${API}/admin/blog/${postId}`, postData);
  return response.data;
};

export const deleteBlogPost = async (postId) => {
  const authRequest = createAuthRequest();
  const response = await authRequest.delete(`${API}/admin/blog/${postId}`);
  return response.data;
};

// Contact APIs
export const submitContactForm = async (formData) => {
  const response = await axios.post(`${API}/contact`, formData);
  return response.data;
};

export const getAllContactSubmissions = async () => {
  const authRequest = createAuthRequest();
  const response = await authRequest.get(`${API}/admin/contacts`);
  return response.data;
};

export const updateContactStatus = async (contactId, status) => {
  const authRequest = createAuthRequest();
  const response = await authRequest.put(`${API}/admin/contacts/${contactId}`, { status });
  return response.data;
};