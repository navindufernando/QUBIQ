import { Request, Response } from 'express';
import { TeamInsightService } from '../services/team_insight_service';

const teamInsightService = new TeamInsightService();

export class TeamInsightController {
    async createTeamInsight(req: Request, res: Response): Promise<void> {
        try {
            const { projectId } = req.params;
            const { memberName, memberRole, date, rating, content, focusAreas } = req.body;
            const creatorId = req.user?.id;

            if (!creatorId) {
                res.status(401).json({ message: 'Unauthorized: Creator ID not found' });
                return;
            }

            const teamInsight = await teamInsightService.createTeamInsight(
                projectId,
                creatorId,
                memberName,
                memberRole,
                date,
                rating,
                content,
                focusAreas
            );
            res.status(201).json(teamInsight);
        } catch (error) {
            // Assert that error is an instance of Error
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                // Handle cases where error is not an Error instance
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    }

    async deleteTeamInsight(req: Request, res: Response): Promise<void> {
        try {
            const { insightId } = req.params;
            await teamInsightService.deleteTeamInsight(insightId);
            res.status(204).send();
        } catch (error) {
            // Assert that error is an instance of Error
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                // Handle cases where error is not an Error instance
                res.status(500).json({ message: 'An unexpected error occurred' });
            }
        }
    }
}