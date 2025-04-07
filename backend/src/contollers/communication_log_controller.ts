import { Request, Response } from 'express';
import { CommunicationLogService } from '../services/communication_log_service';

const communicationLogService = new CommunicationLogService();

export class CommunicationLogController {
    async createCommunicationLog(req: Request, res: Response): Promise<void> {
        try {
            const { projectId } = req.params;
            const { stakeholderName, stakeholderType, contactPerson, position, date, channel, sentiment, summary, actionItems } = req.body;
            const creatorId = req.user?.id;

            if (!creatorId) {
                res.status(401).json({ message: 'Unauthorized: Creator ID not found' });
                return;
            }

            const communicationLog = await communicationLogService.createCommunicationLog(
                projectId,
                creatorId,
                stakeholderName,
                stakeholderType,
                contactPerson,
                position,
                date,
                channel,
                sentiment,
                summary,
                actionItems
            );
            res.status(201).json(communicationLog);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async deleteCommunicationLog(req: Request, res: Response): Promise<void> {
        try {
            const { logId } = req.params;
            await communicationLogService.deleteCommunicationLog(logId);
            res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }
}