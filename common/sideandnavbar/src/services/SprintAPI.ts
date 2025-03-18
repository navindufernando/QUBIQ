import axios from 'axios';

const API_URL = 'http://localhost:3000/sprint';

export const createSprint = async (sptrintData: any) => {
    try {
        const response = await axios.post(API_URL, sptrintData);
        return response.data;
    } catch (error) {
        console.log('Error creating sprint: ', error);
        throw error;
    }
};

export const getAllSprints = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all the sprints', error);
        throw error;
    }
}

export const getSprintById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching project with ID ${id}`, error);
        throw error;
    }
}

export const getActiveSprint = async () => {
    try {
        const response = await axios.get(API_URL);
        const activeSprint = response.data.find((sprint: any) => sprint.status === 'Ongoing');
        return activeSprint;
    } catch (error) {
        console.error('Error fetching the active sprint: ', error);
        throw error;
    }
}

export const updateSprint = async (id: string, updatedData: any) => {
    try {
        const response = await axios.put(API_URL, updatedData);
        return response.data;
    } catch (error) {
        console.log('Error updating sprint: ', error);
        throw error;
    }
}