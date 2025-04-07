import axios from 'axios';
import { ProjectReview, Objective, Risk, Highlight, FeedbackItem, Reply, CommunicationLog, TeamInsight } from '../pages/ProjectReview/types';

const API_URL = 'http://localhost:3000/project-review';

// Axios instance with base URL and default headers
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor to handle token refresh on 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) throw new Error('No refresh token available');

                const response = await axios.post('http://localhost:3000/user/refresh-token', { refreshToken });
                const { token: newToken, refreshToken: newRefreshToken } = response.data.data;

                localStorage.setItem('authToken', newToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                localStorage.removeItem('authToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login'; // Redirect to login
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

const apiService = {
    // Project Review
    async createProjectReview(data: Partial<ProjectReview>): Promise<ProjectReview> {
        const response = await api.post('/', data);
        return response.data; // Axios wraps response in { data: ... }
    },

    async getProjectReview(projectId: string): Promise<ProjectReview> {
        const response = await api.get(`/${projectId}`);
        return response.data;
    },

    async updateProjectReview(projectId: string, data: Partial<ProjectReview>): Promise<ProjectReview> {
        const response = await api.put(`/${projectId}`, data);
        return response.data;
    },

    async deleteProjectReview(projectId: string): Promise<void> {
        await api.delete(`/${projectId}`);
    },

    // Objectives
    async createObjective(projectId: string, content: string): Promise<Objective> {
        const response = await api.post(`/${projectId}/objectives`, { content });
        return response.data;
    },

    async updateObjective(objectiveId: string, content: string): Promise<Objective> {
        const response = await api.put(`/objectives/${objectiveId}`, { content });
        return response.data;
    },

    async deleteObjective(objectiveId: string): Promise<void> {
        await api.delete(`/objectives/${objectiveId}`);
    },

    // Risks
    async createRisk(projectId: string, severity: string, description: string): Promise<Risk> {
        const response = await api.post(`/${projectId}/risks`, { severity, description });
        return response.data;
    },

    async updateRisk(riskId: string, severity: string, description: string): Promise<Risk> {
        const response = await api.put(`/risks/${riskId}`, { severity, description });
        return response.data;
    },

    async deleteRisk(riskId: string): Promise<void> {
        await api.delete(`/risks/${riskId}`);
    },

    // Highlights
    async createHighlight(projectId: string, content: string): Promise<Highlight> {
        const response = await api.post(`/${projectId}/highlights`, { content });
        return response.data;
    },

    async updateHighlight(highlightId: string, content: string): Promise<Highlight> {
        const response = await api.put(`/highlights/${highlightId}`, { content });
        return response.data;
    },

    async deleteHighlight(highlightId: string): Promise<void> {
        await api.delete(`/highlights/${highlightId}`);
    },

    // Feedback
    async createFeedback(projectId: string, content: string, sentiment: string, date: string): Promise<FeedbackItem> {
        const response = await api.post(`/${projectId}/feedback`, { content, sentiment, date });
        return response.data;
    },

    async updateFeedback(feedbackId: string, content: string, sentiment: string, date: string): Promise<FeedbackItem> {
        const response = await api.put(`/feedback/${feedbackId}`, { content, sentiment, date });
        return response.data;
    },

    async deleteFeedback(feedbackId: string): Promise<void> {
        await api.delete(`/feedback/${feedbackId}`);
    },

    async createReply(feedbackId: string, content: string, date: string): Promise<Reply> {
        const response = await api.post(`/feedback/${feedbackId}/replies`, { content, date });
        return response.data;
    },

    async deleteReply(replyId: string): Promise<void> {
        await api.delete(`/replies/${replyId}`);
    },

    // Communication Logs
    async createCommunicationLog(
        projectId: string,
        stakeholderName: string,
        stakeholderType: string,
        contactPerson: string,
        position: string,
        date: string,
        channel: string,
        sentiment: string,
        summary: string,
        actionItems: string[]
    ): Promise<CommunicationLog> {
        const response = await api.post(`/${projectId}/communication-logs`, {
            stakeholderName, stakeholderType, contactPerson, position, date, channel, sentiment, summary, actionItems,
        });
        return response.data;
    },

    async deleteCommunicationLog(logId: string): Promise<void> {
        await api.delete(`/communication-logs/${logId}`);
    },

    // Team Insights
    async createTeamInsight(
        projectId: string,
        memberName: string,
        memberRole: string,
        date: string,
        rating: number,
        content: string,
        focusAreas: string[]
    ): Promise<TeamInsight> {
        const response = await api.post(`/${projectId}/team-insights`, {
            memberName, memberRole, date, rating, content, focusAreas,
        });
        return response.data;
    },

    async deleteTeamInsight(insightId: string): Promise<void> {
        await api.delete(`/team-insights/${insightId}`);
    },
};

export default apiService;