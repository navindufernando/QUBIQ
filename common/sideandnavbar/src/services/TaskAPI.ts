import axios from 'axios';

const API_URL = 'http://localhost:3000/task';

export const getTaskByCounts = async (projectId: string) => {
    try {
        const response = await axios.get(`${API_URL}/count/${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching task count:', error);
        throw error;
    }
};

export const getTaskBySprintAndProject = async (projectId: string, sprintId: string) => {
    try {
        const response = await axios.get(`${API_URL}/project/${projectId}/sprint/${sprintId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks by project and sprint: ', error);
        throw error;
    }
}
