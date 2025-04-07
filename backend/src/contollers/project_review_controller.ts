import { Request, Response } from 'express';
import { ProjectReviewService } from '../services/project_review_service';

const projectReviewService = new ProjectReviewService();

export class ProjectReviewController {
    async createProjectReview(req: Request, res: Response): Promise<void> {
        try {
            const { name, description, startDate, endDate, status, completion, budget, spent } = req.body;
            const creatorId = req.user?.id;

            if (!creatorId) {
                res.status(401).json({ message: 'Unauthorized: Creator ID not found' });
                return;
            }

            if (!name) {
                res.status(400).json({ message: 'Project name is required' });
                return;
            }

            const projectReview = await projectReviewService.createProjectReview(
                name,
                creatorId,
                description,
                startDate,
                endDate,
                status,
                completion,
                budget,
                spent
            );
            res.status(201).json(projectReview);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }

    async getProjectReview(req: Request, res: Response): Promise<void> {
        try {
            const { projectId } = req.params;
            const projectReview = await projectReviewService.getProjectReviewById(projectId);
            if (!projectReview) {
                res.status(404).json({ message: 'Project review not found' });
                return;
            }
            res.status(200).json(projectReview);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }

    async getAllProjectReviews(req: Request, res: Response): Promise<void> {
        try {
            const projectReviews = await projectReviewService.getAllProjectReviews();
            res.status(200).json(projectReviews);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }

    async updateProjectReview(req: Request, res: Response): Promise<void> {
        try {
            const { projectId } = req.params;
            const data = req.body;
            const projectReview = await projectReviewService.updateProjectReview(projectId, data);
            res.status(200).json(projectReview);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }

    async deleteProjectReview(req: Request, res: Response): Promise<void> {
        try {
            const { projectId } = req.params;
            await projectReviewService.deleteProjectReview(projectId);
            res.status(204).send();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }
}