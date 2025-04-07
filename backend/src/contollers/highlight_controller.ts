import { Request, Response } from 'express';
import { HighlightService } from '../services/highlight_service';

const highlightService = new HighlightService();

export class HighlightController {
    async createHighlight(req: Request, res: Response): Promise<void> {
        try {
            const { projectId } = req.params;
            const { content } = req.body;
            const highlight = await highlightService.createHighlight(projectId, content);
            res.status(201).json(highlight);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async updateHighlight(req: Request, res: Response): Promise<void> {
        try {
            const { highlightId } = req.params;
            const { content } = req.body;
            const highlight = await highlightService.updateHighlight(highlightId, content);
            res.status(200).json(highlight);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async deleteHighlight(req: Request, res: Response): Promise<void> {
        try {
            const { highlightId } = req.params;
            await highlightService.deleteHighlight(highlightId);
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