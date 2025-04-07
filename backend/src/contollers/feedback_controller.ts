import { Request, Response } from 'express';
import { FeedbackService } from '../services/feedback_service';

const feedbackService = new FeedbackService();

export class FeedbackController {
    async createFeedback(req: Request, res: Response): Promise<void> {
        try {
            const { projectId } = req.params;
            const { content, sentiment, date } = req.body;
            const authorId = req.user?.id;

            if (!authorId) {
                res.status(401).json({ message: 'Unauthorized: Author ID not found' });
                return;
            }

            const feedback = await feedbackService.createFeedback(projectId, authorId, content, sentiment, date);
            res.status(201).json(feedback);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async updateFeedback(req: Request, res: Response): Promise<void> {
        try {
            const { feedbackId } = req.params;
            const { content, sentiment, date } = req.body;
            const feedback = await feedbackService.updateFeedback(feedbackId, content, sentiment, date);
            res.status(200).json(feedback);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async deleteFeedback(req: Request, res: Response): Promise<void> {
        try {
            const { feedbackId } = req.params;
            await feedbackService.deleteFeedback(feedbackId);
            res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async createReply(req: Request, res: Response): Promise<void> {
        try {
            const { feedbackId } = req.params;
            const { content, date } = req.body;
            const authorId = req.user?.id;

            if (!authorId) {
                res.status(401).json({ message: 'Unauthorized: Author ID not found' });
                return;
            }

            const reply = await feedbackService.createReply(feedbackId, authorId, content, date);
            res.status(201).json(reply);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async deleteReply(req: Request, res: Response): Promise<void> {
        try {
            const { replyId } = req.params;
            await feedbackService.deleteReply(replyId);
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