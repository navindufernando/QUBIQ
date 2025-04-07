import { PrismaClient, FeedbackItem, Reply } from '@prisma/client';

const prisma = new PrismaClient();

export class FeedbackService {
    async createFeedback(
        projectReviewId: string,
        authorId: string,
        content: string,
        sentiment: string,
        date: string
    ): Promise<FeedbackItem> {
        try {
            return await prisma.feedbackItem.create({
                data: {
                    projectReviewId,
                    authorId,
                    content,
                    sentiment,
                    date,
                },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to create feedback: ${error.message}`);
            } else {
                throw new Error('Failed to create feedback: Unknown error');
            }
        }
    }

    async updateFeedback(id: string, content: string, sentiment: string, date: string): Promise<FeedbackItem> {
        try {
            return await prisma.feedbackItem.update({
                where: { id },
                data: { content, sentiment, date },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to update feedback: ${error.message}`);
            } else {
                throw new Error('Failed to update feedback: Unknown error');
            }
        }
    }

    async deleteFeedback(id: string): Promise<void> {
        try {
            await prisma.feedbackItem.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to delete feedback: ${error.message}`);
            } else {
                throw new Error('Failed to delete feedback: Unknown error');
            }
        }
    }

    async createReply(feedbackItemId: string, authorId: string, content: string, date: string): Promise<Reply> {
        try {
            return await prisma.reply.create({
                data: {
                    feedbackItemId,
                    authorId,
                    content,
                    date,
                },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to create reply: ${error.message}`);
            } else {
                throw new Error('Failed to create reply: Unknown error');
            }
        }
    }

    async deleteReply(id: string): Promise<void> {
        try {
            await prisma.reply.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to delete reply: ${error.message}`);
            } else {
                throw new Error('Failed to delete reply: Unknown error');
            }
        }
    }
}