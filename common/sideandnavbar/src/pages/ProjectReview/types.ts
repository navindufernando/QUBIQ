export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export interface ProjectData {
    id: string;
    name: string;
    description: { content: string; createdAt: string | null; updatedAt: string | null };
    startDate: string;
    endDate: string;
    status: string;
    completion: number;
    budget: string;
    spent: string;
    objectives: Array<{ content: string; createdAt: string; updatedAt: string | null }>;
    risks: Array<{ severity: string; description: string; createdAt: string; updatedAt: string | null }>;
    highlights: Array<{ content: string; createdAt: string; updatedAt: string | null }>;
}

export interface FeedbackItem {
    id: string;
    author: { name: string; avatar: string | null; role: string };
    date: string;
    content: string;
    sentiment: string;
    replies: Array<{ id: string; author: { name: string; avatar: string | null; role: string }; date: string; content: string }>;
}

export const mockProjectData: ProjectData = {
    id: "1",
    name: "",
    description: { content: "", createdAt: null, updatedAt: null },
    startDate: "",
    endDate: "",
    status: "",
    completion: 0,
    budget: "",
    spent: "",
    objectives: [],
    risks: [],
    highlights: [],
};

export const mockFeedback: FeedbackItem[] = [];
export const mockCommunicationLogs: any[] = [];
export const mockTeamInsights: any[] = [];