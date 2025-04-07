import { Request, Response } from 'express';
import { RiskService } from '../services/risk_service';

const riskService = new RiskService();

export class RiskController {
    async createRisk(req: Request, res: Response): Promise<void> {
        try {
            const { projectId } = req.params;
            const { severity, description } = req.body;
            const risk = await riskService.createRisk(projectId, severity, description);
            res.status(201).json(risk);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ message: errorMessage });
        }
    }

    async updateRisk(req: Request, res: Response): Promise<void> {
        try {
            const { riskId } = req.params;
            const { severity, description } = req.body;
            const risk = await riskService.updateRisk(riskId, severity, description);
            res.status(200).json(risk);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ message: errorMessage });
        }
    }

    async deleteRisk(req: Request, res: Response): Promise<void> {
        try {
            const { riskId } = req.params;
            await riskService.deleteRisk(riskId);
            res.status(204).send();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ message: errorMessage });
        }
    }
}