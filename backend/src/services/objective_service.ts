import { PrismaClient, Objective } from '@prisma/client';

const prisma = new PrismaClient();

export class ObjectiveService {
    async createObjective(projectReviewId: string, content: string): Promise<Objective> {
        try {
            return await prisma.objective.create({
                data: {
                    projectReviewId,
                    content,
                },
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to create objective: ${errorMessage}`);
        }
    }

    async updateObjective(id: string, content: string): Promise<Objective> {
        try {
            return await prisma.objective.update({
                where: { id },
                data: { content },
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to update objective: ${errorMessage}`);
        }
    }

    async deleteObjective(id: string): Promise<void> {
        try {
            await prisma.objective.delete({
                where: { id },
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to delete objective: ${errorMessage}`);
        }
    }
}