import axios from 'axios';

const API_URL = 'http://localhost:3000/project';


export const getAllProjects = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all the projects', error);
        throw error;
    }
}

export const getProjectById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching project with ID ${id}`, error);
        throw error;
    }
}