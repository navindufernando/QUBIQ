// sprint.controller.ts 
// Handles HTTP requests and responses for sprints
import { Request, Response } from "express";
import { SprintService } from "../services/sprint.service";

const sprintService = new SprintService();

export class SprintController {
    static async createSprint(req: Request, res: Response): Promise<any> {
        try {
            // Check if user is authenticated
            if (!req.user) {
                return res.status(401).json({ error: 'User not authenticated'});
            }

            const userId = req.user.id;
            console.log("Creating sprint for user:", userId);
            console.log("Request body:", req.body);

            // Extract the data from the request body
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
                console.log("Validation failed:", { sprintName, startDate, endDate });
                return res.status(400).json({ error: 'Sprint name, start date and end date are required.'});
            }

            // Parse dates and check if they're valid
            const parsedStartDate = new Date(startDate);
            const parsedEndDate = new Date(endDate);
            
            if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
                console.log("Invalid date format:", { startDate, endDate });
                return res.status(400).json({ error: 'Invalid date format'});
            }

            // Create a new sprint by calling the service method
            const sprintData = {
                sprintName,
                description: description || "",
                goal: goal || "",
                status: "In Progress",
                startDate: parsedStartDate,
                endDate: parsedEndDate,
                projectId: projectId || null
            };
            
            console.log("Prepared sprint data:", sprintData);
            
            const newSprint = await sprintService.createSprint(sprintData, userId);
            console.log("Sprint created successfully:", newSprint);

            // Respond with the created sprint
            res.status(201).json(newSprint);
        } catch (error) {
            console.error("Server error while creating sprint:", error);
            res.status(500).json({
                error: 'Failed to create a new sprint.',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    // Controller method to retrieve all the sprints
    static async getAllSprints(req: Request, res: Response): Promise<any> {
        try {
            
            if (!req.user) {
                return res.status(401).json({ error: 'User not authenticated'});
            }
            const sprints = await sprintService.getAllSprints(req.user.id);
            res.status(200).json(sprints);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch the sprints.'});
        }
    } 

    static async getActiveSprint(req: Request, res: Response): Promise<any> {
        try {
          if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
          }
      
          const sprint = await sprintService.getActiveSprint(req.user.id);
          if (!sprint) {
            return res.status(404).json({ error: 'No active sprint found.' });
          }
      
          res.status(200).json(sprint);
        } catch (error) {
          console.error('Error fetching active sprint:', error);
          res.status(500).json({ error: 'Failed to fetch active sprint.' });
        }
      }
      

    // Controller method to retrieve a sprint by ID
    static async getSprintById(req: Request, res: Response): Promise<any> {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'User not authenticated'});
            }
            const { id } = req.params;            
            const sprint = await sprintService.getSprintById(id, req.user.id);

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

            if (!req.user) {
                return res.status(401).json({ error: 'User not authenticated'});
            }

            const { id } = req.params;
            const sprint = await sprintService.updateSprint(id, req.user.id, req.body);

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