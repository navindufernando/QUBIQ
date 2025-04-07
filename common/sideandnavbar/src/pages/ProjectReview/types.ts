export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export interface ProjectData {
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
    objectives: Array<{ id: string; content: string; createdAt: string; updatedAt: string | null }>;
    risks: Array<{ id: string; severity: string; description: string; createdAt: string; updatedAt: string | null }>;
    highlights: Array<{ id: string; content: string; createdAt: string; updatedAt: string | null }>;
    feedbackItems: FeedbackItem[];
    communicationLogs: CommunicationLog[];
    teamInsights: TeamInsight[];
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
        avatar?: string | null;
    };
    replies: Array<{
        id: string;
        content: string;
        date: string;
        author: { firstName: string; lastName: string; role: string; avatar?: string | null };
    }>;
}

export interface CommunicationLog {
    id: string;
    stakeholder: {
        name: string;
        type: string;
        contactPerson: string;
        position: string;
    };
    date: string;
    channel: string;
    sentiment: string;
    summary: string;
    action_items: string[];
}

export interface TeamInsight {
    id: string;
    member: {
        name: string;
        role: string;
    };
    date: string;
    rating: number;
    content: string;
    focus_areas: string[];
}

// Remove mock data
export const mockProjectData: ProjectData = {
    id: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
    completion: 0,
    budget: "",
    spent: "",
    createdAt: new Date(),
    updatedAt: null,
    creatorId: "",
    creator: {
        firstName: "",
        lastName: "",
        role: "",
    },
    objectives: [],
    risks: [],
    highlights: [],
    feedbackItems: [],
    communicationLogs: [],
    teamInsights: [],
};

export const mockFeedback: FeedbackItem[] = [];
export const mockCommunicationLogs: CommunicationLog[] = [];
export const mockTeamInsights: TeamInsight[] = [];