import { PrismaClient, CommunicationLog } from '@prisma/client';

const prisma = new PrismaClient();

export class CommunicationLogService {
    async createCommunicationLog(
        projectReviewId: string,
        creatorId: string,
        stakeholderName: string,
        stakeholderType: string,
        contactPerson: string,
        position: string,
        date: string,
        channel: string,
        sentiment: string,
        summary: string,
        actionItems: string[]
    ): Promise<CommunicationLog> {
        try {
            return await prisma.communicationLog.create({
                data: {
                    projectReviewId,
                    creatorId,
                    stakeholderName,
                    stakeholderType,
                    contactPerson,
                    position,
                    date,
                    channel,
                    sentiment,
                    summary,
                    actionItems,
                },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to create communication log: ${error.message}`);
            } else {
                throw new Error('Failed to create communication log: Unknown error');
            }
        }
    }

    async deleteCommunicationLog(id: string): Promise<void> {
        try {
            await prisma.communicationLog.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to delete communication log: ${error.message}`);
            } else {
                throw new Error('Failed to delete communication log: Unknown error');
            }
        }
    }
}