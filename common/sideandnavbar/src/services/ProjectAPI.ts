// services/ProjectAPI.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/project';

// This configures axios to automatically include the auth token in all requests
const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Call this function when your app initializes
setupAxiosInterceptors();

export const getAllProjects = async (userId?: string) => {
  try {
    // If userId is provided, get projects for specific user
    const url = userId ? `${API_URL}?userId=${userId}` : API_URL;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching all the projects', error);
    throw error;
  }
};

export const getProjectById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with ID ${id}`, error);
    throw error;
  }
};

// Add new function to get projects for the current user
export const getUserProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user projects', error);
    throw error;
  }
};