import { PrismaClient, Highlight } from '@prisma/client';

const prisma = new PrismaClient();

export class HighlightService {
    async createHighlight(projectReviewId: string, content: string): Promise<Highlight> {
        try {
            return await prisma.highlight.create({
                data: {
                    projectReviewId,
                    content,
                },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to create highlight: ${error.message}`);
            } else {
                throw new Error('Failed to create highlight: Unknown error');
            }
        }
    }

    async updateHighlight(id: string, content: string): Promise<Highlight> {
        try {
            return await prisma.highlight.update({
                where: { id },
                data: { content },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to update highlight: ${error.message}`);
            } else {
                throw new Error('Failed to update highlight: Unknown error');
            }
        }
    }

    async deleteHighlight(id: string): Promise<void> {
        try {
            await prisma.highlight.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to delete highlight: ${error.message}`);
            } else {
                throw new Error('Failed to delete highlight: Unknown error');
            }
        }
    }
}