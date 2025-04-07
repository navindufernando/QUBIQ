import axios from 'axios';

const API_URL = 'http://localhost:3000/project-review';

export interface ProjectReview {
    id: string;
    name: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    completion: number;
    budget?: string;
    spent?: string;
    createdAt: Date;
    updatedAt?: Date;
    creatorId: string;
    creator: {
        firstName: string;
        lastName: string;
        role: string;
    };
    objectives: Objective[];
    risks: Risk[];
    highlights: Highlight[];
    feedbackItems: FeedbackItem[];
    communicationLogs: CommunicationLog[];
    teamInsights: TeamInsight[];
}

export interface Objective {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
    projectReviewId: string;
}

export interface Risk {
    id: string;
    severity: string;
    description: string;
    createdAt: Date;
    updatedAt?: Date;
    projectReviewId: string;
}

export interface Highlight {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
    projectReviewId: string;
}

export interface FeedbackItem {
    id: string;
    content: string;
    sentiment: string;
    date: string;
    projectReviewId: string;
    authorId: string;
    author: {
        firstName: string;
        lastName: string;
        role: string;
    };
    replies: Reply[];
}

export interface Reply {
    id: string;
    content: string;
    date: string;
    feedbackItemId: string;
    authorId: string;
    author: {
        firstName: string;
        lastName: string;
        role: string;
    };
}

export interface CommunicationLog {
    id: string;
    stakeholderName: string;
    stakeholderType: string;
    contactPerson: string;
    position: string;
    date: string;
    channel: string;
    sentiment: string;
    summary: string;
    actionItems: string[];
    projectReviewId: string;
    creatorId: string;
    creator: {
        firstName: string;
        lastName: string;
        role: string;
    };
}

export interface TeamInsight {
    id: string;
    memberName: string;
    memberRole: string;
    date: string;
    rating: number;
    content: string;
    focusAreas: string[];
    projectReviewId: string;
    creatorId: string;
    creator: {
        firstName: string;
        lastName: string;
        role: string;
    };
}

const apiService = {
    // Project Review
    async createProjectReview(data: Partial<ProjectReview>, token: string): Promise<ProjectReview> {
        const response = await axios.post(`${API_URL}/`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },

    async getProjectReview(projectId: string, token: string): Promise<ProjectReview> {
        const response = await axios.get(`${API_URL}/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },

    async updateProjectReview(projectId: string, data: Partial<ProjectReview>, token: string): Promise<ProjectReview> {
        const response = await axios.put(`${API_URL}/${projectId}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },

    async deleteProjectReview(projectId: string, token: string): Promise<void> {
        await axios.delete(`${API_URL}/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Objectives
    async createObjective(projectId: string, content: string, token: string): Promise<Objective> {
        const response = await axios.post(`${API_URL}/${projectId}/objectives`, { content }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },

    async updateObjective(objectiveId: string, content: string, token: string): Promise<Objective> {
        const response = await axios.put(`${API_URL}/objectives/${objectiveId}`, { content }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },

    async deleteObjective(objectiveId: string, token: string): Promise<void> {
        await axios.delete(`${API_URL}/objectives/${objectiveId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Risks
    async createRisk(projectId: string, severity: string, description: string, token: string): Promise<Risk> {
        const response = await axios.post(`${API_URL}/${projectId}/risks`, { severity, description }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },

    async updateRisk(riskId: string, severity: string, description: string, token: string): Promise<Risk> {
        const response = await axios.put(`${API_URL}/risks/${riskId}`, { severity, description }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },

    async deleteRisk(riskId: string, token: string): Promise<void> {
        await axios.delete(`${API_URL}/risks/${riskId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Highlights
    async createHighlight(projectId: string, content: string, token: string): Promise<Highlight> {
        const response = await axios.post(`${API_URL}/${projectId}/highlights`, { content }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },

    async updateHighlight(highlightId: string, content: string, token: string): Promise<Highlight> {
        const response = await axios.put(`${API_URL}/highlights/${highlightId}`, { content }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },

    async deleteHighlight(highlightId: string, token: string): Promise<void> {
        await axios.delete(`${API_URL}/highlights/${highlightId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Feedback
    async createFeedback(projectId: string, content: string, sentiment: string, date: string, token: string): Promise<FeedbackItem> {
        const response = await axios.post(`${API_URL}/${projectId}/feedback`, { content, sentiment, date }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },

    async updateFeedback(feedbackId: string, content: string, sentiment: string, date: string, token: string): Promise<FeedbackItem> {
        const response = await axios.put(`${API_URL}/feedback/${feedbackId}`, { content, sentiment, date }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },

    async deleteFeedback(feedbackId: string, token: string): Promise<void> {
        await axios.delete(`${API_URL}/feedback/${feedbackId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    async createReply(feedbackId: string, content: string, date: string, token: string): Promise<Reply> {
        const response = await axios.post(`${API_URL}/feedback/${feedbackId}/replies`, { content, date }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    },

    async deleteReply(replyId: string, token: string): Promise<void> {
        await axios.delete(`${API_URL}/replies/${replyId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
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
        actionItems: string[],
        token: string
    ): Promise<CommunicationLog> {
        const response = await axios.post(
            `${API_URL}/${projectId}/communication-logs`,
            { stakeholderName, stakeholderType, contactPerson, position, date, channel, sentiment, summary, actionItems },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    },

    async deleteCommunicationLog(logId: string, token: string): Promise<void> {
        await axios.delete(`${API_URL}/communication-logs/${logId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Team Insights
    async createTeamInsight(
        projectId: string,
        memberName: string,
        memberRole: string,
        date: string,
        rating: number,
        content: string,
        focusAreas: string[],
        token: string
    ): Promise<TeamInsight> {
        const response = await axios.post(
            `${API_URL}/${projectId}/team-insights`,
            { memberName, memberRole, date, rating, content, focusAreas },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    },

    async deleteTeamInsight(insightId: string, token: string): Promise<void> {
        await axios.delete(`${API_URL}/team-insights/${insightId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default apiService;