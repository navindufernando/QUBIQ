import { PrismaClient, TeamInsight, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class TeamInsightService {
    async createTeamInsight(
        projectReviewId: string,
        creatorId: string,
        memberName: string,
        memberRole: string,
        date: string,
        rating: number,
        content: string,
        focusAreas: string[]
    ): Promise<TeamInsight & { creator: { firstName: string; lastName: string; role: string } }> {
        try {
            if (!projectReviewId || !creatorId || !memberName || !memberRole || !date || rating < 0 || !content || !focusAreas) {
                throw new Error('All fields are required and rating must be non-negative');
            }

            const projectReview = await prisma.projectReview.findUnique({
                where: { id: projectReviewId },
            });
            if (!projectReview) {
                throw new Error(`Project review with ID ${projectReviewId} not found`);
            }

            const creator = await prisma.user.findUnique({
                where: { id: creatorId },
            });
            if (!creator) {
                throw new Error(`Creator with ID ${creatorId} not found`);
            }

            return await prisma.teamInsight.create({
                data: {
                    projectReviewId,
                    creatorId,
                    memberName,
                    memberRole,
                    date,
                    rating,
                    content,
                    focusAreas,
                },
                include: {
                    creator: {
                        select: { firstName: true, lastName: true, role: true },
                    },
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new Error('A team insight with these details already exists');
                }
                if (error.code === 'P2025') {
                    throw new Error('Failed to create team insight: Related record not found');
                }
            }
            throw new Error(`Failed to create team insight: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async deleteTeamInsight(id: string): Promise<void> {
        try {
            const teamInsight = await prisma.teamInsight.findUnique({
                where: { id },
            });
            if (!teamInsight) {
                throw new Error(`Team insight with ID ${id} not found`);
            }

            await prisma.teamInsight.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new Error(`Team insight with ID ${id} not found`);
                }
            }
            throw new Error(`Failed to delete team insight: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}