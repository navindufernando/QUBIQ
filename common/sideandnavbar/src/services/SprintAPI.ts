import axios from 'axios';

const API_URL = 'http://localhost:3000/sprint';

// Function to get auth token
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const getActiveSprint = async (userId: string) => {
    try {
        const token = getAuthToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const response = await axios.get(API_URL, { 
            params: { userId },
            headers
        });
        
        const activeSprint = response.data.find((sprint: any) => sprint.status === 'In Progress');
        return activeSprint;
    } catch (error) {
        console.error('Error fetching the active sprint:', error);
        throw error;
    }
};

export const createSprint = async (sprintData: any, userId: string) => {
    try {
        // Add token to request headers
        const token = getAuthToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const response = await axios.post(API_URL, { ...sprintData, userId }, { headers });
        return response.data;
    } catch (error) {
        console.error('Error creating sprint:', error);
        throw error;
    }
};

export const getAllSprints = async (userId: string) => {
    try {
        const token = getAuthToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const response = await axios.get(`${API_URL}`, {
            params: { userId },
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all sprints:', error);
        throw error;
    }
};

export const getSprintById = async (id: string, userId: string) => {
    try {
        const token = getAuthToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const response = await axios.get(`${API_URL}/${id}`, {
            params: { userId },
            headers
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching sprint with ID ${id}:`, error);
        throw error;
    }
};

export const updateSprint = async (id: string, userId: string, updatedData: any) => {
    try {
        const token = getAuthToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const response = await axios.put(`${API_URL}/${id}`, { ...updatedData, userId }, { headers });
        return response.data;
    } catch (error) {
        console.error('Error updating sprint:', error);
        throw error;
    }
};

export const deleteSprint = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting sprint:', error);
        throw error;
    }
};
