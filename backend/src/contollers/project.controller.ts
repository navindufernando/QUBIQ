// sprint.controller.ts 
// Handles HTTP requests and responses for projects
import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";

const projectService = new ProjectService();

export class ProjectController {
    static async createProject(req: Request, res: Response): Promise<any> {
        try {
            // extract the data from the request body
            const {
                projectName,
                description,
                startDate,
                endDate,
            } = req.body;

            // Validate necessary data
            if (!projectName || !startDate || !endDate) {
                return res.status(400).json({ error: 'project name, start date end date and team members are required.'});
            }

            // Convert the startDate and endDate to Date objects
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);

            // Check if dates are valid
            if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
                return res.status(400).json({
                    error: 'Invalid date format.',
                });
            }

            // Create a new project by calling the service method
            const newProject = await projectService.createProject({
                projectName,
                description,
                startDate: startDateObj,
                endDate: endDateObj,
            });

            // Respond of the created Project
            res.status(201).json(newProject);
        } catch (error) {
            res.status(500).json({error: 'Failed to create a new project.'});
        }
    }

    // Controller method to retrieve all the projects
    static async getAllProjects(req: Request, res: Response): Promise<any> {
        try {
            const projects = await projectService.getAllProjects();
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch the projects.'});
        }
    } 

    // Controller method to retrieve a project by ID
    static async getProjectById(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const project = await projectService.getProjectById(id);

            if (!project) {
                return res.status(404).json({error: 'Project not found.'});
            }

            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({error: 'Failed to fecth the project'});
        }
    }

        // Controller method to update a project by ID
    static async updateProject(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const project = await projectService.updateProject(id, req.body);

            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({error: 'Failed to update the project'});
        }
    }

        // Controller method to delete a project by ID
    static async deleteProject(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const project = await projectService.deleteProject(id);

            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({error: 'Failed to delete the project'});
        }
    }
}