// task.controller.ts 
// Handles HTTP requests and responses for tasks
import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

const taskService = new TaskService();

export class TaskController {
    static async createTask(req: Request, res: Response): Promise<any> {
        try {
            // extract the data from the request body
            const {
                name,
                description,
                startDate,
                endDate,
                status,
                projectId,
                project,
                assigneeId,
                assignee
            } = req.body;

            // Validate necessary data
            if (!name || !startDate || !endDate || !projectId || !assigneeId) {
                return res.status(400).json({ error: 'task name, start date end date and team members are required.'});
            }

            // Create a new task by calling the service method
            const newTask = await taskService.createTask({
                name,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                status,
                projectId,
                project,
                assigneeId,
                assignee
            });

            // Respond of the created Project
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({error: 'Failed to create a new task.'});
        }
    }

    // Controller method to retrieve all the tasks
    static async getAllTasks(req: Request, res: Response): Promise<any> {
        try {
            const tasks = await taskService.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch the tasks.'});
        }
    } 

    // Controller method to retrieve a task by ID
    static async getTaskById(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;

            // Convert the id from string to number
            const taskId = Number(id);

            // Check if the conversion was successful
            if (isNaN(taskId)) {
                return res.status(400).json({ error: 'Invalid ID format.' });
            }

            const task = await taskService.getTaskById(taskId);

            if (!task) {
                return res.status(404).json({error: 'Task not found.'});
            }

            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({error: 'Failed to fecth the task'});
        }
    }

        // Controller method to update a task by ID
    static async updateTask(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;

            // Convert the id from string to number
            const taskId = Number(id);

            // Check if the conversion was successful
            if (isNaN(taskId)) {
                return res.status(400).json({ error: 'Invalid ID format.' });
            }

            const task = await taskService.updateTask(taskId, req.body);

            if (!task) {
                return res.status(404).json({error: 'Task not found.'});
            }

            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({error: 'Failed to update the task'});
        }
    }

        // Controller method to delete a project by ID
    static async deleteTask(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;

            // Convert the id from string to number
            const taskId = Number(id);

            // Check if the conversion was successful
            if (isNaN(taskId)) {
                return res.status(400).json({ error: 'Invalid ID format.' });
            }

            const task = await taskService.deleteTask(taskId);

            if (!task) {
                return res.status(404).json({error: 'Task not found.'});
            }

            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({error: 'Failed to delete the task'});
        }
    }
}