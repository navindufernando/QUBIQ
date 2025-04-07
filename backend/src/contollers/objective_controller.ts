import { Request, Response } from 'express';
import { ObjectiveService } from '../services/objective_service';

const objectiveService = new ObjectiveService();

export class ObjectiveController {
    async createObjective(req: Request, res: Response): Promise<void> {
        try {
            const { projectId } = req.params;
            const { content } = req.body;
            const objective = await objectiveService.createObjective(projectId, content);
            res.status(201).json(objective);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    }

    async updateObjective(req: Request, res: Response): Promise<void> {
        try {
            const { objectiveId } = req.params;
            const { content } = req.body;
            const objective = await objectiveService.updateObjective(objectiveId, content);
            res.status(200).json(objective);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    }

    async deleteObjective(req: Request, res: Response): Promise<void> {
        try {
            const { objectiveId } = req.params;
            await objectiveService.deleteObjective(objectiveId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    }
}