// sprint.controller.ts 
// Handles HTTP requests and responses for sprints
import { Request, Response } from "express";
import { SprintService } from "../services/sprint.service";

const sprintService = new SprintService();

export class SprintController {
    static async createSprint(req: Request, res: Response): Promise<any> {
        try {

            const userId = req.body.userId;

            if (!userId) {
                return res.status(401).json({ error: 'User not authenticated'});
            }
            // extract the data from the request body
            const {
                sprintName,
                description,
                goal,
                status,
                startDate,
                endDate,
                projectId
            } = req.body;

            // Validate necessary data
            if (!sprintName || !startDate || !endDate) {
                return res.status(400).json({ error: 'sprint name, start date and end date are required.'});
            }

            // Create a new sprint by calling the service method
            const newSprint = await sprintService.createSprint({
                sprintName,
                description,
                goal,
                status,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                projectId
            }, userId);

            // Respond of the created sprint
            res.status(201).json(newSprint);
        } catch (error) {
            res.status(500).json({error: 'Failed to create a new sprint.'});
        }
    }

    // Controller method to retrieve all the sprints
    static async getAllSprints(req: Request, res: Response): Promise<any> {
        try {
            const userId = req.query.userId;
            if (!userId) {
                return res.status(401).json({ error: 'User not authentication'});
            }
            const sprints = await sprintService.getAllSprints(userId as string);
            res.status(200).json(sprints);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch the sprints.'});
        }
    } 

    // Controller method to retrieve a sprint by ID
    static async getSprintById(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const userId = req.query.userId;
            if (!userId) {
                return res.status(401).json({ error: 'User not authentication'});
            }
            const sprint = await sprintService.getSprintById(id, userId as string);

            if (!sprint) {
                return res.status(404).json({error: 'Sprint not found.'});
            }

            res.status(200).json(sprint);
        } catch (error) {
            res.status(500).json({error: 'Failed to fecth the sprint'});
        }
    }

        // Controller method to update a sprint by ID
    static async updateSprint(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const userId = req.query.userId;
            if (!userId) {
                return res.status(401).json({ error: 'User not authentication'});
            }
            const sprint = await sprintService.updateSprint(id, userId as string, req.body);

            res.status(200).json(sprint);
        } catch (error) {
            res.status(500).json({error: 'Failed to update the sprint'});
        }
    }

        // Controller method to delete a sprint by ID
    static async deleteSprint(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const sprint = await sprintService.deleteSprint(id);

            res.status(200).json(sprint);
        } catch (error) {
            res.status(500).json({error: 'Failed to delete the sprint'});
        }
    }
}