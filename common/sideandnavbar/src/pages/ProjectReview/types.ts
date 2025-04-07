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
    objectives: Array<{
        id: string;
        content: string;
        createdAt: string | Date;
        updatedAt: string | Date | null;
    }>;
    risks: Array<{
        id: string;
        severity: string;
        description: string;
        createdAt: string | Date;
        updatedAt: string | Date | null;
    }>;
    highlights: Array<{
        id: string;
        content: string;
        createdAt: string | Date;
        updatedAt: string | Date | null;
    }>;
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
        author: {
            firstName: string;
            lastName: string;
            role: string;
            avatar?: string | null;
        };
    }>;
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
}

export interface TeamInsight {
    id: string;
    memberName: string;
    memberRole: string;
    date: string;
    rating: number;
    content: string;
    focusAreas: string[];
}