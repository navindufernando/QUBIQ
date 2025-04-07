import { PrismaClient, Risk } from '@prisma/client';

const prisma = new PrismaClient();

export class RiskService {
    async createRisk(projectReviewId: string, severity: string, description: string): Promise<Risk> {
        try {
            return await prisma.risk.create({
                data: {
                    projectReviewId,
                    severity,
                    description,
                },
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to create risk: ${errorMessage}`);
        }
    }

    async updateRisk(id: string, severity: string, description: string): Promise<Risk> {
        try {
            return await prisma.risk.update({
                where: { id },
                data: { severity, description },
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to update risk: ${errorMessage}`);
        }
    }

    async deleteRisk(id: string): Promise<void> {
        try {
            await prisma.risk.delete({
                where: { id },
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to delete risk: ${errorMessage}`);
        }
    }
}