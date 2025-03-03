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