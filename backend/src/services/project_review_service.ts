import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ProjectReview = {
    id: string;
    name: string;
    description?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    status?: string | null;
    completion: number;
    budget?: string | null;
    spent?: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    creatorId: string;
    objectives?: any[];
    risks?: any[];
    highlights?: any[];
    feedbackItems?: any[];
    communicationLogs?: any[];
    teamInsights?: any[];
}

export class ProjectReviewService {
    async createProjectReview(
        name: string,
        creatorId: string,
        description?: string,
        startDate?: string,
        endDate?: string,
        status?: string,
        completion?: number,
        budget?: string,
        spent?: string
    ): Promise<ProjectReview> {
        try {
            return await prisma.projectReview.create({
                data: {
                    name,
                    creatorId,
                    description,
                    startDate,
                    endDate,
                    status,
                    completion: completion || 0,
                    budget,
                    spent,
                },
                include: {
                    creator: {
                        select: { firstName: true, lastName: true, role: true },
                    },
                },
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            throw new Error(`Failed to create project review: ${errorMessage}`);
        }
    }

    async getProjectReviewById(id: string): Promise<ProjectReview | null> {
        try {
            return await prisma.projectReview.findUnique({
                where: { id },
                include: {
                    objectives: true,
                    risks: true,
                    highlights: true,
                    feedbackItems: {
                        include: {
                            author: {
                                select: { firstName: true, lastName: true, role: true },
                            },
                            replies: {
                                include: {
                                    author: {
                                        select: { firstName: true, lastName: true, role: true },
                                    },
                                },
                            },
                        },
                    },
                    communicationLogs: {
                        include: {
                            creator: {
                                select: { firstName: true, lastName: true, role: true },
                            },
                        },
                    },
                    teamInsights: {
                        include: {
                            creator: {
                                select: { firstName: true, lastName: true, role: true },
                            },
                        },
                    },
                },
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            throw new Error(`Failed to fetch project review: ${errorMessage}`);
        }
    }

    async getAllProjectReviews(): Promise<ProjectReview[]> {
        try {
            return await prisma.projectReview.findMany({
                include: {
                    objectives: true,
                    risks: true,
                    highlights: true,
                    feedbackItems: {
                        include: {
                            author: {
                                select: { firstName: true, lastName: true, role: true },
                            },
                            replies: {
                                include: {
                                    author: {
                                        select: { firstName: true, lastName: true, role: true },
                                    },
                                },
                            },
                        },
                    },
                    communicationLogs: {
                        include: {
                            creator: {
                                select: { firstName: true, lastName: true, role: true },
                            },
                        },
                    },
                    teamInsights: {
                        include: {
                            creator: {
                                select: { firstName: true, lastName: true, role: true },
                            },
                        },
                    },
                },
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            throw new Error(`Failed to fetch project reviews: ${errorMessage}`);
        }
    }

    async updateProjectReview(
        id: string,
        data: {
            name?: string;
            description?: string;
            startDate?: string;
            endDate?: string;
            status?: string;
            completion?: number;
            budget?: string;
            spent?: string;
        }
    ): Promise<ProjectReview> {
        try {
            return await prisma.projectReview.update({
                where: { id },
                data,
                include: {
                    objectives: true,
                    risks: true,
                    highlights: true,
                    feedbackItems: true,
                    communicationLogs: true,
                    teamInsights: true,
                },
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            throw new Error(`Failed to update project review: ${errorMessage}`);
        }
    }

    async deleteProjectReview(id: string): Promise<void> {
        try {
            await prisma.projectReview.delete({
                where: { id },
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            throw new Error(`Failed to delete project review: ${errorMessage}`);
        }
    }
}