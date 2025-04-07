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
    objectives: Array<Objective>;
    risks: Array<Risk>;
    highlights: Array<Highlight>;
    feedbackItems: FeedbackItem[];
    communicationLogs: CommunicationLog[];
    teamInsights: TeamInsight[];
}

export interface ProjectReview {
    id: string;
    projectId: string;
    createdAt: Date;
    updatedAt?: Date;
    creatorId: string;
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
        avatar?: string | null;
    };
    replies: Array<Reply>;
}

export interface Reply {
    id: string;
    content: string;
    date: string;
    feedbackItemId: string;
    author: {
        firstName: string;
        lastName: string;
        role: string;
        avatar?: string | null;
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

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}